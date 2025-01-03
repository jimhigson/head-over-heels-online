import type { GameState } from "@/game/gameState/GameState";
import { selectCurrentRoom } from "@/game/gameState/GameState";
import { Container } from "pixi.js";
import { Sprite } from "pixi.js";
import type { TextureId } from "@/sprites/spriteSheet";
import { spriteSheet } from "@/sprites/spriteSheet";
import {
  hudCharTextureSize,
  smallItemTextureSize,
} from "@/sprites/textureSizes";
import type { IndividualCharacterName } from "@/model/modelTypes";
import { individualCharacterNames } from "@/model/modelTypes";
import { type CharacterName } from "@/model/modelTypes";
import { getColorScheme } from "@/hintColours";
import { noFilters } from "../filters/paletteSwapFilters";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { type Xy } from "@/utils/vectors/vectors";
import type { PlayableItem } from "@/game/physics/itemPredicates";
import { createSprite } from "../createSprite";
import { assertIsTextureId } from "@/sprites/assertIsTextureId";
import { iterateToContainer } from "@/game/iterateToContainer";
import { selectAbilities } from "@/game/gameState/gameStateSelectors/selectPlayableItem";
import { selectCanCombine } from "@/game/gameState/gameStateSelectors/selectCanCombine";
import type { HeadAbilities, HeelsAbilities } from "@/model/ItemStateMap";
import {
  fastStepsRemaining,
  shieldRemaining,
} from "@/game/gameState/gameStateSelectors/selectPickupAbilities";
import { OutlineFilter } from "@/filters/colorReplace/outlineFilter";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import type { Upscale } from "../upscale";

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

export const renderHud = <RoomId extends string>(
  hudContainer: Container,
  upscale: Upscale,
) => {
  const iconFilter = new RevertColouriseFilter();
  const textFilter = new RevertColouriseFilter();
  const uncurrentSpriteFilter = new RevertColouriseFilter();
  const uncurrentButHighlightedSpriteFilter = new RevertColouriseFilter();

  const makeText = ({
    doubleHeight = false,
    outline = false,
  }: { doubleHeight?: boolean; outline?: boolean } = {}) => {
    const yScaleFactor = doubleHeight ? 2 : 1;

    const textContainer = new Container();
    textContainer.scale = { x: 1, y: yScaleFactor };

    if (outline) {
      textContainer.filters = new OutlineFilter(
        spritesheetPalette.pureBlack,
        upscale.scaleFactor,
      );
    }

    return textContainer;
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
  }: {
    textureId: TextureId;
    textOnTop?: boolean;
    noText?: boolean;
    outline?: boolean;
  }) => {
    const container = new Container();
    container.pivot = { x: 4, y: 16 };

    const icon = new Sprite({
      texture: spriteSheet.textures[textureId],
      anchor: textOnTop ? { x: 0.5, y: 0 } : { x: 0.5, y: 1 },
      filters: iconFilter,
      y: textOnTop ? 0 : 8,
    });
    container.addChild(icon);

    const text = makeText();
    //text.text = "0";
    text.y = textOnTop ? 0 : 16;
    text.filters = textFilter;

    text.x = icon.x = hudCharTextureSize.w / 2;
    container.addChild(text);

    if (noText) {
      text.visible = false;
    }

    if (outline) {
      container.filters = new OutlineFilter(
        spritesheetPalette.pureBlack,
        upscale.scaleFactor,
      );
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
      livesText: makeText({ doubleHeight: true, outline: true }),
      shield: iconWithNumber({ textureId: "hud.shield", outline: true }),
      extraSkill: iconWithNumber({ textureId: "hud.fastSteps", outline: true }),
      donuts: iconWithNumber({ textureId: "donuts", textOnTop: true }),
      hooter: iconWithNumber({
        textureId: "hooter",
        textOnTop: true,
        noText: true,
      }),
    },
    heels: {
      sprite: characterSprite("heels"),
      livesText: makeText({ doubleHeight: true, outline: true }),
      shield: iconWithNumber({ textureId: "hud.shield", outline: true }),
      extraSkill: iconWithNumber({ textureId: "hud.bigJumps", outline: true }),
      bag: iconWithNumber({ textureId: "bag", textOnTop: true, noText: true }),
      carrying: {
        container: new Container(),
      },
    },
  };

  for (const character of individualCharacterNames) {
    hudContainer.addChild(hudElements[character].livesText);
    hudContainer.addChild(hudElements[character].sprite);
    hudContainer.addChild(hudElements[character].shield.container);
    hudContainer.addChild(hudElements[character].extraSkill.container);
  }
  hudContainer.addChild(hudElements.head.donuts.container);
  hudContainer.addChild(hudElements.head.hooter.container);
  hudContainer.addChild(hudElements.heels.bag.container);
  hudContainer.addChild(hudElements.heels.carrying.container);

  return (gameState: GameState<RoomId>, screenSize: Xy) => {
    const room = selectCurrentRoom(gameState);
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
    hudElements.head.hooter.container.x = hudElements.head.donuts.container.x =
      (screenSize.x >> 1) + sideMultiplier("head") * playersIconsFromCentre;
    hudElements.head.donuts.container.y =
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
    const donutCount = headAbilities?.donuts ?? 0;
    hudElements.head.donuts.icon.filters =
      donutCount !== 0 ? noFilters : uncurrentSpriteFilter;
    showNumberInContainer(hudElements.head.donuts.text, donutCount);
    //hudElements.head.donuts.text.text = `${donutCount}`;

    const heelsAbilities = selectAbilities(gameState, "heels");
    const hasBag = heelsAbilities?.hasBag ?? false;

    updateCarrying(heelsAbilities?.carrying ?? null);

    hudElements.heels.bag.icon.filters =
      hasBag ? noFilters : uncurrentSpriteFilter;
  };
};
