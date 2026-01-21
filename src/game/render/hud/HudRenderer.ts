import type { Texture } from "pixi.js";

import { Container, Sprite } from "pixi.js";

import type {
  HeadAbilities,
  HeelsAbilities,
} from "../../../model/ItemStateMap";
import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import type { RoomState } from "../../../model/RoomState";
import type { TextureId } from "../../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import type { PortableItem } from "../../physics/itemPredicates";
import type { Renderer } from "../Renderer";
import type {
  HudRenderContext,
  HudRendererTickContext,
  HudRendererTickContextWithRoom,
} from "./hudRendererContexts";

import { individualCharacterNames } from "../../../model/modelTypes";
import { zxSpectrumColor } from "../../../originalGame";
import { getSpritesheetPalette } from "../../../sprites/palette/spritesheetPalette";
import { originalSpriteSheet } from "../../../sprites/spritesheet/loadedSpriteSheet";
import {
  hudCharTextureSize,
  smallItemTextureSize,
} from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { getSpriteSheetVariantTexture } from "../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { startAppListening } from "../../../store/listenerMiddleware";
import { selectShowFps } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../store/store";
import {
  fastStepsRemaining,
  shieldRemainingForAbilities,
} from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { selectAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { outlineFilters } from "../filters/outlineFilter";
import {
  getRoomColorScheme,
  playableAccentColours,
} from "../gameColours/colourScheme";
import { TextContainer } from "../text/TextContainer";
import { FpsRenderer } from "./FpsRenderer";
import { OnScreenControls } from "./onScreenControls/OnScreenControls";
import { renderCarriedOnce } from "./renderCarried";
import {
  spritesheetVariantForHud,
  tintForHud,
  tintForHudIfUncolourised,
  tintForIcon,
} from "./spritesheetVariantForHud";

const renderContextHasRoom = <RoomId extends string, RoomItemId extends string>(
  ctx: HudRendererTickContext<RoomId, RoomItemId>,
): ctx is HudRendererTickContextWithRoom<RoomId, RoomItemId> =>
  ctx.room !== undefined;

type IconWithNumber = {
  textContainer: TextContainer;
  icon: Sprite;
  container: Container;
};

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

const headTextureId = "head.walking.right.2";
const heelsTextureId = "heels.standing.towards";

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

  #fpsRenderer: FpsRenderer | undefined;

  #hudElements: {
    head: {
      sprite: Sprite;
      livesText: TextContainer;
      shield: IconWithNumber;
      extraSkill: IconWithNumber;
      doughnuts: IconWithNumber;
      hooter: IconWithNumber;
    };
    heels: {
      sprite: Sprite;
      livesText: TextContainer;
      shield: IconWithNumber;
      extraSkill: IconWithNumber;
      bag: IconWithNumber;
      carrying: { container: Container };
    };
  };

  #unlisten;
  #carryingItemRoom: RoomState<RoomId, RoomItemId> | undefined = undefined;

  constructor(public readonly renderContext: HudRenderContext<RoomId>) {
    const { onScreenControls, general } = renderContext;

    this.#hudElements = {
      head: {
        sprite: this.#characterSprite("head"),
        livesText: new TextContainer({
          pixiRenderer: general.pixiRenderer,
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
        livesText: new TextContainer({
          pixiRenderer: general.pixiRenderer,
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
    };

    for (const character of individualCharacterNames) {
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

    this.#initSwopCharacterInteractivity();

    if (onScreenControls) {
      this.#onScreenControls = new OnScreenControls({
        general: renderContext.general,
        inputDirectionMode: renderContext.inputDirectionMode,
      });
      this.#container.addChild(this.#onScreenControls.output);
    }

    // these have to come after the on-screen controls, since they are tappable to
    // change character, and shouldn't be hidden behind the look event catcher
    for (const character of individualCharacterNames) {
      this.#container.addChild(this.#hudElements[character].sprite);
      this.#container.addChild(this.#hudElements[character].livesText);
    }

    // if show fps is togged on or off, add or remove the fps renderer
    this.#unlisten = startAppListening({
      predicate(_action, currentState, previousState) {
        return selectShowFps(currentState) !== selectShowFps(previousState);
      },
      effect: (_action, { getState }) => {
        if (selectShowFps(getState())) {
          this.#fpsRenderer = new FpsRenderer(renderContext);
          this.#wireFpsRendererContainer();
        } else {
          this.#fpsRenderer?.destroy();
          this.#fpsRenderer = undefined;
        }
      },
    });

    // initially create (or don't) the fps renderer
    const showingFps = selectShowFps(store.getState());
    this.#fpsRenderer = showingFps ? new FpsRenderer(renderContext) : undefined;
    if (this.#fpsRenderer) {
      this.#wireFpsRendererContainer();
    }
  }

  #wireFpsRendererContainer() {
    this.#container.addChild(this.#fpsRenderer!.output);
  }

  #initSwopCharacterInteractivity() {
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
    outline?: "text-only" | boolean;
    label: string;
  }): IconWithNumber {
    const container = new Container({ label });
    container.pivot = { x: 4, y: 16 };

    const icon = new Sprite({
      texture: originalSpriteSheet().textures[textureId],
      anchor: textOnTop ? { x: 0.5, y: 0 } : { x: 0.5, y: 1 },
      y: textOnTop ? 0 : 8,
    });
    container.addChild(icon);

    const x = hudCharTextureSize.w / 2;
    const text = new TextContainer({
      pixiRenderer: this.renderContext.general.pixiRenderer,
      outline: outline === "text-only",
      y: textOnTop ? 0 : 16,
      x,
    });
    if (noText) {
      text.visible = false;
    }
    icon.x = x;
    container.addChild(text);

    if (outline === true) {
      container.filters = outlineFilters.pureBlack;
    }

    return {
      textContainer: text,
      icon,
      container,
    };
  }

  #characterSprite(characterName: IndividualCharacterName): Sprite {
    const characterSprite = new Sprite(
      originalSpriteSheet().textures[
        characterName === "head" ? headTextureId : heelsTextureId
      ],
    );

    characterSprite.anchor = { x: 0.5, y: 0 };

    return characterSprite;
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateElementPositions({
    screenSize,
  }: HudRendererTickContextWithRoom<RoomId, RoomItemId>) {
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

    if (this.#fpsRenderer)
      this.#fpsRenderer.output.x =
        screenSize.x / 2 - hudCharTextureSize.w * 1.5;
  }

  /** update the carrying element for heel's bag contents */
  #tickBagAndCarrying({
    room,
  }: HudRendererTickContextWithRoom<RoomId, RoomItemId>) {
    const {
      renderContext: {
        general: { gameState, colourised },
      },
    } = this;

    const heelsAbilities = selectAbilities(gameState, "heels");
    const carrying = heelsAbilities?.carrying ?? null;

    const { container: carryingContainer } = this.#hudElements.heels.carrying;
    const hasSprite = carryingContainer.children.length > 0;
    if (carrying === null && hasSprite) {
      // was carrying; not now:
      for (const child of carryingContainer.children) {
        child.destroy();
      }
      this.#carryingItemRoom = undefined;
    }
    if (
      carrying !== null &&
      (!hasSprite ||
        // switched to Head in another room while heels is carrying an item - regenerate
        // the item's rendering in case room colour scheme has changed, and textures were
        // destroyed
        room !== this.#carryingItemRoom)
    ) {
      const carriedRendering = renderCarriedOnce<RoomId, RoomItemId>(
        carrying as PortableItem<RoomId, RoomItemId>,
        this.renderContext,
        room,
      );
      this.#carryingItemRoom = room;

      carryingContainer.removeChildren();
      carryingContainer.addChild(carriedRendering);

      carryingContainer.tint = tintForHudIfUncolourised(
        colourised,
        room.color,
        // carried item is always activated
        true,
      );
    }

    const bagSprite = this.#hudElements.heels.bag.icon;
    const hasBag = heelsAbilities?.hasBag;
    bagSprite.texture = getSpriteSheetVariantTexture(
      spritesheetVariantForHud(colourised, hasBag ?? false),
      "bag",
    );

    bagSprite.tint = tintForHudIfUncolourised(
      colourised,
      room.color,
      hasBag ?? false,
    );
  }

  #tickHooterAndDoughnuts({
    room,
  }: HudRendererTickContextWithRoom<RoomId, RoomItemId>) {
    const {
      renderContext: {
        general: { gameState, colourised },
      },
    } = this;
    const headAbilities = selectAbilities(gameState, "head");

    const doughnutCount = headAbilities?.doughnuts ?? 0;
    const hasDoughnuts = doughnutCount !== 0;
    const hasHooter = headAbilities?.hasHooter;

    const hooterSprite = this.#hudElements.head.hooter.icon;
    const doughnutsSprite = this.#hudElements.head.doughnuts.icon;
    const doughnutsText = this.#hudElements.head.doughnuts.textContainer;

    // TODO: colourise will never change in the lifetime of the renderer, this doesn't need to be done each tick

    hooterSprite.texture = getSpriteSheetVariantTexture(
      spritesheetVariantForHud(colourised, hasHooter ?? false),
      "hooter",
    );
    doughnutsSprite.texture = getSpriteSheetVariantTexture(
      spritesheetVariantForHud(colourised, hasDoughnuts),
      "doughnuts",
    );

    this.#hudElements.head.doughnuts.textContainer.text = doughnutCount;
    doughnutsText.tint = tintForHud(colourised, room.color, false);

    hooterSprite.tint = tintForHudIfUncolourised(
      colourised,
      room.color,
      hasHooter ?? false,
    );
    doughnutsSprite.tint = tintForHudIfUncolourised(
      colourised,
      room.color,
      hasDoughnuts,
    );
  }

  #updateAbilitiesIcons(
    characterName: IndividualCharacterName,
    { screenSize, room }: HudRendererTickContextWithRoom<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: {
        onScreenControls,
        general: { gameState, colourised },
      },
    } = this;
    const abilities = selectAbilities(gameState, characterName);

    const {
      textContainer: shieldText,
      container: shieldContainer,
      icon: shieldIcon,
    } = this.#hudElements[characterName].shield;
    const {
      textContainer: skillText,
      container: extraSkillContainer,
      icon: extraSkillIcon,
    } = this.#hudElements[characterName].extraSkill;

    const shieldNumber = shieldRemainingForAbilities(abilities);
    const shieldVisible = shieldNumber > 0 || !onScreenControls;
    shieldContainer.visible = shieldVisible;

    if (shieldVisible) {
      shieldText.text = shieldNumber;
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
      skillText.text = extraSkillNumber;
      extraSkillContainer.y =
        screenSize.y - extraSkillFromBottom(onScreenControls);
    }

    skillText.tint = tintForHud(colourised, room.color, false);
    shieldText.tint = tintForHud(colourised, room.color, false);
    shieldIcon.tint = tintForIcon(colourised, room.color);
    extraSkillIcon.tint = tintForIcon(colourised, room.color);
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
    { screenSize, room }: HudRendererTickContextWithRoom<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: {
        onScreenControls,
        general: { gameState, colourised },
      },
    } = this;

    const characterSprite = this.#hudElements[characterName].sprite;

    let characterTexture: Texture;
    const isActive = this.#characterIsActive(gameState, characterName);

    const spritesheetVariant = spritesheetVariantForHud(colourised, isActive);
    try {
      characterTexture = getSpriteSheetVariantTexture(
        spritesheetVariant,
        characterName === "head" ? headTextureId : heelsTextureId,
      );
    } catch (e) {
      console.error(this.renderContext);
      throw new Error(
        `error getting texture for variant ${spritesheetVariant}`,
        { cause: e },
      );
    }

    characterSprite.texture = characterTexture;

    characterSprite.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * playableIconFromCentre(onScreenControls);

    characterSprite.y = screenSize.y - smallItemTextureSize.h;

    characterSprite.tint = tintForHudIfUncolourised(
      colourised,
      room.color,
      isActive,
    );
  }

  #updateLivesText(
    characterName: IndividualCharacterName,
    {
      screenSize,
      freeCharacters,
      room,
    }: HudRendererTickContextWithRoom<RoomId, RoomItemId>,
  ) {
    const {
      renderContext: {
        onScreenControls,
        general: { gameState, colourised },
      },
    } = this;

    const isFree = freeCharacters[characterName] ?? false;

    const livesText =
      isFree ? "FREE" : (selectAbilities(gameState, characterName)?.lives ?? 0);

    const livesTextContainer = this.#hudElements[characterName].livesText;
    livesTextContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) * livesTextFromCentre(onScreenControls);
    livesTextContainer.y = screenSize.y;

    livesTextContainer.text = livesText;

    const isActive = this.#characterIsActive(gameState, characterName);
    const isDimRoom = room.color.shade === "dimmed";

    const tintColour =
      colourised ?
        getSpritesheetPalette(isDimRoom)[
          isActive ? playableAccentColours[characterName] : "midGrey"
        ]
      : zxSpectrumColor(getRoomColorScheme(room.color).hud.brightHue);

    livesTextContainer.tint = tintColour;
  }

  tick(tickContext: HudRendererTickContext<RoomId, RoomItemId>) {
    if (!renderContextHasRoom(tickContext)) {
      // game over - don't update hud
      return;
    }

    for (const character of individualCharacterNames) {
      this.#updateLivesText(character, tickContext);
      this.#updateCharacterSprite(character, tickContext);
      this.#updateAbilitiesIcons(character, tickContext);
    }

    this.#updateElementPositions(tickContext);
    this.#tickHooterAndDoughnuts(tickContext);
    this.#tickBagAndCarrying(tickContext);

    this.#onScreenControls?.tick(tickContext);

    if (this.#fpsRenderer) {
      this.#fpsRenderer.isDark = tickContext.room.color.shade === "dimmed";
    }
  }

  get output() {
    return this.#container;
  }

  destroy() {
    // text has dynamic sprites so explicitly destroy these:
    this.#hudElements.head.doughnuts.textContainer.destroy();
    this.#hudElements.head.hooter.textContainer.destroy();
    this.#hudElements.heels.bag.textContainer.destroy();
    this.#container.destroy({ children: true });
    this.#onScreenControls?.destroy();
    this.#fpsRenderer?.destroy();
    this.#unlisten();
  }
}
