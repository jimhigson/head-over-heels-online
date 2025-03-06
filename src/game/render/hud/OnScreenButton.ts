import { Container } from "pixi.js";
import { type BooleanAction } from "../../input/actions";
import { createSprite } from "../createSprite";
import type { GameState } from "../../gameState/GameState";
import { selectCurrentRoomState } from "../../gameState/GameState";
import type { Appearance } from "../appearance/Appearance";
import type { PlayableItem } from "../../physics/itemPredicates";
import {
  selectCurrentPlayableItem,
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { showTextInContainer } from "./showNumberInContainer";
import type { ButtonRenderingContainer } from "./arcadeStyleButtonRendering";
import {
  arcadeStyleButtonRendering,
  createTextForButtonSurface,
  setDisabled,
  setPressed,
  showOnSurface,
} from "./arcadeStyleButtonRendering";
import { AppearanceRenderer } from "../appearance/AppearanceRenderer";
import { hudOutlineFilter } from "./hudFilters";
import { createCarriedSprite } from "./createCarriedSprite";
import { findItemToPickup } from "../../physics/mechanics/carrying";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { CarriedItem } from "../../../model/ItemStateMap";
import type { ButtonColor } from "./buttonColours";

export type ButtonType = "jump" | "carry" | "fire" | "carryAndJump"; // | "menu"

export type Button<Which extends ButtonType = ButtonType> = {
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
    hasBag: boolean;
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
    ButtonRenderContext,
    ButtonRenderingContainer
  >;
} = {
  jump({
    subject: button,
    gameState,
    currentlyRenderedProps,
    previousRendering,
    renderContext: { colourise },
  }) {
    const { inputStateTracker } = gameState;

    const playable = selectCurrentPlayableItem(gameState);

    const standingOnTeleporter =
      playable?.state.standingOn?.type === "teleporter";

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const container =
      previousRendering === null ?
        arcadeStyleButtonRendering({
          colourise,
          button,
        })
      : previousRendering;

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
        const jumpTextContainer = createTextForButtonSurface(
          button,
          colourise,
          "JUMP",
        );
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
    subject: button,
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
    const willPickUp: boolean =
      carrying === null &&
      findItemToPickup(
        playable as PlayableItem<"heels" | "headOverHeels", string>,
        selectCurrentRoomState(gameState) as RoomState<SceneryName, string>,
      ) !== undefined;

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const disabled = hasBag && !willPickUp && carrying === null;

    const container =
      previousRendering === null ?
        arcadeStyleButtonRendering({
          colourise,
          button,
        })
      : previousRendering;

    container.visible = hasBag;

    if (hasBag) {
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

    const renderProps: ButtonRenderProps["carry"] = {
      pressed,
      hasBag,
      colourise,
      carrying,
      disabled,
    };
    return {
      container,
      renderProps,
    };
  },
  fire({
    subject: button,
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

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const container =
      previousRendering === null ?
        arcadeStyleButtonRendering({
          colourise,
          button,
        })
      : previousRendering;

    const visible = hasHooter || doughnuts > 0;
    container.visible = visible;

    if (visible) {
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

        setDisabled(container, doughnuts === 0, colourise);
      }
    }

    return {
      container,
      renderProps: { pressed, colourise, doughnuts, hasHooter },
    };
  },
  carryAndJump({
    subject: button,
    gameState,
    currentlyRenderedProps,
    previousRendering,
    renderContext: { colourise },
  }) {
    const { inputStateTracker } = gameState;

    const playable = selectCurrentPlayableItem(gameState)!;
    const heelsAbilities = selectHeelsAbilities(playable);
    const hasBag = heelsAbilities?.hasBag ?? false;

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const needsRender =
      currentlyRenderedProps === undefined ||
      pressed !== currentlyRenderedProps.pressed ||
      colourise !== currentlyRenderedProps.colourise ||
      hasBag !== currentlyRenderedProps.hasBag;

    if (!needsRender) {
      return "no-update";
    }

    let container: ButtonRenderingContainer;

    if (previousRendering === null) {
      container = arcadeStyleButtonRendering({
        colourise,
        button,
      });
      const carryText = createTextForButtonSurface(button, colourise, "C+J");
      carryText.y = textYForButtonCentre;
      showOnSurface(container, carryText);
    } else {
      container = previousRendering;
    }

    if (!hasBag) {
      container.visible = false;
    } else {
      container.visible = true;
      if (currentlyRenderedProps?.pressed !== pressed) {
        setPressed(container, pressed);
      }
    }

    return {
      container,
      renderProps: {
        pressed,
        hasBag,
        colourise,
      },
    };
  },
};

export class ButtonAppearanceRenderer<
  BT extends ButtonType,
  RoomId extends string,
> extends AppearanceRenderer<
  Button<BT>,
  ButtonRenderProps[BT],
  RoomId,
  ButtonRenderContext,
  ButtonRenderingContainer
> {
  constructor(
    public button: Button<BT>,
    gameState: GameState<RoomId>,
  ) {
    super(button, gameState, buttonAppearances[button.which]);
  }
}
