import { Application } from "pixi.js";
import { currentCharacter, GameState } from "../gameState/GameState";
import { keys } from "@/utils/entries";
import { ItemInPlay, ItemState } from "@/model/ItemInPlay";
import { ItemType } from "@/model/Item";
import { handleCharacterInput } from "./handleCharacterInput";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItems";
import { sortItemsByDrawOrder } from "../render/sortItemsByDrawOrder";

export const maybeUpdateItemState = <T extends ItemType>(
  item: ItemInPlay<T>,
  delta: Partial<ItemState<T>>,
) => {
  if (item.state === undefined) {
    throw new Error("item does not have state");
  }

  let changed = false;
  for (const k of keys<keyof ItemState<T>>(delta)) {
    const deltaVal = delta[k];

    if (item.state[k] !== deltaVal) {
      // cast needed because delta is partial (value can be undefined), but
      // here we know we have the value
      item.state[k] = deltaVal!;
      changed = true;
    }
  }

  if (changed) {
    item.renderingDirty = true;
  }
};

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add(({ deltaMS }) => {
    const { inputState } = gameState;

    handleCharacterInput<RoomId>(gameState, inputState, deltaMS);

    const room = currentCharacter(gameState).roomState;
    // re-sort the room's items:
    const items = room.items;
    let sortDirty = false;

    for (const item of items) {
      if (item.renderPositionDirty) {
        moveSpriteToItemProjection(item);
        item.renderPositionDirty = false;
        sortDirty = true;
      }
      if (item.renderingDirty) {
        renderItem(item, room);
        item.renderingDirty = false;
      }
    }
    if (sortDirty) {
      sortItemsByDrawOrder(room.items);
    }
  });
};
