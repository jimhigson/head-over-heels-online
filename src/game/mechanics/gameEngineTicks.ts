import { Application } from "pixi.js";
import { currentRoom, GameState } from "../gameState/GameState";
import { walking } from "./walking";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItems";
import { sortItemsByDrawOrder } from "../render/sortItemsByDrawOrder";
import { falling } from "./falling";
import { isPlayableItem, itemFalls, ItemInPlayType } from "@/model/ItemInPlay";
import { jumping } from "./jumping";
import { MechanicResult } from "./MechanicResult";
import { moveItem } from "./moveItem";
import { maybeUpdateItemState } from "./maybeUpdateItemState";

export const gameEngineTicks = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  app.ticker.add(({ deltaMS }) => {
    const { inputState } = gameState;

    const room = currentRoom(gameState);

    // re-sort the room's items:
    const items = room.items;
    let sortDirty = false;

    for (const item of items) {
      const mechanicalResults: MechanicResult<ItemInPlayType>[] = [];

      if (isPlayableItem(item)) {
        mechanicalResults.push(walking(item, inputState, deltaMS));
        mechanicalResults.push(jumping(item, inputState, deltaMS));
      }
      if (itemFalls(item)) {
        mechanicalResults.push(falling(item, room, deltaMS));
      }

      const compositeStateDelta = mechanicalResults.reduce((acc, result) => {
        return { ...acc, ...result.stateDelta };
      }, {});

      for (const { positionDelta } of mechanicalResults) {
        moveItem(item, positionDelta, room);
      }
      maybeUpdateItemState(item, compositeStateDelta);

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
