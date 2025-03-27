import type { SoundId } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { Xyz } from "../../utils/vectors/vectors";
import { originXyz, xyzEqual } from "../../utils/vectors/vectors";
import type { MonsterWhich } from "../../model/json/MonsterJsonConfig";
import type { CreateAudioNodeWithGainOptionsObject } from "../soundUtils/createAudioNode";
import { createAudioNode } from "../soundUtils/createAudioNode";
import {
  createBracketedSound,
  type BracketedSound,
} from "../soundUtils/createBracketedSound";

const turnaroundSounds: {
  [M in MonsterWhich]?:
    | Omit<CreateAudioNodeWithGainOptionsObject, "connectTo" | "loop">
    | SoundId;
} = {
  cyberman: { soundId: "jetpackTurnaround", gain: 1.2 },
  skiHead: "softBump",
  turtle: "softBump",
  dalek: { soundId: "mojoTurn", gain: 0.1 },
};
const ambientSounds: {
  [M in MonsterWhich]?:
    | Omit<CreateAudioNodeWithGainOptionsObject, "connectTo" | "loop">
    | SoundId;
} = {
  cyberman: { soundId: "jetpackLoop", gain: 0.5 },
  emperorsGuardian: { soundId: "jetpackLoop", gain: 0.5 },
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
  #ambientBracketed: BracketedSound | undefined;

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

    if (ambientSounds[renderContext.item.config.which] !== undefined) {
      this.#ambientBracketed = createBracketedSound({
        loop: {
          ...ambientSounds[renderContext.item.config.which],
        },
        connectTo: this.#ambientChannel,
      });
    }
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
      createAudioNode(turnaroundSounds[which]).connect(this.#bumpChannel);
    }

    if (online !== currentOnline && ambientSounds[which] !== undefined) {
      if (online) {
        this.#ambientLoop = createAudioNode({
          soundId: ambientSounds[which],
          playbackRate: 1,
          varyPlaybackRate: true,
          loop: true,
          connectTo: this.#ambientChannel,
        });
      } else {
        this.#ambientLoop?.stop();
        this.#ambientLoop = null;
      }
    }

    this.#currentRenderProps = { facing, online };
  }

  destroy(): void {}
}
