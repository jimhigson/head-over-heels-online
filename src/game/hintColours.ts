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
export const yellowShades = {
  original: new Color(zxSpectrumColors.zxYellow),
  basic: spritesheetPalette.midRed,
  dimmed: spritesheetPalette.redShadow,
};
export const magentaShades = {
  original: new Color(zxSpectrumColors.zxMagenta),
  basic: spritesheetPalette.pink,
  dimmed: halfbrite(spritesheetPalette.pink),
};
export const cyanShades = {
  original: new Color(zxSpectrumColors.zxCyan),
  basic: spritesheetPalette.pastelBlue,
  //dimmed: spritesheetPalette.shadow,
  dimmed: halfbrite(spritesheetPalette.pastelBlue), // trying to be halfway between basic and spritesheet shadow
};
export const greenShades = {
  original: new Color(zxSpectrumColors.zxGreen),
  basic: spritesheetPalette.moss,
  dimmed: halfbrite(spritesheetPalette.moss),
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
        right: { ...yellowShades, dimInOriginal: true },
      },
      hud: {
        lives: yellowShades,
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
        lives: yellowShades,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
  },
  yellow: {
    basic: {
      main: yellowShades,
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
      main: yellowShades,
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
      hud: { lives: whiteShades, dimmed: cyanShades, icons: yellowShades },
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
        icons: yellowShades,
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
        icons: yellowShades,
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
        icons: yellowShades,
      },
    },
  },
  green: {
    basic: {
      main: greenShades,
      edges: {
        towards: { ...cyanShades, dimInOriginal: false },
        right: { ...yellowShades, dimInOriginal: false },
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
        right: { ...yellowShades, dimInOriginal: true },
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
