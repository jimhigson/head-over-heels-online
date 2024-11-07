import { Application, Container, Ticker } from "pixi.js";
import { currentRoom, GameState } from "../gameState/GameState";
import { walking } from "./mechanics/walking";
import { teleporter } from "./mechanics/teleporter";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItems";
import { sortItemsByDrawOrder } from "../render/sortItemsByDrawOrder";
import { fallingAndLanding } from "./mechanics/falling";
import {
  isItemType,
  isPlayableItem,
  itemFalls,
  ItemInPlay,
  ItemInPlayType,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { jumping } from "./mechanics/jumping";
import { MechanicResult } from "./MechanicResult";
import { moveItem } from "./moveItem";
import { PlanetName } from "@/sprites/planets";
import { stateChangeNeedsRerender } from "../render/stateChangeNeedsRerender";
import { steppedOff } from "./mechanics/steppedOff";
import { RoomState } from "@/model/modelTypes";
import { renderRoom } from "../render/renderRoom";
import { RenderOptions } from "../RenderOptions";
import { swopCharacters } from "../gameState/swopCharacters";
import { teleporting } from "./mechanics/teleporting";

const tickItem = <RoomId extends string, T extends ItemInPlayType>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const originalState = item.state;
  const room = currentRoom(gameState);
  const { inputState } = gameState;

  /*
   * each mechanic sees the item in the state given it it by the previous ones
   * ie, the overall mechanic is the result of functional composition of the
   * individual mechanics
   */

  const applyResult = ({ positionDelta, stateDelta }: MechanicResult<T>) => {
    if (positionDelta !== undefined) {
      moveItem(item as UnknownItemInPlay, positionDelta, gameState);
    }
    if (stateDelta !== undefined) {
      item.state = { ...item.state, ...stateDelta };
    }
  };

  if (isPlayableItem(item) && item.type === gameState.currentCharacterName) {
    applyResult(teleporting(item, gameState, deltaMS) as MechanicResult<T>);
    applyResult(walking(item, inputState, deltaMS) as MechanicResult<T>);
    applyResult(jumping(item, inputState, deltaMS) as MechanicResult<T>);
  }
  if (itemFalls(item)) {
    applyResult(steppedOff(item) as MechanicResult<T>);
    applyResult(fallingAndLanding(item, room, deltaMS) as MechanicResult<T>);
  }

  if (isItemType("teleporter")(item)) {
    applyResult(teleporter(item, gameState, room) as MechanicResult<T>);
  }

  if (stateChangeNeedsRerender(item as UnknownItemInPlay, originalState)) {
    item.renderingDirty = true;
  }
};

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
  worldContainer: Container,
) => {
  // the last room we rendered - this allows us to track when the room has changed
  // since the last tick so we can set up the change
  let lastRoomRendered: RoomState<PlanetName, RoomId> | undefined = undefined;
  let lastRenderOptions: RenderOptions<RoomId> | undefined = undefined;

  const handleTick = ({ deltaMS }: Ticker) => {
    const { inputState } = gameState;

    if (inputState.swop) {
      swopCharacters(gameState);
      // we have now handled that keypress, turn it off until the key is pressed again,
      // which will turn this flag back on
      inputState.swop = false;
    }

    const room = currentRoom(gameState);
    const { renderOptions } = gameState;

    if (
      lastRoomRendered !== room ||
      lastRenderOptions !== gameState.renderOptions
    ) {
      console.log(
        `room (or render options) changed!
          room:${lastRoomRendered?.id} -> ${room.id}
          renderOptions: ${lastRenderOptions} -> ${gameState.renderOptions}`,
      );

      // the room has changed since the last tick
      // so we need to set up the new room
      worldContainer.removeChildren();

      const roomContainer = renderRoom(room, renderOptions);

      worldContainer.addChild(roomContainer);

      lastRoomRendered = room;
      lastRenderOptions = gameState.renderOptions;
    }

    // re-sort the room's items:
    const { items } = room;
    let sortDirty = false;

    for (const item of items) {
      tickItem(item, gameState, deltaMS);

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
  };

  return {
    start() {
      app.ticker.add(handleTick);
      return this;
    },
    stop() {
      app.ticker.remove(handleTick);
    },
  };
};
