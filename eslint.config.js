import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import perfectionist from "eslint-plugin-perfectionist";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "src/_generated",
      "package.json",
      "vite.config.ts.*",
      "dev-dist",
      ".vite",
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
      perfectionist,
    },
    rules: {
      //    "no-shadow": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
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
      "react-hooks/exhaustive-deps": [
        "error",
        {
          // @see @dyljhd/use-effect-debugger
          // https://www.npmjs.com/package/@dyljhd/use-effect-debugger
          additionalHooks: "useEffectDebugger",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
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

      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "hohjs-production",
              message:
                "Do not import from hohjs-production - this is only for type compatibility testing",
            },
          ],
          patterns: [
            {
              group: ["hohjs-production/*"],
              message:
                "Do not import from hohjs-production - this is only for type compatibility testing",
            },
          ],
        },
      ],

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
