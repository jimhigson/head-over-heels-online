import {
  itemMovedSinceRendered,
  type ItemTickContext,
} from "../../../game/render/ItemRenderContexts";
import type { FreeItemTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { isEmptyObject } from "../../../utils/empty";
import { audioCtx } from "../../audioCtx";
import type { ItemSoundRenderContext } from "../../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../../ItemSoundRenderer";
import {
  type BracketedSegmentOptions,
  BracketedSound,
} from "../../soundUtils/BracketedSound";

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
  gain: 0.3,
};
const defaultPushedSoundOptions: BracketedSegmentOptions = {
  soundId: "scrape",
  gain: 0.8,
  randomiseStartPoint: true,
  playbackRate: 0.8,
};
const defaultStandingOnSoundOptions: BracketedSegmentOptions = {
  soundId: "softBump",
};

const playSoundStandingOnCheck = (
  actedOnBy: Record<string, true>,
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
  // if is empty, we play the sound,
  // otherwise we only found what we're stood on, which never gets the pushing sound:
  return !hasAny;
};

export class FreeItemSoundRenderer implements ItemSoundRenderer<FreeItemTypes> {
  public readonly output: GainNode = audioCtx.createGain();

  #fallBracketedSound: BracketedSound | undefined;
  #standingOnBracketedSound: BracketedSound | undefined;
  /**
   * plays for each bump - its value is the number of the bump being heard
   */
  #collisionBracketedSound: BracketedSound<number | undefined> | undefined;
  #pushedBracketedSound: BracketedSound | undefined;

  /**
   * counts the separate bumps. A collision on the tick straight after another
   * is part of the same bump, unless it is with something new - so a ball
   * knocked into a wall is two bumps, but one caught again by what knocked it
   * is one
   */
  #bumpNumber = 0;
  /**
   * the items collided with as of the last tick - empty if there was no
   * collision then
   */
  readonly #collidedWithOnLastTick = new Set<string>();

  currentPositionZ: number = 0;

  /**
   * the collidedWith.roomTime stamp as of the last tick - a change means a
   * collision happened since then. Initialised from the item's current state
   * so a stale stamp (eg from a loaded save) doesn't sound on the first tick
   */
  #seenCollidedWithRoomTime: number;

  readonly renderContext: ItemSoundRenderContext<FreeItemTypes>;

  constructor(
    renderContext: ItemSoundRenderContext<FreeItemTypes>,
    options?: FreeItemSoundRendererConstructorOptions,
  ) {
    this.renderContext = renderContext;
    this.#seenCollidedWithRoomTime =
      renderContext.item.state.collidedWith.roomTime;
    const fallChannel: GainNode = audioCtx.createGain();
    fallChannel.connect(this.output);
    this.#fallBracketedSound = new BracketedSound(
      { loop: options?.fall ?? defaultFallSoundOptions },
      fallChannel,
    );

    const standingOnChannel: GainNode = audioCtx.createGain();
    standingOnChannel.connect(this.output);
    this.#standingOnBracketedSound =
      options?.standingOn === null ?
        undefined
      : new BracketedSound(
          { start: options?.standingOn ?? defaultStandingOnSoundOptions },
          standingOnChannel,
        );

    const collisionChannel: GainNode = audioCtx.createGain();
    collisionChannel.connect(this.output);
    this.#collisionBracketedSound =
      options?.collision &&
      new BracketedSound<number | undefined>(
        // a new bump straight after another changes the value, so plays too:
        { start: options.collision, change: options.collision },
        collisionChannel,
      );

    const pushedChannel: GainNode = audioCtx.createGain();
    pushedChannel.connect(this.output);
    this.#pushedBracketedSound =
      options?.pushed === null ?
        undefined
      : new BracketedSound(
          { loop: options?.pushed ?? defaultPushedSoundOptions },
          pushedChannel,
        );
  }

  tick(
    tickContext: ItemTickContext,
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
        box: { z: positionZ },
        vels: {
          gravity: { z: velZ },
        },
        actedOnAt: { roomTime: roomTimeActedOn, actedInXY, by: actedOnBy },
        collidedWith: { roomTime: itemRoomTimeCollidedWith, by: collidedWith },
      },
    } = item;

    if (this.#fallBracketedSound !== undefined) {
      const { currentPositionZ } = this;

      const playFallSound =
        positionZ < currentPositionZ && velZ < 0 && standingOnItemId === null;

      this.#fallBracketedSound.tick(playFallSound);

      this.currentPositionZ = positionZ;
    }

    const collidedSinceLastTick =
      itemRoomTimeCollidedWith !== this.#seenCollidedWithRoomTime;
    this.#seenCollidedWithRoomTime = itemRoomTimeCollidedWith;

    if (this.#standingOnBracketedSound !== undefined) {
      const landed =
        // standing on something:
        standingOnItemId !== null &&
        // the thing we are standing on - we collided with since we last ticked:
        collidedSinceLastTick &&
        collidedWith[standingOnItemId];

      this.#standingOnBracketedSound.tick(landed);
    }

    if (this.#collisionBracketedSound !== undefined) {
      const collidedWithSomething =
        collidedSinceLastTick && !isEmptyObject(collidedWith);

      let collidedWithSomethingNew = false;
      if (collidedWithSomething) {
        for (const collidedWithItemId in collidedWith) {
          if (!this.#collidedWithOnLastTick.has(collidedWithItemId)) {
            collidedWithSomethingNew = true;
          }
        }
      }
      if (collidedWithSomethingNew) {
        this.#bumpNumber++;
      }

      this.#collidedWithOnLastTick.clear();
      if (collidedWithSomething) {
        for (const collidedWithItemId in collidedWith) {
          this.#collidedWithOnLastTick.add(collidedWithItemId);
        }
      }

      this.#collisionBracketedSound.tick(
        collidedWithSomething ? this.#bumpNumber : undefined,
      );
    }

    if (this.#pushedBracketedSound !== undefined) {
      const beingPushed =
        !noPushOnMove &&
        roomTime === roomTimeActedOn &&
        // being lifted vertically alone doesn't cause pushing sound - ie, being on a lift
        actedInXY &&
        // must be standing on something to scrape on the ground:
        standingOnItemId !== null &&
        playSoundStandingOnCheck(actedOnBy, standingOnItemId) &&
        // must be moving(!)
        itemMovedSinceRendered(item, tickContext);

      this.#pushedBracketedSound.tick(beingPushed);
    }
  }

  destroy(): void {
    this.#fallBracketedSound?.destroy();
    this.#standingOnBracketedSound?.destroy();
    this.#collisionBracketedSound?.destroy();
    this.#pushedBracketedSound?.destroy();
  }
}
