import { Container, type Filter } from "pixi.js";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { emptySet } from "../../../../utils/empty";
import { assignRoundedXy } from "../../../../utils/pixi/assignRoundedXy";
import { pixiContainerToString } from "../../../../utils/pixi/pixiContainerToString";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { type UniqueTextureSprite } from "../../../../utils/pixi/UniqueTextureSprite";
import { subXy } from "../../../../utils/vectors/vectors";
import { redAsAlphaFilter } from "../../filters/redAsAlphaFilter";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import { type ItemPixiRenderer } from "./ItemPixiRenderer";

/** specialisation of Container that always contains a thing to be masked, and the (sprite) mask */
interface MaskingContainer extends Container {
  getChildAt(index: 0): UniqueTextureSprite;
  getChildAt(index: 1): Container;
  getChildAt(index: number): unknown;
  children: [UniqueTextureSprite, Container];
}

const logCyclicRendering = import.meta.env.VITE_LOG_CYCLIC_RENDERING === "true";

export class ItemPositionRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  output: Container;
  // store our hierarchy of masking containers by the front item they are using to mask:
  #maskingContainers: Map<UnionOfAllItemInPlayTypes, MaskingContainer> =
    new Map();

  readonly renderContext: ItemRenderContext<T>;
  #wrappedRenderer: ItemPixiRenderer<T>;

  constructor(
    renderContext: ItemRenderContext<T>,
    wrappedRenderer: ItemPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#wrappedRenderer = wrappedRenderer;
    this.output = new Container({
      label: `ItemPositionRenderer ${renderContext.item.id}`,
      children: [wrappedRenderer.output],
    });
    this.#updatePosition();
  }

  #updatePosition() {
    const {
      general: {
        upscale: { gameEngineUpscale },
      },
    } = this.renderContext;

    const projectionXy = projectWorldXyzToScreenXy(
      this.renderContext.item.state.position,
    );

    assignRoundedXy(
      this.output,
      projectionXy.x,
      projectionXy.y,
      gameEngineUpscale,
    );
  }

  tick(tickContext: ItemTickContext) {
    this.#wrappedRenderer?.tick(tickContext);

    if (tickContext.movedItems.has(this.renderContext.item)) {
      // item has moved - update its position:
      this.#updatePosition();
    }

    this.#tickMasks();
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
      // push the current child-of-root one down in the hierarchy:
      children: [maskingSprite, this.output.children[0]],
    }) as MaskingContainer;

    this.output.addChild(maskingContainer);

    // that's the point of this, to mask:
    maskingContainer.setMask({ mask: maskingSprite, inverse: true });

    // record our masking container:
    this.#maskingContainers.set(frontItem, maskingContainer);

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

    // probably doesn't matter since we're going to destroy anyway,
    // but .mask can cause crashes sometimes if things aren't set up just so
    maskingContainer.mask = null;
    maskingSprite.destroy();
    maskingContainer.destroy();
    this.#maskingContainers.delete(frontItem);
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

    for (const frontItem of brokenEdges) {
      const preExistingMaskingContainer =
        this.#maskingContainers.get(frontItem);

      const preExistingMaskingSprite = preExistingMaskingContainer?.children[0];

      const frontRenderingForMask =
        this.renderContext.getItemRenderPipeline(frontItem)
          ?.itemAppearanceRenderer?.output;

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
        projectWorldXyzToScreenXy(frontItem.state.position),
        projectWorldXyzToScreenXy(this.renderContext.item.state.position),
      );

      curMaskingSprite.x = renderedPositionDiff.x;
      curMaskingSprite.y = renderedPositionDiff.y;
    }
  }

  destroy(): void {
    this.output.destroy({ children: true });
    this.#wrappedRenderer?.destroy();
  }
}
