import type { Xyz } from "./vectors";

import { veryClose } from "../epsilon";

/**
 * For when a text description of a plane is easier to work with,
 * convert a normal vector to a plane
 */
export const planeAxesDesc = (
  /** vector with a 1 or 0 in each component  */
  planeAxes: Xyz,
): `${"" | "x"}${"" | "y"}${"" | "z"}` => {
  return `${planeAxes.x > 0.5 ? "x" : ""}${planeAxes.y > 0.5 ? "y" : ""}${planeAxes.z > 0.5 ? "z" : ""}`;
};

/**
 * For when a text description of a plane is easier to work with,
 * convert a normal vector to a plane
 */
export const orthoPlaneForNormal = (
  /** the normal vector to the plane */
  planeNormal: Xyz,
): OrthoPlane => {
  const { x: nx, y: ny, z: nz } = planeNormal;

  // For xy-plane (normal = [0, 0, 1]), z = 0
  // on top/bottom face
  if (veryClose(nx, 0) && veryClose(ny, 0) && !veryClose(nz, 0)) {
    return "xy";
  }

  // For xz-plane (normal = [0, 1, 0]), y = 0
  // on away/towards face
  if (veryClose(nx, 0) && !veryClose(ny, 0) && veryClose(nz, 0)) {
    return "xz";
  }

  // For yz-plane (normal = [1, 0, 0]), x = 0
  // left/right face
  if (!veryClose(nx, 0) && veryClose(ny, 0) && veryClose(nz, 0)) {
    return "yz";
  }

  throw new Error(
    `only axis-aligned planes are supported, cannot get normal plane for ${JSON.stringify(planeNormal)}`,
  );
};
export type OrthoPlane = "xy" | "xz" | "yz";
