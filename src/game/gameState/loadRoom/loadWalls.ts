import { blockXyzToFineXyz } from "../../render/projectToScreen";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { Xyz } from "../../../utils/vectors/vectors";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
} from "../../../utils/vectors/vectors";
import { type JsonItem } from "../../../model/json/JsonItem";
import { blockSizePx } from "../../../sprites/spritePivots";
import {
  defaultRoomHeightBlocks,
  wallRenderHeight,
} from "../../physics/mechanicsConstants";
import { multiplyBoundingBox } from "../../collision/boundingBoxes";
import type { RoomJson } from "../../../model/RoomJson";
import type { StoodOnBy } from "../../../model/StoodOnBy";
import { emptyObject } from "../../../utils/empty";
import { neverTime } from "../../../utils/veryClose";

// can't take room height blocks times block height, or it is still possible to
// jump over the wall in some cases in rooms without a ceiling portal
export const wallThicknessBlocks = 1;

export const xAxisWallAabb = (
  roomHeight: number = defaultRoomHeightBlocks,
) => ({
  x: blockSizePx.w,
  y: blockSizePx.d * wallThicknessBlocks,
  z: roomHeight * blockSizePx.h,
});
export const xAxisWallRenderAabb = {
  x: blockSizePx.w,
  y: 0,
  // for rendering it extends to the drawn height of the wall tile:
  z: wallRenderHeight,
};
export const yAxisWallAabb = (
  roomHeight: number = defaultRoomHeightBlocks,
) => ({
  x: blockSizePx.w * wallThicknessBlocks,
  y: blockSizePx.d,
  z: roomHeight * blockSizePx.h,
});
export const yAxisWallRenderAabb = {
  x: 0,
  y: blockSizePx.d,
  z: wallRenderHeight,
};

export const loadWall = <RoomId extends string, RoomItemId extends string>(
  itemId: RoomItemId,
  jsonWall: JsonItem<"wall", RoomId, RoomItemId>,
  roomJson: RoomJson<RoomId, RoomItemId>,
): ItemInPlay<"wall", RoomId, RoomItemId> => {
  const {
    config: { direction, times },
    position,
  } = jsonWall;

  const {
    size: { z: roomSizeZ },
  } = roomJson;
  const axis = doorAlongAxis(direction);
  const crossAxis = perpendicularAxisXy(axis);

  const isHidden = direction === "towards" || direction === "right";

  const invisibleWallSetBackBlocks: Xyz = {
    ...originXyz,
    [crossAxis]: isHidden ? -wallThicknessBlocks : 0,
  };

  return {
    type: "wall",
    id: itemId,
    config: jsonWall.config,
    aabb: multiplyBoundingBox(
      axis === "y" ? yAxisWallAabb(roomSizeZ) : xAxisWallAabb(roomSizeZ),
      times,
    ),
    renders: !isHidden,
    renderAabb:
      isHidden ? undefined : (
        multiplyBoundingBox(
          axis === "y" ? yAxisWallRenderAabb : xAxisWallRenderAabb,
          times,
        )
      ),
    state: {
      position: blockXyzToFineXyz(addXyz(position, invisibleWallSetBackBlocks)),
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
      expires: null,
      disappear: null,
      switchedAtRoomTime: neverTime,
    },
    shadowCastTexture:
      axis === "y" ? "shadow.wall.y" : (
        { textureId: "shadow.wall.y", flipX: true }
      ),
  };
};
