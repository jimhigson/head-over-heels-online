import type { ContainerWithWorldPosition } from "@/model/ItemInPlay";
import {
  positionContainerPosition,
  renderContainerState,
  type AnyItemInPlay,
  type ContainerWithItemState,
  type ItemInPlay,
  type ItemInPlayType,
} from "@/model/ItemInPlay";

import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import type { GameState } from "../gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { Container } from "pixi.js";
import type { RenderOptions } from "../RenderOptions";
import { renderItemBBs } from "./itemRenderingInContainerAlongsideBBRendering";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";

const assignMouseActions = <RoomId extends string>(
  item: AnyItemInPlay,
  container: Container,
  options: RenderOptions<RoomId>,
) => {
  if (container !== undefined) {
    if (options.onItemClick && container !== undefined) {
      container.eventMode = "static";
      container.on("pointertap", () => {
        options.onItemClick!(item);
      });
    }

    container.on("pointerenter", () => {
      container!.filters = new RevertColouriseFilter(
        // don't have the room here and this doesn't really matter so arbitrary choose yellow
        "white",
      );
    });

    container.on("pointerleave", () => {
      container!.filters = [];
    });
  }
};

export const createRenderContainerForItem = <
  T extends ItemInPlayType,
  RoomId extends string,
>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  renderOptions: RenderOptions<RoomId>,
): ContainerWithItemState<T> => {
  const container = new Container();
  (container as ContainerWithItemState<T>)[renderContainerState] = {
    ...item.state,
  };
  if (renderOptions.showBoundingBoxes !== "none") {
    container.alpha = 0.5;
  }

  assignMouseActions(item, container, renderOptions);
  return container as ContainerWithItemState<T>;
};

/** render an item inside the container it was previously assigned */
export const renderItemIfNeeded = <
  T extends ItemInPlayType,
  RoomId extends string,
>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  renderOptions: RenderOptions<RoomId>,
) => {
  if (item.renderContainer === undefined) {
    // item has never rendered before- it may have been introduced while the room was in-play
    item.renderContainer = createRenderContainerForItem(item, renderOptions);
  }

  const updateItemAppearanceIfNeeded = itemAppearances[item.type];

  if (updateItemAppearanceIfNeeded === undefined) {
    throw new Error(
      `item type "${item.type}" has no appearance - if it doesn't render, give it the .renders = false`,
    );
  }

  updateItemAppearanceIfNeeded(item, gameState, item.renderContainer);
};

const createPositionContainerForItem = <RoomId extends string>(
  item: AnyItemInPlay,
  renderOptions: RenderOptions<RoomId>,
): ContainerWithWorldPosition => {
  const container = new Container();
  (container as ContainerWithWorldPosition)[positionContainerPosition] =
    item.state.position;

  if (
    renderOptions.showBoundingBoxes === "all" ||
    (renderOptions.showBoundingBoxes === "non-wall" && item.type !== "wall")
  ) {
    container.addChild(renderItemBBs(item));
  }

  return container as ContainerWithWorldPosition;
};

export const moveSpriteToItemProjection = <RoomId extends string>(
  item: AnyItemInPlay<RoomId>,
  roomContainer: Container,
  renderOptions: RenderOptions<RoomId>,
) => {
  if (item.positionContainer === undefined) {
    item.positionContainer = createPositionContainerForItem(
      item,
      renderOptions,
    );
    if (item.renderContainer === undefined) {
      if (renderOptions.showBoundingBoxes === "none") {
        // this is illegal in normal rendering (but allowed for non-rendering items when we are
        // positioning a position container just to show the bounding box)
        throw new Error(
          "Item does not have a render container - render the item before positioning it",
        );
      }
    } else {
      item.positionContainer.addChild(item.renderContainer);
    }

    roomContainer.addChild(item.positionContainer);
  }

  const {
    state: { position },
    positionContainer,
  } = item;
  const projectionXyz = projectWorldXyzToScreenXy(position);

  positionContainer.x = projectionXyz.x;
  positionContainer.y = projectionXyz.y;
  positionContainer[positionContainerPosition] = position;
};
