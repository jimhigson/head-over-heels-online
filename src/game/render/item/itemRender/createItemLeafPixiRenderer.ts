import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { type CharacterName } from "../../../../model/modelTypes";
import { isPlayableItem } from "../../../physics/itemPredicates";
import { appearanceForItem } from "../../itemAppearances/appearanceForItem";
import { type ItemLeafRenderContext } from "../../ItemRenderContexts";
import { ItemAppearancePixiRenderer } from "./ItemAppearancePixiRenderer";
import { type ItemLeafPixiRenderer } from "./ItemPixiRenderer";
import { PlayableItemPixiRenderer } from "./PlayableItemPixiRenderer";

const isPlayableRenderContext = (
  renderContext: ItemLeafRenderContext<ItemInPlayType>,
): renderContext is ItemLeafRenderContext<CharacterName> =>
  isPlayableItem(renderContext.item);

/**
 * build the bare item graphics renderer for an item
 */
export const createItemLeafPixiRenderer = <T extends ItemInPlayType>(
  renderContext: ItemLeafRenderContext<T>,
): ItemLeafPixiRenderer<T> | undefined => {
  if (isPlayableRenderContext(renderContext)) {
    return new PlayableItemPixiRenderer(
      renderContext,
    ) as ItemLeafPixiRenderer<T>;
  }
  const appearance = appearanceForItem(renderContext.item);
  return appearance === undefined ? undefined : (
      new ItemAppearancePixiRenderer(renderContext, appearance)
    );
};
