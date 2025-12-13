import type { Simplify } from "type-fest";

import type { PaletteSwaps } from "../../game/render/filters/lutTexture/sparseLut";
import type { UnknownRoomState } from "../../model/RoomState";
import type { ZxSpectrumRoomHue } from "../../originalGame";
import type { TextureId } from "./spritesheetData/spriteSheetData";
import type {
  SpritesheetTextureSwops,
  TextureSpecificPaletteSwops,
} from "./spritesheetPaletteSwop";

import { spritesheetPalette } from "../../../gfx/spritesheetPalette";
import { spritesheetPaletteDim } from "../../../gfx/spritesheetPaletteDim";
import {
  hueColourReplacements,
  sceneryColourReplacements,
} from "../../game/render/filters/standardFilters";
import { colorScheme } from "../../game/render/gameColours/colourScheme";
import {
  gameColour,
  gameColourForHue,
} from "../../game/render/gameColours/gameColours";
import { zxSpectrumColor } from "../../originalGame";
import { emptyArray, emptyObject } from "../../utils/empty";
import { textureIds } from "./spritesheetData/spriteSheetData";

const doorTextureIds = textureIds.filter(
  (tid): tid is TextureId & `door.${string}` => tid.startsWith("door."),
);

const floorTextures = textureIds.filter(
  (textureId): textureId is TextureId & `${string}.floor${".deadly" | ""}` =>
    /\.floor(\.deadly)?$/.test(textureId),
);

export const colourisedRoomSwops = (
  colourised: boolean,
  room: Pick<UnknownRoomState, "color" | "planet">,
): SpritesheetTextureSwops => {
  if (colourised) {
    // non-dimmed room:
    return {
      ambient: [
        {
          lutType: "sparse",
          paletteSwaps: replaceMapForHue(
            room.color.hue,
            room.color.shade === "dimmed",
          ),
        },
        room.color.shade === "basic" ?
          {
            // bright rooms get extra 'ambience' swops according to their
            // scenery/hue:
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
        ...floorPaletteSwops(room),
        ...floorEdgeSwops(room),
        ...bookSwops(room),
      ],
      // do not replace placeholder colours on doors with the room's colour,
      // since doors need to have them replaced with the colour of the room the
      // door leads to
      noReplacePlaceholderTextures: doorTextureIds,
    };
  } else {
    const mainColour = zxSpectrumColor(room.color);

    return {
      ambient: [
        {
          lutType: "voronoi",
          paletteSwaps: {
            pureBlack: spritesheetPalette.pureBlack,
            shadow: mainColour,
            redShadow: mainColour,
          },
        },
      ],
    };
  }
};

const floorEdgeSwops = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Array<TextureSpecificPaletteSwops> => {
  const rightEdgeSwops = replaceMapForHue(
    colorScheme[room.color.hue][room.color.shade].edges.right.hue,
  );
  const towardsEdgeSwops = replaceMapForHue(
    colorScheme[room.color.hue][room.color.shade].edges.towards.hue,
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

const floorPaletteSwops = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Array<TextureSpecificPaletteSwops> => {
  switch (room.color.hue) {
    case "white": {
      const whiteColourPaletteSwops = {
        replaceLight: spritesheetPalette.lightGrey,
        replaceDark: spritesheetPalette.midGrey,
      };
      // avoid white floors standing out too much, since floors need to not
      // be too distracting so that items stand out:
      return [
        {
          textureIds: floorTextures,
          paletteSwaps: whiteColourPaletteSwops,
        },
      ];
    }

    default:
      // no special colourisation needed
      return emptyArray;
  }
};

const bookSwops = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Array<TextureSpecificPaletteSwops> => {
  switch (room.color.hue) {
    case "white": {
      // avoid white floors standing out too much, since floors need to not
      // be too distracting so that items stand out:
      return [
        {
          textureIds: ["book.x", "book.y"],
          paletteSwaps: {
            shadow: gameColour("midGrey", room.color.shade === "dimmed"),
          },
        },
      ];
    }

    default:
      // no special colourisation needed
      return emptyArray;
  }
};

type PaletteSwapsForPlaceholderColours = Simplify<
  Required<Pick<PaletteSwaps, "replaceDark" | "replaceLight">>
>;

/**
 * get the replaceLight/replaceDark swops for the given shade
 */
export const replaceMapForHue = (
  hue: ZxSpectrumRoomHue,
  inDimmedPalette: boolean = false,
): PaletteSwapsForPlaceholderColours => ({
  replaceLight: gameColourForHue(hue, false, inDimmedPalette),
  replaceDark: gameColourForHue(hue, true, inDimmedPalette),
});
