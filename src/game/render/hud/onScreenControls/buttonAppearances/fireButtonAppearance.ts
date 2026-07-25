import { Container, type Renderer, type Sprite } from "pixi.js";

import {
  type PokeableNumber,
  pokeableToNumber,
} from "../../../../../model/ItemStateMap";
import { type RoomState } from "../../../../../model/RoomState";
import { type AppSpritesheetWithVariants } from "../../../../../sprites/spritesheet/AppSpritesheet";
import { variantTextureId } from "../../../../../sprites/spritesheet/variantTextureId";
import { selectHeadAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { createSprite } from "../../../createSprite";
import { getWhite } from "../../../gameColours/gameColours";
import { TextContainer } from "../../../text/TextContainer";
import {
  type ButtonAppearance,
  textYForButtonCentre,
} from "../../HudButtonRenderer";
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
  spritesheet: AppSpritesheetWithVariants,
  resolution: number,
): Container<Sprite | TextContainer> => {
  const hooter = createSprite({
    textureId: "hooter",
    y: -3,
    spritesheet,
  });

  const doughnuts = createSprite({
    textureId: "doughnuts",
    y: -2,
    spritesheet,
  });

  const text = new TextContainer({
    pixiRenderer,
    resolution,
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
    general: { spriteOption, spritesheets, pixiRenderer },
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

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
  const container =
    currentRendering?.output ??
    new ArcadeStyleButtonContainer<Container<Sprite | TextContainer>>(
      button.which,
      spritesheets.originalSpritesheet,
      createSurface(pixiRenderer, spritesheet, spritesheets.bakeFactor),
    );

  if (roomChanged) {
    container.setSpritesheet(spritesheet);
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
    hooter.texture =
      spritesheet.textures[
        variantTextureId("hooter", false, false, disabled, false)
      ];
    doughnuts.texture =
      spritesheet.textures[
        variantTextureId("doughnuts", false, false, disabled, false)
      ];
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
