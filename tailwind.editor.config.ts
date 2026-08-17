import { type Config } from "tailwindcss";

import {
  extractClassesInMarkdown,
  tailwindBaseConfig,
} from "./tailwind.base.config";

export default {
  ...tailwindBaseConfig,
  content: {
    // the editor draws the game's rooms, so it needs the whole of src
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,md}"],
    extract: extractClassesInMarkdown,
  },
} satisfies Config;
