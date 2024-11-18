import { type FallingItemTypes, type ItemInPlay } from "@/model/ItemInPlay";
import { addXyz } from "@/utils/vectors";
import { collision1toMany } from "../../collision/aabbCollision";
import type { MechanicResult } from "../MechanicResult";
import { fallG, fallSpeedPixPerMs } from "../mechanicsConstants";
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
export const gravity = <RoomId extends string>(
  item: ItemInPlay<FallingItemTypes, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FallingItemTypes> => {
  const room = currentRoom(gameState);

  const {
    state: { velZ: previousVelZ },
  } = item;

  const terminalZ = fallSpeedPixPerMs[item.type === "head" ? "head" : "others"];

  const velZ = Math.max(previousVelZ - fallG * deltaMS, terminalZ);
  const fallPositionDelta = { x: 0, y: 0, z: velZ * deltaMS };

  const collisions = collision1toMany(
    {
      id: item.id,
      aabb: item.aabb,
      state: { position: addXyz(item.state.position, fallPositionDelta) },
    },
    objectValues(room.items),
  );

  const standingOn = collisions.find((collisionItem) =>
    isSolid(item, collisionItem, gameState),
  );

  return {
    positionDelta: fallPositionDelta,
    stateDelta: {
      velZ,
      ...(standingOn ?
        // the landing case
        {
          // we are standing on something so if we were falling from a jump, that jump is over:
          jumped: false,
          standingOn,
          jumpStartTime: null,
        }
      : {
          // we are in the air (falling or ascending)::
          standingOn: null,
          // only head has a falling sprite (heels doesn't)
          ...(item.type === "head" && velZ < 0 ? { action: "falling" } : {}),
        }),
    },
  };
};
