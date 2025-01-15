import type {
  AnyItemInPlay,
  ItemInPlayType,
  ItemInPlay,
} from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { SceneryName } from "@/sprites/planets";
import { Container } from "pixi.js";
import type { ItemRenderProps } from "./itemAppearances/ItemRenderProps";
import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { renderItemBBs } from "./renderItemBBs";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import { ItemShadowRenderer } from "./ItemShadowRenderer";
import type { RenderContext } from "./roomRenderer";
import type { GameState } from "../gameState/GameState";

const assignMouseActions = <RoomId extends string>(
  item: AnyItemInPlay<RoomId>,
  container: Container,
  gameState: GameState<RoomId>,
) => {
  if (container !== undefined) {
    container.eventMode = "static";
    container.on("pointertap", () => {
      gameState.events.emit("itemClicked", { item, container });
    });
  }
};

const moveContainerToItemPosition = (
  { state: { position } }: AnyItemInPlay,
  container: Container,
) => {
  // current position of item doesn't match its current rendered position
  const projectionXy = projectWorldXyzToScreenXy(position);

  container.x = projectionXy.x;
  container.y = projectionXy.y;
};

export const ItemRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
>(
  item: ItemInPlay<T, SceneryName, RoomId, ItemId>,
  room: RoomState<SceneryName, RoomId, ItemId>,
  gameState: GameState<RoomId>,
) => {
  const { renderOptions } = gameState;

  const renderBoundingBoxes =
    renderOptions.showBoundingBoxes === "all" ||
    (renderOptions.showBoundingBoxes === "non-wall" && item.type !== "wall");

  if (!item.renders && !renderBoundingBoxes) {
    return undefined;
  }

  const renderContainer: Container = new Container({ label: "render" });

  if (renderOptions.showBoundingBoxes !== "none") {
    renderContainer.alpha = 0.5;
  }

  const mainContainer: Container = new Container({
    label: `ItemRenderer(${item.id})`,
  });
  mainContainer.addChild(renderContainer);
  if (item.fixedZIndex !== undefined) {
    mainContainer.zIndex = item.fixedZIndex;
  }

  assignMouseActions(item, mainContainer, gameState);

  if (renderBoundingBoxes) {
    mainContainer.addChild(renderItemBBs(item));
    moveContainerToItemPosition(item, mainContainer);
  }

  /* the props used to render this item last time */
  let currentlyRenderedProps: ItemRenderProps<T> | undefined = undefined;

  const appearance = itemAppearances[item.type];

  const itemShadowRenderer: ItemShadowRenderer<T, RoomId, ItemId> | undefined =
    ItemShadowRenderer(item, room, renderOptions);

  if (itemShadowRenderer !== undefined) {
    mainContainer.addChild(itemShadowRenderer.container);
  }

  return {
    get item() {
      return item;
    },
    destroy() {
      mainContainer.destroy({ children: true });
      renderContainer.destroy({ children: true });
      if (itemShadowRenderer) itemShadowRenderer.destroy();
    },
    /**
     * update the rendering for the item
     */
    tick(renderContext: RenderContext) {
      const rendering =
        item.renders ?
          appearance({ item, room, currentlyRenderedProps, renderOptions })
        : undefined;
      if (rendering !== undefined) {
        // the appearance decided to update:
        currentlyRenderedProps = rendering.renderProps;
        renderContainer.children.forEach((child) => child.destroy());
        // it is possible to explicitly render nothing (clear the rendering)
        // - in this case, the appearance should return null
        if (rendering.container !== null)
          renderContainer.addChild(rendering.container);
      }

      const hasMoved = renderContext.movedItems.has(item);

      if (hasMoved) {
        // current position of item doesn't match its current rendered position

        moveContainerToItemPosition(item, mainContainer);
      }

      if (itemShadowRenderer) itemShadowRenderer.tick(renderContext);
    },
    container: mainContainer,
  };
};
export type ItemRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
> = NonNullable<ReturnType<typeof ItemRenderer<T, RoomId, ItemId>>>;
