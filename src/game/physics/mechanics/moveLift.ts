import type { GameState } from "@/game/gameState/GameState";
import type { ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { MechanicResult } from "../MechanicResult";
import { blockSizePx } from "@/sprites/spritePivots";
import { scaleXyz, unitVectors } from "@/utils/vectors";
import { liftSpeed } from "../mechanicsConstants";

const blockHeight = blockSizePx.h;

/**
 * walking, but also gliding and changing direction mid-air
 */
export function moveLift<RoomId extends string>(
  {
    config: { bottom, top },
    state: {
      direction,
      position: { z },
    },
  }: ItemInPlay<"lift", PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"lift"> {
  const mewDirection: "up" | "down" =
    z <= bottom * blockHeight ? "up"
    : z >= top * blockHeight ? "down"
    : direction;

  return {
    positionDelta: scaleXyz(unitVectors[mewDirection], liftSpeed * deltaMS),
    stateDelta: {
      direction: mewDirection,
    },
  };
}
