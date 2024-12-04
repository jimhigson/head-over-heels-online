import type { GameState } from "@/game/gameState/GameState";
import { getPlayableItem, currentRoom } from "@/game/gameState/GameState";
import { Container } from "pixi.js";
import { Text, Sprite } from "pixi.js";
import type { TextureId } from "@/sprites/spriteSheet";
import { spriteSheet } from "@/sprites/spriteSheet";
import {
  hudCharTextureSize,
  smallItemTextureSize,
} from "@/sprites/textureSizes";
import { characterNames, type CharacterName } from "@/model/modelTypes";
import { getColorScheme } from "@/hintColours";
import { noFilters } from "../filters/paletteSwapFilters";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { type Xy } from "@/utils/vectors/vectors";
import type { PlayableItem } from "@/model/ItemInPlay";
import type { RenderOptions } from "@/game/RenderOptions";
import { ItemRenderer } from "../ItemRenderer";
import { shieldDuration } from "@/game/physics/mechanicsConstants";

const smallTextSize = 8;
const livesTextFromCentre = 24;
const playableIconFromCentre = 56;
const smallIconsFromCentre = 80;
const playersIconsFromCentre = 112;

const sideMultiplier = (character: CharacterName) => {
  return character === "heels" ? 1 : -1;
};

export const renderHud = <RoomId extends string>(hudContainer: Container) => {
  const iconFilter = new RevertColouriseFilter();
  const textFilter = new RevertColouriseFilter();
  const uncurrentSpriteFilter = new RevertColouriseFilter();

  const makeText = (doubleHeight: boolean = false) => {
    const yScaleFactor = doubleHeight ? 2 : 1;

    const headLives = new Text({
      style: {
        fill: "white",
        fontFamily: "Head over Heels",
        fontSize: smallTextSize,
        align: "center",
      },
      resolution: 8,
      anchor: { x: 0.5, y: 1 },
    });
    headLives.scale = { x: 1, y: yScaleFactor };
    return headLives;
  };

  const characterSprite = (characterName: CharacterName) => {
    const characterSprite = new Sprite(
      spriteSheet.textures[
        `${characterName}.walking.${characterName === "head" ? "right" : "towards"}.2`
      ],
    );

    characterSprite.anchor = { x: 0.5, y: 0 };

    return characterSprite;
  };

  const iconWithNumber = (
    textureId: TextureId,
    textOnTop: boolean = false,
    noText: boolean = false,
  ) => {
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
    text.text = "0";
    text.y = textOnTop ? 0 : 16;
    text.filters = textFilter;

    text.x = icon.x = hudCharTextureSize.w / 2;
    container.addChild(text);

    if (noText) {
      text.visible = false;
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
      livesText: makeText(true),
      shield: iconWithNumber("hud.shield"),
      extraSkill: iconWithNumber("hud.fastSteps"),
      donuts: iconWithNumber("donuts", true),
      hooter: iconWithNumber("hooter", true, true),
    },
    heels: {
      sprite: characterSprite("heels"),
      livesText: makeText(true),
      shield: iconWithNumber("hud.shield"),
      extraSkill: iconWithNumber("hud.bigJumps"),
      bag: iconWithNumber("bag", true, true),
      carrying: {
        container: new Container(),
        itemRenderer: undefined as
          | undefined
          | ItemRenderer<"spring" | "portableBlock", RoomId>,
      },
    },
  };

  for (const character of characterNames) {
    hudContainer.addChild(hudElements[character].livesText);
    hudContainer.addChild(hudElements[character].sprite);
    hudContainer.addChild(hudElements[character].shield.container);
    hudContainer.addChild(hudElements[character].extraSkill.container);
  }
  hudContainer.addChild(hudElements.head.donuts.container);
  hudContainer.addChild(hudElements.head.hooter.container);
  hudContainer.addChild(hudElements.heels.bag.container);
  hudContainer.addChild(hudElements.heels.carrying.container);

  return (
    gameState: GameState<RoomId>,
    screenSize: Xy,
    renderOptions: RenderOptions<RoomId>,
  ) => {
    const room = currentRoom(gameState);
    const {
      hud: { dimmed: dimmedShade, lives: livesShade, icons: iconShade },
    } = getColorScheme(room.color);

    const updateIcons = (playableItem: PlayableItem) => {
      const {
        type: characterName,
        state: { shieldCollectedAt },
      } = playableItem;

      const { text: shieldText, container: shieldContainer } =
        hudElements[characterName].shield;
      const { text: skillText, container: skillContainer } =
        hudElements[characterName].extraSkill;

      skillContainer.x = shieldContainer.x =
        (screenSize.x >> 1) +
        sideMultiplier(characterName) * smallIconsFromCentre;

      const shieldRemaining =
        (
          shieldCollectedAt === null ||
          gameState.gameTime > shieldCollectedAt + shieldDuration
        ) ?
          0
        : 100 -
          Math.ceil(
            (gameState.gameTime - shieldCollectedAt) / (shieldDuration / 100),
          );

      shieldText.text = `${shieldRemaining}`;
      shieldContainer.y = screenSize.y;

      skillText.text =
        playableItem.type === "head" ?
          playableItem.state.fastSteps
        : playableItem.state.bigJumps;
      skillContainer.y = screenSize.y - 24;
    };

    const updateCharacterSprite = ({ type: characterName }: PlayableItem) => {
      const isCurrent = gameState.currentCharacterName === characterName;
      const characterSprite = hudElements[characterName].sprite;
      characterSprite.filters = isCurrent ? noFilters : uncurrentSpriteFilter;

      characterSprite.x =
        (screenSize.x >> 1) +
        sideMultiplier(characterName) * playableIconFromCentre;

      characterSprite.y = screenSize.y - smallItemTextureSize.h;
    };
    const updateLivesText = ({
      type: characterName,
      state: { lives },
    }: PlayableItem) => {
      const text = hudElements[characterName].livesText;
      text.x =
        (screenSize.x >> 1) +
        sideMultiplier(characterName) * livesTextFromCentre;
      text.y = screenSize.y;
      text.style.fill = livesShade.basic;
      text.text = `${lives ?? 0}`;
    };

    const updateCarrying = (
      carrying: PlayableItem<"heels", RoomId>["state"]["carrying"],
    ) => {
      const { itemRenderer, container } = hudElements.heels.carrying;
      if (carrying === null && itemRenderer !== undefined) {
        // were carrying, not now:
        itemRenderer.destroy();
        hudElements.heels.carrying.itemRenderer = undefined;
      }
      if (carrying !== null && itemRenderer === undefined) {
        const itemRenderer = (hudElements.heels.carrying.itemRenderer =
          ItemRenderer<"spring" | "portableBlock", RoomId>(
            carrying,
            room,
            renderOptions,
          ));

        container.addChild(itemRenderer.container);
      }
    };

    uncurrentSpriteFilter.targetColor = dimmedShade.dimmed;
    textFilter.targetColor = dimmedShade.basic;
    iconFilter.targetColor = iconShade.basic;

    for (const character of characterNames) {
      const itemInPlay = getPlayableItem(gameState, character);

      if (itemInPlay !== undefined) {
        updateLivesText(itemInPlay);
        updateCharacterSprite(itemInPlay);
        updateIcons(itemInPlay);
      }
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

    const {
      state: { hasHooter, donuts },
    } = getPlayableItem(gameState, "head")!;
    hudElements.head.hooter.icon.filters =
      hasHooter ? noFilters : uncurrentSpriteFilter;
    hudElements.head.donuts.icon.filters =
      donuts !== 0 ? noFilters : uncurrentSpriteFilter;
    hudElements.head.donuts.text.text = `${donuts}`;

    const heelsItem = getPlayableItem(gameState, "heels");
    const hasBag = heelsItem?.state.hasBag ?? false;

    updateCarrying(
      // this case is necessary because state isn't generic on roomid, so state.carrying doesn't have
      // roomid completed (other than to string)
      heelsItem?.state.carrying ?? null,
    );

    hudElements.heels.bag.icon.filters =
      hasBag ? noFilters : uncurrentSpriteFilter;
  };
};
