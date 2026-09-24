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
      // the cheats' cmd-k menu lists the editor's item buttons, so it needs
      // the classes their icons are drawn with
      "./src/editor/toolbar/buttonDefinitions.tsx",
      "./src/editor/toolbar/buttonSizeClassNames.tsx",
      "./src/editor/toolbar/CmdKContents.tsx",
      "./src/editor/toolbar/buttons/ToolbarButtonContentPatterns.tsx",
    ],
    extract: extractClassesInMarkdown,
  },
} satisfies Config;
