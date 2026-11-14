import { type Tagged } from "type-fest";

import { cameraAngleBase } from "../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../utils/vectors/vectors";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import { type EditorRoomView } from "./EditorRoomView";
import { type HoveredItem } from "./levelEditorSlice";
import { type DragInProgress } from "./reducers/dragToMoveReducers";

/**
 * identifies an open room - the same room can be open more than once (eg in a
 * tab and in a dialog), each with its own framing and selection
 */
export type OpenRoomId = Tagged<`openRoom-${string}`, "OpenRoomId">;

/**
 * a room open for viewing (and maybe editing): what is selected and hovered in
 * it, and how it is framed. Kept whether or not anything is drawing it now -
 * in a tab of the layout, or by itself (eg for a dialog)
 */
export type OpenRoom = {
  type: "openRoom";
  id: OpenRoomId;
  roomId: EditorRoomId;
  subRoomId: string;
  /**
   * whether it edits its room. Commands acting on the selection only act on
   * an editable open room's
   */
  editable: boolean;
  selectedJsonItemIds: EditorRoomItemId[];
  hoveredItem: HoveredItem | undefined;
  clickableAnnotationHovered: boolean;
  /**
   * what the pointer is dragging in it, if anything
   */
  dragInProgress: DragInProgress | undefined;
  /**
   * when set, the item context menu is shown at this position (scaled pixels,
   * in the room's projected screen space)
   */
  contextMenuXy: undefined | Xy;
  /**
   * the size of the pane drawing it, in css px
   */
  paneSize: Xy;
  /**
   * how the room is framed; undefined until it is first fitted
   */
  view: EditorRoomView | undefined;
  /**
   * the 90°-increment camera rotation the room is viewed from
   */
  cameraAngle: Xy;
};

/**
 * a newly opened room's fields, other than which room it is and whether it is
 * editable: nothing selected, hovered, dragged or open, not yet sized or
 * fitted, and viewed from the base angle
 */
export const openRoomDefaults = {
  type: "openRoom",
  selectedJsonItemIds: [],
  hoveredItem: undefined,
  clickableAnnotationHovered: false,
  dragInProgress: undefined,
  contextMenuXy: undefined,
  paneSize: { x: 0, y: 0 },
  view: undefined,
  cameraAngle: cameraAngleBase,
} satisfies Partial<OpenRoom>;
