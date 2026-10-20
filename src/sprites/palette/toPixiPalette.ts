import { Color } from "pixi.js";

import {
  type NamedHexColours,
  type NamedPixiColours,
} from "../../utils/palette/palette";
import { transformObject } from "../../utils/transformObject";

/**
 * the pixi `Color`s for a palette of hex codes. Each call makes new `Color`s,
 * so convert a palette once and share the result
 */
export const toPixiPalette = <ColourName extends string>(
  hexPalette: NamedHexColours<ColourName>,
): NamedPixiColours<ColourName> =>
  Object.freeze(
    transformObject(hexPalette, ([name, hex]) => [name, new Color(hex)]),
  );
