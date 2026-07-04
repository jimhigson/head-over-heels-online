import { describe, expect, test } from "vitest";

import { projectWorldXyzToScreenXy } from "../../../game/render/projections";
import { allCameraAngles } from "../../../utils/vectors/rotateXy";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import {
  apparentSilhouette,
  blockRoomAtAngle,
  pointerTool,
} from "./__test__/blockRoomAtAngle";
import { pointerIntersectionCorner } from "./pointerIntersectionCorner";

const cameraAngleBase = { x: 1, y: 0 };

/** the projected screen position of one of the item's aabb corners */
const projectItemCorner = (
  item: { state: { position: Xyz }; aabb: Xyz },
  cornerVector: Xyz,
  cameraAngle: { x: number; y: number },
) =>
  projectWorldXyzToScreenXy(
    addXyz(item.state.position, {
      x: cornerVector.x * item.aabb.x,
      y: cornerVector.y * item.aabb.y,
      z: cornerVector.z * item.aabb.z,
    }),
    cameraAngle,
  );

describe("at the base camera angle", () => {
  const { block } = blockRoomAtAngle(cameraAngleBase);

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
  test.for(allCameraAngles)(
    "pointing at the projected top-far corner finds the physical corner (camera angle $x,$y)",
    (cameraAngle) => {
      const { block } = blockRoomAtAngle(cameraAngle);
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

  test.for(allCameraAngles)(
    "the hidden back corner cannot be pointed at (camera angle $x,$y)",
    (cameraAngle) => {
      const { block } = blockRoomAtAngle(cameraAngle);
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
