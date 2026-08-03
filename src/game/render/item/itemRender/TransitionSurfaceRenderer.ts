import { Container, type Filter, RenderTexture, type Texture } from "pixi.js";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { emptySet } from "../../../../utils/empty";
import { pixiContainerToString } from "../../../../utils/pixi/pixiContainerToString";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { type UniqueTextureSprite } from "../../../../utils/pixi/UniqueTextureSprite";
import {
  isAtQuarterAngle,
  nearestQuarterAngle,
} from "../../../../utils/vectors/rotateXy";
import {
  alongAxisOfDirectionXy,
  type AxisXy,
  dotProductXy,
  originXyz,
  subXy,
  type Xy,
} from "../../../../utils/vectors/vectors";
import { redAsAlphaFilter } from "../../filters/redAsAlphaFilter";
import { nearCornerOffsetWorldXyz } from "../../itemAppearances/adjustNearCornerForCameraAngle";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import {
  boxProjectedExtent,
  createCuboidTransitionMesh,
  type CuboidTransitionMesh,
} from "./cuboidTransitionMesh";
import { isCuboidWarpItem } from "./isCuboidWarpItem";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";
import { itemTypesExemptFromNearCornerOffset } from "./itemTypesExemptFromNearCornerOffset";

/** specialisation of Container that always contains a thing to be masked, and the (sprite) mask */
interface MaskingContainer extends Container {
  getChildAt(index: 0): UniqueTextureSprite;
  getChildAt(index: 1): Container;
  getChildAt(index: number): unknown;
  children: [UniqueTextureSprite, Container];
}

const logCyclicRendering = import.meta.env.VITE_LOG_CYCLIC_RENDERING === "true";

/**
 * A wall warps as a vertical plane; as that plane turns towards edge-on its drawn
 * width collapses to a line and the flat, foreshortened art smears. Fade the wall
 * out over the last ~20° before edge-on so it simply vanishes as it turns (it
 * hands over to the other angle's wall at the transition midpoint anyway).
 *
 * The plane's projected screen width is `√2·sin(Δ)·fullWidth`, where Δ is the
 * angle from edge-on and `fullWidth` is the width at a face-on discrete angle - so
 * a width ratio of `√2·sin(startAngle)` marks that angle from edge-on. Fade
 * linearly from there (alpha 1) to 0 at edge-on (ratio 0).
 */

/**
 * How close (in degrees) to edge-on a warping wall must turn before it begins to
 * fade. The wall stays fully opaque until its plane is within this angle of
 * edge-on, then fades linearly to invisible at edge-on. Larger values start the
 * dissolve earlier in the turn (gentler); smaller values keep the wall solid for
 * longer and then vanish it more abruptly.
 */
const wallEdgeOnFadeStartAngleDeg = 40;

const wallEdgeOnFadeStartWidthRatio =
  Math.SQRT2 * Math.sin((wallEdgeOnFadeStartAngleDeg * Math.PI) / 180);

/**
 * per wall axis, the (unnormalised, √2-length) diagonal the camera looks
 * along when that wall family is edge-on - the projected width of the wall's
 * plane scales with the camera angle's dot product onto it
 */
const wallWidthDirection = {
  x: { x: 1, y: -1 },
  y: { x: 1, y: 1 },
} as const satisfies Record<AxisXy, Xy>;

const wallEdgeOnFadeAlpha = (
  /** the axis the wall runs along */
  wallAlongAxis: AxisXy,
  /** the continuous (mid-transition) camera angle, on the unit circle */
  cameraAngle: Xy,
): number => {
  // the wall draws as a vertical plane along its axis, so its projected width
  // is how aligned the camera is with that axis's width direction: 1 at every
  // discrete camera angle, 0 when edge-on. The plane's extents cancel out of
  // the ratio - the fade is a function of the angles alone:
  const widthRatio = Math.abs(
    dotProductXy(cameraAngle, wallWidthDirection[wallAlongAxis]),
  );
  return Math.min(1, widthRatio / wallEdgeOnFadeStartWidthRatio);
};

/**
 * Chain link owning how an item's drawn surface behaves under cyclic-render
 * breaks and camera rotation: the inverse-mask carves that resolve draw-order
 * cycles, the cuboid warp that deforms boxy items through the continuous turn,
 * and the wall edge-on fade. These are kept together because the warp snapshots
 * the item's masked content - so the carves must already be baked in before the
 * snapshot is taken (see the mask reconcile at the top of {@link tick}).
 *
 * This link does NOT set its output's screen position - the outer
 * {@link ItemPositionRenderer} owns that. Its output holds the (near-corner
 * offset) art content, any mask wrappers, and - mid-warp - the warp mesh.
 */
export class TransitionSurfaceRenderer<
  T extends ItemInPlayType,
> implements ItemChainPixiRenderer<T> {
  output: Container;
  // store our hierarchy of masking containers by the front item they are using to mask:
  #maskingContainers: Map<UnionOfAllItemInPlayTypes, MaskingContainer> =
    new Map();

  readonly renderContext: ItemRenderContext<T>;
  #wrappedRenderer: ItemChainPixiRenderer<T>;
  /** whether this item type anchors its art at the origin (no near-corner offset) */
  #exemptFromNearCornerOffset: boolean;
  /**
   * the content that masks are applied to - initially the (near-corner-offset) graphics
   * (the wrapped renderer's output), then the outermost masking container once cyclic-rendering
   * masks wrap it. Tracked by reference because it MOVES when masks wrap/unwrap.
   */
  #maskedContent: Container;
  /**
   * the innermost art content (the wrapped renderer's output), hidden while a
   * cuboid warp mesh draws in its place. Kept separately from
   * {@link #maskedContent} because that reference MOVES when cyclic-rendering
   * masks wrap it mid-warp - restoring visibility on the (possibly re-wrapped)
   * masked content would leave the originally hidden container invisible
   * forever. This reference never changes identity.
   */
  #artContent: Container;
  /**
   * while a rotation warps this (boxy) item as a cuboid: the mesh drawn in
   * place of the real art, and the once-captured snapshot texture it samples.
   * Both undefined when not warping.
   */
  #cuboidMesh: CuboidTransitionMesh | undefined;
  #cuboidSnapshotTexture: Texture | undefined;
  /**
   * the discrete layer angle the cuboid mesh/snapshot were built for. When the
   * renderer survives the midpoint hand-over its discrete angle changes
   * mid-warp, so a mesh built for the old angle must be rebuilt
   */
  #cuboidMeshLayerAngle: undefined | Xy;
  /**
   * whether the last tick ran during a rotation - grants one further
   * update after a turn ends (see the gate in {@link tick})
   */
  #tickedMidRotation = false;

  constructor(
    renderContext: ItemRenderContext<T>,
    wrappedRenderer: ItemChainPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#wrappedRenderer = wrappedRenderer;
    this.#artContent = wrappedRenderer.output;
    this.#maskedContent = wrappedRenderer.output;
    this.#exemptFromNearCornerOffset = itemTypesExemptFromNearCornerOffset.has(
      renderContext.item.type,
    );
    this.output = new Container({
      label: `TransitionSurfaceRenderer ${renderContext.item.id}`,
      children: [this.#maskedContent],
    });
  }

  /**
   * Draw this item as a cuboid mesh warped to the interpolated angle. The mesh's
   * texture is a one-off snapshot of the real art at this layer's discrete angle;
   * its vertices are the box corners projected at θ(t), updated each frame.
   */
  #applyCuboidWarp(
    layerAngle: Xy,
    cameraAngle: Xy,
    pixiRenderer: ItemRenderContext<T>["general"]["pixiRenderer"],
  ) {
    const { item } = this.renderContext;

    if (
      this.#cuboidMesh !== undefined &&
      this.#cuboidMeshLayerAngle !== undefined &&
      (this.#cuboidMeshLayerAngle.x !== layerAngle.x ||
        this.#cuboidMeshLayerAngle.y !== layerAngle.y)
    ) {
      // the renderer's discrete angle changed mid-warp (the midpoint
      // hand-over): the mesh/snapshot were built for the old angle's art, so
      // rebuild them below from the (re-rendered) new-angle art:
      this.#teardownCuboidWarp();
    }

    if (this.#cuboidMesh === undefined) {
      // measure the ART's own local bounds, never the (possibly mask-wrapped)
      // content's: a mask wrapper's local bounds are in the wrapper's frame
      // (they include the art container's live position), and pixi clips them
      // by the mask - which here is an inverse mask (a carve), so the clip is
      // outright wrong and can collapse the bounds to nothing:
      const bounds = this.#artContent.getLocalBounds();
      if (bounds.maxX - bounds.minX <= 0 || bounds.maxY - bounds.minY <= 0) {
        // the art has not rendered yet (a freshly-built layer's first frame):
        // snapshotting now would capture an empty 0-size texture and build a
        // broken mesh. The outer position renderer draws the real art at the
        // projected position this frame; the mesh is built next frame, once
        // the art exists:
        return;
      }
      // warp the item's render box (which hugs the drawn art - eg a floor's thin
      // top slab), not its physical aabb (eg a floor's 3-block slab); fall back
      // to the aabb for items with no render box:
      const renderBox = this.renderContext.renderBoxes.get(item);
      const dims = renderBox?.renderAabb ?? item.aabb;
      const offset = renderBox?.renderAabbOffset ?? originXyz;

      // Snapshot into a texture sized to the union of the box's projected extent
      // and the drawn art's own bounds, in the item container's local (origin =
      // 0,0) frame. The mesh maps the WHOLE snapshot rectangle (see
      // cuboidTransitionMesh: a per-face sector fan around the near-top
      // corner), so all art - including overdraw outside the box silhouette -
      // warps with its nearest face, UVs stay within the texture by
      // construction, and the union sizing guarantees the rectangle covers
      // the full box silhouette so no face is cropped by the texture's edge.
      const boxExtent = boxProjectedExtent(dims, offset, layerAngle);
      // Where the art container's origin (its near corner) sits in the item's
      // local frame. Non-exempt items anchor their art at the near corner P(nco);
      // during a warp that offset is NOT driven by the near-corner offset link
      // (which returns early for warp items), so compute the discrete layer-angle
      // offset directly. Exempt types (floor/wall/doorFrame) have no offset
      // container and draw at the origin, matching how their render box is defined:
      const artNco =
        this.#exemptFromNearCornerOffset ?
          { x: 0, y: 0 }
        : projectWorldXyzToScreenXy(
            nearCornerOffsetWorldXyz(item, layerAngle),
            layerAngle,
          );
      const artOriginX = artNco.x;
      const artOriginY = artNco.y;
      const unionMinX = Math.min(boxExtent.min.x, artOriginX + bounds.minX);
      const unionMinY = Math.min(boxExtent.min.y, artOriginY + bounds.minY);
      const unionMaxX = Math.max(boxExtent.max.x, artOriginX + bounds.maxX);
      const unionMaxY = Math.max(boxExtent.max.y, artOriginY + bounds.maxY);
      // render the art shifted by an INTEGER amount so the (integer-positioned)
      // art pixels are not resampled into the snapshot - only the mesh should
      // resample them, once. Rounding the offset up keeps the texture covering
      // the whole union:
      const artShiftX = Math.ceil(artOriginX - unionMinX);
      const artShiftY = Math.ceil(artOriginY - unionMinY);
      const originX = artShiftX - artOriginX;
      const originY = artShiftY - artOriginY;
      const texture = RenderTexture.create({
        width: Math.max(1, Math.ceil(unionMaxX + originX)),
        height: Math.max(1, Math.ceil(unionMaxY + originY)),
        antialias: false,
        // snapshot at the sheet's cleanEdge bake factor so smooth-sprites
        // art doesn't drop to 1x detail during the rotation transition:
        resolution: this.renderContext.general.spritesheets.bakeFactor,
      });
      this.#cuboidSnapshotTexture = texture;
      // position for the snapshot so the art's origin lands on (artShift): when
      // cyclic-rendering masks have wrapped the art, the wrapper is the render
      // root (so the masks' carves bake into the snapshot) - the art inside is
      // re-anchored at its discrete layer-angle offset (its live offset may be
      // a stale mid-turn interpolation) and the wrapper shifted by the
      // remainder, which keeps every mask sprite at its authored offset
      // relative to the art:
      const snapshotRoot = this.#maskedContent;
      const priorRootX = snapshotRoot.position.x;
      const priorRootY = snapshotRoot.position.y;
      if (snapshotRoot === this.#artContent) {
        snapshotRoot.position.set(artShiftX, artShiftY);
      } else {
        this.#artContent.position.set(artOriginX, artOriginY);
        snapshotRoot.position.set(
          artShiftX - artOriginX,
          artShiftY - artOriginY,
        );
      }
      // pixi's render({container}) permanently converts the container into a
      // render group as a side effect (AbstractRenderer calls
      // enableRenderGroup on it). A live in-tree render group breaks any
      // RenderLayer-attached descendant (eg the floor's colour-clash strips,
      // attached to the room's colourClashLayer): pixi draws layer children
      // inside a nested render group screen-fixed at their group-local
      // transform, ignoring ancestor movement and visibility. The snapshot
      // only borrows the container as a render root, so restore whatever
      // grouping it had before:
      const wasRenderGroup = snapshotRoot.isRenderGroup;
      pixiRenderer.render({ container: snapshotRoot, target: texture });
      snapshotRoot.isRenderGroup = wasRenderGroup;
      // restore: the art stays re-anchored at the discrete layer-angle offset
      // (matching the unwrapped path); a mask wrapper goes back where it was:
      if (snapshotRoot === this.#artContent) {
        snapshotRoot.position.set(artOriginX, artOriginY);
      } else {
        snapshotRoot.position.set(priorRootX, priorRootY);
      }

      this.#cuboidMesh = createCuboidTransitionMesh(
        item,
        texture,
        layerAngle,
        // the item origin's pixel in the texture (= where the art shift put it):
        { x: originX, y: originY },
        dims,
        offset,
      );
      // hide the real art and show the warping mesh in its place. Hidden via
      // #artContent (stable identity), NOT #maskedContent: masks can re-wrap
      // the masked content mid-warp, and restoring visibility on a different
      // container than was hidden would leave the art invisible forever:
      this.#artContent.visible = false;
      this.output.addChild(this.#cuboidMesh.mesh);
      this.#cuboidMeshLayerAngle = layerAngle;
    }

    this.#cuboidMesh.update(cameraAngle);

    if (item.type === "wall") {
      this.output.alpha = wallEdgeOnFadeAlpha(
        alongAxisOfDirectionXy(item.config.direction),
        cameraAngle,
      );
    }
  }

  #teardownCuboidWarp() {
    // walls dim towards edge-on during the warp; restore full opacity once it ends:
    this.output.alpha = 1;
    if (this.#cuboidMesh !== undefined) {
      const { geometry } = this.#cuboidMesh.mesh;
      this.output.removeChild(this.#cuboidMesh.mesh);
      this.#cuboidMesh.mesh.destroy();
      geometry.destroy();
      this.#cuboidMesh = undefined;
    }
    if (this.#cuboidSnapshotTexture !== undefined) {
      this.#cuboidSnapshotTexture.destroy(true);
      this.#cuboidSnapshotTexture = undefined;
    }
    this.#cuboidMeshLayerAngle = undefined;
    this.#artContent.visible = true;
  }

  #updateWarp() {
    const {
      general: { cameraAngle, pixiRenderer },
      item,
    } = this.renderContext;
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
    const midRotation = !isAtQuarterAngle(cameraAngle);

    if (midRotation && isCuboidWarpItem(item)) {
      this.#applyCuboidWarp(cameraQuarterAngle, cameraAngle, pixiRenderer);
      return;
    }
    // the turn ended (or the item stopped warping): drop the mesh and restore
    // the real art:
    if (this.#cuboidMesh !== undefined) {
      this.#teardownCuboidWarp();
    }
  }

  tick(tickContext: ItemTickContext) {
    this.#wrappedRenderer.tick(tickContext);

    // masks reconcile BEFORE the warp update: mid-transition the art is drawn
    // via a snapshot baked from the masked content, so a mask that (re)wraps on
    // the same tick as the warp (re)builds - eg at the midpoint hand-over, where
    // the z-graph and its cyclic breaks are recomputed - must be in place before
    // the snapshot is taken, or the mesh shows uncarved art overdrawing the item
    // in front of it
    this.#tickMasks();

    const midRotation = !isAtQuarterAngle(
      this.renderContext.general.cameraAngle,
    );
    if (
      tickContext.movedOrResizedItems.has(this.renderContext.item) ||
      // mid-rotation nothing moves (the moved set is truthfully empty) but
      // every item re-projects along the continuous θ(t):
      midRotation ||
      // run once more after the render angle settles back onto a quarter
      // angle: this tears down any cuboid warp mesh (restoring the real art):
      this.#tickedMidRotation
    ) {
      this.#updateWarp();
    }
    this.#tickedMidRotation = midRotation;
  }

  // get all the broken edges in front of this item
  #brokenEdges(): Set<UnionOfAllItemInPlayTypes> {
    const inFrontOfItemEdges = this.renderContext.zEdges.get(
      this.renderContext.item,
    );

    if (!inFrontOfItemEdges) {
      return emptySet as Set<UnionOfAllItemInPlayTypes>;
    }

    let brokenEdges: Set<UnionOfAllItemInPlayTypes> | undefined;
    for (const [frontItem, isBroken] of inFrontOfItemEdges) {
      if (isBroken) {
        if (!brokenEdges) {
          brokenEdges = new Set<UnionOfAllItemInPlayTypes>();
        }
        brokenEdges.add(frontItem);
      }
    }
    return brokenEdges ?? (emptySet as Set<UnionOfAllItemInPlayTypes>);
  }

  #addMaskingContainer(
    frontItem: UnionOfAllItemInPlayTypes,
    maskingSprite: UniqueTextureSprite,
  ) {
    const maskingContainer = new Container({
      label: `maskWith: ${frontItem.id}`,
      // push the current masked content one level down in the hierarchy:
      children: [maskingSprite, this.#maskedContent],
    }) as MaskingContainer;

    this.output.addChild(maskingContainer);

    // that's the point of this, to mask:
    maskingContainer.setMask({ mask: maskingSprite, inverse: true });

    // record our masking container:
    this.#maskingContainers.set(frontItem, maskingContainer);

    // the masking container now holds (and so masks) what was the masked content:
    this.#maskedContent = maskingContainer;

    return maskingContainer;
  }

  #destroyMaskingContainer(
    frontItem: UnionOfAllItemInPlayTypes,
    maskingContainer: MaskingContainer,
  ) {
    const [maskingSprite, contents] = maskingContainer.children;
    const localParent = maskingContainer.parent!;

    localParent.removeChild(maskingContainer);
    localParent.addChild(contents);

    // if we just unwrapped the outermost mask, its contents become the masked content again:
    if (this.#maskedContent === maskingContainer) {
      this.#maskedContent = contents;
    }

    // probably doesn't matter since we're going to destroy anyway,
    // but .mask can cause crashes sometimes if things aren't set up just so
    maskingContainer.mask = null;
    maskingSprite.destroy();
    maskingContainer.destroy();
    this.#maskingContainers.delete(frontItem);
  }

  #tickMasks() {
    const { pixiRenderer, cameraAngle } = this.renderContext.general;
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);

    // map of all items in front of us => if the edge is broken
    const brokenEdges = this.#brokenEdges();

    // check for broken links (have masking sprites) that are no longer broken:
    for (const previousFront of this.#maskingContainers.keys()) {
      if (!brokenEdges.has(previousFront)) {
        // edge no longer broken: remove the masking sprite
        const maskingContainer = this.#maskingContainers.get(previousFront);

        if (maskingContainer) {
          if (logCyclicRendering) {
            console.info(
              "no longer masking:",
              previousFront.id,
              "from:",
              this.renderContext.item.id,
            );
          }

          try {
            this.#destroyMaskingContainer(previousFront, maskingContainer);
          } catch (e) {
            throw new Error(
              `error while destroying masking container ${pixiContainerToString(maskingContainer)}
              for our rendering: ${pixiContainerToString(this.output)}`,
              { cause: e },
            );
          }
        }
      }
    }

    // the mask is re-baked from the front item's rendering EVERY tick (not
    // only when something moved): the front item's sprites can be animated,
    // so its silhouette - and therefore the carve it makes in this item -
    // can change every frame. The bake reuses the masking sprite and its
    // render texture, so the per-frame cost is one small render pass per
    // broken edge
    for (const frontItem of brokenEdges) {
      const preExistingMaskingContainer =
        this.#maskingContainers.get(frontItem);

      const preExistingMaskingSprite = preExistingMaskingContainer?.children[0];

      const frontRenderingForMask =
        this.renderContext.getItemRenderPipeline(frontItem)?.itemPixiRenderer
          ?.output;

      if (frontRenderingForMask === undefined) {
        throw new Error("nothing to use as a mask");
      }

      const previousFilters = frontRenderingForMask.filters;
      // temporarily swop in a filter for rendering this container
      frontRenderingForMask.filters = redAsAlphaFilter;

      const curMaskingSprite = renderContainerToSprite(
        pixiRenderer,
        frontRenderingForMask,
        // attempt to reuse the existing sprite, if there is one
        // NOTE: renderContainerToSprite will handle destroying the renderTexture
        // of this sprite if it can't be reused
        preExistingMaskingSprite,
        `red mask: ${frontItem.id}`,
      );

      // pixi's .filter property is readonly when read, and mutable when set, so we
      // need to cast even just to give a container back its old filters
      // TODO: remove after this PR merged/released in pixi: https://github.com/pixijs/pixijs/pull/11757
      frontRenderingForMask.filters = previousFilters as Filter[];

      if (preExistingMaskingContainer === undefined) {
        if (logCyclicRendering) {
          console.warn(
            "adding masking for item in front:",
            frontItem.id,
            "from:",
            this.renderContext.item.id,
          );
        }
        this.#addMaskingContainer(frontItem, curMaskingSprite);
      }

      const renderedPositionDiff = subXy(
        projectWorldXyzToScreenXy(frontItem.state.position, cameraQuarterAngle),
        projectWorldXyzToScreenXy(
          this.renderContext.item.state.position,
          cameraQuarterAngle,
        ),
      );

      // the mask was baked from the front item's appearance output, whose art
      // is anchored at the front's near corner by a container OUTSIDE that
      // output - so the carve must be offset by the front's near-corner offset
      // too (zero at the base angle, a base cell on each camera-reversed
      // axis otherwise). Exempt types draw at their origin with no offset:
      const frontNearCornerOffset =
        itemTypesExemptFromNearCornerOffset.has(frontItem.type) ? originXyz : (
          nearCornerOffsetWorldXyz(frontItem, cameraQuarterAngle)
        );
      const frontNearCornerOffsetXy = projectWorldXyzToScreenXy(
        frontNearCornerOffset,
        cameraQuarterAngle,
      );

      curMaskingSprite.x = renderedPositionDiff.x + frontNearCornerOffsetXy.x;
      curMaskingSprite.y = renderedPositionDiff.y + frontNearCornerOffsetXy.y;
    }
  }

  destroy(): void {
    // release the warp snapshot texture if a transition was interrupted (eg by a
    // room change) mid-turn; the display objects (mask sprites, mesh, art) are
    // destroyed by the outer position renderer's `destroy({ children: true })`:
    this.#cuboidSnapshotTexture?.destroy(true);
    this.#wrappedRenderer.destroy();
  }
}
