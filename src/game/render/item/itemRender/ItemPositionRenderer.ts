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
import { adjustNearCornerForCameraAngle } from "../../itemAppearances/adjustNearCornerForCameraAngle";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import { type ItemPixiRenderer } from "./ItemPixiRenderer";
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
 * Most items anchor their footprint sprite at the camera-nearest corner of their base cell,
 * which moves around the footprint as the camera rotates. That offset is a per-item,
 * per-camera-angle constant; since item renderers are recreated whenever the camera angle
 * changes, it never changes during this renderer's life. It is therefore applied once, here,
 * to a dedicated container wrapping all of the item's graphics (appearance and shadows alike),
 * so the shadows cast on the item move with the surface they fall on.
 */
const nearCornerOffsetGraphics = <T extends ItemInPlayType>(
  renderContext: ItemRenderContext<T>,
  graphics: Container,
): Container => {
  const {
    item,
    general: { cameraAngle },
  } = renderContext;

  if (itemTypesExemptFromNearCornerOffset.has(item.type)) {
    return graphics;
  }

  const offsetContainer = new Container({
    label: "nearCornerOffset",
    children: [graphics],
  });
  adjustNearCornerForCameraAngle(item, cameraAngle, offsetContainer);
  return offsetContainer;
};

export class ItemPositionRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  output: Container;
  // store our hierarchy of masking containers by the front item they are using to mask:
  #maskingContainers: Map<UnionOfAllItemInPlayTypes, MaskingContainer> =
    new Map();

  readonly renderContext: ItemRenderContext<T>;
  #wrappedRenderer: ItemPixiRenderer<T>;
  /**
   * the content that masks are applied to - initially the (near-corner-offset) graphics,
   * then the outermost masking container once cyclic-rendering masks wrap it. Tracked by
   * reference rather than as `output.children[0]`, because debug overlays (the bounding box)
   * are also direct children of `output` and must not be mistaken for the masked content.
   */
  #maskedContent: Container;

  constructor(
    renderContext: ItemRenderContext<T>,
    wrappedRenderer: ItemPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#wrappedRenderer = wrappedRenderer;
    this.#maskedContent = nearCornerOffsetGraphics(
      renderContext,
      wrappedRenderer.output,
    );
    this.output = new Container({
      label: `ItemPositionRenderer ${renderContext.item.id}`,
      children: [this.#maskedContent],
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
    } = this.renderContext;

    const projectionXy = projectWorldXyzToScreenXy(
      this.renderContext.item.state.position,
      cameraAngle,
    );

    assignRoundedXy(
      this.output,
      projectionXy.x,
      projectionXy.y,
      uncolourised ? 1 : gameEngineUpscale,
    );
  }

  tick(tickContext: ItemTickContext) {
    this.#wrappedRenderer?.tick(tickContext);

    if (tickContext.movedOrResizedItems.has(this.renderContext.item)) {
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
        projectWorldXyzToScreenXy(frontItem.state.position, cameraAngle),
        projectWorldXyzToScreenXy(
          this.renderContext.item.state.position,
          cameraAngle,
        ),
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
