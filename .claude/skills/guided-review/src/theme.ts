/* light, dark, or "system" (follows the OS/browser). Remembered per reader -
   which theme you prefer is a habit, not something to re-choose per review. */

import { makeStore } from "./stores.ts";

export type Theme = "dark" | "light" | "system";

const storageKey = "guidedReviewTheme";

const isTheme = (value: null | string): value is Theme =>
  value === "system" || value === "light" || value === "dark";

const remembered = (): Theme => {
  try {
    const stored = localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : "system";
  } catch {
    return "system";
  }
};

/** page.css only overrides light/dark explicitly via this attribute; leaving
    it unset falls through to the plain prefers-color-scheme media query */
const applyToDocument = (theme: Theme): void => {
  if (theme === "system") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }
};

export const themeStore = makeStore<Theme>(remembered());
// applied at import time, ahead of the first render, so the page never
// flashes the wrong theme before this module has had a chance to run
applyToDocument(themeStore.get());

export const setTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    /* storage unavailable - the choice just won't outlive the page */
  }
  applyToDocument(theme);
  themeStore.set(theme);
};
