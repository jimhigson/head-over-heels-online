import type { AppSpritesheetData } from "./loadedSpriteSheet";
import type { TextureId } from "./spritesheetData/makeSpritesheetData";

import { keysIter } from "../../utils/entries";
import { iterate } from "../../utils/iterate";

export type TexturesPredicate = (candidate: TextureId) => boolean;
export type TexturesSpecifier = Iterable<TextureId> | TexturesPredicate;

export const reifyTextureIds = (
  specifier: TexturesSpecifier,
  spritesheetDataFrames: AppSpritesheetData["frames"],
): Iterable<TextureId> =>
  typeof specifier === "function" ?
    iterate(keysIter(spritesheetDataFrames)).filter(specifier)
  : specifier;
