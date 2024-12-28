import type {
  AnyItemInPlay,
  ItemInPlayType,
  ItemInPlay,
} from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { Container } from "pixi.js";
import type { RenderOptions } from "../RenderOptions";
import type { ItemRenderProps } from "./itemAppearances/ItemRenderProps";
import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { renderItemBBs } from "./renderItemBBs";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import { ItemShadowRenderer } from "./ItemShadowRenderer";
import type { RenderContext } from "./roomRenderer";

const assignMouseActions = <RoomId extends string>(
  item: AnyItemInPlay<RoomId>,
  container: Container,
  renderOptions: RenderOptions<RoomId>,
) => {
  if (container !== undefined) {
    if (renderOptions.onItemClick && container !== undefined) {
      container.eventMode = "static";
      container.on("pointertap", () => {
        renderOptions.onItemClick!(item, container);
      });
    }

    /*container.on("pointerenter", () => {
      container!.filters = new RevertColouriseFilter(
        // don't have the room here and this doesn't really matter so arbitrary choose yellow
        "white",
      );
    });

    container.on("pointerleave", () => {
      container!.filters = [];
    });*/
  }
};

const moveContainerToItemPosition = (
  { state: { position } }: AnyItemInPlay,
  container: Container,
) => {
  // current position of item doesn't match its current rendered position
  const projectionXyz = projectWorldXyzToScreenXy(position);

  container.x = projectionXyz.x;
  container.y = projectionXyz.y;
};

export const ItemRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
>(
  item: ItemInPlay<T, PlanetName, RoomId, ItemId>,
  room: RoomState<PlanetName, RoomId, ItemId>,
  renderOptions: RenderOptions<RoomId>,
) => {
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
    label: `item(${item.id})`,
  });
  mainContainer.addChild(renderContainer);
  if (item.fixedZIndex !== undefined) {
    mainContainer.zIndex = item.fixedZIndex;
  }

  assignMouseActions(item, mainContainer, renderOptions);

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
