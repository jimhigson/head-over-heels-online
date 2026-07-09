import { describe, expect, test } from "vitest";

import { allCameraAngles } from "../../../utils/vectors/rotateXy";
import { addXy } from "../../../utils/vectors/vectors";
import {
  apparentSilhouette,
  blockRoom,
  pointerTool,
  projectFaceCentre,
  renderBoxesForRoom,
  visibleSideFaces,
} from "./__test__/blockRoom";
import { pointIntersectsItemAABB } from "./pointIntersectsItemAABB";

const cameraAngleBase = { x: 1, y: 0 };

describe("at the base camera angle", () => {
  const { room, block } = blockRoom();
  const renderBoxes = renderBoxesForRoom(room, cameraAngleBase);

  test("intersects at the centre of the top face", () => {
    expect(
      pointIntersectsItemAABB(
        projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngleBase),
        pointerTool,
        block,
        cameraAngleBase,
        renderBoxes,
      ),
    ).toBe("intersects-rendered");
  });

  test("intersects at the centre of the towards face", () => {
    expect(
      pointIntersectsItemAABB(
        projectFaceCentre(block, { x: 0, y: -1, z: 0 }, cameraAngleBase),
        pointerTool,
        block,
        cameraAngleBase,
        renderBoxes,
      ),
    ).toBe("intersects-rendered");
  });

  test("intersects at the centre of the right face", () => {
    expect(
      pointIntersectsItemAABB(
        projectFaceCentre(block, { x: -1, y: 0, z: 0 }, cameraAngleBase),
        pointerTool,
        block,
        cameraAngleBase,
        renderBoxes,
      ),
    ).toBe("intersects-rendered");
  });

  test("does not intersect left of the silhouette", () => {
    const { topLeft } = apparentSilhouette(block, cameraAngleBase);
    expect(
      pointIntersectsItemAABB(
        addXy(topLeft, { x: -8, y: 0 }),
        pointerTool,
        block,
        cameraAngleBase,
        renderBoxes,
      ),
    ).toBe("non-intersecting");
  });

  test("does not intersect below the silhouette", () => {
    const { bottomCentre } = apparentSilhouette(block, cameraAngleBase);
    expect(
      pointIntersectsItemAABB(
        addXy(bottomCentre, { x: 0, y: 8 }),
        pointerTool,
        block,
        cameraAngleBase,
        renderBoxes,
      ),
    ).toBe("non-intersecting");
  });
});

describe("at every camera angle", () => {
  test.for(visibleSideFaces)(
    "intersects at the visible physical face centres (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, apparentRight, apparentTowards }) => {
      const { room, block } = blockRoom();
      const renderBoxes = renderBoxesForRoom(room, cameraAngle);

      for (const face of [
        { x: 0, y: 0, z: 1 },
        apparentRight,
        apparentTowards,
      ]) {
        expect(
          pointIntersectsItemAABB(
            projectFaceCentre(block, face, cameraAngle),
            pointerTool,
            block,
            cameraAngle,
            renderBoxes,
          ),
        ).toBe("intersects-rendered");
      }
    },
  );

  test.for(allCameraAngles)(
    "does not intersect just outside the silhouette (camera angle $x,$y)",
    (cameraAngle) => {
      const { room, block } = blockRoom();
      const renderBoxes = renderBoxesForRoom(room, cameraAngle);
      const { topLeft, topRight, bottomCentre, topCorner } = apparentSilhouette(
        block,
        cameraAngle,
      );

      for (const outside of [
        addXy(topLeft, { x: -8, y: 0 }),
        addXy(topRight, { x: 8, y: 0 }),
        addXy(bottomCentre, { x: 0, y: 8 }),
        addXy(topCorner.scr, { x: 0, y: -8 }),
      ]) {
        expect(
          pointIntersectsItemAABB(
            outside,
            pointerTool,
            block,
            cameraAngle,
            renderBoxes,
          ),
        ).toBe("non-intersecting");
      }
    },
  );
});
