import { type SetRequired } from "type-fest";

import { type RoomState } from "../../../model/RoomState";
import { type FreeCharacters } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { type InputDirectionMode } from "../../../store/slices/userSettings/userSettingsSlice";
import { type Xy } from "../../../utils/vectors/vectors";
import { type InGameGeneralRenderContext } from "../room/RoomRenderContexts";

export type HudRenderContext<RoomId extends string> = {
  inputDirectionMode: InputDirectionMode;
  /**
   * for HUDs, there really must be a game playing, so set the (usually optional) gameState to required
   */
  general: InGameGeneralRenderContext<RoomId>;
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

  freeCharacters: FreeCharacters;
};

/** for when we know the game isn't over */
export type HudRendererTickContextWithRoom<
  RoomId extends string,
  RoomItemId extends string,
> = SetRequired<HudRendererTickContext<RoomId, RoomItemId>, "room">;
