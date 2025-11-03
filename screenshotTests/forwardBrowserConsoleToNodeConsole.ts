import type { Page } from "@playwright/test";

import chalk from "chalk";

export const forwardBrowserConsoleToNodeConsole = (
  page: Page,
  formattedName: string,
) => {
  // Capture browser console logs
  page.on("console", (msg) => {
    const type = msg.type();
    const text = msg.text();
    console.log(
      `${formattedName} [${chalk.yellow("Console")} ${type}] ${text}`,
    );
  });

  // Capture browser errors
  page.on("pageerror", (error) => {
    console.error(
      `${formattedName} ${chalk.red("[Page Error]")} ${error.message}`,
    );
    console.error(error.stack);
  });
};
