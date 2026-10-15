import { exitGameRoomId } from "../../model/json/ItemConfigMap";
import { useIsUncolourised } from "../../store/slices/gameMenus/gameMenusSelectors";
import { editorStore, store, useEditorAppSelector } from "../../store/store";
import { Tab } from "../../ui/tabs/Tab";
import { TabBar } from "../../ui/tabs/TabBar";
import { type EditorRoomId } from "../editorTypes";
import { RoomPreviewTipContents } from "../roomPreview/RoomPreviewTipContents";
import {
  changeToRoom,
  closeOtherRoomTabs,
  closeRoomTab,
  pinRoomTab,
  roomJsonEdited,
  selectCurrentCommittedRoomJson,
  selectCursorRoomId,
  selectOpenRoomTabs,
  selectRoomHasUnsavedChanges,
} from "../slice/levelEditorSlice";
import { type RoomTab } from "../slice/RoomTab";
import { cssForRoomColour } from "../toolbar/buttons/RoomColourSelect";
import { buttonSmallHeightClassNames } from "../toolbar/buttonSizeClassNames";
import { abbreviateRoomId } from "./abbreviateRoomId";

/** a room can be renamed to an id that is not blank, has no spaces, and is not already used */
const canRenameRoomTo = (newRoomId: string): boolean =>
  /^\S+$/.test(newRoomId) &&
  newRoomId !== exitGameRoomId &&
  editorStore.getState().levelEditor.campaignInProgress.rooms[
    newRoomId as EditorRoomId
  ] === undefined;

/** rename the cursor room (the front tab's) */
const renameCursorRoom = (newRoomId: string) => {
  const roomJson = selectCurrentCommittedRoomJson(editorStore.getState());
  editorStore.dispatch(
    roomJsonEdited({
      roomJson: { ...roomJson, id: newRoomId as EditorRoomId },
      timestamp: Date.now(),
    }),
  );
};

/** a trailing * on a room with changes to save */
const unsavedMarked = (name: string, hasUnsavedChanges: boolean) =>
  hasUnsavedChanges ? `${name}*` : name;

export type RoomTabButtonProps = {
  roomTab: RoomTab;
  isActive: boolean;
};

const RoomTabButton = ({
  roomTab: { roomId, isPreview },
  isActive,
}: RoomTabButtonProps) => {
  const uncolourised = useIsUncolourised();
  const roomHue = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.rooms[roomId].color.hue,
  );
  const hasUnsavedChanges = useEditorAppSelector((state) =>
    selectRoomHasUnsavedChanges(state, roomId),
  );

  return (
    <Tab
      label={unsavedMarked(roomId, hasUnsavedChanges)}
      shortLabel={unsavedMarked(abbreviateRoomId(roomId), hasUnsavedChanges)}
      isActive={isActive}
      onSelect={() => store.dispatch(changeToRoom(roomId))}
      onClose={() => store.dispatch(closeRoomTab(roomId))}
      onCloseOthers={() => store.dispatch(closeOtherRoomTabs(roomId))}
      onDblClick={() => store.dispatch(pinRoomTab(roomId))}
      rename={
        isActive ?
          {
            name: roomId,
            isValid: canRenameRoomTo,
            // a tab being renamed is kept, not replaced by the next room browsed to:
            onStart: () => store.dispatch(pinRoomTab(roomId)),
            onRename: renameCursorRoom,
          }
        : undefined
      }
      tip={
        // the active room is already shown, no need for a preview:
        !isActive && <RoomPreviewTipContents roomId={roomId} />
      }
      // coloured as the room select colours rooms, each in its own colour, the
      // front tab like the current room; the font has no italics, so a preview
      // tab is in the dim version of its colour:
      class={`command-colours ${buttonSmallHeightClassNames}`}
      style={{
        ...cssForRoomColour(roomHue, uncolourised, isPreview),
        // in front, on black like the other front tabs - a dim colour isn't
        // light enough to reverse onto black by itself:
        ...(isPreview && isActive && { "--command-primary": "black" }),
      }}
    />
  );
};

export type RoomTabBarProps = {
  class?: string;
};

/**
 * Tab bar for open rooms
 */
export const RoomTabBar = ({ class: className }: RoomTabBarProps) => {
  const roomTabs = useEditorAppSelector((state) => selectOpenRoomTabs(state));
  const cursorRoomId = useEditorAppSelector(selectCursorRoomId);

  return (
    <TabBar
      tabLabels={roomTabs.map(({ roomId }) => roomId)}
      label="Open rooms"
      class={className}
    >
      {roomTabs.map((roomTab) => (
        <RoomTabButton
          key={roomTab.roomId}
          roomTab={roomTab}
          isActive={roomTab.roomId === cursorRoomId}
        />
      ))}
    </TabBar>
  );
};
