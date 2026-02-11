import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { CharacterName } from "../../model/modelTypes";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { selectHeelsAbilities } from "../../game/gameState/gameStateSelectors/selectPlayableItem";
import { defaultUserSettings } from "../../store/slices/gameMenus/defaultUserSettings";
import { audioCtx } from "../audioCtx";
import { loadedSounds } from "../soundsLoader";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

const walkGain = 0.8;
const carryGain = 1.2;
const jumpGain = 0.8;

export class PlayableSoundRenderer implements ItemSoundRenderer<CharacterName> {
  public readonly output: GainNode = audioCtx.createGain();

  #walkChannel?: GainNode;
  #walkBracketedSound?: BracketedSound;
  #jumpChannel: GainNode = audioCtx.createGain();
  #jumpBracketedSound: BracketedSound;

  #carryChannel: GainNode = audioCtx.createGain();
  #carryBracketedSound = createBracketedSound(
    {
      start: {
        soundId: "carry",
        playbackRate: 0.95,
      },
      stop: {
        soundId: "carry",
        playbackRate: 1.05,
      },
    },
    this.#carryChannel,
  );

  #freeItemSoundRenderer: FreeItemSoundRenderer;

  #currentTeleportingPhase: "in" | "out" | null = null;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<CharacterName>,
  ) {
    const {
      general: { soundSettings },
      item: { type: name },
    } = renderContext;

    const noFootsteps =
      soundSettings.noFootsteps ??
      defaultUserSettings.soundSettings.noFootsteps;

    if (!noFootsteps) {
      this.#walkChannel = audioCtx.createGain();
      this.#walkChannel.gain.value = walkGain;
      this.#walkChannel.connect(this.output);
      this.#walkBracketedSound = createBracketedSound(
        {
          loop: {
            soundId: `${name === "headOverHeels" ? "heels" : name}Walk`,
          },
        },
        this.#walkChannel,
      );
    }

    this.#jumpChannel.gain.value = jumpGain;
    this.#jumpChannel.connect(this.output);
    this.#carryChannel.gain.value = carryGain;
    this.#carryChannel.connect(this.output);

    this.#jumpBracketedSound = createBracketedSound(
      {
        start: {
          soundId: `${name === "headOverHeels" ? "head" : name}Jump`,
        },
      },
      this.#jumpChannel,
    );

    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      fall:
        name === "headOverHeels" || name === "head" ?
          { soundId: "headFall" }
        : undefined,
      standingOn: { soundId: "softBump" },
      collision: { soundId: "softBump", gain: 0.5 },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: { item },
    } = this;
    const {
      state: {
        action,
        teleporting,
        jumpStartZ,
        jumped,
        standingOnItemId,
        position: { z: positionZ },
        vels: {
          gravity: { z: velZ },
        },
      },
    } = item;
    const heelsAbilities = selectHeelsAbilities(item);

    const teleportingPhase = teleporting ? teleporting.phase : null;

    const playJumpSound =
      jumped &&
      positionZ > jumpStartZ &&
      positionZ > this.#freeItemSoundRenderer.currentPositionZ &&
      velZ > 0;

    this.#jumpBracketedSound(playJumpSound);

    const playFallSound =
      positionZ < this.#freeItemSoundRenderer.currentPositionZ &&
      velZ < 0 &&
      standingOnItemId === null;

    const playWalkSound =
      !playJumpSound && !playFallSound && action === "moving";

    // walking
    if (this.#walkBracketedSound !== undefined) {
      this.#walkBracketedSound(playWalkSound);
    }

    // carrying (heels)
    if (heelsAbilities !== undefined) {
      this.#carryBracketedSound(heelsAbilities.carrying !== null);
    }

    if (
      teleportingPhase !== null &&
      teleportingPhase !== this.#currentTeleportingPhase
    ) {
      if (teleportingPhase === "in") {
        const sound = loadedSounds().teleportIn;
        const source = audioCtx.createBufferSource();
        source.buffer = sound;
        source.connect(this.output);
        source.start();
      } else {
        const sound = loadedSounds().teleportOut;
        const source = audioCtx.createBufferSource();
        source.buffer = sound;
        source.connect(this.output);
        source.start();
      }
    }

    this.#currentTeleportingPhase = teleportingPhase;

    this.#freeItemSoundRenderer.tick(
      tickContext,
      // don't scrape if either walking or falling:
      playWalkSound || action === "falling",
    );
  }

  destroy(): void {
    this.#walkBracketedSound?.(false);
    this.#jumpBracketedSound(false);
    this.#carryBracketedSound(false);
    this.#freeItemSoundRenderer.destroy();
  }
}
