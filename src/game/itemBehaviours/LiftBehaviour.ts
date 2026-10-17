import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../model/ItemInPlay";
import { type RoomState } from "../../model/RoomState";
import { veryClose } from "../../utils/epsilon";
import { originXyz } from "../../utils/vectors/vectors";
import { type GameState } from "../gameState/GameState";
import { type MechanicResult } from "../physics/MechanicResult";
import {
  blockSizePx,
  liftMass,
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

/**
 * the fastest speed the lift can go and still stop at the end it is heading to,
 * capped at its cruising speed
 */
const targetSpeedFor = (
  z: number,
  lowestZ: number,
  highestZ: number,
  direction: "down" | "up",
): number => {
  const distanceToTarget = Math.max(
    0,
    direction === "up" ? highestZ - z : z - lowestZ,
  );
  return Math.max(
    epsilonVelocity,
    Math.min(maxLiftSpeed, Math.sqrt(2 * maxLiftAcc * distanceToTarget)),
  );
};

/**
 * eases towards the target speed. Below the target (eg, after recoil from a
 * jump), it recovers at the lift's acceleration; above it, it snaps down so
 * never overshoots the end
 */
const easedVelocity = (
  targetSpeed: number,
  direction: "down" | "up",
  currentVelocity: number,
  deltaMS: number,
): number => {
  const sign = direction === "up" ? 1 : -1;
  return (
    sign * Math.min(targetSpeed, currentVelocity * sign + maxLiftAcc * deltaMS)
  );
};

export class LiftBehaviour extends ItemBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowLift,
      castsShadowWhileStoodOn: true,
    });
  }

  override mass(): number {
    return liftMass;
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

    const targetSpeed = targetSpeedFor(z, lowestZ, highestZ, direction);
    const velocity = easedVelocity(
      targetSpeed,
      direction,
      vels.lift.z,
      deltaMS,
    );

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
