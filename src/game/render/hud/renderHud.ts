import type { GameState } from "@/game/gameState/GameState";
import { playableItem, currentRoom } from "@/game/gameState/GameState";
import type { Container } from "pixi.js";
import { Text, Sprite } from "pixi.js";
import { amigaLowResPal } from "@/originalGame";
import { spriteSheet } from "@/sprites/spriteSheet";
import { smallItemTextureSize } from "@/sprites/textureSizes";
import { characterNames, type CharacterName } from "@/model/modelTypes";
import { getColorScheme } from "@/hintColours";
import { noFilters } from "../filters/paletteSwapFilters";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";

const smallTextSize = 8;

const sideMultiplier = (character: CharacterName) => {
  return character === "heels" ? 1 : -1;
};

const livesText = (character: CharacterName, doubleHeight: boolean) => {
  const scaleFactor = doubleHeight ? 2 : 1;

  const headLives = new Text({
    style: {
      fill: "white",
      fontFamily: "Head over Heels",
      fontSize: smallTextSize,
    },
    resolution: 8,
    x: (amigaLowResPal.width >> 1) + sideMultiplier(character) * 24,
    y: amigaLowResPal.height - smallTextSize * scaleFactor,
  });
  headLives.scale = { x: 1, y: scaleFactor };
  return headLives;
};

const characterSprite = (character: CharacterName) => {
  const characterSprite = new Sprite(
    spriteSheet.textures[
      `${character}.walking.${character === "head" ? "right" : "towards"}.2`
    ],
  );
  characterSprite.x =
    (amigaLowResPal.width >> 1) +
    sideMultiplier(character) * 64 +
    (character === "heels" ? -smallItemTextureSize.w : 0);
  characterSprite.y = amigaLowResPal.height - smallItemTextureSize.h;

  return characterSprite;
};

export const renderHud = (hudContainer: Container) => {
  const hudElements = {
    head: {
      sprite: characterSprite("head"),
      livesText: livesText("head", true),
    },
    heels: {
      sprite: characterSprite("heels"),
      livesText: livesText("heels", true),
    },
  };

  hudContainer.addChild(hudElements.head.livesText);
  hudContainer.addChild(hudElements.head.sprite);
  hudContainer.addChild(hudElements.heels.livesText);
  hudContainer.addChild(hudElements.heels.sprite);

  const spriteFilter = new RevertColouriseFilter();

  return <RoomId extends string>(gameState: GameState<RoomId>) => {
    const room = currentRoom(gameState);
    const {
      hud: { dimmed, lives },
    } = getColorScheme(room.color);

    for (const character of characterNames) {
      const isCurrent = gameState.currentCharacterName === character;
      const itemInPlay = playableItem(gameState, character);

      spriteFilter.targetColor = dimmed.dimmed;

      hudElements[character].livesText.style.fill = lives.basic;
      hudElements[character].livesText.text = `${itemInPlay?.state.lives ?? 0}`;
      hudElements[character].sprite.filters =
        isCurrent ? noFilters : spriteFilter;
    }
  };
};
