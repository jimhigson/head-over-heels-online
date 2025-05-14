import { Container } from "pixi.js";
import { type BooleanAction } from "../../input/actions";
import { createSprite } from "../createSprite";
import type { Appearance } from "../appearance/Appearance";
import type { PlayableItem, PortableItem } from "../../physics/itemPredicates";
import {
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import type { ButtonRenderingContainer } from "./arcadeStyleButtonRendering";
import {
  arcadeStyleButtonRendering,
  createTextForButtonSurface,
  setDisabled,
  setPressed,
  showOnSurface,
} from "./arcadeStyleButtonRendering";
import { AppearanceRenderer } from "../appearance/AppearanceRenderer";
import { hudLowlightAndOutlineFilters, hudOutlineFilter } from "./hudFilters";
import { renderCarriedOnce } from "./renderCarried";
import { findItemToPickup } from "../../physics/mechanics/carrying";
import type { PokeableNumber } from "../../../model/ItemStateMap";
import { pokeableToNumber } from "../../../model/ItemStateMap";
import type { EmptyObject } from "type-fest";
import { emptyObject } from "../../../utils/empty";
import {
  makeTextContainer,
  showTextInContainer,
} from "./showNumberInContainer";
import type { RoomState } from "../../../model/RoomState";
import type { InputStateTrackerInterface } from "../../input/InputStateTracker";
import { teleporterIsActive } from "../../physics/mechanics/teleporting";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GeneralRenderContext } from "../RoomRenderContexts";

export type ButtonType =
  | "jump"
  | "carry"
  | "fire"
  | "carryAndJump"
  | "menu"
  | "map";

export type Button<Which extends ButtonType = ButtonType> = {
  id: string;
  which: Which;
  actions: BooleanAction[];
};

type CommonButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
};

type ButtonRenderProps = {
  jump: CommonButtonRenderProps & {
    standingOnTeleporter: boolean;
  };
  carry: CommonButtonRenderProps & {
    hasBag: boolean;
    carrying: PortableItem<string, string> | null;
    disabled: boolean;
  };
  fire: CommonButtonRenderProps & {
    doughnuts: PokeableNumber;
    hasHooter: boolean;
  };
  carryAndJump: CommonButtonRenderProps & {
    hasBag: boolean;
  };
  menu: EmptyObject;
  map: EmptyObject;
};

type ButtonRenderContext<BT extends ButtonType, RoomId extends string> = {
  button: Button<BT>;
  inputStateTracker: InputStateTrackerInterface;
  general: GeneralRenderContext<RoomId>;
};
type ButtonTickContext = {
  room: RoomState<string, string> | undefined;
  currentPlayable: PlayableItem | undefined;
  screenSize: Xy;
};

type ButtonAppearance<
  BT extends ButtonType,
  RoomId extends string,
> = Appearance<
  ButtonRenderContext<BT, RoomId>,
  ButtonTickContext,
  ButtonRenderProps[BT],
  BT extends "menu" | "map" ? Container : ButtonRenderingContainer
>;

const textYForButtonCentre = -11;
const buttonAppearances: {
  [BT in ButtonType]: ButtonAppearance<BT, string>;
} = {
  jump({
    renderContext: {
      button,
      inputStateTracker,
      general: { colourised },
    },
    tickContext: { room, currentPlayable },
    currentRendering,
  }) {
    const currentlyRenderedProps = currentRendering?.renderProps;
    const previousRendering = currentRendering?.output;

    const standingOnId = currentPlayable?.state.standingOnItemId ?? null;
    const standingOn =
      standingOnId === null ? null
      : room === undefined ? null
      : room.items[standingOnId];
    const isStandingOnActiveTeleporter =
      standingOn === null ? false : (
        standingOn.type === "teleporter" && teleporterIsActive(standingOn)
      );

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const container =
      previousRendering === undefined ?
        arcadeStyleButtonRendering({
          colourised,
          button,
        })
      : previousRendering;

    if (currentlyRenderedProps?.pressed !== pressed) {
      setPressed(container, pressed);
    }

    if (
      isStandingOnActiveTeleporter !==
      currentlyRenderedProps?.standingOnTeleporter
    ) {
      if (isStandingOnActiveTeleporter) {
        showOnSurface(
          container,
          createSprite({
            textureId: "teleporter",
            y: 5,
          }),
          createSprite({
            // this should include paused, but it isn't on the renderContext yet
            animationId: "teleporter.flashing",
            y: 5,
          }),
        );
      } else {
        const jumpTextContainer = createTextForButtonSurface(
          button,
          colourised,
          "JUMP",
        );
        jumpTextContainer.y = textYForButtonCentre;
        showOnSurface(container, jumpTextContainer);
      }
    }

    return {
      output: container,
      renderProps: {
        pressed,
        standingOnTeleporter: isStandingOnActiveTeleporter,
        colourised,
      },
    };
  },
  carry({ renderContext, currentRendering, tickContext }) {
    const {
      button,
      inputStateTracker,
      general: { colourised },
    } = renderContext;
    const { currentPlayable, room } = tickContext;
    const currentlyRenderedProps = currentRendering?.renderProps;
    const previousRendering = currentRendering?.output;

    const heelsAbilities =
      currentPlayable && selectHeelsAbilities(currentPlayable);
    const hasBag = heelsAbilities?.hasBag ?? false;
    const carrying = heelsAbilities?.carrying ?? null;
    const willPickUp: boolean =
      carrying === null &&
      room !== undefined &&
      findItemToPickup(
        currentPlayable as PlayableItem<"heels" | "headOverHeels", string>,
        room,
      ) !== undefined;

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const disabled = hasBag && !willPickUp && carrying === null;

    const container =
      previousRendering === undefined ?
        arcadeStyleButtonRendering({
          colourised,
          button,
        })
      : previousRendering;

    container.visible = hasBag;

    if (hasBag) {
      if (disabled !== currentlyRenderedProps?.disabled) {
        setDisabled(container, disabled, colourised);
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
          bgSprite = renderCarriedOnce(carrying, renderContext, tickContext);
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
      colourised,
      carrying,
      disabled,
    };
    return {
      output: container,
      renderProps,
    };
  },
  fire({
    renderContext: {
      button,
      inputStateTracker,
      general: { colourised },
    },
    currentRendering,
    tickContext: { currentPlayable },
  }) {
    const currentlyRenderedProps = currentRendering?.renderProps;
    const previousRendering = currentRendering?.output;

    const headAbilities =
      currentPlayable && selectHeadAbilities(currentPlayable);
    const hasHooter = headAbilities?.hasHooter ?? false;
    const doughnuts = headAbilities?.doughnuts ?? 0;

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const container =
      previousRendering === undefined ?
        arcadeStyleButtonRendering({
          colourised,
          button,
        })
      : previousRendering;

    const visible = hasHooter || pokeableToNumber(doughnuts) > 0;
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
        } else if (pokeableToNumber(doughnuts) > 0) {
          bgSprite = createSprite({
            textureId: "doughnuts",
            y: -2,
          }) as Container;
        }

        const doughnutsCountNumber = showTextInContainer(
          new Container(),
          doughnuts,
        );
        doughnutsCountNumber.y = textYForButtonCentre;
        doughnutsCountNumber.filters = hudOutlineFilter;
        showOnSurface(container, bgSprite, doughnutsCountNumber);

        setDisabled(container, doughnuts === 0, colourised);
      }
    }

    return {
      output: container,
      renderProps: { pressed, colourised, doughnuts, hasHooter },
    };
  },
  carryAndJump({
    renderContext: {
      button,
      inputStateTracker,
      general: { colourised },
    },
    currentRendering,
    tickContext: { currentPlayable },
  }) {
    const currentlyRenderedProps = currentRendering?.renderProps;
    const previousRendering = currentRendering?.output;

    const heelsAbilities =
      currentPlayable && selectHeelsAbilities(currentPlayable);
    const hasBag = heelsAbilities?.hasBag ?? false;

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const needsRender =
      currentlyRenderedProps === undefined ||
      pressed !== currentlyRenderedProps.pressed ||
      colourised !== currentlyRenderedProps.colourised ||
      hasBag !== currentlyRenderedProps.hasBag;

    if (!needsRender) {
      return "no-update";
    }

    let container: ButtonRenderingContainer;

    if (previousRendering === undefined) {
      container = arcadeStyleButtonRendering({
        colourised,
        button,
      });
      const carryText = createTextForButtonSurface(button, colourised, "C+J");
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
      output: container,
      renderProps: {
        pressed,
        hasBag,
        colourised,
      },
    };
  },
  menu({ currentRendering }) {
    if (currentRendering !== undefined) {
      return "no-update";
    }

    const sprite = createSprite("hud.char.Menu");
    sprite.scale = 2;
    sprite.filters = hudLowlightAndOutlineFilters;

    return {
      output: sprite,
      renderProps: emptyObject,
    };
  },
  map({ currentRendering }) {
    if (currentRendering !== undefined) {
      return "no-update";
    }

    const output = makeTextContainer({ label: "mapText", outline: true });
    showTextInContainer(output, "MAP");

    return {
      output,
      renderProps: emptyObject,
    };
  },
};

export class OnScreenButtonRenderer<
  BT extends ButtonType,
  RoomId extends string,
> extends AppearanceRenderer<
  ButtonRenderContext<BT, RoomId>,
  ButtonTickContext,
  ButtonRenderProps[BT],
  BT extends "menu" | "map" ? Container : ButtonRenderingContainer
> {
  constructor(renderContext: ButtonRenderContext<BT, RoomId>) {
    const appearance = buttonAppearances[
      renderContext.button.which
    ] as ButtonAppearance<BT, RoomId>;
    super(renderContext, appearance);
  }
}
