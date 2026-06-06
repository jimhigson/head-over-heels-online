import { AlphaFilter, Container, Sprite } from "pixi.js";
import { type SetRequired, type WritableDeep } from "type-fest";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { type ConsolidatableConfig } from "../../../../model/json/utilityJsonConfigTypes";
import { roomSpatialIndexKey } from "../../../../model/RoomState";
import { store } from "../../../../store/store";
import { epsilon } from "../../../../utils/epsilon";
import { maybeRenderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultipliedXy";
import { addXy, originXy, subXy } from "../../../../utils/vectors/vectors";
import {
  type CollideableItem,
  collisionItemWithIndex,
} from "../../../collision/aabbCollision";
import { veryHighZ } from "../../../physics/mechanicsConstants";
import { type SpecifiedTextureCreateSpriteOptions } from "../../createSprite";
import {
  type ItemShadowAppearanceOutsideView,
  itemShadowMaskAppearanceForItem,
} from "../../itemAppearances/shadowMaskAppearances/itemShadowMaskAppearanceForItem";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { type ItemPixiRenderer } from "./ItemPixiRenderer";

const shadowAlpha = 0.66;

/**
 * grey tint applied over a wholly-shadowed item, on top of its shaped shadows. Half the
 * darkness of the shadowAlpha black overlay: 1 - 0.66/2 = 0.67 brightness ≈ 0xab
 */
const wholeShadowTint = 0xab_ab_ab;
const noTint = 0xff_ff_ff;

/**
 *
 *  this.#shadowMaskRenderer - renders shadow mask
 *
 *  pixi.js container tree:
 *
 *    this.#output <- shadows and masks
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

type ShadowCaster = SetRequired<
  UnionOfAllItemInPlayTypes<string, string>,
  "shadowCastTexture"
>;

/**
 * true iff the receiver's xy footprint is contained within the caster's (edges may
 * coincide) and is genuinely inset on at least two sides - so an identical footprint, or
 * one flush on three sides, does not count. The caster's footprint is shifted by the xy
 * part of its shadowOffset (where its shadow falls). Each aabb is already times-multiplied
 * at load, so is used directly.
 */
const casterContainsReceiverXy = (
  caster: ShadowCaster,
  receiver: CollideableItem,
) => {
  const casterX = caster.state.position.x + (caster.shadowOffset?.x ?? 0);
  const casterY = caster.state.position.y + (caster.shadowOffset?.y ?? 0);
  const { position } = receiver.state;

  // how far the caster's edge extends beyond the receiver's on each side
  // (negative means the receiver pokes out past the caster there):
  const overlaps = [
    position.x - casterX,
    casterX + caster.aabb.x - (position.x + receiver.aabb.x),
    position.y - casterY,
    casterY + caster.aabb.y - (position.y + receiver.aabb.y),
  ];

  // single pass (hot path - called per receiver, per caster, per frame): bail as soon as
  // any side pokes out, and count the sides the receiver is genuinely inset on
  let insetSides = 0;
  for (const overlap of overlaps) {
    if (overlap <= -epsilon) {
      // receiver pokes out past the caster on this side - not contained
      return false;
    }
    if (overlap > epsilon) {
      insetSides++;
    }
  }
  return insetSides >= 2;
};

/**
 * true iff this caster casts a *shaped* shadow on the receiver's top surface. A caster
 * resting directly on the surface (rather than floating above it) hides its own shadow
 * underneath itself, so is skipped as an optimisation unless it castsShadowWhileStoodOn.
 * This optimisation does not apply to whole-item tinting, which darkens the whole receiver
 * rather than just the footprint hidden under the caster.
 */
const castsShapedShadowOnTop = (
  caster: ShadowCaster,
  receiver: CollideableItem,
) =>
  caster.castsShadowWhileStoodOn ||
  caster.state.position.z > receiver.state.position.z + receiver.aabb.z;

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
  #output: Container = new Container({
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

  readonly renderContext: ItemRenderContext<T>;
  #appearance: "no-mask" | ItemShadowAppearanceOutsideView<T>;

  /**
   * the container darkened with a single tint when this item is wholly in shadow. Today
   * this is the item's graphics (composite) container; the renderer treats it only as
   * "the thing to tint" and does not depend on it being the parent.
   */
  #wholeShadowTintContainer: Container;

  constructor(
    renderContext: ItemRenderContext<T>,
    appearance: "no-mask" | ItemShadowAppearanceOutsideView<T>,
    wholeShadowTintContainer: Container,
  ) {
    this.renderContext = renderContext;
    this.#appearance = appearance;
    this.#wholeShadowTintContainer = wholeShadowTintContainer;
    this.#output.addChild(this.#shadowsContainer);
    if (
      !this.#showShadowMasks &&
      !renderContext.general.spriteOption.uncolourised
    ) {
      this.#output.filters = new AlphaFilter({ alpha: shadowAlpha });
    }
  }

  initShadowMaskRenderer() {
    const { renderContext } = this;
    const appearance = this.#appearance;

    // 'no-mask' means will accept any shadows without masking them - eg, on floors
    if (appearance !== "no-mask") {
      this.#shadowMaskRenderer = new ItemAppearancePixiRenderer(
        renderContext,
        appearance,
      );

      // add the whole shadow mask renderer output as a child of the top-level, even though
      // the sprite will be plucked out of its output and used directly as a mask
      if (renderContext.item.shadowOffset === undefined) {
        this.#output.addChild(this.#shadowMaskRenderer.output);
      } else {
        // create a new container to offset the shadow mask:
        const shadowMaskOffset = new Container({
          label: "shadowMaskOffset",
          children: [this.#shadowMaskRenderer.output],
          ...projectWorldXyzToScreenXy(renderContext.item.shadowOffset),
        });
        this.#output.addChild(shadowMaskOffset);
      }
    }
  }

  /** convenience for getting the shadow mask setting from the store */
  get #showShadowMasks() {
    return store.getState().userSettings.userSettings.displaySettings
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
        this.#output.mask = newShadowMaskSprite;
      } else {
        // for debugging: put the shadow mask in front of everything:
        this.renderContext.frontLayer.attach(newShadowMaskSprite);
      }
    }
  }

  destroy() {
    this.#output.destroy(true);
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

    const castersAbove = new Set(
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
          !maybeCaster.noShadowCastOn?.includes(item.type),
      ),
    );

    // if a whole-shadow caster fully covers this item, darken the whole item with a single
    // tint rather than rendering shaped shadows. Colourised only - uncolourised cast
    // shadows are hard black, so a whole-item tint would erase the item into its silhouette
    const wholeShadowed =
      !this.renderContext.general.spriteOption.uncolourised &&
      castersAbove
        .values()
        .some(
          (caster) =>
            caster.castsWholeShadows === true &&
            casterContainsReceiverXy(caster, item),
        );

    // tint the whole item when wholly shadowed, on top of (not instead of) its shaped
    // shadows, which keep rendering below:
    this.#wholeShadowTintContainer.tint =
      wholeShadowed ? wholeShadowTint : noTint;

    // casters that cast a shaped shadow on this item's surface - excludes ones resting
    // directly on top, whose shadow would be hidden under themselves (the stood-on
    // optimisation, which does not apply to the whole-item tint handled above)
    const shapedCasters = new Set(
      castersAbove
        .values()
        .filter((caster) => castsShapedShadowOnTop(caster, item)),
    );

    let hasAnyShadows = false;

    for (const [previousCaster, shadowSprite] of this.#shadowSprites) {
      if (!shapedCasters.has(previousCaster)) {
        // no longer casting a shadow on this item - remove the shadow sprite:
        this.#shadowsContainer.removeChild(shadowSprite);
        shadowSprite.destroy();
        this.#shadowSprites.delete(previousCaster);
      }
    }

    for (const caster of shapedCasters) {
      hasAnyShadows = true;

      let shadowSprite = this.#shadowSprites.get(caster);
      let isNew = false;

      if (!shadowSprite) {
        // wasn't casting a shadow before - create a new one:
        const { times } = caster.config as ConsolidatableConfig;

        const { shadowCastTexture } = caster;
        const { general } = this.renderContext;
        const { shadowSpritesheet } = general.spritesheetVariants;

        const castTextureMultiplied = renderMultipliedXy(
          {
            ...shadowCastTexture,
            paused: general.paused,
            spritesheet: shadowSpritesheet,
          } as SpecifiedTextureCreateSpriteOptions,
          times,
        );

        shadowSprite = maybeRenderContainerToSprite(
          pixiRenderer,
          castTextureMultiplied,
        );

        shadowSprite.label = caster.id;
        this.#shadowsContainer.addChild(shadowSprite);
        this.#shadowSprites.set(caster, shadowSprite);
        isNew = true;
      }

      if (isNew || surfaceMoved || movedItems.has(caster)) {
        // shadow needs (re) positioning
        const screenXy = projectWorldXyzToScreenXy({
          ...addXy(
            subXy(caster.state.position, item.state.position),
            // use just the xy part of the shadow offset to position the shadow on the surface:
            caster.shadowOffset ?? originXy,
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
    this.#output.visible = hasAnyShadows;

    // for efficiency, only tick the shadow mask if this renderer is showing something
    if (hasAnyShadows) {
      if (this.#shadowMaskRenderer === undefined) {
        this.initShadowMaskRenderer();
      }
      this.#tickShadowMask(itemTickContext);
    } else {
      if (this.#shadowMaskRenderer !== undefined) {
        this.#shadowMaskRenderer.destroy();
        this.#shadowMaskRenderer = undefined;
      }
    }
  }

  get output() {
    return this.#output;
  }
}

export const maybeCreateItemShadowRenderer = <T extends ItemInPlayType>(
  renderContext: ItemRenderContext<T>,
  wholeShadowTintContainer: Container,
): ItemShadowRenderer<T> | undefined => {
  const appearance = itemShadowMaskAppearanceForItem(renderContext.item);

  return appearance === undefined ? undefined : (
      new ItemShadowRenderer(
        renderContext,
        appearance,
        wholeShadowTintContainer,
      )
    );
};
