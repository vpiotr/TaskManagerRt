import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs,jsx}"], },
  { files: ["src/**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  { files: ["src/**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  pluginReact.configs.flat.recommended,
]);