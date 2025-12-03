import type { Simplify } from "type-fest";

import type { Shades } from "../../game/hintColours";
import type { PaletteSwaps } from "../../game/render/filters/lutTexture/sparseLut";
import type { UnknownRoomState } from "../../model/RoomState";
import type { TextureId } from "./spritesheetData/spriteSheetData";
import type {
  SpritesheetTextureSwops,
  TextureSpecificPaletteSwops,
} from "./spritesheetPaletteSwop";

import { spritesheetPalette } from "../../../gfx/spritesheetPalette";
import { spritesheetPaletteDim } from "../../../gfx/spritesheetPaletteDim";
import { colorScheme, getColorScheme } from "../../game/hintColours";
import {
  hueColourReplacements,
  replacePlaceholderColoursMapForRoom,
  sceneryColourReplacements,
} from "../../game/render/filters/standardFilters";
import { zxSpectrumDimmed } from "../../originalGame";
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
          paletteSwaps: {
            ...replacePlaceholderColoursMapForRoom(room),
          },
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
      textureSpecific: [...floorPaletteSwops(room), ...floorEdgeSwops(room)],
      // do not replace placeholder colours on doors with the room's colour,
      // since doors need to have them replaced with the colour of the room the
      // door leads to
      noReplacePlaceholderTextures: doorTextureIds,
    };
  } else {
    const roomColour =
      room.color.shade === "dimmed" ?
        zxSpectrumDimmed(getColorScheme(room.color).main.original)
      : getColorScheme(room.color).main.original;
    return {
      ambient: [
        {
          lutType: "voronoi",
          paletteSwaps: {
            pureBlack: spritesheetPalette.pureBlack,
            shadow: roomColour,
            redShadow: roomColour,
          },
        },
      ],
    };
  }
};

const floorEdgeSwops = (
  room: Pick<UnknownRoomState, "color" | "planet">,
): Array<TextureSpecificPaletteSwops> => {
  const rightEdgeSwops = replaceMapForShades(
    colorScheme[room.color.hue][room.color.shade].edges.right,
  );
  const towardsEdgeSwops = replaceMapForShades(
    colorScheme[room.color.hue][room.color.shade].edges.towards,
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

type PaletteSwapsForPlaceholderColours = Simplify<
  Required<Pick<PaletteSwaps, "replaceDark" | "replaceLight">>
>;

/**
 * get the replaceLight/replaceDark swops for the given shade
 */
const replaceMapForShades = ({
  basic,
  dimmed,
}: Shades): PaletteSwapsForPlaceholderColours => ({
  replaceLight: basic,
  replaceDark: dimmed,
});
