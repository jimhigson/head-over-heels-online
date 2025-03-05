import { Container } from "pixi.js";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { zxSpectrumColors } from "../../../originalGame";
import type { BooleanAction } from "../../input/actions";
import { createSprite } from "../createSprite";
import {
  selectCurrentRoomState,
  type GameState,
} from "../../gameState/GameState";
import type { Appearance } from "../appearance/Appearance";
import type { ItemTypeUnion } from "../../../model/ItemInPlay";
import type {
  PlayableItem,
  PortableItemType,
} from "../../physics/itemPredicates";
import {
  selectCurrentPlayableItem,
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { showTextInContainer } from "./showNumberInContainer";
import type { ButtonRenderingContainer } from "./arcadeStyleButtonRendering";
import {
  arcadeStyleButtonRendering,
  setDisabled,
  setPressed,
  showOnSurface,
} from "./arcadeStyleButtonRendering";
import { AppearanceRenderer } from "../appearance/AppearanceRenderer";
import { PaletteSwapFilter } from "../filters/PaletteSwapFilter";
import { halfBrite } from "../../../utils/colour/halfBrite";
import { hudOutlineFilter } from "./hudFilters";
import { createCarriedSprite } from "./createCarriedSprite";
import { findItemToPickup } from "../../physics/mechanics/carrying";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { CarriedItem } from "../../../model/ItemStateMap";

type ButtonType = "jump" | "carry" | "fire" | "carryAndJump";

export type ButtonColor = "red" | "blue" | "yellow" | "green";

type Button<Which extends ButtonType> = {
  id: string;
  which: Which;
  actions: BooleanAction[];
  colour: ButtonColor;
};

type CommonButtonRenderProps = {
  pressed: boolean;
  colourise: boolean;
};

type ButtonRenderProps = {
  jump: CommonButtonRenderProps & {
    standingOnTeleporter: boolean;
  };
  carry: CommonButtonRenderProps & {
    hasBag: boolean;
    carrying: CarriedItem<string> | null;
    disabled: boolean;
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
  colourise: boolean;
};

const textYForButtonCentre = -11;
const buttonAppearances: {
  [BT in ButtonType]: Appearance<
    Button<BT>,
    ButtonRenderProps[BT],
    ButtonRenderContext
  >;
} = {
  jump({
    subject: { actions, colour },
    gameState,
    currentlyRenderedProps,
    previousRendering,
    renderContext: { colourise },
  }) {
    const { inputStateTracker } = gameState;

    const playable = selectCurrentPlayableItem(gameState);

    const standingOnTeleporter =
      playable?.state.standingOn?.type === "teleporter";

    const pressed = actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const needsRender =
      currentlyRenderedProps === undefined ||
      pressed !== currentlyRenderedProps.pressed ||
      colourise !== currentlyRenderedProps.colourise ||
      standingOnTeleporter !== currentlyRenderedProps.standingOnTeleporter;

    if (!needsRender) {
      return "no-update";
    }

    const container =
      previousRendering === null ?
        arcadeStyleButtonRendering({
          colourise,
          colour,
        })
      : (previousRendering as ButtonRenderingContainer);

    if (currentlyRenderedProps?.pressed !== pressed) {
      setPressed(container, pressed);
    }

    if (standingOnTeleporter !== currentlyRenderedProps?.standingOnTeleporter) {
      if (standingOnTeleporter) {
        showOnSurface(
          container,
          createSprite({
            textureId: "teleporter",
            y: 5,
          }),
          createSprite({
            animationId: "teleporter.flashing",
            y: 5,
          }),
        );
      } else {
        const jumpTextContainer = showTextInContainer(new Container(), "JUMP");
        jumpTextContainer.filters = new PaletteSwapFilter({
          white:
            colourise ?
              halfBrite(buttonColours.colourised[colour])
            : spritesheetPalette.pureBlack,
        });
        jumpTextContainer.y = textYForButtonCentre;
        showOnSurface(container, jumpTextContainer);
      }
    }

    return {
      container,
      renderProps: { pressed, standingOnTeleporter, colourise },
    };
  },
  carry({
    subject: { actions, colour },
    gameState,
    currentlyRenderedProps,
    previousRendering,
    renderContext: { colourise },
  }) {
    const { inputStateTracker } = gameState;

    const playable = selectCurrentPlayableItem(gameState)!;

    const heelsAbilities = selectHeelsAbilities(playable);
    const hasBag = heelsAbilities?.hasBag ?? false;
    const carrying = heelsAbilities?.carrying ?? null;
    const toPick = findItemToPickup(
      playable as PlayableItem<"heels" | "headOverHeels", string>,
      selectCurrentRoomState(gameState) as RoomState<SceneryName, string>,
    );

    const pressed = actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const disabled = toPick === undefined && carrying === null;

    const needsRender =
      currentlyRenderedProps === undefined ||
      pressed !== currentlyRenderedProps.pressed ||
      colourise !== currentlyRenderedProps.colourise ||
      hasBag !== currentlyRenderedProps.hasBag ||
      carrying !== currentlyRenderedProps.carrying ||
      disabled !== currentlyRenderedProps.disabled;

    if (!needsRender) {
      return "no-update";
    }

    const container =
      previousRendering === null ?
        arcadeStyleButtonRendering({
          colourise,
          colour,
        })
      : (previousRendering as ButtonRenderingContainer);

    if (!hasBag) {
      container.visible = false;
    } else {
      if (disabled !== currentlyRenderedProps?.disabled) {
        setDisabled(container, disabled, colourise);
      }

      container.visible = true;
      if (currentlyRenderedProps?.pressed !== pressed) {
        setPressed(container, pressed);
      }

      if (
        hasBag !== currentlyRenderedProps?.hasBag ||
        carrying !== currentlyRenderedProps?.carrying
      ) {
        let bgSprite: Container | undefined;
        if (carrying !== null) {
          bgSprite = createCarriedSprite(carrying);
        } else if (hasBag) {
          bgSprite = createSprite({
            textureId: "bag",
            y: -2,
          }) as Container;
        }

        showOnSurface(container, bgSprite);
      }
    }

    return {
      container,
      renderProps: { pressed, hasBag, colourise, carrying, disabled },
    };
  },
  fire({
    subject: { actions, colour },
    gameState,
    currentlyRenderedProps,
    previousRendering,
    renderContext: { colourise },
  }) {
    const { inputStateTracker } = gameState;

    const playable = selectCurrentPlayableItem(gameState)!;

    const headAbilities = selectHeadAbilities(playable);
    const hasHooter = headAbilities?.hasHooter ?? false;
    const doughnuts = headAbilities?.doughnuts ?? 0;

    const pressed = actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const needsRender =
      currentlyRenderedProps === undefined ||
      pressed !== currentlyRenderedProps.pressed ||
      colourise !== currentlyRenderedProps.colourise ||
      hasHooter !== currentlyRenderedProps.hasHooter ||
      doughnuts !== currentlyRenderedProps.doughnuts;

    if (!needsRender) {
      return "no-update";
    }

    const container =
      previousRendering === null ?
        arcadeStyleButtonRendering({
          colourise,
          colour,
        })
      : (previousRendering as ButtonRenderingContainer);

    if (!hasHooter && doughnuts === 0) {
      container.visible = false;
    } else {
      container.visible = true;
      if (currentlyRenderedProps?.pressed !== pressed) {
        setPressed(container, pressed);
      }

      if (
        hasHooter !== currentlyRenderedProps?.hasHooter ||
        doughnuts !== currentlyRenderedProps?.doughnuts
      ) {
        let bgSprite: Container | undefined;
        if (hasHooter) {
          bgSprite = createSprite({ textureId: "hooter", y: -3 });
        } else if (doughnuts > 0) {
          bgSprite = createSprite({
            textureId: "doughnuts",
            y: -2,
          }) as Container;
        }

        const doughnutsCountNumber = showTextInContainer(
          new Container(),
          String(doughnuts),
        );
        doughnutsCountNumber.y = textYForButtonCentre;
        doughnutsCountNumber.filters = hudOutlineFilter;
        showOnSurface(container, bgSprite, doughnutsCountNumber);
      }
    }

    return {
      container,
      renderProps: { pressed, colourise, doughnuts, hasHooter },
    };
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
> {
  constructor(button: Button<BT>, gameState: GameState<RoomId>) {
    super(button, gameState, buttonAppearances[button.which]);
  }
}

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
