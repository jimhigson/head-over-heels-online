import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Container, Sprite, Ticker } from "pixi.js";
import { getColorScheme } from "../../hintColours";
import type {
  HeadAbilities,
  HeelsAbilities,
} from "../../../model/ItemStateMap";
import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import { individualCharacterNames } from "../../../model/modelTypes";
import { loadedSpriteSheet } from "../../../sprites/spriteSheet";
import type { TextureId } from "../../../sprites/spriteSheetData";
import {
  hudCharTextureSize,
  smallItemTextureSize,
} from "../../../sprites/textureSizes";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import {
  shieldRemainingForAbilities,
  fastStepsRemaining,
} from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { selectAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { halfBriteFilter, noFilters } from "../filters/standardFilters";
import { store } from "../../../store/store";
import { selectShowFps } from "../../../store/selectors";
import { OnScreenControls } from "./OnScreenControls";
import { showNumberInContainer } from "./showNumberInContainer";
import {
  hudFpsColourFilter,
  hudIconFilter,
  hudHighligtedFilter,
  hudLivesTextFilter,
  hudOutlinedTextFilters,
  hudOutlineFilter,
  hudTextFilter,
  hudLowlightedFilter,
} from "./hudFilters";
import { createCarriedSprite } from "./createCarriedSprite";
import type { InputDirectionMode } from "../../../store/slices/gameMenusSlice";
import type { Renderer } from "../Renderer";
import type { RoomState } from "../../../model/RoomState";
import { neverTime } from "../../../utils/veryClose";

const fpsUpdatePeriod = 250;

const livesTextFromCentre = (onScreenControls: boolean) =>
  onScreenControls ? 48 : 24;
const playableIconFromCentre = (onScreenControls: boolean) =>
  onScreenControls ? 68 : 56;

const smallIconsFromCentre = (onScreenControls: boolean, screenSize: Xy) =>
  onScreenControls ?
    // need to come in enough to clear a 'notch':
    screenSize.x / 2 - 24
  : 80;
const extraSkillFromBottom = (onScreenControls: boolean) =>
  onScreenControls ? 72 : 24;
const shieldFromBottom = (onScreenControls: boolean) =>
  onScreenControls ? 88 : 0;

// bag/hooter/doughnuts etc - how far to render the icon from the screen centre::
const playersIconsFromCentre = 112;

const sideMultiplier = (character: CharacterName) => {
  return character === "heels" ? 1 : -1;
};

export type HudRenderContext<RoomId extends string> = {
  gameState: GameState<RoomId>;
  colourise: boolean;
  onScreenControls: boolean;
  inputDirectionMode: InputDirectionMode;
};
export type HudRendererTickContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  screenSize: Xy;
  /** can be undefined when game over */
  room: RoomState<RoomId, RoomItemId> | undefined;
};

export class HudRenderer<RoomId extends string, RoomItemId extends string>
  implements
    Renderer<
      HudRenderContext<RoomId>,
      HudRendererTickContext<RoomId, RoomItemId>,
      Container
    >
{
  #container = new Container({ label: "HudRenderer" });

  #onScreenControls: OnScreenControls<RoomId, RoomItemId> | undefined =
    undefined;

  #hudElements = {
    head: {
      sprite: this.#characterSprite("head"),
      livesText: this.#makeText({
        label: "headLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: this.#iconWithNumber({
        label: "headShield",
        textureId: "hud.shield",
        outline: true,
      }),
      extraSkill: this.#iconWithNumber({
        label: "headFastSteps",
        textureId: "hud.fastSteps",
        outline: true,
      }),
      doughnuts: this.#iconWithNumber({
        label: "headDoughnuts",
        textureId: "doughnuts",
        textOnTop: true,
        outline: "text-only",
      }),
      hooter: this.#iconWithNumber({
        label: "headHooter",
        textureId: "hooter",
        textOnTop: true,
        noText: true,
      }),
    },
    heels: {
      sprite: this.#characterSprite("heels"),
      livesText: this.#makeText({
        label: "heelsLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: this.#iconWithNumber({
        label: "heelsShield",
        textureId: "hud.shield",
        outline: true,
      }),
      extraSkill: this.#iconWithNumber({
        label: "heelsBigJumps",
        textureId: "hud.bigJumps",
        outline: true,
      }),
      bag: this.#iconWithNumber({
        label: "heelsBag",
        textureId: "bag",
        textOnTop: true,
        noText: true,
      }),
      carrying: {
        container: new Container({ label: "heelsCarrying" }),
      },
    },
    fps: this.#makeText({ label: "fps", outline: true }),
  };

  constructor(public readonly renderContext: HudRenderContext<RoomId>) {
    const { onScreenControls } = renderContext;

    for (const character of individualCharacterNames) {
      this.#container.addChild(this.#hudElements[character].sprite);
      // lives after sprite since it can overlap it with on-screen controls
      this.#container.addChild(this.#hudElements[character].livesText);
      this.#container.addChild(this.#hudElements[character].shield.container);
      this.#container.addChild(
        this.#hudElements[character].extraSkill.container,
      );
    }
    if (!onScreenControls) {
      this.#container.addChild(this.#hudElements.head.doughnuts.container);
      this.#container.addChild(this.#hudElements.head.hooter.container);
      this.#container.addChild(this.#hudElements.heels.bag.container);
      this.#container.addChild(this.#hudElements.heels.carrying.container);
    }

    this.#container.addChild(this.#hudElements.fps);
    this.#hudElements.fps.filters = [
      hudFpsColourFilter,
      //this.#outlineFilter,
    ];
    this.#hudElements.fps.y = hudCharTextureSize.h;

    this.#initInteractivity();

    if (onScreenControls) {
      this.#onScreenControls = new OnScreenControls({ ...renderContext });
      this.#container.addChild(this.#onScreenControls.output);
    }
  }

  #initInteractivity() {
    const {
      renderContext: {
        gameState: {
          inputStateTracker: { hudInputState },
        },
      },
    } = this;
    for (const character of individualCharacterNames) {
      const { sprite, livesText } = this.#hudElements[character];
      for (const element of [sprite, livesText]) {
        element.eventMode = "static";
        element.on("pointerdown", () => {
          hudInputState[`swop.${character}`] = true;
        });
        element.on("pointerup", () => {
          hudInputState[`swop.${character}`] = false;
        });
        element.on("pointerleave", () => {
          hudInputState[`swop.${character}`] = false;
        });
      }
    }
  }

  #iconWithNumber({
    textureId,
    textOnTop = false,
    noText = false,
    outline = false,
    label,
  }: {
    textureId: TextureId;
    textOnTop?: boolean;
    noText?: boolean;
    outline?: boolean | "text-only";
    label: string;
  }) {
    const container = new Container({ label });
    container.pivot = { x: 4, y: 16 };

    const icon = new Sprite({
      texture: loadedSpriteSheet().textures[textureId],
      anchor: textOnTop ? { x: 0.5, y: 0 } : { x: 0.5, y: 1 },
      filters: hudIconFilter,
      y: textOnTop ? 0 : 8,
    });
    container.addChild(icon);

    const text = this.#makeText({ outline: outline === "text-only" });
    text.y = textOnTop ? 0 : 16;

    text.x = icon.x = hudCharTextureSize.w / 2;
    container.addChild(text);

    if (noText) {
      text.visible = false;
    }

    if (outline === true) {
      container.filters = hudOutlineFilter;
    }

    return {
      text,
      icon,
      container,
    };
  }

  #characterSprite(characterName: IndividualCharacterName) {
    const characterSprite = new Sprite(
      loadedSpriteSheet().textures[
        `${characterName}.walking.${characterName === "head" ? "right" : "towards"}.2`
      ],
    );

    characterSprite.anchor = { x: 0.5, y: 0 };

    return characterSprite;
  }

  #makeText({
    doubleHeight = false,
    outline = false,
    label = "text",
  }: { doubleHeight?: boolean; outline?: boolean; label?: string } = {}) {
    return new Container({
      label,
      filters: outline ? hudOutlinedTextFilters : hudTextFilter,
      scale: { x: 1, y: doubleHeight ? 2 : 1 },
    });
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateElementPositions({
    screenSize,
  }: HudRendererTickContext<RoomId, RoomItemId>) {
    this.#hudElements.head.hooter.container.x =
      this.#hudElements.head.doughnuts.container.x =
        (screenSize.x >> 1) + sideMultiplier("head") * playersIconsFromCentre;
    this.#hudElements.head.doughnuts.container.y =
      screenSize.y - smallItemTextureSize.h - 8;
    this.#hudElements.heels.carrying.container.y =
      screenSize.y - smallItemTextureSize.h;

    this.#hudElements.heels.carrying.container.x =
      this.#hudElements.heels.bag.container.x =
        (screenSize.x >> 1) + sideMultiplier("heels") * playersIconsFromCentre;

    this.#hudElements.heels.bag.container.y =
      this.#hudElements.head.hooter.container.y = screenSize.y - 8;

    this.#hudElements.fps.x = screenSize.x - hudCharTextureSize.w * 2;
  }

  #itemFilter(highlighted: boolean, colourise: boolean) {
    return (
      highlighted ?
        colourise ? noFilters
        : hudHighligtedFilter
      : colourise ? halfBriteFilter
      : hudLowlightedFilter
    );
  }

  /** update the carrying element for heel's bag contents */
  #tickBagAndCarrying(
    _tickContext: HudRendererTickContext<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: { gameState },
    } = this;

    const heelsAbilities = selectAbilities(gameState, "heels");
    const hasBag = heelsAbilities?.hasBag ?? false;
    const carrying = heelsAbilities?.carrying ?? null;

    // TODO: colourise will never change in the lifetime of the renderer, this doesn't need to be done each tick
    const {
      renderContext: { colourise },
    } = this;

    const { container: carryingContainer } = this.#hudElements.heels.carrying;
    const hasSprite = carryingContainer.children.length > 0;
    if (carrying === null && hasSprite) {
      // was carrying; not now:
      for (const child of carryingContainer.children) {
        child.destroy();
      }
    }
    if (carrying !== null && !hasSprite) {
      carryingContainer.addChild(createCarriedSprite(carrying));
    }
    carryingContainer.filters = this.#itemFilter(true, colourise);

    this.#hudElements.heels.bag.icon.filters = this.#itemFilter(
      hasBag,
      colourise,
    );
  }

  #tickHooterAndDoughnuts(
    _tickContext: HudRendererTickContext<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: { gameState },
    } = this;
    const headAbilities = selectAbilities(gameState, "head");

    const hasHooter = headAbilities?.hasHooter ?? false;
    const doughnutCount = headAbilities?.doughnuts ?? 0;

    // TODO: colourise will never change in the lifetime of the renderer, this doesn't need to be done each tick
    const {
      renderContext: { colourise },
    } = this;

    this.#hudElements.head.hooter.icon.filters = this.#itemFilter(
      hasHooter,
      colourise,
    );
    this.#hudElements.head.doughnuts.icon.filters = this.#itemFilter(
      doughnutCount !== 0,
      colourise,
    );
    showNumberInContainer(this.#hudElements.head.doughnuts.text, doughnutCount);
  }

  #updateAbilitiesIcons(
    characterName: IndividualCharacterName,
    { screenSize }: HudRendererTickContext<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: { onScreenControls, gameState },
    } = this;
    const abilities = selectAbilities(gameState, characterName);

    const { text: shieldText, container: shieldContainer } =
      this.#hudElements[characterName].shield;
    const { text: skillText, container: extraSkillContainer } =
      this.#hudElements[characterName].extraSkill;

    const shieldNumber = shieldRemainingForAbilities(abilities);
    const shieldVisible = shieldNumber > 0 || !onScreenControls;
    shieldContainer.visible = shieldVisible;

    if (shieldVisible) {
      showNumberInContainer(shieldText, shieldNumber);
      shieldContainer.y = screenSize.y - shieldFromBottom(onScreenControls);
    }

    extraSkillContainer.x = shieldContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) *
        smallIconsFromCentre(onScreenControls, screenSize);

    const extraSkillNumber =
      abilities === undefined ? 0
      : characterName === "head" ?
        fastStepsRemaining(abilities as HeadAbilities)
      : (abilities as HeelsAbilities<RoomId>).bigJumps;

    const extraSkillVisible = extraSkillNumber > 0 || !onScreenControls;
    extraSkillContainer.visible = extraSkillVisible;

    if (extraSkillVisible) {
      showNumberInContainer(skillText, extraSkillNumber);
      extraSkillContainer.y =
        screenSize.y - extraSkillFromBottom(onScreenControls);
    }
  }

  #characterIsActive(
    gameState: GameState<RoomId>,
    characterName: IndividualCharacterName,
  ) {
    const { currentCharacterName } = gameState;
    return (
      currentCharacterName === characterName ||
      currentCharacterName === "headOverHeels"
    );
  }

  #updateCharacterSprite(
    characterName: IndividualCharacterName,
    { screenSize }: HudRendererTickContext<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: { onScreenControls, gameState },
    } = this;

    const isActive = this.#characterIsActive(gameState, characterName);
    const characterSprite = this.#hudElements[characterName].sprite;
    const {
      renderContext: { colourise },
    } = this;

    if (isActive) {
      characterSprite.filters = colourise ? noFilters : hudHighligtedFilter;
    } else {
      characterSprite.filters =
        colourise ? halfBriteFilter : hudLowlightedFilter;
    }

    characterSprite.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * playableIconFromCentre(onScreenControls);

    characterSprite.y = screenSize.y - smallItemTextureSize.h;
  }

  #updateLivesText(
    characterName: IndividualCharacterName,
    { screenSize }: HudRendererTickContext<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: { onScreenControls, gameState },
    } = this;

    const abilities = selectAbilities(gameState, characterName);
    const lives = abilities?.lives ?? 0;

    const livesTextContainer = this.#hudElements[characterName].livesText;
    livesTextContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * livesTextFromCentre(onScreenControls);
    livesTextContainer.y = screenSize.y;

    showNumberInContainer(livesTextContainer, lives ?? 0);
  }

  #updateColours(tickContext: HudRendererTickContext<RoomId, RoomItemId>) {
    const { room } = tickContext;
    if (room === undefined) {
      // game over, keep current colours
      return;
    }
    const colorScheme = getColorScheme(room.color);
    const { colourise, gameState } = this.renderContext;

    hudLowlightedFilter.targetColor =
      colorScheme.hud.dimmed[colourise ? "dimmed" : "original"];
    hudTextFilter.targetColor =
      colorScheme.hud.dimmed[colourise ? "basic" : "original"];
    hudIconFilter.targetColor =
      colorScheme.hud.icons[colourise ? "basic" : "original"];

    hudHighligtedFilter.targetColor = colorScheme.hud.lives.original;

    // TODO: now that this renderer is recreated if colourised changes, we don't need
    // to do quite so much here on every frame:
    this.#hudElements.head.livesText.filters =
      colourise ?
        hudLivesTextFilter.colourised.head[
          this.#characterIsActive(gameState, "head") ? "active" : "inactive"
        ]
      : hudLivesTextFilter.original;
    this.#hudElements.heels.livesText.filters =
      colourise ?
        hudLivesTextFilter.colourised.heels[
          this.#characterIsActive(gameState, "heels") ? "active" : "inactive"
        ]
      : hudLivesTextFilter.original;
  }

  #fpsLastUpdated: number = neverTime;
  #updateFps() {
    if (selectShowFps(store.getState())) {
      if (performance.now() > this.#fpsLastUpdated + fpsUpdatePeriod) {
        const fpsValue = Ticker.shared.FPS;
        showNumberInContainer(this.#hudElements.fps, Math.round(fpsValue));

        hudFpsColourFilter.targetColor =
          fpsValue > 100 ? spritesheetPalette.white
          : fpsValue > 58 ? spritesheetPalette.moss
          : fpsValue > 55 ? spritesheetPalette.pastelBlue
          : fpsValue > 50 ? spritesheetPalette.metallicBlue
          : fpsValue > 40 ? spritesheetPalette.pink
          : spritesheetPalette.midRed;

        this.#fpsLastUpdated = performance.now();
      }
      this.#hudElements.fps.visible = true;
    } else {
      this.#hudElements.fps.visible = false;
    }
  }

  tick(tickContext: HudRendererTickContext<RoomId, RoomItemId>) {
    this.#updateColours(tickContext);

    for (const character of individualCharacterNames) {
      this.#updateLivesText(character, tickContext);
      this.#updateCharacterSprite(character, tickContext);
      this.#updateAbilitiesIcons(character, tickContext);
    }

    this.#updateElementPositions(tickContext);
    this.#tickHooterAndDoughnuts(tickContext);
    this.#tickBagAndCarrying(tickContext);

    this.#updateFps();

    this.#onScreenControls?.tick(tickContext);
  }

  get output() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
    this.#onScreenControls?.destroy();
  }
}
