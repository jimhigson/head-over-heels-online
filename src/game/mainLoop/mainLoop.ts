import type { Application, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { selectCurrentRoom } from "../gameState/GameState";

import { amigaLowResPal } from "@/originalGame";
import { upscale } from "../render/upscale";
import { renderHud } from "../render/hud/renderHud";
import { progressGameState } from "./progressGameState";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { getColorScheme } from "@/hintColours";
import { noFilters } from "../render/filters/paletteSwapFilters";
import { RoomRenderer } from "../render/roomRenderer";
import { spritesheetPalette } from "gfx/spritesheetPalette";

const hudBottomMargin = 4;

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  const worldContainer = new Container();
  worldContainer.label = "world";
  worldContainer.y = amigaLowResPal.height * 0.7;
  app.stage.addChild(worldContainer);

  const hudContainer = new Container();
  // pull the hud up from the bottom of the screen; after this, anything else can render right up to the container's bottom edge
  hudContainer.y = -hudBottomMargin;
  app.stage.addChild(hudContainer);

  const pauseFilter = new RevertColouriseFilter(spritesheetPalette.shadow);

  let roomRenderer = RoomRenderer(
    selectCurrentRoom(gameState),
    gameState.renderOptions,
  );
  worldContainer.addChild(roomRenderer.container);

  const updateHud = renderHud<RoomId>(hudContainer);

  const upscaler = upscale(app);
  const handleTick = ({ deltaMS }: Ticker) => {
    const screenEffectiveSize = upscaler.rescale();
    worldContainer.x = app.renderer.width / upscaler.curUpscale / 2;

    const paused = gameState.gameSpeed === 0;

    updateHud(gameState, screenEffectiveSize);

    if (
      roomRenderer.room !== selectCurrentRoom(gameState) ||
      roomRenderer.renderOptions !== gameState.renderOptions
    ) {
      roomRenderer.destroy();
      roomRenderer = RoomRenderer(
        selectCurrentRoom(gameState),
        gameState.renderOptions,
      );
      worldContainer.addChild(roomRenderer.container);
    }

    if (!paused) {
      app.stage.filters = noFilters;
      const movedItems = progressGameState(gameState, deltaMS);
      roomRenderer.tick({ progression: gameState.progression, movedItems });
    } else {
      app.stage.filters = pauseFilter;
      const roomColor = selectCurrentRoom(gameState).color;
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
