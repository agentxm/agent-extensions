#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, cpSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
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
    const inputRoot = join(workspace, "inputs");
    mkdirSync(inputRoot, { recursive: true });
    for (const fixture of request.fixtures) writeFileSync(join(inputRoot, fixture.name), fixture.content);
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
      request.fixtures.length ? `Declared inputs are under inputs/: ${request.fixtures.map((item) => item.name).join(", ")}.` : "No input fixture was supplied.",
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
    writeJson(join(trialRoot, mode === "trial" ? "response.json" : "grade.json"), output);
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
