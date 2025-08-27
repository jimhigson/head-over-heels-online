import { ColorMatrixFilter, Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { UniqueTextureSprite } from "../../../../utils/pixi/UniqueTextureSprite";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { emptySet } from "../../../../utils/empty";
import { pixiContainerToString } from "../../../../utils/pixi/pixiContainerToString";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { subXy } from "../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../projections";

/**
 * pixijs has the quirk that when using a sprite as a mask, it uses the red channel as the alpha channel.
 * This filter copies the alpha values to the red channel so it can work normally
 */
const useRedAsAlphaFilter = new ColorMatrixFilter();
// prettier-ignore
useRedAsAlphaFilter.matrix = [
  // R = get alpha value
  0, 0, 0,   1, 0,  
  // G (unused for masking) = 0 - not used for making but let some through to make easier to recognise item while debugging
  0, 0.3, 0, 0, 0,  
  // B (unused for masking) = 0 - not used for making but let some through to make easier to recognise item while debugging
  0, 0, 0.3, 0, 0,  
  // A (unused for masking) = copy unchanged but make partially transparent so if shown for debugging can see item below
  0, 0, 0,   1, 0,  
];

/** specialisation of Container that always contains a thing to be masked, and the (sprite) mask */
interface MaskingContainer extends Container {
  getChildAt(index: 0): UniqueTextureSprite;
  getChildAt(index: 1): Container;
  getChildAt(index: number): unknown;
  children: [UniqueTextureSprite, Container];
}

export class ItemPositionRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  output: Container;
  // store our hierarchy of making containers by the item id they are using to mask:
  #maskingContainers: Map<string, MaskingContainer> = new Map();

  constructor(
    public readonly renderContext: ItemRenderContext<T>,
    private wrappedRenderer: ItemPixiRenderer<T>,
  ) {
    this.output = new Container({
      label: `ItemPositionRenderer ${renderContext.item.id}`,
      children: [wrappedRenderer.output],
    });
    this.#updatePosition();
  }

  #updatePosition() {
    const projectionXy = projectWorldXyzToScreenXy(
      this.renderContext.item.state.position,
    );

    this.output.x = projectionXy.x;
    this.output.y = projectionXy.y;
  }

  tick(tickContext: ItemTickContext) {
    this.wrappedRenderer?.tick(tickContext);

    if (tickContext.movedItems.has(this.renderContext.item)) {
      // item has moved - update its position:
      this.#updatePosition();
    }

    this.#tickMasks();
  }

  // get all the broken edges in front of this item
  #brokenEdges(): Set<string> {
    const itemId = this.renderContext.item.id;
    const inFrontOfItemEdges = this.renderContext.zEdges.get(itemId);

    if (!inFrontOfItemEdges) {
      return emptySet as Set<string>;
    }

    let brokenEdges: Set<string> | undefined;
    for (const [frontItemId, isBroken] of inFrontOfItemEdges) {
      if (isBroken) {
        if (!brokenEdges) {
          brokenEdges = new Set<string>();
        }
        brokenEdges.add(frontItemId);
      }
    }
    return brokenEdges ?? (emptySet as Set<string>);
  }

  #addMaskingContainer(
    frontItemId: string,
    maskingSprite: UniqueTextureSprite,
  ) {
    const maskingContainer = new Container({
      label: `maskWith: ${frontItemId}`,
      // push the current child-of-root one down in the hierarchy:
      children: [maskingSprite, this.output.children[0]],
    }) as MaskingContainer;

    this.output.addChild(maskingContainer);

    // that's the point of this, to mask:
    maskingContainer.setMask({ mask: maskingSprite, inverse: true });

    // record our masking container:
    this.#maskingContainers.set(frontItemId, maskingContainer);

    return maskingContainer;
  }

  #destroyMaskingContainer(
    frontItemId: string,
    maskingContainer: MaskingContainer,
  ) {
    const [maskingSprite, contents] = maskingContainer.children;
    const localParent = maskingContainer.parent;

    localParent.removeChild(maskingContainer);
    localParent.addChild(contents);

    // probably doesn't matter since we're going to destroy anyway,
    // but .mask can cause crashes sometimes if things aren't set up just so
    maskingContainer.mask = null;
    maskingSprite.destroy();
    maskingContainer.destroy();
    this.#maskingContainers.delete(frontItemId);
  }

  #tickMasks() {
    const { pixiRenderer } = this.renderContext.general;

    // map of all items in front of us => if the edge is broken
    const brokenEdges = this.#brokenEdges();

    // check for broken links (have masking sprites) that are no longer broken:
    for (const previousFront of this.#maskingContainers.keys()) {
      if (!brokenEdges.has(previousFront)) {
        // edge no longer broken: remove the masking sprite
        const maskingContainer = this.#maskingContainers.get(previousFront);

        if (maskingContainer) {
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

    for (const frontItemId of brokenEdges) {
      const preExistingMaskingContainer =
        this.#maskingContainers.get(frontItemId);

      const preExistingMaskingSprite = preExistingMaskingContainer?.children[0];

      const frontRenderingForMask =
        this.renderContext.getItemRenderPipeline(frontItemId)
          ?.itemAppearanceRenderer?.output;

      if (frontRenderingForMask === undefined) {
        throw new Error("nothing to use as a mask");
      }

      const previousFilters = frontRenderingForMask.filters;
      frontRenderingForMask.filters = useRedAsAlphaFilter;

      const curMaskingSprite = renderContainerToSprite(
        pixiRenderer,
        frontRenderingForMask,
        // attempt to reuse the existing sprite, if there is one
        // NOTE: renderContainerToSprite will handle destroying the renderTexture
        // of this sprite if it can't be reused
        preExistingMaskingSprite,
        `red mask: ${frontItemId}`,
      );

      frontRenderingForMask.filters = previousFilters;

      if (preExistingMaskingContainer === undefined)
        this.#addMaskingContainer(frontItemId, curMaskingSprite);

      const otherItem = this.renderContext.room.items[frontItemId];

      const renderedPositionDiff = subXy(
        projectWorldXyzToScreenXy(otherItem.state.position),
        projectWorldXyzToScreenXy(this.renderContext.item.state.position),
      );

      curMaskingSprite.x = renderedPositionDiff.x;
      curMaskingSprite.y = renderedPositionDiff.y;
    }
  }

  destroy(): void {
    this.output.destroy({ children: true });
    this.wrappedRenderer?.destroy();
  }
}
