import type { SetRequired } from "type-fest";

import type { RoomState } from "../../../model/RoomState";
import type { FreeCharacters } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import type { InputDirectionMode } from "../../../store/slices/userSettings/userSettingsSlice";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GeneralRenderContext } from "../room/RoomRenderContexts";

export type HudRenderContext<RoomId extends string> = {
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
  room?: RoomState<RoomId, RoomItemId>;
  /** Delta time in milliseconds since last tick */
  deltaMS: number;
  /**
   * duplicated from GeneralRenderContext because the HudRenderer is not
   * recreated when pause state changes (unlike the room renderer), so the
   * render context's value is stale
   */
  paused: boolean;

  freeCharacters: FreeCharacters;
};

/** for when we know the game isn't over */
export type HudRendererTickContextWithRoom<
  RoomId extends string,
  RoomItemId extends string,
> = SetRequired<HudRendererTickContext<RoomId, RoomItemId>, "room">;
