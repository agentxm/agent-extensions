# Licensing public extensions

This repository licenses each extension as an independently distributed
package. The SPDX expression in an extension manifest is authoritative for
that package; a pack's license covers the pack's own files and does not
relicense its dependencies.

## Default scheme

Apply these defaults prospectively to newly published packages:

| Package content | Default license |
| --- | --- |
| Skills, rules, scripts, templates, MCP servers, hooks, pack metadata, and mixed software-and-prose packages | `MIT` |
| Pure standalone knowledge or documentation bundles | `CC-BY-4.0` |
| Adapted or vendored third-party material | The applicable upstream license |

Use `CC-BY-SA-4.0` only when ShareAlike is inherited from upstream material or
the package deliberately adopts reciprocal licensing. Record that choice and
its scope in the package README or third-party notices. Published releases keep
the license under which they were released; applying this policy does not
retroactively relicense them.

## Choosing a package license

1. Identify the copyright and redistribution terms for every source, template,
   asset, fixture, and vendored file included in the package.
2. Classify the package's original content. Use `MIT` when it contains
   executable behavior or mixes software-like instructions with supporting
   prose. Use `CC-BY-4.0` only when the package is a standalone body of
   non-software knowledge or documentation.
3. Preserve third-party terms at file level. Do not describe original guidance
   about a public API as vendored source, and do not describe copied or adapted
   material as merely inspirational.
4. Set the manifest to the SPDX expression recipients must satisfy for the
   complete package. Use `AND` when separately licensed parts require
   compliance with every named license; use `OR` only when recipients may
   choose among licenses.
5. Keep pack metadata under its own default. Dependencies retain the licenses
   in their manifests even when a pack installs them together.

When a package contains more than one license, identify the file-level boundary
in its README or in [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md). Keep
the complete text of every applicable license in [`LICENSES/`](../LICENSES/).

## Generated output

An extension's license governs the extension package itself. Merely using an
extension does not automatically apply that license to user-created output.
Output that copies or adapts licensed package material may still carry the
applicable obligations; do not promise that generated output is free of
third-party or package rights.

## Required records

For every public package:

- declare one valid SPDX expression in its manifest;
- state the license in the package README when it has one;
- update [`LICENSE.md`](../LICENSE.md) when the repository summary changes;
- record third-party provenance, source pins, modifications, attribution, and
  file-level license boundaries in
  [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md); and
- verify redistribution rights and licensing during the
  [publishing review](publishing.md).

These records document distribution terms; they do not replace a rights review
or legal advice when ownership, adaptation, or license compatibility is
uncertain.
