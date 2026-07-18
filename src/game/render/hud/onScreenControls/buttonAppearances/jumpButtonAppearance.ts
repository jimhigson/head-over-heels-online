import { type AnimatedSprite, type BitmapText, Container } from "pixi.js";

import { type RoomState } from "../../../../../model/RoomState";
import { type SpritesheetVariants } from "../../../../../sprites/spritesheet/variants/SpritesheetVariants";
import { teleporterIsActive } from "../../../../physics/mechanics/teleporting";
import {
  createSprite,
  framesWithOriginalGameTimings,
} from "../../../createSprite";
import { getWhite } from "../../../gameColours/gameColours";
import { createHudText } from "../../../text/createHudText";
import {
  type ButtonAppearance,
  textYForButtonCentre,
} from "../../HudButtonRenderer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { buttonActionsPressed } from "./buttonActionsPressed";

export type JumpButtonSurfaceContainer = Container<AnimatedSprite | BitmapText>;

type SurfaceContentChildren = [text: BitmapText, teleporter: AnimatedSprite];

const createSurface = (
  spritesheetVariants: SpritesheetVariants,
): JumpButtonSurfaceContainer => {
  const teleporter = createSprite({
    // this should include paused, but it isn't on the renderContext yet
    animationId: "teleporter.flashing",
    y: 5,
    spritesheet: spritesheetVariants.currentMainSpritesheet(
      false,
      false,
      false,
    ),
  });
  const text = createHudText({
    text: "JUMP",
    y: textYForButtonCentre,
  });
  return new Container<AnimatedSprite | BitmapText>({
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
    general: {
      spriteOption,
      spritesheetVariants,
      spritesheetMeta,
      pixiRenderer,
      paused,
    },
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
      spritesheetMeta,
      button.which,
      pixiRenderer,
      spritesheetVariants.originalSpritesheet,
      createSurface(spritesheetVariants),
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
    // update teleporter textures for room's spritesheet
    const variantSpritesheet = spritesheetVariants.currentMainSpritesheet(
      false,
      false,
      false,
    );
    teleporter.textures = framesWithOriginalGameTimings(
      variantSpritesheet.animations["teleporter.flashing"],
    );
    if (!paused) {
      teleporter.gotoAndPlay(0);
    }

    text.tint = getWhite(spriteOption, room?.color.shade === "dimmed");

    buttonContainer.generateButtonSpriteTextures(room);
  }

  return {
    output: buttonContainer,
    renderProps: {
      pressed,
      isStandingOnActiveTeleporter,
      renderedInRoom: room,
      paused,
    },
  };
};
