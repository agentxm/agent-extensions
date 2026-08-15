# Bundle update log

## 2026-08-12

* **Update**: Restated the bundle's scope and grouped concepts by the question
  they answer. The bundle is documentation craft generally; Diátaxis is now
  named as an **adopted commitment on one axis** (what kinds of documentation
  exist) rather than as the boundary of the subject, so non-Diátaxis concepts
  can be added without contradiction. Moved the four type pairs to `types/`
  and the genre concepts to `genres/`, each with a section index; craft,
  quality, and workflow concepts stay at the root. Attributed the completeness
  claim in [Documentation craft](docs-explainer.md) to Diátaxis in its own
  words and bounded it to the map of reader needs — it is not a claim that
  documentation has no other concerns. Rewired every internal link and updated
  the `author-docs` routing table for the new paths. Deliberately **not** an
  `approaches/` or `frameworks/` shelf: Diátaxis fills the type axis rather
  than competing on it, and the bundle takes no position on DITA,
  Information Mapping, or other systems.

* **Creation**: Added [Playbook explainer](genres/playbook-explainer.md) and
  [Runbook explainer](genres/runbook-explainer.md) as the bundle's first **genre**
  concepts — named artifacts that decompose into the four types rather than
  extending them. Established the framing in a new “Genres are not types”
  section of [Documentation craft](docs-explainer.md) so the “no fifth kind”
  claim stays intact, and added a Genres section to the [index](index.md).
  Explainer-only by design: authoring a play or a procedure is
  [how-to](types/how-to-guide.md) craft, so no paired `*-guide` was written.
  Ownership split to avoid duplication — the playbook explainer owns the
  playbook↔runbook boundary table and the note that the distinction is
  contested (business *playbook* vs IT *runbook* is largely tradition); the
  runbook explainer owns the runbook↔how-to boundary table and links across.
  The playbook explainer disambiguates the Ansible homonym.

* **Update**: Named the reducibility asymmetry that the genre framing left
  implicit. The [playbook explainer](genres/playbook-explainer.md) now owns a
  “reducibility test” section, placed after the contested-distinction note so
  it reads as the craft-native answer to *how do I actually tell?* — a runbook
  reduces to one how-to guide, a playbook does not, and the deciding question
  is whether a branch sits **within** a procedure or **between** procedures.
  [Documentation craft](docs-explainer.md) generalizes reducibility to any
  host-invented genre; the [runbook explainer](genres/runbook-explainer.md) states
  its own side and links across rather than restating the test.

## 2026-08-07

* **Update**: Whole-bundle guide evaluation pass (eval-whatever criteria,
  calibrated against the [how-to guide](types/how-to-guide.md)). Brought the
  [tutorial guide](types/tutorial-guide.md) and [reference guide](types/reference-guide.md)
  up to the refined pair pattern: recorded document-level `sources`
  (paired explainer + Diátaxis type page), added “Language that fits” links to
  the explainer-owned language shapes, and deduplicated Pitfalls to defer the
  failure-mode taxonomy to each explainer while keeping production-time
  pitfalls only. Reframed the tutorial guide’s first step to the shared-journey
  framing (*In this tutorial we will…*, not *you will learn…*) and added
  map ↔ territory mirroring to the reference guide’s shape step. Recorded
  `sources` provenance on the
  [Documentation craft guide](docs-guide.md). The
  [how-to](types/how-to-guide.md), [explanation](types/explanation-guide.md), and
  [workflow](workflow-guide.md) guides were judged sound and preserved
  unchanged.

* **Update**: Whole-bundle explainer evaluation pass (eval-whatever criteria,
  calibrated against the [how-to explainer](types/how-to-explainer.md)). Synced the
  drifted “Generality” row of the tutorial-vs-how-to boundary table in the
  [tutorial explainer](types/tutorial-explainer.md) to the refined how-to wording,
  restored mirror parity on the “Prompt” row of the explanation↔reference
  boundary tables in the [explanation explainer](types/explanation-explainer.md),
  and fixed ordered-list continuation indentation in the Quality principles of
  [Documentation craft](docs-explainer.md). The
  [reference](types/reference-explainer.md), [quality](quality-explainer.md), and
  [workflow](workflow-explainer.md) explainers were judged sound and preserved
  unchanged.

* **Update**: Deduplicated the how-to pair to match the explanation pair —
  the [how-to explainer](types/how-to-explainer.md) now solely owns the language
  shapes, title-grades table, and failure-mode taxonomy; the
  [how-to guide](types/how-to-guide.md) links to them and keeps only
  production-time pitfalls. Tightened the explainer’s recipe-model passage,
  retitled the grades table’s third column to “Why,” and corrected
  future-dated `generated.at` provenance. Removed provably false future
  `generated.at` values from the [tutorial](types/tutorial-explainer.md) and
  [reference](types/reference-explainer.md) explainers (true generation time
  unknown; omitted rather than invented).

* **Update**: Deduplicated the explanation pair — the
  [explanation explainer](types/explanation-explainer.md) now solely owns the
  characteristic language shapes and the failure-mode taxonomy; the
  [explanation guide](types/explanation-guide.md) links to them and keeps only
  production-time pitfalls. Clarified the explainer’s “in the bath” and McGee
  passages and corrected future-dated `generated.at` provenance on both.

* **Creation**: Added [Documentation workflow](workflow-explainer.md) and
  [Documentation workflow guide](workflow-guide.md) (iterative remediation:
  guide not plan, no empty type shells, inside-out structure, choose → assess
  → one action → publish, complete not finished) and
  [Documentation quality](quality-explainer.md) (functional vs deep quality;
  type craft’s role). Wired index and overall craft cross-links.

* **Update**: Deferred claim citation clutter on all `*-explainer` concepts —
  document-level provenance stays in frontmatter `sources` only; removed dense
  body `[^id]` marks and URL-restating footnote definitions (OKF provenance
  policy).

* **Update**: Deepened all explainers from Diátaxis source (GitHub
  `evildmp/diataxis-documentation-framework`) plus Johnson/Mintlify notes —
  [docs-explainer](docs-explainer.md) (foundations, map, compass, cycle,
  neighbour bleed), [tutorial-explainer](types/tutorial-explainer.md) (lesson
  contract, pedagogy principles, language),
  [reference-explainer](types/reference-explainer.md) (austere description, map
  structure, reference vs explanation),
  [how-to-explainer](types/how-to-explainer.md) (title grades, source URL parity),
  [explanation-explainer](types/explanation-explainer.md) (McGee model, unfold/grasp,
  reference boundary).

* **Update**: Deepened [explanation guide](types/explanation-guide.md) from Diátaxis
  source (`explanation.rst`, `reference-explanation.rst`) and secondary notes
  (Johnson, Mintlify) — *about* framing, study-not-work orientation,
  connections/context/opinion, tightly bounded scope, language checks, and
  job-drift review.

* **Update**: Realigned [how-to guide](types/how-to-guide.md) to Diátaxis source
  (`how-to-guides.rst`): contract-style executable approach, logical sequence,
  seek flow, omit-the-unnecessary (join to the reader’s work), naming, and
  GitHub source provenance. Light quality-signal tweak on
  [how-to explainer](types/how-to-explainer.md).

* **Update**: Deepened [how-to guide](types/how-to-guide.md) to operationalize the
  explainer and Diátaxis how-to principles — user-problem framing, adaptable
  (non-only-linear) steps, omit-the-unnecessary, language/title checks, and
  failure-mode pitfalls.

* **Update**: Deepened [how-to explainer](types/how-to-explainer.md) from Diátaxis
  (goal/work placement, user-not-machinery framing, recipe model, flow,
  tutorial boundary, language and naming) plus secondary pattern notes
  (Johnson, Mintlify).

* **Update**: Deepened [explanation explainer](types/explanation-explainer.md) from
  Diátaxis (reflection, study/cognition placement, *About* framing, opinion,
  bounding, absorption risk) and secondary pattern notes.

* **Update**: Renamed concepts to explicit `*-explainer` / `*-guide` pairs —
  [docs-explainer](docs-explainer.md) / [docs-guide](docs-guide.md),
  [tutorial-explainer](types/tutorial-explainer.md) /
  [tutorial-guide](types/tutorial-guide.md),
  [how-to-explainer](types/how-to-explainer.md) / [how-to-guide](types/how-to-guide.md),
  [reference-explainer](types/reference-explainer.md) /
  [reference-guide](types/reference-guide.md),
  [explanation-explainer](types/explanation-explainer.md) /
  [explanation-guide](types/explanation-guide.md).

* **Update**: Doubled concepts into explainer + authoring pairs for overall
  craft and each Diátaxis type (later renamed to `*-explainer` / `*-guide`).

* **Update**: Replaced taxonomy, kind inventory, audience, authority, and
  frontmatter concepts with Diátaxis-aligned craft.

* **Creation**: Established the docs craft bundle.
