import { Color } from "pixi.js";

import { type PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import { colorScheme } from "../../game/render/gameColours/colourScheme";
import {
  blockstackGameColour,
  blockstackReplacementColours,
} from "../../game/render/gameColours/gameColours";
import {
  type ZxSpectrumRoomColour,
  type ZxSpectrumRoomHue,
} from "../../originalGame";
import { halfbrite } from "../../utils/colour/halfbrite";
import { emptyArray, emptyObject } from "../../utils/empty";
import {
  type PartialNamedColours,
  resolveSwops,
} from "../../utils/palette/palette";
import { octantIndexOfDirection } from "../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { type AxisXy } from "../../utils/vectors/vectors";
import { maybeDimPixiPalette } from "../palette/pixiPalette";
import { type BlockstackPaletteColourName } from "../palette/spritesheetPalette";
import {
  blockstackPixiPalettes,
  toppyPixiPalettes,
} from "../palette/spritesheetPixiPalettes";
import { type SceneryName } from "../planets";
import { type TexturesSpecifier } from "./reifyTextureIds";
import {
  type BaseTextureId,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import { type SpritesheetName } from "./spritesheetData/spritesheetMetaData";

export type TextureSpecificPaletteSwops = {
  textureIds: TexturesSpecifier;
  swops: Map<Color, Color>;
  /** if true, the ambient swops won't apply on top of the swops given for this texture */
  dodgeAmbient?: boolean;
};

/** the swops to apply to a spritesheet to colour it for a room */
export type SpritesheetTextureSwops = {
  ambient: Array<PaletteSwopSpec>;
  textureSpecific?: Array<TextureSpecificPaletteSwops>;
};

/** NOTE: - does not match deadly floors */
const isFloorTexture = (textureId: TextureId): boolean =>
  /\.floor$/.test(textureId);

/**
 * every sprite of an uncolourised sheet is coloured at render time by a per-room
 * tint, so the whole sheet is swopped to near-white and the shadows to full ink
 */
const uncolourisedAmbient = {
  lutType: "voronoi" as const,
  swops: resolveSwops(blockstackPixiPalettes.basic, {
    pureBlack: new Color(0x00_00_00),
    shadow: new Color(0xff_ff_ff),
    redShadow: new Color(0xff_ff_ff),
  }),
};

/**
 * door leg pillars take the wall swops, since they stand in the wall's plane.
 * wall art is the two far-side facings, d0 (left) and d2 (away)
 */
const isWallTexture = (textureId: TextureId): boolean =>
  /\.wall\.[^.]+\.d[02]$|door\.legs\.pillar/.test(textureId);

const isDoorLegsPillarTexture = (
  textureId: TextureId,
): textureId is Extract<
  BaseTextureId,
  `${string}.door.legs.pillar.${AxisXy}`
> => /door\.legs\.pillar/.test(textureId);

const isLeftWallTexture = (
  textureId: TextureId,
): textureId is Extract<BaseTextureId, `${string}.wall.${string}.d0`> =>
  /\.wall\.[^.]+\.d0$/.test(textureId);

const isMoonbaseScreen = (
  textureId: TextureId,
): textureId is Extract<BaseTextureId, `moonbase.wall.screen.${string}`> =>
  /^moonbase\.wall\.screen/.test(textureId);

const isSceneryTexture = (t: TextureId): boolean =>
  isFloorTexture(t) || isWallTexture(t);

export const roomSpritesheetTextureSwops = (
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
  /**
   * different spritesheets will have different levels of palette swopping - this
   * param allows us to handle them differently in these cases
   */
  spritesheetName: SpritesheetName,
): SpritesheetTextureSwops => {
  switch (spritesheetName) {
    case "blockstack":
      return {
        ambient: [
          {
            lutType: "sparse",
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
              ),
            ),
          },
          roomColor.shade === "basic" ?
            blockstackAmbienceSwops(roomScenery, roomColor)
          : {
              // swop to the dimmed palette:
              lutType: "sparse" as const,
              swops: resolveSwops(
                blockstackPixiPalettes.basic,
                maybeDimPixiPalette(blockstackPixiPalettes, true),
              ),
            },
        ],
        textureSpecific: [
          ...blockstackScenerySwops(roomScenery, roomColor),
          ...floorEdgeSwops(roomColor),
          ...blockstackBookSwops(roomColor),
        ],
      };
    case "toppy":
      return {
        ambient: [],
        // do colour replacement only on the backgrounds, which Toppy didn't (re)draw (yet?):
        textureSpecific: [
          {
            swops: resolveSwops(
              toppyPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                false, // never use the dimmed palette for replacements
              ),
            ),
            textureIds: (t: TextureId) =>
              isFloorTexture(t) ||
              isWallTexture(t) ||
              isDoorLegsPillarTexture(t) ||
              isMoonbaseScreen(t) ||
              // the mirror's surface is drawn in placeholder colours:
              t.startsWith("mirror."),
          },
          ...floorEdgeSwops(roomColor),
        ],
      };
    case "speccy":
      return { ambient: [uncolourisedAmbient] };
    case "debug":
      // the debug sheet renders the same in every room - an empty swop, so it
      // still goes through the ordinary atlas bake like every other sheet:
      return { ambient: [] };
    default:
      spritesheetName satisfies never;
      throw new Error(`unknown spritesheet "${spritesheetName}"`);
  }
};

const floorEdgeSwops = (
  roomColor: ZxSpectrumRoomColour,
): Array<TextureSpecificPaletteSwops> => {
  const { edges } = colorScheme[roomColor.hue][roomColor.shade];

  const rightEdgeSwops = blockstackReplacementColours(
    edges.right.hue,
    roomColor.shade === "dimmed",
    "light-mid",
  );
  const towardsEdgeSwops = blockstackReplacementColours(
    edges.towards.hue,
    roomColor.shade === "dimmed",
    "mid-dark",
  );

  // floor edges always resolve their replaceLight/replaceDark/etc against the
  // blockstack palette, regardless of which spritesheet is active — the
  // replacement colours come from the blockstack-keyed gameColours system.
  return [
    {
      // the right floor edge and the y-axis threshold both run along y:
      textureIds: [
        `floorEdge.half.d${octantIndexOfDirection("right")}`,
        `floorEdge.d${octantIndexOfDirection("right")}`,
        `generic.door.floatingThreshold.d${octantIndexOfDirection("away")}`,
      ],
      swops: resolveSwops(blockstackPixiPalettes.basic, rightEdgeSwops),
    },
    {
      // the towards floor edge and the x-axis threshold both run along x:
      textureIds: [
        `floorEdge.half.d${octantIndexOfDirection("towards")}`,
        `floorEdge.d${octantIndexOfDirection("towards")}`,
        `generic.door.floatingThreshold.d${octantIndexOfDirection("left")}`,
      ],
      swops: resolveSwops(blockstackPixiPalettes.basic, towardsEdgeSwops),
    },
  ];
};

const blockstackScenerySwops = (
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
): Array<TextureSpecificPaletteSwops> => {
  if (roomScenery === "jail") {
    return [
      {
        textureIds: isSceneryTexture,
        swops: resolveSwops(
          blockstackPixiPalettes.basic,
          blockstackReplacementColours(
            roomColor.hue,
            roomColor.shade === "dimmed",
            "mid-dark",
          ),
        ),
      },
    ];
  }

  if (roomScenery === "blacktooth" && roomColor.shade === "dimmed") {
    return [
      {
        textureIds: isWallTexture,
        swops: resolveSwops(
          blockstackPixiPalettes.basic,
          blockstackReplacementColours(roomColor.hue, true, "light-mid"),
        ),
      },
    ];
  }

  // avoid white floors standing out too much, since floors need to not
  // be too distracting so that items stand out:
  if (roomColor.hue === "white" || roomColor.hue === "yellow") {
    // blacktooth can stand up to the brighter white on the floors since they
    // don't have too many replaceLight pixels:
    switch (roomScenery) {
      case "market":
        // market has hue stripes against white, so in white rooms use the
        // darker replacements to contrast with the white:
        return [
          {
            textureIds: isSceneryTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "mid-dark",
              ),
            ),
          },
        ];
      case "egyptus":
        return [
          {
            textureIds: isDoorLegsPillarTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "light-dark",
              ),
            ),
          },
          {
            textureIds: isFloorTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "mid-dark",
              ),
            ),
          },
          {
            textureIds: isLeftWallTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "light-mid",
              ),
            ),
          },
          {
            textureIds: isWallTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "mid-dark",
              ),
            ),
          },
        ];
      case "moonbase":
      case "penitentiary":
      case "safari":
      case "bookworld":
        // avoid bright white floors (too distracting) but allow bright on
        // the walls:
        return [
          {
            textureIds: isFloorTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "mid-dark",
              ),
            ),
          },
        ];
      case "blacktooth":
        // lighter walls/floors for plumes, shields, etc
        return [
          {
            textureIds: isDoorLegsPillarTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "light-dark",
              ),
            ),
          },
          {
            textureIds: isSceneryTexture,
            swops: resolveSwops(
              blockstackPixiPalettes.basic,
              blockstackReplacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "light-mid",
              ),
            ),
          },
        ];
      default:
        roomScenery satisfies never;
    }
  }

  return emptyArray;
};

const blockstackBookSwops = (
  roomColor: ZxSpectrumRoomColour,
): Array<TextureSpecificPaletteSwops> => {
  const { hue, shade } = roomColor;
  // avoid white books standing out too much in white rooms:
  if (hue === "white" || hue === "yellow") {
    return [
      {
        textureIds: [
          `book.d${octantIndexOfDirection("left")}`,
          `book.d${octantIndexOfDirection("away")}`,
        ],
        swops: resolveSwops(blockstackPixiPalettes.basic, {
          ...blockstackReplacementColours(hue, shade === "dimmed", "light-mid"),
          // books don't use any shadow pixels other than on their covers,
          // which is why it works to put in a third colour:
          shadow: blockstackGameColour(`swop_${hue}Dim`, shade === "dimmed"),
        }),
      },
    ];
  }

  if (shade === "dimmed") {
    return [
      {
        textureIds: [
          `book.d${octantIndexOfDirection("left")}`,
          `book.d${octantIndexOfDirection("away")}`,
        ],
        swops: resolveSwops(blockstackPixiPalettes.basic, {
          ...blockstackReplacementColours(
            roomColor.hue,
            true,
            roomColor.hue === "cyan" ?
              // the dark blue is already to dark to support this getting darker:
              "light-mid"
              // otherwise, darken it up:
            : "mid-dark",
          ),
        }),
      },
    ];
  }

  return emptyArray;
};

const blockstackSceneryColourReplacements: Partial<
  Record<SceneryName, PartialNamedColours<BlockstackPaletteColourName>>
> = {
  blacktooth: {
    pureBlack: halfbrite(blockstackPixiPalettes.basic.moss, 0.15),
  },
  safari: {
    pureBlack: halfbrite(blockstackPixiPalettes.basic.moss, 0.17),
  },
  jail: {
    pureBlack: halfbrite(blockstackPixiPalettes.basic.redShadow, 0.2),
  },
  egyptus: {
    pureBlack: halfbrite(blockstackPixiPalettes.basic.redShadow),
  },
  moonbase: {
    shadow: blockstackPixiPalettes.basic.shadow_greyBlue,
    pureBlack: halfbrite(blockstackPixiPalettes.basic.metallicBlue, 0.2),
  },
  bookworld: {
    shadow: blockstackPixiPalettes.basic.shadow_brown,
    pureBlack: halfbrite(blockstackPixiPalettes.basic.highlightBeige, 0.1),
  },
  penitentiary: {
    pureBlack: halfbrite(blockstackPixiPalettes.basic.midGrey, 0.2),
  },
};

const blockstackHueColourReplacements: Partial<
  Record<ZxSpectrumRoomHue, PartialNamedColours<BlockstackPaletteColourName>>
> = {
  yellow: { shadow: blockstackPixiPalettes.basic.shadow_brown },
  white: { shadow: blockstackPixiPalettes.basic.shadow_greyBlue },
  magenta: {
    shadow: blockstackPixiPalettes.basic.shadow_magenta,
  },
  cyan: { shadow: blockstackPixiPalettes.basic.shadow_blue },
};

/**
 * bright rooms get extra 'ambience' swops for shadow and pureBlack according
 * to their scenery/hue, as named colour replacements. Boosting pureBlack a
 * little gives shadows a little space to be darker than the 'black' bits of
 * the floors.
 */
export const blockstackAmbienceNamedSwops = (
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
): PartialNamedColours<BlockstackPaletteColourName> => ({
  ...(blockstackHueColourReplacements[roomColor.hue] ?? emptyObject),
  // scenery replacements overrides hue:
  ...(blockstackSceneryColourReplacements[roomScenery] ?? emptyObject),
});

export const blockstackAmbienceSwops = (
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
): PaletteSwopSpec => {
  return {
    lutType: "sparse" as const,
    swops: resolveSwops(
      blockstackPixiPalettes.basic,
      blockstackAmbienceNamedSwops(roomScenery, roomColor),
    ),
  };
};
