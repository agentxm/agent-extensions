# Synthetic evaluation-harness record

The evaluation harness ran five trials in one shared output directory without
resetting it. Trial 1 created `report.md`; trials 2–5 reported success whenever
that path already existed. The harness retained only its aggregate pass count,
not the skill outputs, file hashes, traces, or per-trial starting state.
