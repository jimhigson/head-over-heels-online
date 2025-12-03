import type { InputDirectionMode } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { HudRenderer } from "./HudRenderer";

export const needsNewHudRenderer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  renderer: HudRenderer<RoomId, RoomItemId> | undefined,
  roomChanged: boolean,
  colourised: boolean,
  onScreenControls: boolean,
  inputDirectionMode: InputDirectionMode,
): boolean =>
  renderer === undefined ||
  roomChanged ||
  renderer.renderContext.general.colourised !== colourised ||
  renderer.renderContext.onScreenControls !== onScreenControls ||
  renderer.renderContext.inputDirectionMode !== inputDirectionMode;
