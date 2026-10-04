import {
  itemBehaviourKey,
  type ItemInPlay,
  type ItemInPlayType,
} from "../../../model/ItemInPlay";
import {
  isPlayableItem,
  isSlidingItem,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../../model/RoomState";
import { originXyz } from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import { type ItemTouchEvent } from "../../physics/handleTouch/ItemTouchEvent";
import {
  type MechanicResult,
  unitMechanicalResult,
} from "../../physics/MechanicResult";
import { FreeItemBehaviour } from "../freeItem/FreeItemBehaviour";

export type LocomotiveItemType = "monster" | "movingPlatform";

/**
 * an item that moves itself, in the pattern of its config's `movement`
 */
export type LocomotiveItem<RoomId extends string, RoomItemId extends string> =
  | ItemInPlay<"monster", RoomId, RoomItemId>
  | ItemInPlay<"movingPlatform", RoomId, RoomItemId>;

export const notWalking = Object.freeze({
  movementType: "vel",
  vels: { walking: originXyz },
} as const satisfies MechanicResult<
  "monster",
  string,
  string
> satisfies MechanicResult<"movingPlatform", string, string>);

/**
 * a locomotive behaviour class that a mixin can extend. TypeScript requires a
 * mixin's base constructor to take only `...any[]`
 */
export type LocomotiveBehaviourClass = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => LocomotiveBehaviour;

/**
 * a mixin giving a locomotive behaviour one part of what it does
 */
export type LocomotiveMixin = <B extends LocomotiveBehaviourClass>(
  Base: B,
) => B;

/**
 * free items that move themselves, once activated. How they move (their
 * locomotion) and what activates them are given by mixins, chosen by their
 * config's `movement` and `activated`
 */
export class LocomotiveBehaviour extends FreeItemBehaviour {
  override mechanicResults<RoomId extends string, RoomItemId extends string>(
    locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    deltaMS: number,
    into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {
    super.mechanicResults(locomotiveItem, room, gameState, deltaMS, into);

    const activationMechanicResult = this.activate(
      locomotiveItem,
      room,
      gameState,
      deltaMS,
    );

    if (
      (
        activationMechanicResult as MechanicResult<
          "monster",
          RoomId,
          RoomItemId
        >
      ).stateDelta?.activated === true
    ) {
      this.onActivated(locomotiveItem, room);
    }

    into.push(
      activationMechanicResult,
      (
        !locomotiveItem.state.activated ||
          (locomotiveItem.type === "monster" &&
            locomotiveItem.state.busyLickingDoughnutsOffFace)
      ) ?
        notWalking
      : this.locomote(locomotiveItem, room, gameState, deltaMS),
    );
  }

  override onTouch<RoomId extends string, RoomItemId extends string>(
    locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (!isMover) {
      super.onTouch(locomotiveItem, e, isMover);
      return;
    }

    const { touchedItem } = e;
    // playables and sliding items react to this before it turns or stops:
    if (isPlayableItem(touchedItem) || isSlidingItem(touchedItem)) {
      super.onTouch(locomotiveItem, e, isMover);
      this.#touching(locomotiveItem, e);
    } else {
      this.#touching(locomotiveItem, e);
      super.onTouch(locomotiveItem, e, isMover);
    }
  }

  /**
   * whether this tick (de)activates the item. Changes nothing: an activation
   * mixin gives the item what activates it
   */
  protected activate<RoomId extends string, RoomItemId extends string>(
    _locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
    _deltaMS: number,
  ): MechanicResult<LocomotiveItemType, RoomId, RoomItemId> {
    return unitMechanicalResult;
  }

  /**
   * this tick's movement, while activated. Stands still: a locomotion mixin
   * gives the item its way of moving
   */
  protected locomote<RoomId extends string, RoomItemId extends string>(
    _locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
    _deltaMS: number,
  ): MechanicResult<LocomotiveItemType, RoomId, RoomItemId> {
    return notWalking;
  }

  /**
   * reacts to having moved into something solid
   */
  protected touchedWhileLocomoting<
    RoomId extends string,
    RoomItemId extends string,
  >(
    _locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
    _e: ItemTouchEvent<RoomId, RoomItemId>,
  ): void {}

  #touching<RoomId extends string, RoomItemId extends string>(
    locomotiveItem: LocomotiveItem<RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
  ): void {
    const { touchedItem } = e;

    //eg, monsters shouldn't change direction on touching a stopAutowalk item:
    if (touchedItem[itemBehaviourKey].isNonSolid(touchedItem, locomotiveItem)) {
      return;
    }

    this.touchedWhileLocomoting(locomotiveItem, e);
  }
}
