import type { SoundId } from "../soundsLoader";
import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { Xyz } from "../../utils/vectors/vectors";
import { originXyz, xyzEqual } from "../../utils/vectors/vectors";
import type { MonsterWhich } from "../../model/json/MonsterJsonConfig";

const turnaroundSounds: { [M in MonsterWhich]?: SoundId } = {
  cyberman: "jetpackTurnaround",
  skiHead: "softBump",
  turtle: "softBump",
  dalek: "mojoTurn",
};
const ambientSounds: { [M in MonsterWhich]?: SoundId } = {
  cyberman: "jetpackLoop",
  emperorsGuardian: "jetpackLoop",
  dalek: "mojoLoop",
  bubbleRobot: "bubbleRobotLoop",
  helicopterBug: "helicopter",
};

export class MonsterSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"monster", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #bumpChannel: GainNode = audioCtx.createGain();
  #ambientChannel: GainNode = audioCtx.createGain();
  #ambientLoop: AudioBufferSourceNode | null = null;

  #currentRenderProps: {
    facing: Xyz;
    // online = activated and no doughnuts
    online: boolean;
  } = {
    facing: originXyz,
    online: false,
  };

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "monster",
      RoomId,
      RoomItemId
    >,
  ) {
    this.#bumpChannel.connect(this.output);
    this.#ambientChannel.connect(this.output);
    this.#ambientChannel.gain.value = 0.66;
  }

  tick() {
    const {
      renderContext: { item },
    } = this;
    const {
      config: { which },
      state: { facing, activated, busyLickingDoughnutsOffFace },
    } = item;
    const online = activated && !busyLickingDoughnutsOffFace;
    const { facing: currentFacing, online: currentOnline } =
      this.#currentRenderProps;

    if (
      !xyzEqual(facing, currentFacing) &&
      turnaroundSounds[which] !== undefined
    ) {
      const sound = loadedSounds()[turnaroundSounds[which]];
      const source = audioCtx.createBufferSource();
      source.buffer = sound;
      source.connect(this.#bumpChannel);
      source.start();
    }

    if (online !== currentOnline && ambientSounds[which] !== undefined) {
      if (online) {
        const ambientLoop = loadedSounds()[ambientSounds[which]];
        this.#ambientLoop = audioCtx.createBufferSource();

        this.#ambientLoop.buffer = ambientLoop;
        this.#ambientLoop.loop = true;

        this.#ambientLoop.connect(this.#ambientChannel);

        // randomise the start time - otherwise if there are multiple monsters, their sounds
        // will be in sync and it will sound like one monster
        this.#ambientLoop.start(ambientLoop.duration * Math.random());

        // also slightly randomise the playback rate:
        this.#ambientLoop.playbackRate.value = 1 + Math.random() * 0.05;
      } else {
        this.#ambientLoop?.stop();
        this.#ambientLoop = null;
      }
    }

    this.#currentRenderProps = { facing, online };
  }

  destroy(): void {}
}
