import type { AppSpritesheet } from "../loadedSpriteSheet";
import type { SpritesheetTextureSwops } from "../spritesheetPaletteSwop";
import type { VariantBuildContext } from "../VariantBuildContext";

import { roomSpritesheetTextureSwops } from "../roomSpritesheetTextureSwops";
import {
  createSpritesheetVariant,
  noopSpritesheetTextureSwops,
} from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

export const destroyCurrentRoomSpritesheetVariant = () => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

/**
 * change the global palette swops to apply to the spritesheet before any
 * other rendering occurs. Promise resolves when the swopped spritesheet is ready
 */
export const createCurrentRoomSpritesheetVariant = (
  context: VariantBuildContext,
) => {
  const { roomScenery, roomColor, spriteOption } = context;
  // throw away previous swopped version of spritesheet - these are
  // short-lived and created on-demand:
  destroyCurrentRoomSpritesheetVariant();

  const spritesheetTextureSwops: SpritesheetTextureSwops =
    roomSpritesheetTextureSwops(roomScenery, roomColor, spriteOption) ??
    noopSpritesheetTextureSwops;

  swopped = createSpritesheetVariant(context, spritesheetTextureSwops);
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const currentRoomSpritesheetVariant = (): AppSpritesheet => {
  if (import.meta.env.DEV && swopped === undefined) {
    throw new Error(
      `current room spritesheet undefined - currentRoomSpritesheetVariant() should only be called when we know for sure it is available`,
    );
  }

  return swopped!;
};
