import { type Color, Container, Sprite, type Texture } from "pixi.js";

import { blockSizePx } from "../../../model/blockSizePx";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import {
  type HeadAbilities,
  type HeelsAbilities,
} from "../../../model/ItemStateMap";
import {
  type CharacterName,
  type IndividualCharacterName,
  individualCharacterNames,
} from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import {
  zxSpectrumColor,
  type ZxSpectrumRoomColour,
} from "../../../originalGame";
import { effectColour } from "../../../sprites/palette/spritesheetPalette";
import {
  type BaseTextureId,
  type BaseTextureIdWithPrefix,
} from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import {
  type SpritesheetMetadata,
  spritesheetMetas,
} from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import {
  hudCharTextureSize,
  smallItemTextureSize,
} from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { startAppListening } from "../../../store/listenerMiddleware";
import { selectShowFps } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { type SpriteOption } from "../../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../../store/store";
import { IdleTracker } from "../../../utils/idle/IdleTracker";
import { neverTime } from "../../../utils/neverTime";
import {
  type DirectionIndexXy8,
  directionIndexXy8,
  directionsXy8Octants,
  originXyz,
  type Xy,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import {
  fastStepsRemaining,
  shieldRemainingForAbilities,
} from "../../gameState/gameStateSelectors/selectPickupAbilities";
import {
  selectAbilities,
  selectCurrentPlayableItem,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { type PortableItem } from "../../physics/itemPredicates";
import { outlineFilters } from "../filters/OutlineFilter";
import { getRoomColorScheme } from "../gameColours/colourScheme";
import { createItemLeafPixiRenderer } from "../item/itemRender/createItemLeafPixiRenderer";
import { type ItemLeafPixiRenderer } from "../item/itemRender/ItemPixiRenderer";
import { type Renderer } from "../Renderer";
import { TextContainer } from "../text/TextContainer";
import { FpsRenderer } from "./FpsRenderer";
import { HudButtonRenderer } from "./HudButtonRenderer";
import {
  type HudRenderContext,
  type HudRendererTickContext,
  type HudRendererTickContextWithRoom,
} from "./hudRendererContexts";
import { mapButtonAppearance } from "./onScreenControls/buttonAppearances/mapButtonAppearance";
import { menuButtonAppearance } from "./onScreenControls/buttonAppearances/menuButtonAppearance";
import { rotateButtonAppearance } from "./onScreenControls/buttonAppearances/rotateButtonAppearance";
import { OnScreenControls } from "./onScreenControls/OnScreenControls";
import {
  tintForHud,
  tintForHudIfUncolourised,
  tintForIcon,
} from "./spritesheetVariantForHud";

/**
 * pointer actions that count as the hud being in use, so its buttons stay up.
 * Only the move events have `global` (non-hit-tested) variants in pixi, so the
 * presses register only while the pointer is over the hud's own children -
 * enough to keep the buttons up while one is being clicked
 */
const hudPointerActivityEvents = [
  "globalpointermove",
  "pointerdown",
  "pointerup",
  "pointerupoutside",
] as const;

const renderContextHasRoom = <RoomId extends string, RoomItemId extends string>(
  ctx: HudRendererTickContext<RoomId, RoomItemId>,
): ctx is HudRendererTickContextWithRoom<RoomId, RoomItemId> =>
  ctx.room !== undefined;

type IconWithNumber<
  Icon extends Sprite | TextContainer = Sprite | TextContainer,
> = {
  textContainer: TextContainer;
  icon: Icon;
  container: Container;
};

const livesTextFromCentre = (
  onScreenControls: boolean,
  gameEngineScreenX: number,
) => (onScreenControls ? gameEngineScreenX / 2 - 24 : 24);
const playableIconFromCentre = (
  onScreenControls: boolean,
  gameEngineScreenX: number,
) => (onScreenControls ? gameEngineScreenX / 2 - 24 : 56);

const extraSkillFromCentre = (onScreenControls: boolean, screenSize: Xy) =>
  onScreenControls ?
    // need to come in enough to clear a 'notch':
    Math.round(screenSize.x / 2) - 80
  : 80;

const shieldFromCentre = (onScreenControls: boolean, screenSize: Xy) =>
  onScreenControls ?
    // need to come in enough to clear a 'notch':
    Math.round(screenSize.x / 2) - 104
  : 80;

const extraSkillFromBottom = (onScreenControls: boolean) =>
  onScreenControls ? 0 : 24;
const shieldFromBottom = (onScreenControls: boolean) =>
  onScreenControls ? 0 : 0;

// bag/hooter/doughnuts etc - how far to render the icon from the screen centre::
const playersIconsFromCentre = 112;

const sideMultiplier = (character: CharacterName) => {
  return character === "heels" ? 1 : -1;
};

const hudCharacterDirection = {
  head: directionIndexXy8.right,
  heels: directionIndexXy8.towards,
} as const satisfies Record<IndividualCharacterName, DirectionIndexXy8>;

type HudCharacterTextureId =
  BaseTextureIdWithPrefix<`${"head" | "heels"}.${"standing" | "walking"}`>;

export class HudRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements Renderer<
  HudRenderContext<RoomId>,
  HudRendererTickContext<RoomId, RoomItemId>,
  Container
> {
  #container = new Container({ label: "HudRenderer", isRenderGroup: true });

  #onScreenControls: OnScreenControls<RoomId, RoomItemId> | undefined =
    undefined;

  #fpsRenderer: FpsRenderer | undefined;

  #hudElements: {
    head: {
      sprite: Sprite;
      livesText: TextContainer;
      shield: IconWithNumber<TextContainer>;
      extraSkill: IconWithNumber<TextContainer>;
      doughnuts: IconWithNumber<Sprite>;
      hooter: IconWithNumber<Sprite>;
    };
    heels: {
      sprite: Sprite;
      livesText: TextContainer;
      shield: IconWithNumber<TextContainer>;
      extraSkill: IconWithNumber<TextContainer>;
      bag: IconWithNumber<Sprite>;
      carrying: { container: Container };
    };
  };

  #characterTextureIds: Record<IndividualCharacterName, HudCharacterTextureId>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #mapButton: HudButtonRenderer<"map", RoomId, any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #menuButton: HudButtonRenderer<"menu", RoomId, any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #rotateClockwiseButton: HudButtonRenderer<"rotateClockwise", RoomId, any, any>; // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #rotateAnticlockwiseButton: HudButtonRenderer<"rotateAnticlockwise", RoomId, any, any>; // prettier-ignore
  #pointerIdleTracker = new IdleTracker();

  #unlisten;
  #carryingItemRoom: RoomState<RoomId, RoomItemId> | undefined = undefined;
  /** the renderer for the currently-carried item, ticked each hud frame */
  #carriedRenderer: ItemLeafPixiRenderer<ItemInPlayType> | undefined =
    undefined;

  readonly renderContext: HudRenderContext<RoomId>;

  constructor(renderContext: HudRenderContext<RoomId>) {
    this.renderContext = renderContext;
    const { general } = renderContext;

    this.#characterTextureIds = {
      head: this.#resolveCharacterTextureId("head"),
      heels: this.#resolveCharacterTextureId("heels"),
    };

    this.#hudElements = {
      head: {
        sprite: this.#createCharacterSprite("head"),
        livesText: new TextContainer({
          pixiRenderer: general.pixiRenderer,
          resolution: general.spritesheets.bakeFactor,
          label: "headLives",
          doubleHeight: true,
          outline: true,
        }),
        shield: this.#iconWithNumber({
          label: "headShield",
          icon: { glyph: "🛡" },
          outline: true,
        }),
        extraSkill: this.#iconWithNumber({
          label: "headFastSteps",
          icon: { glyph: "⚡" },
          outline: true,
        }),
        doughnuts: this.#iconWithNumber({
          label: "headDoughnuts",
          icon: "doughnuts",
          textOnTop: true,
          outline: "text-only",
        }),
        hooter: this.#iconWithNumber({
          label: "headHooter",
          icon: "hooter",
          textOnTop: true,
          noText: true,
        }),
      },
      heels: {
        sprite: this.#createCharacterSprite("heels"),
        livesText: new TextContainer({
          pixiRenderer: general.pixiRenderer,
          resolution: general.spritesheets.bakeFactor,
          label: "heelsLives",
          doubleHeight: true,
          outline: true,
        }),
        shield: this.#iconWithNumber({
          label: "heelsShield",
          icon: { glyph: "🛡" },
          outline: true,
        }),
        extraSkill: this.#iconWithNumber({
          label: "heelsBigJumps",
          icon: { glyph: "♨" },
          outline: true,
        }),
        bag: this.#iconWithNumber({
          label: "heelsBag",
          icon: "bag",
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
    if (!general.onScreenControls) {
      this.#container.addChild(this.#hudElements.head.doughnuts.container);
      this.#container.addChild(this.#hudElements.head.hooter.container);
      this.#container.addChild(this.#hudElements.heels.bag.container);
      this.#container.addChild(this.#hudElements.heels.carrying.container);
    }

    this.#initSwopCharacterInteractivity();

    if (general.onScreenControls) {
      this.#onScreenControls = new OnScreenControls({
        general: renderContext.general,
        inputDirectionMode: renderContext.inputDirectionMode,
      });
      this.#container.addChild(this.#onScreenControls.output);
    }

    const { inputStateTracker } = general.gameState;

    this.#menuButton = new HudButtonRenderer(
      {
        button: { which: "menu", actions: ["menu_openOrExit"], id: "menu" },
        general,
        inputStateTracker,
      },
      menuButtonAppearance,
      true,
    );
    this.#mapButton = new HudButtonRenderer(
      {
        button: { which: "map", actions: ["map"], id: "map" },
        general,
        inputStateTracker,
      },
      mapButtonAppearance,
      true,
    );
    this.#rotateAnticlockwiseButton = new HudButtonRenderer(
      {
        button: {
          which: "rotateAnticlockwise",
          actions: ["rotateCameraAnticlockwise"],
          id: "rotateAnticlockwise",
        },
        general,
        inputStateTracker,
      },
      rotateButtonAppearance("↺"),
      true,
    );
    this.#rotateClockwiseButton = new HudButtonRenderer(
      {
        button: {
          which: "rotateClockwise",
          actions: ["rotateCameraClockwise"],
          id: "rotateClockwise",
        },
        general,
        inputStateTracker,
      },
      rotateButtonAppearance("↻"),
      true,
    );

    for (const button of [
      this.#menuButton,
      this.#mapButton,
      this.#rotateAnticlockwiseButton,
      this.#rotateClockwiseButton,
    ]) {
      const { actions } = button.renderContext.button;
      button.output.on("pointerdown", () => {
        for (const action of actions) {
          inputStateTracker.hudInputState[action] = true;
        }
      });
      button.output.on("pointerup", () => {
        for (const action of actions) {
          inputStateTracker.hudInputState[action] = false;
        }
      });
      button.output.on("pointerleave", () => {
        for (const action of actions) {
          inputStateTracker.hudInputState[action] = false;
        }
      });
      this.#container.addChild(button.output);
    }

    if (!general.onScreenControls) {
      this.#container.eventMode = "static";
      // in visual-regression builds the pointer never counts as in use, so the
      // buttons' visibility is deterministic rather than being caught
      // mid-countdown by a screenshot after one of playwright's own clicks
      if (import.meta.env.MODE !== "visual-regression") {
        for (const eventName of hudPointerActivityEvents) {
          this.#container.on(eventName, () => {
            this.#pointerIdleTracker.markActive();
          });
        }
      }
    }

    // these have to come after the on-screen controls, since they are tappable to
    // change character, and shouldn't be hidden behind the look event catcher
    for (const character of individualCharacterNames) {
      this.#container.addChild(this.#hudElements[character].livesText);
      this.#container.addChild(this.#hudElements[character].sprite);
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

  #iconWithNumber(options: {
    icon: BaseTextureId;
    textOnTop?: boolean;
    noText?: boolean;
    outline?: "text-only" | boolean;
    label: string;
  }): IconWithNumber<Sprite>;
  #iconWithNumber(options: {
    icon: { glyph: string };
    textOnTop?: boolean;
    noText?: boolean;
    outline?: "text-only" | boolean;
    label: string;
  }): IconWithNumber<TextContainer>;
  #iconWithNumber({
    icon: iconSource,
    textOnTop = false,
    noText = false,
    outline = false,
    label,
  }: {
    /**
     * a real sprite texture id, or a single hud-font glyph (the
     * shield/lightning/hot-spring symbols, which live in the font rather than
     * the spritesheet) to render as the icon
     */
    icon: { glyph: string } | BaseTextureId;
    textOnTop?: boolean;
    noText?: boolean;
    outline?: "text-only" | boolean;
    label: string;
  }): IconWithNumber {
    const container = new Container({ label });
    container.pivot = { x: 4, y: 16 };

    const icon =
      typeof iconSource === "string" ?
        new Sprite({
          texture:
            this.renderContext.general.spritesheets.originalSpritesheet
              .textures[iconSource],
          anchor: textOnTop ? { x: 0.5, y: 0 } : { x: 0.5, y: 1 },
          y: textOnTop ? 0 : 8,
        })
      : new TextContainer({
          pixiRenderer: this.renderContext.general.pixiRenderer,
          resolution: this.renderContext.general.spritesheets.bakeFactor,
          text: iconSource.glyph,
          y: 8,
        });
    container.addChild(icon);

    const x = hudCharTextureSize.w / 2;
    const text = new TextContainer({
      pixiRenderer: this.renderContext.general.pixiRenderer,
      resolution: this.renderContext.general.spritesheets.bakeFactor,
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

  #resolveCharacterTextureId(
    characterName: IndividualCharacterName,
  ): HudCharacterTextureId {
    const { spriteOption } = this.renderContext.general;
    const directionIndex = hudCharacterDirection[characterName];
    // the per-direction meta stays keyed by the art's direction name:
    const standing =
      spritesheetMetas[spriteOption.name].playable[characterName][
        directionsXy8Octants[directionIndex]
      ]?.standing;
    if (!standing) {
      throw new Error(
        `no standing defined for ${characterName}.d${directionIndex} in ${spriteOption.name}`,
      );
    }

    return standing === true ?
        `${characterName}.standing.d${directionIndex}`
      : `${characterName}.walking.d${directionIndex}.${standing}`;
  }

  #createCharacterSprite(characterName: IndividualCharacterName): Sprite {
    const characterSprite = new Sprite(
      this.renderContext.general.spritesheets.originalSpritesheet.textures[
        this.#characterTextureIds[characterName]
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

    if (this.#fpsRenderer) {
      this.#fpsRenderer.output.x =
        screenSize.x / 2 - hudCharTextureSize.w * 1.5;
    }
  }

  /** update the carrying element for heel's bag contents */
  #tickBagAndCarrying({
    room,
    deltaMS,
  }: HudRendererTickContextWithRoom<RoomId, RoomItemId>) {
    const {
      renderContext: {
        general: { gameState, spriteOption },
      },
    } = this;

    const heelsAbilities = selectAbilities(gameState, "heels");
    const carrying = heelsAbilities?.carrying ?? null;

    const { container: carryingContainer } = this.#hudElements.heels.carrying;
    const hasSprite = carryingContainer.children.length > 0;
    if (carrying === null && hasSprite) {
      // was carrying; not now:
      this.#carriedRenderer?.destroy();
      this.#carriedRenderer = undefined;
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
      this.#carriedRenderer?.destroy();
      const carriedItem = carrying as PortableItem<RoomId, RoomItemId>;
      const maybeCarriedRenderer = createItemLeafPixiRenderer({
        general: this.renderContext.general,
        item: carriedItem,
        room,
        isReflection: false,
      });
      if (import.meta.env.DEV && maybeCarriedRenderer === undefined) {
        throw new Error(`no renderer for carried item "${carriedItem.id}"`);
      }
      this.#carriedRenderer = maybeCarriedRenderer!;
      this.#carryingItemRoom = room;

      carryingContainer.removeChildren();
      carryingContainer.addChild(this.#carriedRenderer.output);

      carryingContainer.tint = tintForHudIfUncolourised(
        spriteOption,
        room.color,
        // carried item is always activated
        true,
      );
    }

    // tick the carried item every frame so directional/animated items keep up
    // with the camera angle and the passage of time - the carried renderer
    // shares the live general render context, so its camera angle is current:
    this.#carriedRenderer?.tick({ deltaMS, lastRenderRoomTime: neverTime });

    const bagSprite = this.#hudElements.heels.bag.icon;
    const hasBag = heelsAbilities?.hasBag;
    bagSprite.texture =
      this.renderContext.general.spritesheets.spritesheetForCurrentRoom.textures[
        variantTextureId("bag", false, false, !(hasBag ?? false), false)
      ];

    bagSprite.tint = tintForHudIfUncolourised(
      spriteOption,
      room.color,
      hasBag ?? false,
    );
  }

  #tickHooterAndDoughnuts({
    room,
  }: HudRendererTickContextWithRoom<RoomId, RoomItemId>) {
    const {
      renderContext: {
        general: { gameState, spriteOption, spritesheetMeta },
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

    hooterSprite.texture =
      this.renderContext.general.spritesheets.spritesheetForCurrentRoom.textures[
        variantTextureId("hooter", false, false, !(hasHooter ?? false), false)
      ];
    doughnutsSprite.texture =
      this.renderContext.general.spritesheets.spritesheetForCurrentRoom.textures[
        variantTextureId("doughnuts", false, false, !hasDoughnuts, false)
      ];

    this.#hudElements.head.doughnuts.textContainer.text =
      doughnutCount === "infinite" ? "∞" : doughnutCount;
    doughnutsText.colour = tintForHud(
      spriteOption,
      room.color,
      false,
      spritesheetMeta,
    );
    doughnutsText.flashColour = tintForHud(
      spriteOption,
      room.color,
      true,
      spritesheetMeta,
    );

    hooterSprite.tint = tintForHudIfUncolourised(
      spriteOption,
      room.color,
      hasHooter ?? false,
    );
    doughnutsSprite.tint = tintForHudIfUncolourised(
      spriteOption,
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
        general: { gameState, spriteOption, spritesheetMeta, onScreenControls },
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

    extraSkillContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) *
        extraSkillFromCentre(onScreenControls, screenSize);

    shieldContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) *
        shieldFromCentre(onScreenControls, screenSize);

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

    skillText.colour = tintForHud(
      spriteOption,
      room.color,
      false,
      spritesheetMeta,
    );
    skillText.flashColour = tintForHud(
      spriteOption,
      room.color,
      true,
      spritesheetMeta,
    );
    shieldText.colour = tintForHud(
      spriteOption,
      room.color,
      false,
      spritesheetMeta,
    );
    shieldText.flashColour = tintForHud(
      spriteOption,
      room.color,
      true,
      spritesheetMeta,
    );
    shieldIcon.tint = tintForIcon(spriteOption, room.color);
    extraSkillIcon.tint = tintForIcon(spriteOption, room.color);
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
        general: { gameState, spriteOption, onScreenControls },
      },
    } = this;

    const characterSprite = this.#hudElements[characterName].sprite;

    let characterTexture: Texture;
    const isActive = this.#characterIsActive(gameState, characterName);

    try {
      characterTexture =
        this.renderContext.general.spritesheets.spritesheetForCurrentRoom
          .textures[
          variantTextureId(
            this.#characterTextureIds[characterName],
            false,
            false,
            !isActive,
            false,
          )
        ];
    } catch (e) {
      console.error(this.renderContext);
      throw new Error(`error getting character texture for ${characterName}`, {
        cause: e,
      });
    }

    characterSprite.texture = characterTexture;

    characterSprite.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) *
        playableIconFromCentre(onScreenControls, screenSize.x);

    characterSprite.y =
      onScreenControls ?
        Math.round(screenSize.y * 0.4) - smallItemTextureSize.h + 2
      : screenSize.y - smallItemTextureSize.h;

    characterSprite.tint = tintForHudIfUncolourised(
      spriteOption,
      room.color,
      isActive,
    );
  }

  #characterTextColour<PaletteColourName extends string>(
    spritesheetMeta: SpritesheetMetadata<PaletteColourName>,
    spriteOption: SpriteOption,
    characterName: IndividualCharacterName,
    isActive: boolean,
    roomColour: ZxSpectrumRoomColour,
  ): Color {
    if (spriteOption.uncolourised) {
      return zxSpectrumColor(getRoomColorScheme(roomColour).hud.brightHue);
    }

    const isDim = roomColour.shade === "dimmed";
    return effectColour(
      spritesheetMeta,
      isDim,
      isActive ? characterName : "dimText",
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
        general: { gameState, spriteOption, spritesheetMeta, onScreenControls },
      },
    } = this;

    const isFree = freeCharacters[characterName] ?? false;

    const livesText =
      isFree ? "FREE" : (selectAbilities(gameState, characterName)?.lives ?? 0);

    const livesTextContainer = this.#hudElements[characterName].livesText;
    livesTextContainer.x =
      (screenSize.x >> 1) +
      sideMultiplier(characterName) *
        livesTextFromCentre(onScreenControls, screenSize.x);
    livesTextContainer.y =
      onScreenControls ? Math.round(screenSize.y * 0.4) + 16 : screenSize.y;

    livesTextContainer.text = livesText;

    livesTextContainer.colour = this.#characterTextColour(
      spritesheetMeta,
      spriteOption,
      characterName,
      this.#characterIsActive(gameState, characterName),
      room.color,
    );
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

    const { onScreenControls, gameState, paused } = this.renderContext.general;
    const buttonTickContext = {
      ...tickContext,
      currentPlayable: selectCurrentPlayableItem(gameState),
    };
    this.#menuButton.tick({
      ...buttonTickContext,
      hovered: this.#menuButton.hovered,
    });
    this.#mapButton.tick({
      ...buttonTickContext,
      hovered: this.#mapButton.hovered,
    });
    this.#rotateAnticlockwiseButton.tick({
      ...buttonTickContext,
      hovered: this.#rotateAnticlockwiseButton.hovered,
    });
    this.#rotateClockwiseButton.tick({
      ...buttonTickContext,
      hovered: this.#rotateClockwiseButton.hovered,
    });

    this.#menuButton.output.x = 24;
    this.#menuButton.output.y = 24;
    this.#mapButton.output.x = tickContext.screenSize.x - 3 * 8;
    // same baseline (y=24) as the menu and rotate buttons:
    this.#mapButton.output.y = 24;

    // the camera-rotate buttons sit on the same top-edge baseline, one block out
    // from the menu button (anticlockwise, towards the top-left) and the map
    // button (clockwise, towards the top-right):
    this.#rotateAnticlockwiseButton.output.y = 24;
    this.#rotateAnticlockwiseButton.output.x = Math.round(
      this.#menuButton.output.x + this.#menuButton.output.width + blockSizePx.x,
    );
    this.#rotateClockwiseButton.output.y = 24;
    this.#rotateClockwiseButton.output.x = Math.round(
      this.#mapButton.output.x -
        blockSizePx.x -
        this.#rotateClockwiseButton.output.width,
    );

    // checked every tick, so the buttons go the moment a direction is pressed
    // rather than lingering for the rest of the idle countdown
    const isSteering = !xyzEqual(
      gameState.inputStateTracker.directionVector,
      originXyz,
    );
    if (isSteering) {
      this.#pointerIdleTracker.makeIdleNow();
    }

    const buttonsVisible =
      !paused && (onScreenControls || !this.#pointerIdleTracker.idle);
    this.#menuButton.output.visible = buttonsVisible;
    this.#mapButton.output.visible = buttonsVisible;
    this.#rotateAnticlockwiseButton.output.visible = buttonsVisible;
    this.#rotateClockwiseButton.output.visible = buttonsVisible;

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
    this.#pointerIdleTracker.destroy();
    this.#unlisten();
  }
}
