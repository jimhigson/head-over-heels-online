import { type Color } from "pixi.js";

import { type PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import { colorScheme } from "../../game/render/gameColours/colourScheme";
import {
  gameColour,
  replacementColours,
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
import {
  type BlockstackPaletteColourName,
  paletteBlockstack,
  paletteBlockstackDim,
  paletteToppy,
} from "../palette/spritesheetPalette";
import { type SceneryName } from "../planets";
import { type TexturesSpecifier } from "./reifyTextureIds";
import {
  type BaseTextureId,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import { type SpriteOptionName } from "./Spritesheets";

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
  spriteOptionName: SpriteOptionName,
): SpritesheetTextureSwops => {
  switch (spriteOptionName) {
    case "BlockStack":
      return {
        ambient: [
          {
            lutType: "sparse",
            swops: resolveSwops(
              paletteBlockstack,
              replacementColours(roomColor.hue, roomColor.shade === "dimmed"),
            ),
          },
          roomColor.shade === "basic" ?
            blockstackAmbienceSwops(roomScenery, roomColor)
          : {
              // swop to the dimmed palette:
              lutType: "sparse" as const,
              swops: resolveSwops(paletteBlockstack, paletteBlockstackDim),
            },
        ],
        textureSpecific: [
          ...blockstackScenerySwops(roomScenery, roomColor),
          ...floorEdgeSwops(roomColor),
          ...blockstackBookSwops(roomColor),
        ],
      };
    case "Toppy":
      return {
        ambient: [],
        // do colour replacement only on the backgrounds, which Toppy didn't (re)draw (yet?):
        textureSpecific: [
          {
            swops: resolveSwops(
              paletteToppy,
              replacementColours(
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
    case "Debug":
      // the Debug sheet renders the same in every room - an empty swop, so it
      // still goes through the ordinary atlas bake like every other sheet:
      return { ambient: [] };
    default:
      spriteOptionName satisfies never;
      throw new Error(`unknown sprite option "${spriteOptionName}"`);
  }
};

const floorEdgeSwops = (
  roomColor: ZxSpectrumRoomColour,
): Array<TextureSpecificPaletteSwops> => {
  const { edges } = colorScheme[roomColor.hue][roomColor.shade];

  const rightEdgeSwops = replacementColours(
    edges.right.hue,
    roomColor.shade === "dimmed",
    "light-mid",
  );
  const towardsEdgeSwops = replacementColours(
    edges.towards.hue,
    roomColor.shade === "dimmed",
    "mid-dark",
  );

  // floor edges always resolve their replaceLight/replaceDark/etc against the
  // blockstack palette, regardless of which spritesheet is active — the
  // replacement colours come from the blockstack-keyed gameColours system.
  return [
    {
      // the right lip and the y-axis threshold both run along y:
      textureIds: [
        `floorEdge.half.d${octantIndexOfDirection("right")}`,
        `floorEdge.d${octantIndexOfDirection("right")}`,
        `generic.door.floatingThreshold.d${octantIndexOfDirection("away")}`,
      ],
      swops: resolveSwops(paletteBlockstack, rightEdgeSwops),
    },
    {
      // the towards lip and the x-axis threshold both run along x:
      textureIds: [
        `floorEdge.half.d${octantIndexOfDirection("towards")}`,
        `floorEdge.d${octantIndexOfDirection("towards")}`,
        `generic.door.floatingThreshold.d${octantIndexOfDirection("left")}`,
      ],
      swops: resolveSwops(paletteBlockstack, towardsEdgeSwops),
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
          paletteBlockstack,
          replacementColours(
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
          paletteBlockstack,
          replacementColours(roomColor.hue, true, "light-mid"),
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
              paletteBlockstack,
              replacementColours(
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
              paletteBlockstack,
              replacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "light-dark",
              ),
            ),
          },
          {
            textureIds: isFloorTexture,
            swops: resolveSwops(
              paletteBlockstack,
              replacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "mid-dark",
              ),
            ),
          },
          {
            textureIds: isLeftWallTexture,
            swops: resolveSwops(
              paletteBlockstack,
              replacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "light-mid",
              ),
            ),
          },
          {
            textureIds: isWallTexture,
            swops: resolveSwops(
              paletteBlockstack,
              replacementColours(
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
              paletteBlockstack,
              replacementColours(
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
              paletteBlockstack,
              replacementColours(
                roomColor.hue,
                roomColor.shade === "dimmed",
                "light-dark",
              ),
            ),
          },
          {
            textureIds: isSceneryTexture,
            swops: resolveSwops(
              paletteBlockstack,
              replacementColours(
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
        swops: resolveSwops(paletteBlockstack, {
          ...replacementColours(hue, shade === "dimmed", "light-mid"),
          // books don't use any shadow pixels other than on their covers,
          // which is why it works to put in a third colour:
          shadow: gameColour(`swop_${hue}Dim`, shade === "dimmed"),
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
        swops: resolveSwops(paletteBlockstack, {
          ...replacementColours(
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
  blacktooth: { pureBlack: halfbrite(paletteBlockstack.moss, 0.15) },
  safari: { pureBlack: halfbrite(paletteBlockstack.moss, 0.17) },
  jail: { pureBlack: halfbrite(paletteBlockstack.redShadow, 0.2) },
  egyptus: { pureBlack: halfbrite(paletteBlockstack.redShadow) },
  moonbase: {
    shadow: paletteBlockstack.shadow_greyBlue,
    pureBlack: halfbrite(paletteBlockstack.metallicBlue, 0.2),
  },
  bookworld: {
    shadow: paletteBlockstack.shadow_brown,
    pureBlack: halfbrite(paletteBlockstack.highlightBeige, 0.1),
  },
  penitentiary: {
    pureBlack: halfbrite(paletteBlockstack.midGrey, 0.2),
  },
};

const blockstackHueColourReplacements: Partial<
  Record<ZxSpectrumRoomHue, PartialNamedColours<BlockstackPaletteColourName>>
> = {
  yellow: { shadow: paletteBlockstack.shadow_brown },
  white: { shadow: paletteBlockstack.shadow_greyBlue },
  magenta: { shadow: paletteBlockstack.shadow_magenta },
  cyan: { shadow: paletteBlockstack.shadow_blue },
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
      paletteBlockstack,
      blockstackAmbienceNamedSwops(roomScenery, roomColor),
    ),
  };
};
