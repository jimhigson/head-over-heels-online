import type { Application, Filter, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/GameState";
import { renderHud } from "../render/hud/renderHud";
import { progressGameState } from "./progressGameState";
import { RoomRenderer } from "../render/roomRenderer";
import { CRTFilter } from "pixi-filters/crt";
import { AdvancedBloomFilter } from "pixi-filters/advanced-bloom";
import { RevertColouriseFilter } from "../render/filters/RevertColouriseFilter";
import { getColorScheme } from "../hintColours";
import type { ZxSpectrumRoomColour } from "../../originalGame";
import { emptySet } from "../../utils/empty";
import { store } from "../../store/store";
import { selectIsPaused } from "../../store/selectors";
import type { DisplaySettings } from "../../store/gameMenusSlice";

const topLevelFilters = (
  { crtFilter }: DisplaySettings,
  paused: boolean,
  roomColor: ZxSpectrumRoomColour,
): Filter[] => {
  return [
    paused ?
      new RevertColouriseFilter(getColorScheme(roomColor).main.original)
    : undefined,
    crtFilter ?
      new CRTFilter({
        // this is only really being used for the vignette now, and could be
        // rewritten into a simpler filter:
        lineContrast: paused ? 0.3 : 0,
        vignetting: paused ? 0.5 : 0.2,
      })
    : undefined,
    crtFilter ?
      new AdvancedBloomFilter({
        threshold: 0.7,
        brightness: 0.9,
        bloomScale: 0.6,
        blur: 10,
      })
    : undefined,
  ].filter((f) => f !== undefined);
};

export class MainLoop<RoomId extends string> {
  #filtersWhenPaused!: Filter[];
  #filtersWhenUnpaused!: Filter[];
  #tickHud: ReturnType<typeof renderHud<RoomId>>;
  #roomRenderer: RoomRenderer<RoomId, string>;
  #worldContainer: Container = new Container({
    label: "world",
  });
  #hudContainer: Container = new Container({ label: "hud" });
  #app: Application;
  #gameState: GameState<RoomId>;

  constructor(app: Application, gameState: GameState<RoomId>) {
    this.#app = app;
    this.#gameState = gameState;

    const {
      upscale: { gameEngineUpscale },
    } = store.getState();

    app.stage.addChild(this.#worldContainer);
    app.stage.addChild(this.#hudContainer);
    app.stage.scale = gameEngineUpscale;

    this.#roomRenderer = new RoomRenderer(
      gameState,
      selectCurrentRoomState(gameState),
    );
    this.#worldContainer.addChild(this.#roomRenderer.container);

    this.#tickHud = renderHud<RoomId>(this.#hudContainer);

    this.#initFilters();
  }

  #initFilters() {
    const {
      userSettings: { displaySettings },
    } = store.getState();

    this.#filtersWhenPaused = topLevelFilters(
      displaySettings,
      true,
      selectCurrentRoomState(this.#gameState).color,
    );
    this.#filtersWhenUnpaused = topLevelFilters(
      displaySettings,
      false,
      selectCurrentRoomState(this.#gameState).color,
    );
  }

  private tick = ({ deltaMS }: Ticker) => {
    const tickState = store.getState();
    const isPaused = selectIsPaused(tickState);
    const {
      userSettings: { displaySettings: tickDisplaySettings },
      upscale: tickUpscale,
    } = store.getState();

    this.#tickHud(this.#gameState, tickUpscale.gameEngineScreenSize);

    const tickRoom = selectCurrentRoomState(this.#gameState);

    if (
      this.#roomRenderer.roomState !== tickRoom ||
      this.#roomRenderer.upscale !== tickUpscale ||
      this.#roomRenderer.displaySettings !== tickDisplaySettings
    ) {
      this.#roomRenderer.destroy();
      this.#roomRenderer = new RoomRenderer(this.#gameState, tickRoom);
      this.#worldContainer.addChild(this.#roomRenderer.container);
      // this might be a bad place to emit this from
      this.#gameState.events.emit("roomChange", tickRoom.id);
      this.#app.stage.scale = tickUpscale.gameEngineUpscale;

      this.#initFilters();
    }

    if (!isPaused) {
      this.#app.stage.filters = this.#filtersWhenUnpaused;
      const movedItems = progressGameState(this.#gameState, deltaMS);
      this.#roomRenderer.tick({
        progression: this.#gameState.progression,
        movedItems,
        deltaMS,
        displaySettings: tickDisplaySettings,
      });
    } else {
      this.#app.stage.filters = this.#filtersWhenPaused;
      // render while paused only if the room hasn't been rendered before, so we don't
      // pause on a blank world:
      if (!this.#roomRenderer.everRendered) {
        this.#roomRenderer.tick({
          progression: this.#gameState.progression,
          movedItems: emptySet,
          deltaMS,
          displaySettings: tickDisplaySettings,
        });
      }
    }
  };

  start() {
    this.#app.ticker.add(this.tick);
    return this;
  }
  stop() {
    this.#app.stage.removeChild(this.#worldContainer);
    this.#app.stage.removeChild(this.#hudContainer);
    this.#app.ticker.remove(this.tick);
  }
}

/*
export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  const worldContainer = new Container({ label: "world" });
  const hudContainer = new Container({ label: "hud" });
  app.stage.addChild(worldContainer);
  app.stage.addChild(hudContainer);
  app.stage.scale = gameState.renderOptions.upscale.gameEngineUpscale;

  let roomRenderer = RoomRenderer(gameState, selectCurrentRoomState(gameState));
  worldContainer.addChild(roomRenderer.container);

  const tickHud = renderHud<RoomId>(
    hudContainer,
    gameState.renderOptions.upscale,
  );

  let filtersWhenPaused: Filter[] = topLevelFilters(
    gameState.renderOptions,
    true,
    selectCurrentRoomState(gameState).color,
  );
  let filtersWhenUnpaused: Filter[] = topLevelFilters(
    gameState.renderOptions,
    false,
    selectCurrentRoomState(gameState).color,
  );

  const handleTick = ({ deltaMS }: Ticker) => {
    //worldContainer.x = gameState.renderOptions.upscale.effectiveSize.x / 2;

    const paused = gameState.gameSpeed === 0;

    tickHud(gameState, gameState.renderOptions.upscale.gameEngineScreenSize);

    const tickRoom = selectCurrentRoomState(gameState);
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
*/
