import type {
  ItemInPlay,
  UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import type { GameState } from "../../gameState/GameState";
import type { Mechanic } from "../MechanicResult";

import { type RoomState } from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { findClosestPlayable } from "../../gameState/gameStateSelectors/findClosestPlayable";
import { isPlayableItem } from "../itemPredicates";
import { type MechanicResult, unitMechanicalResult } from "../MechanicResult";
import { blockSizePx } from "../mechanicsConstants";

type ItemWithActivation<RoomId extends string, RoomItemId extends string> =
  | ItemInPlay<"monster", RoomId, RoomItemId>
  | ItemInPlay<"movingPlatform", RoomId, RoomItemId>;

const activateResult = Object.freeze({
  movementType: "steady",
  stateDelta: { activated: true, everActivated: true },
} as const satisfies MechanicResult<
  "monster",
  string,
  string
> satisfies MechanicResult<"movingPlatform", string, string>);
const deactivateResult = Object.freeze({
  movementType: "steady",
  stateDelta: { activated: false },
} as const satisfies MechanicResult<
  "monster",
  string,
  string
> satisfies MechanicResult<"movingPlatform", string, string>);

const nearnessThreshold = blockSizePx.x * 3;

const isNear = <RoomId extends string, RoomItemId extends string>(
  itemA: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  itemB: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
): boolean => {
  const {
    state: { position: itemAPosition },
  } = itemA;
  const {
    state: { position: itemBPosition },
  } = itemB;

  const inSquare =
    itemAPosition.x > itemBPosition.x - nearnessThreshold &&
    itemAPosition.x < itemBPosition.x + nearnessThreshold &&
    itemAPosition.y > itemBPosition.y - nearnessThreshold &&
    itemAPosition.y < itemBPosition.y + nearnessThreshold;

  return inSquare;
};

const activateBasedOnProximityToPlayer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithActivation: ItemWithActivation<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
  sticky: boolean,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  if (sticky && itemWithActivation.state.activated) {
    // if sticky, once it is on, it stays on:
    return unitMechanicalResult;
  }

  const closestPlayable = findClosestPlayable(
    itemWithActivation.state.position,
    room,
  );

  if (closestPlayable === undefined) {
    return unitMechanicalResult;
  }

  return isNear(itemWithActivation, closestPlayable) ? activateResult : (
      deactivateResult
    );
};

const activateBasedOnBeingStoodOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithActivation: ItemWithActivation<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<"monster", RoomId, RoomItemId> => {
  if (itemWithActivation.state.activated) {
    // once it is on, it stays on:
    return unitMechanicalResult;
  }

  return (
      iterateStoodOnByItems(itemWithActivation.state.stoodOnBy, room).some(
        isPlayableItem,
      )
    ) ?
      activateResult
    : unitMechanicalResult;
};

/**
 * moves an item with the 'movement' config set, by one tick
 */
export const tickActivation: Mechanic<"monster" | "movingPlatform"> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemWithActivation: ItemWithActivation<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<"monster" | "movingPlatform", RoomId, RoomItemId> => {
  switch (itemWithActivation.config.activated) {
    case "after-player-near": {
      return activateBasedOnProximityToPlayer(
        itemWithActivation,
        room,
        gameState,
        deltaMS,
        true,
      );
    }
    case "while-player-near": {
      return activateBasedOnProximityToPlayer(
        itemWithActivation,
        room,
        gameState,
        deltaMS,
        false,
      );
    }
    case "on-stand": {
      return activateBasedOnBeingStoodOn(
        itemWithActivation,
        room,
        gameState,
        deltaMS,
      );
    }
    case "off":
    case "on":
      return unitMechanicalResult;
    default:
      itemWithActivation.config satisfies never;
      throw new Error(
        `unrecognised item.config.activation ${
          (itemWithActivation as ItemWithActivation<RoomId, RoomItemId>).config
            .activated
        } in ${itemWithActivation.id}:
        ${JSON.stringify(itemWithActivation, null, 2)}`,
      );
  }
};
