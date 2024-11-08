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
import { roundWithError } from "@/utils/roundWithError";

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
  const zMovementFloat = fallSpeed * deltaMS + item.state.fallRoundingError;

  const { valueInt: zMovementInt, roundingError } =
    roundWithError(zMovementFloat);

  const fallVector = scaleXyz(unitVectors.down, zMovementInt);

  const collisions = collision1toMany(
    {
      id: item.id,
      aabb: item.aabb,
      state: { position: addXyz(item.state.position, fallVector) },
    },
    room.items,
  );

  const standingOn = collisions.at(0);
  const haveLanded = standingOn !== undefined;

  console.log(
    "falling",
    "float",
    zMovementFloat,
    "error",
    roundingError,
    "rounded",
    zMovementInt,
  );

  return {
    positionDelta: fallVector,
    stateDelta: {
      ...(haveLanded ?
        // the landing case
        {
          // we are standing on something so if we were falling from a jump, that jump is over:
          jumped: false,
          // if we are landed, the accumulated error from falling can be reset
          fallRoundingError: 0,
          standingOn,
        }
        // we are in the air and falling:
      : {
          fallRoundingError: roundingError,
          standingOn: null,
          // only head has a falling sprite (heels doesn't)
          ...(item.type === "head" ? { movement: "falling" } : {}),
        }),
    },
  };
};
