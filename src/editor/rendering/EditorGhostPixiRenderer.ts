import { Container } from "pixi.js";

import { RevertColouriseFilter } from "../../game/render/filters/RevertColouriseFilter";
import type { ItemLeafPixiRenderer } from "../../game/render/item/itemRender/ItemPixiRenderer";
import type {
  ItemLeafRenderContext,
  ItemLeafTickContext,
} from "../../game/render/ItemRenderContexts";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import { blockstackPixiPalettes } from "../../sprites/palette/spritesheetPixiPalettes";

/**
 * draws an editor ghost as its brush item - greyed out if the editor ghost says so
 */
export class EditorGhostPixiRenderer implements ItemLeafPixiRenderer<"editorGhost"> {
  readonly output = new Container({ label: "EditorGhostPixiRenderer" });
  readonly renderContext: ItemLeafRenderContext<"editorGhost">;
  readonly #brushItemRenderer: ItemLeafPixiRenderer<ItemInPlayType> | undefined;

  constructor(
    renderContext: ItemLeafRenderContext<"editorGhost">,
    /**
     * the renderer of the editor ghost's brush item, if that item is drawn at all
     */
    brushItemRenderer: ItemLeafPixiRenderer<ItemInPlayType> | undefined,
  ) {
    this.renderContext = renderContext;
    this.#brushItemRenderer = brushItemRenderer;
    if (brushItemRenderer !== undefined) {
      this.output.addChild(brushItemRenderer.output);
    }
    if (renderContext.item.config.drawnGreyedOut) {
      const greyedOutColour = blockstackPixiPalettes.basic.lightGrey;
      this.output.filters = renderContext.filterCache.getOrInsertComputed(
        `revertColourise(${greyedOutColour.toHex()})`,
        () => new RevertColouriseFilter(greyedOutColour),
      );
    }
  }

  tick(tickContext: ItemLeafTickContext) {
    this.#brushItemRenderer?.tick(tickContext);
  }

  destroy() {
    this.#brushItemRenderer?.destroy();
    this.output.destroy();
  }
}
