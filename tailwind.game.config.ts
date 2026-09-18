import { type Config } from "tailwindcss";

import {
  extractClassesInMarkdown,
  tailwindBaseConfig,
} from "./tailwind.base.config";

export default {
  ...tailwindBaseConfig,
  content: {
    // the game's css leaves out classes only the editor uses. Two patterns
    // because `src/!(editor)/**` alone misses files directly in src/
    files: [
      "./index.html",
      "./src/*.{js,ts,jsx,tsx,md}",
      "./src/!(editor)/**/*.{js,ts,jsx,tsx,md}",
    ],
    extract: extractClassesInMarkdown,
  },
} satisfies Config;
