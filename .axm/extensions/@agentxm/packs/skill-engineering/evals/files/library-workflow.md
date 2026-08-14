# Synthetic library workflow

Maintainers repeatedly convert a checked-in `releases.yaml` file into a concise
Markdown release digest. The job reads only that file, preserves version and
date, groups entries by category, rejects unknown categories, and writes an
explicitly named output. It never publishes a release or changes source data.
The test host and model are available locally. All fixtures are synthetic and
the eventual package contains only Markdown plus a deterministic local script.

