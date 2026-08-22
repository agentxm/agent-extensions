#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";

const CONTRACT_KEYS = [
  "contract_version",
  "owner",
  "decision",
  "target_binding",
  "scope",
  "unit",
  "environment",
  "evidence",
  "grading",
  "trials",
  "comparison",
  "analysis",
  "provenance",
  "freshness",
];
const ALLOWED_EVAL_ENTRIES = new Set([
  "cases.md",
  "evaluation-contract.json",
  "evals.json",
  "files",
  "fixtures",
  "graders",
  "harness",
  "releases",
]);
const OUTCOMES = new Set(["pass", "fail", "unknown", "harness-error"]);
const STAGES = new Set(["routing", "execution"]);

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const args = { command, case: [], supportPath: [] };
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith("--")) fail(`Unexpected argument: ${token}`);
    const key = token.slice(2).replace(/-([a-z])/g, (_, value) => value.toUpperCase());
    const value = rest[index + 1];
    if (!value || value.startsWith("--")) fail(`Missing value for ${token}`);
    index += 1;
    if (key === "case") args.case.push(value);
    else if (key === "supportPath") args.supportPath.push(value);
    else args[key] = value;
  }
  return args;
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${path}: ${error.message}`);
  }
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function walkFiles(root, current = root) {
  if (!existsSync(current)) return [];
  const files = [];
  for (const entry of readdirSync(current, { withFileTypes: true })) {
    const path = join(current, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(root, path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}

function walkSymlinks(current) {
  if (!existsSync(current)) return [];
  const links = [];
  for (const entry of readdirSync(current, { withFileTypes: true })) {
    const path = join(current, entry.name);
    if (entry.isSymbolicLink()) links.push(path);
    else if (entry.isDirectory()) links.push(...walkSymlinks(path));
  }
  return links.sort();
}

function contentIdentity(root, paths) {
  const hash = createHash("sha256");
  for (const path of paths.sort()) {
    hash.update(relative(root, path).split(sep).join("/"));
    hash.update("\0");
    hash.update(readFileSync(path));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

function fileIdentity(path) {
  return `sha256:${createHash("sha256").update(readFileSync(path)).digest("hex")}`;
}

function gitOutput(root, args) {
  const result = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : null;
}

function validateReleaseManifest(path, findings) {
  const record = readJson(path);
  const required = [
    "decision",
    "target_identity",
    "suite_identity",
    "harness_identity",
    "environment_identity",
    "grader_identity",
    "trial_summary",
    "baseline",
    "raw_evidence",
    "limitations",
    "expires_at",
  ];
  for (const key of required) {
    if (!(key in record)) findings.push(`${path}: promoted manifest is missing ${key}`);
  }
}

function validateSuite(packageRoot, findings) {
  const manifestPath = join(packageRoot, "skill.json");
  const evalRoot = join(packageRoot, "evals");
  const suitePath = join(evalRoot, "evals.json");
  if (!existsSync(suitePath)) {
    findings.push(`${packageRoot}: workspace-authored Agent Skill is missing evals/evals.json`);
    return;
  }

  for (const entry of readdirSync(evalRoot, { withFileTypes: true })) {
    if (!ALLOWED_EVAL_ENTRIES.has(entry.name)) {
      findings.push(`${evalRoot}: undeclared evaluation artifact category ${entry.name}`);
    }
  }
  for (const path of walkSymlinks(evalRoot)) {
    findings.push(`${path}: evaluation source symlinks are not permitted`);
  }

  const manifest = readJson(manifestPath);
  const suite = readJson(suitePath);
  if (suite.skill_name !== manifest.name) {
    findings.push(`${suitePath}: skill_name must equal ${manifest.name}`);
  }
  if (typeof suite.suite_version !== "string" || !/^\d+\.\d+\.\d+$/.test(suite.suite_version)) {
    findings.push(`${suitePath}: suite_version must be semver`);
  }
  if (suite.evaluation_contract !== "evals/evaluation-contract.json") {
    findings.push(`${suitePath}: evaluation_contract must reference evals/evaluation-contract.json`);
  }
  if (!Array.isArray(suite.evals) || suite.evals.length === 0) {
    findings.push(`${suitePath}: evals must be a non-empty array`);
    return;
  }

  const ids = new Set();
  const stages = new Set();
  for (const item of suite.evals) {
    if (item.id === undefined || ids.has(String(item.id))) {
      findings.push(`${suitePath}: every case must have a unique id`);
    }
    ids.add(String(item.id));
    if (!STAGES.has(item.stage)) findings.push(`${suitePath} case ${item.id}: invalid or missing stage`);
    else stages.add(item.stage);
    if (typeof item.prompt !== "string" || item.prompt.length === 0) {
      findings.push(`${suitePath} case ${item.id}: prompt is required`);
    }
    if (!Array.isArray(item.assertions) || item.assertions.length === 0) {
      findings.push(`${suitePath} case ${item.id}: assertions are required`);
    }
    if (item.stage === "routing") {
      if (item.files?.length) findings.push(`${suitePath} case ${item.id}: routing cases cannot expose fixtures`);
      const expectedSelection = item.expected_selection;
      if (!(typeof expectedSelection === "string" || (
        Array.isArray(expectedSelection) &&
        expectedSelection.length > 0 &&
        expectedSelection.every((value) => typeof value === "string")
      ))) {
        findings.push(`${suitePath} case ${item.id}: expected_selection must be a string or non-empty string array`);
      }
      if (!Array.isArray(item.catalog_neighbors)) {
        findings.push(`${suitePath} case ${item.id}: catalog_neighbors is required`);
      }
    }
    for (const fixture of item.files ?? []) {
      const fixturePath = resolve(packageRoot, fixture);
      if (!fixturePath.startsWith(`${resolve(evalRoot)}${sep}`) || !existsSync(fixturePath)) {
        findings.push(`${suitePath} case ${item.id}: missing or unsafe fixture ${fixture}`);
      } else if (!realpathSync(fixturePath).startsWith(`${realpathSync(evalRoot)}${sep}`)) {
        findings.push(`${suitePath} case ${item.id}: fixture escapes evals through a symlink ${fixture}`);
      }
    }
  }
  for (const stage of STAGES) {
    if (!stages.has(stage)) findings.push(`${suitePath}: suite must contain a ${stage} case`);
  }

  const contractPath = join(evalRoot, "evaluation-contract.json");
  if (!existsSync(contractPath)) {
    findings.push(`${suitePath}: evaluation contract is missing`);
  } else {
    const contract = readJson(contractPath);
    for (const key of CONTRACT_KEYS) {
      if (!(key in contract)) findings.push(`${contractPath}: missing ${key}`);
    }
    if (contract.target_binding?.skill_name !== manifest.name) {
      findings.push(`${contractPath}: target_binding.skill_name must equal ${manifest.name}`);
    }
    const declaredStages = new Set(contract.scope?.stages ?? []);
    for (const stage of STAGES) {
      if (!declaredStages.has(stage)) findings.push(`${contractPath}: scope.stages must include ${stage}`);
    }
    const outcomes = new Set(contract.evidence?.outcomes ?? []);
    for (const outcome of OUTCOMES) {
      if (!outcomes.has(outcome)) findings.push(`${contractPath}: evidence.outcomes must include ${outcome}`);
    }
  }

  const releases = join(evalRoot, "releases");
  for (const path of walkFiles(releases)) {
    if (!path.endsWith(".json")) findings.push(`${path}: promoted evidence must be JSON`);
    else validateReleaseManifest(path, findings);
  }
}

function findSkillPackages(root) {
  const settingsPath = join(root, ".axm", "settings.json");
  if (!existsSync(settingsPath)) return [];
  const settings = readJson(settingsPath);
  return Object.values(settings.skills ?? {})
    .map((value) => typeof value === "object" && value !== null ? value.source : value)
    .filter((source) => typeof source === "string" && source.startsWith("workspace:"))
    .map((source) => source.match(/^workspace:(@[^/]+)\/skills\/([^@]+)$/))
    .filter(Boolean)
    .map((match) => join(root, ".axm", "extensions", match[1], "skills", match[2]))
    .filter((path) => existsSync(join(path, "skill.json")))
    .sort();
}

function validateRepository(root) {
  const findings = [];
  for (const packageRoot of findSkillPackages(root)) validateSuite(packageRoot, findings);
  return findings;
}

function parseFrontmatterDescription(path) {
  if (!existsSync(path)) return "";
  const text = readFileSync(path, "utf8");
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!frontmatter) return "";
  const lines = frontmatter.split(/\r?\n/);
  const index = lines.findIndex((line) => /^description\s*:/.test(line));
  if (index < 0) return "";
  const value = lines[index].replace(/^description\s*:\s*/, "").trim();
  if (value === "|" || value === ">" || value === "|-" || value === ">-") {
    const body = [];
    for (const line of lines.slice(index + 1)) {
      if (line.length > 0 && !/^\s/.test(line)) break;
      body.push(line.replace(/^\s{2}/, ""));
    }
    return body.join(value.startsWith(">") ? " " : "\n").trim();
  }
  return value.replace(/^['"]|['"]$/g, "");
}

function catalogForCase(root, packageRoot, item) {
  const targetManifest = readJson(join(packageRoot, "skill.json"));
  const names = new Set([targetManifest.name, ...(item.catalog_neighbors ?? [])]);
  names.delete("clarify-or-abstain");
  const ownersRoot = join(root, ".axm", "extensions");
  const owners = [
    targetManifest.owner,
    "@agentxm",
    ...readdirSync(ownersRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
  ];
  const catalog = [];
  for (const name of names) {
    const skillPath = [...new Set(owners)]
      .map((owner) => join(ownersRoot, owner, "skills", name, "src", "SKILL.md"))
      .find((path) => existsSync(path));
    if (!skillPath) continue;
    catalog.push({ name, description: parseFrontmatterDescription(skillPath) });
  }
  return catalog;
}

function runProcess(command, args, env, timeoutMs) {
  return new Promise((resolvePromise) => {
    const child = spawn(command, args, { env, stdio: ["ignore", "pipe", "pipe"] });
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
      resolvePromise({ code: code ?? 1, signal, stdout, stderr });
    });
  });
}

function safeRunId(value) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value)) fail(`Unsafe run id: ${value}`);
  return value;
}

function isoRunId() {
  return `${new Date().toISOString().replace(/[:.]/g, "-")}-${randomUUID().slice(0, 8)}`;
}

function assertionGradesForRouting(item, response) {
  const expected = Array.isArray(item.expected_selection) ? item.expected_selection : [item.expected_selection];
  const observed = Array.isArray(response.selected) ? response.selected : [response.selected];
  const result = JSON.stringify(observed) === JSON.stringify(expected) ? "pass" : "fail";
  return {
    outcome: result,
    failure_class: result === "fail" ? "target-routing" : null,
    assertions: item.assertions.map((assertion) => ({
      assertion,
      result,
      evidence: `observed selection=${JSON.stringify(observed)}; expected=${JSON.stringify(expected)}`,
    })),
  };
}

async function runEvaluation(args) {
  const root = resolve(args.root ?? process.cwd());
  const packageRoot = resolve(root, args.package ?? "");
  const adapter = resolve(root, args.adapter ?? "");
  for (const [name, value] of Object.entries({
    package: args.package,
    adapter: args.adapter,
    host: args.host,
    model: args.model,
    configurationId: args.configurationId,
    catalogId: args.catalogId,
    authorityPolicyId: args.authorityPolicyId,
    sandboxMode: args.sandboxMode,
    caseAuthorId: args.caseAuthorId,
    runnerId: args.runnerId,
    reviewerId: args.reviewerId,
    graderId: args.graderId,
  })) {
    if (!value) fail(`run requires --${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`);
  }
  if (!existsSync(adapter)) fail(`Adapter not found: ${adapter}`);
  const findings = [];
  validateSuite(packageRoot, findings);
  if (findings.length) fail(`Suite validation failed:\n${findings.map((item) => `- ${item}`).join("\n")}`);

  const manifest = readJson(join(packageRoot, "skill.json"));
  const suitePath = join(packageRoot, "evals", "evals.json");
  const contractPath = join(packageRoot, "evals", "evaluation-contract.json");
  const suite = readJson(suitePath);
  const contract = readJson(contractPath);
  const selectedIds = new Set(args.case.flatMap((value) => value.split(",")));
  const cases = selectedIds.size
    ? suite.evals.filter((item) => selectedIds.has(String(item.id)))
    : suite.evals;
  if (!cases.length) fail("No evaluation cases selected");
  if (selectedIds.size !== cases.length) fail("One or more selected case ids do not exist");

  const evidenceClass = args.evidenceClass ?? "authoring-smoke";
  if (!new Set(["authoring-smoke", "regression", "release"]).has(evidenceClass)) {
    fail(`Unsupported evidence class: ${evidenceClass}`);
  }
  const trials = Number(args.trials ?? (evidenceClass === "release"
    ? contract.trials?.release_evidence_minimum_per_host_model_case ?? 3
    : 1));
  if (!Number.isInteger(trials) || trials < 1) fail("--trials must be a positive integer");
  if (evidenceClass === "release" && args.model.toLowerCase().includes("unknown")) {
    fail("Release evidence requires an exact model identity");
  }
  if (!new Set(["read-only", "workspace-write"]).has(args.sandboxMode)) {
    fail("--sandbox-mode must be read-only or workspace-write");
  }
  const sourceRevision = gitOutput(root, ["rev-parse", "HEAD"]);
  const targetPath = relative(root, packageRoot);
  const targetStatus = gitOutput(root, ["status", "--porcelain=v1", "--", targetPath]);
  if (evidenceClass === "release" && (!sourceRevision || targetStatus === null || targetStatus.length > 0)) {
    fail("Release evidence requires a Git revision and a clean target package");
  }

  const runId = safeRunId(args.runId ?? isoRunId());
  const outputRoot = resolve(root, args.outputRoot ?? ".work/evals");
  const ownerPath = manifest.owner.replace(/^@/, "@");
  const runRoot = join(outputRoot, ownerPath, "skills", manifest.name, runId);
  if (existsSync(runRoot)) fail(`Run already exists: ${runRoot}`);
  mkdirSync(join(runRoot, "trials"), { recursive: true });

  const startedAt = new Date().toISOString();
  const targetFiles = [join(packageRoot, "skill.json"), ...walkFiles(join(packageRoot, "src"))];
  const suiteFiles = walkFiles(join(packageRoot, "evals")).filter((path) => !path.includes(`${sep}releases${sep}`));
  const run = {
    schema_version: "1.0.0",
    run_id: runId,
    state: "running",
    evidence_class: evidenceClass,
    claim_ceiling: evidenceClass === "authoring-smoke"
      ? "Same-author development evidence only"
      : evidenceClass === "regression"
        ? "Bounded reliability for the tested identities"
        : "Release evidence for the declared cohort; not approval",
    target: {
      owner: manifest.owner,
      type: "skill",
      name: manifest.name,
      version: manifest.version,
      content_identity: contentIdentity(packageRoot, targetFiles),
      package_content_identity: contentIdentity(packageRoot, targetFiles),
      source_revision: sourceRevision ?? "not-git-bound",
      source_state: targetStatus === null ? "unknown" : targetStatus.length === 0 ? "clean" : "dirty",
    },
    suite: {
      version: suite.suite_version,
      content_identity: contentIdentity(packageRoot, suiteFiles),
      suite_content_identity: contentIdentity(packageRoot, suiteFiles),
    },
    harness: { adapter: basename(adapter), content_identity: fileIdentity(adapter) },
    environment: {
      host: args.host,
      model: args.model,
      configuration_identity: args.configurationId,
      active_catalog: args.catalogId,
      authority_policy: args.authorityPolicyId,
      sandbox_mode: args.sandboxMode,
      isolation: "fresh adapter process and task-local workspace per trial",
    },
    budgets: {
      timeout_ms: Number(args.timeoutMs ?? 180000),
      token_budget: args.tokenBudget ? Number(args.tokenBudget) : null,
      cost_budget_usd: args.costBudgetUsd ? Number(args.costBudgetUsd) : null,
      retries: 0,
    },
    baseline: args.baseline ?? "no-baseline",
    provenance: {
      case_author: args.caseAuthorId,
      runner: args.runnerId,
      reviewer: args.reviewerId,
      grader_identity: args.graderId,
    },
    independence: args.independence ?? "runner and grader identities declared by caller",
    cases: cases.map((item) => ({ id: item.id, stage: item.stage })),
    trials_per_case: trials,
    started_at: startedAt,
    ended_at: null,
    outcomes: null,
    raw_evidence: [],
  };
  writeJson(join(runRoot, "run.json"), run);

  const counts = { pass: 0, fail: 0, unknown: 0, "harness-error": 0 };
  const trialRecords = [];
  for (const item of cases) {
    for (let trialNumber = 1; trialNumber <= trials; trialNumber += 1) {
      const trialRoot = join(runRoot, "trials", String(item.id), String(trialNumber));
      mkdirSync(trialRoot, { recursive: true });
      const fixtures = (item.files ?? []).map((path) => ({
        name: basename(path),
        content: readFileSync(resolve(packageRoot, path), "utf8"),
      }));
      const request = {
        schema_version: "1.0.0",
        case_id: item.id,
        trial_number: trialNumber,
        stage: item.stage,
        prompt: item.prompt,
        target: {
          owner: manifest.owner,
          name: manifest.name,
          description: parseFrontmatterDescription(join(packageRoot, "src", "SKILL.md")),
          content_identity: run.target.content_identity,
        },
        catalog: item.stage === "routing" ? catalogForCase(root, packageRoot, item) : [],
        fixtures,
        environment: run.environment,
        budgets: run.budgets,
      };
      const requestPath = join(trialRoot, "request.json");
      writeJson(requestPath, request);
      const trialStarted = new Date();
      const env = {
        ...process.env,
        EVAL_REPO_ROOT: root,
        EVAL_PACKAGE_ROOT: packageRoot,
        EVAL_MODEL: args.model,
        EVAL_TIMEOUT_MS: String(run.budgets.timeout_ms),
        EVAL_SUPPORT_PATHS_JSON: JSON.stringify(args.supportPath),
        EVAL_SANDBOX_MODE: args.sandboxMode,
      };
      const trialProcess = await runProcess(adapter, ["trial", requestPath, trialRoot], env, run.budgets.timeout_ms);
      writeFileSync(join(trialRoot, "adapter.stdout.log"), trialProcess.stdout);
      writeFileSync(join(trialRoot, "adapter.stderr.log"), trialProcess.stderr);

      let grade;
      const responsePath = join(trialRoot, "response.json");
      if (trialProcess.code !== 0 || !existsSync(responsePath)) {
        grade = {
          outcome: "harness-error",
          failure_class: "harness",
          assertions: item.assertions.map((assertion) => ({ assertion, result: "unknown", evidence: "Trial adapter failed" })),
          detail: `adapter exit=${trialProcess.code} signal=${trialProcess.signal ?? "none"}`,
        };
      } else {
        const response = readJson(responsePath);
        if (item.stage === "routing") {
          grade = assertionGradesForRouting(item, response);
        } else {
          const graderRequest = {
            schema_version: "1.0.0",
            case_id: item.id,
            expected_output: item.expected_output ?? null,
            assertions: item.assertions,
            response,
          };
          const graderRequestPath = join(trialRoot, "grader-request.json");
          writeJson(graderRequestPath, graderRequest);
          const graderProcess = await runProcess(adapter, ["grade", graderRequestPath, trialRoot], env, run.budgets.timeout_ms);
          writeFileSync(join(trialRoot, "grader.stdout.log"), graderProcess.stdout);
          writeFileSync(join(trialRoot, "grader.stderr.log"), graderProcess.stderr);
          const gradePath = join(trialRoot, "grade.json");
          if (graderProcess.code !== 0 || !existsSync(gradePath)) {
            grade = {
              outcome: "harness-error",
              failure_class: "grader",
              assertions: item.assertions.map((assertion) => ({ assertion, result: "unknown", evidence: "Grader adapter failed" })),
              detail: `grader exit=${graderProcess.code} signal=${graderProcess.signal ?? "none"}`,
            };
          } else grade = readJson(gradePath);
        }
      }
      if (!OUTCOMES.has(grade.outcome)) grade.outcome = "harness-error";
      writeJson(join(trialRoot, "grade.json"), grade);
      const response = existsSync(responsePath) ? readJson(responsePath) : null;
      writeJson(join(trialRoot, "trial.json"), {
        schema_version: "1.0.0",
        case_id: item.id,
        trial_number: trialNumber,
        stage: item.stage,
        raw_output_or_durable_locator: response ? "response.json" : null,
        observed_selection_or_abstention: item.stage === "routing" ? response?.selected ?? null : null,
        assertion_results: "grade.json",
        side_effects: response?.side_effects ?? [],
        outcome: grade.outcome,
        failure_class: grade.failure_class ?? null,
      });
      const trialEnded = new Date();
      const timing = {
        started_at: trialStarted.toISOString(),
        ended_at: trialEnded.toISOString(),
        duration_ms: trialEnded.getTime() - trialStarted.getTime(),
      };
      writeJson(join(trialRoot, "timing.json"), timing);
      counts[grade.outcome] += 1;
      trialRecords.push({ case_id: item.id, trial_number: trialNumber, stage: item.stage, outcome: grade.outcome });
    }
  }

  const routingTrials = trialRecords.filter((item) => item.stage === "routing");
  const routingCaseRates = [...new Set(routingTrials.map((item) => item.case_id))].map((caseId) => {
    const caseTrials = routingTrials.filter((item) => item.case_id === caseId);
    const matched = caseTrials.filter((item) => item.outcome === "pass").length;
    return {
      case_id: caseId,
      attempts: caseTrials.length,
      matched,
      match_rate: matched / caseTrials.length,
      stable: matched === 0 || matched === caseTrials.length,
    };
  });
  const unstableRouting = routingCaseRates.filter((item) => !item.stable);

  const limitations = [run.claim_ceiling, run.independence];
  if (trials === 1 && routingTrials.length > 0) {
    limitations.push("Single-attempt routing cannot characterize a stochastic selection surface; rates are undetermined.");
  }
  if (unstableRouting.length > 0) {
    limitations.push(`Selection varied between attempts on ${unstableRouting.length} routing case(s); read the rate, not the disposition.`);
  }

  const summary = {
    schema_version: "1.1.0",
    run_id: runId,
    counts,
    routing: routingTrials,
    routing_case_rates: routingCaseRates,
    execution: trialRecords.filter((item) => item.stage === "execution"),
    conclusion: counts["harness-error"] > 0 || counts.unknown > 0
      ? "Inconclusive"
      : counts.fail > 0
        ? "Unsupported"
        : "Supported",
    limitations,
  };
  writeJson(join(runRoot, "summary.json"), summary);
  writeFileSync(join(runRoot, "report.md"), [
    `# Evaluation report: ${manifest.name}`,
    "",
    `- Run: \`${runId}\``,
    `- Evidence class: \`${evidenceClass}\``,
    `- Conclusion: **${summary.conclusion}**`,
    `- Routing trials: ${summary.routing.length} across ${routingCaseRates.length} case(s), ${trials} attempt(s) each`,
    `- Routing cases with selection varying between attempts: ${
      unstableRouting.length === 0
        ? "none"
        : unstableRouting.map((item) => `${item.case_id} (${item.matched}/${item.attempts})`).join(", ")
    }`,
    `- Execution trials: ${summary.execution.length}`,
    `- Outcomes: ${JSON.stringify(counts)}`,
    `- Claim ceiling: ${run.claim_ceiling}`,
    ...summary.limitations.slice(2).map((item) => `- Limitation: ${item}`),
    "",
    "This evaluation does not approve, publish, admit, or audit the target.",
    "",
  ].join("\n"));

  run.state = "complete";
  run.ended_at = new Date().toISOString();
  run.outcomes = counts;
  run.raw_evidence = walkFiles(runRoot)
    .filter((path) => basename(path) !== "run.json")
    .map((path) => ({ path: relative(runRoot, path).split(sep).join("/"), content_identity: fileIdentity(path) }));
  writeJson(join(runRoot, "run.json"), run);
  process.stdout.write(`${JSON.stringify({ ok: true, run: relative(root, runRoot), summary }, null, 2)}\n`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.command === "validate") {
    const root = resolve(args.root ?? process.cwd());
    const findings = validateRepository(root);
    if (findings.length) {
      process.stderr.write(`${findings.map((item) => `- ${item}`).join("\n")}\n`);
      process.exitCode = 1;
      return;
    }
    process.stdout.write(`${JSON.stringify({ ok: true, suites: findSkillPackages(root).filter((path) => existsSync(join(path, "evals", "evals.json"))).length })}\n`);
    return;
  }
  if (args.command === "run") {
    await runEvaluation(args);
    return;
  }
  fail("Usage: agent-skill-eval.mjs validate [--root PATH] | run --package PATH --adapter PATH --host ID --model ID --configuration-id ID --catalog-id ID --authority-policy-id ID --sandbox-mode read-only|workspace-write --case-author-id ID --runner-id ID --reviewer-id ID --grader-id ID [options]");
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
