# Synthetic audit facts: declared same-pack dependency

Audit target: `@example/skills/author-architecture-records@1.0.0`.

Its manifest declares `standalone: false` and recommends
`@example/packs/architecture`. The pack directly includes the target,
`@example/knowledge/architecture`, and
`@example/skills/maintain-architecture-records`. The target resolves both
siblings by their declared extension identities, and the supported workflow
requires that composition.

The observed active catalog also contains unrelated skills. The audit scope is
package relationship correctness. No behavioral run is supplied.
