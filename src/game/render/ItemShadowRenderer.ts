import type {
  ItemInPlayType,
  ItemInPlay,
  AnyItemInPlay,
} from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { subXy } from "@/utils/vectors/vectors";
import { AlphaFilter, BlurFilter, Container } from "pixi.js";
import type { RenderOptions } from "../RenderOptions";
import { projectWorldXyzToScreenXyFloat } from "./projectToScreen";
import { createSprite } from "./createSprite";
import { collision1toMany } from "../collision/aabbCollision";
import { objectEntries, objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import type { SetRequired } from "type-fest";
import { veryHighZ } from "../physics/mechanicsConstants";

export const ItemShadowRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
>(
  item: ItemInPlay<T, PlanetName, RoomId>,
  room: RoomState<PlanetName, RoomId>,
  renderOptions: RenderOptions<RoomId>,
) => {
  if (item.shadowMask === undefined) {
    // this item does not render shadows - return nothing
    return undefined;
  }

  const mainShadowsContainer: Container = new Container({
    label: "mainShadows",
  });
  const shadowsContainer: Container = new Container({
    label: "shadows",
  });
  // due to this issue:
  // https://github.com/pixijs/pixijs/issues/4334
  // using alpha fitler (not .alpha) to set alpha here:
  // https://pixijs.download/dev/docs/filters.AlphaFilter.html
  if (!renderOptions.showShadowMasks) {
    mainShadowsContainer.filters = new AlphaFilter({ alpha: 0.5 });
  }

  if (item.shadowMask.spriteOptions) {
    const shadowMaskSprite = createSprite(item.shadowMask.spriteOptions);
    if (item.shadowMask.relativeTo === "top") {
      shadowMaskSprite.y = -item.aabb.z;
    }

    mainShadowsContainer.addChild(shadowMaskSprite);
    if (!renderOptions.showShadowMasks) {
      mainShadowsContainer.mask = shadowMaskSprite;
    }
  }

  const shadows: Record<
    string,
    { container: Container; usedOnProgression: number }
  > = {};

  mainShadowsContainer.addChild(shadowsContainer);

  return {
    get item() {
      return item;
    },
    destroy() {
      mainShadowsContainer.destroy({ children: true });
    },
    /**
     * @returns true iff the item needs z-order resorting for the room
     */
    tick(progression: number) {
      //console.log("considering shadows for", item.id);

      const itemTop = item.state.position.z + item.aabb.z;
      // collide up from this item to find everything that casts a shadow:
      const collisions: AnyItemInPlay<RoomId>[] = collision1toMany(
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
        (c): c is SetRequired<AnyItemInPlay<RoomId>, "shadowCastTexture"> =>
          c.shadowCastTexture !== undefined,
      );

      for (const casterItem of castersIter) {
        if (shadows[casterItem.id] === undefined) {
          const newShadowSprite = createSprite(casterItem.shadowCastTexture);
          newShadowSprite.label = casterItem.id;
          newShadowSprite.filters = [new BlurFilter()];
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
        const heightDifference = casterItem.state.position.z - itemTop;
        const [blurFilter] = shadow.container.filters as BlurFilter[];
        blurFilter.strength = 0.5 + (8 * heightDifference) / 36;

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
      mainShadowsContainer.visible = hasShadows;
    },
    container: mainShadowsContainer,
  };
};

export type ItemShadowRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
> = ReturnType<typeof ItemShadowRenderer<T, RoomId>>;
