import tailwindcss from "@tailwindcss/postcss";

import pruneUnused from "./postcss-prune-unused.js";

export default {
  plugins: [tailwindcss(), pruneUnused()],
};
