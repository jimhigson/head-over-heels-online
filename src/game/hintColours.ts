import { Color } from "pixi.js";
import type {
  ZxSpectrumShade,
  ZxSpectrumRoomColour,
  ZxSpectrumRoomHue,
} from "../originalGame";
import { spritesheetPalette } from "../../gfx/spritesheetPalette";

// not a very accurate representation, granted: https://lospec.com/palette-list/zx-spectrum
// use to convert: https://convertacolor.com/
export type Shades = {
  basic: Color;
  dimmed: Color;
  shadow: Color;
  original: Color;
};
export const whiteShades = {
  original: new Color("rgb(255, 255, 255)"),
  basic: new Color("rgb(210, 210, 210)"),
  dimmed: new Color("rgb(120, 120, 120)"),
  shadow: new Color("rgb(65, 65, 65)"),
};
export const yellowShades = {
  original: new Color("rgb(255, 255, 0)"),
  basic: new Color("hsl(50,65%,70%)"),
  dimmed: spritesheetPalette.redShadow,
  shadow: new Color("hsl(30,20%,25%)"), // dark yellow has to bend towards orange or it looks too green
};
export const magentaShades = {
  original: new Color("rgb(255, 0, 255)"),
  basic: spritesheetPalette.pink,
  //basic: new Color("hsl(290,50%, 50%)"),
  dimmed: new Color("hsl(290,35%,38%)"),
  shadow: new Color("hsl(290,15%,28%)"),
};
export const cyanShades = {
  original: new Color("rgb(0, 255, 255)"),
  basic: new Color("hsl(183, 50%, 50%)"),
  //dimmed: spritesheetPalette.shadow,
  dimmed: new Color("hsl(183, 50%, 25%)"), // trying to be halfway between basic and spritesheet shadow
  shadow: spritesheetPalette.shadow,
};
export const greenShades = {
  original: new Color("rgb(0, 255, 0)"),
  basic: spritesheetPalette.moss,
  dimmed: new Color("hsl(73,50%,25%)"),
  shadow: new Color("hsl(73,60%,19%)"),
};

export type ColorScheme = {
  main: Shades;
  edges: {
    right: Shades;
    towards: Shades;
  };
  hud: {
    lives: Shades;
    dimmed: Shades;
    icons: Shades;
  };
};

export const colorScheme = {
  white: {
    basic: {
      main: whiteShades,
      edges: { towards: cyanShades, right: yellowShades },
      hud: {
        lives: yellowShades,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
    dimmed: {
      main: whiteShades,
      edges: { towards: greenShades, right: cyanShades },
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
      edges: { towards: greenShades, right: whiteShades },
      hud: {
        lives: cyanShades,
        dimmed: magentaShades,
        icons: greenShades,
      },
    },
    dimmed: {
      main: yellowShades,
      edges: { towards: cyanShades, right: cyanShades },
      hud: {
        // probably wrong
        lives: cyanShades,
        dimmed: magentaShades,
        icons: greenShades,
      },
    },
  },
  // yellow dimmed edges should be cyan/cyan
  // yellow dimmed hud is white/magenta/green
  magenta: {
    basic: {
      main: magentaShades,
      edges: { towards: greenShades, right: cyanShades },
      hud: { lives: whiteShades, dimmed: cyanShades, icons: yellowShades },
    },
    dimmed: {
      main: magentaShades,
      edges: { towards: greenShades, right: cyanShades },
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
      edges: { towards: magentaShades, right: whiteShades },
      hud: {
        lives: whiteShades,
        dimmed: greenShades,
        icons: yellowShades,
      },
    },
    dimmed: {
      main: cyanShades,
      edges: { towards: magentaShades, right: whiteShades },
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
      edges: { towards: cyanShades, right: yellowShades },
      hud: {
        lives: whiteShades,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
    dimmed: {
      main: greenShades,
      edges: { towards: cyanShades, right: yellowShades },
      hud: {
        // maybe wrong
        lives: whiteShades,
        dimmed: magentaShades,
        icons: cyanShades,
      },
    },
  },
  // green dimmed edges is the same
} as const satisfies Record<
  ZxSpectrumRoomHue,
  Record<ZxSpectrumShade, ColorScheme>
>;

export const getColorScheme = (colour: ZxSpectrumRoomColour): ColorScheme =>
  colorScheme[colour.hue][colour.shade];
