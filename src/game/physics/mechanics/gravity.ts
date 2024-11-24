import { type FallingItemTypes, type ItemInPlay } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import { fallG, terminalVelocityPixPerMs } from "../mechanicsConstants";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { accelerateToSpeed } from "@/utils/vectors/accelerateUpToSpeed";
import { unitVectors } from "@/utils/vectors/vectors";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const gravity = <RoomId extends string>(
  { type, state: { vel } }: ItemInPlay<FallingItemTypes, PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FallingItemTypes> => {
  return {
    accel: accelerateToSpeed({
      vel,
      acc: fallG,
      unitD: unitVectors.down,
      maxSpeed: terminalVelocityPixPerMs[type === "head" ? "head" : "others"],
      deltaMS,
    }),
  };
};
