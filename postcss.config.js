import tailwindcss from "tailwindcss";

import pruneUnused from "./postcss-prune-unused.js";

export default {
  plugins: [tailwindcss(), pruneUnused()],
};
