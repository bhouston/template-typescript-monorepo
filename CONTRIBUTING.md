# Contributing

Shared workflow for human contributors and coding agents (Claude, Codex). `AGENTS.md`
and `CLAUDE.md` point here; keep the standard in this file only.

## Issue → branch → PR

1. Before implementing a feature or fix, open a GitHub issue (or reuse a matching
   existing one). Include a description, motivation, and acceptance criteria.
2. Branch from current `origin/main`. Branch names are not required to follow any
   convention. Never commit directly to `main`.
3. Use Conventional Commits for every commit: `type(scope): description`. Types:
   `feat`, `fix`, `perf`, `docs`, `chore`, `refactor`, `test`, `style`, `build`,
   `ci`, `revert`.
4. Run the checks below and fix any failures before requesting review.
5. Push the branch and open a PR against `main`, with a Conventional Commit title
   and `Closes #<issue>` in the body. PRs are merged with merge commits
   (`gh pr merge --merge`); never squash or rebase-merge.

## Local checks

Use pnpm (pinned via `packageManager` in `package.json`), then install dependencies.
This enables Husky's pre-commit hooks.

```sh
pnpm install
pnpm tsc    # typecheck/build (tsc -b)
pnpm lint   # oxlint
pnpm test   # vitest
pnpm build  # full build across the workspace
```

## Releases

This is a template repository (`"private": true`, not published to npm). It has no
release/publish pipeline of its own — it's cloned or used via `degit`/"Use this
template" as a starting point for other projects, not versioned and shipped itself.
