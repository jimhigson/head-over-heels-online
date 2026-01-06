import type { Renderer, Sprite } from "pixi.js";

import { Container } from "pixi.js";

import type { PokeableNumber } from "../../../../../model/ItemStateMap";
import type { RoomState } from "../../../../../model/RoomState";
import type { ButtonAppearance } from "../OnScreenButtonRenderer";

import { pokeableToNumber } from "../../../../../model/ItemStateMap";
import { getSpriteSheetVariant } from "../../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { selectHeadAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { createSprite } from "../../../createSprite";
import { getWhite } from "../../../gameColours/gameColours";
import { TextContainer } from "../../../text/TextContainer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { textYForButtonCentre } from "../OnScreenButtonRenderer";
import { buttonActionsPressed } from "./buttonActionsPressed";

type ShowingSprite = "doughnuts" | "hooter" | "none";

type SurfaceContentChildren = [
  hooter: Sprite,
  doughnuts: Sprite,
  text: TextContainer,
];

const createSurface = (
  pixiRenderer: Renderer,
): Container<Sprite | TextContainer> => {
  const hooter = createSprite({
    textureId: "hooter",
    y: -3,
    spritesheetVariant: "original",
  });

  const doughnuts = createSprite({
    textureId: "doughnuts",
    y: -2,
    spritesheetVariant: "original",
  });

  const text = new TextContainer({
    pixiRenderer,
    outline: true,
    y: textYForButtonCentre,
  });

  return new Container<Sprite | TextContainer>({
    label: "fireButtonSurface",
    children: [hooter, doughnuts, text] satisfies SurfaceContentChildren,
  });
};

export type FireButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  showingSprite: ShowingSprite;
  renderedInRoom: RoomState<string, string> | undefined;
  disabled: boolean;
  doughnutsCount: PokeableNumber;
};

export const fireButtonAppearance: ButtonAppearance<
  "fire",
  string,
  FireButtonRenderProps,
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
  const headAbilities = currentPlayable && selectHeadAbilities(currentPlayable);
  const hasHooter = headAbilities?.hasHooter ?? false;
  const doughnutsCount = headAbilities?.doughnuts ?? 0;

  const pressed = buttonActionsPressed(button.actions, inputStateTracker);
  const disabled = doughnutsCount === 0;

  const showingSprite: ShowingSprite =
    hasHooter ? "hooter"
    : pokeableToNumber(doughnutsCount) > 0 ? "doughnuts"
    : "none";

  const previouslyRenderedProps = currentRendering?.renderProps;

  // (or is first render)
  const roomChanged = room !== previouslyRenderedProps?.renderedInRoom;

  const pressedChanged = pressed !== previouslyRenderedProps?.pressed;

  const disabledChanged = disabled !== previouslyRenderedProps?.disabled;

  const spriteChanged =
    showingSprite !== previouslyRenderedProps?.showingSprite;

  if (
    previouslyRenderedProps !== undefined &&
    colourised === previouslyRenderedProps.colourised &&
    spriteChanged &&
    !disabledChanged &&
    !pressedChanged &&
    !roomChanged
  ) {
    return "no-update";
  }

  const container =
    currentRendering?.output ??
    new ArcadeStyleButtonContainer<Container<Sprite | TextContainer>>(
      colourised,
      button.which,
      pixiRenderer,
      createSurface(pixiRenderer),
    );

  if (roomChanged) {
    container.generateButtonSpriteTextures(room);
  }

  container.visible = showingSprite !== "none";

  if (pressedChanged) {
    container.pressed = pressed;
  }

  const [hooter, doughnuts, text] = container.shownOnSurface
    .children as SurfaceContentChildren;

  if (spriteChanged) {
    // new sprites for the buttons:

    hooter.visible = showingSprite === "hooter";
    doughnuts.visible = showingSprite === "doughnuts";
  }

  if (disabledChanged || roomChanged) {
    const spritesheet = getSpriteSheetVariant(
      colourised ?
        disabled ? "deactivated"
        : "for-current-room"
      : "uncolourised",
    );

    hooter.texture = spritesheet.textures["hooter"];
    doughnuts.texture = spritesheet.textures["doughnuts"];
    text.tint = getWhite(colourised, room.color.shade === "dimmed");
  }

  if (doughnutsCount !== previouslyRenderedProps?.doughnutsCount) {
    text.text = pokeableToNumber(doughnutsCount);
  }

  return {
    output: container,
    renderProps: {
      pressed,
      colourised,
      showingSprite,
      renderedInRoom: room,
      disabled,
      doughnutsCount,
    } satisfies FireButtonRenderProps,
  };
};
