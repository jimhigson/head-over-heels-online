import { AlphaFilter, Container, Sprite } from "pixi.js";
import { projectWorldXyzToScreenXy } from "../../projections";
import type { Collideable } from "../../../collision/aabbCollision";
import { collision1to1 } from "../../../collision/aabbCollision";
import { concat, objectEntries } from "iter-tools";
import type { SetRequired } from "type-fest";
import { veryHighZ } from "../../../physics/mechanicsConstants";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import { subXy } from "../../../../utils/vectors/vectors";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ConsolidatableConfig } from "src/model/json/utilityJsonConfigTypes";
import { iterateRoomItems } from "../../../../model/RoomState";
import type { ItemPixiRenderer } from "./ItemRenderer";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { store } from "../../../../store/store";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultpliedXy";
import type { ItemShadowAppearanceOutsideView } from "../../itemAppearances/shadowMaskAppearances/shadowMaskAppearanceForitem";
import { itemShadowMaskAppearanceForItem } from "../../itemAppearances/shadowMaskAppearances/shadowMaskAppearanceForitem";

type Cast = {
  /* the sprite of the shadow */
  sprite: Container;
  /* used for tracking the shadows that have been used in this frame (ie, don't have to be removed) */
  renderedOnProgression: number;
};

/**
 * make the black shadow at half opacity, crating an effect similar to Amiga OCS's EHB
 * - in practice, 0.5 is to feint, so 0.66 make it easier to see the shadow
 */
const halfOpacity = new AlphaFilter({ alpha: 0.66 });
class ItemShadowRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #container: Container = new Container({
    label: "ItemShadowRenderer",
  });
  #shadowsContainer: Container = new Container({
    label: "shadows",
  });
  #shadowMaskRenderer: ItemPixiRenderer<T, Container<Sprite>> | undefined;

  /**
   * record all the shadows currently being cast, to maintain some state between frames so we ca
   * cut out unnecessary extra work
   */
  #casts = {} as Record<string, Cast>;

  constructor(
    public readonly renderContext: ItemRenderContext<T>,
    appearance: ItemShadowAppearanceOutsideView<T> | "no-mask",
  ) {
    //if (!this.#showShadowMasks) {
    // due to this issue:
    // https://github.com/pixijs/pixijs/issues/4334
    // using alpha fitler (not .alpha) to set alpha here:
    // https://pixijs.download/dev/docs/filters.AlphaFilter.html
    this.#container.filters = halfOpacity;
    //}

    // null appearance means no shadow mask is needed
    if (appearance !== "no-mask") {
      this.#shadowMaskRenderer = new ItemAppearancePixiRenderer(
        renderContext,
        appearance,
      );

      this.#container.addChild(this.#shadowMaskRenderer.output);
    }

    this.#container.addChild(this.#shadowsContainer);
  }

  /** convenience for getting the shadow mask setting from the store */
  get #showShadowMasks() {
    return store.getState().gameMenus.userSettings.displaySettings
      .showShadowMasks;
  }

  /**
   * update the shadow mask for this item
   */
  #tickShadowMask(itemTickContext: ItemTickContext) {
    if (this.#shadowMaskRenderer === undefined) {
      return;
    }

    // -1 here (assuming hte last child is the shadow mask) is not very safe!
    // might need something better.
    const previousSprite = this.#shadowMaskRenderer.output.children.at(0);
    this.#shadowMaskRenderer.tick(itemTickContext);
    const newSprite = this.#shadowMaskRenderer.output.children.at(0);

    if (newSprite === undefined || !(newSprite instanceof Sprite)) {
      const { item } = this.renderContext;
      throw new Error(
        `ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${item.id}" of type "${item.type}". Have got ${newSprite}`,
      );
    }

    if (previousSprite !== newSprite) {
      if (!this.#showShadowMasks) {
        this.#container.mask = newSprite;
      }
    }
  }

  destroy() {
    console.log(
      "destroying ItemShadowRenderer for",
      this.renderContext.item.id,
    );
    this.#container.destroy(true);
    this.#shadowMaskRenderer?.destroy();
  }
  /**
   * @returns true iff the item needs z-order resorting for the room
   */
  tick(itemTickContext: ItemTickContext) {
    // TODO: remove this check when all good - just for debugging
    if (this.#shadowsContainer.parent === null) {
      throw new Error("shadow container not in scene graph");
    }

    const { movedItems, progression } = itemTickContext;

    const {
      item,
      general: { pixiRenderer },
      room,
    } = this.renderContext;

    const surfaceMoved = movedItems.has(item);
    const itemTop = item.state.position.z + item.aabb.z;

    const shadowCastersIter = iterateRoomItems(room.items).filter(
      function castsAShadow(
        c,
      ): c is SetRequired<typeof c, "shadowCastTexture"> {
        return c.shadowCastTexture !== undefined;
      },
    );

    const spaceAboveSurface: Collideable = {
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
    };

    // collide up from this item to find which of the shadow casters is above it:
    const bins = Object.groupBy(shadowCastersIter, (caster) => {
      const previouslyHadShadow = this.#casts[caster.id] !== undefined;
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
      this.#casts[casterItem.id].renderedOnProgression = progression;
    }

    if (bins.create)
      for (const casterItem of bins.create) {
        const { times } = casterItem.config as ConsolidatableConfig;

        const newShadowSprite = renderMultipliedXy(
          pixiRenderer,
          casterItem.shadowCastTexture,
          times,
        );
        newShadowSprite.label = casterItem.id;
        //newShadowSprite.filters = [new BlurFilter()];
        this.#shadowsContainer.addChild(newShadowSprite);
        this.#casts[casterItem.id] = {
          sprite: newShadowSprite,
          renderedOnProgression: progression,
        };
      }

    for (const casterItem of concat(bins.create, bins.update)) {
      const { sprite } = this.#casts[casterItem.id];

      const screenXy = projectWorldXyzToScreenXy({
        ...subXy(casterItem.state.position, item.state.position),
        z: item.aabb.z,
      });
      // this fails for composite sprites, since they get their x,y set in the sprite they are rendered to
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
    ] of objectEntries(this.#casts)) {
      if (currentAsOfProgression !== progression) {
        container.destroy();
        delete this.#casts[id];
      }
    }

    // for efficiency, hide all shadow rendering if nothing is casting on this item:
    const visible =
      (bins.keepUnchanged?.length ?? 0) +
        (bins.update?.length ?? 0) +
        (bins.create?.length ?? 0) >
      0;
    this.#container.visible = visible;

    // for efficiency, only tick the shadow mask if this renderer is showing something
    if (visible) {
      this.#tickShadowMask(itemTickContext);
    }
  }

  get output() {
    return this.#container;
  }
}

export const maybeCreateItemShadowRenderer = <T extends ItemInPlayType>(
  renderContext: ItemRenderContext<T>,
): ItemShadowRenderer<T> | undefined => {
  const appearance = itemShadowMaskAppearanceForItem(renderContext.item);

  return appearance === undefined ? undefined : (
      new ItemShadowRenderer(renderContext, appearance)
    );
};
