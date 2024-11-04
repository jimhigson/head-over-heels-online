import {
  ItemInPlay,
  ItemInPlayType,
  ItemState,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { stateChangeNeedsRerender } from "../render/stateChangeNeedsRerender";

export const maybeUpdateItemState = <T extends ItemInPlayType>(
  item: ItemInPlay<T>,
  delta: Partial<ItemState<T>>,
) => {
  if (item.state === undefined) {
    throw new Error("item does not have state");
  }

  const nextState = { ...item.state, ...delta };

  if (stateChangeNeedsRerender(item as UnknownItemInPlay, nextState)) {
    item.renderingDirty = true;
  }

  item.state = nextState;
};
