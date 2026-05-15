import type { Renderer, Sprite } from "pixi.js";

import { Container } from "pixi.js";

import type { PokeableNumber } from "../../../../../model/ItemStateMap";
import type { RoomState } from "../../../../../model/RoomState";
import type { ButtonAppearance } from "../../HudButtonRenderer";

import { pokeableToNumber } from "../../../../../model/ItemStateMap";
import { getSpriteSheetVariant } from "../../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { selectHeadAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { createSprite } from "../../../createSprite";
import { getWhite } from "../../../gameColours/gameColours";
import { TextContainer } from "../../../text/TextContainer";
import { textYForButtonCentre } from "../../HudButtonRenderer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
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
    general: { spriteOption, spritesheetMeta, pixiRenderer },
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
      spritesheetMeta,
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
      spriteOption.uncolourised ? "uncolourised"
      : disabled ? "deactivated"
      : "for-current-room",
    );

    hooter.texture = spritesheet.textures["hooter"];
    doughnuts.texture = spritesheet.textures["doughnuts"];
    text.colour = getWhite(spriteOption, room.color.shade === "dimmed");
  }

  if (doughnutsCount !== previouslyRenderedProps?.doughnutsCount) {
    text.text = doughnutsCount === "infinite" ? "∞" : doughnutsCount;
  }

  return {
    output: container,
    renderProps: {
      pressed,
      showingSprite,
      renderedInRoom: room,
      disabled,
      doughnutsCount,
    } satisfies FireButtonRenderProps,
  };
};
