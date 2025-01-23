import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Container, Sprite } from "pixi.js";
import { OutlineFilter } from "../../../filters/colorReplace/outlineFilter";
import { RevertColouriseFilter } from "../../../filters/colorReplace/RevertColouriseFilter";
import { getColorScheme } from "../../../hintColours";
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
import type { PlayableItem } from "../../physics/itemPredicates";
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
  const chars = n.toString().split("");
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

export const renderHud = <RoomId extends string>(hudContainer: Container) => {
  const iconFilter = new RevertColouriseFilter();
  const textFilter = new RevertColouriseFilter();
  const outlineFilter = new OutlineFilter(
    spritesheetPalette.pureBlack,
    store.getState().upscale.gameEngineUpscale,
  );
  const uncurrentSpriteFilter = new RevertColouriseFilter();
  const uncurrentButHighlightedSpriteFilter = new RevertColouriseFilter();

  const makeText = ({
    doubleHeight = false,
    outline = false,
    label = "text",
  }: { doubleHeight?: boolean; outline?: boolean; label?: string } = {}) => {
    return new Container({
      label,
      filters: outline ? [outlineFilter, textFilter] : textFilter,
      scale: { x: 1, y: doubleHeight ? 2 : 1 },
    });
  };

  const characterSprite = (characterName: IndividualCharacterName) => {
    const characterSprite = new Sprite(
      spriteSheet.textures[
        `${characterName}.walking.${characterName === "head" ? "right" : "towards"}.2`
      ],
    );

    characterSprite.anchor = { x: 0.5, y: 0 };

    return characterSprite;
  };

  const iconWithNumber = ({
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
  }) => {
    const container = new Container({ label });
    container.pivot = { x: 4, y: 16 };

    const icon = new Sprite({
      texture: spriteSheet.textures[textureId],
      anchor: textOnTop ? { x: 0.5, y: 0 } : { x: 0.5, y: 1 },
      filters: iconFilter,
      y: textOnTop ? 0 : 8,
    });
    container.addChild(icon);

    const text = makeText({ outline: outline === "text-only" });
    text.y = textOnTop ? 0 : 16;

    text.x = icon.x = hudCharTextureSize.w / 2;
    container.addChild(text);

    if (noText) {
      text.visible = false;
    }

    if (outline === true) {
      container.filters = outlineFilter;
    }

    return {
      text,
      icon,
      container,
    };
  };

  const hudElements = {
    head: {
      sprite: characterSprite("head"),
      livesText: makeText({
        label: "headLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: iconWithNumber({
        label: "headShield",
        textureId: "hud.shield",
        outline: true,
      }),
      extraSkill: iconWithNumber({
        label: "headFastSteps",
        textureId: "hud.fastSteps",
        outline: true,
      }),
      doughnuts: iconWithNumber({
        label: "headDoughnuts",
        textureId: "doughnuts",
        textOnTop: true,
        outline: "text-only",
      }),
      hooter: iconWithNumber({
        label: "headHooter",
        textureId: "hooter",
        textOnTop: true,
        noText: true,
      }),
    },
    heels: {
      sprite: characterSprite("heels"),
      livesText: makeText({
        label: "heelsLives",
        doubleHeight: true,
        outline: true,
      }),
      shield: iconWithNumber({
        label: "heelsShield",
        textureId: "hud.shield",
        outline: true,
      }),
      extraSkill: iconWithNumber({
        label: "heelsBigJumps",
        textureId: "hud.bigJumps",
        outline: true,
      }),
      bag: iconWithNumber({
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

  for (const character of individualCharacterNames) {
    hudContainer.addChild(hudElements[character].livesText);
    hudContainer.addChild(hudElements[character].sprite);
    hudContainer.addChild(hudElements[character].shield.container);
    hudContainer.addChild(hudElements[character].extraSkill.container);
  }
  hudContainer.addChild(hudElements.head.doughnuts.container);
  hudContainer.addChild(hudElements.head.hooter.container);
  hudContainer.addChild(hudElements.heels.bag.container);
  hudContainer.addChild(hudElements.heels.carrying.container);

  return (gameState: GameState<RoomId>, screenSize: Xy) => {
    const room = selectCurrentRoomState(gameState);
    const {
      hud: { dimmed: dimmedShade, lives: livesShade, icons: iconShade },
    } = getColorScheme(room.color);

    const updateIcons = (characterName: IndividualCharacterName) => {
      const abilities = selectAbilities(gameState, characterName);

      const { text: shieldText, container: shieldContainer } =
        hudElements[characterName].shield;
      const { text: skillText, container: skillContainer } =
        hudElements[characterName].extraSkill;

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
    };

    const updateCharacterSprite = (characterName: IndividualCharacterName) => {
      const { currentCharacterName } = gameState;
      const isCurrent =
        currentCharacterName === characterName ||
        currentCharacterName === "headOverHeels";
      const characterSprite = hudElements[characterName].sprite;

      if (isCurrent) {
        characterSprite.filters = noFilters;
      } else {
        const highlight = selectCanCombine(gameState);

        if (highlight) {
          uncurrentButHighlightedSpriteFilter.targetColor = dimmedShade.basic;
          characterSprite.filters = uncurrentButHighlightedSpriteFilter;
        } else {
          characterSprite.filters = uncurrentSpriteFilter;
        }
      }

      characterSprite.x =
        (screenSize.x >> 1) +
        sideMultiplier(characterName) * playableIconFromCentre;

      characterSprite.y = screenSize.y - smallItemTextureSize.h;
    };
    const updateLivesText = (characterName: IndividualCharacterName) => {
      const abilities = selectAbilities(gameState, characterName);

      const lives = abilities?.lives ?? 0;

      const text = hudElements[characterName].livesText;
      text.x =
        (screenSize.x >> 1) +
        sideMultiplier(characterName) * livesTextFromCentre;
      text.y = screenSize.y;
      text.tint = livesShade.basic;
      showNumberInContainer(text, lives ?? 0);
    };

    const updateCarrying = (
      carrying: PlayableItem<"heels", RoomId>["state"]["carrying"],
    ) => {
      const { container: carryingContainer } = hudElements.heels.carrying;
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
            carrying.type === "spring" ?
              "spring.released"
            : carrying.config.style,
          ),
        );
      }
    };

    uncurrentSpriteFilter.targetColor = dimmedShade.dimmed;
    textFilter.targetColor = dimmedShade.basic;
    iconFilter.targetColor = iconShade.basic;

    for (const character of individualCharacterNames) {
      updateLivesText(character);
      updateCharacterSprite(character);
      updateIcons(character);
    }
    hudElements.head.hooter.container.x =
      hudElements.head.doughnuts.container.x =
        (screenSize.x >> 1) + sideMultiplier("head") * playersIconsFromCentre;
    hudElements.head.doughnuts.container.y =
      screenSize.y - smallItemTextureSize.h - 8;
    hudElements.heels.carrying.container.y =
      screenSize.y - smallItemTextureSize.h;

    hudElements.heels.carrying.container.x = hudElements.heels.bag.container.x =
      (screenSize.x >> 1) + sideMultiplier("heels") * playersIconsFromCentre;

    hudElements.heels.bag.container.y = hudElements.head.hooter.container.y =
      screenSize.y - 8;

    const headAbilities = selectAbilities(gameState, "head");

    const hasHooter = headAbilities?.hasHooter ?? false;
    hudElements.head.hooter.icon.filters =
      hasHooter ? noFilters : uncurrentSpriteFilter;
    const doughnutCount = headAbilities?.doughnuts ?? 0;
    hudElements.head.doughnuts.icon.filters =
      doughnutCount !== 0 ? noFilters : uncurrentSpriteFilter;
    showNumberInContainer(hudElements.head.doughnuts.text, doughnutCount);
    //hudElements.head.doughnuts.text.text = `${doughnutCount}`;

    const heelsAbilities = selectAbilities(gameState, "heels");
    const hasBag = heelsAbilities?.hasBag ?? false;

    updateCarrying(heelsAbilities?.carrying ?? null);

    hudElements.heels.bag.icon.filters =
      hasBag ? noFilters : uncurrentSpriteFilter;
  };
};
