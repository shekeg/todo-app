module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['prettier'],
};
