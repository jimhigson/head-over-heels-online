import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import type { Xy, Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomItemId, EditorRoomJson } from "../../editorTypes";
import type { PointingAtItem } from "../../RoomEditingArea/cursor/PointingAt";
import { focusTabInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import {
  commitPendingEditsInPlace,
  commitPendingNudgeInPlace,
} from "../inPlaceMutators/commitPendingNudgeInPlace";
import type { LevelEditorState, PendingEdits } from "../levelEditorSlice";
import type { OpenRoomId } from "../OpenRoom";
import { maybeLayoutNode, tabGroupsIter, tabGroupTabs } from "../PaneLayout";
import type { SelectionEntry } from "../SelectionEntry";
import type { ItemDragAction } from "./dragToMoveReducers";

/**
 * the plane a drag is moving on, from where on it the pointer began that part
 * of the drag. A drag changes plane when the modifier is pressed or released,
 * keeping the drag so far
 */
export type ItemDragPlane = {
  /**
   * the normal of the plane the items move on
   */
  normal: Xyz;
  /**
   * whether the modifier (move only in z) was held on this plane
   */
  modifierPressed: boolean;
  /**
   * the pointer when this plane's part of the drag began, in the screen px of
   * the open room the pointer is over
   */
  startScrXy: Xy;
  /**
   * the (unrounded) drag vector when this plane's part of the drag began
   */
  startDragVector: Xyz;
};

/**
 * the pointer pressed on items to drag them, shared by every open room so the
 * drag can be followed across panes
 */
export type ItemGrab = {
  /**
   * the open room the drag started in
   */
  sourceOpenRoomId: OpenRoomId;
  /**
   * where the pointer went down, in the source open room
   */
  mouseDownPointingAt: PointingAtItem;
  /**
   * the items grabbed - or a single editor ghost, which is dragged by itself,
   * leaving its item where it is
   */
  grabbedItems: SelectionEntry[];
  /**
   * the open room the pointer is over, if any
   */
  overOpenRoomId: OpenRoomId | undefined;
  /**
   * what the drag does to the items - undefined until the pointer has moved
   * far enough to be dragging
   */
  dragging: ItemDragAction | undefined;
  /**
   * the plane the drag is on, in the open room the pointer is over -
   * undefined until dragging, and from entering another open room until the
   * pointer first moves in it
   */
  plane: ItemDragPlane | undefined;
  /**
   * the drag vector, rounded to the grid, the items were last tried at - from
   * where they were to where they would go, in whichever room
   */
  roundedDragVector: Xyz;
  /**
   * the open room `roundedDragVector` was tried in - undefined once the
   * pointer moves to another
   */
  triedInOpenRoomId: OpenRoomId | undefined;
  /**
   * the open room the items are previewed dropping into, if any, and their
   * ids there
   */
  dropInto: ItemGrabDropInto | undefined;
};

type ItemGrabDropInto = {
  openRoomId: OpenRoomId;
  movedItemIds: EditorRoomItemId[];
};

export type ItemGrabPreviewedIntoPayload = ItemGrabDropInto & {
  /**
   * the edits dropping there would make - undefined when it would change
   * nothing
   */
  pendingEdits: PendingEdits | undefined;
};

/**
 * the tab showing an open room, and the pane it is in - undefined for an open
 * room by itself (eg in a dialog)
 */
const findOpenRoomTab = (state: LevelEditorState, openRoomId: OpenRoomId) =>
  tabGroupsIter(state.layout)
    .flatMap((tabGroup) =>
      tabGroupTabs(state.layout, tabGroup).map((tab) => ({ tabGroup, tab })),
    )
    .find(
      ({
        tab: {
          children: [tabOpenRoomId],
        },
      }) => tabOpenRoomId === openRoomId,
    );

export const itemGrabReducers = {
  itemGrabPointerDown(
    state,
    {
      payload: { sourceOpenRoomId, mouseDownPointingAt, grabbedItems },
    }: PayloadAction<
      Pick<
        ItemGrab,
        "grabbedItems" | "mouseDownPointingAt" | "sourceOpenRoomId"
      >
    >,
  ) {
    state.itemGrab = {
      sourceOpenRoomId,
      mouseDownPointingAt,
      grabbedItems,
      overOpenRoomId: sourceOpenRoomId,
      dragging: undefined,
      plane: undefined,
      roundedDragVector: { x: 0, y: 0, z: 0 },
      triedInOpenRoomId: undefined,
      dropInto: undefined,
    };
  },
  /**
   * the pointer has moved far enough for its press to be a drag
   */
  itemGrabDragStarted(
    state,
    {
      payload: { dragging, plane },
    }: PayloadAction<{ dragging: ItemDragAction; plane: ItemDragPlane }>,
  ) {
    if (state.itemGrab === undefined) {
      return;
    }
    state.itemGrab.dragging = dragging;
    state.itemGrab.plane = plane;
    const sourceOpenRoom = maybeLayoutNode(
      state.layout,
      state.itemGrab.sourceOpenRoomId,
    );
    if (sourceOpenRoom !== undefined) {
      sourceOpenRoom.dragInProgress = dragging;
    }
  },
  itemGrabPlaneChanged(
    state,
    { payload: plane }: PayloadAction<ItemDragPlane>,
  ) {
    if (state.itemGrab !== undefined) {
      state.itemGrab.plane = plane;
    }
  },
  itemGrabRounded(
    state,
    {
      payload: { openRoomId, roundedDragVector },
    }: PayloadAction<{ openRoomId: OpenRoomId; roundedDragVector: Xyz }>,
  ) {
    if (state.itemGrab !== undefined) {
      state.itemGrab.roundedDragVector = roundedDragVector;
      state.itemGrab.triedInOpenRoomId = openRoomId;
    }
  },
  itemGrabOverOpenRoom(
    _state,
    {
      payload: { openRoomId: overOpenRoomId, timestamp },
    }: PayloadAction<{
      openRoomId: OpenRoomId | undefined;
      timestamp: number;
    }>,
  ) {
    // immer's draft type won't take the undo entries' readonly tuples:
    const state = _state as LevelEditorState;
    const { itemGrab } = state;
    if (itemGrab === undefined) {
      return;
    }
    itemGrab.overOpenRoomId = overOpenRoomId;
    // the open room now under the pointer takes the drag up afresh:
    itemGrab.plane = undefined;
    itemGrab.triedInOpenRoomId = undefined;
    itemGrab.dropInto = undefined;
    if (state.pendingEdits?.madeBy.type === "drag") {
      state.pendingEdits = undefined;
    }

    const { sourceOpenRoomId, grabbedItems, mouseDownPointingAt, dragging } =
      itemGrab;
    if (overOpenRoomId === sourceOpenRoomId) {
      return;
    }
    switch (dragging) {
      case "moveItems":
        break;
      // only moved items leave their pane:
      case "resizeItems":
      case "moveEditorGhost":
      case undefined:
        return;
      default:
        dragging satisfies never;
    }
    // moved out of their room's pane, the items are hidden there until an
    // open room finds them somewhere to drop:
    const sourceRoom = state.campaignInProgress.rooms[
      mouseDownPointingAt.roomId
    ] as EditorRoomJson;
    state.pendingEdits = {
      edits: {
        [mouseDownPointingAt.roomId]: Object.fromEntries(
          grabbedItems.map(({ jsonItemId }) => [jsonItemId, null]),
        ),
      },
      description: {
        kind: "itemAction",
        verb: "Move",
        items: grabbedItems.map((grabbedItem) => [
          grabbedItem,
          sourceRoom.items[grabbedItem.jsonItemId],
        ]),
      },
      timestamp,
      madeBy: { type: "drag" },
    };
  },
  /**
   * preview the drag dropping into an open room
   */
  itemGrabPreviewedInto(
    _state,
    {
      payload: { openRoomId, movedItemIds, pendingEdits },
    }: PayloadAction<ItemGrabPreviewedIntoPayload>,
  ) {
    // immer's draft type won't take the payload's readonly undo entries:
    const state = _state as LevelEditorState;
    if (state.itemGrab === undefined) {
      return;
    }
    commitPendingNudgeInPlace(state);
    state.itemGrab.dropInto = { openRoomId, movedItemIds };
    state.pendingEdits = pendingEdits;
  },
  /**
   * drop the drag into the open room it is previewed dropping into: commit
   * it, then focus that open room with the dropped items selected there
   */
  itemGrabDropped(_state) {
    const state = _state as LevelEditorState;
    const { itemGrab } = state;
    if (itemGrab?.dropInto === undefined) {
      return;
    }
    const { sourceOpenRoomId, dropInto, grabbedItems } = itemGrab;
    commitPendingEditsInPlace(state);
    state.itemGrab = undefined;

    // either open room may have closed during the drag:
    const sourceOpenRoom = maybeLayoutNode(state.layout, sourceOpenRoomId);
    const dropIntoOpenRoom = maybeLayoutNode(state.layout, dropInto.openRoomId);
    if (sourceOpenRoom !== undefined) {
      sourceOpenRoom.dragInProgress = undefined;
      if (dropIntoOpenRoom?.roomId !== sourceOpenRoom.roomId) {
        // the items are no longer in the room they came from:
        sourceOpenRoom.selection = [];
      }
    }
    if (dropIntoOpenRoom === undefined) {
      return;
    }
    const openRoomTab = findOpenRoomTab(state, dropInto.openRoomId);
    if (openRoomTab !== undefined) {
      focusTabInPlace(state, openRoomTab.tabGroup.id, openRoomTab.tab.id);
    }
    dropIntoOpenRoom.selection =
      // a dragged editor ghost stays selected:
      (
        grabbedItems.some(
          ({ whichEditorGhost }) => whichEditorGhost !== undefined,
        )
      ) ?
        grabbedItems
      : dropInto.movedItemIds.map((jsonItemId) => ({
          jsonItemId,
          whichEditorGhost: undefined,
        }));
  },
  /**
   * end the press without dropping anything: any drag's preview is discarded,
   * so the items stay where they were
   */
  itemGrabAbandoned(state) {
    const { itemGrab } = state;
    if (itemGrab === undefined) {
      return;
    }
    if (itemGrab.dragging !== undefined) {
      state.pendingEdits = undefined;
      const sourceOpenRoom = maybeLayoutNode(
        state.layout,
        itemGrab.sourceOpenRoomId,
      );
      if (sourceOpenRoom !== undefined) {
        sourceOpenRoom.dragInProgress = undefined;
      }
    }
    state.itemGrab = undefined;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
