import { useEditorAppSelector } from "../../../store/store";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";

/**
 * the json of the items selected in the cursor room
 */
export const useSelectedJsonItems = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  return selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);
};
