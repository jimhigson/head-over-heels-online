import { type Simplify } from "type-fest";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { debugSpritesheetMeta } from "../../../../gfx/spritesheetMeta/debugSpritesheetMeta";
import { speccySpritesheetMeta } from "../../../../gfx/spritesheetMeta/speccySpritesheetMeta";
import { toppySpritesheetMeta } from "../../../../gfx/spritesheetMeta/toppySpritesheetMeta";
import { type ButtonId } from "../../../game/render/hud/HudButtonRenderer";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { type JsonItemConfig } from "../../../model/json/JsonItem";
import { type ZxSpectrumPaletteColour } from "../../../originalGame";
import { entries } from "../../../utils/entries";
import {
  type NamedHexColours,
  type NamedSwops,
} from "../../../utils/palette/palette";
import { type DirectionXy8 } from "../../../utils/vectors/vectors";
import { type BaseTextureId } from "./makeSpritesheetData";

type SpriteOverrides = Partial<
  Record<
    BaseTextureId,
    {
      pivot?: {
        x: number;
        y: number;
      };
      /**
       * declares that this texture has no pixels of its own and should instead
       * sample another texture's region of the spritesheet. Used to deduplicate
       * sprites that are identical (so artists only maintain one copy) or
       * identical-when-mirrored (`flipX`). The flip is baked into the texture's
       * UVs at build time, so it composes transparently with animations and
       * every draw site.
       */
      copyFrom?: {
        textureId: BaseTextureId;
        flipX?: boolean;
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

/**
 * how far an item kind's sprites draw outside (positive) or inside (negative)
 * each face of its physical aabb, in world px at the base camera angle -
 * makeItemRenderBoxAtCameraAngle builds the camera-current drawn box from
 * these. Omitted faces draw true to the physical box. `"none"` means the kind
 * draws nothing at all (eg the invisible blocker)
 */
export type ItemRenderExtent =
  | "none"
  | {
      xNeg?: number;
      xPos?: number;
      yNeg?: number;
      yPos?: number;
      zNeg?: number;
      zPos?: number;
    };

/** the item kinds whose rendering (and so overdraw) varies by a config field */
type StyleKeyedType =
  "block" | "deadlyBlock" | "moveableDeadly" | "slidingBlock";
type WhichKeyedType = "monster" | "sceneryPlayer";

/**
 * every id an item kind can have in the {@link ItemRenderExtents} table:
 * dotted kind-plus-discriminator ids following the TextureId convention
 * (`block.tower`, `monster.monkey`, `pickup.crown`), or the plain type for
 * kinds with a single rendering - constructed from the real item/config types
 * so table keys are compile-time checked
 */
export type ItemRenderExtentKey =
  | {
      [
        T in StyleKeyedType
      ]: `${T}.${JsonItemConfig<T, string, string>["style"]}`;
    }[StyleKeyedType]
  | {
      [
        T in WhichKeyedType
      ]: `${T}.${JsonItemConfig<T, string, string>["which"]}`;
    }[WhichKeyedType]
  | `pickup.${JsonItemConfig<"pickup", string, string>["gives"]}`
  | Exclude<ItemInPlayType, "pickup" | StyleKeyedType | WhichKeyedType>;

/**
 * per-item-kind drawn overdraw boxes. A missing key means the kind draws true
 * to its physical aabb. Consumed only by makeItemRenderBoxAtCameraAngle - the
 * structural types (wall, doorFrame, doorLegs, floor) derive their boxes
 * inline there and have no entries
 */
export type ItemRenderExtents = Partial<
  Record<ItemRenderExtentKey, ItemRenderExtent>
>;

/**
 * the name of every spritesheet, and so of every sprite option the player can
 * choose. Written out rather than derived from the spritesheet metas, since
 * the metas themselves refer to it
 */
export type SpritesheetName = "blockstack" | "debug" | "speccy" | "toppy";

export type SpritesheetMetadata<
  /** if not given, the spritesheet has no specified named colours - colours can have any name */
  PaletteColourName extends string = string,
  Name extends SpritesheetName = SpritesheetName,
> = {
  name: Name;
  /**
   * if given, this spritesheet draws the named spritesheet's art, uncoloured
   * and tinted per room at render time
   */
  isUncolourisedOf?: SpritesheetName;
  /**
   * the spritesheet the game is drawn with while paused - itself, or eg an
   * uncolourised version
   */
  spritesheetWhenPaused: SpritesheetName;
  palettes: {
    basic: NamedHexColours<PaletteColourName>;
    /** if given, an alternative palette to use in dimmed rooms */
    dim?: NamedHexColours<PaletteColourName>;
  };
  playable: PlayableSpritesheetMetaData;
  itemRenderExtents: ItemRenderExtents;
  overrides?: SpriteOverrides;
  missedTextures?: BaseTextureId[];
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
    /**
     * how each palette colour appears in a mirror's reflection. Optional: a
     * spritesheet without this (eg speccy) uses its normal variant for
     * reflections instead of a dedicated reflection sheet.
     */
    mirrorReflection?: {
      colours: NamedSwops<PaletteColourName>;
    };
    /**
     * how the citizens of Freedom recolour to distinguish them from the
     * player. Optional: a spritesheet without this renders scenery players
     * from its normal variant
     */
    sceneryPlayer?: {
      colours: NamedSwops<PaletteColourName>;
    };
  };
  effectColours: EffectColours<PaletteColourName>;
  /**
   * a list of palette colour names used as a dark→light gradient for the
   * floating text fade-in/fade-out effect. Last element is the peak brightness.
   */
  floatingTextGradient: PaletteColourName[];
  /**
   * a debugging sheet: offered only by the cheats panel and the
   * cycle-sprites key while cheats are on - excluded from
   * {@link spritesheetNameValues}, so the normal display menus never offer it
   */
  debug?: true;
  /** if true, shows original-game correct overdraws to emulate rendering artifacts on floors */
  showFloorOverDraw: boolean;

  /**
   * when teleporting, how black does a colour have to be to be snapped to black (like a zx spectrum
   * game where the ink colour is always black, but the paper colour changes). If the spritesheet
   * contains true black outlines, should be close to zero, otherwise should be a value of the darker
   * end of the palette, but not necessarily pure black
   */
  teleporterEffectBlackPoint: number;
  buttonColours: Record<ButtonId, PaletteColourName>;
  /** maps palette colour names to their closest ZX Spectrum equivalents, used by the teleporter colour clash effect */
  mapToZxSpectrumPalette?: Partial<
    Record<PaletteColourName, ZxSpectrumPaletteColour>
  >;
  /** maps palette colours to blue/cyan/white spectrum equivalents by luminance (rounding down), used by the death colour clash effect */
  mapToZxSpectrumForDeathEffectPalette?: Partial<
    Record<PaletteColourName, ZxSpectrumPaletteColour>
  >;
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

  /** which walking frame to use for the upwards jump motion, defaults to 1 if not given */
  jumpAscent?: 1 | 2 | 3;
};

/**
 * When a direction is omitted, all frames are assumed present.
 * When a direction is listed, only the frames marked `true` are included.
 */
export type PlayableSpritesheetFrames = {
  [D in DirectionXy8]?: PlayableDirectionFrames;
};

// the satisfies constrains each spritesheet meta to sit under a key equal to its own name
export const spritesheetMetas = {
  blockstack: blockStackSpritesheetMeta,
  speccy: speccySpritesheetMeta,
  toppy: toppySpritesheetMeta,
  debug: debugSpritesheetMeta,
} satisfies { [Name in SpritesheetName]: SpritesheetMetadata<string, Name> };

export type SpritesheetMetas = typeof spritesheetMetas;

/**
 * the spritesheet whose image and frames a spritesheet draws: its own, unless
 * it is an uncolourised version of another
 */
export const spritesheetArtName = (
  spritesheetMeta: SpritesheetMetadata,
): SpritesheetName => spritesheetMeta.isUncolourisedOf ?? spritesheetMeta.name;

/**
 * the spritesheets offered by the normal display menus: every non-debug sheet
 */
export const spritesheetNameValues: SpritesheetName[] = entries(
  spritesheetMetas,
)
  .filter(([, spritesheetMeta]) => spritesheetMeta.debug !== true)
  .map(([name]) => name);

/**
 * the spritesheets offered while cheats are on: the normal set plus the
 * debug sheet. Used by the cheats panel's sprites select and the cycle-sprites
 * key
 */
export const spritesheetNameValuesWithDebug: SpritesheetName[] = [
  ...spritesheetNameValues,
  "debug",
];
