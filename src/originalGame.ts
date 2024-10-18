import { Color } from "pixi.js";

/** there are more colours than this, but hoh doesn't use them all as room colours */
export type ZxSpectrumColor = `${'yellow' | 'green' | 'cyan' | 'magenta' | 'white'}${'' | '.reduced'}`;
export const zxSpectrumFrameRate = 50; // actually 50.08 or 50.02 :-)
export const zxSpectrumResolution = { width: 256, height: 192 };

// https://lospec.com/palette-list/zx-spectrum
export const zxSpectrumPalette: Record<ZxSpectrumColor, Color> = {
    cyan: new Color('rgb(33, 110, 110)'),
    "cyan.reduced": new Color('rgb(33, 110, 110)'),
    green: new Color('rgb(33, 110, 110)'),
    "green.reduced": new Color('rgb(33, 110, 67)'),
    magenta: new Color('rgb(141, 77, 131)'),
    "magenta.reduced": new Color('rgb(141, 77, 131)'),
    white: new Color('rgb(173, 173, 173)'),
    "white.reduced": new Color('rgb(173, 173, 173)'),
    yellow: new Color('rgb(178, 179, 55)'),
    "yellow.reduced": new Color('rgb(178, 179, 55)'),
};
