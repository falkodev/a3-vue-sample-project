/* eslint-env node */
module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  globals: {
    apos: true,
    require: true,
    export: true,
    module: true,
    process: true,
    self: true,
    importScripts: true,
    workbox: true,
    options: true,
  },
  overrides: [
    {
      files: ['cypress/integration/**.spec.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  rules: {
    'no-var': 'error',
    'no-console': 0,
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        eslintIntegration: true,
        printWidth: 80,
      },
    ],
  },
}
