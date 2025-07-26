import type { Xyz } from "./vectors";

/**
 * Convenience for setting each of x,y,z or an Xyz vector based on zero or more
 * vectors
 */
export const eachAxis = (fn: (...n: number[]) => number, ...vectors: Xyz[]) => {
  return {
    x: fn(...vectors.map((p) => p.x)),
    y: fn(...vectors.map((p) => p.y)),
    z: fn(...vectors.map((p) => p.z)),
  };
};
