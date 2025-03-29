import type { CharacterName } from "../../model/modelTypes";
import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { selectHeelsAbilities } from "../../game/gameState/gameStateSelectors/selectPlayableItem";
import {
  createBracketedSound,
  type BracketedSound,
} from "../soundUtils/createBracketedSound";

export class PlayableSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<CharacterName, RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #walkChannel: GainNode = audioCtx.createGain();
  #walkBracketedSound: BracketedSound;
  #jumpChannel: GainNode = audioCtx.createGain();
  #jumpBracketedSound: BracketedSound;
  #fallBracketedSound: BracketedSound;

  #carryChannel: GainNode = audioCtx.createGain();
  #carryBracketedSound = createBracketedSound({
    start: {
      soundId: "carry",
      playbackRate: 0.95,
    },
    stop: {
      soundId: "carry",
      playbackRate: 1.05,
    },
    connectTo: this.#carryChannel,
  });

  #currentRenderProps: {
    teleportingPhase: "in" | "out" | null;
    positionZ: number;
  } = {
    teleportingPhase: null,
    positionZ: 0,
  };

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      CharacterName,
      RoomId,
      RoomItemId
    >,
  ) {
    this.#walkChannel.gain.value = 2;
    this.#walkChannel.connect(this.output);
    this.#jumpChannel.gain.value = 0.8;
    this.#jumpChannel.connect(this.output);
    this.#carryChannel.gain.value = 1.2;
    this.#carryChannel.connect(this.output);

    const name = renderContext.item.type;
    this.#walkBracketedSound = createBracketedSound({
      loop: {
        soundId: `${name === "headOverHeels" ? "heels" : renderContext.item.type}Walk`,
      },
      connectTo: this.#walkChannel,
    });

    this.#jumpBracketedSound = createBracketedSound({
      start: {
        soundId: `${name === "headOverHeels" ? "head" : renderContext.item.type}Jump`,
      },
      connectTo: this.#jumpChannel,
    });

    this.#fallBracketedSound = createBracketedSound({
      loop: {
        soundId: `${name === "headOverHeels" ? "head" : renderContext.item.type}Fall`,
      },
      connectTo: this.#jumpChannel,
    });
  }

  tick() {
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
    this.#walkBracketedSound(
      !playJumpSound && !playFallSound && action === "moving",
    );

    // carrying (heels)
    if (heelsAbilities !== undefined) {
      this.#carryBracketedSound(heelsAbilities.carrying !== null);
    }

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
