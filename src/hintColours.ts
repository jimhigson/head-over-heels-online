import { Color } from "pixi.js";
import { ZxSpectrumRoomColour } from "./originalGame";

// not a very accurate representation, granted: https://lospec.com/palette-list/zx-spectrum
// use to convert: https://convertacolor.com/
export type Shades = { basic: Color; dimmed: Color };
const white = {
  basic: new Color("rgb(210, 210, 210)"),
  dimmed: new Color("rgb(120, 120, 120)"),
};
const yellow = {
  basic: new Color("hsl(50,58%,70%)"),
  dimmed: new Color("hsl(30,20%,40%)"), // dark yellow has to bend towards orange or it looks too green
};
const magenta = {
  basic: new Color("hsl(290,25%,60%)"),
  dimmed: new Color("hsl(290,25%,40%)"),
};
const cyan = {
  basic: new Color("hsl(183, 28%, 50%)"),
  dimmed: new Color("hsl(183, 28%,30%)"),
};
const green = {
  basic: new Color("hsl(73,35%,48%)"),
  dimmed: new Color("hsl(73,35%,30%)"),
};

export const hintColours = {
  white: { main: white, edges: { towards: cyan, right: yellow } },
  // white dimmed should be green/cyan
  yellow: { main: yellow, edges: { towards: green, right: white } },
  // yellow dimmed should be cyan/cyan
  magenta: { main: magenta, edges: { towards: green, right: cyan } },
  // magenta dimmed is the same
  cyan: { main: cyan, edges: { towards: magenta, right: white } },
  // cyan dimmed is the same
  green: { main: green, edges: { towards: cyan, right: yellow } },
  // green dimmed is the same
} as const satisfies Record<
  ZxSpectrumRoomColour,
  { main: Shades; edges: { right: Shades; towards: Shades } }
>;