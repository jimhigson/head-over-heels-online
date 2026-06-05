import { selectHeelsAbilities } from "../../game/gameState/gameStateSelectors/selectPlayableItem";
import { isHighlightedPlayableItem } from "../../game/render/itemAppearances/playableAppearance";
import { type ItemTickContext } from "../../game/render/ItemRenderContexts";
import { type CharacterName } from "../../model/modelTypes";
import { defaultUserSettings } from "../../store/slices/userSettings/defaultUserSettings";
import { epsilon } from "../../utils/epsilon";
import { lengthXy } from "../../utils/vectors/vectors";
import { audioCtx } from "../audioCtx";
import { type ItemSoundRenderContext } from "../ItemSoundRenderContext";
import { type ItemSoundRenderer } from "../ItemSoundRenderer";
import { loadedSounds } from "../soundsLoader";
import {
  type BracketedSound,
  createBracketedSound,
} from "../soundUtils/createBracketedSound";
import { FreeItemSoundRenderer } from "./generic/FreeItemSoundRenderer";

const walkGain = 0.1;
const fallGain = 0.3;
const carryGain = 1.2;
const jumpGain = 0.3;

export class PlayableSoundRenderer implements ItemSoundRenderer<CharacterName> {
  public readonly output: GainNode = audioCtx.createGain();

  #walkChannel?: GainNode;
  #walkBracketedSound?: BracketedSound;
  #jumpChannel: GainNode = audioCtx.createGain();
  #jumpBracketedSound: BracketedSound;
  #deathBracketedSound: BracketedSound;

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

  #highlightedCharacterBracketedSound: BracketedSound;

  #currentTeleportingPhase: "in" | "out" | null = null;

  readonly renderContext: ItemSoundRenderContext<CharacterName>;

  constructor(renderContext: ItemSoundRenderContext<CharacterName>) {
    this.renderContext = renderContext;
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
          loopAlwaysFadesIn: true,
        },
        this.#walkChannel,
      );
    }

    this.#highlightedCharacterBracketedSound = createBracketedSound(
      {
        start: {
          soundId: `${name}Accent`,
          gain: 0.3,
        },
        noStartOnFirstFrame: false,
      },
      this.output,
    );

    this.#jumpChannel.gain.value = jumpGain;
    this.#jumpChannel.connect(this.output);
    this.#carryChannel.gain.value = carryGain;
    this.#carryChannel.connect(this.output);

    this.#jumpBracketedSound = createBracketedSound(
      {
        start: {
          soundId: `${name === "headOverHeels" ? "head" : name}JumpStart`,
        },
        loop: {
          soundId: `${name === "headOverHeels" ? "head" : name}Jumping`,
        },
        startAndLoopTogether: true,
        loopAlwaysFadesIn: true,
      },
      this.#jumpChannel,
    );

    this.#deathBracketedSound = createBracketedSound(
      { start: { soundId: "uhOh" } },
      this.output,
    );

    this.#freeItemSoundRenderer = new FreeItemSoundRenderer(renderContext, {
      fall:
        name === "headOverHeels" || name === "head" ?
          { soundId: "glide", gain: fallGain }
        : undefined,
      standingOn: { soundId: "softBump" },
      collision: { soundId: "softBump", gain: 0.5 },
    });
    this.#freeItemSoundRenderer.output.connect(this.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item,
        general: { gameState },
      },
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
          walking,
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
    this.#deathBracketedSound(action === "death");

    const playFallSound =
      positionZ < this.#freeItemSoundRenderer.currentPositionZ &&
      velZ < 0 &&
      standingOnItemId === null;

    const playWalkSound =
      !playJumpSound &&
      !playFallSound &&
      action !== "death" &&
      lengthXy(walking) > epsilon;

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

    this.#highlightedCharacterBracketedSound(
      isHighlightedPlayableItem(gameState, item),
    );
  }

  destroy(): void {
    this.#walkBracketedSound?.(false);
    this.#jumpBracketedSound(false);
    this.#carryBracketedSound(false);
    this.#highlightedCharacterBracketedSound(false);
    this.#freeItemSoundRenderer.destroy();
  }
}
