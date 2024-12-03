import {
  isItemType,
  type FreeItemTypes,
  type ItemInPlay,
} from "@/model/ItemInPlay";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";
import { fallG, terminalVelocityPixPerMs } from "../mechanicsConstants";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { isSolid } from "../isSolid";

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const gravity = <RoomId extends string>(
  item: ItemInPlay<FreeItemTypes, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FreeItemTypes, RoomId> => {
  if (!isSolid(item, gameState.progression)) {
    // non-solid items do not have gravity - they'd fall through the floor!
    return unitMechanicalResult;
  }

  const {
    type,
    state: {
      vels: {
        gravity: { z: previousVelZ },
      },
      standingOn,
    },
  } = item;

  const terminalZ =
    terminalVelocityPixPerMs[type === "head" ? "head" : "others"];

  if (standingOn !== null) {
    // standing on something - no gravity will be applied
    // TODO: special case for lifts going down:
    if (isItemType("lift")(standingOn)) {
      const liftVelZ = standingOn.state.vels.lift.z;
      if (liftVelZ < 0) {
        // descending on a lift - we need some gravity to keep us on the lift
        // as it falls - go slightly faster than the lift's downwards speed
        return {
          vels: {
            gravity: {
              z: Math.max(previousVelZ - fallG * deltaMS, -terminalZ),
            },
          },
        };
      }
    }
    return unitMechanicalResult;
  } else {
    // not standing on anything - allow free fall up to terminal velocity
    return {
      vels: {
        gravity: {
          z: Math.max(previousVelZ - fallG * deltaMS, -terminalZ),
        },
      },
    };
  }

  /** get the velocity 'before' this frame, that we will accelerate from */
  /*
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
  */
};
