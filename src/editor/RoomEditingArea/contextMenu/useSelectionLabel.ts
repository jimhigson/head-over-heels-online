import { useEditorAppSelector } from "../../../store/store";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
} from "../../slice/levelEditorSlice";

/**
 * summarises the selection, eg "2 block" when all the same type, or "3 items"
 * when the types differ
 */
export const useSelectionLabel = (): string => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const selectedTypes = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined)
    .map((item) => item.type);

  return selectedTypes.every((type) => type === selectedTypes[0]) ?
      `${selectedTypes.length} ${selectedTypes[0]}`
    : `${selectedTypes.length} items`;
};
