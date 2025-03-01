import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Container, Sprite, Ticker } from "pixi.js";
import { getColorScheme } from "../../hintColours";
import type {
  CarriedItem,
  HeadAbilities,
  HeelsAbilities,
} from "../../../model/ItemStateMap";
import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import { individualCharacterNames } from "../../../model/modelTypes";
import { spriteSheet } from "../../../sprites/spriteSheet";
import type { TextureId } from "../../../sprites/spriteSheetData";
import {
  hudCharTextureSize,
  smallItemTextureSize,
} from "../../../sprites/textureSizes";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import { selectCurrentRoomState } from "../../gameState/GameState";
import {
  shieldRemaining,
  fastStepsRemaining,
} from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { selectAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { createSprite } from "../createSprite";
import { noFilters } from "../filters/standardFilters";
import { store } from "../../../store/store";
import { selectShowFps } from "../../../store/selectors";
import type { DeviceType } from "../../../utils/detectDeviceType";
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
  hudLowlightAndOutlineFilters,
  hudLowlightedFilter,
} from "./hudFilters";

const fpsUpdatePeriod = 250;

const livesTextFromCentre: Record<DeviceType, number> = {
  server: 24,
  desktop: 24,
  tablet: 24,
  mobile: 16,
};
const playableIconFromCentre: Record<DeviceType, number> = {
  server: 56,
  desktop: 56,
  tablet: 56,
  mobile: 38,
};
const smallIconsFromCentre: Record<DeviceType, number> = {
  server: 80,
  desktop: 80,
  tablet: 80,
  mobile: 60,
};
const extraSkillFromBottom: Record<DeviceType, number> = {
  server: 24,
  desktop: 24,
  tablet: 16,
  mobile: 18,
};
// bag/hooter/doughnuts etc - how far to render the icon from the screen centre::
const playersIconsFromCentre = 112;

const sideMultiplier = (character: CharacterName) => {
  return character === "heels" ? 1 : -1;
};

export type TickOptions<RoomId extends string> = {
  gameState: GameState<RoomId>;
  screenSize: Xy;
  colourise: boolean;
};

export class HudRenderer<RoomId extends string> {
  #container = new Container({ label: "HudRenderer" });

  #controls: OnScreenControls<RoomId> | undefined = undefined;

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

  constructor(
    private gameState: GameState<RoomId>,
    private deviceType: DeviceType,
  ) {
    for (const character of individualCharacterNames) {
      this.#container.addChild(this.#hudElements[character].livesText);
      this.#container.addChild(this.#hudElements[character].sprite);
      this.#container.addChild(this.#hudElements[character].shield.container);
      this.#container.addChild(
        this.#hudElements[character].extraSkill.container,
      );
    }
    if (this.deviceType !== "mobile") {
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

    if (deviceType !== "desktop") {
      this.#controls = new OnScreenControls(gameState);
      this.#container.addChild(this.#controls.container);
    }
  }

  #initInteractivity() {
    const {
      inputStateTracker: { hudInputState },
    } = this.gameState;
    for (const character of individualCharacterNames) {
      const { sprite } = this.#hudElements[character];
      sprite.eventMode = "static";
      sprite.on("pointerdown", () => {
        hudInputState[`swop.${character}`] = true;
      });
      sprite.on("pointerup", () => {
        hudInputState[`swop.${character}`] = false;
      });
      sprite.on("pointerleave", () => {
        hudInputState[`swop.${character}`] = false;
      });
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
      texture: spriteSheet.textures[textureId],
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
      spriteSheet.textures[
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
  #updateElementPositions(screenSize: Xy) {
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

  #createCarriedSprite(carrying: CarriedItem<string>) {
    return createSprite(
      carrying.type === "spring" ? "spring.released"
      : carrying.type === "sceneryPlayer" ?
        carrying.config.which === "head" ?
          "head.walking.towards.2"
        : "heels.walking.away.2"
      : carrying.config.style,
    );
  }

  #itemFilter(highlighted: boolean, colourise: boolean) {
    return (
      highlighted ?
        colourise ? noFilters
        : hudHighligtedFilter
      : hudLowlightedFilter
    );
  }

  /** update the carrying element for heel's bag contents */
  #tickBagAndCarrying(gameState: GameState<RoomId>, colourise: boolean) {
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
      carryingContainer.addChild(this.#createCarriedSprite(carrying));
    }
    carryingContainer.filters = this.#itemFilter(true, colourise);

    this.#hudElements.heels.bag.icon.filters = this.#itemFilter(
      hasBag,
      colourise,
    );
  }

  #tickHooterAndDoughnuts(gameState: GameState<RoomId>, colourise: boolean) {
    const headAbilities = selectAbilities(gameState, "head");

    const hasHooter = headAbilities?.hasHooter ?? false;
    const doughnutCount = headAbilities?.doughnuts ?? 0;

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
    gameState: GameState<RoomId>,
    screenSize: Xy,
    characterName: IndividualCharacterName,
  ) {
    const abilities = selectAbilities(gameState, characterName);

    const { text: shieldText, container: shieldContainer } =
      this.#hudElements[characterName].shield;
    const { text: skillText, container: extraSkillContainer } =
      this.#hudElements[characterName].extraSkill;

    const shieldNumber = shieldRemaining(abilities);
    const shieldVisible = shieldNumber > 0 || this.deviceType !== "mobile";
    shieldContainer.visible = shieldVisible;

    if (shieldVisible) {
      showNumberInContainer(shieldText, shieldNumber);
      shieldContainer.y = screenSize.y;
    }

    extraSkillContainer.x = shieldContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * smallIconsFromCentre[this.deviceType];

    const extraSkillNumber =
      abilities === undefined ? 0
      : characterName === "head" ?
        fastStepsRemaining(abilities as HeadAbilities)
      : (abilities as HeelsAbilities<RoomId>).bigJumps;

    const extraSkillVisible =
      extraSkillNumber > 0 || this.deviceType !== "mobile";
    extraSkillContainer.visible = extraSkillVisible;

    if (extraSkillVisible) {
      showNumberInContainer(skillText, extraSkillNumber);
      extraSkillContainer.y =
        screenSize.y - extraSkillFromBottom[this.deviceType];
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
    gameState: GameState<RoomId>,
    screenSize: Xy,
    colourise: boolean,
    characterName: IndividualCharacterName,
  ) {
    const isActive = this.#characterIsActive(gameState, characterName);
    const characterSprite = this.#hudElements[characterName].sprite;

    if (isActive) {
      characterSprite.filters = colourise ? noFilters : hudHighligtedFilter;
    } else {
      characterSprite.filters = hudLowlightedFilter;
    }

    characterSprite.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * playableIconFromCentre[this.deviceType];

    characterSprite.y = screenSize.y - smallItemTextureSize.h;
  }

  #updateLivesText(
    gameState: GameState<RoomId>,
    screenSize: Xy,
    characterName: IndividualCharacterName,
  ) {
    const abilities = selectAbilities(gameState, characterName);
    const lives = abilities?.lives ?? 0;

    const livesTextContainer = this.#hudElements[characterName].livesText;
    livesTextContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * livesTextFromCentre[this.deviceType];
    livesTextContainer.y = screenSize.y;

    showNumberInContainer(livesTextContainer, lives ?? 0);
  }

  #updateColours(gameState: GameState<RoomId>, colourise: boolean) {
    const room = selectCurrentRoomState(gameState);
    if (room === undefined) {
      // game over, keep current colours
      return;
    }
    const colorScheme = getColorScheme(room.color);

    hudLowlightedFilter.targetColor =
      colorScheme.hud.dimmed[colourise ? "dimmed" : "original"];
    hudTextFilter.targetColor =
      colorScheme.hud.dimmed[colourise ? "basic" : "original"];
    hudIconFilter.targetColor =
      colorScheme.hud.icons[colourise ? "basic" : "original"];

    hudHighligtedFilter.targetColor = colorScheme.hud.lives.original;

    this.#hudElements.head.livesText.filters =
      colourise ?
        this.#characterIsActive(gameState, "head") ?
          hudLivesTextFilter.colourised.head
        : hudLowlightAndOutlineFilters
      : hudLivesTextFilter.original;
    this.#hudElements.heels.livesText.filters =
      colourise ?
        this.#characterIsActive(gameState, "heels") ?
          hudLivesTextFilter.colourised.heels
        : hudLowlightAndOutlineFilters
      : hudLivesTextFilter.original;
  }

  #fpsLastUpdated: number = Number.NEGATIVE_INFINITY;
  #updateFps() {
    if (selectShowFps(store.getState())) {
      if (performance.now() > this.#fpsLastUpdated + fpsUpdatePeriod) {
        const fpsValue = Ticker.shared.FPS;
        showNumberInContainer(this.#hudElements.fps, Math.round(fpsValue));

        hudFpsColourFilter.targetColor =
          fpsValue > 56 ? spritesheetPalette.moss
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

  tick(tickOptions: TickOptions<RoomId>) {
    const { gameState, screenSize, colourise } = tickOptions;

    this.#updateColours(gameState, colourise);

    for (const character of individualCharacterNames) {
      this.#updateLivesText(gameState, screenSize, character);
      this.#updateCharacterSprite(gameState, screenSize, colourise, character);
      this.#updateAbilitiesIcons(gameState, screenSize, character);
    }

    this.#updateElementPositions(screenSize);
    this.#tickHooterAndDoughnuts(gameState, colourise);
    this.#tickBagAndCarrying(gameState, colourise);

    this.#updateFps();

    this.#controls?.tick(tickOptions);
  }

  get container() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
  }
}
