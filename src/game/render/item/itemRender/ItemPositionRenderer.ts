import { Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { assignRoundedXy } from "../../../../utils/pixi/assignRoundedXy";
import { isAtQuarterAngle } from "../../../../utils/vectors/cameraAngleVectors";
import {
  type ItemRenderContext,
  itemRenderingStale,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import {
  projectWorldXyzToScreenX,
  projectWorldXyzToScreenY,
} from "../../projections";
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

    const screenX = projectWorldXyzToScreenX(item.state.box, cameraAngle);
    const screenY = projectWorldXyzToScreenY(item.state.box, cameraAngle);

    // a render angle away from the canonical quarter angles means the camera is
    // mid-rotation: boxy items are drawn as a warped cuboid, so place the
    // container at the item origin's EXACT (unrounded) projection - items
    // touching at a world corner keep that corner welded on screen through the
    // turn. (Non-boxy items and settled items fall through to rounded below.)
    if (!isAtQuarterAngle(cameraAngle) && isCuboidWarpItem(item)) {
      this.output.position.set(screenX, screenY);
      return;
    }

    assignRoundedXy(this.output, screenX, screenY, roundTo);
  }

  tick(tickContext: ItemTickContext) {
    this.#wrappedRenderer.tick(tickContext);

    if (itemRenderingStale(this.renderContext.item, tickContext)) {
      this.#updatePosition();
    }
  }

  destroy(): void {
    this.output.destroy({ children: true });
    this.#wrappedRenderer.destroy();
  }
}
