import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import {
  originXyz,
  vectorClosestDirectionXy8,
  xyzEqual,
  type DirectionXy8,
} from "../../utils/vectors/vectors";
import type { MonsterWhich } from "../../model/json/MonsterJsonConfig";
import type {
  BracketedSound,
  CreateBracketedEventOptions,
} from "../soundUtils/createBracketedSound";
import {
  createBracketedSound,
  type BracketedSegmentOptions,
} from "../soundUtils/createBracketedSound";
import { keysIter } from "../../utils/entries";
import { isEmpty } from "iter-tools";

type PerMonsterSounds = {
  [M in MonsterWhich]?: BracketedSegmentOptions;
};
type PerMonsterBracketedSoundOptions = {
  [M in MonsterWhich]?: CreateBracketedEventOptions;
};

const collisionSounds: PerMonsterSounds = {
  skiHead: { soundId: "softBump" },
  turtle: { soundId: "softBump" },
  dalek: { soundId: "metalHit" },
  homingBot: { soundId: "metalHit" },
  computerBot: { soundId: "metalHit" },
};
const turnaroundSounds: PerMonsterSounds = {
  cyberman: { soundId: "jetpackTurnaround", gain: 1.2 },
  dalek: { soundId: "mojoTurn", gain: 0.3 },
};
const ambientSounds: PerMonsterSounds = {
  cyberman: { soundId: "jetpackLoop", gain: 0.7 },
  emperorsGuardian: { soundId: "jetpackLoop" },
  dalek: { soundId: "mojoLoop" },
  bubbleRobot: { soundId: "bubbleRobotLoop" },
  helicopterBug: { soundId: "helicopter" },
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

export class MonsterSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<"monster", RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #spotChannel: GainNode = audioCtx.createGain();
  #ambientChannel: GainNode = audioCtx.createGain();

  #turnaroundBracketed: BracketedSound<DirectionXy8 | undefined> | undefined;
  #ambientBracketed: BracketedSound<boolean> | undefined;
  #collisionBracketed: BracketedSound<boolean> | undefined;
  #movingBracketed: BracketedSound<boolean> | undefined;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      "monster",
      RoomId,
      RoomItemId
    >,
  ) {
    this.#spotChannel.connect(this.output);
    this.#ambientChannel.connect(this.output);
    this.#ambientChannel.gain.value = 0.66;

    const {
      item: {
        config: { which },
      },
    } = renderContext;

    if (collisionSounds[which] !== undefined) {
      this.#collisionBracketed = createBracketedSound(
        {
          start: collisionSounds[which],
        },
        this.#spotChannel,
      );
    }
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

  tick() {
    const {
      renderContext: {
        item,
        room: { roomTime },
      },
    } = this;
    const {
      state: {
        facing,
        activated,
        busyLickingDoughnutsOffFace,
        collidedWith: { roomTime: roomTimeCollidedWith, by: collidedWith },
        vels: { walking },
      },
    } = item;

    if (this.#turnaroundBracketed) {
      const facingXy8 = vectorClosestDirectionXy8(facing);
      this.#turnaroundBracketed(facingXy8);
    }

    if (this.#collisionBracketed) {
      const hitSomething =
        roomTime === roomTimeCollidedWith && !isEmpty(keysIter(collidedWith));
      this.#collisionBracketed(hitSomething);
    }

    if (this.#ambientBracketed) {
      const online = activated && !busyLickingDoughnutsOffFace;
      this.#ambientBracketed(online);
    }

    if (this.#movingBracketed) {
      const moving = !xyzEqual(walking, originXyz);
      this.#movingBracketed(moving);
    }
  }

  destroy(): void {}
}
