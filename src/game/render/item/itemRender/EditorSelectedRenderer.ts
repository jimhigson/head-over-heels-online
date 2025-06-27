import { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { ItemPixiRenderer } from "./ItemRenderer";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import { spritesheetPalette } from "../../../../../gfx/spritesheetPalette";
import { noFilters } from "../../filters/standardFilters";
import { OutlineFilter } from "../../filters/outlineFilter";
import { store } from "../../../../store/store";
import { selectGameEngineUpscale } from "../../../../store/slices/upscale/upscaleSlice";
import { RevertColouriseFilter } from "../../filters/RevertColouriseFilter";
import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import type { RootStateWithLevelEditorSlice } from "../../../../editor/slice/levelEditorSlice";
import {
  selectHoveredJsonItemId,
  selectSelectedJsonItemIds,
} from "../../../../editor/slice/levelEditorSlice";

const selectionColour = spritesheetPalette.pastelBlue;
const hoverColour = spritesheetPalette.highlightBeige;

const hoverFilter = new OutlineFilter({
  outlineColor: hoverColour,
  upscale: selectGameEngineUpscale(store.getState()),
  lowRes: false,
});
const selectedFilter = new RevertColouriseFilter(selectionColour);

export class EditorSelectedRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  public readonly output: Container = new Container({
    label: "EditorSelectedRenderer",
  });

  constructor(
    readonly renderContext: ItemRenderContext<T>,
    private readonly childRenderer: ItemPixiRenderer<T>,
  ) {
    this.output.addChild(childRenderer.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: { jsonItemId },
      },
    } = this;

    const state = store.getState() as RootStateWithLevelEditorSlice;
    const hoveredJsonItemId = selectHoveredJsonItemId(state);
    const selectedJsonItemIds = selectSelectedJsonItemIds(state);

    const isHovered = jsonItemId && hoveredJsonItemId === jsonItemId;
    const isSelected =
      jsonItemId && (selectedJsonItemIds as string[]).includes(jsonItemId);

    this.output.filters =
      isHovered && isSelected ? [selectedFilter, hoverFilter]
      : isHovered ? hoverFilter
      : isSelected ? selectedFilter
      : noFilters;

    this.childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.destroy();
    this.childRenderer.destroy();
  }
}

export const maybeWrapInEditorSelectedRenderer = <T extends ItemInPlayType>(
  item: ItemTypeUnion<T, string, string>,
  itemRenderContext: ItemRenderContext<T>,
  childRenderer: ItemPixiRenderer<T>,
): ItemPixiRenderer<T> => {
  return itemRenderContext.general.editor ?
      (new EditorSelectedRenderer(
        itemRenderContext as ItemRenderContext<T>,
        childRenderer,
      ) as ItemPixiRenderer<T>)
    : childRenderer;
};
