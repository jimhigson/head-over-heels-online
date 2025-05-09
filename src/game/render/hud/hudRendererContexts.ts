import type { RoomState } from "../../../model/RoomState";
import type { InputDirectionMode } from "../../../store/slices/gameMenusSlice";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GeneralRenderContext } from "../RoomRenderContexts";

export type HudRenderContext<RoomId extends string> = {
  onScreenControls: boolean;
  inputDirectionMode: InputDirectionMode;
  general: GeneralRenderContext<RoomId>;
};
export type HudRendererTickContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  screenSize: Xy;
  /** can be undefined when game over */
  room: RoomState<RoomId, RoomItemId> | undefined;
};
