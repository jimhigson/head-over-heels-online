import { exitGameRoomId } from "../../model/json/ItemConfigMap";
import type { EditorThunk } from "../../store/store";
import type { EditorRoomId } from "../editorTypes";

/**
 * validates an id for a room to be renamed to: the reason it can't be taken,
 * or undefined if it can. An id must not be blank, have spaces, be reserved,
 * or already be another room's
 */
export const validateNewRoomIdThunk =
  (newRoomId: string): EditorThunk<string | undefined> =>
  (_dispatch, getState) =>
    newRoomId === "" ? "name can’t be blank"
    : /\s/.test(newRoomId) ? "name can’t contain spaces"
    : newRoomId === exitGameRoomId ? "name is reserved"
    : (
      getState().levelEditor.campaignInProgress.rooms[
        newRoomId as EditorRoomId
      ] !== undefined
    ) ?
      "name already exists"
    : undefined;
