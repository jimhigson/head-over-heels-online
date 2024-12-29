import type { Application, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { selectCurrentRoom } from "../gameState/GameState";

import { renderHud } from "../render/hud/renderHud";
import { progressGameState } from "./progressGameState";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { getColorScheme } from "@/hintColours";
import { noFilters } from "../render/filters/paletteSwapFilters";
import { RoomRenderer } from "../render/roomRenderer";
import { spritesheetPalette } from "gfx/spritesheetPalette";

const worldBottomMargin = 16;

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  const worldContainer = new Container({ label: "world" });
  const hudContainer = new Container({ label: "hud" });
  app.stage.addChild(worldContainer);
  app.stage.addChild(hudContainer);

  const pauseFilter = new RevertColouriseFilter(spritesheetPalette.shadow);

  let roomRenderer = RoomRenderer(
    selectCurrentRoom(gameState),
    gameState.renderOptions,
  );
  worldContainer.addChild(roomRenderer.container);

  const tickHud = renderHud<RoomId>(hudContainer);

  const handleTick = ({ deltaMS }: Ticker) => {
    worldContainer.x =
      app.renderer.width / gameState.renderOptions.scaleFactor / 2;

    const paused = gameState.gameSpeed === 0;

    const screenEffectiveSize = {
      x: Math.floor(app.renderer.width / gameState.renderOptions.scaleFactor),
      y: Math.floor(app.renderer.height / gameState.renderOptions.scaleFactor),
    };

    worldContainer.y = screenEffectiveSize.y - worldBottomMargin;
    tickHud(gameState, screenEffectiveSize);

    const tickRoom = selectCurrentRoom(gameState);
    if (
      roomRenderer.room !== tickRoom ||
      roomRenderer.renderOptions !== gameState.renderOptions
    ) {
      roomRenderer.destroy();
      roomRenderer = RoomRenderer(tickRoom, gameState.renderOptions);
      worldContainer.addChild(roomRenderer.container);
      gameState.events.emit("roomChange", tickRoom.id);
      app.stage.scale = gameState.renderOptions.scaleFactor;
    }

    if (!paused) {
      app.stage.filters = noFilters;
      const movedItems = progressGameState(gameState, deltaMS);
      roomRenderer.tick({ progression: gameState.progression, movedItems });
    } else {
      app.stage.filters = pauseFilter;
      const roomColor = tickRoom.color;
      pauseFilter.targetColor = getColorScheme(roomColor).main.original;
    }
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
