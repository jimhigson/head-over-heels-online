import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { isPlayableItem } from "../../../../model/ItemInPlayNarrowedUnions";
import { appearanceForItem } from "../../itemAppearances/appearanceForItem";
import { type ItemLeafRenderContext } from "../../ItemRenderContexts";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { type ItemLeafPixiRenderer } from "./ItemPixiRenderer";
import {
  PlayableItemPixiRenderer,
  type PlayableRenderedType,
} from "./PlayableItemPixiRenderer";

const isPlayableRenderContext = (
  renderContext: ItemLeafRenderContext<ItemInPlayType>,
): renderContext is ItemLeafRenderContext<PlayableRenderedType> =>
  renderContext.item.type === "sceneryPlayer" ||
  isPlayableItem(renderContext.item);

/**
 * build the bare item graphics renderer for an item
 */
export const createItemLeafPixiRenderer = <T extends ItemInPlayType>(
  renderContext: ItemLeafRenderContext<T>,
): ItemLeafPixiRenderer<T> | undefined => {
  const renderLikePlayable = isPlayableRenderContext(renderContext);

  if (renderLikePlayable) {
    return new PlayableItemPixiRenderer(
      renderContext,
    ) as ItemLeafPixiRenderer<T>;
  }

  const appearance = appearanceForItem(renderContext.item);
  return appearance === undefined ? undefined : (
      new ItemAppearancePixiRenderer(renderContext, appearance)
    );
};
