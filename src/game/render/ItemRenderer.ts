import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import type {
  AnyItemInPlay,
  ItemInPlayType,
  ItemInPlay,
} from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { type Xyz, xyzEqual } from "@/utils/vectors/vectors";
import { Container } from "pixi.js";
import type { RenderOptions } from "../RenderOptions";
import type { ItemRenderProps } from "./itemAppearances/ItemRenderProps";
import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { renderItemBBs } from "./renderItemBBs";
import { projectWorldXyzToScreenXy } from "./projectToScreen";

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

const moveContainerToItemPosition = (
  { state: { position } }: AnyItemInPlay,
  container: Container,
) => {
  // current position of item doesn't match its current rendered position
  const projectionXyz = projectWorldXyzToScreenXy(position);

  container.x = projectionXyz.x;
  container.y = projectionXyz.y;
};

export const ItemRenderer = <T extends ItemInPlayType, RoomId extends string>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  renderOptions: RenderOptions<RoomId>,
) => {
  const renderContainer: Container = new Container();

  if (renderOptions.showBoundingBoxes !== "none") {
    renderContainer.alpha = 0.5;
  }

  const positionContainer: Container = new Container({
    label: `item(${item.id})`,
  });
  positionContainer.addChild(renderContainer);

  assignMouseActions(item, renderContainer, renderOptions);

  if (
    renderOptions.showBoundingBoxes === "all" ||
    (renderOptions.showBoundingBoxes === "non-wall" && item.type !== "wall")
  ) {
    positionContainer.addChild(renderItemBBs(item));
    moveContainerToItemPosition(item, positionContainer);
  }

  /* the props used to render this item last time */
  let currentlyRenderedProps: ItemRenderProps<T> | undefined = undefined;
  /*
   * world position where this item was rendered last time - initially undefined since has not been
   * positioned at time of declaration
   */
  let currentRenderPosition: Xyz | undefined;

  return {
    get item() {
      return item;
    },
    destroy() {
      positionContainer.destroy({ children: true });
      renderContainer.destroy({ children: true });
    },
    /**
     * @returns true iff the item needs z-order resorting for the room
     */
    tick() {
      if (!item.renders) {
        return;
      }

      const appearance = itemAppearances[item.type];

      const rendering = appearance({ item, room, currentlyRenderedProps });
      if (rendering !== undefined) {
        // the appearance decided to update:
        currentlyRenderedProps = rendering.renderProps;
        renderContainer.children.forEach((child) => child.destroy());
        // it is possible to explicitly render nothing (clear the rendering)
        // - in this case, the appearance should return null
        if (rendering.container !== null)
          renderContainer.addChild(rendering.container);
      }

      const {
        state: { position: itemPosition },
      } = item;
      const movedSinceLastRender =
        currentRenderPosition === undefined ||
        !xyzEqual(currentRenderPosition, itemPosition);

      if (movedSinceLastRender) {
        // current position of item doesn't match its current rendered position
        moveContainerToItemPosition(item, positionContainer);

        currentRenderPosition = itemPosition;
      }

      return movedSinceLastRender;
    },
    container: positionContainer,
  };
};
export type ItemRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
> = ReturnType<typeof ItemRenderer<T, RoomId>>;
