/* keeps the browser url in sync with what's on screen - which pr, which file
   - so a reload, or a copied link, lands back in the same place. Always
   replaceState, never pushState: activeId follows the scroll continuously,
   and pushing an entry per scroll tick would wreck the back button. */

const withUrlParam = (name: string, value: string): URL => {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  return url;
};

export const reviewNumberFromUrl = (): number | undefined => {
  const raw = new URLSearchParams(window.location.search).get("pr");
  if (raw === null) {
    return undefined;
  }
  const number = Number(raw);
  return Number.isFinite(number) ? number : undefined;
};

export const recordReviewInUrl = (number: number): void => {
  window.history.replaceState(window.history.state, "", withUrlParam("pr", String(number)));
};

export const filePathFromUrl = (): string | undefined =>
  new URLSearchParams(window.location.search).get("file") ?? undefined;

export const recordFileInUrl = (path: string): void => {
  window.history.replaceState(window.history.state, "", withUrlParam("file", path));
};
