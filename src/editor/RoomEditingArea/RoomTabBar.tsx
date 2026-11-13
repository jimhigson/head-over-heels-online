import nanoEqual from "nano-equal";

import { exitGameRoomId } from "../../model/json/ItemConfigMap";
import { useIsUncolourised } from "../../store/slices/gameMenus/gameMenusSelectors";
import { editorStore, store, useEditorAppSelector } from "../../store/store";
import { Tab, type TabMenuItem } from "../../ui/tabs/Tab";
import { TabBar } from "../../ui/tabs/TabBar";
import { type EditorRoomId } from "../editorTypes";
import { RoomPreviewTipContents } from "../roomPreview/RoomPreviewTipContents";
import {
  closeOtherRoomTabs,
  closeRoomTab,
  pinRoomTab,
  roomJsonEdited,
  roomTabMoved,
  roomTabSelected,
  roomTabSplit,
  selectCurrentCommittedRoomJson,
  selectFocusedTabGroupId,
  selectIsOnlyPane,
  selectRoomHasUnsavedChanges,
  selectTabGroupRoomIds,
} from "../slice/levelEditorSlice";
import {
  findLayoutNode,
  type TabGroupId,
  type TabId,
  type TabInGroup,
} from "../slice/PaneLayout";
import { cssForRoomColour } from "../toolbar/buttons/RoomColourSelect";
import { buttonSmallHeightClassNames } from "../toolbar/buttonSizeClassNames";
import { abbreviateRoomId } from "./abbreviateRoomId";
import { roomTabDrag } from "./roomTabDrag";

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

/**
 * open a tab's room again in a new pane, labelled by the divider the split
 * draws: "|" puts it to the right, "-" below
 */
const splitMenuItems = (tabInGroup: TabInGroup): TabMenuItem[] => [
  {
    label: "split |",
    onSelect: () => store.dispatch(roomTabSplit({ tabInGroup, side: "right" })),
  },
  {
    label: "split -",
    onSelect: () =>
      store.dispatch(roomTabSplit({ tabInGroup, side: "bottom" })),
  },
];

export type RoomTabButtonProps = {
  tabGroupId: TabGroupId;
  tabId: TabId;
  /**
   * the room the tab shows - given by the bar, so a closed tab's button never
   * reads its removed open room
   */
  roomId: EditorRoomId;
  /**
   * in front of its pane
   */
  isFront: boolean;
  /**
   * its pane is the focused one, so its front tab's room is the cursor room
   */
  isInFocusedPane: boolean;
};

const RoomTabButton = ({
  tabGroupId,
  tabId,
  roomId,
  isFront,
  isInFocusedPane,
}: RoomTabButtonProps) => {
  const uncolourised = useIsUncolourised();
  const isPreview = useEditorAppSelector(
    // check the tab wasn't closed (in case we have a stale tabId reference)
    ({ levelEditor: { layout } }) =>
      findLayoutNode(layout, tabId)?.isPreview ?? false,
  );
  const roomHue = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.rooms[roomId].color.hue,
  );
  const hasUnsavedChanges = useEditorAppSelector((state) =>
    selectRoomHasUnsavedChanges(state, roomId),
  );
  const tabInGroup: TabInGroup = { tabGroupId, tabId };

  return (
    <Tab
      label={unsavedMarked(roomId, hasUnsavedChanges)}
      shortLabel={unsavedMarked(abbreviateRoomId(roomId), hasUnsavedChanges)}
      isActive={isFront}
      onSelect={() => store.dispatch(roomTabSelected(tabInGroup))}
      onClose={() => store.dispatch(closeRoomTab(tabInGroup))}
      onCloseOthers={() => store.dispatch(closeOtherRoomTabs(tabInGroup))}
      menuItems={splitMenuItems(tabInGroup)}
      onDragStart={(dragEvent) => roomTabDrag.start(dragEvent, tabInGroup)}
      onDblClick={() => store.dispatch(pinRoomTab(tabInGroup))}
      rename={
        // renaming acts on the cursor room:
        isFront && isInFocusedPane ?
          {
            name: roomId,
            isValid: canRenameRoomTo,
            // a tab being renamed is kept, not replaced by the next room browsed to:
            onStart: () => store.dispatch(pinRoomTab(tabInGroup)),
            onRename: renameCursorRoom,
          }
        : undefined
      }
      tip={
        // the front room is already shown, no need for a preview:
        !isFront && <RoomPreviewTipContents roomId={roomId} />
      }
      isPreview={isPreview}
      // coloured as the room select colours rooms, each in its own colour, the
      // front tab like the current room; outside the focused pane, dimmed:
      class={`command-colours ${buttonSmallHeightClassNames}`}
      style={{
        ...cssForRoomColour(roomHue, uncolourised, !isInFocusedPane),
        // a dim colour isn't light enough to reverse onto black by itself:
        ...(!isInFocusedPane && isFront && { "--command-primary": "black" }),
      }}
    />
  );
};

export type RoomTabBarProps = {
  tabGroupId: TabGroupId;
  class?: string;
};

/**
 * a pane's tabs, one per open room - a tab dragged here moves among them
 */
export const RoomTabBar = ({
  tabGroupId,
  class: className,
}: RoomTabBarProps) => {
  const tabGroup = useEditorAppSelector(({ levelEditor: { layout } }) =>
    findLayoutNode(layout, tabGroupId),
  );
  const tabRoomIds = useEditorAppSelector(
    (state) => selectTabGroupRoomIds(state, tabGroupId),
    nanoEqual,
  );
  const isInFocusedPane = useEditorAppSelector(
    (state) => selectFocusedTabGroupId(state) === tabGroupId,
  );
  // closing a pane's only tab closes the pane, unless it is the only pane:
  const isOnlyPane = useEditorAppSelector(selectIsOnlyPane);
  // check the pane wasn't closed (in case we have a stale tabGroupId reference)
  if (tabGroup === undefined) {
    return null;
  }

  return (
    <TabBar
      tabLabels={tabRoomIds}
      label="Open rooms"
      isSingletonTabCloseable={!isOnlyPane}
      acceptsDrag={roomTabDrag.carries}
      onDropAt={(dragEvent, toIndex) => {
        const tabInGroup = roomTabDrag.dropped(dragEvent);
        if (tabInGroup !== undefined) {
          store.dispatch(
            roomTabMoved({ tabInGroup, toTabGroupId: tabGroupId, toIndex }),
          );
        }
      }}
      class={className}
    >
      {tabGroup.children.map((tabId, tabIndex) => (
        <RoomTabButton
          key={tabId}
          tabGroupId={tabGroupId}
          tabId={tabId}
          roomId={tabRoomIds[tabIndex]}
          isFront={tabId === tabGroup.frontTabId}
          isInFocusedPane={isInFocusedPane}
        />
      ))}
    </TabBar>
  );
};
