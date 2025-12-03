import type { Renderer, Sprite } from "pixi.js";

import { Container } from "pixi.js";

import type { PokeableNumber } from "../../../../../model/ItemStateMap";
import type { RoomState } from "../../../../../model/RoomState";
import type { ButtonAppearance } from "./buttonTypes";

export type FireButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  doughnuts: PokeableNumber;
  hasHooter: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
};

import { pokeableToNumber } from "../../../../../model/ItemStateMap";
import { selectHeadAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { createSprite } from "../../../createSprite";
import { TextContainer } from "../../../text/TextContainer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { spritesheetVariantForHud } from "../../spritesheetVariantForHud";
import { buttonActionsPressed } from "./buttonActionsPressed";
import { textYForButtonCentre } from "./buttonTypes";

const makeSurfaceContent = ({
  hasHooter,
  doughnuts,
  colourised,
  pixiRenderer,
}: {
  hasHooter: boolean;
  doughnuts: PokeableNumber;
  colourised: boolean;
  pixiRenderer: Renderer;
}): Container<Sprite | TextContainer> => {
  const surfaceContent = new Container<Sprite | TextContainer>({
    label: "fireButtonSurface",
  });

  if (hasHooter) {
    surfaceContent.addChild(
      createSprite({
        textureId: "hooter",
        y: -3,
        spritesheetVariant: spritesheetVariantForHud(colourised),
      }),
    );
  } else if (pokeableToNumber(doughnuts) > 0) {
    surfaceContent.addChild(
      createSprite({
        textureId: "doughnuts",
        y: -2,
        spritesheetVariant: spritesheetVariantForHud(colourised),
      }),
    );
  }

  surfaceContent.addChild(
    new TextContainer({
      pixiRenderer,
      text: doughnuts,
      outline: true,
      y: textYForButtonCentre,
    }),
  );

  return surfaceContent;
};

export const fireButtonAppearance: ButtonAppearance<
  "fire",
  string,
  ArcadeStyleButtonContainer<Container<Sprite | TextContainer>>
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

  const headAbilities = currentPlayable && selectHeadAbilities(currentPlayable);
  const hasHooter = headAbilities?.hasHooter ?? false;
  const doughnuts = headAbilities?.doughnuts ?? 0;

  const pressed = buttonActionsPressed(button.actions, inputStateTracker);

  const container =
    previousRendering ??
    new ArcadeStyleButtonContainer<Container<Sprite | TextContainer>>(
      colourised,
      button.which,
      pixiRenderer,
    );

  // (or is first render)
  const roomChangedSinceLastRendered =
    room !== previouslyRenderedProps?.renderedInRoom;

  if (roomChangedSinceLastRendered) {
    container.generateButtonSpriteTextures(room);
  }

  const visible = hasHooter || pokeableToNumber(doughnuts) > 0;
  container.visible = visible;

  if (visible) {
    if (previouslyRenderedProps?.pressed !== pressed) {
      container.setPressed(pressed);
    }

    if (
      hasHooter !== previouslyRenderedProps?.hasHooter ||
      doughnuts !== previouslyRenderedProps?.doughnuts ||
      room !== previouslyRenderedProps?.renderedInRoom
    ) {
      container.shownOnSurface = makeSurfaceContent({
        hasHooter,
        doughnuts,
        colourised,
        pixiRenderer,
      });

      container.setDisabled(doughnuts === 0, colourised);
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
};
