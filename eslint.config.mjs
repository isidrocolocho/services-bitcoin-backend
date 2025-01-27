import globals from "globals";

import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], LanguageOptions: { sourceType: "commonjs" } },
  { LanguageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
