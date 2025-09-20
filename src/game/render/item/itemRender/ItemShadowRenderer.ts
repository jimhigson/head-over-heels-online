import type { SetRequired, WritableDeep } from "type-fest";

import { AlphaFilter, Container, Sprite } from "pixi.js";

import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import type { ConsolidatableConfig } from "../../../../model/json/utilityJsonConfigTypes";
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

const itemCastsShadow = (
  caster: UnionOfAllItemInPlayTypes<string, string>,
): caster is SetRequired<typeof caster, "shadowCastTexture"> =>
  caster.shadowCastTexture !== undefined;

const halfOpacity = new AlphaFilter({ alpha: 1 - amigaHalfBriteBrightness });

// Buffer to avoid allocating memory for the pseudo-item used to find shadow casters
const spaceAboveSurfaceBuffer: WritableDeep<Collideable> = {
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
  #shadowSprites = new Map() as Map<
    SetRequired<UnionOfAllItemInPlayTypes<string, string>, "shadowCastTexture">,
    Sprite
  >;

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
        shadowSprite.label = casterItem.id;
        //newShadowSprite.filters = [new BlurFilter()];
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
        // this fails for composite sprites, since they get their x,y set in the sprite they are rendered to
        shadowSprite.x = screenXy.x;
        shadowSprite.y = screenXy.y;
      }
    }

    // for efficiency, hide all shadow rendering if nothing is casting on this item:
    this.#container.visible = hasAnyShadows;

    // for efficiency, only tick the shadow mask if this renderer is showing something
    if (hasAnyShadows) {
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
