import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { type MonsterWhich } from "../../model/json/MonsterJsonConfig";
import {
  type DirectionIndexXy8,
  nonZeroClosestDirectionIndexXy8,
  originXyz,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import {
  type BracketedSegmentOptions,
  BracketedSound,
  type BracketedSoundOptions,
} from "../soundUtils/BracketedSound";
import { activationBracketedSoundOptions } from "./generic/activationBracketedSoundOptions";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

type PerMonsterSounds = {
  [M in MonsterWhich]?: BracketedSegmentOptions;
};
type PerMonsterBracketedSoundOptions = {
  [M in MonsterWhich]?: BracketedSoundOptions;
};

const collisionSounds: PerMonsterSounds = {
  skiHead: { soundId: "softBump" },
  turtle: { soundId: "softBump" },
  dalek: { soundId: "metalClang", gain: 0.1 }, // <- these collide a lot so tone it down
  homingBot: { soundId: "metalClang", gain: 0.2 },
  computerBot: { soundId: "metalClang", gain: 0.2 },
};
const turnaroundSounds: PerMonsterSounds = {
  cyberman: { soundId: "jetpackTurnaround", gain: 1.2 },
  dalek: { soundId: "mojoTurn", gain: 0.3 },
  monkey: { soundId: "monkeyTurn" },
  elephant: { soundId: "elephantHoot" },
};
const ambientSounds: PerMonsterSounds = {
  cyberman: { soundId: "jetpackLoop", gain: 0.7 },
  emperorsGuardian: { soundId: "jetpackLoop" },
  dalek: { soundId: "mojoLoop", gain: 1 },
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
      soundId: "glitchRobot",
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

  #turnaroundBracketed: BracketedSound<DirectionIndexXy8> | undefined;
  #ambientBracketed: BracketedSound<boolean> | undefined;
  #freeItemSoundRenderer: FreeItemSoundRenderer;
  #movingBracketed: BracketedSound<boolean> | undefined;
  #activatedBracketed: BracketedSound;

  readonly renderContext: ItemSoundRenderContext<"monster">;

  constructor(renderContext: ItemSoundRenderContext<"monster">) {
    this.renderContext = renderContext;
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
      this.#turnaroundBracketed = new BracketedSound(
        {
          change: turnaroundSounds[which],
        },
        this.#spotChannel,
      );
    }
    if (movingSounds[which] !== undefined) {
      this.#movingBracketed = new BracketedSound(
        movingSounds[which],
        this.#spotChannel,
      );
    }
    if (ambientSounds[which] !== undefined) {
      this.#ambientBracketed = new BracketedSound(
        {
          loop: ambientSounds[which],
        },
        this.#ambientChannel,
      );
    }

    this.#activatedBracketed = new BracketedSound(
      activationBracketedSoundOptions,
      this.#spotChannel,
    );
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
      const facingIndexXy8 = nonZeroClosestDirectionIndexXy8(
        facing.x,
        facing.y,
      );
      this.#turnaroundBracketed.tick(facingIndexXy8);
    }

    if (this.#ambientBracketed) {
      const online = activated && !busyLickingDoughnutsOffFace;
      this.#ambientBracketed.tick(online);
    }

    this.#activatedBracketed.tick(activated);

    const isWalking = !xyzEqual(walking, originXyz);
    if (this.#movingBracketed) {
      this.#movingBracketed.tick(isWalking);
    }

    this.#freeItemSoundRenderer.tick(tickContext, isWalking);
  }

  destroy(): void {
    this.#turnaroundBracketed?.destroy();
    this.#ambientBracketed?.destroy();
    this.#movingBracketed?.destroy();
    this.#activatedBracketed.destroy();
    this.#freeItemSoundRenderer.destroy();
  }
}
