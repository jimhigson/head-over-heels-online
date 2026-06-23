import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type JsonItem } from "../../../model/json/JsonItem";
import { isWallHidden } from "../../../model/json/WallJsonConfig";
import { type StoodOnBy } from "../../../model/StoodOnBy";
import { wallTimes } from "../../../model/times";
import { emptyObject } from "../../../utils/empty";
import { hashXyzToNumber0to1 } from "../../../utils/maths/hashXyzToNumber0to1";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  rotateAxisXyByCameraAngle,
  rotateDirectionXy4ByCameraAngle,
  scaleXyz,
  tangentAxis,
  type Xy,
} from "../../../utils/vectors/vectors";
import { multiplyBoundingBox } from "../../collision/multiplyBoundingBox";
import {
  blockSizePx,
  veryHighZ,
  wallRenderHeight,
} from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { type ShadowCastSpriteOptions } from "../../render/ShadowCastSpriteOptions";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const shadowWallY: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.wall.y",
});

const shadowWallX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.wall.y",
  flipX: true,
});

// can't take room height blocks times block height, or it is still possible to
// jump over the wall in some cases in rooms without a ceiling portal.
// this could be thicker for more safety, but for walls-in-rooms situations (not around the
// edges of rooms) is would get in the way of gameplay
const wallThicknessBlocks = 1;

const xAxisWallAabb = {
  x: blockSizePx.x,
  y: blockSizePx.y * wallThicknessBlocks,
  z: veryHighZ,
};
const xAxisWallRenderAabb = {
  x: blockSizePx.x,
  y: 0,
  // for rendering it extends to the drawn height of the wall tile:
  z: wallRenderHeight,
};
const yAxisWallAabb = {
  x: blockSizePx.x * wallThicknessBlocks,
  y: blockSizePx.y,
  z: veryHighZ,
};
const yAxisWallRenderAabb = {
  x: 0,
  y: blockSizePx.y,
  z: wallRenderHeight,
};

export const loadWall = <RoomId extends string, RoomItemId extends string>(
  jsonItemId: RoomItemId,
  jsonWall: JsonItem<"wall", RoomId, RoomItemId>,
  cameraAngle: Xy,
): ItemTypeUnion<"wall", RoomId, RoomItemId> => {
  const {
    config: { direction },
    position,
  } = jsonWall;

  const times = wallTimes(jsonWall.config);

  const wallTangentAxis = doorAlongAxis(direction);

  // a wall is hidden when, under the current camera, it is one of the two walls
  // facing the viewer - rotate the wall's absolute direction into camera space to
  // decide:
  const isHidden = isWallHidden(
    rotateDirectionXy4ByCameraAngle(direction, cameraAngle),
  );

  // a wall's box protrudes out of the room, and boxes extend positive from their
  // position: away/left walls' json positions already lie beyond the room, but
  // towards/right walls sit on the room's first row, so shift them out by the
  // wall thickness along their outward normal. This is world geometry, fixed
  // regardless of the camera angle:
  const outIsNegative = direction === "towards" || direction === "right";
  const outOfRoomShiftBlocks = scaleXyz(
    unitVectors[direction],
    outIsNegative ? wallThicknessBlocks : 0,
  );

  const aabbInfo = multiplyBoundingBox({
    singleItemBBInfo: {
      aabb: wallTangentAxis === "y" ? yAxisWallAabb : xAxisWallAabb,
      renderAabb:
        isHidden ? undefined
        : wallTangentAxis === "y" ? yAxisWallRenderAabb
        : xAxisWallRenderAabb,
    },
    times,
  });

  const wallPosition = blockXyzToFineXyz(
    addXyz(position, outOfRoomShiftBlocks),
  );

  // the wall is drawn on its room-side face. for away/left walls that is the
  // position (min corner) side; for towards/right walls (whose boxes extend
  // negative, out of the room) it is the max side, so the render box offsets by
  // the wall's thickness to sit on the drawn plane:
  const wallThicknessAxis = tangentAxis(direction);
  const renderAabbOffset =
    !isHidden && outIsNegative ?
      {
        ...originXyz,
        [wallThicknessAxis]:
          wallThicknessBlocks *
          (wallThicknessAxis === "x" ? blockSizePx.x : blockSizePx.y),
      }
    : undefined;

  return {
    type: "wall",
    hash: hashXyzToNumber0to1(wallPosition),
    id: jsonItemId,
    jsonItemId,
    config: jsonWall.config,
    ...aabbInfo,
    renderAabbOffset,
    fixedZIndex: isHidden ? nonRenderingItemFixedZIndex : undefined,
    state: {
      ...defaultBaseState(),
      position: wallPosition,
      // walls can never be stood on:
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
    // the cast texture follows the wall's apparent axis after rotation (this is
    // re-derived per angle since walls reload on rotation):
    shadowCastTexture:
      rotateAxisXyByCameraAngle(wallTangentAxis, cameraAngle) !== "y" ?
        shadowWallX
      : shadowWallY,

    //hidden walls cast shadows to give a hint of the unreachable areas on the floor
    castsShadowWhileStoodOn: isHidden,
  };
};
