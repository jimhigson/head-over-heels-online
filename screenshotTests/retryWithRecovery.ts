import type { Page } from "@playwright/test";

import chalk from "chalk";

import { formatDuration } from "./formatDuration";
import { osSlowness } from "./osSlowness";
import { elapsed } from "./projectName";

export const retryWithRecovery = async <T>({
  action,
  recovery,
  maxAttempts = 5,
  logHeader,
  actionDescription,
  page,
  screenshotPrefix,
}: {
  action: (attempt: number) => Promise<T>;
  recovery?: (attempt: number) => Promise<void>;
  maxAttempts?: number;
  logHeader: string;
  actionDescription: string;
  page: Page;
  screenshotPrefix: string;
}): Promise<T> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    console.log(
      `${logHeader} ${elapsed()} Attempting ${actionDescription} (attempt ${attempt}/${maxAttempts - 1})...`,
    );

    const startTime = performance.now();
    try {
      const result = await action(attempt);
      console.log(
        `${logHeader} ${elapsed()} ... succeeded after`,
        chalk.yellow(formatDuration(performance.now() - startTime)),
      );
      return result;
    } catch (error) {
      console.log(
        `${logHeader} ${elapsed()} ${chalk.red(`Failed on attempt ${attempt}`)}: ${error}`,
      );

      // Take a screenshot on failure
      const screenshotPath = `test-results/${screenshotPrefix}-attempt-${attempt}-failed.png`;
      console.log(
        `${logHeader} ${elapsed()} Saving screenshot to ${screenshotPath}`,
      );
      await page
        .screenshot({
          path: screenshotPath,
          fullPage: false,
        })
        .catch((screenshotError) => {
          console.log(
            `${logHeader} ${elapsed()} Failed to save screenshot: ${screenshotError}`,
          );
        });

      if (attempt < maxAttempts - 1) {
        await page.waitForTimeout(500 * osSlowness);
        if (recovery) {
          await recovery(attempt);
        }
      } else {
        throw new Error(
          `Failed ${actionDescription} after ${maxAttempts} attempts: ${error}`,
        );
      }
    }
  }

  throw new Error(`Failed ${actionDescription} after ${maxAttempts} attempts`);
};
