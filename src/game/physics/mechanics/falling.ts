import type { FallingItemTypes, ItemInPlay } from "@/model/ItemInPlay";
import { isPlayableItem } from "@/model/ItemInPlay";
import { unitVectors, scaleXyz, addXyz } from "@/utils/vectors";
import { collision1toMany } from "../../collision/aabbCollision";
import type { MechanicResult } from "../MechanicResult";
import { unitMechanicalResult } from "../MechanicResult";
import { fallSpeedPixPerMs } from "../mechanicsConstants";
import { objectValues } from "iter-tools";
import { isSolid } from "../isSolid";
import type { GameState } from "@/game/gameState/GameState";
import { currentRoom } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const fallingAndLanding = <RoomId extends string>(
  item: ItemInPlay<FallingItemTypes, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FallingItemTypes> => {
  const room = currentRoom(gameState);

  const isFalling =
    item.state.standingOn === null &&
    // if a playable item, it can't be falling while it's jumping:
    (!isPlayableItem(item) || item.state.jumpRemaining === 0);

  if (!isFalling) {
    return unitMechanicalResult;
  }

  const fallSpeed = fallSpeedPixPerMs[item.type === "head" ? "head" : "others"];
  const zMovementFloat = fallSpeed * deltaMS;

  const fallVector = scaleXyz(unitVectors.down, zMovementFloat);

  const collisions = collision1toMany(
    {
      id: item.id,
      aabb: item.aabb,
      state: { position: addXyz(item.state.position, fallVector) },
    },
    objectValues(room.items),
  );

  const landedOn = collisions.find((collisionItem) =>
    isSolid(item, collisionItem, gameState),
  );

  return {
    positionDelta: fallVector,
    stateDelta: {
      ...(landedOn ?
        // the landing case
        {
          // we are standing on something so if we were falling from a jump, that jump is over:
          jumped: false,
          standingOn: landedOn,
        }
        // we are in the air and falling:
      : {
          standingOn: null,
          // only head has a falling sprite (heels doesn't)
          ...(item.type === "head" ? { movement: "falling" } : {}),
        }),
    },
  };
};
