import { emptyArray } from "../../utils/empty";
import {
  type EditorItemInPlayUnion,
  type EditorJsonItemUnion,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { editorGhostOfEmittedItem } from "./editorGhostOfEmittedItem";
import { editorGhostsOfLiftEndsAndConnectors } from "./editorGhostsOfLiftEndsAndConnectors";

/**
 * the editor ghosts the editor shows for a json item, if its type has any: a lift's
 * ends, what an emitter emits
 */
export const editorGhostsForJsonItem = (
  jsonItemId: EditorRoomItemId,
  jsonItem: EditorJsonItemUnion,
  roomJson: EditorRoomJson,
): EditorItemInPlayUnion<"editorGhost">[] => {
  switch (jsonItem.type) {
    case "lift":
      return editorGhostsOfLiftEndsAndConnectors(
        jsonItemId,
        jsonItem,
        roomJson,
      );
    case "emitter":
      return editorGhostOfEmittedItem(jsonItemId, jsonItem, roomJson);
    default:
      return emptyArray;
  }
};
