import {
  isItemType,
  type FreeItemTypes,
  type ItemInPlay,
} from "@/model/ItemInPlay";
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
  {
    type,
    state: {
      vels: {
        gravity: { z: previousVelZ },
      },
      standingOn,
    },
  }: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FreeItemTypes> => {
  const terminalZ =
    terminalVelocityPixPerMs[type === "head" ? "head" : "others"];

  const startingVelZ = () => {
    const firstStanding = standingOn.at(0);
    if (firstStanding === undefined)
      // not standing on anything, allow free-fall to accelerate:
      return previousVelZ;

    if (isItemType("lift")(firstStanding)) {
      const liftVelZ = firstStanding.state.vels.lift.z;

      if (liftVelZ < 0) {
        // descending
        return Math.max(liftVelZ, -terminalZ);
      }
      // for ascending lifts, it is fine to return 0 since it'll push against us now, lifting the item
    }
    // assume what we're stannding on is not moving vertically
    // if we are standing on something, the v due to gravity stays constant at zero plus one frame:
    // - this prevents the velocity accumulating up to max value, but keeps the item touching
    // its standingon. This would be more accurately represented by forces
    return 0;
  };

  return {
    vels: {
      gravity: {
        z: Math.max(
          // if we are standing on something, the v due to gravity stays constant at zero plus one frame:
          // - this prevents the velocity accumulating up to max value, but keeps the item touching
          // its standingon. This would be more accurately represented by forces
          startingVelZ() - fallG * deltaMS,
          -terminalZ,
        ),
      },
    },
  };
};
