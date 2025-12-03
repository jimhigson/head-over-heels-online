import type { RoomState } from "../../../../../model/RoomState";
import type {
  PlayableItem,
  PortableItem,
} from "../../../../physics/itemPredicates";
import type { ButtonAppearance } from "./buttonTypes";

export type CarryButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  hasBag: boolean;
  carrying: null | PortableItem<string, string>;
  disabled: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
};

import { selectHeelsAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { findItemToPickup } from "../../../../physics/mechanics/pickingUp";
import { createSprite } from "../../../createSprite";
import { renderCarriedOnce } from "../../renderCarried";
import { spritesheetVariantForHud } from "../../spritesheetVariantForHud";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { buttonActionsPressed } from "./buttonActionsPressed";

export const carryButtonAppearance: ButtonAppearance<
  "carry",
  string,
  ArcadeStyleButtonContainer
> = ({ renderContext, currentRendering, tickContext }) => {
  const {
    button,
    inputStateTracker,
    general: { colourised, pixiRenderer },
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

  const pressed = buttonActionsPressed(button.actions, inputStateTracker);

  const disabled = hasBag && !willPickUp && carrying === null;

  const container =
    previousRendering ??
    new ArcadeStyleButtonContainer(colourised, button.which, pixiRenderer);

  // (or is first render)
  const roomChangedSinceLastRendered =
    room !== previouslyRenderedProps?.renderedInRoom;

  if (roomChangedSinceLastRendered) {
    container.generateButtonSpriteTextures(room);
  }

  container.visible = hasBag;

  if (hasBag) {
    if (disabled !== previouslyRenderedProps?.disabled) {
      container.setDisabled(disabled, colourised);
    }

    container.visible = true;
    if (previouslyRenderedProps?.pressed !== pressed) {
      container.setPressed(pressed);
    }

    if (
      !previouslyRenderedProps?.hasBag ||
      carrying !== previouslyRenderedProps?.carrying ||
      room !== previouslyRenderedProps?.renderedInRoom
    ) {
      container.shownOnSurface =
        carrying !== null ?
          renderCarriedOnce(carrying, renderContext, tickContext.room)
        : createSprite({
            textureId: "bag",
            y: -2,
            spritesheetVariant: spritesheetVariantForHud(colourised),
          });
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
};
