import type { GameState } from "@/game/gameState/GameState";
import { getPlayableItem, currentRoom } from "@/game/gameState/GameState";
import type { Container } from "pixi.js";
import { Text, Sprite } from "pixi.js";
import { spriteSheet } from "@/sprites/spriteSheet";
import { smallItemTextureSize } from "@/sprites/textureSizes";
import { characterNames, type CharacterName } from "@/model/modelTypes";
import { getColorScheme } from "@/hintColours";
import { noFilters } from "../filters/paletteSwapFilters";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import type { Xy } from "@/utils/vectors/vectors";
import type { PlayableItem } from "@/model/ItemInPlay";

const smallTextSize = 8;

const sideMultiplier = (character: CharacterName) => {
  return character === "heels" ? 1 : -1;
};

const livesText = () => {
  const yScaleFactor = 2;

  const headLives = new Text({
    style: {
      fill: "white",
      fontFamily: "Head over Heels",
      fontSize: smallTextSize,
    },
    resolution: 8,
  });
  headLives.scale = { x: 1, y: yScaleFactor };
  return headLives;
};

const characterSprite = (character: CharacterName) => {
  const characterSprite = new Sprite(
    spriteSheet.textures[
      `${character}.walking.${character === "head" ? "right" : "towards"}.2`
    ],
  );

  return characterSprite;
};

export const renderHud = (hudContainer: Container) => {
  const hudElements = {
    head: {
      sprite: characterSprite("head"),
      livesText: livesText(),
    },
    heels: {
      sprite: characterSprite("heels"),
      livesText: livesText(),
    },
  };

  hudContainer.addChild(hudElements.head.livesText);
  hudContainer.addChild(hudElements.head.sprite);
  hudContainer.addChild(hudElements.heels.livesText);
  hudContainer.addChild(hudElements.heels.sprite);

  const uncurrentSpriteFilter = new RevertColouriseFilter();

  return <RoomId extends string>(
    gameState: GameState<RoomId>,
    screenSize: Xy,
  ) => {
    const room = currentRoom(gameState);
    const {
      hud: { dimmed: dimmedShade, lives: livesShade },
    } = getColorScheme(room.color);

    const updateCharacterSprite = ({ type: characterName }: PlayableItem) => {
      const isCurrent = gameState.currentCharacterName === characterName;
      const characterSprite = hudElements[characterName].sprite;
      characterSprite.filters = isCurrent ? noFilters : uncurrentSpriteFilter;

      characterSprite.x =
        (screenSize.x >> 1) +
        sideMultiplier(characterName) * 64 +
        (characterName === "heels" ? -smallItemTextureSize.w : 0);

      characterSprite.y = screenSize.y - smallItemTextureSize.h;
    };
    const updateLivesText = ({
      type: characterName,
      state: { lives },
    }: PlayableItem) => {
      const yScaleFactor = 2;
      const text = hudElements[characterName].livesText;
      text.x = (screenSize.x >> 1) + sideMultiplier(characterName) * 24;
      text.y = screenSize.y - smallTextSize * yScaleFactor;
      text.style.fill = livesShade.basic;
      text.text = `${lives ?? 0}`;
    };

    for (const character of characterNames) {
      const itemInPlay = getPlayableItem(gameState, character);

      uncurrentSpriteFilter.targetColor = dimmedShade.dimmed;

      if (itemInPlay !== undefined) {
        updateLivesText(itemInPlay);
        updateCharacterSprite(itemInPlay);
      }
    }
  };
};
