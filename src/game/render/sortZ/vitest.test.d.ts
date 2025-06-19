import "vitest";
import type { DrawOrderComparable } from "./DrawOrderComparable";

interface CustomMatchers<R = unknown> {
  toBeInFrontOf: (expected: DrawOrderComparable) => R;
  toBeBehind: (expected: DrawOrderComparable) => R;
  toHaveNoOrderPreferenceWith: (expected: DrawOrderComparable) => R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type -- from docs https://vitest.dev/guide/extending-matchers
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
