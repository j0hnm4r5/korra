export default {
  env: { browser: true, node: true },
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended'
  ],
  plugins: ['import', 'no-use-extend-native', 'prettier', 'promise', 'unicorn'],
  rules: {
    'no-use-extend-native/no-use-extend-native': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'no-console': 'off',
    'prefer-const': 'off',
    'no-plusplus': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off'
  }
};
