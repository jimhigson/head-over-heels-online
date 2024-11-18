import { type FallingItemTypes, type ItemInPlay } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import { fallG, terminalVelocityPixPerMs } from "../mechanicsConstants";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const gravity = <RoomId extends string>(
  item: ItemInPlay<FallingItemTypes, PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FallingItemTypes> => {
  const {
    state: { velZ: previousVelZ },
  } = item;

  const terminalZ =
    terminalVelocityPixPerMs[item.type === "head" ? "head" : "others"];

  const velZ = Math.max(previousVelZ - fallG * deltaMS, terminalZ);
  const fallPositionDelta = { x: 0, y: 0, z: velZ * deltaMS };

  return {
    positionDelta: fallPositionDelta,
    stateDelta: {
      velZ,
    },
  };
};
