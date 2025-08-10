import type { RefObject } from "react";
import type { Upscale } from "../../../../store/slices/upscale/Upscale";
import type { Xyz } from "../../../../utils/vectors/vectors";
import type { EditorRoomState } from "../../../editorTypes";
import type { RootStateWithLevelEditorSlice } from "../../../slice/levelEditorSlice";
import type { Tool } from "../../../Tool";
import type { MaybePointingAtSomething } from "../../cursor/PointingAt";
import type { RenderedRoomDimensions } from "../../../slice/levelEditorSelectors";

export interface ToolHandler<T extends Tool> {
  handleMouseMove(params: MouseMoveParams<T>): void;
  handleMouseUp(params: MouseUpParams<T>): void;
  handleMouseDown(params: MouseDownParams<T>): void;
  handleMouseLeave(params: MouseLeaveParams<T>): void;
}

// Base type containing common fields
export type BaseMouseParams<T extends Tool> = {
  roomState: EditorRoomState;
  tool: T;
  storeState: RootStateWithLevelEditorSlice;
  mouseEvent: MouseEvent;
};

// Base type for events that involve pointing at something
export type BasePointingParams<T extends Tool> = BaseMouseParams<T> & {
  pointingAt: MaybePointingAtSomething;
  upscale: Upscale;
};

export type MouseMoveParams<T extends Tool> = BasePointingParams<T> & {
  pointingAtChanged: boolean;
  mouseDownPointingAtRef: RefObject<MaybePointingAtSomething | undefined>;
  dragAccVec: RefObject<Xyz | undefined>;
  roomRenderSize: RenderedRoomDimensions;
};

export type MouseUpParams<T extends Tool> = BasePointingParams<T> & {
  mouseDownPointingAt: MaybePointingAtSomething | undefined;
  isClick: boolean;
  isDragEnd: boolean;
};

export type MouseDownParams<T extends Tool> = BasePointingParams<T>;

export type MouseLeaveParams<T extends Tool> = BaseMouseParams<T>;
