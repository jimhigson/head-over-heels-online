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
import { emptySet } from "@/utils/empty";

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  const worldContainer = new Container({ label: "world" });
  const hudContainer = new Container({ label: "hud" });
  app.stage.addChild(worldContainer);
  app.stage.addChild(hudContainer);
  app.stage.scale = gameState.renderOptions.upscale.scaleFactor;

  const pauseFilter = new RevertColouriseFilter(spritesheetPalette.shadow);

  let roomRenderer = RoomRenderer(gameState, selectCurrentRoom(gameState));
  worldContainer.addChild(roomRenderer.container);

  const tickHud = renderHud<RoomId>(
    hudContainer,
    gameState.renderOptions.upscale,
  );

  const handleTick = ({ deltaMS }: Ticker) => {
    //worldContainer.x = gameState.renderOptions.upscale.effectiveSize.x / 2;

    const paused = gameState.gameSpeed === 0;

    tickHud(gameState, gameState.renderOptions.upscale.effectiveSize);

    const tickRoom = selectCurrentRoom(gameState);
    if (
      roomRenderer.room !== tickRoom ||
      roomRenderer.renderOptions !== gameState.renderOptions
    ) {
      roomRenderer.destroy();
      roomRenderer = RoomRenderer(gameState, tickRoom);
      worldContainer.addChild(roomRenderer.container);
      gameState.events.emit("roomChange", tickRoom.id);
      app.stage.scale = gameState.renderOptions.upscale.scaleFactor;
    }

    if (!paused) {
      app.stage.filters = noFilters;
      const movedItems = progressGameState(gameState, deltaMS);
      roomRenderer.tick({
        progression: gameState.progression,
        movedItems,
        deltaMS,
      });
    } else {
      app.stage.filters = pauseFilter;
      pauseFilter.targetColor = getColorScheme(tickRoom.color).main.original;
      // render while paused only if the room hasn't been rendered before:
      if (!roomRenderer.everRendered) {
        roomRenderer.tick({
          progression: gameState.progression,
          movedItems: emptySet,
          deltaMS,
        });
      }
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
