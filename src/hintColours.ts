import { Color } from "pixi.js";
import type {
  Shade,
  ZxSpectrumRoomColour,
  ZxSpectrumRoomHue,
} from "./originalGame";
import { spritesheetPalette } from "./sprites/samplePalette";

// not a very accurate representation, granted: https://lospec.com/palette-list/zx-spectrum
// use to convert: https://convertacolor.com/
export type Shades = { basic: Color; dimmed: Color; original: Color };
export const whiteShades = {
  original: new Color("rgb(255, 255, 255)"),
  basic: new Color("rgb(210, 210, 210)"),
  dimmed: new Color("rgb(120, 120, 120)"),
};
export const yellowShades = {
  original: new Color("rgb(255, 255, 0)"),
  basic: new Color("hsl(50,58%,70%)"),
  dimmed: spritesheetPalette().redShadow,
  //dimmed: new Color("hsl(30,20%,40%)"), // dark yellow has to bend towards orange or it looks too green
};
export const magentaShades = {
  original: new Color("rgb(255, 0, 255)"),
  basic: spritesheetPalette().pink,
  //basic: new Color("hsl(290,25%,60%)"),
  dimmed: new Color("hsl(290,25%,40%)"),
};
export const cyanShades = {
  original: new Color("rgb(0, 255, 255)"),
  basic: new Color("hsl(183, 28%, 50%)"),
  //dimmed: spritesheetPalette().shadow,
  dimmed: new Color("hsl(183, 28%,39%)"), // trying to be halfway between basic and spritesheet shadow
};
export const greenShades = {
  original: new Color("rgb(0, 255, 0)"),
  basic: spritesheetPalette().moss,
  //basic: new Color("hsl(73,35%,48%)"),
  dimmed: new Color("hsl(73,35%,30%)"),
};

export const shades = {
  white: whiteShades,
  yellow: yellowShades,
  magenta: magentaShades,
  cyan: cyanShades,
  green: greenShades,
};

type ColorScheme = {
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
} as const satisfies Record<ZxSpectrumRoomHue, Record<Shade, ColorScheme>>;

export const getColorScheme = (colour: ZxSpectrumRoomColour) =>
  colorScheme[colour.hue][colour.shade];
