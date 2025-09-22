// eslint.config.js
import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginPromise from 'eslint-plugin-promise';

export default ts.config(
  js.configs.recommended,
  ts.configs.recommended,
  prettierRecommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        allowDefaultProject: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],

      // Additional typed rules (pragmatic)
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-for-in-array': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'warn',
      '@typescript-eslint/no-confusing-void-expression': [
        'warn',
        { ignoreArrowShorthand: true },
      ],
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',

      // Keep noisy unsafe rules disabled for now
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      // TS error-prevention (moderate noise)
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'warn',
        { allowNumber: true, allowBoolean: true, allowNullish: true },
      ],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',

      // General JS error-prevention rules
      'array-callback-return': 'error',
      'no-async-promise-executor': 'error',
      'default-case-last': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-constant-binary-expression': 'error',
      'no-useless-return': 'warn',
      'no-return-assign': ['error', 'always'],
      'no-await-in-loop': 'warn',
      'require-atomic-updates': 'warn',
      'no-useless-catch': 'warn',
      'no-new-wrappers': 'error',
      'no-implicit-coercion': [
        'warn',
        { boolean: true, number: true, string: true },
      ],
      'consistent-return': 'error',
      'no-fallthrough': 'error',
      'no-promise-executor-return': 'error',
      'no-constructor-return': 'error',
      radix: ['error', 'always'],
      'valid-typeof': 'error',
      'prefer-promise-reject-errors': 'warn',

      // General quality (lightweight)
      'prefer-const': 'warn',
      'no-var': 'warn',
      eqeqeq: ['error', 'always'],

      // Disallow dynamic imports
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportExpression',
          message:
            'Dynamic imports are not allowed. Please use static imports instead. If you need to use dynamic imports, add an eslint-disable comment.',
        },
      ],

      // Remove unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Import organization
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          warnOnUnassignedImports: true,
        },
      ],
      'import/no-duplicates': 'error',

      // Disable base rule in favor of unused-imports
      'no-unused-vars': 'off',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./packages/*/tsconfig.json'],
        },
      },
    },
  },
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/.output',
      '**/.nitro',
      '**/.tanstack',
      '**/.vinxi',
      '**/_doNotUse',
      '**/routeTree.gen.ts',
      '**/pnpm-lock.yaml',
      '**/coverage',
      '**/*.d.ts',
      'eslint.config.js',
      'prettier.config.ts',
      '**/vite.config.*',
      '**/nitro.config.*',
      '**/eslint-rules',
      'vitest.config.ts',
      '**/bin/**',
      '**/.terraform/**',
    ],
  },
);
