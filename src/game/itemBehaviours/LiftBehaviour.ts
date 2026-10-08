import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../model/ItemInPlay";
import { type RoomState } from "../../model/RoomState";
import { veryClose } from "../../utils/epsilon";
import { originXyz } from "../../utils/vectors/vectors";
import { type GameState } from "../gameState/GameState";
import { type MechanicResult } from "../physics/MechanicResult";
import {
  blockSizePx,
  maxLiftAcc,
  maxLiftSpeed,
} from "../physics/mechanicsConstants";
import { shadowLift } from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

const blockHeight = blockSizePx.z;

const epsilonVelocity = 0.001;

/** for when the lift isn't moving at all */
const liftStationary = {
  movementType: "vel",
  vels: { lift: originXyz },
} as const satisfies MechanicResult<"lift", string, string>;

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
  direction: "down" | "up";
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
    }
    // Cruise
    return maxLiftSpeed;
  }
  // Target is the bottom
  const distanceToTarget = z - lowestZ;

  // Close to target - deceleration phase (based on distance only)
  if (distanceToTarget <= dAccel) {
    const dRemaining = Math.max(0, distanceToTarget);
    return Math.min(-epsilonVelocity, -Math.sqrt(2 * maxLiftAcc * dRemaining));
  }

  // Not close to target - acceleration/cruising based on current velocity
  if (currentVelocity > -maxLiftSpeed) {
    // Accelerate (in negative direction)
    return Math.max(-maxLiftSpeed, currentVelocity - maxLiftAcc * deltaMS);
  }
  // Cruise
  return -maxLiftSpeed;
};

export class LiftBehaviour extends ItemBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowLift,
      castsShadowWhileStoodOn: true,
    });
  }

  // lifts don't slow down when things are on them:
  override readonly pushesForcefully = true;

  override readonly stoppedByHeavyItems = true;

  /**
   * descending lifts keep what stands on them falling, to avoid it skipping
   * down them. Keeps Heels on a descending lift but not Head (lower terminal
   * velocity)
   */
  override keepsStandersFalling<
    RoomId extends string,
    RoomItemId extends string,
  >(lift: ItemTypeUnion<"lift", RoomId, RoomItemId>): boolean {
    return lift.state.vels.lift.z < 0;
  }

  /**
   * moves up and down between its bottom and top, easing at each end
   */
  override mechanicResults<RoomId extends string, RoomItemId extends string>(
    {
      state: {
        direction,
        bottom,
        top,
        box: { z },
        vels,
      },
    }: ItemTypeUnion<"lift", RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
    deltaMS: number,
    into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {
    const lowestZ = bottom * blockHeight;
    const highestZ = top * blockHeight;

    if (lowestZ === highestZ && veryClose(z, lowestZ)) {
      // lift lowest can equal highest, for example if there is a button
      // or switch that sets the lift to 'no movement'
      into.push(liftStationary);
      return;
    }

    const velocity = calculateVelocity({
      z,
      lowestZ,
      highestZ,
      direction,
      currentVelocity: vels.lift.z,
      deltaMS,
    });

    if (Number.isNaN(velocity)) {
      throw new Error("velocity is NaN");
    }

    const mewDirection: "down" | "up" =
      z <= lowestZ ? "up"
      : z >= highestZ ? "down"
      : direction;

    into.push({
      movementType: "vel",
      vels: { lift: { x: 0, y: 0, z: velocity } },
      stateDelta: {
        direction: mewDirection,
      },
    });
  }
}
