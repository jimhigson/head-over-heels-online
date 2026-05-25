import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "src/_generated",
      "package.json",
      "vite.config.ts.*",
      "dev-dist",
      ".vite",
      "src-tauri/target",
    ],
  },
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
      import: importPlugin,
      perfectionist,
      unicorn,
    },
    rules: {
      //    "no-shadow": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-useless-rename": "error",
      curly: ["error", "all"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-var": "error",
      "prefer-const": "error",
      "no-else-return": "error",
      "prefer-arrow-callback": "error",
      "no-eval": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "unicorn/numeric-separators-style": "error",
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
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "prettier/prettier": ["error", { experimentalTernaries: true }],
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program > ExpressionStatement > AwaitExpression",
          message:
            "Top-level await is poorly supported by safari with dynamic imports.",
        },
      ],
      "no-prototype-builtins": "off",

      "perfectionist/sort-imports": [
        "error",
        {
          newlinesBetween: "always",
          order: "asc",
          type: "alphabetical",
        },
      ],

      "perfectionist/sort-named-imports": ["error", { type: "natural" }],

      "perfectionist/sort-union-types": [
        "error",
        {
          partitionByComment: true,
        },
      ],

      "@typescript-eslint/prefer-as-const": ["off"],
    },
  },
);
