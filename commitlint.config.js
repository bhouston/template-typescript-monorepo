export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'perf', 'docs', 'chore', 'refactor', 'test', 'style', 'build', 'ci', 'revert'],
    ],
  },
};
