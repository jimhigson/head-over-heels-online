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
import {
  hudFpsColourFilter,
  hudIconFilter,
  hudHighligtedFilter,
  hudLivesTextFilter,
  hudOutlineFilter,
  hudTextFilter,
  hudLowlightedFilter,
} from "./hudFilters";
import { renderCarriedOnce } from "./renderCarried";
import type { Renderer } from "../Renderer";
import { neverTime } from "../../../utils/veryClose";
import {
  makeTextContainer,
  showTextInContainer,
} from "./showNumberInContainer";
import type {
  HudRenderContext,
  HudRendererTickContext,
} from "./hudRendererContexts";
import type { PortableItem } from "../../physics/itemPredicates";

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

export class HudRenderer<RoomId extends string, RoomItemId extends string>
  implements
    Renderer<
      HudRenderContext<RoomId>,
      HudRendererTickContext<RoomId, RoomItemId>,
      Container
    >
{
  #container = new Container({ label: "HudRenderer", isRenderGroup: true });

  #onScreenControls: OnScreenControls<RoomId, RoomItemId> | undefined =
    undefined;

  #hudElements = {
    head: {
      sprite: this.#characterSprite("head"),
      livesText: makeTextContainer({
        label: "headLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: this.#iconWithNumber({
        label: "headShield",
        textureId: "hud.char.🛡",
        outline: true,
      }),
      extraSkill: this.#iconWithNumber({
        label: "headFastSteps",
        textureId: "hud.char.⚡",
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
      livesText: makeTextContainer({
        label: "heelsLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: this.#iconWithNumber({
        label: "heelsShield",
        textureId: "hud.char.🛡",
        outline: true,
      }),
      extraSkill: this.#iconWithNumber({
        label: "heelsBigJumps",
        textureId: "hud.char.♨",
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
    fps: makeTextContainer({ label: "fps", outline: true }),
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
      this.#onScreenControls = new OnScreenControls({
        general: renderContext.general,
        inputDirectionMode: renderContext.inputDirectionMode,
      });
      this.#container.addChild(this.#onScreenControls.output);
    }
  }

  #initInteractivity() {
    const {
      renderContext: {
        general: {
          gameState: {
            inputStateTracker: { hudInputState },
          },
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

    const text = makeTextContainer({ outline: outline === "text-only" });
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
  #tickBagAndCarrying(tickContext: HudRendererTickContext<RoomId, RoomItemId>) {
    const {
      renderContext: {
        general: { gameState, colourised },
      },
    } = this;

    const heelsAbilities = selectAbilities(gameState, "heels");
    const hasBag = heelsAbilities?.hasBag ?? false;
    const carrying = heelsAbilities?.carrying ?? null;

    const { container: carryingContainer } = this.#hudElements.heels.carrying;
    const hasSprite = carryingContainer.children.length > 0;
    if (carrying === null && hasSprite) {
      // was carrying; not now:
      for (const child of carryingContainer.children) {
        child.destroy();
      }
    }
    if (carrying !== null && !hasSprite) {
      const carriedRendering = renderCarriedOnce<RoomId, RoomItemId>(
        carrying as PortableItem<RoomId, RoomItemId>,
        this.renderContext,
        tickContext,
      );
      if (carriedRendering !== undefined) {
        carryingContainer.addChild(carriedRendering);
      }
    }

    // TODO: colourise will never change in the lifetime of the renderer, this doesn't need to be done each tick
    carryingContainer.filters = this.#itemFilter(true, colourised);

    this.#hudElements.heels.bag.icon.filters = this.#itemFilter(
      hasBag,
      colourised,
    );
  }

  #tickHooterAndDoughnuts(
    _tickContext: HudRendererTickContext<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: {
        general: { gameState, colourised },
      },
    } = this;
    const headAbilities = selectAbilities(gameState, "head");

    const hasHooter = headAbilities?.hasHooter ?? false;
    const doughnutCount = headAbilities?.doughnuts ?? 0;

    // TODO: colourise will never change in the lifetime of the renderer, this doesn't need to be done each tick

    this.#hudElements.head.hooter.icon.filters = this.#itemFilter(
      hasHooter,
      colourised,
    );
    this.#hudElements.head.doughnuts.icon.filters = this.#itemFilter(
      doughnutCount !== 0,
      colourised,
    );
    showTextInContainer(this.#hudElements.head.doughnuts.text, doughnutCount);
  }

  #updateAbilitiesIcons(
    characterName: IndividualCharacterName,
    { screenSize }: HudRendererTickContext<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: {
        onScreenControls,
        general: { gameState },
      },
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
      showTextInContainer(shieldText, shieldNumber);
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
      showTextInContainer(skillText, extraSkillNumber);
      extraSkillContainer.y =
        screenSize.y - extraSkillFromBottom(onScreenControls);
    }
  }

  #characterIsActive(
    gameState: Pick<GameState<RoomId>, "currentCharacterName">,
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
      renderContext: {
        onScreenControls,
        general: { gameState, colourised },
      },
    } = this;

    const isActive = this.#characterIsActive(gameState, characterName);
    const characterSprite = this.#hudElements[characterName].sprite;
    if (isActive) {
      characterSprite.filters = colourised ? noFilters : hudHighligtedFilter;
    } else {
      characterSprite.filters =
        colourised ? halfBriteFilter : hudLowlightedFilter;
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
      renderContext: {
        onScreenControls,
        general: { gameState },
      },
    } = this;

    const abilities = selectAbilities(gameState, characterName);
    const lives = abilities?.lives ?? 0;

    const livesTextContainer = this.#hudElements[characterName].livesText;
    livesTextContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * livesTextFromCentre(onScreenControls);
    livesTextContainer.y = screenSize.y;

    showTextInContainer(livesTextContainer, lives ?? 0);
  }

  #updateColours(tickContext: HudRendererTickContext<RoomId, RoomItemId>) {
    const { room } = tickContext;
    if (room === undefined) {
      // game over, keep current colours
      return;
    }
    const colorScheme = getColorScheme(room.color);
    const {
      general: { colourised, gameState },
    } = this.renderContext;

    hudLowlightedFilter.targetColor =
      colorScheme.hud.dimmed[colourised ? "dimmed" : "original"];
    hudTextFilter.targetColor =
      colorScheme.hud.dimmed[colourised ? "basic" : "original"];
    hudIconFilter.targetColor =
      colorScheme.hud.icons[colourised ? "basic" : "original"];

    hudHighligtedFilter.targetColor = colorScheme.hud.lives.original;

    // TODO: now that this renderer is recreated if colourisdd changes, we don't need
    // to do quite so much here on every frame:
    this.#hudElements.head.livesText.filters =
      colourised ?
        hudLivesTextFilter.colourised.head[
          this.#characterIsActive(gameState, "head") ? "active" : "inactive"
        ]
      : hudLivesTextFilter.original;
    this.#hudElements.heels.livesText.filters =
      colourised ?
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
        showTextInContainer(this.#hudElements.fps, Math.round(fpsValue));

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
