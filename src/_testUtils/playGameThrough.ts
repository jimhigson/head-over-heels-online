import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { progressGameState } from "../game/mainLoop/progressGameState";
import { progressWithSubTicks } from "../game/mainLoop/progressWithSubTicks";
import { maxSubTickDeltaMs } from "../game/physics/mechanicsConstants";
import { type ItemTickContext } from "../game/render/ItemRenderContexts";
import { cycle } from "../utils/iterators/cycle";
import { type TestRenderer, type TestRenderState } from "./makeTestRenderState";
import {
  type GameStateWithMockInput,
  type MockInputStateTracker,
} from "./MockInputStateTracker";
import { type FrameRateSpec } from "./testFrameRates";

type FrameCallback = (
  gameState: GameStateWithMockInput,
  mockInputStateTracker: MockInputStateTracker,
) => GameStateWithMockInput | void;

export type UntilFunction = (gameState: GameStateWithMockInput) => boolean;

type PlayGameThroughBaseOptions = {
  frameRate?: FrameRateSpec;
  /**
   * allows us to change the gamestate after certain frames, for example to change the
   * joystick input while the simulation is running
   */
  frameCallbacks?: Array<FrameCallback> | FrameCallback;

  setupInitialInput?: (mockInputStateTracker: MockInputStateTracker) => void;
};

type PlayGameThroughForTimeOptions = PlayGameThroughBaseOptions & {
  forTime: number;
};

type PlayGameThroughUntilOptions = PlayGameThroughBaseOptions & {
  until?: number | UntilFunction;
  /**
   * backstop to give up if until isn't matched after this time
   */
  failAfter?: number;
};

type PlayGameThroughCommonOptions =
  PlayGameThroughForTimeOptions | PlayGameThroughUntilOptions;

type PlayGameThroughOptions = PlayGameThroughCommonOptions & {
  /** only when playing through with a {@link TestRenderState} */
  renderersToTick?: never;
};

type PlayGameThroughWithRenderingOptions = PlayGameThroughCommonOptions & {
  /**
   * ticked once per frame, after the physics and before the frame callbacks,
   * with the previous frame's room progression handed over as a room renderer would
   */
  renderersToTick?: Array<TestRenderer>;
};

const isTestRenderState = (
  optionsOrRenderState: PlayGameThroughOptions | TestRenderState,
): optionsOrRenderState is TestRenderState =>
  "renderedOnProgression" in optionsOrRenderState;

const defaultFps = { fps: [60] };

/**
 * play the game through, physics only - nothing is rendered
 */
export function playGameThrough(
  gameState: GameStateWithMockInput,
  options?: PlayGameThroughOptions,
): void;
/**
 * play the game through, ticking the given renderers (and the render state's
 * own) every frame as the room renderer would. Pass the same render state to
 * consecutive play-throughs of one game so the renderers carry on from where
 * the last one finished
 */
export function playGameThrough(
  gameState: GameStateWithMockInput,
  renderState: TestRenderState,
  options: PlayGameThroughWithRenderingOptions,
): void;
export function playGameThrough(
  gameState: GameStateWithMockInput,
  optionsOrRenderState: PlayGameThroughOptions | TestRenderState = {},
  maybeRenderingOptions?: PlayGameThroughWithRenderingOptions,
): void {
  const rendering =
    isTestRenderState(optionsOrRenderState) ?
      {
        renderState: optionsOrRenderState,
        renderersToTick: maybeRenderingOptions!.renderersToTick,
      }
    : undefined;
  const options =
    isTestRenderState(optionsOrRenderState) ?
      maybeRenderingOptions!
    : optionsOrRenderState;

  const {
    frameRate = defaultFps,
    frameCallbacks = [],
    setupInitialInput = () => {},
  } = options;

  const frameRateIter = cycle(frameRate.fps);
  const ticker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);

  const frameCallbacksArray =
    Array.isArray(frameCallbacks) ? frameCallbacks : [frameCallbacks];

  setupInitialInput(gameState.inputStateTracker);

  const startGameTime = gameState.gameTime;
  const until =
    "forTime" in options ?
      startGameTime + options.forTime
      // by default, play for 1s
    : (options.until ?? startGameTime + 1_000);
  const isFinished: UntilFunction =
    typeof until === "number" ?
      (gameStateNow) => gameStateNow.gameTime >= until
    : until;

  const failAfter = "failAfter" in options ? options.failAfter : undefined;
  const failAtGameTime =
    failAfter === undefined ?
      Number.POSITIVE_INFINITY
    : startGameTime + failAfter;

  let frameNumber = 0;
  while (!isFinished(gameState)) {
    if (gameState.gameTime >= failAtGameTime) {
      throw new Error(
        `play-through's until did not hold within ${failAfter}ms`,
      );
    }
    const fpsThisFrame = frameRateIter.next().value;
    const deltaMS = 1_000 / fpsThisFrame;

    ticker(gameState, deltaMS);
    gameState.inputStateTracker.mockTick();

    if (rendering !== undefined) {
      const { renderState, renderersToTick } = rendering;
      const tickContext: ItemTickContext = {
        deltaMS,
        renderedOnProgression: renderState.renderedOnProgression,
        cameraAngleChanged: false,
      };
      for (const implicitRenderer of renderState.implicitRenderers) {
        implicitRenderer.tick(tickContext, gameState);
      }
      if (renderersToTick !== undefined) {
        for (const rendererToTick of renderersToTick) {
          rendererToTick.tick(tickContext);
        }
      }
      renderState.renderedOnProgression =
        selectCurrentRoomState(gameState)?.progression;
    }

    gameState = frameCallbacksArray.reduce((gameStateAc, frameCallback) => {
      try {
        return (
          frameCallback(gameStateAc, gameState.inputStateTracker) || gameStateAc
        );
      } catch (e) {
        (e as Error).message =
          `while playing through @${gameStateAc.gameTime}ms (frame ${frameNumber}) ${(e as Error).message}`;
        throw e;
      }
    }, gameState);
    if (gameState.gameTime > 60_000) {
      throw new Error("test didn't exit after a minute");
    }

    frameNumber++;

    // protect against infinite loops crashing node or upsetting ci/cd and taking ages to be killed:
    if (frameNumber > 5_000_000) {
      throw new Error(`test didn't exit after 5M frames ${fpsThisFrame}`);
    }
  }
}

export const stopJumpingAMomentAfterStartingPlay = (
  gameState: GameStateWithMockInput,
) => {
  if (gameState.gameTime > 50) {
    gameState.inputStateTracker.mockNotPressing("jump");
  }
};

export const stopAllInputAfter =
  (timeMs: number) => (gameState: GameStateWithMockInput) => {
    if (gameState.gameTime >= timeMs) {
      gameState.inputStateTracker.mockActionsPressed = {};
      gameState.inputStateTracker.mockDirectionPressed = undefined;
    }
  };
