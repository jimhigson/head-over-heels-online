export const spritesheetArtUrlFromCssVar = (element: Element): string =>
  getComputedStyle(element)
    .getPropertyValue("--spritesheetArtUrl")
    .trim()
    .replace(/^url\(['"]?/, "")
    .replace(/['"]?\)$/, "")
    .replace(/\?.*$/, "");
