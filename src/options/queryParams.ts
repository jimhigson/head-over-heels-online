import type { DeploymentType } from "../utils/detectEnv/detectDeploymentType";
import type { DeviceType } from "../utils/detectEnv/detectDeviceType";

/** strong-typing for query params used in the game or editor */
export type AllowedQueryParams = {
  cheats: "1" | null;
  playAsHeels: "1" | null;
  campaignName: null | string;
  campaignAuthorUserId: null | string;
  // for sprites page
  scale: `${number}` | null;
  // explicit tracking control: "1" to track, "0" to skip; if absent, uses hostname detection
  track: "0" | "1" | null;

  // overrides for device type detection to fake desktop/mobile/tablet/server:
  device: DeviceType | null;
  // overrides for deployment type detection to fake browser/pwa/tauri:
  deployment: DeploymentType | null;
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
