import { Application, Container, Ticker } from "pixi.js";
import { currentRoom, GameState } from "../gameState/GameState";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItems";
import { sortItemsByDrawOrder } from "../render/sortItemsByDrawOrder";
import { PlanetName } from "@/sprites/planets";
import { RoomState } from "@/model/modelTypes";
import { renderRoom } from "../render/renderRoom";
import { RenderOptions } from "../RenderOptions";
import { swopCharacters } from "../gameState/swopCharacters";
import { tickItem } from "./tickItem";

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
    //console.time("tick");
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
    //console.timeEnd("tick");
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
