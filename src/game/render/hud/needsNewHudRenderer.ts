import type {
  InputDirectionMode,
  SpriteOption,
} from "../../../store/slices/gameMenus/gameMenusSlice";
import type { Upscale } from "../../../store/slices/upscale/Upscale";
import type { HudRenderer } from "./HudRenderer";

export const needsNewHudRenderer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  renderer: HudRenderer<RoomId, RoomItemId> | undefined,
  spriteOption: SpriteOption,
  onScreenControls: boolean,
  inputDirectionMode: InputDirectionMode,
  tickUpscale: Upscale,
): boolean =>
  renderer === undefined ||
  renderer.renderContext.general.spriteOption !== spriteOption ||
  renderer.renderContext.general.onScreenControls !== onScreenControls ||
  renderer.renderContext.inputDirectionMode !== inputDirectionMode ||
  // invalidate on changing landscape/portrait since on-screen controls need this
  // to re-initialise
  renderer.renderContext.general.upscale.rotate90 !== tickUpscale.rotate90;
