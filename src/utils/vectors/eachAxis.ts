import type { Xyz } from "./vectors";

/**
 * Convenience for setting each of x,y,z or an Xyz vector based on zero or more
 * vectors
 */
export const eachAxis = (fn: (...n: number[]) => number, ...params: Xyz[]) => {
  return {
    x: fn(...params.map((p) => p.x)),
    y: fn(...params.map((p) => p.y)),
    z: fn(...params.map((p) => p.z)),
  };
};
