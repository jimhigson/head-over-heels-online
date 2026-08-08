import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { type ItemInPlay } from "../../../model/ItemInPlay";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const maximumBoundsDepth = -10 * blockSizePx.z;
const boundsFloorXySize = blockSizePx.x * 14;
/**
 * Creates a large, invisible item far below the room that catches anything
 * that has fallen out of world bounds. Covers a very wide area in x and y
 * (including negative coordinates) so that items drifting in any horizontal
 * direction are still caught.
 */
export const loadOutOfBoundsItem = <
  RoomId extends string,
  RoomItemId extends string,
>(): ItemInPlay<"outOfBounds", RoomId, RoomItemId> => ({
  ...defaultItemProperties,
  type: "outOfBounds",
  // never animates, so the hash (only used to de-synchronise animations) is irrelevant:
  hash: 0,
  id: "outOfBounds" as RoomItemId,
  fixedZIndex: nonRenderingItemFixedZIndex,
  config: {},
  state: {
    ...defaultBaseState(),
    box: {
      x: blockSizePx.x * -4,
      y: blockSizePx.x * -4,
      z: maximumBoundsDepth,
      xd: boundsFloorXySize,
      yd: boundsFloorXySize,
      zd: blockSizePx.z,
    },
  },
});
