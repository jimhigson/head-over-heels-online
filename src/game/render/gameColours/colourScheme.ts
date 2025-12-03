import type { Color } from "pixi.js";

import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { UnknownRoomState } from "../../../model/RoomState";
import type { SpritesheetPaletteColourName } from "../../../sprites/palette/spritesheetPalette";

import {
  zxSpectrumColor,
  type ZxSpectrumRoomColour,
  type ZxSpectrumRoomHue,
  type ZxSpectrumShade,
} from "../../../originalGame";

/*
export type Shades = { basic: Color; dimmed: Color; original: Color };
export const whiteShades = {
  original: new Color(zxSpectrumColors.white),
  basic: spritesheetPalette.white,
  dimmed: spritesheetPalette.lightGrey,
};
export const yellowShadesInBasicRooms = {
  original: new Color(zxSpectrumColors.yellow),
  basic: spritesheetPalette.highlightBeige,
  dimmed: spritesheetPalette.redShadow,
};
export const yellowShadesInDimmedRooms = {
  original: new Color(zxSpectrumColors.yellow),
  basic: spritesheetPalette.midRed,
  dimmed: spritesheetPalette.redShadow,
};
export const magentaShades = {
  original: new Color(zxSpectrumColors.magenta),
  basic: spritesheetPalette.pink,
  // by using halfbrite from the original palette, it should be found by a the LUT
  // palette swap filter when it indexes also the halfbrite versions of the input colours
  dimmed: halfbrite(spritesheetPalette.pink),
};
export const cyanShades = {
  original: new Color(zxSpectrumColors.cyan),
  basic: spritesheetPalette.pastelBlue,
  // this looks ok for floor edges, but for floors like in #blacktooth23heels heels, it is way too saturated
  //dimmed: spritesheetPalette.metallicBlue,
  dimmed: halfbrite(
    spritesheetPalette.pastelBlue,
    slightlyBrighterReducedBrightness,
  ),
};
export const greenShades = {
  original: new Color(zxSpectrumColors.green),
  basic: spritesheetPalette.moss,
  dimmed: halfbrite(spritesheetPalette.moss, slightlyBrighterReducedBrightness),
};
*/

export type RoomColorScheme = {
  main: ZxSpectrumRoomHue;
  edges: {
    right: {
      hue: ZxSpectrumRoomHue;
      /**
       * are the edges dimmed in the original? This only impacts when not colourised, since
       * when colourised, we change the colour of the edges but don't change them to be dimmed/not
       */
      dimInOriginal: boolean;
    };
    towards: {
      hue: ZxSpectrumRoomHue;
      /**
       * are the edges dimmed in the original? This only impacts when not colourised, since
       * when colourised, we change the colour of the edges but don't change them to be dimmed/not
       */
      dimInOriginal: boolean;
    };
  };
  hud: {
    /** for lives display (uncolourised), collected items) */
    brightHue: ZxSpectrumRoomHue;
    /** for text, non-selected character, uncollected items */
    dimmedHue: ZxSpectrumRoomHue;
    icons: ZxSpectrumRoomHue;
  };
};

export const colorScheme: Record<
  ZxSpectrumRoomHue,
  Record<ZxSpectrumShade, RoomColorScheme>
> = {
  white: {
    basic: {
      main: "white",
      edges: {
        towards: { hue: "cyan", dimInOriginal: false },
        right: { hue: "yellow", dimInOriginal: true },
      },
      hud: {
        brightHue: "yellow",
        dimmedHue: "magenta",
        icons: "cyan",
      },
    },
    dimmed: {
      main: "white",
      edges: {
        towards: { hue: "green", dimInOriginal: false },
        right: { hue: "cyan", dimInOriginal: true },
      },
      hud: {
        // probably wrong (maybe not matching original)
        brightHue: "yellow",
        dimmedHue: "magenta",
        icons: "cyan",
      },
    },
  },
  yellow: {
    basic: {
      main: "yellow",
      edges: {
        towards: { hue: "green", dimInOriginal: false },
        right: { hue: "white", dimInOriginal: true },
      },
      hud: {
        brightHue: "cyan",
        dimmedHue: "magenta",
        icons: "green",
      },
    },
    dimmed: {
      main: "yellow",
      edges: {
        towards: { hue: "cyan", dimInOriginal: true },
        right: { hue: "cyan", dimInOriginal: false },
      },
      hud: {
        // probably wrong (maybe not matching original)
        brightHue: "cyan",
        dimmedHue: "magenta",
        icons: "green",
      },
    },
  },

  magenta: {
    basic: {
      main: "magenta",
      edges: {
        towards: { hue: "green", dimInOriginal: true },
        right: { hue: "cyan", dimInOriginal: true },
      },
      hud: {
        brightHue: "white",
        dimmedHue: "cyan",
        icons: "yellow",
      },
    },
    dimmed: {
      main: "magenta",
      edges: {
        towards: { hue: "green", dimInOriginal: true },
        right: { hue: "cyan", dimInOriginal: true },
      },
      hud: {
        // maybe wrong
        brightHue: "white",
        dimmedHue: "cyan",
        icons: "yellow",
      },
    },
  },
  cyan: {
    basic: {
      main: "cyan",
      edges: {
        towards: { hue: "magenta", dimInOriginal: false },
        right: { hue: "white", dimInOriginal: false },
      },
      hud: {
        brightHue: "white",
        dimmedHue: "green",
        icons: "yellow",
      },
    },
    dimmed: {
      main: "cyan",
      edges: {
        towards: { hue: "magenta", dimInOriginal: true },
        right: { hue: "white", dimInOriginal: true },
      },
      hud: {
        // maybe wrong
        brightHue: "white",
        dimmedHue: "green",
        icons: "yellow",
      },
    },
  },
  green: {
    basic: {
      main: "green",
      edges: {
        towards: { hue: "cyan", dimInOriginal: false },
        right: { hue: "yellow", dimInOriginal: false },
      },
      hud: {
        brightHue: "white",
        dimmedHue: "magenta",
        icons: "cyan",
      },
    },
    dimmed: {
      main: "green",
      edges: {
        towards: { hue: "cyan", dimInOriginal: true },
        right: { hue: "yellow", dimInOriginal: true },
      },
      hud: {
        // maybe wrong
        brightHue: "white",
        dimmedHue: "magenta",
        icons: "cyan",
      },
    },
  },
};

export const getRoomColorScheme = (
  colour: ZxSpectrumRoomColour,
): RoomColorScheme => colorScheme[colour.hue][colour.shade];

export const playableAccentColours: Record<
  IndividualCharacterName,
  SpritesheetPaletteColourName
> = {
  head: "pastelBlue",
  heels: "pink",
};

export const edgeOriginalGameColour = (
  room: Pick<UnknownRoomState, "color">,
  side: "right" | "towards",
): Color => {
  const edge = getRoomColorScheme(room.color).edges[side];

  return zxSpectrumColor(edge.hue, edge.dimInOriginal ? "dimmed" : "basic");
};
