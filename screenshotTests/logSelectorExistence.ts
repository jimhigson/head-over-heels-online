import type { Page } from "@playwright/test";

export const logSelectorExistence = async (
  page: Page,
  selector: string,
  logHeader: string,
  context?: string,
): Promise<number> => {
  const count = await page.locator(selector).count();
  const contextStr = context ? ` (${context})` : "";
  console.log(
    `${logHeader}: Selector "${selector}"${contextStr} - found ${count} element(s)`,
  );
  return count;
};
