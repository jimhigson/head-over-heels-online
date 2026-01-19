import type { Sprite } from "pixi.js";

import { Container } from "pixi.js";

import type { RoomState } from "../../../../../model/RoomState";
import type {
  PlayableItem,
  PortableItem,
} from "../../../../physics/itemPredicates";
import type { ButtonAppearance } from "../OnScreenButtonRenderer";

import { getSpriteSheetVariant } from "../../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { selectHeelsAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import { findItemToPickup } from "../../../../physics/mechanics/pickingUp";
import { createSprite } from "../../../createSprite";
import { renderCarriedOnce } from "../../renderCarried";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { buttonActionsPressed } from "./buttonActionsPressed";

type SurfaceContentChildren = [carried: Container, bag: Sprite];

const createSurface = (): Container<Container | Sprite> => {
  const carried = createSprite({
    label: "carriedItem",
  });

  const bag = createSprite({
    label: "bag",
    textureId: "bag",
    y: -2,
    spritesheetVariant: "original",
  });

  return new Container<Container | Sprite>({
    label: "carryButtonSurface",
    children: [carried, bag] satisfies SurfaceContentChildren,
  });
};

export type CarryButtonRenderProps = {
  pressed: boolean;
  colourised: boolean;
  hasBag: boolean;
  carrying: null | PortableItem<string, string>;
  disabled: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
};

export const carryButtonAppearance: ButtonAppearance<
  "carry",
  string,
  CarryButtonRenderProps,
  ArcadeStyleButtonContainer<Container>
> = ({ renderContext, currentRendering, tickContext }) => {
  const {
    button,
    inputStateTracker,
    general: { colourised, pixiRenderer },
  } = renderContext;
  const { currentPlayable, room } = tickContext;
  const previouslyRenderedProps = currentRendering?.renderProps;
  const previousRendering = currentRendering?.output;

  const heelsAbilities =
    currentPlayable && selectHeelsAbilities(currentPlayable);
  const hasBag = heelsAbilities?.hasBag ?? false;
  const carrying = heelsAbilities?.carrying ?? null;
  const willPickUp: boolean =
    carrying === null &&
    room !== undefined &&
    findItemToPickup(
      currentPlayable as PlayableItem<"headOverHeels" | "heels", string>,
      room,
    ) !== undefined;

  const pressed = buttonActionsPressed(button.actions, inputStateTracker);

  const disabled = hasBag && !willPickUp && carrying === null;

  const container =
    previousRendering ??
    new ArcadeStyleButtonContainer<Container>(
      colourised,
      button.which,
      pixiRenderer,
      createSurface(),
    );

  // (or is first render)
  const roomChanged = room !== previouslyRenderedProps?.renderedInRoom;

  if (roomChanged) {
    container.generateButtonSpriteTextures(room);
  }

  container.visible = hasBag;

  //if (hasBag) {
  const [carriedContainer, bag] = container.shownOnSurface
    .children as SurfaceContentChildren;

  if (
    disabled !== previouslyRenderedProps?.disabled ||
    colourised !== previouslyRenderedProps?.colourised ||
    roomChanged
  ) {
    const spritesheet = getSpriteSheetVariant(
      colourised ?
        disabled ? "deactivated"
        : "for-current-room"
      : "uncolourised",
    );
    bag.texture = spritesheet.textures["bag"];
  }

  if (previouslyRenderedProps?.pressed !== pressed) {
    container.pressed = pressed;
  }

  if (carrying !== previouslyRenderedProps?.carrying) {
    bag.visible = carrying === null;
    carriedContainer.visible = carrying !== null;
  }

  if (carrying !== previouslyRenderedProps?.carrying || roomChanged) {
    carriedContainer.removeChildren();
    if (carrying !== null && room !== undefined) {
      carriedContainer.addChild(
        renderCarriedOnce(carrying, renderContext, tickContext.room),
      );
    }
  }
  //}

  return {
    output: container,
    renderProps: {
      pressed,
      hasBag,
      colourised,
      carrying,
      disabled,
      renderedInRoom: room,
    },
  };
};
