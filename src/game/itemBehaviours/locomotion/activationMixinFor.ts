import { isPlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import { type GameState } from "../../gameState/GameState";
import {
  type MechanicResult,
  unitMechanicalResult,
} from "../../physics/MechanicResult";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { findClosestPlayable } from "./findClosestPlayable";
import {
  type LocomotiveBehaviourClass,
  type LocomotiveItem,
  type LocomotiveItemType,
  type LocomotiveMixin,
} from "./LocomotiveBehaviour";

/**
 * what activates the item, as named by its config's `activated`
 */
export type Activation = LocomotiveItem<string, string>["config"]["activated"];

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

const ActivatesAfterPlayerNearMixin = <B extends LocomotiveBehaviourClass>(
  Base: B,
) =>
  class ActivatesAfterPlayerNear extends Base {
    protected override activate<
      RoomId extends string,
      RoomItemId extends string,
    >(
      locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
      room: RoomState<RoomId, RoomItemId>,
      _gameState: GameState<RoomId>,
      _deltaMS: number,
    ): MechanicResult<LocomotiveItemType, RoomId, RoomItemId> {
      if (locomotiveItem.state.activated) {
        // this is sticky - once it is on, it doesn't flip to off when the
        // player is no longer near
        return unitMechanicalResult;
      }
      if (locomotiveItem.state.everActivated) {
        // this is one-time only - once the monster is activated,
        // the ability to become activated again by the player being near is lost,
        // only a switch etc can re-activate it:
        return unitMechanicalResult;
      }

      const closestPlayable = findClosestPlayable(
        locomotiveItem.state.box,
        room,
      );

      if (closestPlayable === undefined) {
        return unitMechanicalResult;
      }

      const {
        state: { box: itemPosition },
      } = locomotiveItem;
      const {
        state: { box: playablePosition },
      } = closestPlayable;

      const isNear =
        itemPosition.x > playablePosition.x - nearnessThreshold &&
        itemPosition.x < playablePosition.x + nearnessThreshold &&
        itemPosition.y > playablePosition.y - nearnessThreshold &&
        itemPosition.y < playablePosition.y + nearnessThreshold;

      return isNear ? activateResult : deactivateResult;
    }
  };

const ActivatesOnStandMixin = <B extends LocomotiveBehaviourClass>(Base: B) =>
  class ActivatesOnStand extends Base {
    protected override activate<
      RoomId extends string,
      RoomItemId extends string,
    >(
      locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
      room: RoomState<RoomId, RoomItemId>,
      _gameState: GameState<RoomId>,
      _deltaMS: number,
    ): MechanicResult<LocomotiveItemType, RoomId, RoomItemId> {
      if (locomotiveItem.state.activated) {
        // once it is on, it stays on:
        return unitMechanicalResult;
      }

      return (
          iterateStoodOnByItems(locomotiveItem.state.stoodOnBy, room).some(
            isPlayableItem,
          )
        ) ?
          activateResult
        : unitMechanicalResult;
    }
  };

// on and off only set the starting state, which switches can change in play:
const NotSelfActivatingMixin: LocomotiveMixin = (Base) => Base;

/**
 * the mixins that give each kind of activation
 */
const activationMixins: { [A in Activation]: LocomotiveMixin } = {
  "after-player-near": ActivatesAfterPlayerNearMixin,
  "on-stand": ActivatesOnStandMixin,
  off: NotSelfActivatingMixin,
  on: NotSelfActivatingMixin,
};

/**
 * the mixin giving the activation an item's config names
 */
export const activationMixinFor = (activation: Activation): LocomotiveMixin =>
  // while-player-near was removed from configs - avoid a crash if given a save that
  // still has it (can be removed later, added Apr '26)
  (activation as string) === "while-player-near" ?
    NotSelfActivatingMixin
  : activationMixins[activation];
