import type { Application, Filter, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/GameState";
import { HudRenderer } from "../render/hud/HudRenderer";
import { progressGameState } from "./progressGameState";
import { RoomRenderer } from "../render/roomRenderer";
import { CRTFilter } from "pixi-filters/crt";
import { AdvancedBloomFilter } from "pixi-filters/advanced-bloom";
import { emptySet } from "../../utils/empty";
import { store } from "../../store/store";
import { selectIsPaused } from "../../store/selectors";
import type { DisplaySettings } from "../../store/gameMenusSlice";

const topLevelFilters = (
  { crtFilter }: DisplaySettings,
  paused: boolean,
): Filter[] => {
  return [
    crtFilter ?
      new CRTFilter({
        // this is only really being used for the vignette now, and could be
        // rewritten into a simpler filter:
        lineContrast: paused ? 0.3 : 0,
        vignetting: paused ? 0.4 : 0.2,
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
  #hudRenderer: HudRenderer<RoomId>;
  #roomRenderer: RoomRenderer<RoomId, string>;
  #worldContainer: Container = new Container({
    label: "world",
  });
  #app: Application;
  #gameState: GameState<RoomId>;

  constructor(app: Application, gameState: GameState<RoomId>) {
    this.#app = app;
    this.#gameState = gameState;

    const {
      upscale: { gameEngineUpscale },
    } = store.getState();

    app.stage.addChild(this.#worldContainer);

    app.stage.scale = gameEngineUpscale;

    this.#roomRenderer = new RoomRenderer(
      gameState,
      selectCurrentRoomState(gameState),
      false,
    );
    this.#worldContainer.addChild(this.#roomRenderer.container);

    this.#hudRenderer = new HudRenderer<RoomId>();
    app.stage.addChild(this.#hudRenderer.container);

    this.#initFilters();
  }

  #initFilters() {
    const {
      userSettings: { displaySettings },
    } = store.getState();

    this.#filtersWhenPaused = topLevelFilters(displaySettings, true);
    this.#filtersWhenUnpaused = topLevelFilters(displaySettings, false);
  }

  private tick = ({ deltaMS }: Ticker) => {
    const tickState = store.getState();
    const isPaused = selectIsPaused(tickState);
    const {
      userSettings: { displaySettings: tickDisplaySettings },
      upscale: tickUpscale,
    } = store.getState();

    this.#hudRenderer.tick({
      gameState: this.#gameState,
      screenSize: tickUpscale.gameEngineScreenSize,
      colourise: !isPaused && tickDisplaySettings.colourise,
    });

    const tickRoom = selectCurrentRoomState(this.#gameState);

    if (
      // for several things that change infrequently, we don't bother to try to adjust the room scene
      // graph if it changes - we simply destroy and recreate it entirely:
      this.#roomRenderer.roomState !== tickRoom ||
      this.#roomRenderer.upscale !== tickUpscale ||
      this.#roomRenderer.displaySettings !== tickDisplaySettings ||
      this.#roomRenderer.paused !== isPaused
    ) {
      this.#roomRenderer.destroy();
      this.#roomRenderer = new RoomRenderer(
        this.#gameState,
        tickRoom,
        isPaused,
      );
      this.#worldContainer.addChild(this.#roomRenderer.container);
      // this isn't the ideal place to emit this from - it gets fired even if just the
      // display settings change
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
    this.#roomRenderer.destroy();
    this.#hudRenderer.destroy();
    this.#app.ticker.remove(this.tick);
  }
}
