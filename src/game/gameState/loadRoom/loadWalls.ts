import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type JsonItem } from "../../../model/json/JsonItem";
import { type StoodOnBy } from "../../../model/StoodOnBy";
import { wallTimes } from "../../../model/times";
import { emptyObject } from "../../../utils/empty";
import { hashXyzToNumber0to1 } from "../../../utils/maths/hashXyzToNumber0to1";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  doorAlongAxis,
  scaleXyz,
} from "../../../utils/vectors/vectors";
import { multiplyBoundingBox } from "../../collision/multiplyBoundingBox";
import { blockSizePx, veryHighZ } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { type ShadowCastSpriteOptions } from "../../render/ShadowCastSpriteOptions";
import { defaultBaseState } from "./itemDefaultStates";

/**
 * shadow textures baked for the wall's physical axis at the base angle; the
 * shadow renderer flips them when the camera rotates onto an odd quarter turn
 */
const shadowWallY: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.wall.y",
  flipsOnOddQuarterCameraTurns: true,
});

const shadowWallX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.wall.y",
  flipX: true,
  flipsOnOddQuarterCameraTurns: true,
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
const yAxisWallAabb = {
  x: blockSizePx.x * wallThicknessBlocks,
  y: blockSizePx.y,
  z: veryHighZ,
};

/**
 * loads a wall with only angle-invariant (physical) properties: whether the
 * wall is hidden at the current camera angle - and with it the wall's render
 * box, exclusion from draw-ordering, and hint-shadow behaviour - is derived at
 * render time
 */
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

  const aabb = multiplyBoundingBox(
    wallTangentAxis === "y" ? yAxisWallAabb : xAxisWallAabb,
    times,
  );

  const wallPosition = blockXyzToFineXyz(
    addXyz(position, outOfRoomShiftBlocks),
  );

  return {
    type: "wall",
    hash: hashXyzToNumber0to1(wallPosition),
    id: jsonItemId,
    jsonItemId,
    // the json direction name becomes a unit vector in-play (the json stays a
    // name):
    config: { ...jsonWall.config, direction: unitVectors[direction] },
    aabb,
    state: {
      ...defaultBaseState(),
      position: wallPosition,
      // walls can never be stood on:
      stoodOnBy: emptyObject as StoodOnBy<RoomItemId>,
    },
    shadowCastTexture: wallTangentAxis === "y" ? shadowWallY : shadowWallX,
    // hidden (camera-facing) walls additionally cast their hint shadow while
    // stood on - an angle-dependent behaviour supplied by
    // castsShadowWhileStoodOnAtAngle at render time, not stored here:
    castsShadowWhileStoodOn: false,
  };
};
