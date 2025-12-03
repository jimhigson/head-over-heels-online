import type { PaletteSwaps } from "../../game/render/filters/lutTexture/sparseLut";
import type { UnknownRoomState } from "../../model/RoomState";
import type { ZxSpectrumRoomHue } from "../../originalGame";
import type { DirectionXy4 } from "../../utils/vectors/vectors";
import type { SceneryName } from "../planets";
import type { TextureId } from "./spritesheetData/spriteSheetData";
import type {
  SpritesheetTextureSwops,
  TextureSpecificPaletteSwops,
} from "./spritesheetPaletteSwop";

import { colorScheme } from "../../game/render/gameColours/colourScheme";
import {
  gameColour,
  replacementColours,
} from "../../game/render/gameColours/gameColours";
import { halfbrite } from "../../utils/colour/halfBrite";
import { emptyArray, emptyObject } from "../../utils/empty";
import { spritesheetPalette } from "../palette/spritesheetPalette";
import { spritesheetPaletteDim } from "../palette/spritesheetPalette";
import { textureIds } from "./spritesheetData/spriteSheetData";

const doorTextureIds = textureIds.filter(
  (tid): tid is TextureId & `door.${string}` => tid.startsWith("door."),
);

const isFloorTexture = (
  textureId: TextureId,
): textureId is TextureId & `${string}.floor${".deadly" | ""}` =>
  /\.floor(\.deadly)?$/.test(textureId);

const isWallTexture = (
  textureId: TextureId,
): textureId is TextureId & `${string}.wall.${string}.${DirectionXy4}` =>
  /\.wall\.[^.]+\.(away|left)$|door\.legs\.pillar/.test(textureId);

const isDoorLegsPillarTexture = (
  textureId: TextureId,
): textureId is TextureId & `${string}.door.legs.pillar.${string}` =>
  /door\.legs\.pillar/.test(textureId);

const isLeftWallTexture = (
  textureId: TextureId,
): textureId is TextureId & `${string}.wall.${string}.left` =>
  /\.wall\.[^.]+\.left$/.test(textureId);

const isSceneryTexture = (t: TextureId) =>
  isFloorTexture(t) || isWallTexture(t);

export const colourisedRoomSwops = (
  colourised: boolean,
  room: Pick<UnknownRoomState, "color" | "planet">,
): SpritesheetTextureSwops | undefined => {
  if (colourised) {
    // non-dimmed room:
    return {
      ambient: [
        {
          lutType: "sparse",
          paletteSwaps: replacementColours(
            room.color.hue,
            room.color.shade === "dimmed",
          ),
        },
        room.color.shade === "basic" ?
          {
            // bright rooms get extra 'ambience' swops for shadow and pureBlack according to their
            // scenery/hue. Boosting pureBlack a little gives shadows a little space to be darker
            // than the 'black' bits of the floors.
            lutType: "sparse" as const,
            paletteSwaps: {
              ...(sceneryColourReplacements[room.planet] ?? emptyObject),
              ...(hueColourReplacements[room.color.hue] ?? emptyObject),
            },
          }
        : {
            // dimmed rooms get an additional colour transform after
            // the normal ones, to swop to the dimmed palette:
            lutType: "sparse" as const,
            paletteSwaps: {
              ...spritesheetPaletteDim,
            },
          },
      ],
      textureSpecific: [
        ...scenerySwops(room),
        ...floorEdgeSwops(room),
        ...bookSwops(room),
      ],
      // do not replace placeholder colours on doors with the room's colour,
      // since doors need to have them replaced with the colour of the room the
      // door leads to
      noReplacePlaceholderTextures: doorTextureIds,
    };
  } else {
    return undefined;
  }
};

const floorEdgeSwops = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Array<TextureSpecificPaletteSwops> => {
  const { edges } = colorScheme[room.color.hue][room.color.shade];

  const rightEdgeSwops = replacementColours(
    edges.right.hue,
    room.color.shade === "dimmed",
    "light-mid",
  );
  const towardsEdgeSwops = replacementColours(
    edges.towards.hue,
    room.color.shade === "dimmed",
    "mid-dark",
  );

  return [
    {
      textureIds: [
        "floorEdge.half.right",
        "floorEdge.right",
        "generic.door.floatingThreshold.y",
      ],
      paletteSwaps: rightEdgeSwops,
    },
    {
      textureIds: [
        "floorEdge.half.towards",
        "floorEdge.towards",
        "generic.door.floatingThreshold.x",
      ],
      paletteSwaps: towardsEdgeSwops,
    },
  ];
};

const scenerySwops = ({
  color,
  planet,
}: Pick<
  UnknownRoomState,
  "color" | "planet"
>): Array<TextureSpecificPaletteSwops> => {
  if (planet === "jail") {
    return [
      {
        textureIds: isSceneryTexture,
        paletteSwaps: replacementColours(
          color.hue,
          color.shade === "dimmed",
          "mid-dark",
        ),
      },
    ];
  }

  if (planet === "blacktooth" && color.shade === "dimmed") {
    return [
      {
        textureIds: isWallTexture,
        paletteSwaps: replacementColours(color.hue, true, "light-mid"),
      },
    ];
  }

  // avoid white floors standing out too much, since floors need to not
  // be too distracting so that items stand out:
  if (color.hue === "white") {
    // blacktooth can stand up to the brighter white on the floors since they
    // don't have too many replaceLight pixels:
    switch (planet) {
      case "market":
        // market has hue stripes against white, so in white rooms use the
        // darker replacements to contrast with the white:
        return [
          {
            textureIds: isSceneryTexture,
            paletteSwaps: replacementColours(
              color.hue,
              color.shade === "dimmed",
              "mid-dark",
            ),
          },
        ];
      case "egyptus":
        return [
          {
            textureIds: isDoorLegsPillarTexture,
            paletteSwaps: replacementColours(
              color.hue,
              color.shade === "dimmed",
              "light-dark",
            ),
          },
          {
            textureIds: isFloorTexture,
            paletteSwaps: replacementColours(
              color.hue,
              color.shade === "dimmed",
              "mid-dark",
            ),
          },
          {
            textureIds: isLeftWallTexture,
            paletteSwaps: replacementColours(
              color.hue,
              color.shade === "dimmed",
              "light-mid",
            ),
          },
          {
            textureIds: isWallTexture,
            paletteSwaps: replacementColours(
              color.hue,
              color.shade === "dimmed",
              "mid-dark",
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
            paletteSwaps: replacementColours(
              color.hue,
              color.shade === "dimmed",
              "mid-dark",
            ),
          },
        ];
      case "blacktooth":
        // lighter walls/floors for plumes, shields, etc
        return [
          {
            textureIds: isSceneryTexture,
            paletteSwaps: replacementColours(
              color.hue,
              color.shade === "dimmed",
              "light-mid",
            ),
          },
        ];
      default:
        planet satisfies never;
    }
  }

  return emptyArray;
};

const bookSwops = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Array<TextureSpecificPaletteSwops> => {
  const { hue } = room.color;
  // avoid white books standing out too much in white rooms:
  if (hue === "white" || hue === "yellow") {
    return [
      {
        textureIds: ["book.x", "book.y"],
        paletteSwaps: {
          ...replacementColours(
            hue,
            room.color.shade === "dimmed",
            "light-mid",
          ),
          // books don't use any shadow pixels other than on their covers,
          // which is why it works to put in a third colour:
          shadow: gameColour(`swop_${hue}Dim`, room.color.shade === "dimmed"),
        },
      },
    ];
  }

  if (room.color.shade === "dimmed") {
    return [
      {
        textureIds: ["book.x", "book.y"],
        paletteSwaps: {
          ...replacementColours(
            room.color.hue,
            true,
            room.color.hue === "cyan" ?
              // the dark blue is already to dark to support this getting darker:
              "light-mid"
              // otherwise, darken it up:
            : "mid-dark",
          ),
        },
      },
    ];
  }

  return emptyArray;
};

const sceneryColourReplacements: Partial<Record<SceneryName, PaletteSwaps>> = {
  blacktooth: { pureBlack: halfbrite(spritesheetPalette.moss, 0.15) },
  safari: { pureBlack: halfbrite(spritesheetPalette.moss, 0.17) },
  jail: { pureBlack: halfbrite(spritesheetPalette.redShadow, 0.2) },
  egyptus: { pureBlack: halfbrite(spritesheetPalette.redShadow) },
  moonbase: {
    shadow: spritesheetPalette.shadow_greyBlue,
    pureBlack: halfbrite(spritesheetPalette.metallicBlue, 0.2),
  },
  bookworld: {
    pureBlack: halfbrite(spritesheetPalette.highlightBeige, 0.1),
  },
  penitentiary: {
    pureBlack: halfbrite(spritesheetPalette.midGrey, 0.2),
  },
};

export const hueColourReplacements: Partial<
  Record<ZxSpectrumRoomHue, PaletteSwaps>
> = {
  yellow: { shadow: spritesheetPalette.shadow_brown },
  white: { shadow: spritesheetPalette.shadow_greyBlue },
  magenta: { shadow: spritesheetPalette.shadow_magenta },
  cyan: { shadow: spritesheetPalette.shadow_blue },
};
