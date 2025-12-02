import type { Page } from "@playwright/test";

import type { AppDispatch } from "../src/store/store";

export const dispatchToStore = async (
  page: Page,
  action: Parameters<AppDispatch>[0],
): Promise<boolean> => {
  const storeExists = await page.evaluate((action) => {
    if (!window._e2e_store) {
      return false;
    }
    window._e2e_store.dispatch(action);
    return true;
  }, action);

  return storeExists;
};
