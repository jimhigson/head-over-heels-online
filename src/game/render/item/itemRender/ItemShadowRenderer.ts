import type { ConsolidatableConfig } from "src/model/json/utilityJsonConfigTypes";
import type { SetRequired } from "type-fest";

import { concat, objectEntries } from "iter-tools-es";
import { AlphaFilter, Container, Sprite } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { Collideable } from "../../../collision/aabbCollision";
import type { ItemShadowAppearanceOutsideView } from "../../itemAppearances/shadowMaskAppearances/shadowMaskAppearanceForitem";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { roomSpatialIndexKey } from "../../../../model/RoomState";
import { store } from "../../../../store/store";
import { amigaHalfBriteBrightness } from "../../../../utils/colour/halfBrite";
import { maybeRenderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultpliedXy";
import { addXy, originXy, subXy } from "../../../../utils/vectors/vectors";
import { collisionItemWithIndex } from "../../../collision/aabbCollision";
import { veryHighZ } from "../../../physics/mechanicsConstants";
import { itemShadowMaskAppearanceForItem } from "../../itemAppearances/shadowMaskAppearances/shadowMaskAppearanceForitem";
import { projectWorldXyzToScreenXy } from "../../projections";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";

type Cast = {
  /* the sprite of the shadow */
  sprite: Container;
  /* used for tracking the shadows that have been used in this frame (ie, don't have to be removed) */
  renderedOnProgression: number;
};

const halfOpacity = new AlphaFilter({ alpha: 1 - amigaHalfBriteBrightness });
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
    appearance: "no-mask" | ItemShadowAppearanceOutsideView<T>,
  ) {
    //if (!this.#showShadowMasks) {
    // due to this issue:
    // https://github.com/pixijs/pixijs/issues/4334
    // using alpha fitler (not .alpha) to set alpha here:
    // https://pixijs.download/dev/docs/filters.AlphaFilter.html
    this.#container.filters = halfOpacity;

    // 'no-mask' means will accept any shadows without masking them - eg, on floors
    if (appearance !== "no-mask") {
      this.#shadowMaskRenderer = new ItemAppearancePixiRenderer(
        renderContext,
        appearance,
      );

      // add the whole shadow mask renderer output as a child of the top-level, even though
      // the sprite will be plucked out of its output and used directly as a mask
      if (renderContext.item.shadowOffset === undefined) {
        this.#container.addChild(this.#shadowMaskRenderer.output);
      } else {
        // create a new container to offset the shadow mask:
        const shadowMaskOffset = new Container({
          label: "shadowMaskOffset",
          ...projectWorldXyzToScreenXy(renderContext.item.shadowOffset),
          children: [this.#shadowMaskRenderer.output],
        });
        this.#container.addChild(shadowMaskOffset);
      }
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

    // Containers can't be masks - only sprites can, even though the whole output
    // can be added as a child of the ItemShadowRenderer. This means that we have to get the sprite
    // out of the renderer's output container.
    // This means the renderers for shadow masks must always return a container with a single sprite
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
        // not debugging: use shadow mask sprite normally
        this.#container.mask = newSprite;
      } else {
        // for debugging: put the shadow mask in front of everything:
        this.renderContext.frontLayer.attach(newSprite);
      }
    }
  }

  destroy() {
    this.#container.destroy(true);
    this.#shadowMaskRenderer?.destroy();
    for (const c of Object.values(this.#casts)) {
      // destroy all sprites, and destroy texture too if it was uniquely created for this cast
      c.sprite.destroy();
    }
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

    const spaceAboveSurfacePseudoItem: Collideable = {
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

    const itemsAbove = collisionItemWithIndex(
      spaceAboveSurfacePseudoItem,
      room[roomSpatialIndexKey],
      // only consider items that can cast a shadow:
      (i): i is SetRequired<typeof i, "shadowCastTexture"> =>
        i.shadowCastTexture !== undefined,
    );

    // collide up from this item to find which of the shadow casters is above it:
    const bins = Object.groupBy(itemsAbove, (caster) => {
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
      if (
        // as an optimisation, if the caster is sat on top of this item, shadows can usually be
        // skipped since most casters completely cover up their own shadow
        caster.castsShadowWhileStoodOn ||
        caster.state.position.z > item.state.position.z + item.aabb.z
      ) {
        // check if the caster intersects the space above the item:
        if (previouslyHadShadow) {
          return "update";
        } else {
          return "create";
        }
      }
      // standing directly on something, and with the optimisation to skip in that case:
      return "noShadow";
    });

    // record that these are going through this generation:
    for (const casterItem of concat(bins.keepUnchanged, bins.update)) {
      this.#casts[casterItem.id].renderedOnProgression = progression;
    }

    if (bins.create)
      for (const casterItem of bins.create) {
        const { times } = casterItem.config as ConsolidatableConfig;

        const newShadowSprite: Sprite = maybeRenderContainerToSprite(
          pixiRenderer,
          renderMultipliedXy(casterItem.shadowCastTexture, times),
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
        ...addXy(
          subXy(casterItem.state.position, item.state.position),
          // use just the xy part of the shadow offset to position the shadow on the surface:
          casterItem.shadowOffset ?? originXy,
        ),
        // on the top of the item:
        z: item.aabb.z,
      });
      // this fails for composite sprites, since they get their x,y set in the sprite they are rendered to
      sprite.x = screenXy.x;
      sprite.y = screenXy.y;

      //const heightDifference = casterItem.state.position.z - itemTop;
      //const [blurFilter] = shadow.container.filters as BlurFilter[];
      //blurFilter.strength = 0.5 + (8 * heightDifference) / 36;
    }

    // clean out casts that have not been updated to be marked as used on this frame:
    for (const [
      id,
      { sprite, renderedOnProgression: currentAsOfProgression },
    ] of objectEntries(this.#casts)) {
      if (currentAsOfProgression !== progression) {
        sprite.destroy();
        delete this.#casts[id];
      }
    }

    // for efficiency, hide all shadow rendering if nothing is casting on this item:
    const hasAnyShadowsCastOn =
      (bins.keepUnchanged?.length ?? 0) +
        (bins.update?.length ?? 0) +
        (bins.create?.length ?? 0) >
      0;
    this.#container.visible = hasAnyShadowsCastOn;

    // for efficiency, only tick the shadow mask if this renderer is showing something
    if (hasAnyShadowsCastOn) {
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
