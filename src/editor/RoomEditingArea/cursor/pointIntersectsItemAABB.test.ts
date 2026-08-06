import { describe, expect, test } from "vitest";

import { blockSizePx } from "../../../game/physics/mechanicsConstants";
import { projectWorldXyzToScreenXy } from "../../../game/render/projections";
import { quarterCameraAngles } from "../../../utils/vectors/cameraAngleVectors";
import { addXy, addXyz, type Xy } from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import {
  apparentSilhouette,
  blockRoom,
  pointerTool,
  projectFaceCentre,
  renderBoxesForRoom,
  visibleSideFaces,
} from "./__test__/blockRoom";
import {
  wallDrawnAtCameraAngle,
  wallHiddenAtCameraAngle,
  wallRoom,
} from "./__test__/wallRoom";
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

  test.for(quarterCameraAngles)(
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

describe("walls, which are physically unbounded upwards", () => {
  /** high above the wall's base - inside its physical aabb, far outside its art */
  const wellAboveTheWall = (
    wall: EditorUnionOfAllItemInPlayTypes,
    cameraAngle: Xy,
  ) =>
    projectWorldXyzToScreenXy(
      addXyz(wall.state.box, { x: 0, y: 0, z: 40 * blockSizePx.z }),
      cameraAngle,
    );

  test("a hidden wall is not pointed at, since it draws nothing", () => {
    const { room, wall } = wallRoom();

    expect(
      pointIntersectsItemAABB(
        wellAboveTheWall(wall, wallHiddenAtCameraAngle),
        pointerTool,
        wall,
        wallHiddenAtCameraAngle,
        renderBoxesForRoom(room, wallHiddenAtCameraAngle),
      ),
    ).toBe("non-intersecting");
  });

  test("a drawn wall is not pointed at above the height it draws to", () => {
    const { room, wall } = wallRoom();

    expect(
      pointIntersectsItemAABB(
        wellAboveTheWall(wall, wallDrawnAtCameraAngle),
        pointerTool,
        wall,
        wallDrawnAtCameraAngle,
        renderBoxesForRoom(room, wallDrawnAtCameraAngle),
      ),
    ).toBe("non-intersecting");
  });
});
