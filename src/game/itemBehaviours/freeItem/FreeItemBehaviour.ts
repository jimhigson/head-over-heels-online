import {
  itemBehaviourKey,
  type ItemInPlayType,
} from "../../../model/ItemInPlay";
import {
  type FreeItem,
  type FreeItemTypes,
  isPlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../../model/RoomState";
import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
import { originXyz } from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import { type MechanicResult } from "../../physics/MechanicResult";
import { recordActedOnBy } from "../../physics/recordActedOnBy";
import { ItemBehaviour } from "../ItemBehaviour";
import { gravity } from "./gravity";

const resetMovingFloor = {
  movementType: "vel",
  vels: {
    movingFloor: originXyz,
  },
} satisfies MechanicResult<FreeItemTypes, string, string>;

/**
 * items that are free to move - by falling, being pushed, or being carried
 * along by whatever they stand on
 */
export class FreeItemBehaviour extends ItemBehaviour {
  override isPushableBy<RoomId extends string, RoomItemId extends string>(
    item: FreeItem<RoomId, RoomItemId>,
    pusher: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _forceful: boolean,
  ): item is FreeItem<RoomId, RoomItemId> {
    return !(
      this.isHeavy(item) && pusher[itemBehaviourKey].stoppedByHeavyItems
    );
  }

  override mechanicResults<RoomId extends string, RoomItemId extends string>(
    item: FreeItem<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    deltaMS: number,
    into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {
    into.push(
      gravity(item, room, gameState, deltaMS),
      this.#movingFloorMechanicResult(item, room),
    );
  }

  /**
   * carried along by what this item stands on, if that is a moving floor
   */
  #movingFloorMechanicResult<RoomId extends string, RoomItemId extends string>(
    item: FreeItem<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
  ): MechanicResult<FreeItemTypes, RoomId, RoomItemId> {
    if (isPlayableItem(item) && item.state.teleporting !== null) {
      return resetMovingFloor;
    }

    const standingOn = stoodOnItem(item.state.standingOnItemId, room);

    if (standingOn === null) {
      return resetMovingFloor;
    }

    const movingFloorVelocity = standingOn[
      itemBehaviourKey
    ].movingFloorVelocity(standingOn, item);

    if (movingFloorVelocity === undefined) {
      return resetMovingFloor;
    }

    recordActedOnBy(standingOn.id, item, room, true, false);

    return {
      movementType: "vel",
      vels: {
        movingFloor: movingFloorVelocity,
      },
    };
  }
}
