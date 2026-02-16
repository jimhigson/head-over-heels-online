import type { InputDirectionMode } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { Upscale } from "../../../store/slices/upscale/Upscale";
import type { HudRenderer } from "./HudRenderer";

export const needsNewHudRenderer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  renderer: HudRenderer<RoomId, RoomItemId> | undefined,
  colourised: boolean,
  onScreenControls: boolean,
  inputDirectionMode: InputDirectionMode,
  tickUpscale: Upscale,
): boolean =>
  renderer === undefined ||
  renderer.renderContext.general.colourised !== colourised ||
  renderer.renderContext.onScreenControls !== onScreenControls ||
  renderer.renderContext.inputDirectionMode !== inputDirectionMode ||
  // invalidate on changing landscape/portrait since on-screen controls need this
  // to re-initialise
  renderer.renderContext.general.upscale.rotate90 !== tickUpscale.rotate90;
