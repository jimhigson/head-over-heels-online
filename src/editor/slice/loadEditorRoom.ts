import {
  loadRoom,
  type LoadRoomOptions,
} from "../../game/gameState/loadRoom/loadRoom";
import { emptyUserSettings } from "../../store/slices/userSettings/emptyUserSettings";
import { emptyObject } from "../../utils/empty";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
} from "../editorTypes";

const loadRoomDefaultOptions = {
  roomPickupsCollected: emptyObject,
  scrollsRead: emptyObject,
  // display heads and heels in their starting rooms:
  isNewGame: true,
  userSettings: emptyUserSettings,
} as const satisfies Partial<LoadRoomOptions<EditorRoomId, EditorRoomItemId>>;

/**
 * load the editing room. The room model is camera-angle-free: everything
 * angle-dependent (which walls render, render boxes, hidden-wall door art) is
 * derived at render time, so no re-derivation is needed per view angle.
 */
export const loadEditorRoom = (roomJson: EditorRoomJson): EditorRoomState =>
  loadRoom({ roomJson, ...loadRoomDefaultOptions });
