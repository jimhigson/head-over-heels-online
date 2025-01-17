import type { Application, Filter, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { selectCurrentRoom } from "../gameState/GameState";

import { renderHud } from "../render/hud/renderHud";
import { progressGameState } from "./progressGameState";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { getColorScheme } from "@/hintColours";
import { RoomRenderer } from "../render/roomRenderer";
import { emptySet } from "@/utils/empty";
import { CRTFilter } from "pixi-filters/crt";
import { AdvancedBloomFilter } from "pixi-filters/advanced-bloom";
import type { RenderOptions } from "../RenderOptions";
import type { ZxSpectrumRoomColour } from "@/originalGame";

const topLevelFilters = (
  renderOptions: RenderOptions,
  paused: boolean,
  roomColor: ZxSpectrumRoomColour,
): Filter[] => {
  return [
    paused ?
      new RevertColouriseFilter(getColorScheme(roomColor).main.original)
    : undefined,
    renderOptions.crtFilter ?
      new CRTFilter({
        // this is only really being used for the vignette now, and could be
        // rewritten into a simpler filter:
        lineContrast: paused ? 0.3 : 0,
        vignetting: paused ? 0.5 : 0.2,
        lineWidth: renderOptions.upscale.gameEngineUpscale / 2,
      })
    : undefined,
    renderOptions.crtFilter ?
      new AdvancedBloomFilter({
        threshold: 0.7,
        brightness: 0.8,
        bloomScale: 0.6,
        blur: 10,
      })
    : undefined,
  ].filter((f) => f !== undefined);
};

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  const worldContainer = new Container({ label: "world" });
  const hudContainer = new Container({ label: "hud" });
  app.stage.addChild(worldContainer);
  app.stage.addChild(hudContainer);
  app.stage.scale = gameState.renderOptions.upscale.gameEngineUpscale;

  let roomRenderer = RoomRenderer(gameState, selectCurrentRoom(gameState));
  worldContainer.addChild(roomRenderer.container);

  const tickHud = renderHud<RoomId>(
    hudContainer,
    gameState.renderOptions.upscale,
  );

  let filtersWhenPaused: Filter[] = topLevelFilters(
    gameState.renderOptions,
    true,
    selectCurrentRoom(gameState).color,
  );
  let filtersWhenUnpaused: Filter[] = topLevelFilters(
    gameState.renderOptions,
    false,
    selectCurrentRoom(gameState).color,
  );

  const handleTick = ({ deltaMS }: Ticker) => {
    //worldContainer.x = gameState.renderOptions.upscale.effectiveSize.x / 2;

    const paused = gameState.gameSpeed === 0;

    tickHud(gameState, gameState.renderOptions.upscale.gameEngineScreenSize);

    const tickRoom = selectCurrentRoom(gameState);
    if (
      roomRenderer.room !== tickRoom ||
      roomRenderer.renderOptions !== gameState.renderOptions
    ) {
      roomRenderer.destroy();
      roomRenderer = RoomRenderer(gameState, tickRoom);
      worldContainer.addChild(roomRenderer.container);
      gameState.events.emit("roomChange", tickRoom.id);
      app.stage.scale = gameState.renderOptions.upscale.gameEngineUpscale;

      filtersWhenPaused = topLevelFilters(
        gameState.renderOptions,
        true,
        tickRoom.color,
      );
      filtersWhenUnpaused = topLevelFilters(
        gameState.renderOptions,
        false,
        tickRoom.color,
      );
    }

    if (!paused) {
      app.stage.filters = filtersWhenUnpaused;
      const movedItems = progressGameState(gameState, deltaMS);
      roomRenderer.tick({
        progression: gameState.progression,
        movedItems,
        deltaMS,
      });
    } else {
      app.stage.filters = filtersWhenPaused;
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
