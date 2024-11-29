import type { AnyItemInPlay } from "@/model/ItemInPlay";

/** totally un-render an item */

export const destroyItemRendering = (item: AnyItemInPlay) => {
  item.renderContainer?.destroy();
  delete item.renderContainer;
  item.positionContainer?.destroy();
  delete item.positionContainer;
};
