import { originXy, type Xy } from "../../utils/vectors/vectors.ts";

const directions: Xy[] = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
];

/**
 * Converts a radial D-pad axis value to XY direction
 * Uses values as found on the 8BitDo Wired 2C which reports D-pad as angle in radians,
 * could potentially be used for others too
 */
export const radialAxisToXy = (
  /** The axis value in -1 to 1 range, or ~3.2 for neutral */
  axisValue: number,
): Xy => {
  // get the axis value in 0...1 range (not -1...1) and then *7,
  // or *3.5 to do in one step:
  const directionIndex = Math.round((axisValue + 1) * 3.5);

  return directions[directionIndex] ?? originXy;
};
