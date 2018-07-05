'use strict';

module.exports = {
  extends: ['airbnb-base', 'plugin:unicorn/recommended', 'prettier'],
  plugins: ['no-use-extend-native', 'prettier', 'promise', 'unicorn'],
  rules: {
    'prettier/prettier': 'error',
    'object-curly-spacing': ['error', 'never'],
    quotes: ['error', 'single'],
    'promise/param-names': 'error',
    'promise/no-return-wrap': ['error', { allowReject: true }],
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/valid-params': 'error',
    'prefer-const': 'off',
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-console': 'off'
  }
};
