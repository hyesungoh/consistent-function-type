module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:eslint-plugin/recommended', 'prettier'],
  plugins: ['prettier', 'consistent-function-type'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.test.js'],
      extends: ['plugin:jest/recommended'],
    },
  ],
};
