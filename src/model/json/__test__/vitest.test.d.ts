import type { DirectionXy4, Xy } from "../../../utils/vectors/vectors";

interface CustomMatchers<R = unknown> {
  toHaveWall: (expected: {
    direction: DirectionXy4;
    position: Xy & { z: number };
    times: Xy;
  }) => R;
  toHaveFloor: (expected: { position: Xy & { z: number }; times: Xy }) => R;
  toHaveSubroom: (expected: {
    gridPosition: Xy;
    physicalPosition: {
      from: Xy;
      to: Xy;
    };
  }) => R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type -- from docs https://vitest.dev/guide/extending-matchers
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
