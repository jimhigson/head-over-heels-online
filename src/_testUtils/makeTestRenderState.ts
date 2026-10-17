import { type ItemTickContext } from "../game/render/ItemRenderContexts";
import { type GameStateWithMockInput } from "./MockInputStateTracker";
import {
  makeFakeRendererToAdvanceAudioContextClock,
  makeTestRoomSoundRenderer,
  makeTestSoundOutput,
} from "./sounds/soundTestUtils";

export type TestRenderer = { tick: (tickContext: ItemTickContext) => void };

/** a renderer of the whole game, rather than of one item */
export type ImplicitTestRenderer = {
  tick: (
    tickContext: ItemTickContext,
    gameState: GameStateWithMockInput,
  ) => void;
};

/**
 * everything rendering needs in a test, kept across play-throughs as a room
 * renderer keeps it across frames, so a play-through can carry on from another.
 * Make one per test, so nothing carries over between tests
 */
export type TestRenderState = {
  /** the room progression as of the last frame rendered */
  renderedOnProgression: number | undefined;
  /**
   * ticked every frame of a play-through, in order, before its own renderers -
   * so eg audio time has reached the frame's time when its sounds start
   */
  implicitRenderers: Array<ImplicitTestRenderer>;
  /** what every sound renderer outputs to, as a room renderer's sound output */
  soundOutput: GainNode;
};

export const makeTestRenderState = (): TestRenderState => {
  const soundOutput = makeTestSoundOutput();
  return {
    renderedOnProgression: undefined,
    implicitRenderers: [
      makeFakeRendererToAdvanceAudioContextClock(),
      makeTestRoomSoundRenderer(soundOutput),
    ],
    soundOutput,
  };
};
