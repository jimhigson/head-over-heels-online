import { describe, expect, test } from "vitest";

import { projectWorldXyzToScreenXy } from "../../../game/render/projections";
import { quarterCameraAngles } from "../../../utils/vectors/cameraAngleVectors";
import { addXyz, type Xyz, type XyzBox } from "../../../utils/vectors/vectors";
import {
  apparentSilhouette,
  blockRoom,
  pointerTool,
} from "./__test__/blockRoom";
import { pointerIntersectionCorner } from "./pointerIntersectionCorner";

const cameraAngleBase = { x: 1, y: 0 };

/** the projected screen position of one of the item's box corners */
const projectItemCorner = (
  { state: { box } }: { state: { box: XyzBox } },
  cornerVector: Xyz,
  cameraAngle: { x: number; y: number },
) =>
  projectWorldXyzToScreenXy(
    addXyz(box, {
      x: cornerVector.x * box.xd,
      y: cornerVector.y * box.yd,
      z: cornerVector.z * box.zd,
    }),
    cameraAngle,
  );

describe("at the base camera angle", () => {
  const { block } = blockRoom();

  test("pointing at the near-bottom corner finds it", () => {
    expect(
      pointerIntersectionCorner(
        block,
        projectItemCorner(block, { x: 0, y: 0, z: 0 }, cameraAngleBase),
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Xyz>({ x: 0, y: 0, z: 0 });
  });

  test("pointing at the top-far corner finds it", () => {
    expect(
      pointerIntersectionCorner(
        block,
        projectItemCorner(block, { x: 1, y: 1, z: 1 }, cameraAngleBase),
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Xyz>({ x: 1, y: 1, z: 1 });
  });

  test("pointing away from all corners finds nothing", () => {
    const { topCorner } = apparentSilhouette(block, cameraAngleBase);
    expect(
      pointerIntersectionCorner(
        block,
        { x: topCorner.scr.x, y: topCorner.scr.y + 6 },
        pointerTool,
        cameraAngleBase,
      ),
    ).toBeUndefined();
  });
});

describe("at every camera angle", () => {
  test.for(quarterCameraAngles)(
    "pointing at the projected top-far corner finds the physical corner (camera angle $x,$y)",
    (cameraAngle) => {
      const { block } = blockRoom();
      expect(
        pointerIntersectionCorner(
          block,
          projectItemCorner(block, { x: 1, y: 1, z: 1 }, cameraAngle),
          pointerTool,
          cameraAngle,
        ),
      ).toEqual<Xyz>({ x: 1, y: 1, z: 1 });
    },
  );

  test.for(quarterCameraAngles)(
    "the hidden back corner cannot be pointed at (camera angle $x,$y)",
    (cameraAngle) => {
      const { block } = blockRoom();
      const { hiddenBackCorner } = apparentSilhouette(block, cameraAngle);
      expect(
        pointerIntersectionCorner(
          block,
          hiddenBackCorner.scr,
          pointerTool,
          cameraAngle,
        ),
      ).toBeUndefined();
    },
  );
});
