export const spritesheetUrlFromCssVar = (element: Element): string =>
  getComputedStyle(element)
    .getPropertyValue("--spritesheetUrl")
    .trim()
    .replace(/^url\(['"]?/, "")
    .replace(/['"]?\)$/, "")
    .replace(/\?.*$/, "");
