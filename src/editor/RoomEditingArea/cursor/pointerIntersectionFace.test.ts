import { describe, expect, test } from "vitest";

import { type Xyz } from "../../../utils/vectors/vectors";
import {
  blockRoomAtAngle,
  pointerTool,
  projectFaceCentre,
  visibleSideFaces,
} from "./__test__/blockRoomAtAngle";
import { pointerIntersectionFace } from "./pointerIntersectionFace";

const cameraAngleBase = { x: 1, y: 0 };

describe("at the base camera angle", () => {
  const { block } = blockRoomAtAngle(cameraAngleBase);

  test("pointing at the top face centre gives the up face", () => {
    expect(
      pointerIntersectionFace(
        block,
        projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngleBase),
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Xyz>({ x: 0, y: 0, z: 1 });
  });

  test("pointing at the towards face centre gives the towards face", () => {
    expect(
      pointerIntersectionFace(
        block,
        projectFaceCentre(block, { x: 0, y: -1, z: 0 }, cameraAngleBase),
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Xyz>({ x: 0, y: -1, z: 0 });
  });

  test("pointing at the right face centre gives the right face", () => {
    expect(
      pointerIntersectionFace(
        block,
        projectFaceCentre(block, { x: -1, y: 0, z: 0 }, cameraAngleBase),
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Xyz>({ x: -1, y: 0, z: 0 });
  });
});

describe("at every camera angle, the physical face is returned", () => {
  test.for(visibleSideFaces)(
    "up face is angle-independent (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle }) => {
      const { block } = blockRoomAtAngle(cameraAngle);
      expect(
        pointerIntersectionFace(
          block,
          projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngle),
          pointerTool,
          cameraAngle,
        ),
      ).toEqual<Xyz>({ x: 0, y: 0, z: 1 });
    },
  );

  test.for(visibleSideFaces)(
    "the screen-right face maps to its physical face (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, apparentRight }) => {
      const { block } = blockRoomAtAngle(cameraAngle);
      expect(
        pointerIntersectionFace(
          block,
          projectFaceCentre(block, apparentRight, cameraAngle),
          pointerTool,
          cameraAngle,
        ),
      ).toEqual<Xyz>(apparentRight);
    },
  );

  test.for(visibleSideFaces)(
    "the screen-towards face maps to its physical face (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, apparentTowards }) => {
      const { block } = blockRoomAtAngle(cameraAngle);
      expect(
        pointerIntersectionFace(
          block,
          projectFaceCentre(block, apparentTowards, cameraAngle),
          pointerTool,
          cameraAngle,
        ),
      ).toEqual<Xyz>(apparentTowards);
    },
  );
});
