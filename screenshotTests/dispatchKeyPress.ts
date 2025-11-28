import type { Page } from "@playwright/test";

/** dispatches key presses in a way that our special key handling can pick up (@see keyboardState) */
export const dispatchKeyPress = async (
  page: Page,
  /**
   * The key value (e.g., "m", "Escape")
   */
  key: string,
  /**
   * The code value (e.g., "KeyM", "Escape")
   */
  code: string,
) => {
  await page.evaluate(
    ({ key, code }) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, code }));
    },
    { key, code },
  );
  await page.waitForTimeout(100);
  await page.evaluate(
    ({ key, code }) => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key, code }));
    },
    { key, code },
  );
};
