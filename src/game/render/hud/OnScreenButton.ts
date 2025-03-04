import type { Sprite } from "pixi.js";
import { Container } from "pixi.js";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { zxSpectrumColors } from "../../../originalGame";
import { spriteSheet } from "../../../sprites/spriteSheet";
import {
  spritesheetData,
  type TextureId,
} from "../../../sprites/spriteSheetData";
import type { BooleanAction } from "../../input/actions";
import type { InputStateTrackerInterface } from "../../input/InputStateTracker";
import { createSprite } from "../createSprite";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { replaceWithHalfbriteFilter } from "../filters/standardFilters";
import type { SetRequired } from "type-fest";
import type { GameState } from "../../gameState/GameState";
import type { Appearance } from "../appearance/Appearance";
import type { ItemTypeUnion } from "../../../model/ItemInPlay";
import type { PortableItemType } from "../../physics/itemPredicates";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { showTextInContainer } from "./showNumberInContainer";
import type { ButtonRenderingContainer } from "./createButtonRendering";
import {
  createButtonRendering,
  buttonSpriteSym,
  surfaceContentSym,
} from "./createButtonRendering";
import { AppearanceRenderer } from "../appearance/AppearanceRenderer";

type ButtonType = "jump" | "carry" | "fire" | "carryAndJump";

type Button<Which extends ButtonType> = {
  id: string;
  which: Which;
  actions: BooleanAction[];
  colour: "red" | "blue" | "yellow" | "green";
};

type CommonButtonRenderProps = {
  pressed: boolean;
};

type ButtonRenderProps = {
  jump: CommonButtonRenderProps & {
    standingOnTeleporter: boolean;
  };
  carry: CommonButtonRenderProps & {
    bag: boolean;
    item: ItemTypeUnion<PortableItemType, string>;
  };
  fire: CommonButtonRenderProps & {
    doughnuts: number;
    hasHooter: boolean;
  };
  carryAndJump: CommonButtonRenderProps & {
    showing: "teleporter" | "jump-text";
    bag: boolean;
    item: ItemTypeUnion<PortableItemType, string>;
  };
};

type ButtonRenderContext = {
  colourised: boolean;
};

const buttonAppearances: {
  [BT in ButtonType]: Appearance<
    Button<BT>,
    ButtonRenderProps[BT],
    ButtonRenderContext
  >;
} = {
  jump({
    subject: { actions },
    gameState,
    currentlyRenderedProps,
    previousRendering,
  }) {
    const { inputStateTracker } = gameState;

    const playable = selectCurrentPlayableItem(gameState);

    const standingOnTeleporter =
      playable?.state.standingOn?.type === "teleporter";

    const pressed = actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const needsRender =
      currentlyRenderedProps !== undefined &&
      pressed !== currentlyRenderedProps.pressed &&
      standingOnTeleporter !== currentlyRenderedProps.standingOnTeleporter;

    if (!needsRender) {
      return "no-update";
    }

    const container =
      previousRendering === null ?
        createButtonRendering()
      : (previousRendering as ButtonRenderingContainer);

    if (currentlyRenderedProps.pressed !== pressed) {
      container[buttonSpriteSym].texture =
        spriteSheet.textures[pressed ? "button.pressed" : "button"];
      container[surfaceContentSym].y = pressed ? 1 : 0;
    }

    if (standingOnTeleporter !== currentlyRenderedProps.standingOnTeleporter) {
      container[surfaceContentSym].removeChildren();
      if (standingOnTeleporter) {
        const teleporterSprite = createSprite("teleporter");
        container[surfaceContentSym].addChild(teleporterSprite);
      } else {
        const jumpTextContainer = showTextInContainer(new Container(), "JUMP");
        container[surfaceContentSym].addChild(jumpTextContainer);
      }
    }

    return {
      container,
      renderProps: { pressed, standingOnTeleporter },
    };
  },
  carry() {
    return "no-update";
  },
  fire() {
    return "no-update";
  },
  carryAndJump() {
    return "no-update";
  },
};

export class ButtonAppearanceRenderer<
  BT extends ButtonType,
  RoomId extends string,
> extends AppearanceRenderer<
  Button<BT>,
  ButtonRenderProps[BT],
  RoomId,
  ButtonRenderContext
> {}

const buttonColours = {
  colourised: {
    red: spritesheetPalette.midRed,
    blue: spritesheetPalette.metallicBlue,
    yellow: spritesheetPalette.highlightBeige,
    green: spritesheetPalette.moss,
  },
  zx: {
    red: zxSpectrumColors.zxRed,
    blue: zxSpectrumColors.zxBlue,
    yellow: zxSpectrumColors.zxYellow,
    green: zxSpectrumColors.zxGreen,
  },
};

type ButtonColour = "red" | "blue" | "yellow" | "green";
export const buttonSpriteSize = spritesheetData.frames.button.frame;
const buttonColourFilters = {
  colourised: {
    red: replaceWithHalfbriteFilter(buttonColours.colourised.red),
    blue: replaceWithHalfbriteFilter(buttonColours.colourised.blue),
    yellow: replaceWithHalfbriteFilter(buttonColours.colourised.yellow),
    green: replaceWithHalfbriteFilter(buttonColours.colourised.green),
  },
  zx: {
    red: new RevertColouriseFilter(buttonColours.zx.red),
    blue: new RevertColouriseFilter(buttonColours.zx.blue),
    yellow: new RevertColouriseFilter(buttonColours.zx.yellow),
    green: new RevertColouriseFilter(buttonColours.zx.green),
  },
};

type OnScreenButtonOptions<RoomId extends string> = {
  actions: BooleanAction[];
  inputStateTracker: InputStateTrackerInterface;
  textureId?: TextureId;
  colour?: ButtonColour;
  gameState: GameState<RoomId>;
  pressedTextureId?: TextureId;
  surfaceTextureId?: (gameState: GameState<RoomId>) => TextureId;
};

const defaultOptions = {
  textureId: "button",
  pressedTextureId: "button.pressed",
} as const satisfies Partial<OnScreenButtonOptions<string>>;

export class OnScreenButton<RoomId extends string> {
  #buttonSprite: Sprite;
  #container = new Container();
  #surface: Container | undefined;
  options: SetRequired<OnScreenButtonOptions<RoomId>, "textureId">;

  constructor(options: OnScreenButtonOptions<RoomId>) {
    this.options = { ...defaultOptions, ...options };

    const {
      actions,
      inputStateTracker,
      textureId,
      surfaceTextureId,
      gameState,
    } = this.options;

    const { hudInputState } = inputStateTracker;

    this.#buttonSprite = createSprite(textureId) as Sprite;

    this.#container.addChild(this.#buttonSprite);

    if (surfaceTextureId) {
      this.#surface = new Container();
      const surfaceMask = createSprite("button.surfaceMask");
      this.#surface.addChild(surfaceMask);
      this.#surface.mask = surfaceMask;
      const surfaceSprite = createSprite({
        textureId: surfaceTextureId(gameState),
        y: -1,
      });
      /*surfaceSprite.filters = new RevertColouriseFilter(
        colour ? buttonColours.colourised[colour] : undefined,
      );*/
      this.#surface.addChild(surfaceSprite);
      this.#container.addChild(this.#surface);
    }

    this.#container.eventMode = "static";
    this.#container.on("pointerdown", () => {
      for (const a of actions) {
        hudInputState[a] = true;
      }
    });
    this.#container.on("pointerup", () => {
      for (const a of actions) {
        hudInputState[a] = false;
      }
    });
    this.#container.on("pointerleave", () => {
      for (const a of actions) {
        hudInputState[a] = false;
      }
    });
  }

  #updateColours(colourised: boolean) {
    const { colour } = this.options;

    if (!colour) return;

    if (colourised) {
      this.#container.filters = buttonColourFilters.colourised[colour];
    } else {
      this.#container.filters = buttonColourFilters.zx[colour];
    }
  }

  #updateSprite() {
    const { actions, inputStateTracker, textureId, pressedTextureId } =
      this.options;

    const pressed = actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    if (pressedTextureId !== undefined) {
      this.#buttonSprite.texture =
        spriteSheet.textures[pressed ? pressedTextureId : textureId];
    }

    if (this.#surface) this.#surface.y = pressed ? 1 : 0;
  }

  update(colourised: boolean) {
    this.#updateColours(colourised);
    this.#updateSprite();
  }

  get container() {
    return this.#container;
  }
}
