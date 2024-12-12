import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import type {
  AnyItemInPlay,
  ItemInPlayType,
  ItemInPlay,
} from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { subXy, type Xyz, xyzEqual } from "@/utils/vectors/vectors";
import { Container } from "pixi.js";
import type { RenderOptions } from "../RenderOptions";
import type { ItemRenderProps } from "./itemAppearances/ItemRenderProps";
import { itemAppearances } from "./itemAppearances/ItemAppearances";
import { renderItemBBs } from "./renderItemBBs";
import {
  projectWorldXyzToScreenXy,
  projectWorldXyzToScreenXyFloat,
} from "./projectToScreen";
import { createSprite } from "./createSprite";
import { collision1toMany } from "../collision/aabbCollision";
import { objectEntries, objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import type { TextureId } from "@/sprites/spriteSheet";

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
    renderContainer.alpha = 1;
  }

  const positionContainer: Container = new Container({
    label: `item(${item.id})`,
  });
  positionContainer.addChild(renderContainer);

  assignMouseActions(item, positionContainer, renderOptions);

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

  const appearance = itemAppearances[item.type];

  const itemShadowRenderer: ItemShadowRenderer<T, RoomId> | undefined =
    ItemShadowRenderer(item, room, renderOptions);

  if (itemShadowRenderer !== undefined) {
    positionContainer.addChild(itemShadowRenderer.container);
  }

  return {
    get item() {
      return item;
    },
    destroy() {
      positionContainer.destroy({ children: true });
      renderContainer.destroy({ children: true });
      if (itemShadowRenderer) itemShadowRenderer.destroy();
    },
    /**
     * @returns true iff the item needs z-order resorting for the room
     */
    tick(progression: number) {
      if (!item.renders) {
        return;
      }

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

      if (itemShadowRenderer) itemShadowRenderer.tick(progression);

      return movedSinceLastRender;
    },
    container: positionContainer,
  };
};
export type ItemRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
> = ReturnType<typeof ItemRenderer<T, RoomId>>;

const veryHighZ = 9999;
export const ItemShadowRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  _renderOptions: RenderOptions<RoomId>,
) => {
  if (item.shadowMaskTexture === undefined) {
    return undefined;
  }

  const shadowMaskedContainer: Container = new Container({
    label: "shadowsMasked",
  });
  const shadowsContainer: Container = new Container({
    label: "shadows",
    alpha: 0.5,
  });
  const shadowMaskSprite = createSprite(item.shadowMaskTexture);
  const shadows: Record<
    string,
    { container: Container; usedOnProgression: number }
  > = {};

  shadowMaskedContainer.addChild(shadowsContainer);
  shadowMaskedContainer.addChild(shadowMaskSprite);
  shadowMaskedContainer.mask = shadowMaskSprite;

  return {
    get item() {
      return item;
    },
    destroy() {
      shadowMaskedContainer.destroy({ children: true });
    },
    /**
     * @returns true iff the item needs z-order resorting for the room
     */
    tick(progression: number) {
      const itemTop = item.state.position.z + item.aabb.z;
      // collide up from this item to find everything that casts a shadow:
      const collisions = collision1toMany(
        {
          id: item.id,
          state: {
            position: {
              ...item.state.position,
              z: itemTop,
            },
          },
          aabb: {
            ...item.aabb,
            z: veryHighZ,
          },
        },
        objectValues(room.items),
      );

      let hasShadows = false;
      const castersIter = iterate(collisions).filter(
        (c): c is typeof c & { shadowCastTexture: TextureId } =>
          c.shadowCastTexture !== undefined,
      );

      for (const casterItem of castersIter) {
        if (shadows[casterItem.id] === undefined) {
          const newShadowSprite = createSprite(casterItem.shadowCastTexture);
          shadowsContainer.addChild(newShadowSprite);
          shadows[casterItem.id] = {
            container: newShadowSprite,
            usedOnProgression: progression,
          };
        }
        const shadow = shadows[casterItem.id];
        shadow.usedOnProgression = progression;

        const screenXy = projectWorldXyzToScreenXyFloat({
          ...subXy(casterItem.state.position, item.state.position),
          z: item.aabb.z,
        });
        shadow.container.x = screenXy.x;
        shadow.container.y = screenXy.y;

        hasShadows = true;
      }

      //remove all shadow sprites not used on this progression:
      for (const [id, { container, usedOnProgression }] of objectEntries(
        shadows,
      )) {
        if (usedOnProgression !== progression) {
          container.destroy();
          delete shadows[id];
        }
      }

      // for efficiency, hide all shadow rendering if there are no shadows on an item:
      shadowMaskedContainer.visible = hasShadows;
    },
    container: shadowMaskedContainer,
  };
};

type ItemShadowRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
> = ReturnType<typeof ItemShadowRenderer<T, RoomId>>;
