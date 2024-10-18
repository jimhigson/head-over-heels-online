import { Color } from "pixi.js";
import { ZxSpectrumRoomColours } from "./originalGame";

// not a very accurate representation, granted: https://lospec.com/palette-list/zx-spectrum
export type Shades = { basic: Color, dimmed: Color };
const white = { basic: new Color('rgb(200, 200, 200)'), dimmed: new Color('rgb(120, 120, 120)') };
const yellow = { basic: new Color('rgb(208, 189, 102)'), dimmed: new Color('rgb(119, 118, 79)') };
const magenta = { basic: new Color('rgb(203, 154, 212)'), dimmed: new Color('rgb(156, 119, 164)') };
const cyan = { basic: new Color('rgb(108, 148, 150)'), dimmed: new Color('rgb(75, 105, 107)') };
const green = { basic: new Color('rgb(140, 154, 90)'), dimmed: new Color('rgb(97, 110, 47)') };

export const hintColours = {
    white: { main: white, edges: { towards: green, right: cyan } },
    yellow: { main: yellow, edges: { towards: green, right: white } },
    magenta: { main: magenta, edges: { towards: green, right: cyan } },
    cyan: { main: cyan, edges: { towards: magenta, right: white } },
    green: { main: green, edges: { towards: cyan, right: yellow } },
} as const satisfies Record<ZxSpectrumRoomColours, { main: Shades, edges: { right: Shades, towards: Shades } }>;

