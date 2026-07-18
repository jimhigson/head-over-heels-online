import { type ComponentChildren } from "preact";

export type RouteProps = {
  /**
   * exact pathname to match, in URLPattern syntax. Omit for a catch-all route
   * (matches any path) - place it last in a `Switch`.
   */
  path?: string;
  children: ComponentChildren;
};

/**
 * A single route. Rendered as-is by a `Switch`, which decides which of its
 * `Route` children matches the current location; a standalone `Route` always
 * renders its children.
 */
export const Route = ({ children }: RouteProps) => <>{children}</>;
