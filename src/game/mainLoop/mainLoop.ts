import type { Application, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItems";
import { sortItemsByDrawOrder } from "../render/sortItemsByDrawOrder";
import type { PlanetName } from "@/sprites/planets";
import type { RoomState } from "@/model/modelTypes";
import { renderCurrentRoom } from "../render/renderCurrentRoom";
import type { RenderOptions } from "../RenderOptions";
import { swopCharacters } from "../gameState/swopCharacters";
import { tickItem } from "./tickItem";
import { objectValues } from "iter-tools";
import { zxSpectrumResolution } from "@/originalGame";
import { upscale } from "../render/upscale";
import { renderHud } from "../render/hud/renderHud";

export const progressGameStateForTick = <RoomId extends string>(
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const room = currentRoom(gameState);

  for (const item of objectValues(room.items)) {
    tickItem(item, gameState, deltaMS);
  }
};

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  // the last room we rendered - this allows us to track when the room has changed
  // since the last tick so we can set up the change
  let lastRoomRendered: RoomState<PlanetName, RoomId> | undefined = undefined;
  let lastRenderOptions: RenderOptions<RoomId> | undefined = undefined;

  const worldContainer = new Container();
  worldContainer.y = zxSpectrumResolution.height * 0.7;
  app.stage.addChild(worldContainer);

  const hudContainer = new Container();
  app.stage.addChild(hudContainer);

  const updateHud = renderHud(hudContainer);

  const upscaler = upscale(app);
  const handleTick = ({ deltaMS }: Ticker) => {
    upscaler.rescale();
    worldContainer.x = app.renderer.width / upscaler.curUpscale / 2;

    updateHud(gameState);

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

      const roomContainer = renderCurrentRoom(gameState, renderOptions);

      worldContainer.addChild(roomContainer);

      lastRoomRendered = room;
      lastRenderOptions = gameState.renderOptions;
    }

    progressGameStateForTick(gameState, deltaMS);

    // re-sort the room's items:
    const { items } = room;
    let sortDirty = false;

    for (const item of objectValues(items)) {
      if (item.renderPositionDirty) {
        moveSpriteToItemProjection(item);
        item.renderPositionDirty = false;
        sortDirty = true;
      }
      if (item.renderingDirty) {
        renderItem(item, gameState);
        item.renderingDirty = false;
      }
    }
    if (sortDirty) {
      sortItemsByDrawOrder(objectValues(room.items));
    }
    //console.timeEnd("tick");
  };

  return {
    start() {
      app.ticker.add(handleTick);
      return this;
    },
    stop() {
      app.stage.removeChild(worldContainer);
      app.ticker.remove(handleTick);
    },
  };
};
