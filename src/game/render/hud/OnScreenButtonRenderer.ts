import type { Container } from "pixi.js";
import type { EmptyObject } from "type-fest";

import type { PokeableNumber } from "../../../model/ItemStateMap";
import type { RoomState } from "../../../model/RoomState";
import type { Xy } from "../../../utils/vectors/vectors";
import type { InputStateTrackerInterface } from "../../input/InputStateTracker";
import type { PlayableItem, PortableItem } from "../../physics/itemPredicates";
import type { Appearance } from "../appearance/Appearance";
import type { GeneralRenderContext } from "../room/RoomRenderContexts";
import type { ButtonRenderingContainer } from "./arcadeStyleButtonRendering";

import { pokeableToNumber } from "../../../model/ItemStateMap";
import { emptyObject } from "../../../utils/empty";
import {
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { type BooleanAction } from "../../input/actions";
import { findItemToPickup } from "../../physics/mechanics/pickingUp";
import { teleporterIsActive } from "../../physics/mechanics/teleporting";
import { AppearanceRenderer } from "../appearance/AppearanceRenderer";
import { createSprite } from "../createSprite";
import { TextContainer } from "../text/TextContainer";
import {
  arcadeStyleButtonRendering,
  setDisabled,
  setPressed,
  showOnSurface,
} from "./arcadeStyleButtonRendering";
import { renderCarriedOnce } from "./renderCarried";
import { tintForHud } from "./spritesheetVariantForHud";

export type ButtonType =
  | "carry"
  | "carryAndJump"
  | "fire"
  | "jump"
  | "map"
  | "menu";

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
    renderedInRoom: RoomState<string, string> | undefined;
  };
  carry: CommonButtonRenderProps & {
    hasBag: boolean;
    carrying: null | PortableItem<string, string>;
    disabled: boolean;
    renderedInRoom: RoomState<string, string> | undefined;
  };
  fire: CommonButtonRenderProps & {
    doughnuts: PokeableNumber;
    hasHooter: boolean;
    renderedInRoom: RoomState<string, string> | undefined;
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
  room: RoomState<string, string>;
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
  BT extends "map" | "menu" ? Container : ButtonRenderingContainer
>;

const textYForButtonCentre = -11;
const buttonAppearances: {
  [BT in ButtonType]: ButtonAppearance<BT, string>;
} = {
  jump({
    renderContext: {
      button,
      inputStateTracker,
      general: { colourised, pixiRenderer },
    },
    tickContext: { room, currentPlayable },
    currentRendering,
  }) {
    const previouslyRenderedProps = currentRendering?.renderProps;
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

    if (previouslyRenderedProps?.pressed !== pressed) {
      setPressed(container, pressed);
    }

    if (
      isStandingOnActiveTeleporter !==
        previouslyRenderedProps?.standingOnTeleporter ||
      room !== previouslyRenderedProps?.renderedInRoom
    ) {
      if (isStandingOnActiveTeleporter) {
        showOnSurface(
          container,
          createSprite({
            // this should include paused, but it isn't on the renderContext yet
            animationId: "teleporter.flashing",
            y: 5,
            spritesheetVariant:
              colourised ? "for-current-room" : "uncolourised",
          }),
        );
      } else {
        const jumpTextContainer = new TextContainer({
          pixiRenderer,
          text: "JUMP",
          y: textYForButtonCentre,
        });
        showOnSurface(container, jumpTextContainer);
      }
    }

    return {
      output: container,
      renderProps: {
        pressed,
        standingOnTeleporter: isStandingOnActiveTeleporter,
        colourised,
        renderedInRoom: room,
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
    const previouslyRenderedProps = currentRendering?.renderProps;
    const previousRendering = currentRendering?.output;

    const heelsAbilities =
      currentPlayable && selectHeelsAbilities(currentPlayable);
    const hasBag = heelsAbilities?.hasBag ?? false;
    const carrying = heelsAbilities?.carrying ?? null;
    const willPickUp: boolean =
      carrying === null &&
      room !== undefined &&
      findItemToPickup(
        currentPlayable as PlayableItem<"headOverHeels" | "heels", string>,
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
      if (disabled !== previouslyRenderedProps?.disabled) {
        setDisabled(container, disabled, colourised);
      }

      container.visible = true;
      if (previouslyRenderedProps?.pressed !== pressed) {
        setPressed(container, pressed);
      }

      if (
        !previouslyRenderedProps?.hasBag ||
        carrying !== previouslyRenderedProps?.carrying ||
        room !== previouslyRenderedProps?.renderedInRoom
      ) {
        let bgSprite: Container | undefined;
        if (carrying !== null) {
          bgSprite = renderCarriedOnce(
            carrying,
            renderContext,
            tickContext.room,
          );
        } else if (hasBag) {
          bgSprite = createSprite({
            textureId: "bag",
            y: -2,
            spritesheetVariant:
              colourised ? "for-current-room" : "uncolourised",
          }) as Container;
        }

        showOnSurface(container, bgSprite);
      }
    }

    return {
      output: container,
      renderProps: {
        pressed,
        hasBag,
        colourised,
        carrying,
        disabled,
        renderedInRoom: room,
      },
    };
  },
  fire({
    renderContext: {
      button,
      inputStateTracker,
      general: { colourised, pixiRenderer },
    },
    currentRendering,
    tickContext: { currentPlayable, room },
  }) {
    const previouslyRenderedProps = currentRendering?.renderProps;
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
      if (previouslyRenderedProps?.pressed !== pressed) {
        setPressed(container, pressed);
      }

      if (
        hasHooter !== previouslyRenderedProps?.hasHooter ||
        doughnuts !== previouslyRenderedProps?.doughnuts ||
        room !== previouslyRenderedProps?.renderedInRoom
      ) {
        let bgSprite: Container | undefined;
        if (hasHooter) {
          bgSprite = createSprite({
            textureId: "hooter",
            y: -3,
            spritesheetVariant:
              colourised ? "for-current-room" : "uncolourised",
          });
        } else if (pokeableToNumber(doughnuts) > 0) {
          bgSprite = createSprite({
            textureId: "doughnuts",
            y: -2,
            spritesheetVariant:
              colourised ? "for-current-room" : "uncolourised",
          }) as Container;
        }

        const doughnutsCountNumber = new TextContainer({
          pixiRenderer,
          text: doughnuts,
          outline: true,
          y: textYForButtonCentre,
        });
        showOnSurface(container, bgSprite, doughnutsCountNumber);

        setDisabled(container, doughnuts === 0, colourised);
      }
    }

    return {
      output: container,
      renderProps: {
        pressed,
        colourised,
        doughnuts,
        hasHooter,
        renderedInRoom: room,
      },
    };
  },
  carryAndJump({
    renderContext: {
      button,
      inputStateTracker,
      general: { colourised, pixiRenderer },
    },
    currentRendering,
    tickContext: { currentPlayable },
  }) {
    const previouslyRenderedProps = currentRendering?.renderProps;
    const previousRendering = currentRendering?.output;

    const heelsAbilities =
      currentPlayable && selectHeelsAbilities(currentPlayable);
    const hasBag = heelsAbilities?.hasBag ?? false;

    const pressed = button.actions.every(
      (a) => inputStateTracker.currentActionPress(a) !== "released",
    );

    const needsRender =
      previouslyRenderedProps === undefined ||
      pressed !== previouslyRenderedProps.pressed ||
      colourised !== previouslyRenderedProps.colourised ||
      hasBag !== previouslyRenderedProps.hasBag;

    if (!needsRender) {
      return "no-update";
    }

    let container: ButtonRenderingContainer;

    if (previousRendering === undefined) {
      container = arcadeStyleButtonRendering({
        colourised,
        button,
      });
      const carryText = new TextContainer({
        pixiRenderer,
        text: "C+J",
        y: textYForButtonCentre,
      });
      showOnSurface(container, carryText);
    } else {
      container = previousRendering;
    }

    if (!hasBag) {
      container.visible = false;
    } else {
      container.visible = true;
      if (previouslyRenderedProps?.pressed !== pressed) {
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
  menu({ currentRendering, tickContext, renderContext }) {
    if (currentRendering !== undefined) {
      currentRendering.output!.tint = tintForHud(
        renderContext.general.colourised,
        tickContext.room.color,
        false,
      );
      return "no-update";
    }

    const sprite = createSprite({
      textureId: "hud.char.Menu",
      spritesheetVariant: "original",
    });
    sprite.scale = 2;

    return {
      output: sprite,
      renderProps: emptyObject,
    };
  },
  map({ currentRendering, tickContext, renderContext }) {
    if (currentRendering !== undefined) {
      currentRendering.output!.tint = tintForHud(
        renderContext.general.colourised,
        tickContext.room.color,
        false,
      );
      return "no-update";
    }

    const output = new TextContainer({
      pixiRenderer: renderContext.general.pixiRenderer,
      label: "mapText",
      outline: true,
      text: "MAP",
    });

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
  BT extends "map" | "menu" ? Container : ButtonRenderingContainer
> {
  constructor(renderContext: ButtonRenderContext<BT, RoomId>) {
    const appearance = buttonAppearances[
      renderContext.button.which
    ] as ButtonAppearance<BT, RoomId>;
    super(renderContext, appearance);
  }
}
