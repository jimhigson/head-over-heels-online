import { type EditorRoomId } from "../editorTypes";
import { showDialog } from "../toolbar/showDialog";
import {
  ChooseRoomDialog,
  type ChooseRoomDialogProps,
} from "./ChooseRoomDialog";

export type ChooseRoomOptions = Omit<
  ChooseRoomDialogProps,
  "onCancel" | "onChoose"
>;

/** ask the user for a room, resolving to the room id, or undefined if they cancel,
 * eg for changing the target of a teleporter */
export const chooseRoom = (
  options: ChooseRoomOptions,
): Promise<EditorRoomId | undefined> =>
  showDialog<EditorRoomId | undefined>((settle) => (
    <ChooseRoomDialog
      {...options}
      onChoose={settle}
      onCancel={() => settle(undefined)}
    />
  ));
