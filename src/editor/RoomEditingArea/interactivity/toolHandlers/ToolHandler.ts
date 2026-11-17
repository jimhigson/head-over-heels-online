import { type RefObject } from "preact";

import {
  type EditorRootState,
  type EditorThunk,
} from "../../../../store/store";
import { type Xy, type Xyz } from "../../../../utils/vectors/vectors";
import { type EditorRoomState } from "../../../editorTypes";
import { type OpenRoomId } from "../../../slice/OpenRoom";
import { type MaybePointingAtSomething } from "../../cursor/PointingAt";
import { type EditorViewport } from "../../viewport/EditorViewport";
import { type Tool } from "../Tool";

/**
 * what a tool does with the pointer in an open room - each handler can return a
 * thunk to read from the store, dispatch or otherwise make changes to the store
 * this allows us to test tool handlers which dispatch without mocking the store
 * to catch what was dispatched
 */
export interface ToolHandler<T extends Tool> {
  handleMouseMove(params: MouseMoveParams<T>): EditorThunk;
  handleMouseUp(params: MouseUpParams<T>): EditorThunk;
  handleMouseDown(params: MouseDownParams<T>): EditorThunk;
  handleMouseLeave(params: MouseLeaveParams<T>): EditorThunk;
  /**
   * whether a drag starting at this mousedown would be used by this tool -
   * drags that no tool claims pan the editor view instead
   */
  claimsDrag(params: MouseDownParams<T>): boolean;
}

// Base type containing common fields
type BaseMouseParams<T extends Tool> = {
  /**
   * the open room the pointer is in
   */
  openRoomId: OpenRoomId;
  /**
   * whether the open room is editable - one that isn't only selects, with
   * nothing locked against selection
   */
  editable: boolean;
  roomState: EditorRoomState;
  tool: T;
  storeState: EditorRootState;
  mouseEvent: MouseEvent;
};

// Base type for events that involve pointing at something
type BasePointingParams<T extends Tool> = BaseMouseParams<T> & {
  pointingAt: MaybePointingAtSomething;
  viewport: EditorViewport;
};

export type MouseMoveParams<T extends Tool> = BasePointingParams<T> & {
  pointingAtChanged: boolean;
  /** the pointer's movement since the last move the pane saw, in client px */
  clientMovement: Xy;
  mouseDownPointingAtRef: RefObject<MaybePointingAtSomething | undefined>;
  dragAccVec: RefObject<undefined | Xyz>;
};

export type MouseUpParams<T extends Tool> = BasePointingParams<T> & {
  mouseDownPointingAt: MaybePointingAtSomething | undefined;
  isClick: boolean;
  isDragEnd: boolean;
};

export type MouseDownParams<T extends Tool> = BasePointingParams<T>;

export type MouseLeaveParams<T extends Tool> = BaseMouseParams<T>;
