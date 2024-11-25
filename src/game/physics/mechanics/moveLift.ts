import type { GameState } from "@/game/gameState/GameState";
import type { ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { MechanicResult } from "../MechanicResult";
import { blockSizePx } from "@/sprites/spritePivots";
import { liftSpeed } from "../mechanicsConstants";

const blockHeight = blockSizePx.h;

const minimumLiftVelocity = 0.01;

function velocityAtAltitude(
  z: number,
  direction: "up" | "down",
  minZ: number = 0,
  maxZ: number = 1,
): number {
  const blocksUntilTurn =
    (direction === "up" ? maxZ - z : z - minZ) / blockHeight;
  const blocksAfterTurn =
    (direction === "up" ? z - minZ : maxZ - z) / blockHeight;

  const slowDown1 = blocksUntilTurn < 1 ? blocksUntilTurn : 1;
  const slowDown2 = blocksAfterTurn < 1 ? blocksAfterTurn : 1;

  return (
    Math.max(liftSpeed * slowDown1 * slowDown2, minimumLiftVelocity) *
    (direction === "up" ? 1 : -1)
  );
}

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
  _deltaMS: number,
): MechanicResult<"lift"> {
  const lowestZ = bottom * blockHeight;
  const highestZ = top * blockHeight;
  const velocity = velocityAtAltitude(z, direction, lowestZ, highestZ);

  const mewDirection: "up" | "down" =
    z <= lowestZ ? "up"
    : z >= highestZ ? "down"
    : direction;

  return {
    vels: { lift: { z: velocity } },
    stateDelta: {
      direction: mewDirection,
    },
  };
}
