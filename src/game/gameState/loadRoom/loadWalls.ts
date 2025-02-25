import { blockXyzToFineXyz } from "../../render/projectToScreen";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { emptySet } from "../../../utils/empty";
import type { Xyz } from "../../../utils/vectors/vectors";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
} from "../../../utils/vectors/vectors";
import { type JsonItem } from "../../../model/json/JsonItem";
import { blockSizePx } from "../../../sprites/spritePivots";
import { defaultRoomHeightBlocks } from "../../physics/mechanicsConstants";
import { multiplyBoundingBox } from "../../collision/boundingBoxes";
import type { SceneryName } from "../../../sprites/planets";

const wallRenderHeight = 50;

// can't take room height blocks times block height, or it is still possible to
// jump over the wall in some cases in rooms without a ceiling portal
export const wallThicknessBlocks = 1;

export const xAxisWallAabb = {
  x: blockSizePx.w,
  y: blockSizePx.d * wallThicknessBlocks,
  z: defaultRoomHeightBlocks * blockSizePx.h,
};
export const xAxisWallRenderAabb = {
  x: xAxisWallAabb.x,
  y: 0,
  // for rendering it extends to the drawn height of the wall tile:
  z: wallRenderHeight,
};
export const yAxisWallAabb = {
  x: blockSizePx.w * wallThicknessBlocks,
  y: blockSizePx.d,
  z: defaultRoomHeightBlocks * blockSizePx.h,
};
export const yAxisWallRenderAabb = {
  x: 0,
  y: yAxisWallAabb.y,
  z: wallRenderHeight,
};

export const loadWall = <RoomId extends string>(
  jsonWall: JsonItem<"wall", SceneryName, RoomId>,
  id: string,
): ItemInPlay<"wall", SceneryName, RoomId> => {
  const {
    config: { direction, times },
    position,
  } = jsonWall;

  const axis = doorAlongAxis(direction);
  const crossAxis = perpendicularAxisXy(axis);

  const isHidden = direction === "towards" || direction === "right";

  const invisibleWallSetBackBlocks: Xyz = {
    ...originXyz,
    [crossAxis]: isHidden ? -wallThicknessBlocks : 0,
  };

  return {
    type: "wall",
    id,
    config: jsonWall.config,
    aabb: multiplyBoundingBox(
      axis === "y" ? yAxisWallAabb : xAxisWallAabb,
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
      stoodOnBy: emptySet,
      expires: null,
      disappear: null,
    },
    shadowCastTexture: "shadow.wall.y",
  };
};
