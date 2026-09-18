import { type Config } from "tailwindcss";

import {
  extractClassesInMarkdown,
  tailwindBaseConfig,
} from "./tailwind.base.config";

export default {
  ...tailwindBaseConfig,
  content: {
    files: [
      "./scripts/font/editor/**/*.{ts,tsx,html}",
      // the font editor borrows src/ui's components, which carry their own
      // classes
      "./src/ui/**/*.{ts,tsx}",
    ],
    extract: extractClassesInMarkdown,
  },
} satisfies Config;
