import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { MonsterWhich } from "../../model/json/MonsterJsonConfig";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type {
  BracketedSound,
  CreateBracketedEventOptions,
} from "../soundUtils/createBracketedSound";

import {
  type DirectionXy8,
  originXyz,
  vectorClosestDirectionXy8,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { audioCtx } from "../audioCtx";
import {
  type BracketedSegmentOptions,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

type PerMonsterSounds = {
  [M in MonsterWhich]?: BracketedSegmentOptions;
};
type PerMonsterBracketedSoundOptions = {
  [M in MonsterWhich]?: CreateBracketedEventOptions;
};

const collisionSounds: PerMonsterSounds = {
  skiHead: { soundId: "softBump" },
  turtle: { soundId: "softBump" },
  dalek: { soundId: "metalHit", gain: 0.1 }, // <- these collide a lot so tone it down
  homingBot: { soundId: "metalHit", gain: 0.2 },
  computerBot: { soundId: "metalHit", gain: 0.2 },
};
const turnaroundSounds: PerMonsterSounds = {
  cyberman: { soundId: "jetpackTurnaround", gain: 1.2 },
  dalek: { soundId: "mojoTurn", gain: 0.3 },
};
const ambientSounds: PerMonsterSounds = {
  cyberman: { soundId: "jetpackLoop", gain: 0.7 },
  emperorsGuardian: { soundId: "jetpackLoop" },
  dalek: { soundId: "mojoLoop", gain: 0.2 },
  bubbleRobot: { soundId: "bubbleRobotLoop" },
  helicopterBug: { soundId: "helicopter" },
  homingBot: { soundId: "lowHum", randomiseStartPoint: true },
};
const movingSounds: PerMonsterBracketedSoundOptions = {
  homingBot: {
    start: { soundId: "detect" },
    loop: { soundId: "robotWhirLoop", gain: 4 },
    startAndLoopTogether: true,
  },
  computerBot: {
    loop: {
      soundId: "robotBeepingLoop",
      randomiseStartPoint: true,
      varyPlaybackRate: true,
    },
  },
};

export class MonsterSoundRenderer implements ItemSoundRenderer<"monster"> {
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #spotChannel: GainNode = audioCtx.createGain();
  #ambientChannel: GainNode = audioCtx.createGain();

  #turnaroundBracketed: BracketedSound<DirectionXy8 | undefined> | undefined;
  #ambientBracketed: BracketedSound<boolean> | undefined;
  #freeItemSoundRenderer: FreeItemSoundRenderer;
  #movingBracketed: BracketedSound<boolean> | undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<"monster">,
  ) {
    this.#spotChannel.connect(this.output);
    this.#ambientChannel.connect(this.output);
    this.#ambientChannel.gain.value = 0.66;

    const {
      item: {
        config: { which },
      },
    } = renderContext;

    const collisionSound = collisionSounds[which];
    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(
      renderContext,
      collisionSound ? { collision: collisionSound } : undefined,
    );
    this.#freeItemSoundRenderer.output.connect(this.output);

    if (turnaroundSounds[which] !== undefined) {
      this.#turnaroundBracketed = createBracketedSound(
        {
          change: turnaroundSounds[which],
        },
        this.#spotChannel,
      );
    }
    if (movingSounds[which] !== undefined) {
      this.#movingBracketed = createBracketedSound(
        movingSounds[which],
        this.#spotChannel,
      );
    }
    if (ambientSounds[which] !== undefined) {
      this.#ambientBracketed = createBracketedSound(
        {
          loop: ambientSounds[which],
        },
        this.#ambientChannel,
      );
    }
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: { item },
    } = this;
    const {
      state: {
        facing,
        activated,
        busyLickingDoughnutsOffFace,
        vels: { walking },
      },
    } = item;

    if (this.#turnaroundBracketed) {
      const facingXy8 = vectorClosestDirectionXy8(facing);
      this.#turnaroundBracketed(facingXy8);
    }

    if (this.#ambientBracketed) {
      const online = activated && !busyLickingDoughnutsOffFace;
      this.#ambientBracketed(online);
    }

    const isWalking = !xyzEqual(walking, originXyz);
    if (this.#movingBracketed) {
      this.#movingBracketed(isWalking);
    }

    this.#freeItemSoundRenderer.tick(tickContext, isWalking);
  }

  destroy(): void {
    // turn sounds off gracefully to avoid a click:
    this.#ambientBracketed?.(false);
    this.#movingBracketed?.(false);
    this.#freeItemSoundRenderer.destroy();
  }
}
