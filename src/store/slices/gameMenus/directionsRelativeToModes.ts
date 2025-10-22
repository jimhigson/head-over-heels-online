export const directionsRelativeToModes = ["world", "screen", "mixed"] as const;
export type DirectionsRelativeToMode =
  (typeof directionsRelativeToModes)[number];
