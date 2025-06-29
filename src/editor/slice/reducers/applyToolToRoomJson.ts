import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import { oppositeDirection, type Xyz } from "../../../utils/vectors/vectors";
import type { JsonItemType, JsonItemUnion } from "../../../model/json/JsonItem";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorJsonItem,
  EditorUnionOfAllItemInPlayTypes,
} from "../../EditorRoomId";
import type { ItemTool } from "../../Tool";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { cutHoleInWallsForDoors } from "./cutHoleInWallsForDoor";
import type { DistributedPick } from "type-fest";
import { pushUndoInPlace } from "./undoReducers";
import { starterRoom } from "../createStarterRoom";
import { changeRoomSceneryInPlace } from "../changeRoomSceneryInPlace";
import type { MonsterJsonConfig } from "../../../model/json/MonsterJsonConfig";

const nextItemId = <T extends JsonItemType = JsonItemType>(
  fromRoomJson: EditorRoomJson,
  itemTool: ItemTool<T>,
): EditorRoomItemId => {
  const baseName =
    itemTool.type === "monster" ?
      // special case monsters since they have so many variations:
      (itemTool.config as MonsterJsonConfig).which
    : itemTool.type;

  // eslint-disable-next-line no-constant-condition -- while(true) is ok; this will terminate
  for (let i = 1; true; i++) {
    const itemId = (
      i === 1 ? baseName : `${baseName}_${i}`) as EditorRoomItemId;
    if (!fromRoomJson.items[itemId]) {
      return itemId;
    }
  }
};

const addItemInPlace = <T extends JsonItemType = JsonItemType>(
  state: LevelEditorState,
  itemTool: ItemTool<T>,
  blockPosition: Xyz,
) => {
  const room = selectCurrentRoomFromLevelEditorState(state);
  const id = nextItemId(room, itemTool);

  // add to the room json - the loaded state of the room will flow from there
  room.items[id] = {
    type: itemTool.type,
    config: itemTool.config,
    position: blockPosition,
  } as JsonItemUnion<EditorRoomId, EditorRoomItemId>;
};

const isDoorTool = (itemTool: ItemTool): itemTool is ItemTool<"door"> => {
  return itemTool.type === "door";
};

export type ApplyToolToRoomJsonPayload = {
  blockPosition: Xyz;
  /**
   * the item (in play, not in json) in the room-in-play preview that the
   * user clicked on to use this tool
   */
  pointedAtItem: DistributedPick<
    EditorUnionOfAllItemInPlayTypes,
    "type" | "config" | "jsonItemId"
  >;
};

export const applyToolReducers = {
  applyToolToRoomJson(
    _state,
    {
      payload: { blockPosition, pointedAtItem },
    }: PayloadAction<ApplyToolToRoomJsonPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const { tool } = state;

    switch (tool?.type) {
      case "item": {
        if (isDoorTool(tool.item) && pointedAtItem.type === "wall") {
          pushUndoInPlace(state);

          const fromRoomJson = selectCurrentRoomFromLevelEditorState(state);

          const doorDirection = pointedAtItem.config.direction;
          // for doors, trim walls around where the door was placed:
          cutHoleInWallsForDoors(fromRoomJson, doorDirection, blockPosition);

          // TODO: do this conditionally, only if there isn't already a room
          // in this grid position
          const toRoomId = `room#${state.nextRoomId++}` as EditorRoomId;

          addItemInPlace(
            state,
            {
              ...tool.item,
              config: {
                ...tool.item.config,
                toRoom: toRoomId,
                direction: doorDirection,
              },
            },
            blockPosition,
          );

          const toRoomJson = {
            id: toRoomId,
            ...structuredClone(starterRoom),
            // give the same scenery and colour as the current room:
            color: fromRoomJson.color,
          };
          changeRoomSceneryInPlace(toRoomJson, fromRoomJson.planet);

          // create a new room so the door we put down has somewhere to go:
          state.campaignInProgress.rooms[toRoomId] = toRoomJson;
          const returnDoorId = nextItemId(toRoomJson, tool.item);

          const returnDoorPosition: Xyz = {
            x:
              doorDirection === "left" ? 0
              : doorDirection === "right" ? toRoomJson.size.x
              : Math.floor(toRoomJson.size.x / 2),
            y:
              doorDirection === "away" ? 0
              : doorDirection === "towards" ? toRoomJson.size.x
              : Math.floor(toRoomJson.size.x / 2),
            z: blockPosition.z,
          };

          const returnDoorDirection = oppositeDirection(doorDirection);

          const returnDoorItemJson: EditorJsonItem<"door"> = {
            type: "door",
            config: {
              toRoom: fromRoomJson.id,
              direction: returnDoorDirection,
            },
            position: returnDoorPosition,
          };

          toRoomJson.items[returnDoorId] = returnDoorItemJson;

          cutHoleInWallsForDoors(
            toRoomJson,
            returnDoorDirection,
            returnDoorPosition,
          );
        } else {
          pushUndoInPlace(state);
          // add any other item:
          addItemInPlace(state, tool.item, blockPosition);
        }
        state.selectedJsonItemIds = [];
        break;
      }
      case "pointer": {
        // do nothing for this one
        break;
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
