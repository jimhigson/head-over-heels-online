import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type Upscale } from "../../../store/slices/upscale/Upscale";
import { type InputDirectionMode } from "../../../store/slices/userSettings/userSettingsSlice";
import { type HudRenderer } from "./HudRenderer";

export const needsNewHudRenderer = <
  RoomId extends string,
  RoomItemId extends string,
>(
  renderer: HudRenderer<RoomId, RoomItemId> | undefined,
  spritesheetMeta: SpritesheetMetadata,
  onScreenControls: boolean,
  inputDirectionMode: InputDirectionMode,
  tickUpscale: Upscale,
  /**
   * the WebGL context was lost and restored - the renderer's glyph sprites still
   * reference originalSpritesheet textures that died with the old WebGL context,
   * so it must be rebuilt to pick up the re-baked ones
   */
  webGlContextRestored: boolean,
  /**
   * the original spritesheet instance has been recreated (eg at a new
   * baked upscale factor) since the renderer was built - its glyph sprites
   * reference textures destroyed with the old sheet, and its text is
   * rasterised for the old baked upscale factor
   */
  originalSheetRebuilt: boolean,
): boolean =>
  renderer === undefined ||
  webGlContextRestored ||
  originalSheetRebuilt ||
  renderer.renderContext.general.spritesheetMeta !== spritesheetMeta ||
  renderer.renderContext.general.onScreenControls !== onScreenControls ||
  renderer.renderContext.inputDirectionMode !== inputDirectionMode ||
  // invalidate on changing landscape/portrait since on-screen controls need this
  // to re-initialise
  renderer.renderContext.general.upscale.rotate90 !== tickUpscale.rotate90;
