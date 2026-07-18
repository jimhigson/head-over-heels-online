import { type BitmapText } from "pixi.js";

import { type RoomState } from "../../../../../model/RoomState";
import { selectHeelsAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { getWhite } from "../../../gameColours/gameColours";
import { createHudText } from "../../../text/createHudText";
import {
  type ButtonAppearance,
  textYForButtonCentre,
} from "../../HudButtonRenderer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { buttonActionsPressed } from "./buttonActionsPressed";

export type CarryAndJumpButtonRenderProps = {
  pressed: boolean;
  hasBag: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
};

export const carryAndJumpButtonAppearance: ButtonAppearance<
  "carryAndJump",
  string,
  CarryAndJumpButtonRenderProps,
  ArcadeStyleButtonContainer<BitmapText>
> = ({
  renderContext: {
    button,
    inputStateTracker,
    general: {
      spriteOption,
      spritesheetVariants,
      spritesheetMeta,
      pixiRenderer,
    },
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
    hasBag !== previouslyRenderedProps.hasBag;

  // (or is first render)
  const roomChangedSinceLastRendered =
    room !== previouslyRenderedProps?.renderedInRoom;

  if (!needsRender && !roomChangedSinceLastRendered) {
    return "no-update";
  }

  const { originalSpritesheet } = spritesheetVariants;
  const container: ArcadeStyleButtonContainer<BitmapText> =
    previousRendering === undefined ?
      new ArcadeStyleButtonContainer(
        spritesheetMeta,
        button.which,
        pixiRenderer,
        originalSpritesheet,
        createHudText({
          text: "C+J",
          y: textYForButtonCentre,
        }),
      )
    : previousRendering;

  if (roomChangedSinceLastRendered) {
    container.generateButtonSpriteTextures(room);
    container.shownOnSurface.tint = getWhite(
      spriteOption,
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
      renderedInRoom: room,
    },
  };
};
