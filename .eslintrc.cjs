module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:svelte/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        sourceType: "script",
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".svelte"],
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
