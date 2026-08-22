#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, realpathSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { tmpdir } from "node:os";

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function taskFiles(root, current = root) {
  const files = new Map();
  for (const entry of readdirSync(current, { withFileTypes: true })) {
    if (current === root && new Set([".axm", ".git", "inputs", "output-schema.json", "final.json"]).has(entry.name)) continue;
    const path = join(current, entry.name);
    if (entry.isDirectory()) {
      for (const [name, content] of taskFiles(root, path)) files.set(name, content);
    } else if (entry.isFile()) {
      files.set(relative(root, path), readFileSync(path));
    }
  }
  return files;
}

function safeWorkspaceTarget(root, value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\\") || value.startsWith("/")) {
    throw new Error(`Unsafe workspace path: ${value}`);
  }
  const segments = value.split("/");
  if (segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
    throw new Error(`Unsafe workspace path: ${value}`);
  }
  if (new Set([".git", "final.json", "output-schema.json"]).has(segments[0])) {
    throw new Error(`Reserved workspace path: ${value}`);
  }
  const target = resolve(root, value);
  if (!target.startsWith(`${resolve(root)}${sep}`)) throw new Error(`Workspace path escapes root: ${value}`);
  return target;
}

function observedFiles(root, declaredPaths) {
  const files = taskFiles(root);
  const realRoot = realpathSync(root);
  for (const declaredPath of declaredPaths) {
    const target = safeWorkspaceTarget(root, declaredPath);
    if (!existsSync(target)) continue;
    const realTarget = realpathSync(target);
    const declaredRelative = relative(resolve(root), target);
    const realRelative = relative(realRoot, realTarget);
    if (declaredRelative !== realRelative) {
      throw new Error(`Artifact path resolves through a symlink: ${declaredPath}`);
    }
    if (statSync(target).isDirectory()) {
      for (const [name, content] of taskFiles(root, target)) files.set(name, content);
    } else {
      files.set(relative(root, target), readFileSync(target));
    }
  }
  return files;
}

function changedArtifacts(before, after) {
  const artifacts = [];
  let retainedBytes = 0;
  for (const path of [...new Set([...before.keys(), ...after.keys()])].sort()) {
    const previous = before.get(path);
    const current = after.get(path);
    if (previous && current && previous.equals(current)) continue;
    if (!current) {
      artifacts.push({ path, deleted: true });
      continue;
    }
    const binary = current.includes(0);
    const remaining = Math.max(0, 131072 - retainedBytes);
    const retained = current.subarray(0, Math.min(current.length, 32768, remaining));
    retainedBytes += retained.length;
    artifacts.push({
      path,
      deleted: false,
      size_bytes: current.length,
      content: binary ? null : retained.toString("utf8"),
      truncated: retained.length < current.length,
      binary,
    });
  }
  return artifacts;
}

function run(command, args, cwd, timeoutMs, stdoutPath, stderrPath) {
  return new Promise((resolvePromise) => {
    const child = spawn(command, args, { cwd, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    let killTimer;
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      killTimer = setTimeout(() => child.kill("SIGKILL"), 5000);
    }, timeoutMs);
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      clearTimeout(killTimer);
      writeFileSync(stdoutPath, stdout);
      writeFileSync(stderrPath, stderr);
      resolvePromise({ code: code ?? 1, signal });
    });
  });
}

const [mode, requestArg, trialArg] = process.argv.slice(2);
if (!new Set(["trial", "grade"]).has(mode) || !requestArg || !trialArg) {
  process.stderr.write("Usage: codex.mjs <trial|grade> REQUEST_JSON TRIAL_DIR\n");
  process.exit(2);
}

const requestPath = resolve(requestArg);
const trialRoot = resolve(trialArg);
const request = JSON.parse(readFileSync(requestPath, "utf8"));
const workspace = mkdtempSync(join(tmpdir(), "agent-skill-eval-codex-"));
const schemaPath = join(workspace, "output-schema.json");
const finalPath = join(workspace, "final.json");
const timeoutMs = Number(process.env.EVAL_TIMEOUT_MS ?? 180000);
const model = process.env.EVAL_MODEL;
if (!model) throw new Error("EVAL_MODEL is required");
const sandboxMode = process.env.EVAL_SANDBOX_MODE ?? "read-only";
if (!new Set(["read-only", "workspace-write"]).has(sandboxMode)) {
  throw new Error("EVAL_SANDBOX_MODE must be read-only or workspace-write");
}

try {
  let prompt;
  let schema;
  let beforeTaskFiles = new Map();
  if (mode === "trial" && request.stage === "routing") {
    schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        selected: {
          anyOf: [
            { type: "string" },
            { type: "array", items: { type: "string" }, minItems: 1 },
          ],
        },
        reason: { type: "string" },
        side_effects: { type: "array", items: { type: "string" } },
      },
      required: ["selected", "reason", "side_effects"],
    };
    prompt = [
      "Choose the Agent Skill or ordered sequence of Agent Skills that should handle the request using only the catalog names and descriptions.",
      "Return one string for a single owner, an ordered string array when several skills must compose, or clarify-or-abstain when the request is ambiguous or no listed skill owns it.",
      `Request: ${request.prompt}`,
      `Catalog: ${JSON.stringify(request.catalog)}`,
    ].join("\n\n");
  } else if (mode === "trial") {
    const packageRoot = process.env.EVAL_PACKAGE_ROOT;
    const repoRoot = process.env.EVAL_REPO_ROOT;
    if (!packageRoot || !repoRoot) throw new Error("EVAL_PACKAGE_ROOT and EVAL_REPO_ROOT are required");
    if (sandboxMode === "workspace-write") {
      const setup = spawnSync("axm", [
        "setup",
        "--scope", "project",
        "--agent", "codex",
        "--yes",
        "--non-interactive",
        "--json",
      ], { cwd: workspace, encoding: "utf8" });
      writeFileSync(join(trialRoot, "axm-setup.stdout.log"), setup.stdout ?? "");
      writeFileSync(join(trialRoot, "axm-setup.stderr.log"), setup.stderr ?? "");
      if (setup.status !== 0) throw new Error(`AXM setup failed with exit ${setup.status}`);
    }
    const targetRoot = join(workspace, ".axm", "extensions", request.target.owner, "skills", request.target.name);
    mkdirSync(targetRoot, { recursive: true });
    cpSync(join(packageRoot, "src"), join(targetRoot, "src"), { recursive: true });
    const knowledgeSource = join(repoRoot, ".axm", "extensions", "@agentxm", "knowledge", "agent-engineering", "src");
    const knowledgeTarget = join(workspace, ".axm", "extensions", "@agentxm", "knowledge", "agent-engineering", "src");
    mkdirSync(dirname(knowledgeTarget), { recursive: true });
    cpSync(knowledgeSource, knowledgeTarget, { recursive: true });
    const supportPaths = JSON.parse(process.env.EVAL_SUPPORT_PATHS_JSON ?? "[]");
    for (const supportPath of supportPaths) {
      const source = resolve(repoRoot, supportPath);
      if (!source.startsWith(`${resolve(repoRoot)}/`)) throw new Error(`Support path escapes repository: ${supportPath}`);
      const realSource = realpathSync(source);
      if (!realSource.startsWith(`${realpathSync(repoRoot)}/`)) throw new Error(`Support path resolves outside repository: ${supportPath}`);
      const target = join(workspace, relative(resolve(repoRoot), source));
      mkdirSync(dirname(target), { recursive: true });
      cpSync(realSource, target, { recursive: true });
    }
    for (const fixture of request.fixtures) {
      const target = safeWorkspaceTarget(workspace, fixture.workspace_path);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, fixture.content);
    }
    beforeTaskFiles = observedFiles(workspace, request.artifact_paths ?? []);
    schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        final_response: { type: "string" },
        side_effects: { type: "array", items: { type: "string" } },
      },
      required: ["final_response", "side_effects"],
    };
    prompt = [
      `Explicitly use the Agent Skill at .axm/extensions/${request.target.owner}/skills/${request.target.name}/src/SKILL.md.`,
      request.prompt,
      request.fixtures.length ? `Declared synthetic inputs: ${request.fixtures.map((item) => item.workspace_path).join(", ")}.` : "No input fixture was supplied.",
      request.artifact_paths?.length ? `Retained artifact roots: ${request.artifact_paths.join(", ")}.` : "No additional artifact root was declared.",
      sandboxMode === "workspace-write"
        ? "You may modify only this disposable task workspace within the stated task authority. Return the complete user-facing result in final_response and list every observed side effect."
        : "Do not modify files. Return the complete user-facing result in final_response and list any observed side effects.",
    ].join("\n\n");
  } else {
    schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        outcome: { type: "string", enum: ["pass", "fail", "unknown", "harness-error"] },
        failure_class: {
          anyOf: [
            { type: "string" },
            { type: "null" },
          ],
        },
        assertions: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              assertion: { type: "string" },
              result: { type: "string", enum: ["pass", "fail", "unknown"] },
              evidence: { type: "string" },
            },
            required: ["assertion", "result", "evidence"],
          },
        },
        detail: { type: "string" },
      },
      required: ["outcome", "failure_class", "assertions", "detail"],
    };
    prompt = [
      "Grade the response against every assertion. Use only the supplied response and criteria.",
      "Return unknown when the evidence cannot decide. Do not reward persuasive wording without the required observable behavior.",
      JSON.stringify(request),
    ].join("\n\n");
  }

  writeJson(schemaPath, schema);
  const result = await run("codex", [
    "exec",
    "--ignore-user-config",
    "--ignore-rules",
    "--ephemeral",
    "--skip-git-repo-check",
    "--sandbox",
    mode === "trial" ? sandboxMode : "read-only",
    "--cd",
    workspace,
    "--model",
    model,
    "--json",
    "--output-schema",
    schemaPath,
    "--output-last-message",
    finalPath,
    prompt,
  ], workspace, timeoutMs, join(trialRoot, `${mode}-transcript.jsonl`), join(trialRoot, `${mode}-codex.stderr.log`));
  if (result.code !== 0) {
    process.stderr.write(`codex exited ${result.code}; signal=${result.signal ?? "none"}\n`);
    process.exitCode = result.code;
  } else {
    const output = JSON.parse(readFileSync(finalPath, "utf8"));
    if (mode === "trial" && request.stage === "execution") {
      output.artifacts = changedArtifacts(beforeTaskFiles, observedFiles(workspace, request.artifact_paths ?? []));
      writeJson(join(trialRoot, "artifacts.json"), output.artifacts);
    }
    writeJson(join(trialRoot, mode === "trial" ? "response.json" : "grade.json"), output);
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
