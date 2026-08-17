import {
  Container,
  type Filter,
  type MeshGeometry,
  RenderTexture,
  type Texture,
} from "pixi.js";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { emptySet } from "../../../../utils/empty";
import { renderContainerToSprite } from "../../../../utils/pixi/bakeContainerToSprite";
import { pixiContainerToString } from "../../../../utils/pixi/pixiContainerToString";
import { type UniqueTextureSprite } from "../../../../utils/pixi/UniqueTextureSprite";
import {
  isAtQuarterAngle,
  nearestQuarterAngle,
} from "../../../../utils/vectors/cameraAngleVectors";
import {
  alongAxisOfDirectionXy,
  type AxisXy,
  dotProductXy,
  originXyz,
  type Xy,
} from "../../../../utils/vectors/vectors";
import { redAsAlphaFilter } from "../../filters/redAsAlphaFilter";
import { nearCornerOffsetWorldXyz } from "../../itemAppearances/adjustNearCornerForCameraAngle";
import {
  type ItemRenderContext,
  itemRenderingStale,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import {
  projectWorldXyzToScreenX,
  projectWorldXyzToScreenXy,
  projectWorldXyzToScreenY,
} from "../../projections";
import {
  boxProjectedExtent,
  createCuboidTransitionMesh,
  type CuboidTransitionMesh,
} from "./cuboidTransitionMesh";
import { isCuboidWarpItem } from "./isCuboidWarpItem";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";
import { itemTypesExemptFromNearCornerOffset } from "./itemTypesExemptFromNearCornerOffset";

/**
 * symbol to use to make a container as a cyclic-mask wrapper.
 * A silhouette bake has to
 * recognise the carve wrappers inside ANOTHER item's subtree, and it reaches
 * that item only through its drawn container - so the fact lives on the
 * container under this hidden symbol key
 */
const cyclicMaskWrapperSymbol: unique symbol = Symbol();

/** specialisation of Container that always contains a thing to be masked, and the (sprite) mask */
interface MaskingContainer extends Container {
  [cyclicMaskWrapperSymbol]: true;
  getChildAt(index: 0): UniqueTextureSprite;
  getChildAt(index: 1): Container;
  getChildAt(index: number): unknown;
  children: [UniqueTextureSprite, Container];
}

const isCyclicMaskWrapper = (node: Container): node is MaskingContainer =>
  cyclicMaskWrapperSymbol in node;

// SMELL: the cyclic-mask bake re-captures the front item's silhouette every
// frame, for every broken edge, because an animating front can change its
// silhouette at any time. Items whose art is static could skip it, but nothing
// currently reports whether a leaf renderer's last tick changed anything -
// that signal is what this needs

const logCyclicRendering = import.meta.env.VITE_LOG_CYCLIC_RENDERING === "true";

/**
 * collect every cyclic-mask wrapper in the subtree into `into`, for
 * restoration after the bake.
 *
 * The whole subtree has to be walked because a carve wrapper can sit at any
 * depth: each broken edge wraps whatever was already drawn, so several nest
 * one inside the next, and outer decoration (the pick-up-next highlight) sits
 * above them again. Neither the outermost nor the innermost container can be
 * assumed to be the wrapper
 */
const collectCarveWrappers = (
  node: Container,
  into: MaskingContainer[],
): void => {
  if (isCyclicMaskWrapper(node)) {
    into.push(node);
  }
  for (const child of node.children) {
    collectCarveWrappers(child, into);
  }
};

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
 * Link in the item renderer wrapper chain that owns how an item's drawn surface
 * behaves under cyclic-render
 * breaks and the warping from non-settled angle camera rotation: the inverse-mask
 * carves that resolve draw-order
 * cycles, the cuboid warp that deforms boxy items through the continuous turn,
 * and the wall edge-on fade. These are kept together because the carves target
 * whichever surface is currently drawn - settled, the (quarter-angle) art;
 * mid-turn, the warp mesh - re-baked per frame from the front item's drawn
 * silhouette at the current render angle (see {@link #tickMasks}), never baked
 * into the warp snapshot (a carve frozen into the snapshot would drift off the
 * front item as the two items warp differently).
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

  /**
   * reused between bakes - the carve wrappers found in the subtree currently
   * being baked, held so they can be restored afterwards. Emptied at the end
   * of every bake, so it is only non-empty mid-bake
   */
  #suspendedWrappers: MaskingContainer[] = [];

  readonly renderContext: ItemRenderContext<T>;
  #wrappedRenderer: ItemChainPixiRenderer<T>;
  /** whether this item type anchors its art at the origin (no near-corner offset) */
  #exemptFromNearCornerOffset: boolean;
  /**
   * the content that masks are applied to - this item's currently-drawn
   * surface: the (near-corner-offset) graphics normally, the warp mesh while
   * one draws in the art's place, and the outermost masking container once
   * cyclic-rendering masks wrap either. Tracked by reference because it
   * MOVES when masks wrap/unwrap and when the warp mesh comes and goes.
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
  /**
   * the mesh's geometry, held directly: pixi's Mesh.destroy nulls the mesh's
   * own reference without destroying it, so releasing it after the subtree
   * has been destroyed needs this handle
   */
  #cuboidMeshGeometry: MeshGeometry | undefined;
  #cuboidSnapshotTexture: Texture | undefined;
  /**
   * the discrete layer angle the cuboid mesh/snapshot were built for. When the
   * renderer survives the midpoint hand-over its discrete angle changes
   * mid-warp, so a mesh built for the old angle must be rebuilt
   */
  #cuboidMeshLayerAngle: undefined | Xy;

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
      const dims = renderBox?.renderAabb ?? {
        x: item.state.box.xd,
        y: item.state.box.yd,
        z: item.state.box.zd,
      };
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
      // position for the snapshot so the art's origin lands on (artShift). The
      // render root is the RAW art - never a cyclic-mask wrapper: the quarter
      // carves must NOT bake into the snapshot, because mid-turn the carves
      // are applied to the warped mesh instead (see #tickWarpMasks), tracking
      // the front item's true θ silhouette. Rendering the art directly
      // bypasses any wrapper masks (they are set on the wrapper, not the art):
      const snapshotRoot = this.#artContent;
      snapshotRoot.position.set(artShiftX, artShiftY);
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
      // NOTE: this restore triggers a pixi defect - the subtree's inherited
      // groupColor, rebased during the bake, is left stale on re-attachment
      // (see PIXI_BUGS.md, bug 1). RoomRenderer's per-tick tint re-dirty is
      // the interim workaround:
      snapshotRoot.isRenderGroup = wasRenderGroup;
      // restore: the art stays re-anchored at the discrete layer-angle offset:
      snapshotRoot.position.set(artOriginX, artOriginY);

      this.#cuboidMesh = createCuboidTransitionMesh(
        item,
        texture,
        layerAngle,
        // the item origin's pixel in the texture (= where the art shift put it):
        { x: originX, y: originY },
        dims,
        offset,
      );
      // any masks currently wrap the (about to be hidden) art; the drawn
      // surface is now the mesh, so drop them - the next #tickMasks
      // re-creates them around it:
      this.#clearMasks();
      // hide the real art and show the warping mesh in its place. Hidden via
      // #artContent (stable identity), NOT #maskedContent: masks can re-wrap
      // the masked content mid-warp, and restoring visibility on a different
      // container than was hidden would leave the art invisible forever:
      this.#artContent.visible = false;
      this.output.addChild(this.#cuboidMesh.mesh);
      this.#cuboidMeshGeometry = this.#cuboidMesh.mesh.geometry;
      this.#maskedContent = this.#cuboidMesh.mesh;
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
    // unwrap and destroy the masks first, so the mesh is a direct child
    // of the output again before it is removed:
    this.#clearMasks();
    if (this.#cuboidMesh !== undefined) {
      this.output.removeChild(this.#cuboidMesh.mesh);
      this.#cuboidMesh.mesh.destroy();
      this.#cuboidMeshGeometry?.destroy();
      this.#cuboidMeshGeometry = undefined;
      this.#cuboidMesh = undefined;
    }
    if (this.#cuboidSnapshotTexture !== undefined) {
      this.#cuboidSnapshotTexture.destroy(true);
      this.#cuboidSnapshotTexture = undefined;
    }
    this.#cuboidMeshLayerAngle = undefined;
    this.#artContent.visible = true;
    // the drawn surface is the real art again - masks re-create around it:
    this.#maskedContent = this.#artContent;
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

    if (itemRenderingStale(this.renderContext.item, tickContext)) {
      this.#updateWarp();
    }

    // AFTER the warp update, so a newly-built (or torn-down) mesh is the
    // surface the masks wrap; the fronts' surfaces are already updated for
    // this frame (broken fronts tick first):
    this.#tickMasks();
  }

  /**
   * destroy all cyclic masks - used when the drawn surface they wrap changes
   * identity (the warp mesh being built or torn down); {@link #tickMasks}
   * recreates them around the new surface
   */
  #clearMasks() {
    for (const [frontItem, maskingContainer] of this.#maskingContainers) {
      this.#destroyMaskingContainer(frontItem, maskingContainer);
    }
  }

  /**
   * the items in front of this one whose draw-order edge the sort had to
   * sever - the cycles this item resolves by carving them out of its own
   * surface
   */
  #brokenEdges(): Set<UnionOfAllItemInPlayTypes> {
    let brokenEdges: Set<UnionOfAllItemInPlayTypes> | undefined;
    this.renderContext.zEdges.forEachBrokenEdgeFrom(
      this.renderContext.item,
      // this walk accumulates into a local, so it has nothing to thread
      // through as a context:
      undefined,
      (frontItem) => {
        if (!brokenEdges) {
          brokenEdges = new Set<UnionOfAllItemInPlayTypes>();
        }
        brokenEdges.add(frontItem);
      },
    );
    return brokenEdges ?? (emptySet as Set<UnionOfAllItemInPlayTypes>);
  }

  #addMaskingContainer(
    frontItem: UnionOfAllItemInPlayTypes,
    maskingSprite: UniqueTextureSprite,
  ) {
    const maskingContainer = Object.assign(
      new Container({
        label: `maskWith: ${frontItem.id}`,
        // push the current masked content one level down in the hierarchy:
        children: [maskingSprite, this.#maskedContent],
      }),
      // so another item's bake can recognise this as a carve to suspend:
      { [cyclicMaskWrapperSymbol]: true },
    ) as MaskingContainer;

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

  /**
   * bake a container's current rendering into a sprite whose alpha is that
   * rendering's silhouette - the shape an item in front carves out of this
   * item. The red-as-alpha filter is swopped in only for the bake.
   *
   * The front's OWN cyclic carves are suspended for the bake, for two
   * reasons: the carve should be the front's FULL silhouette (both choices
   * of a cycle's severed edge must render near-identically, which nested
   * carve holes would break), and pixi computes a mask-wrapped container's
   * bounds with regular-mask semantics - clipping by what is really an
   * inverse mask, cropping the bake wrongly.
   */
  #bakeSilhouetteSprite(
    container: Container,
    reuseSprite: undefined | UniqueTextureSprite,
    label: string,
  ): UniqueTextureSprite {
    const suspendedWrappers = this.#suspendedWrappers;
    collectCarveWrappers(container, suspendedWrappers);
    for (const wrapper of suspendedWrappers) {
      // detach the carve AND hide its mask sprite: unmasked, the sprite
      // would otherwise render as ordinary content (and stretch the bounds)
      wrapper.mask = null;
      wrapper.children[0].visible = false;
    }

    const previousFilters = container.filters;
    container.filters = redAsAlphaFilter;
    const sprite = renderContainerToSprite(
      this.renderContext.general.pixiRenderer,
      container,
      reuseSprite,
      label,
    );
    // pixi's .filter property is readonly when read, and mutable when set, so we
    // need to cast even just to give a container back its old filters
    // TODO: remove after this PR merged/released in pixi: https://github.com/pixijs/pixijs/pull/11757
    container.filters = previousFilters as Filter[];

    for (const wrapper of suspendedWrappers) {
      wrapper.children[0].visible = true;
      wrapper.setMask({ mask: wrapper.children[0], inverse: true });
    }
    suspendedWrappers.length = 0;

    return sprite;
  }

  /**
   * reconcile the cyclic-render carves against the live draw-order graph: for
   * each broken edge, bake the front item's currently-drawn surface and
   * inverse-mask it out of this item's, positioned at the two items'
   * projected-position diff at the current render angle (settled that is
   * exactly the quarter angle; mid-turn it is the continuous θ both surfaces
   * are actually placed at).
   *
   * The bake root is the front's whole position-free rendering
   * ({@link ItemRenderPipeline.maskSourceGraphics}): near-corner offset, any
   * warp mesh, and outer decoration (eg the pick-up-next highlight outline)
   * included - so the carve is exactly the pixels the front draws, and needs
   * no registration arithmetic of its own. The front's own carves are
   * suspended for the bake (see {@link #bakeSilhouetteSprite}).
   */
  #tickMasks() {
    const { cameraAngle } = this.renderContext.general;

    // map of all items in front of us => if the edge is broken, from the live
    // draw-order graph:
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
        this.renderContext.getItemRenderPipeline(frontItem)?.maskSourceGraphics;

      if (frontRenderingForMask === undefined) {
        throw new Error("nothing to use as a mask");
      }

      const curMaskingSprite = this.#bakeSilhouetteSprite(
        frontRenderingForMask,
        // attempt to reuse the existing sprite, if there is one
        // NOTE: renderContainerToSprite will handle destroying the renderTexture
        // of this sprite if it can't be reused
        preExistingMaskingSprite,
        `red mask: ${frontItem.id}`,
      );

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

      // the carve registers at the current render angle - the frame both
      // items' surfaces are actually placed in this frame. The bake root
      // carries the front's own internal placement (near-corner offset etc),
      // so the position diff is the whole registration:
      const frontPosition = frontItem.state.box;
      const itemPosition = this.renderContext.item.state.box;
      curMaskingSprite.x =
        projectWorldXyzToScreenX(frontPosition, cameraAngle) -
        projectWorldXyzToScreenX(itemPosition, cameraAngle);
      curMaskingSprite.y =
        projectWorldXyzToScreenY(frontPosition, cameraAngle) -
        projectWorldXyzToScreenY(itemPosition, cameraAngle);
    }
  }

  destroy(): void {
    // the display subtree (mask sprites, mesh, art) is destroyed by the
    // outer position renderer's `destroy({ children: true })` BEFORE this
    // runs - so never touch the scene graph here. Release only the GPU
    // resources that walk does not own: the mesh geometry (pixi's
    // Mesh.destroy leaves it alive) and the warp snapshot texture
    this.#cuboidMeshGeometry?.destroy();
    this.#cuboidSnapshotTexture?.destroy(true);
    this.#wrappedRenderer.destroy();
  }
}
