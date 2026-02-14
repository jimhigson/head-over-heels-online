import { isEmpty } from "iter-tools-es";

import type { FreeItemTypes } from "../../../game/physics/itemPredicates";
import type { ItemTickContext } from "../../../game/render/ItemRenderContexts";
import type { ItemSoundRenderContext } from "../../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../../ItemSoundRenderer";
import type { BracketedSegmentOptions } from "../../soundUtils/createBracketedSound";

import { keysIter } from "../../../utils/entries";
import { neverTime } from "../../../utils/neverTime";
import { audioCtx } from "../../audioCtx";
import {
  type BracketedSound,
  createBracketedSound,
} from "../../soundUtils/createBracketedSound";

export type FreeItemSoundRendererConstructorOptions = {
  fall?: BracketedSegmentOptions;
  /**
   * set to null to explicitly not have a standing on sound,
   * otherwise a default will be used */
  standingOn?: BracketedSegmentOptions | null;
  collision?: BracketedSegmentOptions;
  /**
   * set to null to explicitly not have a pushed sound, otherwise a default
   * will be used
   */
  pushed?: BracketedSegmentOptions | null;
};

const defaultFallSoundOptions: BracketedSegmentOptions = {
  soundId: "fall",
};
const defaultPushedSoundOptions: BracketedSegmentOptions = {
  soundId: "woodScrape",
  gain: 0.8,
  randomiseStartPoint: true,
  playbackRate: 0.8,
};
const defaultStandingOnSoundOptions: BracketedSegmentOptions = {
  soundId: "softBump",
};

const playSoundStandingOnCheck = (
  actedOnBy: Record<string, unknown>,
  standingOnItemId: string,
): boolean => {
  let hasAny = false;
  for (const k in actedOnBy) {
    if (k !== standingOnItemId) {
      // something is pushing us other than what we're standing on - play sound:
      return true;
    }
    hasAny = true;
  }
  // if is empty, we play the sound, otherwise we only found what we're stood on
  return !hasAny;
};

export class FreeItemSoundRenderer implements ItemSoundRenderer<FreeItemTypes> {
  public readonly output: GainNode = audioCtx.createGain();

  #fallBracketedSound: BracketedSound | undefined;
  #standingOnBracketedSound: BracketedSound | undefined;
  #collisionBracketedSound: BracketedSound | undefined;
  #pushedBracketedSound: BracketedSound | undefined;

  currentPositionZ: number = 0;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<FreeItemTypes>,
    options?: FreeItemSoundRendererConstructorOptions,
  ) {
    const fallChannel: GainNode = audioCtx.createGain();
    fallChannel.connect(this.output);
    this.#fallBracketedSound = createBracketedSound(
      { loop: options?.fall ?? defaultFallSoundOptions },
      fallChannel,
    );

    const standingOnChannel: GainNode = audioCtx.createGain();
    standingOnChannel.connect(this.output);
    this.#standingOnBracketedSound =
      options?.standingOn === null ?
        undefined
      : createBracketedSound(
          {
            start: options?.standingOn ?? defaultStandingOnSoundOptions,
            noStartOnFirstFrame: true,
          },
          standingOnChannel,
        );

    const collisionChannel: GainNode = audioCtx.createGain();
    collisionChannel.connect(this.output);
    this.#collisionBracketedSound =
      options?.collision &&
      createBracketedSound({ start: options.collision }, collisionChannel);

    const pushedChannel: GainNode = audioCtx.createGain();
    pushedChannel.connect(this.output);
    this.#pushedBracketedSound =
      options?.pushed === null ?
        undefined
      : createBracketedSound(
          { loop: options?.pushed ?? defaultPushedSoundOptions },
          pushedChannel,
        );
  }

  tick(
    { lastRenderRoomTime, movedItems }: ItemTickContext,
    /**
     * if given, the pushed sound will not play - this is because we can't distinguish between being
     * pushed and the item propelling itself, so if it is moving itself (and doing so makes a sound)
     * this should be set to true unless both sounds need to be played
     */
    noPushOnMove: boolean = false,
  ) {
    const {
      renderContext: {
        item,
        room: { roomTime },
      },
    } = this;
    const {
      state: {
        standingOnItemId,
        position: { z: positionZ },
        vels: {
          gravity: { z: velZ },
        },
        actedOnAt: { roomTime: roomTimeActedOn, actedInXY, by: actedOnBy },
        collidedWith: { roomTime: roomTimeCollidedWith, by: collidedWith },
      },
    } = item;

    if (this.#fallBracketedSound !== undefined) {
      const { currentPositionZ } = this;

      const playFallSound =
        positionZ < currentPositionZ && velZ < 0 && standingOnItemId === null;

      this.#fallBracketedSound(playFallSound);

      this.currentPositionZ = positionZ;
    }

    if (this.#standingOnBracketedSound !== undefined) {
      const landed =
        // standing on something:
        standingOnItemId !== null &&
        // the thing we are standing on - we collided with since the room last rendered:
        roomTimeCollidedWith > (lastRenderRoomTime ?? neverTime) &&
        collidedWith[standingOnItemId];

      this.#standingOnBracketedSound(landed);
    }

    if (this.#collisionBracketedSound !== undefined) {
      const collidedWithSomething =
        roomTimeCollidedWith > (lastRenderRoomTime ?? neverTime) &&
        !isEmpty(keysIter(collidedWith));

      this.#collisionBracketedSound(collidedWithSomething);
    }

    if (this.#pushedBracketedSound !== undefined) {
      const beingPushed =
        !noPushOnMove &&
        roomTime === roomTimeActedOn &&
        // being lifted vertically alone doesn't cause pushing sound - ie, being on a lift
        actedInXY &&
        // must be standing on something to scrape on the ground:
        standingOnItemId !== null &&
        // being acted on by the thing we are standing on (only) doesn't count:
        // restore this - but is causing issues for long-running pushed items!
        playSoundStandingOnCheck(actedOnBy, standingOnItemId) &&
        // must be moving(!)
        movedItems.has(item);

      // if (beingPushed) {
      //   console.log(
      //     item.id,
      //     "being pushed",
      //     item.state.action,
      //     item.state.actedOnAt,
      //     `standingOnItemId: ${standingOnItemId}`,
      //   );
      // }

      this.#pushedBracketedSound(beingPushed);
    }
  }

  destroy(): void {
    this.#fallBracketedSound?.(false);
    this.#pushedBracketedSound?.(false);
  }
}
