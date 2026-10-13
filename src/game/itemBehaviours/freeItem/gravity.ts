import { itemBehaviourKey } from "../../../model/ItemInPlay";
import {
  type FreeItem,
  type FreeItemTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../../model/RoomState";
import { originXyz } from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import {
  type Mechanic,
  type MechanicResult,
} from "../../physics/MechanicResult";
import { fallG } from "../../physics/mechanicsConstants";

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
  item: FreeItem<RoomId, RoomItemId>,
  _room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<FreeItemTypes, RoomId, RoomItemId> => {
  if (item[itemBehaviourKey].isNonSolid(item)) {
    // non-solid items do not have gravity - they'd fall through the floor like gravity-impacted ghosts!
    return notFalling;
  }

  const {
    state: {
      vels: {
        gravity: { z: previousVelZ },
      },
      standingOnItemId,
    },
  } = item;

  if (standingOnItemId !== null) {
    // riders move with what they stand on, so need no falling speed of their own
    return notFalling;
  }
  const terminalZ = item[itemBehaviourKey].terminalFallVelocity(item);
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
};
