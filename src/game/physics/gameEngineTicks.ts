import { Application } from "pixi.js";
import { currentRoom, GameState } from "../gameState/GameState";
import { walking } from "./mechanics/walking";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItems";
import { sortItemsByDrawOrder } from "../render/sortItemsByDrawOrder";
import { falling } from "./mechanics/falling";
import {
  isPlayableItem,
  itemFalls,
  ItemInPlay,
  ItemInPlayType,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { jumping } from "./mechanics/jumping";
import { MechanicResult } from "./MechanicResult";
import { moveItem } from "./moveItem";
import { InputState } from "../input/InputState";
import { RoomState } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { stateChangeNeedsRerender } from "../render/stateChangeNeedsRerender";
import { steppedOff } from "./mechanics/steppedOff";

const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  inputState: InputState,
  room: RoomState<PlanetName, RoomId>,
  deltaMS: number,
) => {
  const originalState = item.state;

  /*
   * each mechanic sees the item in the state given it it by the previous ones
   * ie, the overall mechanic is the result of functional composition of the
   * individual mechanics
   */

  const applyResult = ({ positionDelta, stateDelta }: MechanicResult<T>) => {
    moveItem(item as UnknownItemInPlay, positionDelta, room);
    item.state = { ...item.state, ...stateDelta };
  };

  if (isPlayableItem(item)) {
    applyResult(walking(item, inputState, deltaMS) as MechanicResult<T>);
    applyResult(jumping(item, inputState, deltaMS) as MechanicResult<T>);
  }
  if (itemFalls(item)) {
    applyResult(steppedOff(item) as MechanicResult<T>);
    applyResult(falling(item, room, deltaMS) as MechanicResult<T>);
  }

  if (stateChangeNeedsRerender(item as UnknownItemInPlay, originalState)) {
    item.renderingDirty = true;
  }
};

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add(({ deltaMS }) => {
    const { inputState } = gameState;

    const room = currentRoom(gameState);

    // re-sort the room's items:
    const items = room.items;
    let sortDirty = false;

    for (const item of items) {
      tickItem(item, inputState, room, deltaMS);

      if (item.renderPositionDirty) {
        moveSpriteToItemProjection(item);
        item.renderPositionDirty = false;
        sortDirty = true;
      }
      if (item.renderingDirty) {
        renderItem(item, room);
        item.renderingDirty = false;
      }
    }
    if (sortDirty) {
      sortItemsByDrawOrder(room.items);
    }
  });
};
