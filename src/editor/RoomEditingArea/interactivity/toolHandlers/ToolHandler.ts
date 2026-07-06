import { type RefObject } from "preact";

import { type EditorRootState } from "../../../../store/store";
import { type Xyz } from "../../../../utils/vectors/vectors";
import { type EditorRoomState } from "../../../editorTypes";
import { type MaybePointingAtSomething } from "../../cursor/PointingAt";
import { type EditorViewport } from "../../viewport/EditorViewport";
import { type Tool } from "../Tool";

export interface ToolHandler<T extends Tool> {
  handleMouseMove(params: MouseMoveParams<T>): void;
  handleMouseUp(params: MouseUpParams<T>): void;
  handleMouseDown(params: MouseDownParams<T>): void;
  handleMouseLeave(params: MouseLeaveParams<T>): void;
  /**
   * whether a drag starting at this mousedown would be used by this tool -
   * drags that no tool claims pan the editor view instead
   */
  claimsDrag(params: MouseDownParams<T>): boolean;
}

// Base type containing common fields
type BaseMouseParams<T extends Tool> = {
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
