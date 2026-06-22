import { type Upscale } from "../../../store/slices/upscale/Upscale";
import {
  type DisplaySettings,
  type SoundSettings,
} from "../../../store/slices/userSettings/userSettingsSlice";
import { type RoomRendererType } from "./RoomRendererType";

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
  /**
   * the WebGL context was lost and restored - the renderer's item sprites still
   * reference variant textures that died with the old WebGL context, so it must
   * be rebuilt to pick up the re-baked ones
   */
  webGlContextRestored: boolean,
): boolean =>
  renderer === undefined ||
  roomChanged ||
  webGlContextRestored ||
  renderer.renderContext.general.upscale !== upscale ||
  renderer.renderContext.general.displaySettings !== displaySettings ||
  renderer.renderContext.general.soundSettings !== soundSettings ||
  renderer.renderContext.general.paused !== paused;
