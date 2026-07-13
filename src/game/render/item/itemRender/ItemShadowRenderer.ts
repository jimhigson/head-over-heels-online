import { AlphaFilter, Container, Sprite } from "pixi.js";
import { type SetRequired, type WritableDeep } from "type-fest";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { type ConsolidatableConfig } from "../../../../model/json/utilityJsonConfigTypes";
import { roomSpatialIndexKey } from "../../../../model/RoomState";
import { wallTimes } from "../../../../model/times";
import { store } from "../../../../store/store";
import { assignRoundedXy } from "../../../../utils/pixi/assignRoundedXy";
import { maybeRenderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { renderMultipliedXy } from "../../../../utils/pixi/renderMultipliedXy";
import { nearestQuarterAngle } from "../../../../utils/vectors/rotateXy";
import {
  addXy,
  cameraAngleIsOddQuarterTurn,
  originXy,
  subXy,
  type Xy,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import {
  type CollideableItem,
  collisionItemWithIndex,
} from "../../../collision/aabbCollision";
import { veryHighZ } from "../../../physics/mechanicsConstants";
import { type SpecifiedTextureCreateSpriteOptions } from "../../createSprite";
import { nearCornerOffsetWorldXyz } from "../../itemAppearances/adjustNearCornerForCameraAngle";
import {
  type ItemShadowAppearanceOutsideView,
  itemShadowMaskAppearanceForItem,
} from "../../itemAppearances/shadowMaskAppearances/itemShadowMaskAppearanceForItem";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import {
  floorDrawnOriginXyOffset,
  type RenderBox,
} from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import {
  castsShadowWhileStoodOnAtAngle,
  noShadowCastOnAtAngle,
  shadowCastTextureAtAngle,
} from "../../shadows/shadowAtAngle";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";
import { itemTypesExemptFromNearCornerOffset } from "./itemTypesExemptFromNearCornerOffset";
import { wholeShadowCastersCoverReceiver } from "./wholeShadowCastersCoverReceiver";

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
 * the render box's aabb, or undefined for boxless items and for zero-size
 * boxes (items that draw nothing, whose box exists only for draw-ordering)
 */
const nonZeroSizeRenderAabb = (
  renderBox: null | RenderBox | undefined,
): undefined | Xyz => {
  if (renderBox === null || renderBox === undefined) {
    return undefined;
  }
  const { renderAabb } = renderBox;
  return renderAabb.x === 0 && renderAabb.y === 0 && renderAabb.z === 0 ?
      undefined
    : renderAabb;
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
  cameraQuarterAngle: Xy,
) =>
  castsShadowWhileStoodOnAtAngle(caster, cameraQuarterAngle) ||
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
  implements ItemChainPixiRenderer<T>
{
  #output: Container = new Container({
    label: "ItemShadowRenderer",
  });
  #shadowsContainer: Container = new Container({
    label: "shadows",
  });
  #shadowMaskRenderer: ItemChainPixiRenderer<T, Container<Sprite>> | undefined;

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
   * the camera angle the cached shadow sprites (and the shadow mask offset)
   * were built for - their textures/flips bake the angle, so an angle change
   * mid-life invalidates them all
   */
  #appliedCameraAngle: Xy;
  /** the offset container for items with a shadowOffset, positioned per angle */
  #shadowMaskOffsetContainer: Container | undefined;

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
    this.#appliedCameraAngle = nearestQuarterAngle(
      renderContext.general.cameraAngle,
    );
    this.#wholeShadowTintContainer = wholeShadowTintContainer;
    this.#output.addChild(this.#shadowsContainer);
    if (
      !this.#showShadowMasks &&
      !renderContext.general.spriteOption.uncolourised
    ) {
      // identical for every shadow in the room, so shared via the room
      // renderer's filter cache:
      this.#output.filters = renderContext.filterCache.getOrInsertComputed(
        `alpha(${shadowAlpha})`,
        () => new AlphaFilter({ alpha: shadowAlpha }),
      );
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
          ...projectWorldXyzToScreenXy(
            renderContext.item.shadowOffset,
            nearestQuarterAngle(renderContext.general.cameraAngle),
          ),
        });
        this.#shadowMaskOffsetContainer = shadowMaskOffset;
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
    const { movedOrResizedItems } = itemTickContext;

    const {
      item,
      general: {
        pixiRenderer,
        cameraAngle,
        upscale: { gameEngineUpscale },
        spriteOption: { uncolourised },
      },
      room,
    } = this.renderContext;
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);

    if (
      this.#appliedCameraAngle.x !== cameraQuarterAngle.x ||
      this.#appliedCameraAngle.y !== cameraQuarterAngle.y
    ) {
      // the renderer's discrete angle changed mid-life: every cached shadow
      // sprite baked the old angle (texture choice, flips, multiplied tiling),
      // so drop them all - they recreate below from the same reconcile pass:
      for (const [caster, shadowSprite] of this.#shadowSprites) {
        this.#shadowsContainer.removeChild(shadowSprite);
        shadowSprite.destroy();
        this.#shadowSprites.delete(caster);
      }
      if (
        this.#shadowMaskOffsetContainer !== undefined &&
        item.shadowOffset !== undefined
      ) {
        const offsetXy = projectWorldXyzToScreenXy(
          item.shadowOffset,
          cameraQuarterAngle,
        );
        this.#shadowMaskOffsetContainer.position.set(offsetXy.x, offsetXy.y);
      }
      this.#appliedCameraAngle = cameraQuarterAngle;
    }

    const surfaceMoved = movedOrResizedItems.has(item);
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
          shadowCastTextureAtAngle(maybeCaster, cameraQuarterAngle) !==
            undefined &&
          !noShadowCastOnAtAngle(maybeCaster, cameraQuarterAngle)?.includes(
            item.type,
          ),
      ),
    );

    // if the whole-shadow casters above this item together cover it, darken the whole item
    // with a single tint on top of its shaped shadows. Colourised only - uncolourised cast
    // shadows are hard black, so a whole-item tint would erase the item into its silhouette
    const wholeShadowed =
      !this.renderContext.general.spriteOption.uncolourised &&
      wholeShadowCastersCoverReceiver(castersAbove, item);

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
        .filter((caster) =>
          castsShapedShadowOnTop(caster, item, cameraQuarterAngle),
        ),
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
        // wasn't casting a shadow before - create a new one. Walls don't carry
        // a times config (their length comes from their tiles array), so
        // derive it - their cast shadow must repeat along the wall's length:
        const times =
          caster.type === "wall" ?
            wallTimes(caster.config)
          : (caster.config as ConsolidatableConfig).times;

        const { flipsOnOddQuarterCameraTurns, ...shadowCastTexture } =
          shadowCastTextureAtAngle(caster, cameraQuarterAngle) ??
          caster.shadowCastTexture;
        const { general } = this.renderContext;
        const { shadowSpritesheet } = general.spritesheetVariants;

        // axis-following shadow art (eg barriers) is drawn for one world axis
        // and flipped for the other; an odd quarter camera turn swaps which
        // axis the caster renders along, so the flip swaps with it:
        const flipX =
          (shadowCastTexture.flipX ?? false) !==
          (flipsOnOddQuarterCameraTurns === true &&
            cameraAngleIsOddQuarterTurn(cameraQuarterAngle));

        const castTextureMultiplied = renderMultipliedXy(
          {
            ...shadowCastTexture,
            flipX,
            paused: general.paused,
            // multiplied casts tile along their world axes, which the
            // projection rotates on screen:
            cameraQuarterAngle,
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

      if (isNew || surfaceMoved || movedOrResizedItems.has(caster)) {
        // shadow needs (re) positioning. The shadow art is footprint-anchored like the
        // caster's sprite, so it takes the caster's near-corner offset to sit under the
        // caster's rendered footprint. It renders inside this (receiving) item's
        // near-corner offset container, which is irrelevant to where the caster is, so
        // that offset is subtracted back out (it is zero for exempt types, eg floors):
        const casterNearCornerOffset = nearCornerOffsetWorldXyz(
          caster,
          cameraQuarterAngle,
          // the cast art matches the caster's rendered box where that differs
          // from its physics box (eg door legs, whose physics extends down the
          // door tunnel but whose hint shadow covers only the threshold).
          // Items that draw nothing (zero-size render box, eg the corner
          // shadow cubes) still cast the shadow of their physical box, so
          // anchor those by the aabb:
          nonZeroSizeRenderAabb(this.renderContext.renderBoxes.get(caster)) ??
            caster.aabb,
        );
        const receiverNearCornerOffset =
          itemTypesExemptFromNearCornerOffset.has(item.type) ? originXy : (
            nearCornerOffsetWorldXyz(item, cameraQuarterAngle)
          );
        // shadows render in the receiver's content-local space; a floor's
        // origin is its drawn (render box) origin, not its physical position:
        const receiverDrawnOriginOffset =
          item.type === "floor" ?
            floorDrawnOriginXyOffset(this.renderContext.renderBoxes.get(item))
          : originXy;
        const screenXy = projectWorldXyzToScreenXy(
          {
            ...addXy(
              subXy(
                caster.state.position,
                item.state.position,
                receiverNearCornerOffset,
                receiverDrawnOriginOffset,
              ),
              // use just the xy part of the shadow offset to position the shadow on the surface:
              caster.shadowOffset ?? originXy,
              casterNearCornerOffset,
            ),
            // on the top of the item:
            z: item.aabb.z,
          },
          cameraQuarterAngle,
        );

        assignRoundedXy(
          shadowSprite,
          screenXy.x,
          screenXy.y,
          uncolourised ? 1 : gameEngineUpscale,
        );

        //const zToCaster = casterItem.state.position.z - itemTop;
        //shadowSprite.alpha = 1 - zToCaster / (blockSizePx.h * 8);
        // (shadowSprite.filters as [BlurFilter])[0].strength =
        //   zToCaster * blurPerZToCaster;
        // this fails for composite sprites, since they get their x,y set in the sprite they are rendered to
        // shadowSprite.x = screenXy.x;
        // shadowSprite.y = screenXy.y;
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
