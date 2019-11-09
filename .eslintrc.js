module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'airbnb/base'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-console': 'off',
    'no-debugger': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
