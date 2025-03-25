import type { CharacterName } from "../../model/modelTypes";
import { loadedSounds } from "../soundsLoader";
import { audioCtx } from "../audioCtx";
import type { ItemSoundRenderer } from "../ItemSoundRenderer";
import type { ItemSoundRenderContext } from "../ItemSoundRenderContext";
import type { PlayableActionState } from "../../model/ItemStateMap";
import { selectHeelsAbilities } from "../../game/gameState/gameStateSelectors/selectPlayableItem";

export class PlayableSoundRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<CharacterName, RoomId, RoomItemId>
{
  public readonly output: GainNode = audioCtx.createGain();

  // add the walking buffer sources to here to play them
  #walkingChannel: GainNode = audioCtx.createGain();
  #walkingLoop: AudioBufferSourceNode | null = null;

  #carryingChannel: GainNode = audioCtx.createGain();

  #currentRenderProps: {
    action: PlayableActionState;
    carrying: boolean;
    teleportingPhase: "in" | "out" | null;
  } = {
    action: "idle",
    carrying: false,
    teleportingPhase: null,
  };

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      CharacterName,
      RoomId,
      RoomItemId
    >,
  ) {
    this.#walkingChannel.gain.value = 2;
    this.#walkingChannel.connect(this.output);
    this.#carryingChannel.gain.value = 1.2;
    this.#carryingChannel.connect(this.output);
  }

  tick() {
    const {
      renderContext: { item },
    } = this;
    const {
      type,
      state: { action, teleporting },
    } = item;
    const carrying: boolean = !!selectHeelsAbilities(item)?.carrying;
    const {
      action: currentAction,
      carrying: currentCarrying,
      teleportingPhase: currentTeleportingPhase,
    } = this.#currentRenderProps;

    const teleportingPhase = teleporting ? teleporting.phase : null;

    // walking
    if (action === "moving" && currentAction !== "moving") {
      // start walking sound

      const walkingSound =
        loadedSounds()[
          type === "headOverHeels" ? "heelsWalk" : (`${type}Walk` as const)
        ];

      this.#walkingLoop = audioCtx.createBufferSource();
      this.#walkingLoop.buffer = walkingSound;
      this.#walkingLoop.loop = true;

      this.#walkingLoop.connect(this.#walkingChannel);
      this.#walkingLoop.start();
    }
    if (action !== "moving" && currentAction === "moving") {
      // stop the walking sound:
      this.#walkingLoop!.stop();
      this.#walkingLoop = null;
    }

    // carrying (heels)
    if (currentCarrying !== carrying) {
      if (currentCarrying) {
        const sound = loadedSounds().carry;
        const source = audioCtx.createBufferSource();
        source.buffer = sound;
        source.playbackRate.value = 0.95;
        source.connect(this.#carryingChannel);
        source.start();
      } else {
        const sound = loadedSounds().carry;
        const source = audioCtx.createBufferSource();
        source.buffer = sound;
        source.playbackRate.value = 1.05;
        source.connect(this.#carryingChannel);
        source.start();
      }
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

    this.#currentRenderProps = { action, carrying, teleportingPhase };
  }

  destroy(): void {}
}
