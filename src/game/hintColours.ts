import { Color } from "pixi.js";
import {
  type ZxSpectrumShade,
  type ZxSpectrumRoomColour,
  type ZxSpectrumRoomHue,
  zxSpectrumColors,
} from "../originalGame";
import { spritesheetPalette } from "../../gfx/spritesheetPalette";
import { halfbrite } from "../utils/colour/halfBrite";

export type Shades = { basic: Color; dimmed: Color; original: Color };
export const whiteShades = {
  original: new Color(zxSpectrumColors.zxWhite),
  basic: spritesheetPalette.white,
  dimmed: spritesheetPalette.lightGrey,
};
export const yellowShadesInBasicRooms = {
  original: new Color(zxSpectrumColors.zxYellow),
  basic: new Color(0xeedd66),
  dimmed: halfbrite(new Color(0xeedd66), 0.5),
};
export const yellowShadesInDimmedRooms = {
  original: new Color(zxSpectrumColors.zxYellow),
  basic: spritesheetPalette.midRed,
  dimmed: spritesheetPalette.redShadow,
};
export const magentaShades = {
  original: new Color(zxSpectrumColors.zxMagenta),
  basic: spritesheetPalette.pink,
  dimmed: halfbrite(spritesheetPalette.pink, 0.5),
};
export const cyanShades = {
  original: new Color(zxSpectrumColors.zxCyan),
  basic: spritesheetPalette.pastelBlue,
  //dimmed: spritesheetPalette.shadow,
  dimmed: halfbrite(spritesheetPalette.pastelBlue, 0.5), // trying to be halfway between basic and spritesheet shadow
};
export const greenShades = {
  original: new Color(zxSpectrumColors.zxGreen),
  basic: spritesheetPalette.moss,
  dimmed: halfbrite(spritesheetPalette.moss, 0.5),
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

export const accentColours = {
  head: spritesheetPalette.pastelBlue,
  heels: spritesheetPalette.pink,
};
