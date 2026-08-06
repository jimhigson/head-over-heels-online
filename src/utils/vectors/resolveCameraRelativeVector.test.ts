import { expect, test } from "vitest";

import { quarterCameraAngles } from "./cameraAngleVectors";
import {
  resolveSpriteDirectionIndexXy4,
  resolveSpriteDirectionIndexXy8,
  spriteFlipXAtAngle,
} from "./resolveCameraRelativeVector";
import { rotatedX, rotatedY } from "./rotateXy";
import { unitVectors } from "./unitVectors";
import {
  type DirectionIndexXy4,
  directionIndexXy8,
  directionsXy4,
  directionsXy8,
  mirrorDirectionIndexXy4,
  mirrorDirectionIndexXy8,
  nonZeroClosestDirectionIndexXy4,
  nonZeroClosestDirectionIndexXy8,
} from "./vectors";

test("mirrorDirectionIndexXy4 swaps the cardinal ring's mirror pairs", () => {
  expect(([0, 2, 4, 6] as const).map(mirrorDirectionIndexXy4)).toEqual<
    DirectionIndexXy4[]
  >(
    // left↔away, right↔towards:
    [2, 0, 6, 4],
  );
});

test.for(directionsXy4)(
  "xy4 sprite pick shows the apparent form of a %s-facing item at every quarter angle",
  (facingName) => {
    const facing = unitVectors[facingName];
    for (const cameraAngle of quarterCameraAngles) {
      const rendered = resolveSpriteDirectionIndexXy4(
        facing,
        cameraAngle,
        false,
      );
      const flip = spriteFlipXAtAngle(cameraAngle);
      // the drawn form is the sprite's own facing, mirrored when flipped -
      // which must equal the facing as apparent through the rotation:
      const shownForm = flip ? mirrorDirectionIndexXy4(rendered) : rendered;
      const apparentIndex = nonZeroClosestDirectionIndexXy4(
        rotatedX(facing.x, facing.y, cameraAngle),
        rotatedY(facing.x, facing.y, cameraAngle),
      );
      expect(shownForm).toBe(apparentIndex);
    }
  },
);

test.for(directionsXy8)(
  "xy8 sprite pick shows the apparent form of a %s-facing item at every quarter angle",
  (facingName) => {
    const facing = unitVectors[facingName];
    for (const cameraAngle of quarterCameraAngles) {
      const rendered = resolveSpriteDirectionIndexXy8(
        facing,
        cameraAngle,
        false,
      );
      const flip = spriteFlipXAtAngle(cameraAngle);
      const shownForm = flip ? mirrorDirectionIndexXy8(rendered) : rendered;
      const apparentIndex = nonZeroClosestDirectionIndexXy8(
        rotatedX(facing.x, facing.y, cameraAngle),
        rotatedY(facing.x, facing.y, cameraAngle),
      );
      expect(shownForm).toBe(apparentIndex);
    }
  },
);

test("an away-facing item keeps its own sprite, flipped, on a clockwise quarter turn", () => {
  // at the clockwise quarter an away-facing item appears facing left, whose
  // form is the horizontal mirror of away - so the away art is reused,
  // flipped, and its painted lighting stays on the same world faces:
  const clockwise = { x: 0, y: -1 };
  expect(
    resolveSpriteDirectionIndexXy4(unitVectors.away, clockwise, false),
  ).toBe(directionIndexXy8.away);
  expect(spriteFlipXAtAngle(clockwise)).toBe(true);
});

test("index picks are never flipped at the base angle", () => {
  const base = { x: 1, y: 0 };
  expect(spriteFlipXAtAngle(base)).toBe(false);
  expect(resolveSpriteDirectionIndexXy4(unitVectors.towards, base, false)).toBe(
    directionIndexXy8.towards,
  );
  expect(
    resolveSpriteDirectionIndexXy8(unitVectors.towardsLeft, base, false),
  ).toBe(directionIndexXy8.towardsLeft);
});
