import type { Sprite } from "pixi.js";

import type { RoomState } from "../../../../../model/RoomState";
import type { ButtonAppearance } from "./buttonTypes";

export type JumpButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  standingOnTeleporter: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
};

import { teleporterIsActive } from "../../../../physics/mechanics/teleporting";
import { createSprite } from "../../../createSprite";
import { TextContainer } from "../../../text/TextContainer";
import { spritesheetVariantForHud } from "../../spritesheetVariantForHud";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { buttonActionsPressed } from "./buttonActionsPressed";
import { textYForButtonCentre } from "./buttonTypes";

export const jumpButtonAppearance: ButtonAppearance<
  "jump",
  string,
  ArcadeStyleButtonContainer<Sprite | TextContainer>
> = ({
  renderContext: {
    button,
    inputStateTracker,
    general: { colourised, pixiRenderer },
  },
  tickContext: { room, currentPlayable },
  currentRendering,
}) => {
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

  const pressed = buttonActionsPressed(button.actions, inputStateTracker);

  const container =
    previousRendering ??
    new ArcadeStyleButtonContainer(colourised, button.which, pixiRenderer);

  if (previouslyRenderedProps?.pressed !== pressed) {
    container.setPressed(pressed);
  }

  // (or is first render)
  const roomChangedSinceLastRendered =
    room !== previouslyRenderedProps?.renderedInRoom;

  if (
    isStandingOnActiveTeleporter !==
      previouslyRenderedProps?.standingOnTeleporter ||
    roomChangedSinceLastRendered
  ) {
    if (isStandingOnActiveTeleporter) {
      container.shownOnSurface = createSprite({
        // this should include paused, but it isn't on the renderContext yet
        animationId: "teleporter.flashing",
        y: 5,
        spritesheetVariant: spritesheetVariantForHud(colourised),
      });
    } else {
      container.shownOnSurface = new TextContainer({
        pixiRenderer,
        text: "JUMP",
        y: textYForButtonCentre,
      });
    }
  }

  if (roomChangedSinceLastRendered) {
    container.generateButtonSpriteTextures(room);
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
};
