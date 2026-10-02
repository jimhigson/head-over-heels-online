import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  selectCurrentCommittedRoomJson,
  selectSelectedJsonItemIds,
  setSelectedDoorsToGameEnd,
} from "../../slice/levelEditorSlice";

/**
 * make the selected doors end the game. Hidden unless the selection is all
 * doors, at least one of which doesn't end the game already
 */
export const DoorGameEndMenuItem = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const items = selectedJsonItemIds.map((id) => roomJson.items[id]);
  if (
    items.length === 0 ||
    !items.every((item) => item?.type === "door") ||
    items.every((item) => item.config.toRoom === exitGameRoomId)
  ) {
    return null;
  }

  return (
    <ContextMenuItem
      value="Make game end"
      onSelect={() =>
        dispatch(setSelectedDoorsToGameEnd({ timestamp: Date.now() }))
      }
    >
      Make game end
    </ContextMenuItem>
  );
};
