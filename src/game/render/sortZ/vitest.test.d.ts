import "vitest";

import { type Xy } from "../../../utils/vectors/vectors";
import { type DrawOrderComparable } from "./DrawOrderComparable";

/** which camera angle to evaluate the draw-order relationship at */
type AtAngle = { whenAtAngle: Xy };

interface CustomMatchers<R = unknown> {
  toBeInFrontOf: (expected: DrawOrderComparable, atAngle: AtAngle) => R;
  toBeBehind: (expected: DrawOrderComparable, atAngle: AtAngle) => R;
  toHaveNoOrderPreferenceWith: (
    expected: DrawOrderComparable,
    atAngle: AtAngle,
  ) => R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type -- from docs https://vitest.dev/guide/extending-matchers
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
