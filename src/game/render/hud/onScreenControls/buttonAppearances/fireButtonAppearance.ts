import { Container, type Sprite } from "pixi.js";

import {
  type PokeableNumber,
  pokeableToNumber,
} from "../../../../../model/ItemStateMap";
import { type RoomState } from "../../../../../model/RoomState";
import { type AppSpritesheet } from "../../../../../sprites/spritesheet/variants/AppSpritesheet";
import { selectHeadAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { createSprite } from "../../../createSprite";
import { getWhite } from "../../../gameColours/gameColours";
import { HudText } from "../../../text/HudText";
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
  text: HudText,
];

const createSurface = (
  originalSpritesheet: AppSpritesheet,
): Container<HudText | Sprite> => {
  const hooter = createSprite({
    textureId: "hooter",
    y: -3,
    spritesheet: originalSpritesheet,
  });

  const doughnuts = createSprite({
    textureId: "doughnuts",
    y: -2,
    spritesheet: originalSpritesheet,
  });

  const text = new HudText({
    outline: true,
    y: textYForButtonCentre,
  });

  return new Container<HudText | Sprite>({
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
  ArcadeStyleButtonContainer<Container<HudText | Sprite>>
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

  const { originalSpritesheet } = spritesheetVariants;
  const container =
    currentRendering?.output ??
    new ArcadeStyleButtonContainer<Container<HudText | Sprite>>(
      spritesheetMeta,
      button.which,
      pixiRenderer,
      originalSpritesheet,
      createSurface(originalSpritesheet),
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
    const spritesheet = spritesheetVariants.currentMainSpritesheet(
      disabled,
      false,
      false,
    );

    hooter.texture = spritesheet.textures["hooter"];
    doughnuts.texture = spritesheet.textures["doughnuts"];
    text.tint = getWhite(spriteOption, room.color.shade === "dimmed");
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
