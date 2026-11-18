import { type Tagged } from "type-fest";

import { emptyArray } from "../../utils/empty";
import { entries, valuesIter } from "../../utils/entries";
import { type Xy } from "../../utils/vectors/vectors";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import { type EditorRoomView } from "./EditorRoomView";
import { type HoveredItem, type LevelEditorState } from "./levelEditorSlice";
import { type DragInProgress } from "./reducers/dragToMoveReducers";

/**
 * identifies one mounted room pane - generated when the pane mounts, so every
 * pane (and there may be several at once) has its own
 */
export type EditorPaneId = Tagged<string, "EditorPaneId">;

/**
 * which room a pane shows: the cursor room (following it as it changes), or
 * always the same room
 */
export type EditorPaneRoomSource =
  { type: "cursorRoom" } | { type: "room"; roomId: EditorRoomId };

/**
 * the state of one mounted room pane - what is selected and hovered in it, and
 * how it is framed
 */
export type EditorPane = {
  roomSource: EditorPaneRoomSource;
  /**
   * whether the pane edits its room. Commands acting on the selection only
   * act on an editable pane's
   */
  editable: boolean;
  /**
   * each room's selected items, kept while other rooms are shown, removed when
   * its tab is closed
   */
  selectedJsonItemIdsByRoom: Partial<Record<EditorRoomId, EditorRoomItemId[]>>;
  hoveredItem: HoveredItem | undefined;
  clickableAnnotationHovered: boolean;
  /** what the pointer is dragging in the pane, if anything */
  dragInProgress: DragInProgress | undefined;
  /**
   * when set, the item context menu is shown at this position (scaled pixels,
   * in the room's projected screen space)
   */
  contextMenuXy: undefined | Xy;
  /** the pane's size, in css px */
  paneSize: Xy;
  /**
   * how a fixed-room pane frames its room; undefined until it is first fitted.
   * Cursor-room panes frame the room with its tab's view
   */
  fixedRoomView: EditorRoomView | undefined;
};

let nextEditorPaneNumber = 0;

/** a new id for a pane that is mounting */
export const generateEditorPaneId = (): EditorPaneId =>
  `pane${nextEditorPaneNumber++}` as EditorPaneId;

export const newEditorPane = (
  roomSource: EditorPaneRoomSource,
  editable: boolean,
): EditorPane => ({
  roomSource,
  editable,
  selectedJsonItemIdsByRoom: {},
  hoveredItem: undefined,
  clickableAnnotationHovered: false,
  dragInProgress: undefined,
  contextMenuXy: undefined,
  paneSize: { x: 0, y: 0 },
  fixedRoomView: undefined,
});

export const selectActivePaneFromLevelEditorState = (
  state: LevelEditorState,
): EditorPane | undefined =>
  state.activePaneId === undefined ?
    undefined
  : state.panes[state.activePaneId];

/** the active pane, if it edits the cursor room */
export const selectActiveCursorRoomEditingPaneFromLevelEditorState = (
  state: LevelEditorState,
): EditorPane | undefined => {
  const activePane = selectActivePaneFromLevelEditorState(state);
  return (
      activePane !== undefined &&
        activePane.editable &&
        activePane.roomSource.type === "cursorRoom"
    ) ?
      activePane
    : undefined;
};

/**
 * a pane that must be mounted - its id comes from code inside the pane, which
 * can only run while the pane is mounted
 */
export const requirePane = (
  state: LevelEditorState,
  paneId: EditorPaneId,
): EditorPane => {
  const pane = state.panes[paneId];
  if (import.meta.env.DEV && pane === undefined) {
    throw new Error(`pane ${paneId} is not mounted`);
  }
  return pane;
};

/** the room a pane is showing */
export const paneRoomId = (
  state: LevelEditorState,
  { roomSource }: EditorPane,
): EditorRoomId =>
  roomSource.type === "cursorRoom" ?
    state.cursorRoom.roomId
  : roomSource.roomId;

/** the items selected in a pane, in the room it is showing */
export const selectPaneSelectedJsonItemIdsFromLevelEditorState = (
  state: LevelEditorState,
  paneId: EditorPaneId,
): EditorRoomItemId[] => {
  const pane = state.panes[paneId];
  // check pane wasn't closed (in case pane not mounted yet)
  if (pane === undefined) {
    return emptyArray;
  }
  return pane.selectedJsonItemIdsByRoom[paneRoomId(state, pane)] ?? emptyArray;
};

export const panesIter = (state: LevelEditorState) => valuesIter(state.panes);

export const cursorRoomPanesIter = (state: LevelEditorState) =>
  panesIter(state).filter((pane) => pane.roomSource.type === "cursorRoom");

/** forget every pane's selection in a room, eg when it is closed or deleted */
export const forgetRoomSelectionsInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => {
  for (const pane of panesIter(state)) {
    delete pane.selectedJsonItemIdsByRoom[roomId];
  }
};

/**
 * clear what every mounted pane has selected, hovered or open, keeping the
 * panes themselves - eg for a different campaign
 */
export const resetPanesInPlace = (state: LevelEditorState) => {
  for (const [paneId, pane] of entries(state.panes)) {
    state.panes[paneId] = {
      ...newEditorPane(pane.roomSource, pane.editable),
      paneSize: pane.paneSize,
    };
  }
};

/**
 * forget the cursor-room panes' selection in a room whose tab is closing
 */
export const forgetTabSelectionsInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => {
  for (const pane of cursorRoomPanesIter(state)) {
    delete pane.selectedJsonItemIdsByRoom[roomId];
  }
};
