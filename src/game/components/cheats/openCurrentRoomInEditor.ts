import { openExternal } from "../../../utils/tauri/openExternalLink";
import type { GameApi } from "../../GameApi";
import { isInPlaytestMode } from "../../isInPlaytestMode";
import { editorRoomUrl } from "./editorRoomUrl";

/**
 * a playtested campaign is already in the editor, which can't be told apart
 * there from any other
 */
export const canOpenInEditor = () => !isInPlaytestMode();

/**
 * open the room being played, in the latest version of its campaign, in the editor
 */
export const openCurrentRoomInEditor = <RoomId extends string>(
  gameApi: GameApi<RoomId>,
) => {
  const maybeRoom = gameApi.currentRoom;
  if (import.meta.env.DEV && maybeRoom === undefined) {
    throw new Error("opening in the editor needs a room being played");
  }
  openExternal(
    editorRoomUrl(
      import.meta.env.VITE_EDITOR_URL,
      gameApi.campaign.locator,
      maybeRoom!.id,
    ),
  );
};
