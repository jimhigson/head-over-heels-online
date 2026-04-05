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
): MechanicResult<"monster", RoomId, RoomItemId> => {
  if (itemWithActivation.state.activated) {
    // this is sticky - once it is on, it doesn't flip to off when the
    // player is no longer near
    return unitMechanicalResult;
  }
  if (itemWithActivation.state.everActivated) {
    // this is one-time only - once the monster is activated,
    // the ability to become activated again by the player being near is lost,
    // only a switch etc can re-activate it:
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
  if ((itemWithActivation.config.activated as string) === "while-player-near") {
    // while-player-near was removed from configs - avoid a crash if given a save that
    // still has it (can be removed later, added Apr '26)
    return unitMechanicalResult;
  }

  switch (itemWithActivation.config.activated) {
    case "after-player-near": {
      return activateBasedOnProximityToPlayer(itemWithActivation, room);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is deliberately accessing a value that should be impossible
        `unrecognised item.config.activated ${(itemWithActivation.config as any).activated}`,
      );
  }
};
