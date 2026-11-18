import {
  type EditorRootState,
  type EditorThunk,
} from "../../../../store/store";
import { type EditorRoomState } from "../../../editorTypes";
import { type OpenRoomId } from "../../../slice/OpenRoom";
import { type MaybePointingAtSomething } from "../../cursor/PointingAt";
import { type EditorViewport } from "../../viewport/EditorViewport";

/**
 * what a tool does with the pointer in an open room - each handler can return a
 * thunk to read from the store, dispatch or otherwise make changes to the store
 * this allows us to test tool handlers which dispatch without mocking the store
 * to catch what was dispatched
 */
export interface ToolHandler {
  handleMouseMove(params: MouseMoveParams): EditorThunk;
  handleMouseUp(params: MouseUpParams): EditorThunk;
  handleMouseDown(params: MouseDownParams): EditorThunk;
  handleMouseLeave(params: MouseLeaveParams): EditorThunk;
  /**
   * whether a drag starting at this mousedown would be used by this tool -
   * drags that no tool claims pan the editor view instead
   */
  claimsDrag(params: MouseDownParams, storeState: EditorRootState): boolean;
}

// Base type containing common fields
type BaseMouseParams = {
  /**
   * the open room the pointer is in
   */
  openRoomId: OpenRoomId;
  roomState: EditorRoomState;
  mouseEvent: MouseEvent;
};

// Base type for events that involve pointing at something
type BasePointingParams = BaseMouseParams & {
  pointingAt: MaybePointingAtSomething;
  viewport: EditorViewport;
};

export type MouseMoveParams = BasePointingParams & {
  pointingAtChanged: boolean;
};

export type MouseUpParams = BasePointingParams & {
  isClick: boolean;
};

export type MouseDownParams = BasePointingParams;

export type MouseLeaveParams = BaseMouseParams;
