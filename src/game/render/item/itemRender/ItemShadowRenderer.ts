import type { SetRequired, WritableDeep } from "type-fest";

import { Container, Sprite } from "pixi.js";

import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import type { ConsolidatableConfig } from "../../../../model/json/utilityJsonConfigTypes";
import type { CollideableItem } from "../../../collision/aabbCollision";
import type { ItemShadowAppearanceOutsideView } from "../../itemAppearances/shadowMaskAppearances/shadowMaskAppearanceForitem";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { roomSpatialIndexKey } from "../../../../model/RoomState";
import { store } from "../../../../store/store";
import { maybeRenderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultpliedXy";
import { addXy, originXy, subXy } from "../../../../utils/vectors/vectors";
import { collisionItemWithIndex } from "../../../collision/aabbCollision";
import { veryHighZ } from "../../../physics/mechanicsConstants";
import { shadowFilter } from "../../filters/shadowFilter";
import { itemShadowMaskAppearanceForItem } from "../../itemAppearances/shadowMaskAppearances/shadowMaskAppearanceForitem";
import { projectWorldXyzToScreenXy } from "../../projections";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import "pixi.js/advanced-blend-modes";

/**
 *
 *  this.#shadowMaskRenderer - renders shadow mask
 *
 *  pixi.js container tree:
 *
 *  this.#filterApplier
 *    this.#shadowsAndMasks
 *        (.mask =
 *            undefined:                                if appearance === 'no-mask'
 *            this.#shadowMaskRenderer.output(sprite)   otherwise
 *        )
 *
 *      this.#shadowMaskOffset
 *        (here if appearance !== 'no-mask')
 *        this.#shadowMaskRenderer.output
 *          (single sprite) <-- this.#container.mask
 *
 *      this.#shadowsContainer
 *        (several shadows)
 */

const itemCastsShadow = (
  caster: UnionOfAllItemInPlayTypes<string, string>,
): caster is SetRequired<typeof caster, "shadowCastTexture"> =>
  caster.shadowCastTexture !== undefined;

// Buffer to avoid allocating memory for the pseudo-item used to find shadow casters
const spaceAboveSurfaceBuffer: WritableDeep<CollideableItem> = {
  id: "spaceAbove",
  state: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  aabb: {
    x: 0,
    y: 0,
    z: veryHighZ,
  },
};

class ItemShadowRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #filterApplier: Container = new Container({
    label: "ItemShadowRenderer.#filterApplier",
  });
  #shadowsAndMasks: Container = new Container({
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
  #shadowSprites = new Map() as Map<
    SetRequired<UnionOfAllItemInPlayTypes<string, string>, "shadowCastTexture">,
    Sprite
  >;

  constructor(
    public readonly renderContext: ItemRenderContext<T>,
    appearance: "no-mask" | ItemShadowAppearanceOutsideView<T>,
  ) {
    // 'no-mask' means will accept any shadows without masking them - eg, on floors
    if (appearance !== "no-mask") {
      this.#shadowMaskRenderer = new ItemAppearancePixiRenderer(
        renderContext,
        appearance,
      );

      // add the whole shadow mask renderer output as a child of the top-level, even though
      // the sprite will be plucked out of its output and used directly as a mask
      if (renderContext.item.shadowOffset === undefined) {
        this.#shadowsAndMasks.addChild(this.#shadowMaskRenderer.output);
      } else {
        // create a new container to offset the shadow mask:
        const shadowMaskOffset = new Container({
          label: "shadowMaskOffset",
          children: [this.#shadowMaskRenderer.output],
          ...projectWorldXyzToScreenXy(renderContext.item.shadowOffset),
        });
        this.#shadowsAndMasks.addChild(shadowMaskOffset);
      }
    }

    this.#shadowsAndMasks.addChild(this.#shadowsContainer);
    this.#filterApplier.addChild(this.#shadowsAndMasks);
    if (!this.#showShadowMasks) {
      this.#filterApplier.filters = shadowFilter;
      this.#filterApplier.blendMode = "darken";
    }
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
    const newShadowMaskSprite = this.#shadowMaskRenderer.output.children.at(0);

    if (
      newShadowMaskSprite === undefined ||
      !(newShadowMaskSprite instanceof Sprite)
    ) {
      const { item } = this.renderContext;
      throw new Error(
        `ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${item.id}" of type "${item.type}". Have got ${newShadowMaskSprite}`,
      );
    }

    if (previousSprite !== newShadowMaskSprite) {
      if (!this.#showShadowMasks) {
        // not debugging: use shadow mask sprite normally
        this.#shadowsAndMasks.mask = newShadowMaskSprite;
      } else {
        // for debugging: put the shadow mask in front of everything:
        this.renderContext.frontLayer.attach(newShadowMaskSprite);
      }
    }
  }

  destroy() {
    this.#shadowsAndMasks.destroy(true);
    this.#shadowMaskRenderer?.destroy();
    for (const c of Object.values(this.#shadowSprites)) {
      // destroy all sprites, and destroy texture too if it was uniquely created for this cast
      c.sprite.destroy();
    }
  }
  /**
   * @returns true iff the item needs z-order resorting for the room
   */
  tick(itemTickContext: ItemTickContext) {
    const { movedItems } = itemTickContext;

    const {
      item,
      general: { pixiRenderer },
      room,
    } = this.renderContext;

    const surfaceMoved = movedItems.has(item);
    const itemTop = item.state.position.z + item.aabb.z;

    // Values are copied into the buffer to avoid malloc/gc:
    spaceAboveSurfaceBuffer.state.position.x = item.state.position.x;
    spaceAboveSurfaceBuffer.state.position.y = item.state.position.y;
    spaceAboveSurfaceBuffer.state.position.z = itemTop;
    spaceAboveSurfaceBuffer.aabb.x = item.aabb.x;
    spaceAboveSurfaceBuffer.aabb.y = item.aabb.y;
    // z remains veryHighZ as set in the buffer initialization

    const castersSet = new Set(
      collisionItemWithIndex(
        spaceAboveSurfaceBuffer,
        room[roomSpatialIndexKey],
        (
          maybeCaster,
        ): maybeCaster is SetRequired<
          typeof maybeCaster,
          "shadowCastTexture"
        > =>
          maybeCaster !== item &&
          itemCastsShadow(maybeCaster) &&
          // ignore items above that are standing on and don't cast a shadow while they are:
          (maybeCaster.castsShadowWhileStoodOn ||
            maybeCaster.state.position.z > item.state.position.z + item.aabb.z),
      ),
    );

    let hasAnyShadows = false;

    for (const [previousCaster, shadowSprite] of this.#shadowSprites) {
      if (!castersSet.has(previousCaster)) {
        // no longer casting a shadow on this item - remove the shadow sprite:
        this.#shadowsContainer.removeChild(shadowSprite);
        shadowSprite.destroy();
        this.#shadowSprites.delete(previousCaster);
      }
    }

    for (const casterItem of castersSet) {
      hasAnyShadows = true;

      let shadowSprite = this.#shadowSprites.get(casterItem);
      let isNew = false;

      if (!shadowSprite) {
        // wasn't casting a shadow before - create a new one:
        const { times } = casterItem.config as ConsolidatableConfig;

        shadowSprite = maybeRenderContainerToSprite(
          pixiRenderer,
          renderMultipliedXy(casterItem.shadowCastTexture, times),
        );
        // shadows can only darken - this prevents shadows with lighter parts
        // in the spritesheet (less shadow is applied) from lightening over the
        // top of other shadows. However, we apply shadows in reverse since the
        // container we are rendering on starts at 0,0,0,0 so darken doesn't work
        // - the shader will flip them
        shadowSprite.blendMode = "lighten";
        shadowSprite.label = casterItem.id;
        this.#shadowsContainer.addChild(shadowSprite);
        this.#shadowSprites.set(casterItem, shadowSprite);
        isNew = true;
      }

      if (isNew || surfaceMoved || movedItems.has(casterItem)) {
        // shadow needs (re) positioning
        const screenXy = projectWorldXyzToScreenXy({
          ...addXy(
            subXy(casterItem.state.position, item.state.position),
            // use just the xy part of the shadow offset to position the shadow on the surface:
            casterItem.shadowOffset ?? originXy,
          ),
          // on the top of the item:
          z: item.aabb.z,
        });
        //const zToCaster = casterItem.state.position.z - itemTop;
        //shadowSprite.alpha = 1 - zToCaster / (blockSizePx.h * 8);
        // (shadowSprite.filters as [BlurFilter])[0].strength =
        //   zToCaster * blurPerZToCaster;
        // this fails for composite sprites, since they get their x,y set in the sprite they are rendered to
        shadowSprite.x = screenXy.x;
        shadowSprite.y = screenXy.y;
      }
    }

    // for efficiency, hide all shadow rendering if nothing is casting on this item:
    this.#shadowsAndMasks.visible = hasAnyShadows;

    // for efficiency, only tick the shadow mask if this renderer is showing something
    if (hasAnyShadows) {
      this.#tickShadowMask(itemTickContext);
    }
  }

  get output() {
    return this.#filterApplier;
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
