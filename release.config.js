// None of this repo's packages are published (it's a template, not a library
// registry entry), so semantic-release here only computes the next version
// from Conventional Commits, writes CHANGELOG.md, and creates the git tag +
// GitHub Release. Nothing is `npm publish`'d.
//
// When you copy this template into a repo that DOES publish npm packages,
// uncomment the block below (see mtlx/release.config.js for the working
// version) to publish each workspace package with
// `@anolilab/semantic-release-pnpm` (add it, plus `@semantic-release/npm`'s
// peer requirements, to devDependencies first):
//
// const packages = ['packages/core', 'packages/cli']; // dependency order
// ...
// ...packages.map((path) => ['@anolilab/semantic-release-pnpm', { pkgRoot: path }]),
//
// If the repo also ships a VS Code extension, add a `prepare`/`publish` hook
// that pins the extension's version and runs `vsce`/`ovsx` publish — see
// `hdrify/scripts/release-vscode-extension.mjs` for the reusable pattern
// (VSCE_PAT / OVSX_PAT secrets, packaging, and publishing to both the VS Code
// Marketplace and Open VSX).

export default {
  branches: ['main'],
  tagFormat: 'v${version}',
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
    ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits' }],
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    [
      '@semantic-release/github',
      {
        assets: ['CHANGELOG.md'],
        successComment: false,
        failComment: false,
        releasedLabels: false,
      },
    ],
  ],
};
