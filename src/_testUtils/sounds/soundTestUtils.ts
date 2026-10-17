import { vi } from "vitest";
// type-only, so importing does not install the test api as a side effect:
import {
  type TestApiAudioBufferSourceNode,
  type TestApiAudioContext,
  type TestApiAudioNode,
} from "web-audio-test-api";

import {
  exportedSfxUrls,
  type ExportedSoundId,
} from "../../_generated/sfxdex/sfx";
import { type GameState } from "../../game/gameState/GameState";
import { selectCurrentRoomState } from "../../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { type ItemInPlayType } from "../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
import { roomItemsIterable } from "../../model/roomItemsInPlayIterators";
import { type RoomState } from "../../model/RoomState";
import { audioCtx } from "../../sound/audioCtx";
import { createSoundRenderer } from "../../sound/createSoundRenderer";
import { type ItemSoundRenderer } from "../../sound/ItemSoundRenderer";
import { loadedSound, loadSound } from "../../sound/soundsLoader";
import { soundsFadeDurationSec } from "../../sound/soundUtils/stopWithFade";
import { keys } from "../../utils/entries";
import { cameraAngleBase } from "../../utils/vectors/cameraAngleVectors";
import { type TestRenderState } from "../makeTestRenderState";

/**
 * how long (in ms) to play on for any sounds that have been stopped to finish
 * fading out - the fade, plus a small margin for error
 */
export const enoughTimeForSoundsToFade = soundsFadeDurationSec * 1_000 + 100;

// the setup file installs web-audio-test-api as the browser's web audio:
const testApiAudioCtx = audioCtx as TestApiAudioContext;

/**
 * load every sound through the real loader, with fetch stubbed so no network is
 * needed - the test audio context decodes whatever it is given.
 *
 * every sound fetches the same empty bytes, so the bytes never identify a
 * sound. Instead, each decode yields a distinct buffer object, which the loader
 * keeps per sound id - {@link soundPlayback} matches sources to sounds by that
 * buffer's identity
 */
export const loadSoundsForTest = async () => {
  vi.stubGlobal("fetch", async () => new Response(new ArrayBuffer(8)));
  for (const soundId of keys(exportedSfxUrls)) {
    await loadSound(soundId);
  }
};

/**
 * undo {@link loadSoundsForTest} and silence everything, so no sound carries
 * over into the next test
 */
export const resetSoundsForTest = () => {
  vi.unstubAllGlobals();
  testApiAudioCtx.$reset();
};

const isBufferSourceNode = (
  audioNode: TestApiAudioNode,
): audioNode is TestApiAudioBufferSourceNode => "$state" in audioNode;

const isTestApiAudioNode = (
  audioNode: AudioNode,
): audioNode is TestApiAudioNode => "$inputs" in audioNode;

/** every node with a path to the given node */
const nodesUpstreamOf = (downstreamNode: AudioNode): Set<TestApiAudioNode> => {
  if (!isTestApiAudioNode(downstreamNode)) {
    throw new Error(
      "audio node is not from web-audio-test-api - is the test file missing its happy-dom environment?",
    );
  }
  const visited = new Set<TestApiAudioNode>();
  const toVisit: Array<TestApiAudioNode> = [downstreamNode];
  for (let audioNode = toVisit.pop(); audioNode; audioNode = toVisit.pop()) {
    for (const inputJunction of audioNode.$inputs) {
      for (const { node: upstreamNode } of inputJunction.inputs) {
        if (!visited.has(upstreamNode)) {
          visited.add(upstreamNode);
          toVisit.push(upstreamNode);
        }
      }
    }
  }
  return visited;
};

export type SoundPlayback = "loop" | "notPlaying" | "spotEffect";

export type PlayingSound = {
  soundId: ExportedSoundId;
  playback: Exclude<SoundPlayback, "notPlaying">;
};

/**
 * every sound playing in the graph feeding the render state's sound output, in
 * sound id order - a sound playing both ways at once counts as a loop
 */
export const soundsPlaying = (
  renderState: TestRenderState,
): Array<PlayingSound> => {
  const soundIdsByBuffer = new Map(
    keys(exportedSfxUrls).map((soundId) => [loadedSound(soundId), soundId]),
  );
  const playbackBySoundId = new Map<
    ExportedSoundId,
    PlayingSound["playback"]
  >();
  for (const audioNode of nodesUpstreamOf(renderState.soundOutput)) {
    if (
      !isBufferSourceNode(audioNode) ||
      audioNode.buffer === null ||
      audioNode.$state !== "PLAYING"
    ) {
      continue;
    }
    const maybeSoundId = soundIdsByBuffer.get(audioNode.buffer);
    if (import.meta.env.DEV && maybeSoundId === undefined) {
      throw new Error("a playing buffer is not any loaded sound");
    }
    const soundId = maybeSoundId!;
    if (playbackBySoundId.get(soundId) !== "loop") {
      playbackBySoundId.set(soundId, audioNode.loop ? "loop" : "spotEffect");
    }
  }
  return playbackBySoundId
    .entries()
    .map(([soundId, playback]) => ({ soundId, playback }))
    .toArray()
    .sort((a, b) => a.soundId.localeCompare(b.soundId));
};

/** how the given sound is playing - see {@link soundsPlaying} */
export const soundPlayback = (
  renderState: TestRenderState,
  soundId: ExportedSoundId,
): SoundPlayback =>
  soundsPlaying(renderState).find(
    (playingSound) => playingSound.soundId === soundId,
  )?.playback ?? "notPlaying";

/**
 * a renderer that advances the audio context's time along with the game's, so
 * scheduled starts and stops take effect
 */
export const makeFakeRendererToAdvanceAudioContextClock = () => ({
  tick({ deltaMS }: { deltaMS: number }) {
    testApiAudioCtx.$process(deltaMS / 1_000);
  },
});

/**
 * the node a test's sound renderers output to - standing in for a room
 * renderer's sound output - connected to the destination
 */
export const makeTestSoundOutput = (): GainNode => {
  const soundOutput = testApiAudioCtx.createGain();
  soundOutput.connect(testApiAudioCtx.destination);
  return soundOutput;
};

/**
 * renders the sound of every item in the current room, as a room renderer
 * does: each tick, items new to the room get the sound renderer the engine
 * would pick (default sound settings, original camera angle), output to the
 * given node, and items that have left have theirs destroyed. A change of room
 * starts afresh
 */
export const makeTestRoomSoundRenderer = (soundOutput: AudioNode) => {
  /** an item mapped to undefined makes no sound */
  const itemSoundRenderers = new Map<
    UnionOfAllItemInPlayTypes<string, string>,
    ItemSoundRenderer<ItemInPlayType> | undefined
  >();
  let renderedRoom: RoomState<string, string> | undefined = undefined;

  const destroyItemSoundRenderers = () => {
    for (const itemSoundRenderer of itemSoundRenderers.values()) {
      itemSoundRenderer?.destroy();
    }
    itemSoundRenderers.clear();
  };

  return {
    tick(tickContext: ItemTickContext, gameState: GameState<string>) {
      const room = selectCurrentRoomState(gameState);
      if (room !== renderedRoom) {
        destroyItemSoundRenderers();
        renderedRoom = room;
      }
      if (room === undefined) {
        return;
      }

      for (const [item, itemSoundRenderer] of itemSoundRenderers) {
        if (room.items[item.id] !== item) {
          itemSoundRenderer?.destroy();
          itemSoundRenderers.delete(item);
        }
      }
      for (const item of roomItemsIterable(room.items)) {
        if (!itemSoundRenderers.has(item)) {
          const itemSoundRenderer = createSoundRenderer({
            item,
            room,
            general: {
              cameraAngle: cameraAngleBase,
              gameState,
              soundSettings: {},
            },
          });
          itemSoundRenderer?.output.connect(soundOutput);
          itemSoundRenderers.set(item, itemSoundRenderer);
        }
      }

      for (const itemSoundRenderer of itemSoundRenderers.values()) {
        itemSoundRenderer?.tick(tickContext);
      }
    },
  };
};
