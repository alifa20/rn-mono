module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'react-hooks'],
  rules: {
    'comma-dangle': 0,
    'react-native/no-inline-styles': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': 'error',
    'import/no-cycle': 0,
    'react/no-unstable-nested-components': 'off',
    'no-nested-ternary': 0,
    'no-shadow': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 0
  },
  overrides: [],
  env: {
    'jest/globals': true
  }
};
