import { useEditorAppSelector } from "../../../store/store";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
} from "../../slice/levelEditorSlice";

/**
 * the json of the items selected in the cursor room
 */
export const useSelectedJsonItems = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  return selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);
};
