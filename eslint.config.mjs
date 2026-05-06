import { globalIgnores } from "eslint/config";
import jseslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";

export default tseslint.config(
  globalIgnores( [ "dist/**", "node_modules/**", "studio/**", ".astro/**" ] ),
  jseslint.configs.recommended,
  tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [ "error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      } ],
      "indent": [ "error", 2 ],
      "array-bracket-spacing": [ 2, "always" ],
      "arrow-parens": [ 2, "as-needed" ],
      "comma-dangle": [ "error", "always-multiline" ],
      "keyword-spacing": [ 2, {
        after: true,
        overrides: {
          if: { after: false },
          for: { after: false },
        },
      } ],
      "no-multi-spaces": [ 2 ],
      "object-curly-spacing": [ 2, "always" ],
      "quotes": [ 2, "double", {
        avoidEscape: true,
        allowTemplateLiterals: true,
      } ],
      "semi": [ 2, "always" ],
      "space-in-parens": [ 2, "always", {
        exceptions: [ "{}" ],
      } ],
      "space-before-blocks": [ 2, "always" ],
    },
  },
);
