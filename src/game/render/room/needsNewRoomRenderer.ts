import type {
  DisplaySettings,
  SoundSettings,
} from "../../../store/slices/gameMenus/gameMenusSlice";
import type { Upscale } from "../../../store/slices/upscale/Upscale";
import type { RoomRendererType } from "./RoomRendererType";

export const needsNewRoomRenderer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  renderer: RoomRendererType<RoomId, RoomItemId> | undefined,
  roomChanged: boolean,
  upscale: Upscale,
  displaySettings: DisplaySettings,
  soundSettings: SoundSettings,
  paused: boolean,
): boolean =>
  renderer === undefined ||
  roomChanged ||
  renderer.renderContext.general.upscale !== upscale ||
  renderer.renderContext.general.displaySettings !== displaySettings ||
  renderer.renderContext.general.soundSettings !== soundSettings ||
  renderer.renderContext.general.paused !== paused;
