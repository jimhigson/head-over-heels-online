import type { ItemTickContext } from "../../game/render/ItemRenderContexts";
import type { CharacterName } from "../../model/modelTypes";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";

import { selectHeelsAbilities } from "../../game/gameState/gameStateSelectors/selectPlayableItem";
import { defaultUserSettings } from "../../store/slices/gameMenus/defaultUserSettings";
import { neverTime } from "../../utils/neverTime";
import { audioCtx } from "../audioCtx";
import { loadedSounds } from "../soundsLoader";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";

const walkGain = 0.8;
const carryGain = 1.2;
const jumpGain = 0.8;

export class PlayableSoundRenderer implements ItemSoundRenderer<CharacterName> {
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #walkChannel?: GainNode;
  #walkBracketedSound?: BracketedSound;
  #jumpChannel: GainNode = audioCtx.createGain();
  #jumpBracketedSound: BracketedSound;
  #fallBracketedSound: BracketedSound;
  // todo: this could be a generic freeitem sound renderer
  #standingOnChannel: GainNode = audioCtx.createGain();
  #standingOnBracketedSound: BracketedSound = createBracketedSound(
    {
      start: { soundId: "landing" },
      noStartOnFirstFrame: true,
    },
    this.#standingOnChannel,
  );

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

  #currentRenderProps: {
    teleportingPhase: "in" | "out" | null;
    positionZ: number;
  } = {
    teleportingPhase: null,
    positionZ: 0,
  };

  constructor(
    public readonly renderContext: ItemSoundRenderContext<CharacterName>,
  ) {
    const {
      general: { soundSettings },
      item: { type: name },
    } = renderContext;

    const { noFootsteps } = {
      ...defaultUserSettings.soundSettings,
      ...soundSettings,
    };

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
    this.#standingOnChannel.connect(this.output);

    this.#jumpBracketedSound = createBracketedSound(
      {
        start: {
          soundId: `${name === "headOverHeels" ? "head" : name}Jump`,
        },
      },
      this.#jumpChannel,
    );

    this.#fallBracketedSound = createBracketedSound(
      {
        loop: {
          soundId: `${name === "headOverHeels" ? "head" : name}Fall`,
        },
      },
      this.#jumpChannel,
    );
  }

  tick({ lastRenderRoomTime }: ItemTickContext) {
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
        collidedWith: {
          roomTime: roomTimeOfLastCollision,
          by: collidedWithItemIds,
        },
      },
    } = item;
    const heelsAbilities = selectHeelsAbilities(item);
    const {
      teleportingPhase: currentTeleportingPhase,
      positionZ: currentPositionZ,
    } = this.#currentRenderProps;

    const teleportingPhase = teleporting ? teleporting.phase : null;

    const playJumpSound =
      jumped &&
      positionZ > jumpStartZ &&
      positionZ > currentPositionZ &&
      velZ > 0;

    const playFallSound =
      positionZ < currentPositionZ && velZ < 0 && standingOnItemId === null;

    this.#fallBracketedSound(playFallSound);

    this.#jumpBracketedSound(playJumpSound);

    // walking
    if (this.#walkBracketedSound !== undefined) {
      this.#walkBracketedSound(
        !playJumpSound && !playFallSound && action === "moving",
      );
    }

    // carrying (heels)
    if (heelsAbilities !== undefined) {
      this.#carryBracketedSound(heelsAbilities.carrying !== null);
    }

    const landed =
      // staning on something:
      standingOnItemId !== null &&
      // the thing we are standing on - we collided with since the room last rendered:
      roomTimeOfLastCollision > (lastRenderRoomTime ?? neverTime) &&
      collidedWithItemIds[standingOnItemId];

    this.#standingOnBracketedSound(landed);

    if (
      teleportingPhase !== null &&
      teleportingPhase !== currentTeleportingPhase
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

    this.#currentRenderProps = { teleportingPhase, positionZ };
  }

  destroy(): void {}
}
