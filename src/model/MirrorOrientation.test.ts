import { expect, test } from "vitest";

import { unitVectors } from "../utils/vectors/unitVectors";
import { type DirectionXy4, xyzEqual } from "../utils/vectors/vectors";
import {
  flippedMirrorOrientation,
  type MirrorOrientation,
  reflectedFacingVector,
} from "./MirrorOrientation";

type ReflectionCase = [MirrorOrientation, DirectionXy4, DirectionXy4];

test.for([
  // the awayLeft mirror's plane runs along the (1,1) diagonal:
  ["awayLeft", "left", "away"],
  ["awayLeft", "away", "left"],
  ["awayLeft", "right", "towards"],
  ["awayLeft", "towards", "right"],
  // the awayRight mirror's plane runs along the (-1,1) diagonal:
  ["awayRight", "left", "towards"],
  ["awayRight", "towards", "left"],
  ["awayRight", "right", "away"],
  ["awayRight", "away", "right"],
] satisfies ReflectionCase[])(
  "a %s mirror reflects a beam travelling %s to %s",
  ([orientation, incoming, outgoing]) => {
    expect(
      xyzEqual(
        reflectedFacingVector(orientation, unitVectors[incoming]),
        unitVectors[outgoing],
      ),
    ).toBe(true);
  },
);

test.for([
  ["awayLeft", "awayRight"],
  ["awayRight", "awayLeft"],
] satisfies Array<[MirrorOrientation, MirrorOrientation]>)(
  "flipping a %s mirror rotates it to %s",
  ([orientation, flipped]) => {
    expect(flippedMirrorOrientation(orientation)).toBe(flipped);
  },
);
