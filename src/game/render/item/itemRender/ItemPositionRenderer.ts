import { Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { assignRoundedXy } from "../../../../utils/pixi/assignRoundedXy";
import { isAtQuarterAngle } from "../../../../utils/vectors/cameraAngleVectors";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import { isCuboidWarpItem } from "./isCuboidWarpItem";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";

/**
 * The outermost link of an item's graphics chain: the container placed in the
 * room, positioned each frame at the item's projected screen origin. It rounds
 * to the device grid at rest, but positions boxy items at their EXACT unrounded
 * origin mid-rotation so the cuboid warp's shared corners weld across items.
 *
 * Its {@link output} also hosts debug overlays that must sit at the item's true
 * origin (eg the bounding box), outside the near-corner offset. The near-corner
 * offset, cyclic-render masking and cuboid warp are handled by the wrapped
 * {@link NearCornerOffsetRenderer}/{@link TransitionSurfaceRenderer} links.
 */
export class ItemPositionRenderer<
  T extends ItemInPlayType,
> implements ItemChainPixiRenderer<T> {
  output: Container;
  readonly renderContext: ItemRenderContext<T>;
  #wrappedRenderer: ItemChainPixiRenderer<T>;
  /**
   * whether the last tick ran during a rotation - grants one further update
   * after a turn ends, snapping the item to its exact discrete-angle position
   */
  #tickedMidRotation = false;

  constructor(
    renderContext: ItemRenderContext<T>,
    wrappedRenderer: ItemChainPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#wrappedRenderer = wrappedRenderer;
    this.output = new Container({
      label: `ItemPositionRenderer ${renderContext.item.id}`,
      children: [wrappedRenderer.output],
    });
    // overlays that must sit at the item's true origin (eg the bounding box debug
    // renderer) parent to this container, outside the near-corner offset:
    renderContext.itemPositionContainer = this.output;
    this.#updatePosition();
  }

  #updatePosition() {
    const {
      general: {
        upscale: { gameEngineUpscale },
        spriteOption: { uncolourised },
        cameraAngle,
      },
      item,
    } = this.renderContext;

    const roundTo = uncolourised ? 1 : gameEngineUpscale;

    // a render angle away from the canonical quarter angles means the camera is
    // mid-rotation: boxy items are drawn as a warped cuboid, so place the
    // container at the item origin's EXACT (unrounded) projection - items
    // touching at a world corner keep that corner welded on screen through the
    // turn. (Non-boxy items and settled items fall through to rounded below.)
    if (!isAtQuarterAngle(cameraAngle) && isCuboidWarpItem(item)) {
      const origin = projectWorldXyzToScreenXy(
        item.state.position,
        cameraAngle,
      );
      this.output.position.set(origin.x, origin.y);
      return;
    }

    // the item slides along the continuous render angle; at rest this is exactly
    // the quarter angle
    const projectionXy = projectWorldXyzToScreenXy(
      item.state.position,
      cameraAngle,
    );

    assignRoundedXy(this.output, projectionXy.x, projectionXy.y, roundTo);
  }

  tick(tickContext: ItemTickContext) {
    this.#wrappedRenderer.tick(tickContext);

    const midRotation = !isAtQuarterAngle(
      this.renderContext.general.cameraAngle,
    );
    if (
      tickContext.movedOrResizedItems.has(this.renderContext.item) ||
      // mid-rotation nothing moves (the moved set is truthfully empty) but
      // every item re-projects along the continuous θ(t):
      midRotation ||
      // run once more after the render angle settles back onto a quarter angle:
      // this snaps every item to its exact discrete-angle position:
      this.#tickedMidRotation
    ) {
      this.#updatePosition();
    }
    this.#tickedMidRotation = midRotation;
  }

  destroy(): void {
    this.output.destroy({ children: true });
    this.#wrappedRenderer.destroy();
  }
}
