import type { SetRequired } from "type-fest";

import type { RoomState } from "../../../model/RoomState";
import type { InputDirectionMode } from "../../../store/slices/gameMenusSlice";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GeneralRenderContext } from "../RoomRenderContexts";

export type HudRenderContext<RoomId extends string> = {
  onScreenControls: boolean;
  inputDirectionMode: InputDirectionMode;
  /**
   * for HUDs, there really must be a game playing, so set the (usually optional) gameState to required
   */
  general: SetRequired<GeneralRenderContext<RoomId>, "gameState">;
};
export type HudRendererTickContext<
  RoomId extends string,
  RoomItemId extends string,
> = {
  screenSize: Xy;
  /** can be undefined when game over */
  room: RoomState<RoomId, RoomItemId> | undefined;
  /** Delta time in milliseconds since last tick */
  deltaMS: number;
};
