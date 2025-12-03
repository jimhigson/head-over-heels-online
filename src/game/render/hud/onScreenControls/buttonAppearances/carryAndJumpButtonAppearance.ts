import type { RoomState } from "../../../../../model/RoomState";
import type { ButtonAppearance } from "./buttonTypes";

export type CarryAndJumpButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  hasBag: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
};

import { selectHeelsAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { TextContainer } from "../../../text/TextContainer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { buttonActionsPressed } from "./buttonActionsPressed";
import { textYForButtonCentre } from "./buttonTypes";

export const carryAndJumpButtonAppearance: ButtonAppearance<
  "carryAndJump",
  string,
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

  let container: ArcadeStyleButtonContainer<TextContainer>;

  if (previousRendering === undefined) {
    container = new ArcadeStyleButtonContainer(
      colourised,
      button.which,
      pixiRenderer,
    );
    container.shownOnSurface = new TextContainer({
      pixiRenderer,
      text: "C+J",
      y: textYForButtonCentre,
    });
  } else {
    container = previousRendering as ArcadeStyleButtonContainer<TextContainer>;
  }

  if (roomChangedSinceLastRendered) {
    container.generateButtonSpriteTextures(room);
  }

  if (!hasBag) {
    container.visible = false;
  } else {
    container.visible = true;
    if (previouslyRenderedProps?.pressed !== pressed) {
      container.setPressed(pressed);
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
