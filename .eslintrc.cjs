/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "ignorePatterns": ["node_modules/**/*", "*.json", "src/static/**/*"],
  rules: {
    'no-console': 'off',
  },
};