import { type ComponentChildren, toChildArray } from "preact";

import { type RouteProps } from "./Route.tsx";
import { useRoutePath } from "./useRoutePath.ts";

export type SwitchProps = {
  /** `Route` children, tried in order; the first match is rendered */
  children: ComponentChildren;
};

// URLPattern construction isn't free, and the route paths are static literals,
// so cache one pattern per path across renders.
const patternCache = new Map<string, URLPattern>();
const patternFor = (pathname: string): URLPattern => {
  let pattern = patternCache.get(pathname);
  if (pattern === undefined) {
    pattern = new URLPattern({ pathname });
    patternCache.set(pathname, pattern);
  }
  return pattern;
};

const routeMatches = (
  /** the route's `path`, or undefined for a catch-all */
  path: string | undefined,
  /** the current location pathname */
  locationPath: string,
): boolean =>
  path === undefined || patternFor(path).test({ pathname: locationPath });

/**
 * Renders the first child `Route` whose `path` matches the current location
 * (a `Route` with no `path` always matches, so use it as a fallback). A native
 * replacement for the equivalent component in a routing library, matching via
 * the platform `URLPattern`.
 */
export const Switch = ({ children }: SwitchProps) => {
  const locationPath = useRoutePath();

  for (const child of toChildArray(children)) {
    if (typeof child !== "object" || child === null) {
      continue;
    }
    if (routeMatches((child.props as RouteProps).path, locationPath)) {
      return child;
    }
  }
  return null;
};
