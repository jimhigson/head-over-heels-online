import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../editorTypes";
import { showDialog } from "../toolbar/showDialog";
import { ChooseTeleporterDestinationDialog } from "./ChooseTeleporterDestinationDialog";

export type TeleporterDestination = {
  toRoom: EditorRoomId;
  /** undefined to land where the teleporter lands by default */
  toItemId: EditorRoomItemId | undefined;
};

export type ChooseTeleporterDestinationOptions = {
  campaign: EditorCampaign;
  /** the room the teleporters are in */
  fromRoomId: EditorRoomId;
  /** the teleporters whose destination is being chosen */
  teleporterIds: readonly EditorRoomItemId[];
  /**
   * the destination they all share, if any - the dialog opens on picking its
   * item
   */
  initialDestination: TeleporterDestination | undefined;
};

/**
 * ask the user where teleporters lead: a room, and the item in it to land on.
 * Resolves to undefined if they cancel
 */
export const chooseTeleporterDestination = (
  options: ChooseTeleporterDestinationOptions,
): Promise<TeleporterDestination | undefined> =>
  showDialog<TeleporterDestination | undefined>((settle) => (
    <ChooseTeleporterDestinationDialog
      {...options}
      onChoose={settle}
      onCancel={() => settle(undefined)}
    />
  ));
