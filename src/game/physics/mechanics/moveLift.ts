import { type ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { blockSizePx } from "../../../sprites/spritePivots";
import type { GameState } from "../../gameState/GameState";
import { isMovableBlock } from "../itemPredicates";
import type { MechanicResult } from "../MechanicResult";
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

const stationaryLift: MechanicResult<"lift", string, string> = {
  movementType: "vel",
  vels: { lift: { x: 0, y: 0, z: 0 } },
};

const hasHeavyLoad = <RoomId extends string, RoomItemId extends string>(
  stoodOnBy: Set<RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) =>
  // stepStool is the only item heavy enough to stop lifts - this is needed for blacktooth 78
  iterateStoodOnByItems(stoodOnBy, room).some(
    (i) => isMovableBlock(i) && i.config.style === "stepStool",
  );

/**
 * walking, but also gliding and changing direction mid-air
 */
export function moveLift<RoomId extends string, RoomItemId extends string>(
  {
    config: { bottom, top },
    state: {
      direction,
      position: { z },
      stoodOnBy,
    },
  }: ItemInPlay<"lift", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"lift", RoomId, RoomItemId> {
  console.log(
    "moving lift - it is stood on by",
    stoodOnBy,
    "hasHeavyLoad",
    hasHeavyLoad(stoodOnBy, room),
  );

  if (direction === "up" && hasHeavyLoad(stoodOnBy, room)) {
    return stationaryLift as MechanicResult<"lift", RoomId, RoomItemId>;
  }

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

  return {
    movementType: "vel",
    vels: { lift: { x: 0, y: 0, z: velocity } },
    stateDelta: {
      direction: mewDirection,
    },
  };
}
