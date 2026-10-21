import { roomHues } from "../../model/roomHues";
import { type EditorRootState } from "../../store/store";
import { createShallowStableSelector } from "../../utils/redux/createShallowStableSelector";
import { type EditorRoomId } from "../editorTypes";

/**
 * each room's hue in the campaign being edited - unchanged by edits that
 * don't add, remove or recolour rooms
 */
export const selectRoomHues = createShallowStableSelector(
  [(state: EditorRootState) => state.levelEditor.campaignInProgress.rooms],
  (rooms) => roomHues<EditorRoomId>(rooms),
);
