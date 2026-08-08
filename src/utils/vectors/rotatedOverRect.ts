import { type Xy } from "./vectors";

/**
 * extents of the rotated components over an axis-aligned rect
 * `[x0,x1]×[y0,y1]` by interval arithmetic: a rotated component is a linear
 * functional of (x,y), so each coefficient contributes its own extreme corner
 * independently. Exact at any angle (at the 90° camera angles this coincides
 * with evaluating the two opposite corners, since rotation is then a signed
 * axis pick). Hot-path scalar forms: no allocation.
 */

/** minimum of {@link rotatedX} (`c·x − s·y`) over the rect */
export const rotatedXMinOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (c > 0 ? c * x0 : c * x1) + (s > 0 ? -s * y1 : -s * y0);

/** maximum of {@link rotatedX} (`c·x − s·y`) over the rect */
export const rotatedXMaxOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (c > 0 ? c * x1 : c * x0) + (s > 0 ? -s * y0 : -s * y1);

/** minimum of {@link rotatedY} (`x·s + y·c`) over the rect */
export const rotatedYMinOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (s > 0 ? s * x0 : s * x1) + (c > 0 ? c * y0 : c * y1);

/** maximum of {@link rotatedY} (`x·s + y·c`) over the rect */
export const rotatedYMaxOverRect = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  { x: c, y: s }: Xy,
): number => (s > 0 ? s * x1 : s * x0) + (c > 0 ? c * y1 : c * y0);
