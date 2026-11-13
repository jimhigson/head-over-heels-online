import { store, useEditorAppSelector } from "../../store/store";
import { PaneDropZones } from "../../ui/PaneDropZones";
import {
  roomTabDroppedBesidePane,
  roomTabMoved,
  selectFocusedTabGroupId,
  selectIsOnlyPane,
  selectTabGroupFrontOpenRoomId,
  tabGroupFocused,
} from "../slice/levelEditorSlice";
import { findLayoutNode, type TabGroupId } from "../slice/PaneLayout";
import { OpenRoomPane } from "./OpenRoomPane";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { roomTabDrag } from "./roomTabDrag";
import { useSpritesheets } from "./useSpritesheets";

export type TabGroupAreaContentProps = {
  tabGroupId: TabGroupId;
};

const TabGroupAreaContent = ({ tabGroupId }: TabGroupAreaContentProps) => {
  // one set for the pane's life, whichever tab is in front:
  const spritesheets = useSpritesheets();
  const frontOpenRoomId = useEditorAppSelector((state) =>
    selectTabGroupFrontOpenRoomId(state, tabGroupId),
  );
  // check the pane wasn't closed (in case we have a stale tabGroupId reference)
  if (frontOpenRoomId === undefined) {
    return null;
  }
  return (
    <OpenRoomPane
      key={frontOpenRoomId}
      openRoomId={frontOpenRoomId}
      tabGroupId={tabGroupId}
      spritesheets={spritesheets}
    />
  );
};

export type TabGroupAreaProps = {
  tabGroupId: TabGroupId;
};

/**
 * one pane of the room editing area, with its own Pixi app for its whole life,
 * drawing its front tab's open room (switching tabs swaps the room, not the
 * app). Using it focuses it; a tab dragged over it can go beside it or among
 * its tabs
 */
export const TabGroupArea = ({ tabGroupId }: TabGroupAreaProps) => {
  const isFocused = useEditorAppSelector(
    (state) => selectFocusedTabGroupId(state) === tabGroupId,
  );
  const isOnlyPane = useEditorAppSelector(selectIsOnlyPane);
  const tabCount = useEditorAppSelector(
    ({ levelEditor: { layout } }) =>
      findLayoutNode(layout, tabGroupId)?.children.length ?? 0,
  );
  return (
    <div
      class={`w-full h-full ${
        isFocused && !isOnlyPane ?
          "outline outline-1 -outline-offset-1 outline-moss"
        : ""
      }`}
      // before the pane's own pointer handling, so it acts in this pane:
      onPointerDownCapture={() => {
        if (!isFocused) {
          store.dispatch(tabGroupFocused(tabGroupId));
        }
      }}
    >
      <PaneDropZones
        class="w-full h-full"
        acceptsDrag={roomTabDrag.carries}
        onDropAt={(dragEvent, dropPlace) => {
          const tabInGroup = roomTabDrag.dropped(dragEvent);
          if (tabInGroup === undefined) {
            return;
          }
          store.dispatch(
            dropPlace === "centre" ?
              roomTabMoved({
                tabInGroup,
                toTabGroupId: tabGroupId,
                toIndex: tabCount,
              })
            : roomTabDroppedBesidePane({
                tabInGroup,
                besideTabGroupId: tabGroupId,
                side: dropPlace,
              }),
          );
        }}
      >
        <PixiApplicationProvider>
          <TabGroupAreaContent tabGroupId={tabGroupId} />
        </PixiApplicationProvider>
      </PaneDropZones>
    </div>
  );
};
