import { useEditorAppSelector } from "../../../store/store";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
} from "../../slice/levelEditorSlice";

/**
 * summarises the selection, eg "block ‘b’" for one item, "2 block" when all
 * the same type, or "3 items" when the types differ
 */
export const useSelectionLabel = (): string => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const selectedItems = selectedJsonItemIds
    .map((id) => [id, roomJson.items[id]] as const)
    .filter(([, item]) => item !== undefined);

  if (selectedItems.length === 1) {
    const [[id, { type }]] = selectedItems;
    return `${type} ‘${id}’`;
  }

  const selectedTypes = selectedItems.map(([, { type }]) => type);

  return selectedTypes.every((type) => type === selectedTypes[0]) ?
      `${selectedTypes.length} ${selectedTypes[0]}`
    : `${selectedTypes.length} items`;
};
