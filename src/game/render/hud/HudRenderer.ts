import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Container, Sprite } from "pixi.js";
import { OutlineFilter } from "../filters/outlineFilter";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
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
import { assertIsTextureId } from "../../../sprites/assertIsTextureId";
import { spriteSheet } from "../../../sprites/spriteSheet";
import type { TextureId } from "../../../sprites/spriteSheetData";
import {
  hudCharTextureSize,
  smallItemTextureSize,
} from "../../../sprites/textureSizes";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import { selectCurrentRoomState } from "../../gameState/GameState";
import { selectCanCombine } from "../../gameState/gameStateSelectors/selectCanCombine";
import {
  shieldRemaining,
  fastStepsRemaining,
} from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { selectAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { iterateToContainer } from "../../iterateToContainer";
import { createSprite } from "../createSprite";
import { noFilters } from "../filters/paletteSwapFilters";
import { store } from "../../../store/store";

const livesTextFromCentre = 24;
const playableIconFromCentre = 56;
const smallIconsFromCentre = 80;
const playersIconsFromCentre = 112;

const sideMultiplier = (character: CharacterName) => {
  return character === "heels" ? 1 : -1;
};

function* numberSprites(n: number) {
  const chars = Number.isFinite(n) ? n.toString().split("") : "-";
  const l = chars.length;
  for (let i = 0; i < l; i++) {
    const textureId = `hud.char.${chars[i]}`;
    assertIsTextureId(textureId);
    yield createSprite({
      texture: textureId,
      x: (i + 0.5 - l / 2) * hudCharTextureSize.w,
    });
  }
}

function showNumberInContainer(container: Container, n: number) {
  for (const c of container.children) {
    c.destroy();
  }
  iterateToContainer(numberSprites(n), container);
}

type OutlineAndColouriseFilter = [OutlineFilter, RevertColouriseFilter];

export class HudRenderer<RoomId extends string> {
  #container = new Container({ label: "HudRenderer" });
  #uncurrentSpriteFilter: RevertColouriseFilter = new RevertColouriseFilter();
  #uncurrentButHighlightedSpriteFilter: RevertColouriseFilter =
    new RevertColouriseFilter();
  #iconFilter = new RevertColouriseFilter();
  #textFilter = new RevertColouriseFilter();

  #outlineFilter = new OutlineFilter(
    spritesheetPalette.pureBlack,
    store.getState().upscale.gameEngineUpscale,
  );

  /**
   * without colourisation, the active character gets the same colour as the lives text
   */
  #livesOrActiveCharacterOriginalColorFilter = new RevertColouriseFilter();

  #outlinedTextFilters = [
    this.#outlineFilter,
    this.#textFilter,
  ] as OutlineAndColouriseFilter;
  #livesTextFilter = {
    original: [
      this.#outlineFilter,
      this.#livesOrActiveCharacterOriginalColorFilter,
    ] as OutlineAndColouriseFilter,
    colourised: {
      head: [
        this.#outlineFilter,
        new RevertColouriseFilter(spritesheetPalette.metallicBlue),
      ] as OutlineAndColouriseFilter,
      heels: [
        this.#outlineFilter,
        new RevertColouriseFilter(spritesheetPalette.pink),
      ] as OutlineAndColouriseFilter,
    },
  };

  #hudElements = {
    head: {
      sprite: this.characterSprite("head"),
      livesText: this.makeText({
        label: "headLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: this.iconWithNumber({
        label: "headShield",
        textureId: "hud.shield",
        outline: true,
      }),
      extraSkill: this.iconWithNumber({
        label: "headFastSteps",
        textureId: "hud.fastSteps",
        outline: true,
      }),
      doughnuts: this.iconWithNumber({
        label: "headDoughnuts",
        textureId: "doughnuts",
        textOnTop: true,
        outline: "text-only",
      }),
      hooter: this.iconWithNumber({
        label: "headHooter",
        textureId: "hooter",
        textOnTop: true,
        noText: true,
      }),
    },
    heels: {
      sprite: this.characterSprite("heels"),
      livesText: this.makeText({
        label: "heelsLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: this.iconWithNumber({
        label: "heelsShield",
        textureId: "hud.shield",
        outline: true,
      }),
      extraSkill: this.iconWithNumber({
        label: "heelsBigJumps",
        textureId: "hud.bigJumps",
        outline: true,
      }),
      bag: this.iconWithNumber({
        label: "heelsBag",
        textureId: "bag",
        textOnTop: true,
        noText: true,
      }),
      carrying: {
        container: new Container({ label: "heelsCarrying" }),
      },
    },
  };

  constructor() {
    for (const character of individualCharacterNames) {
      this.#container.addChild(this.#hudElements[character].livesText);
      this.#container.addChild(this.#hudElements[character].sprite);
      this.#container.addChild(this.#hudElements[character].shield.container);
      this.#container.addChild(
        this.#hudElements[character].extraSkill.container,
      );
    }
    this.#container.addChild(this.#hudElements.head.doughnuts.container);
    this.#container.addChild(this.#hudElements.head.hooter.container);
    this.#container.addChild(this.#hudElements.heels.bag.container);
    this.#container.addChild(this.#hudElements.heels.carrying.container);
  }

  iconWithNumber({
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
      filters: this.#iconFilter,
      y: textOnTop ? 0 : 8,
    });
    container.addChild(icon);

    const text = this.makeText({ outline: outline === "text-only" });
    text.y = textOnTop ? 0 : 16;

    text.x = icon.x = hudCharTextureSize.w / 2;
    container.addChild(text);

    if (noText) {
      text.visible = false;
    }

    if (outline === true) {
      container.filters = this.#outlineFilter;
    }

    return {
      text,
      icon,
      container,
    };
  }

  characterSprite(characterName: IndividualCharacterName) {
    const characterSprite = new Sprite(
      spriteSheet.textures[
        `${characterName}.walking.${characterName === "head" ? "right" : "towards"}.2`
      ],
    );

    characterSprite.anchor = { x: 0.5, y: 0 };

    return characterSprite;
  }

  makeText({
    doubleHeight = false,
    outline = false,
    label = "text",
  }: { doubleHeight?: boolean; outline?: boolean; label?: string } = {}) {
    return new Container({
      label,
      filters: outline ? this.#outlinedTextFilters : this.#textFilter,
      scale: { x: 1, y: doubleHeight ? 2 : 1 },
    });
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  updateElementPositions(screenSize: Xy) {
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
  }

  /** update the carrying element for heel's bag contents */
  tickBagAndCarrying(gameState: GameState<RoomId>) {
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
      carryingContainer.addChild(
        createSprite(
          carrying.type === "spring" ? "spring.released"
          : carrying.type === "sceneryPlayer" ?
            carrying.config.which === "head" ?
              "head.walking.towards.2"
            : "heels.walking.away.2"
          : carrying.config.style,
        ),
      );
    }

    this.#hudElements.heels.bag.icon.filters =
      hasBag ? noFilters : this.#uncurrentSpriteFilter;
  }

  tickHooterAndDoughnuts(gameState: GameState<RoomId>) {
    const headAbilities = selectAbilities(gameState, "head");

    const hasHooter = headAbilities?.hasHooter ?? false;
    this.#hudElements.head.hooter.icon.filters =
      hasHooter ? noFilters : this.#uncurrentSpriteFilter;
    const doughnutCount = headAbilities?.doughnuts ?? 0;
    this.#hudElements.head.doughnuts.icon.filters =
      doughnutCount !== 0 ? noFilters : this.#uncurrentSpriteFilter;
    showNumberInContainer(this.#hudElements.head.doughnuts.text, doughnutCount);
  }

  updateAbilitiesIcons(
    gameState: GameState<RoomId>,
    screenSize: Xy,
    characterName: IndividualCharacterName,
  ) {
    const abilities = selectAbilities(gameState, characterName);

    const { text: shieldText, container: shieldContainer } =
      this.#hudElements[characterName].shield;
    const { text: skillText, container: skillContainer } =
      this.#hudElements[characterName].extraSkill;

    skillContainer.x = shieldContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * smallIconsFromCentre;

    showNumberInContainer(shieldText, shieldRemaining(abilities));
    shieldContainer.y = screenSize.y;

    showNumberInContainer(
      skillText,
      abilities === undefined ? 0
      : characterName === "head" ?
        fastStepsRemaining(abilities as HeadAbilities)
      : (abilities as HeelsAbilities<RoomId>).bigJumps,
    );

    skillContainer.y = screenSize.y - 24;
  }

  characterIsActive(
    gameState: GameState<RoomId>,
    characterName: IndividualCharacterName,
  ) {
    const { currentCharacterName } = gameState;
    return (
      currentCharacterName === characterName ||
      currentCharacterName === "headOverHeels"
    );
  }

  updateCharacterSprite(
    gameState: GameState<RoomId>,
    screenSize: Xy,
    colourise: boolean,
    characterName: IndividualCharacterName,
  ) {
    const isActive = this.characterIsActive(gameState, characterName);
    const characterSprite = this.#hudElements[characterName].sprite;

    if (isActive) {
      characterSprite.filters =
        colourise ? noFilters : this.#livesOrActiveCharacterOriginalColorFilter;
    } else {
      const highlight = selectCanCombine(gameState);

      if (highlight) {
        characterSprite.filters = this.#uncurrentButHighlightedSpriteFilter;
      } else {
        characterSprite.filters = this.#uncurrentSpriteFilter;
      }
    }

    characterSprite.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * playableIconFromCentre;

    characterSprite.y = screenSize.y - smallItemTextureSize.h;
  }

  updateLivesText(
    gameState: GameState<RoomId>,
    screenSize: Xy,
    characterName: IndividualCharacterName,
  ) {
    const abilities = selectAbilities(gameState, characterName);
    const lives = abilities?.lives ?? 0;

    const livesTextContainer = this.#hudElements[characterName].livesText;
    livesTextContainer.x =
      (screenSize.x >> 1) + sideMultiplier(characterName) * livesTextFromCentre;
    livesTextContainer.y = screenSize.y;

    showNumberInContainer(livesTextContainer, lives ?? 0);
  }

  updateColours(gameState: GameState<RoomId>, colourise: boolean) {
    const room = selectCurrentRoomState(gameState);
    const colorScheme = getColorScheme(room.color);

    this.#uncurrentSpriteFilter.targetColor =
      colorScheme.hud.dimmed[colourise ? "dimmed" : "original"];
    this.#textFilter.targetColor =
      colorScheme.hud.dimmed[colourise ? "basic" : "original"];
    this.#iconFilter.targetColor =
      colorScheme.hud.icons[colourise ? "basic" : "original"];
    this.#uncurrentButHighlightedSpriteFilter.targetColor =
      colorScheme.hud.dimmed[colourise ? "basic" : "original"];

    this.#livesOrActiveCharacterOriginalColorFilter.targetColor =
      colorScheme.hud.lives.original;

    this.#hudElements.head.livesText.filters =
      colourise ?
        this.characterIsActive(gameState, "head") ?
          this.#livesTextFilter.colourised.head
        : this.#uncurrentSpriteFilter
      : this.#livesTextFilter.original;
    this.#hudElements.heels.livesText.filters =
      colourise ?
        this.characterIsActive(gameState, "heels") ?
          this.#livesTextFilter.colourised.heels
        : this.#uncurrentSpriteFilter
      : this.#livesTextFilter.original;
  }

  tick({
    gameState,
    screenSize,
    colourise,
  }: {
    gameState: GameState<RoomId>;
    screenSize: Xy;
    colourise: boolean;
  }) {
    this.updateColours(gameState, colourise);

    for (const character of individualCharacterNames) {
      this.updateLivesText(gameState, screenSize, character);
      this.updateCharacterSprite(gameState, screenSize, colourise, character);
      this.updateAbilitiesIcons(gameState, screenSize, character);
    }

    this.updateElementPositions(screenSize);
    this.tickHooterAndDoughnuts(gameState);
    this.tickBagAndCarrying(gameState);
  }

  get container() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
  }
}
