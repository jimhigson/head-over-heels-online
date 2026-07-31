import { Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import {
  isAtQuarterAngle,
  nearestQuarterAngle,
} from "../../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../../utils/vectors/vectors";
import { hermiteEase } from "../../../mainLoop/transitionCameraAngle";
import {
  adjustNearCornerForCameraAngle,
  transitionNearCornerOffsetXy,
} from "../../itemAppearances/adjustNearCornerForCameraAngle";
import {
  itemMovedSinceRendered,
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { isCuboidWarpItem } from "./isCuboidWarpItem";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";
import { itemTypesExemptFromNearCornerOffset } from "./itemTypesExemptFromNearCornerOffset";

/**
 * Most items anchor their footprint sprite at the camera-nearest corner of their base cell,
 * which moves around the footprint as the camera rotates. The offset is applied to a
 * dedicated container wrapping all of the item's graphics (appearance and shadows alike),
 * so the shadows cast on the item move with the surface they fall on. Item renderers
 * survive camera-angle changes, so the offset is re-applied reactively when the renderer's
 * discrete angle changes mid-life (see {@link NearCornerOffsetRenderer}).
 */
const nearCornerOffsetGraphics = <T extends ItemInPlayType>(
  renderContext: ItemRenderContext<T>,
  graphics: Container,
): Container => {
  const {
    item,
    general: { cameraAngle },
  } = renderContext;
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);

  if (itemTypesExemptFromNearCornerOffset.has(item.type)) {
    return graphics;
  }

  const offsetContainer = new Container({
    label: "nearCornerOffset",
    children: [graphics],
  });
  adjustNearCornerForCameraAngle(item, cameraQuarterAngle, offsetContainer);
  return offsetContainer;
};

/**
 * Chain link that wraps the item's graphics in the near-corner offset container
 * and keeps that offset current: interpolated across a rotation transition for
 * non-warp items, and re-anchored on an instant discrete-angle change. Boxy
 * (cuboid-warp) items mid-rotation are positioned by the warp instead (see
 * {@link TransitionSurfaceRenderer}), so the offset is left alone for them here.
 */
export class NearCornerOffsetRenderer<
  T extends ItemInPlayType,
> implements ItemChainPixiRenderer<T> {
  output: Container;
  readonly renderContext: ItemRenderContext<T>;
  #wrappedRenderer: ItemChainPixiRenderer<T>;
  /**
   * the near-corner offset container - {@link output} itself, or undefined for
   * exempt types (floor/wall/doorFrame), which draw at the origin with no offset
   */
  #offsetContainer: Container | undefined;
  /**
   * the camera angle the near-corner offset was last applied for (applied at
   * construction; re-applied reactively when the discrete angle changes mid-life)
   */
  #appliedNearCornerAngle: Xy;
  /** whether the last tick ran during a rotation - grants one settle update */
  #tickedMidRotation = false;

  constructor(
    renderContext: ItemRenderContext<T>,
    wrappedRenderer: ItemChainPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#wrappedRenderer = wrappedRenderer;
    this.output = nearCornerOffsetGraphics(
      renderContext,
      wrappedRenderer.output,
    );
    this.#offsetContainer =
      itemTypesExemptFromNearCornerOffset.has(renderContext.item.type) ?
        undefined
      : this.output;
    this.#appliedNearCornerAngle = nearestQuarterAngle(
      renderContext.general.cameraAngle,
    );
  }

  /**
   * The old-angle and new-angle renderers (which own the two halves of a turn) must
   * anchor an item's sprite at the SAME near-corner offset, or the item jumps up to
   * a base cell at the midpoint hand-over (each renderer would otherwise use its own
   * discrete angle's nearest corner). Interpolate a single shared offset from the
   * from-angle's to the to-angle's, so both agree mid-turn and each lands on its
   * correct discrete value at its endpoint.
   */
  #updateTransitionNearCornerOffset(offsetContainer: Container) {
    const {
      item,
      general: { gameState },
    } = this.renderContext;
    if (gameState === undefined || gameState.cameraTransition === undefined) {
      return;
    }
    const { fromAngle, progress, startSlope } = gameState.cameraTransition;
    const offset = transitionNearCornerOffsetXy(
      item,
      fromAngle,
      gameState.targetCameraAngle,
      hermiteEase(progress, startSlope),
    );
    offsetContainer.position.set(offset.x, offset.y);
  }

  #updateOffset(midRotation: boolean) {
    const {
      item,
      general: { cameraAngle },
    } = this.renderContext;

    // boxy items mid-rotation are positioned by the cuboid warp (which drives
    // the discrete layer-angle offset directly), so leave the offset alone:
    if (midRotation && isCuboidWarpItem(item)) {
      return;
    }
    const offsetContainer = this.#offsetContainer;
    if (offsetContainer === undefined) {
      return;
    }
    if (midRotation) {
      this.#updateTransitionNearCornerOffset(offsetContainer);
      return;
    }
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
    if (
      this.#appliedNearCornerAngle.x !== cameraQuarterAngle.x ||
      this.#appliedNearCornerAngle.y !== cameraQuarterAngle.y
    ) {
      // the discrete angle changed without a rotation driving the offset (an
      // instant angle change): re-anchor at the new near corner:
      adjustNearCornerForCameraAngle(item, cameraQuarterAngle, offsetContainer);
      this.#appliedNearCornerAngle = cameraQuarterAngle;
    }
  }

  tick(tickContext: ItemTickContext) {
    this.#wrappedRenderer.tick(tickContext);

    const midRotation = !isAtQuarterAngle(
      this.renderContext.general.cameraAngle,
    );
    if (
      itemMovedSinceRendered(this.renderContext.item, tickContext) ||
      midRotation ||
      this.#tickedMidRotation
    ) {
      this.#updateOffset(midRotation);
    }
    this.#tickedMidRotation = midRotation;
  }

  destroy(): void {
    this.#wrappedRenderer.destroy();
  }
}
