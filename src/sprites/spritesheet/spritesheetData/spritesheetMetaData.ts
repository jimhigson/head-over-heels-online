import type { Simplify } from "type-fest";

import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { NamedColours, NamedSwops } from "../../../utils/palette/palette";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { LoadableSpriteOption } from "../loadedSpriteSheet";
import type { TextureId } from "./makeSpritesheetData";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { toppySpritesheetMeta } from "../../../../gfx/spritesheetMeta/toppySpritesheetMeta";

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

type EffectColours<PaletteColourName extends string> = {
  left: PaletteColourName;
  right: PaletteColourName;
  head: PaletteColourName;
  heels: PaletteColourName;
  invulnerable: PaletteColourName;
  /** colour from the palette to use for lives text of non-current player for example */
  dimText: PaletteColourName;
  carry: PaletteColourName;
};

export type EffectColourName = Simplify<keyof EffectColours<string>>;

export type SpritesheetMetadata<
  /** if not given, the spritesheet has no specified named colours - colours can have any name */
  PaletteColourName extends string = string,
  Name extends LoadableSpriteOption = LoadableSpriteOption,
> = {
  name: Name;
  palette: NamedColours<PaletteColourName>;
  /** if given, an alternative palette to use in dimmed rooms */
  paletteDim?: NamedColours<PaletteColourName>;
  playable: PlayableSpritesheetMetaData;
  overrides?: SpriteOverrides;
  missedTextures?: TextureId[];
  swops?: {
    deactivated?: {
      colours: NamedSwops<PaletteColourName>;
      playableDeactivatedPreserveColours?: {
        head?: PaletteColourName[];
        heels?: PaletteColourName[];
      };
    };
    doughnutted?: {
      colours: NamedSwops<PaletteColourName>;
    };
  };
  effectColours: EffectColours<PaletteColourName>;
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

export const spritesheetMetas = {
  BlockStack: blockStackSpritesheetMeta,
  Toppy: toppySpritesheetMeta,
} satisfies {
  [SO in LoadableSpriteOption]: SpritesheetMetadata<string, SO>;
};

export function spritesheetMetaForOption(
  spriteOption: "BlockStack" | "Speccy",
): (typeof spritesheetMetas)["BlockStack"];
export function spritesheetMetaForOption(
  spriteOption: "Toppy",
): (typeof spritesheetMetas)["Toppy"];
export function spritesheetMetaForOption(
  spriteOption: SpriteOption,
): (typeof spritesheetMetas)[LoadableSpriteOption];
export function spritesheetMetaForOption(spriteOption: SpriteOption) {
  return spritesheetMetas[
    spriteOption === "Speccy" ? "BlockStack" : spriteOption
  ];
}
