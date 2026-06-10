import { Container } from "pixi.js";

import { exitGameRoomId } from "../../../../model/json/ItemConfigMap";
import { isWholeRoomSubRooms } from "../../../../model/RoomJson";
import { pixiContainerToString } from "../../../../utils/pixi/pixiContainerToString";
import { findSubRoomForItem } from "../../../components/dialogs/menuDialog/dialogs/map/itemIsInSubRoom";
import { type GameState } from "../../../gameState/GameState";
import { changeCharacterRoom } from "../../../gameState/mutators/changeCharacterRoom";
import { isFreeItem, isItemType } from "../../../physics/itemPredicates";
import { type DecorateItemMaybeRenderer } from "./DecorateItemRenderer";

export const debugPointerDecorateItemRenderer: DecorateItemMaybeRenderer = (
  itemRenderContext,
  childRenderer,
) => {
  if (!childRenderer) {
    return undefined;
  }

  const wrapper = new Container({
    label: "debugPointerActions",
    children: [childRenderer.output],
    eventMode: "static",
  });

  wrapper.on("pointertap", () => {
    const { item, room, general } = itemRenderContext;
    const gameState = general.gameState as GameState<string> | undefined;

    if (gameState && isItemType("teleporter", "doorFrame")(item)) {
      const { toRoom } = item.config;
      if (toRoom !== exitGameRoomId && toRoom !== undefined) {
        changeCharacterRoom({
          gameState,
          toRoomId: toRoom,
          changeType: "level-select",
        });
      }
    }
    if (gameState && item.type === "lift") {
      const { roomJson } = room;
      const subRoomId = findSubRoomForItem(
        item.state.position,
        "fine",
        roomJson,
      );
      const subRooms = roomJson.meta?.subRooms;
      const holder =
        subRooms === undefined ? undefined
        : isWholeRoomSubRooms(subRooms) ? subRooms["*"]
        : subRooms[subRoomId];
      const roomAbove = holder?.above?.room;
      if (roomAbove !== undefined) {
        changeCharacterRoom({
          gameState,
          toRoomId: roomAbove,
          changeType: "level-select",
        });
      }
    }

    console.groupCollapsed(item.id);
    console.log(
      item.id,
      "item (live):",
      item,
      "\nstate (shallow copy):",
      { ...item.state },
      "\nposition",
      `(${item.state.position.x}, ${item.state.position.y}, ${item.state.position.z})`,
      "\nstoodOnBy:",
      Object.keys(item.state.stoodOnBy),
      "\nstandingOn:",
      isFreeItem(item) ? item.state.standingOnItemId : "n/a (not free to move)",
      pixiContainerToString(wrapper),
    );
    console.groupEnd();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).item = item;
  });

  return {
    output: wrapper,
    renderContext: childRenderer.renderContext,
    tick: (ctx) => childRenderer.tick(ctx),
    destroy: () => childRenderer.destroy(),
  };
};
