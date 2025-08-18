import { type ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import { blockSizePx } from "../../../sprites/spritePivots";
import type { GameState } from "../../gameState/GameState";
import type { Mechanic, MechanicResult } from "../MechanicResult";
import { maxLiftAcc, maxLiftSpeed } from "../mechanicsConstants";

const blockHeight = blockSizePx.h;

const epsilonVelocity = 0.001;

const calculateVelocity = ({
  z,
  lowestZ,
  highestZ,
  direction,
  currentVelocity,
  deltaMS,
}: {
  z: number;
  lowestZ: number;
  highestZ: number;
  direction: "up" | "down";
  currentVelocity: number;
  deltaMS: number;
}): number => {
  // Distance needed to decelerate from max speed to zero
  const dAccel = maxLiftSpeed ** 2 / (2 * maxLiftAcc);

  if (direction === "up") {
    // Target is the top
    const distanceToTarget = highestZ - z;

    // Close to target - deceleration phase (based on distance only)
    if (distanceToTarget <= dAccel) {
      const dRemaining = Math.max(0, distanceToTarget);
      return Math.max(epsilonVelocity, Math.sqrt(2 * maxLiftAcc * dRemaining));
    }

    // Not close to target - acceleration/cruising based on current velocity
    if (currentVelocity < maxLiftSpeed) {
      // Accelerate
      return Math.min(maxLiftSpeed, currentVelocity + maxLiftAcc * deltaMS);
    } else {
      // Cruise
      return maxLiftSpeed;
    }
  } else {
    // Target is the bottom
    const distanceToTarget = z - lowestZ;

    // Close to target - deceleration phase (based on distance only)
    if (distanceToTarget <= dAccel) {
      const dRemaining = Math.max(0, distanceToTarget);
      return Math.min(
        -epsilonVelocity,
        -Math.sqrt(2 * maxLiftAcc * dRemaining),
      );
    }

    // Not close to target - acceleration/cruising based on current velocity
    if (currentVelocity > -maxLiftSpeed) {
      // Accelerate (in negative direction)
      return Math.max(-maxLiftSpeed, currentVelocity - maxLiftAcc * deltaMS);
    } else {
      // Cruise
      return -maxLiftSpeed;
    }
  }
};

/**
 * walking, but also gliding and changing direction mid-air
 */
export const moveLift: Mechanic<"lift"> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  {
    state: {
      direction,
      bottom,
      top,
      position: { z },
      vels,
    },
  }: ItemInPlay<"lift", RoomId, RoomItemId>,
  _room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"lift", RoomId, RoomItemId> => {
  const lowestZ = bottom * blockHeight;
  const highestZ = top * blockHeight;
  const currentVelocity = vels?.lift?.z ?? 0;
  const velocity = calculateVelocity({
    z,
    lowestZ,
    highestZ,
    direction,
    currentVelocity,
    deltaMS,
  });

  if (Number.isNaN(velocity)) throw new Error("velocity is NaN");

  const mewDirection: "up" | "down" =
    z <= lowestZ ? "up"
    : z >= highestZ ? "down"
    : direction;

  return {
    movementType: "vel",
    vels: { lift: { x: 0, y: 0, z: velocity } },
    stateDelta: {
      direction: mewDirection,
    },
  };
};
