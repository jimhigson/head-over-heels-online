import type { Page } from "@playwright/test";

import { elapsed } from "./projectName";

export const logUpscale = async (page: Page, logHeader: string) => {
  const upscale = await page.evaluate(
    () => window._e2e_store?.getState().upscale,
  );
  console.log(`${logHeader} ${elapsed()} upscale:`, upscale);
};
