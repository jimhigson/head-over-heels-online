import type { GameState } from "@/game/gameState/GameState";
import type { ItemInPlay } from "@/model/ItemInPlay";
import type { SceneryName } from "@/sprites/planets";
import type { MechanicResult } from "../MechanicResult";
import { blockSizePx } from "@/sprites/spritePivots";
import { maxLiftAcc, maxLiftSpeed } from "../mechanicsConstants";

const blockHeight = blockSizePx.h;

const epsilonVelocity = 0.001;

const calculateVelocity = ({
  totalDistance,
  currentAltitude,
  direction,
}: {
  totalDistance: number;
  currentAltitude: number;
  direction: "up" | "down";
}): number => {
  // Distance needed to accelerate or decelerate
  const dAccel = maxLiftSpeed ** 2 / (2 * maxLiftAcc);

  // Determine the phase
  if (direction === "up") {
    if (currentAltitude <= dAccel) {
      // Acceleration phase
      return Math.max(
        epsilonVelocity,
        Math.sqrt(2 * maxLiftAcc * Math.max(currentAltitude, 0)),
      );
    } else if (currentAltitude >= totalDistance - dAccel) {
      // Deceleration phase
      const dRemaining = Math.max(0, totalDistance - currentAltitude);
      return Math.max(epsilonVelocity, Math.sqrt(2 * maxLiftAcc * dRemaining));
    } else {
      // Constant velocity phase
      return maxLiftSpeed;
    }
  } else {
    if (currentAltitude >= totalDistance - dAccel) {
      // Acceleration phase (in reverse) - heading down
      const dFromTop = Math.max(0, totalDistance - currentAltitude);
      return Math.min(-epsilonVelocity, -Math.sqrt(2 * maxLiftAcc * dFromTop));
    } else if (currentAltitude <= dAccel) {
      // Deceleration phase (in reverse)
      return Math.min(
        -epsilonVelocity,
        -Math.sqrt(2 * maxLiftAcc * Math.max(currentAltitude, 0)),
      );
    } else {
      // Constant velocity phase
      return -maxLiftSpeed;
    }
  }
};

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
  }: ItemInPlay<"lift", SceneryName, RoomId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"lift", RoomId> {
  const lowestZ = bottom * blockHeight;
  const highestZ = top * blockHeight;
  const velocity = calculateVelocity({
    currentAltitude: z - lowestZ,
    direction,
    totalDistance: highestZ - lowestZ,
  });

  if (Number.isNaN(velocity)) throw new Error("velocity is NaN");

  const mewDirection: "up" | "down" =
    z <= lowestZ ? "up"
    : z >= highestZ ? "down"
    : direction;

  //const velocity = velocityAtAltitude(z, direction, lowestZ, highestZ);

  return {
    movementType: "vel",
    vels: { lift: { x: 0, y: 0, z: velocity } },
    stateDelta: {
      direction: mewDirection,
    },
  };
}
