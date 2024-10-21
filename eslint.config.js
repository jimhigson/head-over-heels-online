import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
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
      "prettier": prettier,
    },
    rules: {
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
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsForRegex: ["^(draft|app)"],
        },
      ],
      "prettier/prettier": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^(_|app)",           
          "caughtErrorsIgnorePattern": "^_"
        }
    ]
    },
  },
);
