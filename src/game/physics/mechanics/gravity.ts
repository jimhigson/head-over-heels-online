import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";
import type { Mechanic } from "../MechanicResult";

import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
import { originXyz } from "../../../utils/vectors/vectors";
import { type FreeItemTypes, isLift, isSolid } from "../itemPredicates";
import { type MechanicResult } from "../MechanicResult";
import { fallG, terminalVelocityPixPerMs } from "../mechanicsConstants";

const notFalling = {
  movementType: "vel",
  vels: {
    gravity: originXyz,
  },
} as const satisfies MechanicResult<FreeItemTypes, string, string>;

/**
 * handle *only* the vertical speed downwards, and recognising
 * when the fall is done
 *
 * The item can be anything - a player, a pickup etc
 */
export const gravity: Mechanic<FreeItemTypes> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<FreeItemTypes, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FreeItemTypes, RoomId, RoomItemId> => {
  if (!isSolid(item)) {
    // non-solid items do not have gravity - they'd fall through the floor like gravity-impacted ghosts!
    return notFalling;
  }

  const {
    type,
    state: {
      vels: {
        gravity: { z: previousVelZ },
      },
      standingOnItemId,
    },
  } = item;

  const effectiveType = type === "headOverHeels" ? "head" : type;

  const terminalZ =
    terminalVelocityPixPerMs[effectiveType === "head" ? "head" : "others"];

  if (standingOnItemId !== null) {
    const standingOn = stoodOnItem(standingOnItemId, room);
    // standing on something - usually no gravity will be applied
    if (isLift(standingOn)) {
      const liftVelZ = standingOn.state.vels.lift.z;

      if (liftVelZ < 0) {
        // NOTE: special case for descending lifts to avoid skipping on them - items stick
        // to them by some kind of magic, up to their terminal velocity, even if they normally
        // wouldn't accelerate that quickly downwards. Keeps Heels on a descending lift but not
        // Head (lower terminal velocity)
        return {
          movementType: "vel",
          vels: {
            gravity: {
              x: 0,
              y: 0,
              z: Math.max(previousVelZ - fallG * deltaMS, -terminalZ),
            },
          },
        };
      }
    }

    return notFalling;
  } else {
    // not standing on anything - allow free fall up to terminal velocity
    return {
      movementType: "vel",
      vels: {
        gravity: {
          x: 0,
          y: 0,
          z: Math.max(previousVelZ - fallG * deltaMS, -terminalZ),
        },
      },
    };
  }
};
