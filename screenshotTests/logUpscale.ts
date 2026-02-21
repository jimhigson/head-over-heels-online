import type { Page } from "@playwright/test";

export const logUpscale = async (page: Page, logHeader: string) => {
  const upscale = await page.evaluate(
    () => window._e2e_store?.getState().upscale,
  );
  console.log(`${logHeader} upscale:`, upscale);
};
