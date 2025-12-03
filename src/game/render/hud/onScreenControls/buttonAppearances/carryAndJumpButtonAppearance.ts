import type { RoomState } from "../../../../../model/RoomState";
import type { ButtonAppearance } from "../OnScreenButtonRenderer";

import { selectHeelsAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { getWhite } from "../../../gameColours/gameColours";
import { TextContainer } from "../../../text/TextContainer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { textYForButtonCentre } from "../OnScreenButtonRenderer";
import { buttonActionsPressed } from "./buttonActionsPressed";

export type CarryAndJumpButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  hasBag: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
};

export const carryAndJumpButtonAppearance: ButtonAppearance<
  "carryAndJump",
  string,
  CarryAndJumpButtonRenderProps,
  ArcadeStyleButtonContainer<TextContainer>
> = ({
  renderContext: {
    button,
    inputStateTracker,
    general: { colourised, pixiRenderer },
  },
  currentRendering,
  tickContext: { currentPlayable, room },
}) => {
  const previouslyRenderedProps = currentRendering?.renderProps;
  const previousRendering = currentRendering?.output;

  const heelsAbilities =
    currentPlayable && selectHeelsAbilities(currentPlayable);
  const hasBag = heelsAbilities?.hasBag ?? false;

  const pressed = buttonActionsPressed(button.actions, inputStateTracker);

  const needsRender =
    previouslyRenderedProps === undefined ||
    pressed !== previouslyRenderedProps.pressed ||
    colourised !== previouslyRenderedProps.colourised ||
    hasBag !== previouslyRenderedProps.hasBag;

  // (or is first render)
  const roomChangedSinceLastRendered =
    room !== previouslyRenderedProps?.renderedInRoom;

  if (!needsRender && !roomChangedSinceLastRendered) {
    return "no-update";
  }

  const container: ArcadeStyleButtonContainer<TextContainer> =
    previousRendering === undefined ?
      new ArcadeStyleButtonContainer(
        colourised,
        button.which,
        pixiRenderer,
        new TextContainer({
          pixiRenderer,
          text: "C+J",
          y: textYForButtonCentre,
        }),
      )
    : previousRendering;

  if (roomChangedSinceLastRendered) {
    container.generateButtonSpriteTextures(room);
    container.shownOnSurface.tint = getWhite(
      colourised,
      room?.color.shade === "dimmed",
    );
  }

  if (!hasBag) {
    container.visible = false;
  } else {
    container.visible = true;
    if (previouslyRenderedProps?.pressed !== pressed) {
      container.pressed = pressed;
    }
  }

  return {
    output: container,
    renderProps: {
      pressed,
      hasBag,
      colourised,
      renderedInRoom: room,
    },
  };
};
