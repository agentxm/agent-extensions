# Synthetic missing pack dependency

- Requested target: `@example/skills/normalize-release-notes`
- Active AXM scope: project
- Pack: `@agentxm/packs/agent-engineering`
- Authoring skill: installed and enabled
- Required knowledge sibling: `@agentxm/knowledge/agent-engineering`, not
  installed and not resolvable
- Required creation route: the `authoring-agent-skills` concept
- Current target package: absent
- Authority: create the requested package only after required guidance resolves

No alternate knowledge bundle, copied guide, or host-native authoring method is
declared. Preserve the workspace and report the missing pack dependency and the
condition needed to resume.
