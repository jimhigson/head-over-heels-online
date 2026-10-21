import { type EditorRootState } from "../../store/store";
import { keys } from "../../utils/entries";
import { RoomPreviewTipContents } from "../roomPreview/RoomPreviewTipContents";
import {
  changeToRoom,
  selectCurrentCampaignInProgress,
} from "../slice/levelEditorSlice";
import { type ActionCommand } from "./EditorCommand";

/**
 * a command to go to each of the campaign's rooms, keyed `room.<roomId>`
 */
export const roomCommandDefinitions = (
  state: EditorRootState,
): Record<`room.${string}`, ActionCommand> =>
  Object.fromEntries(
    keys(selectCurrentCampaignInProgress(state).rooms).map((roomId) => [
      `room.${roomId}`,
      {
        type: "action",
        label: `Room: ${roomId}`,
        cmdKTip: <RoomPreviewTipContents roomId={roomId} />,
        action: () => changeToRoom({ roomId }),
      } satisfies ActionCommand,
    ]),
  );
