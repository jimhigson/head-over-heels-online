import {
  itemBehaviourKey,
  type ItemInPlay,
  type ItemInPlayConfig,
} from "../../../model/ItemInPlay";
import { emptyObject } from "../../../utils/empty";
import { getBehaviourForItemTypeAndConfig } from "../../itemBehaviours/attachBehaviourToItem";
import { blockSizePx } from "../../physics/mechanicsConstants";
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
>(): ItemInPlay<"outOfBounds", RoomId, RoomItemId> => {
  const config = emptyObject satisfies ItemInPlayConfig<"outOfBounds">;
  return {
    type: "outOfBounds",
    // never animates, so the hash (only used to de-synchronise animations) is irrelevant:
    hash: 0,
    id: "outOfBounds" as RoomItemId,
    config,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig("outOfBounds", config),
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
  };
};
