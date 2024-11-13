import { Color } from "pixi.js";
import type { ZxSpectrumRoomColour } from "./originalGame";
import { spritesheetPalette } from "./sprites/samplePalette";

// not a very accurate representation, granted: https://lospec.com/palette-list/zx-spectrum
// use to convert: https://convertacolor.com/
export type Shades = { basic: Color; dimmed: Color };
export const whiteShades = {
  basic: new Color("rgb(210, 210, 210)"),
  dimmed: new Color("rgb(120, 120, 120)"),
};
export const yellowShades = {
  basic: new Color("hsl(50,58%,70%)"),
  dimmed: spritesheetPalette().redShadow,
  //dimmed: new Color("hsl(30,20%,40%)"), // dark yellow has to bend towards orange or it looks too green
};
export const magentaShades = {
  basic: spritesheetPalette().pink,
  //basic: new Color("hsl(290,25%,60%)"),
  dimmed: new Color("hsl(290,25%,40%)"),
};
export const cyanShades = {
  basic: new Color("hsl(183, 28%, 50%)"),
  dimmed: spritesheetPalette().shadow,
  //dimmed: new Color("hsl(183, 28%,30%)"),
};
export const greenShades = {
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
    main: whiteShades,
    edges: { towards: cyanShades, right: yellowShades },
    hud: {
      lives: yellowShades,
      dimmed: magentaShades,
      icons: cyanShades,
    },
  },
  // white dimmed edges should be green/cyan
  yellow: {
    main: yellowShades,
    edges: { towards: greenShades, right: whiteShades },
    hud: {
      lives: cyanShades,
      dimmed: magentaShades,
      icons: greenShades,
    },
  },
  // yellow dimmed edges should be cyan/cyan
  // yellow dimmed hud is white/magenta/green
  magenta: {
    main: magentaShades,
    edges: { towards: greenShades, right: cyanShades },
    hud: { lives: whiteShades, dimmed: cyanShades, icons: yellowShades },
  },
  // magenta dimmed edges is the same
  cyan: {
    main: cyanShades,
    edges: { towards: magentaShades, right: whiteShades },
    hud: {
      lives: whiteShades,
      dimmed: greenShades,
      icons: yellowShades,
    },
  },
  // cyan dimmed edges is the same
  green: {
    main: greenShades,
    edges: { towards: cyanShades, right: yellowShades },
    hud: {
      lives: whiteShades,
      dimmed: magentaShades,
      icons: cyanShades,
    },
  },
  // green dimmed edges is the same
} as const satisfies Record<ZxSpectrumRoomColour, ColorScheme>;
