import {
  FallingItemTypes,
  isPlayableItem,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { UnknownRoomState } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { unitVectors, scaleXyz, addXyz } from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";
import { MechanicResult, unitMechanicalResult } from "./MechanicResult";

const fallSpeedPixPerMs = blockSizePx.h / 1_000; // fall one block per second

export const falling = (
  // we need item type
  item: Extract<UnknownItemInPlay, { type: FallingItemTypes }>,
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

  const fallVector = scaleXyz(unitVectors.down, fallSpeedPixPerMs * deltaMS);

  const collisions = collision1toMany(
    { ...item, position: addXyz(item.position, fallVector) },
    room.items,
    //["z"], // collide only in z axis:
  );

  const standingOn = collisions.at(0);

  return {
    positionDelta: fallVector,
    stateDelta: {
      standingOn:
        standingOn === undefined
          ? // we are in the air
            null
          : // the landing case
            standingOn,
      movement: item.type === "head" ? "falling" : undefined,
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
