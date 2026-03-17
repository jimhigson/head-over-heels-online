import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { LoadableSpriteOption } from "../loadedSpriteSheet";
import type { TextureId } from "./spriteSheetData";

import BlockStack from "../../../../gfx/spritesheetMeta/BlockStack";
import Toppy from "../../../../gfx/spritesheetMeta/Toppy";

export type SpriteOverrides = Partial<
  Record<
    TextureId,
    {
      pivot?: {
        x: number;
        y: number;
      };
    }
  >
>;

export type SpritesheetMetaData = {
  playable: PlayableSpritesheetMetaData;
  overrides?: SpriteOverrides;
  useAltPaletteInDimmedRoom?: boolean;
  missedTextures?: TextureId[];
};

export type PlayableSpritesheetMetaData = {
  head: PlayableSpritesheetFrames;
  heels: PlayableSpritesheetFrames;
};

export type PlayableDirectionFrames = {
  blinking?: boolean;
  looking1?: boolean;
  looking2?: boolean;
  shadowMask?: boolean;
  shadowMaskFalling?: boolean;
  /** true = dedicated standing frame, 1-3 = use the stated walking frame as the standing frame */
  standing?: 1 | 2 | 3 | boolean;
};

/**
 * When a direction is omitted, all frames are assumed present.
 * When a direction is listed, only the frames marked `true` are included.
 */
export type PlayableSpritesheetFrames = {
  [D in DirectionXy8]?: PlayableDirectionFrames;
};

export const spritesheetMetas: Record<
  LoadableSpriteOption,
  SpritesheetMetaData
> = {
  BlockStack,
  Toppy,
};

export const spritesheetMetaForOption = (
  spriteOption: SpriteOption,
): SpritesheetMetaData =>
  spritesheetMetas[spriteOption === "Speccy" ? "BlockStack" : spriteOption];
