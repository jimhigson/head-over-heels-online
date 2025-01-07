import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  { ignores: ["dist", "src/_generated", "package.json"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
      "unused-imports": unusedImports,
    },
    rules: {
      //    "no-shadow": "error",
      "no-console": "warn",
      "no-useless-rename": "error",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "object-shorthand": [
        "error",
        "always",
        { avoidExplicitReturnArrows: true },
      ],
      "no-param-reassign": ["off"],
      // this will cause the editor to strip unused imports on save
      "unused-imports/no-unused-imports": "error",

      "prefer-destructuring": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "prettier/prettier": ["error", { experimentalTernaries: true }],
    },
  },
);
