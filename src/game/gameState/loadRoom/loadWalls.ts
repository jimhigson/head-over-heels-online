import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayBeforeHash } from "../../../model/ItemInPlay";
import { type JsonItem } from "../../../model/json/JsonItem";
import { isWallHidden } from "../../../model/json/WallJsonConfig";
import { type StoodOnBy } from "../../../model/StoodOnBy";
import { wallTimes } from "../../../model/times";
import { emptyObject } from "../../../utils/empty";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  perpendicularAxisXy,
  type Xyz,
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
): ItemInPlayBeforeHash<ItemTypeUnion<"wall", RoomId, RoomItemId>> => {
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

  return {
    type: "wall",
    id: jsonItemId,
    jsonItemId,
    config: jsonWall.config,
    ...aabbInfo,
    fixedZIndex: isHidden ? nonRenderingItemFixedZIndex : undefined,
    state: {
      ...defaultBaseState(),
      position: blockXyzToFineXyz(addXyz(position, invisibleWallSetBackBlocks)),
      // walls can never be stood on:
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
    shadowCastTexture: wallTangentAxis !== "y" ? shadowWallX : shadowWallY,

    //hidden walls cast shadows to give a hint of the unreachable areas on the floor
    castsShadowWhileStoodOn: isHidden,
  };
};
