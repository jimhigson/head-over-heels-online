import { expect, test } from "vitest";

import { type MirrorOrientation } from "../../../../model/MirrorOrientation";
import { type Xy } from "../../../../utils/vectors/vectors";
import {
  mirrorFlipMs,
  resolveMirrorPaneNumber,
} from "./resolveMirrorPaneNumber";

const at = (deg: number): Xy => ({
  x: Math.cos((deg * Math.PI) / 180),
  y: Math.sin((deg * Math.PI) / 180),
});

const settled = (cameraAngle: Xy, orientation: MirrorOrientation) =>
  resolveMirrorPaneNumber(cameraAngle, orientation, 0, undefined, undefined);

type CameraCase = readonly [MirrorOrientation, number, number, boolean];

// every 1/8 turn for both orientations: d3 face-on / d1 edge-on at the quarters,
// the axis-aligned d0 / d2 at the 45° angles between (d3 is the only face-on):
const eighths: readonly CameraCase[] = [
  ["awayLeft", 0, 1, false],
  ["awayLeft", 45, 2, false],
  ["awayLeft", 90, 3, true],
  ["awayLeft", 135, 0, false],
  ["awayLeft", 180, 1, false],
  ["awayLeft", 225, 2, false],
  ["awayLeft", 270, 3, true],
  ["awayLeft", 315, 0, false],
  ["awayRight", 0, 3, true],
  ["awayRight", 45, 0, false],
  ["awayRight", 90, 1, false],
  ["awayRight", 135, 2, false],
  ["awayRight", 180, 3, true],
  ["awayRight", 225, 0, false],
  ["awayRight", 270, 1, false],
  ["awayRight", 315, 2, false],
];

test.for(eighths)(
  "mirror %s at %d° shows pane d%d (faceOn %s)",
  ([orientation, deg, number, faceOn]) => {
    expect(settled(at(deg), orientation)).toEqual({ number, faceOn });
  },
);

// arbitrary mid-transition camera angles snap to the nearest 1/8 (~22.5°):
test.for([
  [20, 1],
  [30, 2],
  [60, 2],
  [80, 3],
] as const)("mirror awayLeft at %d° snaps to pane d%d", ([deg, number]) => {
  expect(settled(at(deg), "awayLeft").number).toBe(number);
});

// an item spinning the mirror 90° (now awayRight) interpolates from the
// pre-flip pane through the in-between, at a settled (0°) camera:
type FlipCase = readonly [
  flipDirection: "anticlockwise" | "clockwise",
  // flippedAt = 0, so this is ms into the spin:
  roomTime: number,
  expectedPaneNumber: number,
  expectedFaceOn: boolean,
];
const flips: readonly FlipCase[] = [
  ["clockwise", 0, 1, false], // start: still the pre-flip d1
  ["clockwise", mirrorFlipMs / 2, 2, false], // halfway: the in-between d2
  ["clockwise", mirrorFlipMs, 3, true], // settled: face-on d3
  ["clockwise", mirrorFlipMs * 3, 3, true], // clamped past the window
  ["anticlockwise", mirrorFlipMs / 2, 0, false], // the other way sweeps through d0
];

test.for(flips)(
  "mirror spun %s, %dms in, shows pane d%d",
  ([flipDirection, roomTime, number, faceOn]) => {
    expect(
      resolveMirrorPaneNumber(at(0), "awayRight", roomTime, 0, flipDirection),
    ).toEqual({ number, faceOn });
  },
);
