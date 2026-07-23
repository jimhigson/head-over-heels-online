import { Container, type Sprite } from "pixi.js";

import { type ItemInPlayType } from "../../../../../model/ItemInPlay";
import { type RoomState } from "../../../../../model/RoomState";
import { type AppSpritesheetWithVariants } from "../../../../../sprites/spritesheet/AppSpritesheet";
import { variantTextureId } from "../../../../../sprites/spritesheet/variantTextureId";
import { neverTime } from "../../../../../utils/neverTime";
import { selectHeelsAbilities } from "../../../../gameState/gameStateSelectors/selectPlayableItem";
import {
  type PlayableItem,
  type PortableItem,
} from "../../../../physics/itemPredicates";
import { findItemToPickup } from "../../../../physics/mechanics/pickingUp";
import { createSprite } from "../../../createSprite";
import { createItemLeafPixiRenderer } from "../../../item/itemRender/createItemLeafPixiRenderer";
import { type ItemLeafPixiRenderer } from "../../../item/itemRender/ItemPixiRenderer";
import { type ButtonAppearance } from "../../HudButtonRenderer";
import { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import { buttonActionsPressed } from "./buttonActionsPressed";

type SurfaceContentChildren = [carried: Container, bag: Sprite];

const createSurface = (
  spritesheet: AppSpritesheetWithVariants,
): Container<Container | Sprite> => {
  const carried = createSprite({
    label: "carriedItem",
  });

  const bag = createSprite({
    label: "bag",
    textureId: "bag",
    y: -2,
    spritesheet,
  });

  return new Container<Container | Sprite>({
    label: "carryButtonSurface",
    children: [carried, bag] satisfies SurfaceContentChildren,
  });
};

export type CarryButtonRenderProps = {
  pressed: boolean;
  hasBag: boolean;
  carrying: null | PortableItem<string, string>;
  disabled: boolean;
  renderedInRoom: RoomState<string, string> | undefined;
  /** the carried item's renderer, held across renders so it can be ticked */
  carriedRenderer: ItemLeafPixiRenderer<ItemInPlayType> | undefined;
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
    general: { spritesheets },
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

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
  const container =
    previousRendering ??
    new ArcadeStyleButtonContainer<Container>(
      button.which,
      spritesheets.originalSpritesheet,
      createSurface(spritesheet),
    );

  // (or is first render)
  const roomChanged = room !== previouslyRenderedProps?.renderedInRoom;

  if (roomChanged) {
    container.setSpritesheet(spritesheet);
  }

  container.visible = hasBag;

  //if (hasBag) {
  const [carriedContainer, bag] = container.shownOnSurface
    .children as SurfaceContentChildren;

  if (disabled !== previouslyRenderedProps?.disabled || roomChanged) {
    bag.texture =
      spritesheet.textures[
        variantTextureId("bag", false, false, disabled, false, undefined)
      ];
  }

  if (previouslyRenderedProps?.pressed !== pressed) {
    container.pressed = pressed;
  }

  if (carrying !== previouslyRenderedProps?.carrying) {
    bag.visible = carrying === null;
    carriedContainer.visible = carrying !== null;
  }

  let carriedRenderer = previouslyRenderedProps?.carriedRenderer;

  if (carrying !== previouslyRenderedProps?.carrying || roomChanged) {
    carriedContainer.removeChildren();
    carriedRenderer?.destroy();
    carriedRenderer = undefined;
    if (carrying !== null && room !== undefined) {
      const maybeCarriedRenderer = createItemLeafPixiRenderer({
        general: renderContext.general,
        item: carrying,
        room,
        isReflection: false,
      });
      if (import.meta.env.DEV && maybeCarriedRenderer === undefined) {
        throw new Error(`no renderer for carried item "${carrying.id}"`);
      }
      carriedRenderer = maybeCarriedRenderer!;
      carriedContainer.addChild(carriedRenderer.output);
    }
  }
  //}

  // tick every frame so a directional carried item keeps up with the camera -
  // the carried renderer shares the live general, so its camera angle is current:
  carriedRenderer?.tick({
    deltaMS: tickContext.deltaMS,
    lastRenderRoomTime: neverTime,
  });

  return {
    output: container,
    renderProps: {
      pressed,
      hasBag,
      carrying,
      disabled,
      renderedInRoom: room,
      carriedRenderer,
    },
  };
};
