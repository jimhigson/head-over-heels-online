import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { StoodOnBy } from "../../../model/StoodOnBy";
import type { Xyz } from "../../../utils/vectors/vectors";

import { type JsonItem } from "../../../model/json/JsonItem";
import { isWallHidden } from "../../../model/json/WallJsonConfig";
import { wallTimes } from "../../../model/times";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptyObject } from "../../../utils/empty";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
} from "../../../utils/vectors/vectors";
import { multiplyBoundingBox } from "../../collision/multiplyBoundingBox";
import { veryHighZ, wallRenderHeight } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

// can't take room height blocks times block height, or it is still possible to
// jump over the wall in some cases in rooms without a ceiling portal.
// this could be thicker for more safety, but for walls-in-rooms situations (not around the
// edges of rooms) is would get in the way of gameplay
export const wallThicknessBlocks = 1;

export const xAxisWallAabb = {
  x: blockSizePx.w,
  y: blockSizePx.d * wallThicknessBlocks,
  z: veryHighZ,
};
export const xAxisWallRenderAabb = {
  x: blockSizePx.w,
  y: 0,
  // for rendering it extends to the drawn height of the wall tile:
  z: wallRenderHeight,
};
export const yAxisWallAabb = {
  x: blockSizePx.w * wallThicknessBlocks,
  y: blockSizePx.d,
  z: veryHighZ,
};
export const yAxisWallRenderAabb = {
  x: 0,
  y: blockSizePx.d,
  z: wallRenderHeight,
};

export const loadWall = <RoomId extends string, RoomItemId extends string>(
  jsonItemId: RoomItemId,
  jsonWall: JsonItem<"wall", RoomId, RoomItemId>,
): ItemTypeUnion<"wall", RoomId, RoomItemId> => {
  const {
    config: { direction },
    position,
  } = jsonWall;

  const times = wallTimes(jsonWall.config);

  const wallTangentAxis = doorAlongAxis(direction);
  const wallNormalAxis = perpendicularAxisXy(wallTangentAxis);

  const isHidden = isWallHidden(direction);

  const invisibleWallSetBackBlocks: Xyz = {
    ...originXyz,
    [wallNormalAxis]: isHidden ? -wallThicknessBlocks : 0,
  };

  return {
    type: "wall",
    id: jsonItemId,
    jsonItemId,
    config: jsonWall.config,
    aabb: multiplyBoundingBox(
      wallTangentAxis === "y" ? yAxisWallAabb : xAxisWallAabb,
      times,
    ),
    renderAabb:
      isHidden ? originXyz : (
        multiplyBoundingBox(
          wallTangentAxis === "y" ? yAxisWallRenderAabb : xAxisWallRenderAabb,
          times,
        )
      ),
    fixedZIndex: isHidden ? nonRenderingItemFixedZIndex : undefined,
    state: {
      ...defaultBaseState(),
      position: blockXyzToFineXyz(addXyz(position, invisibleWallSetBackBlocks)),
      // walls can never be stood on:
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
    shadowCastTexture:
      wallTangentAxis === "y" ? "shadow.wall.y" : (
        { textureId: "shadow.wall.y", flipX: true }
      ),
    //hidden walls cast shadows to give a hint of the unreachable areas on the floor
    castsShadowWhileStoodOn: isHidden,
  };
};
