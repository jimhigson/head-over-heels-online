import type { AnimatedSprite } from "pixi.js";

import { Container, type Renderer } from "pixi.js";

import type { RoomState } from "../../../../../model/RoomState";
import type { ButtonAppearance } from "../OnScreenButtonRenderer";

import { getSpriteSheetVariant } from "../../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { teleporterIsActive } from "../../../../physics/mechanics/teleporting";
import {
  createSprite,
  framesWithOriginalGameTimings,
} from "../../../createSprite";
import { getWhite } from "../../../gameColours/gameColours";
import { TextContainer } from "../../../text/TextContainer";
import { spritesheetVariantForHud } from "../../spritesheetVariantForHud";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { textYForButtonCentre } from "../OnScreenButtonRenderer";
import { buttonActionsPressed } from "./buttonActionsPressed";

export type JumpButtonSurfaceContainer = Container<
  AnimatedSprite | TextContainer
>;

type SurfaceContentChildren = [text: TextContainer, teleporter: AnimatedSprite];

const createSurface = (
  colourised: boolean,
  pixiRenderer: Renderer,
): JumpButtonSurfaceContainer => {
  const teleporter = createSprite({
    // this should include paused, but it isn't on the renderContext yet
    animationId: "teleporter.flashing",
    y: 5,
    spritesheetVariant: spritesheetVariantForHud(colourised),
  });
  const text = new TextContainer({
    pixiRenderer,
    text: "JUMP",
    y: textYForButtonCentre,
  });
  return new Container<AnimatedSprite | TextContainer>({
    label: "jumpButtonSurface",
    children: [
      // index 0
      text,
      // index 1
      teleporter,
    ] satisfies SurfaceContentChildren,
  });
};

export type JumpButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  isStandingOnActiveTeleporter: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
  paused: boolean;
};

export const jumpButtonAppearance: ButtonAppearance<
  "jump",
  string,
  JumpButtonRenderProps,
  ArcadeStyleButtonContainer<JumpButtonSurfaceContainer>
> = ({
  renderContext: {
    button,
    inputStateTracker,
    general: { colourised, pixiRenderer, paused },
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

  const buttonContainer =
    previousRendering ??
    new ArcadeStyleButtonContainer<JumpButtonSurfaceContainer>(
      colourised,
      button.which,
      pixiRenderer,
      createSurface(colourised, pixiRenderer),
    );

  const pressedChanged = previouslyRenderedProps?.pressed !== pressed;

  if (pressedChanged) {
    buttonContainer.pressed = pressed;
  }

  // (or is first render)
  const roomChangedSinceLastRendered =
    room !== previouslyRenderedProps?.renderedInRoom;

  const standingOnTeleporterChanged =
    isStandingOnActiveTeleporter !==
    previouslyRenderedProps?.isStandingOnActiveTeleporter;

  const pausedChanged = paused !== previouslyRenderedProps?.paused;

  const [text, teleporter] = buttonContainer.shownOnSurface
    .children as SurfaceContentChildren;

  if (pausedChanged) {
    if (paused) {
      teleporter.gotoAndStop(0);
    } else {
      teleporter.gotoAndPlay(0);
    }
  }

  if (
    !standingOnTeleporterChanged &&
    !roomChangedSinceLastRendered &&
    !pressedChanged
  ) {
    return "no-update";
  }

  if (standingOnTeleporterChanged) {
    teleporter.visible = isStandingOnActiveTeleporter;
    text.visible = !isStandingOnActiveTeleporter;
  }

  if (roomChangedSinceLastRendered) {
    const spritesheetVariant = getSpriteSheetVariant(
      spritesheetVariantForHud(colourised),
    );
    // update teleporter textures for room's spritesheet
    teleporter.textures = framesWithOriginalGameTimings(
      spritesheetVariant.animations["teleporter.flashing"],
    );
    if (!paused) {
      teleporter.gotoAndPlay(0);
    }

    text.tint = getWhite(colourised, room?.color.shade === "dimmed");

    buttonContainer.generateButtonSpriteTextures(room);
  }

  return {
    output: buttonContainer,
    renderProps: {
      pressed,
      isStandingOnActiveTeleporter,
      colourised,
      renderedInRoom: room,
      paused,
    },
  };
};
