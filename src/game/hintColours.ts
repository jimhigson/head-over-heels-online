import { Color } from "pixi.js";

import type { SpritesheetPaletteColourName } from "../../gfx/spritesheetPalette";
import type { IndividualCharacterName } from "../model/modelTypes";

import { spritesheetPalette } from "../../gfx/spritesheetPalette";
import {
  zxSpectrumColors,
  type ZxSpectrumRoomColour,
  type ZxSpectrumRoomHue,
  type ZxSpectrumShade,
} from "../originalGame";
import {
  halfbrite,
  slightlyBrighterReducedBrightness,
} from "../utils/colour/halfBrite";

export type Shades = { basic: Color; dimmed: Color; original: Color };
export const whiteShades = {
  original: new Color(zxSpectrumColors.zxWhite),
  basic: spritesheetPalette.white,
  dimmed: spritesheetPalette.lightGrey,
};
export const yellowShadesInBasicRooms = {
  original: new Color(zxSpectrumColors.zxYellow),
  basic: spritesheetPalette.highlightBeige,
  dimmed: spritesheetPalette.redShadow,
};
export const yellowShadesInDimmedRooms = {
  original: new Color(zxSpectrumColors.zxYellow),
  basic: spritesheetPalette.midRed,
  dimmed: spritesheetPalette.redShadow,
};
export const magentaShades = {
  original: new Color(zxSpectrumColors.zxMagenta),
  basic: spritesheetPalette.pink,
  // by using halfbrite from the original palette, it should be found by a the LUT
  // palette swap filter when it indexes also the halfbrite versions of the input colours
  dimmed: halfbrite(spritesheetPalette.pink),
};
export const cyanShades = {
  original: new Color(zxSpectrumColors.zxCyan),
  basic: spritesheetPalette.pastelBlue,
  // this looks ok for floor edges, but for floors like in #blacktooth23heels heels, it is way too saturated
  //dimmed: spritesheetPalette.metallicBlue,
  dimmed: halfbrite(
    spritesheetPalette.pastelBlue,
    slightlyBrighterReducedBrightness,
  ),
};
export const greenShades = {
  original: new Color(zxSpectrumColors.zxGreen),
  basic: spritesheetPalette.moss,
  dimmed: halfbrite(spritesheetPalette.moss, slightlyBrighterReducedBrightness),
};

export type ColorScheme = {
  main: Shades;
  edges: {
    right: Shades & {
      /**
       * are the edges dimmed in the original? This only impacts when not colourised, since
       * when colourised, we change the colour of the edges but don't change them to be dimmed/not
       */
      dimInOriginal: boolean;
    };
    towards: Shades & {
      /**
       * are the edges dimmed in the original? This only impacts when not colourised, since
       * when colourised, we change the colour of the edges but don't change them to be dimmed/not
       */
      dimInOriginal: boolean;
    };
  };
  hud: {
    lives: Shades;
    dimmed: Shades;
    icons: Shades;
  };
};

export const colorScheme: Record<
  ZxSpectrumRoomHue,
  Record<ZxSpectrumShade, ColorScheme>
> = {
  white: {
    basic: {
      main: whiteShades,
      edges: {
        towards: { ...cyanShades, dimInOriginal: false },
        right: { ...yellowShadesInBasicRooms, dimInOriginal: true },
      },
      hud: {
        lives: yellowShadesInBasicRooms,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
    dimmed: {
      main: whiteShades,
      edges: {
        towards: { ...greenShades, dimInOriginal: false },
        right: { ...cyanShades, dimInOriginal: true },
      },
      hud: {
        // probably wrong
        lives: yellowShadesInDimmedRooms,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
  },
  yellow: {
    basic: {
      main: yellowShadesInBasicRooms,
      edges: {
        towards: { ...greenShades, dimInOriginal: false },
        right: { ...whiteShades, dimInOriginal: true },
      },
      hud: {
        lives: cyanShades,
        dimmed: magentaShades,
        icons: greenShades,
      },
    },
    dimmed: {
      main: yellowShadesInBasicRooms,
      edges: {
        towards: { ...cyanShades, dimInOriginal: true },
        right: { ...cyanShades, dimInOriginal: false },
      },
      hud: {
        // probably wrong
        lives: cyanShades,
        dimmed: magentaShades,
        icons: greenShades,
      },
    },
  },

  magenta: {
    basic: {
      main: magentaShades,
      edges: {
        towards: { ...greenShades, dimInOriginal: true },
        right: { ...cyanShades, dimInOriginal: true },
      },
      hud: {
        lives: whiteShades,
        dimmed: cyanShades,
        icons: yellowShadesInBasicRooms,
      },
    },
    dimmed: {
      main: magentaShades,
      edges: {
        towards: { ...greenShades, dimInOriginal: true },
        right: { ...cyanShades, dimInOriginal: true },
      },
      hud: {
        // maybe wrong
        lives: whiteShades,
        dimmed: cyanShades,
        icons: yellowShadesInBasicRooms,
      },
    },
  },
  cyan: {
    basic: {
      main: cyanShades,
      edges: {
        towards: { ...magentaShades, dimInOriginal: false },
        right: { ...whiteShades, dimInOriginal: false },
      },
      hud: {
        lives: whiteShades,
        dimmed: greenShades,
        icons: yellowShadesInBasicRooms,
      },
    },
    dimmed: {
      main: cyanShades,
      edges: {
        towards: { ...magentaShades, dimInOriginal: true },
        right: { ...whiteShades, dimInOriginal: true },
      },
      hud: {
        // maybe wrong
        lives: whiteShades,
        dimmed: greenShades,
        icons: yellowShadesInBasicRooms,
      },
    },
  },
  green: {
    basic: {
      main: greenShades,
      edges: {
        towards: { ...cyanShades, dimInOriginal: false },
        right: { ...yellowShadesInBasicRooms, dimInOriginal: false },
      },
      hud: {
        lives: whiteShades,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
    dimmed: {
      main: greenShades,
      edges: {
        towards: { ...cyanShades, dimInOriginal: true },
        right: { ...yellowShadesInBasicRooms, dimInOriginal: true },
      },
      hud: {
        // maybe wrong
        lives: whiteShades,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
  },
};

export const getColorScheme = (colour: ZxSpectrumRoomColour): ColorScheme =>
  colorScheme[colour.hue][colour.shade];

export const accentColours: Record<
  IndividualCharacterName,
  SpritesheetPaletteColourName
> = {
  head: "pastelBlue",
  heels: "pink",
};
