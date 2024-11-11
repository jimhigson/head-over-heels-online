import { characterItem, type AnyGameState } from "@/game/gameState/GameState";
import type { Container } from "pixi.js";
import { Assets, Sprite, Text } from "pixi.js";
import headOverHeelsFont from "../head-over-heels.ttf";
import { zxSpectrumResolution } from "@/originalGame";
import { spriteSheet } from "@/sprites/spriteSheet";
import { smallItemTextureSize } from "@/sprites/textureSizes";
import { characterNames, type CharacterName } from "@/model/modelTypes";
import { revertColouriseDim } from "../filters/paletteSwapFilters";

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
    x: (zxSpectrumResolution.width >> 1) + sideMultiplier(character) * 24,
    y: zxSpectrumResolution.height - smallTextSize * scaleFactor,
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
    (zxSpectrumResolution.width >> 1) +
    sideMultiplier(character) * 64 +
    (character === "heels" ? -smallItemTextureSize.w : 0);
  characterSprite.y = zxSpectrumResolution.height - smallItemTextureSize.h;

  return characterSprite;
};

await Assets.load(headOverHeelsFont);

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

  return (gameState: AnyGameState) => {
    for (const character of characterNames) {
      const isCurrent = gameState.currentCharacterName === character;
      const itemInPlay = characterItem(gameState, character);
      hudElements[character].livesText.text = `${itemInPlay?.state.lives ?? 0}`;
      hudElements[character].sprite.filters =
        isCurrent ? [] : [revertColouriseDim];
    }
  };
};
