/** strong-typing for query params used in the game or editor */
export type AllowedQueryParams = {
  cheats: "1" | null;
  playAsHeels: "1" | null;
  campaignName: null | string;
  campaignAuthorUserId: null | string;
  // for sprites page
  scale: `${number}` | null;
  // if on, all umami tracking is skipped
  noTrack: "1" | null;
};

export type TypedURLSearchParams = {
  get<K extends keyof AllowedQueryParams>(name: K): AllowedQueryParams[K];
  set<K extends keyof AllowedQueryParams>(
    name: K,
    value: AllowedQueryParams[K],
  ): void;
  has(name: keyof AllowedQueryParams): boolean;
  delete(name: keyof AllowedQueryParams): void;
  append<K extends keyof AllowedQueryParams>(
    name: K,
    value: NonNullable<AllowedQueryParams[K]>,
  ): void;
};

/**
 * parse a query string to the typed version of URLSearchParams
 * (just a wrapper around the native one)
 */
export const typedURLSearchParams = (
  search: string = typeof globalThis.window === "undefined" ?
    ""
  : window.location.search,
) => new URLSearchParams(search) as TypedURLSearchParams;
