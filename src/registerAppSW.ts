import { registerSW } from "virtual:pwa-register";
import { type RegisterSWOptions } from "vite-plugin-pwa/types";

import { importOnNeedRefreshOnce } from "./onNeedRefresh.import";

const updateSW = registerSW({
  async onNeedRefresh() {
    (await importOnNeedRefreshOnce()).onNeedRefresh(updateSW);
  },
} satisfies RegisterSWOptions);
