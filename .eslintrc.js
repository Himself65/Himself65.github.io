module.exports = {
  env: {
    browser: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'graphql',
    'simple-import-sort'
  ],
  rules: {
    semi: 'off',
    eqeqeq: 'error',
    'no-eval': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    ],
    'import/prefer-default-export': 'off',
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    camelcase: 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/semi': 'off',
    // hotfix, refs; https://github.com/typescript-eslint/typescript-eslint/issues/2502
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'graphql/template-strings': [
      'error', {
        env: 'literal'
      }]
  }
}
