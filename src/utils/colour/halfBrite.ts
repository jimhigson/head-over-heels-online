import { Color } from "pixi.js";

export const halfBrite = (c: Color) => {
  const [r, g, b] = c.toUint8RgbArray();
  const hb = new Color({ r: r / 2, g: g / 2, b: b / 2 });
  return hb;
};
