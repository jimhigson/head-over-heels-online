import type { ChalkInstance } from "chalk";

import chalk from "chalk";

// Pre-calculate colored browser names
const chromiumDesktopColored = (() => {
  const googleColors = [
    chalk.rgb(66, 133, 244), // Blue
    chalk.rgb(234, 67, 53), // Red
    chalk.rgb(251, 188, 4), // Yellow
    chalk.rgb(52, 168, 83), // Green
  ];
  return (
    "chromium"
      .split("")
      .map((char, i) => googleColors[Math.floor(i / 2) % 4](char))
      .join("") + chalk.gray("-desktop")
  );
})();

const chromiumMobileColored = (() => {
  const googleColors = [
    chalk.rgb(66, 133, 244), // Blue
    chalk.rgb(234, 67, 53), // Red
    chalk.rgb(251, 188, 4), // Yellow
    chalk.rgb(52, 168, 83), // Green
  ];
  return (
    "chromium"
      .split("")
      .map((char, i) => googleColors[Math.floor(i / 2) % 4](char))
      .join("") + chalk.gray("-mobile")
  );
})();

const chromeDesktopColored = (() => {
  const googleColors = [
    chalk.rgb(66, 133, 244), // Blue
    chalk.rgb(234, 67, 53), // Red
    chalk.rgb(251, 188, 4), // Yellow
    chalk.rgb(52, 168, 83), // Green
  ];
  return (
    "chrome"
      .split("")
      .map((char, i) => googleColors[Math.floor(i / 2) % 4](char))
      .join("") + chalk.gray("-desktop")
  );
})();

const chromeMobileColored = (() => {
  const googleColors = [
    chalk.rgb(66, 133, 244), // Blue
    chalk.rgb(234, 67, 53), // Red
    chalk.rgb(251, 188, 4), // Yellow
    chalk.rgb(52, 168, 83), // Green
  ];
  return (
    "chrome"
      .split("")
      .map((char, i) => googleColors[Math.floor(i / 2) % 4](char))
      .join("") + chalk.gray("-mobile")
  );
})();

const firefoxDesktopColored = (() => {
  const spanishOrange = chalk.rgb(230, 96, 0); // Spanish Orange
  const vividGamboge = chalk.rgb(255, 149, 0); // Vivid Gamboge
  const philippineYellow = chalk.rgb(255, 203, 0); // Philippine Yellow
  const usafaBlue = chalk.rgb(0, 83, 159); // USAFA Blue
  const blueCola = chalk.rgb(0, 149, 221); // Blue Cola
  const russianViolet = chalk.rgb(51, 30, 84); // Russian Violet

  return (
    spanishOrange("f") +
    vividGamboge("ir") +
    philippineYellow("e") +
    usafaBlue("f") +
    blueCola("o") +
    russianViolet("x") +
    chalk.gray("-desktop")
  );
})();

const firefoxMobileColored = (() => {
  const spanishOrange = chalk.rgb(230, 96, 0); // Spanish Orange
  const vividGamboge = chalk.rgb(255, 149, 0); // Vivid Gamboge
  const philippineYellow = chalk.rgb(255, 203, 0); // Philippine Yellow
  const usafaBlue = chalk.rgb(0, 83, 159); // USAFA Blue
  const blueCola = chalk.rgb(0, 149, 221); // Blue Cola
  const russianViolet = chalk.rgb(51, 30, 84); // Russian Violet

  return (
    spanishOrange("f") +
    vividGamboge("ir") +
    philippineYellow("e") +
    usafaBlue("f") +
    blueCola("o") +
    russianViolet("x") +
    chalk.gray("-mobile")
  );
})();

const webkitDesktopColored = (() => {
  const deepBlue = chalk.rgb(30, 58, 138); // Deep blue
  const lightBlue = chalk.rgb(90, 200, 250); // Light cyan/blue
  const red = chalk.rgb(234, 67, 53); // Red

  return (
    deepBlue("w") +
    lightBlue("e") +
    red("bk") +
    lightBlue("i") +
    deepBlue("t") +
    chalk.gray("-desktop")
  );
})();

const webkitMobileColored = (() => {
  const deepBlue = chalk.rgb(30, 58, 138); // Deep blue
  const lightBlue = chalk.rgb(90, 200, 250); // Light cyan/blue
  const red = chalk.rgb(234, 67, 53); // Red

  return (
    deepBlue("w") +
    lightBlue("e") +
    red("bk") +
    lightBlue("i") +
    deepBlue("t") +
    chalk.gray("-mobile")
  );
})();

const safariDesktopColored = (() => {
  const deepBlue = chalk.rgb(30, 58, 138); // Deep blue
  const lightBlue = chalk.rgb(90, 200, 250); // Light cyan/blue
  const red = chalk.rgb(234, 67, 53); // Red

  return (
    deepBlue("s") +
    lightBlue("a") +
    red("fa") +
    lightBlue("r") +
    deepBlue("i") +
    chalk.gray("-desktop")
  );
})();

const safariMobileColored = (() => {
  const deepBlue = chalk.rgb(30, 58, 138); // Deep blue
  const lightBlue = chalk.rgb(90, 200, 250); // Light cyan/blue
  const red = chalk.rgb(234, 67, 53); // Red

  return (
    deepBlue("s") +
    lightBlue("a") +
    red("fa") +
    lightBlue("r") +
    deepBlue("i") +
    chalk.gray("-mobile")
  );
})();

const coloredBrowserNames: Record<string, string> = {
  "chromium-desktop": chromiumDesktopColored,
  "chromium-mobile": chromiumMobileColored,
  "chrome-desktop": chromeDesktopColored,
  "chrome-mobile": chromeMobileColored,
  "firefox-desktop": firefoxDesktopColored,
  "firefox-mobile": firefoxMobileColored,
  "webkit-desktop": webkitDesktopColored,
  "webkit-mobile": webkitMobileColored,
  "safari-desktop": safariDesktopColored,
  "safari-mobile": safariMobileColored,
  "mobile-chrome": chromeMobileColored,
  "mobile-safari": safariMobileColored,
};

export const getProjectColour = (projectName: string): ChalkInstance => {
  const isMobile = projectName.includes("mobile");
  const baseColours: Record<string, ChalkInstance> = {
    "chromium-desktop": chalk.rgb(66, 133, 244), // Google Chrome blue
    "firefox-desktop": chalk.rgb(255, 154, 0), // Firefox orange
    "webkit-desktop": chalk.rgb(0, 122, 255), // Safari blue
    "mobile-chrome": chalk.rgb(66, 133, 244), // Chrome blue
    "mobile-safari": chalk.rgb(0, 122, 255), // Safari blue
  };
  const colour = baseColours[projectName] ?? chalk.white;
  // Add dark gray background for mobile browsers
  return isMobile ? colour.bgGray : colour;
};

export const formatProjectName = (projectName: string): string => {
  // Use pre-calculated colored names if available
  if (coloredBrowserNames[projectName]) {
    return coloredBrowserNames[projectName];
  }

  // Default formatting for unknown browsers
  return getProjectColour(projectName)(projectName);
};

export const progressLogHeader = (
  projectName: string,
  progress: number,
  batchIndex?: number,
): string => {
  const formattedName = formatProjectName(projectName);
  return `${chalk.gray("[")} ${formattedName} batch=${batchIndex ?? 0} ${progress}%${chalk.gray("]")}`;
};
