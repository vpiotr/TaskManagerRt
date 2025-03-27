import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import pluginJest from "eslint-plugin-jest";

export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs,jsx}"] },
  { files: ["src/**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  { files: ["src/**/*.{js,mjs,cjs,jsx}"], plugins: {js} , extends: ["js/recommended"] },
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.test.{js,mjs,cjs,jsx}'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },  
]);