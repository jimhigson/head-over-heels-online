import {
  FallingItemTypes,
  isPlayableItem,
  ItemInPlay,
} from "@/model/ItemInPlay";
import { UnknownRoomState } from "@/model/modelTypes";
import { unitVectors, scaleXyz, addXyz } from "@/utils/vectors";
import { collision1toMany } from "../../collision/aabbCollision";
import { MechanicResult, unitMechanicalResult } from "../MechanicResult";
import { fallSpeedPixPerMs } from "../mechanicsConstants";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const fallingAndLanding = (
  item: ItemInPlay<FallingItemTypes>,
  room: UnknownRoomState,
  deltaMS: number,
): MechanicResult<FallingItemTypes> => {
  const isFalling =
    item.state.standingOn === null &&
    // if a playable item, it can't be falling while it's jumping:
    (!isPlayableItem(item) || item.state.jumpRemaining === 0);

  if (!isFalling) {
    return unitMechanicalResult;
  }

  const fallSpeed = fallSpeedPixPerMs[item.type === "head" ? "head" : "others"];

  const fallVector = scaleXyz(unitVectors.down, fallSpeed * deltaMS);

  const collisions = collision1toMany(
    {
      id: item.id,
      aabb: item.aabb,
      state: { position: addXyz(item.state.position, fallVector) },
    },
    room.items,
    //["z"], // collide only in z axis:
  );

  const standingOn = collisions.at(0);

  /**
   * TODO: for heels there is mandatory moving-forward at normal walking speed if falling
   * from a jump, but not if falling from a step-off. Move side-ways movement while falling
   * into here, and walking.ts should only be when on a surface.
   */

  return {
    positionDelta: fallVector,
    stateDelta: {
      standingOn:
        standingOn === undefined ?
          // we are in the air
          null
          // the landing case
        : standingOn,
      movement: item.type === "head" ? "falling" : undefined,
      ...(standingOn !== undefined ? { jumped: false } : {}),
    },
  };
};

/*
export const landing = (
  // we need item type
  item: Extract<UnknownItemInPlay, { type: FallingItemTypes }>,
  room: UnknownRoomState,
  deltaMS: number,
): MechanicResult<FallingItemTypes> => {
  const collisions = collision1toMany(
    { ...item, position: addXyz(item.position, fallVector) },
    room.items,
    //["z"], // collide only in z axis:
  );

  const standingOn = collisions.at(0);
};
*/
