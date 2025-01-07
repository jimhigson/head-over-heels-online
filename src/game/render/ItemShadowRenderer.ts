import type { ItemInPlayType, ItemInPlay } from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { SceneryName } from "@/sprites/planets";
import { subXy } from "@/utils/vectors/vectors";
import type { Sprite } from "pixi.js";
import { AlphaFilter, Container } from "pixi.js";
import type { RenderOptions } from "../RenderOptions";
import { projectWorldXyzToScreenXyFloat } from "./projectToScreen";
import { createSprite } from "./createSprite";
import type { Collideable } from "../collision/aabbCollision";
import { collision1to1 } from "../collision/aabbCollision";
import { concat, objectEntries, objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import type { SetRequired } from "type-fest";
import { veryHighZ } from "../physics/mechanicsConstants";
import type { RenderContext } from "./roomRenderer";

export const ItemShadowRenderer = <
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
>(
  /** the item currently being rendered for = the one that the shadow is cast on  */
  shadowSurfaceItem: ItemInPlay<T, SceneryName, RoomId, ItemId>,
  room: RoomState<SceneryName, RoomId, ItemId>,
  renderOptions: RenderOptions<RoomId>,
) => {
  if (shadowSurfaceItem.shadowMask === undefined) {
    // this item does not render shadows - return nothing
    return undefined;
  }

  const mainShadowsContainer: Container = new Container({
    label: "ItemShadowRenderer",
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

  if (shadowSurfaceItem.shadowMask.spriteOptions) {
    const shadowMaskSprite = createSprite(
      shadowSurfaceItem.shadowMask.spriteOptions,
    );
    if (shadowSurfaceItem.shadowMask.relativeTo === "top") {
      shadowMaskSprite.y = -shadowSurfaceItem.aabb.z;
    }

    mainShadowsContainer.addChild(shadowMaskSprite);
    if (!renderOptions.showShadowMasks) {
      mainShadowsContainer.mask = shadowMaskSprite;
    }
  }

  type Cast = {
    /* the sprite of the shadow */
    sprite: Sprite;
    /* used for tracking the shadows that have been used in this frame (ie, don't have to be removed) */
    renderedOnProgression: number;
  };

  /**
   * record all the shadows currently being cast, to maintain some state between frames so we ca
   * cut out unnecessary extra work
   *
   * Mapping to an explicit value of "not-needed" tells us that we evaluated this last time
   * and found it not required
   */
  const casts = {} as Record<string, Cast>;

  mainShadowsContainer.addChild(shadowsContainer);

  return {
    get item() {
      return shadowSurfaceItem;
    },
    destroy() {
      mainShadowsContainer.destroy({ children: true });
    },
    /**
     * @returns true iff the item needs z-order resorting for the room
     */
    tick({ movedItems, progression }: RenderContext) {
      //console.log("considering shadows for", item.id);

      const surfaceMoved = movedItems.has(shadowSurfaceItem);
      const itemTop =
        shadowSurfaceItem.state.position.z + shadowSurfaceItem.aabb.z;

      const shadowCastersIter = iterate(objectValues(room.items)).filter(
        function castsAShadow(
          c,
        ): c is SetRequired<typeof c, "shadowCastTexture"> {
          return c.shadowCastTexture !== undefined;
        },
      );

      const spaceAboveSurface: Collideable = {
        id: shadowSurfaceItem.id,
        state: {
          position: {
            ...shadowSurfaceItem.state.position,
            z: itemTop,
          },
        },
        aabb: {
          ...shadowSurfaceItem.aabb,
          z: veryHighZ,
        },
      };

      // collide up from this item to find which of the shadow casters is above it:
      const bins = Object.groupBy(shadowCastersIter, (caster) => {
        const previouslyHadShadow = casts[caster.id] !== undefined;
        const casterMoved = movedItems.has(caster);
        if (!surfaceMoved && !casterMoved) {
          // neither the surface being cast onto, nor the item casting the shadow have moved - keep as-is:
          if (previouslyHadShadow) {
            return "keepUnchanged";
          } else {
            return "noShadow";
          }
        }
        if (collision1to1(spaceAboveSurface, caster)) {
          if (previouslyHadShadow) {
            return "update";
          } else {
            return "create";
          }
        }
        // now know caster has no shadow:
        return "noShadow";
      });

      // record that these are going through this generation:
      for (const casterItem of concat(bins.keepUnchanged, bins.update)) {
        casts[casterItem.id].renderedOnProgression = progression;
      }

      for (const casterItem of concat(bins.create)) {
        const newShadowSprite = createSprite(casterItem.shadowCastTexture);
        newShadowSprite.label = casterItem.id;
        //newShadowSprite.filters = [new BlurFilter()];
        shadowsContainer.addChild(newShadowSprite);
        casts[casterItem.id] = {
          sprite: newShadowSprite,
          renderedOnProgression: progression,
        };
      }

      for (const casterItem of concat(bins.create, bins.update)) {
        const { sprite } = casts[casterItem.id];

        const screenXy = projectWorldXyzToScreenXyFloat({
          ...subXy(casterItem.state.position, shadowSurfaceItem.state.position),
          z: shadowSurfaceItem.aabb.z,
        });
        sprite.x = screenXy.x;
        sprite.y = screenXy.y;
        //const heightDifference = casterItem.state.position.z - itemTop;
        //const [blurFilter] = shadow.container.filters as BlurFilter[];
        //blurFilter.strength = 0.5 + (8 * heightDifference) / 36;
      }

      // clean out casts that are no longer needed:
      for (const [
        id,
        { sprite: container, renderedOnProgression: currentAsOfProgression },
      ] of objectEntries(casts)) {
        if (currentAsOfProgression !== progression) {
          container.destroy();
          delete casts[id];
        }
      }

      // for efficiency, hide all shadow rendering if nothing is casting on this item:
      mainShadowsContainer.visible =
        (bins.keepUnchanged?.length ?? 0) +
          (bins.update?.length ?? 0) +
          (bins.create?.length ?? 0) >
        0;
    },
    container: mainShadowsContainer,
  };
};

export type ItemShadowRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
> = ReturnType<typeof ItemShadowRenderer<T, RoomId, ItemId>>;
