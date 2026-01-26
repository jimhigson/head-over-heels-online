import type { ConsoleMessage, Page } from "@playwright/test";

import chalk from "chalk";

type Colour = (a: string) => string;

const colours = {
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  log: chalk.green,
} as Partial<Record<ReturnType<ConsoleMessage["type"]>, Colour>>;

const identity = (a: string) => a;

export const forwardBrowserConsoleToNodeConsole = (
  page: Page,
  formattedName: string,
) => {
  // Capture browser console logs
  page.on("console", (msg) => {
    const type = msg.type();
    const text = msg.text();

    const colour = colours[type] ?? identity;

    console.log(
      `${formattedName} [${chalk.yellow("Console")} type="${colour(type)}"] ${text}`,
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
