import type { Simplify } from "type-fest";

import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { NamedColours, NamedSwops } from "../../../utils/palette/palette";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { LoadableSpriteOption } from "../loadedSpriteSheet";
import type { TextureId } from "./makeSpritesheetData";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { toppySpritesheetMeta } from "../../../../gfx/spritesheetMeta/toppySpritesheetMeta";
import { entries } from "../../../utils/entries";

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
  /** outline colour used around item appearances, typically whichever palette key is black */
  outline: PaletteColourName;
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
  /**
   * a list of palette colour names used as a dark→light gradient for the
   * floating text fade-in/fade-out effect. Last element is the peak brightness.
   */
  floatingTextGradient: PaletteColourName[];
  supportsUncolourised: boolean;
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

export const spritesheetMetaForOption = (
  name: LoadableSpriteOption,
): (typeof spritesheetMetas)[LoadableSpriteOption] => spritesheetMetas[name];

export const spriteOptionValues = entries(spritesheetMetas).flatMap(
  ([name, meta]) =>
    meta.supportsUncolourised ?
      [
        { name, uncolourised: false as const },
        { name, uncolourised: true as const },
      ]
    : [{ name, uncolourised: false as const }],
) as SpriteOption[];
