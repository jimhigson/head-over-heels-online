import { keysIter } from "../../utils/entries";
import { type AppSpritesheetData } from "./loadedSpriteSheet";
import { type TextureId } from "./spritesheetData/makeSpritesheetData";

type TexturesPredicate = (candidate: TextureId) => boolean;
export type TexturesSpecifier = Iterable<TextureId> | TexturesPredicate;

export const reifyTextureIds = (
  specifier: TexturesSpecifier,
  spritesheetDataFrames: AppSpritesheetData["frames"],
): Iterable<TextureId> =>
  typeof specifier === "function" ?
    keysIter(spritesheetDataFrames).filter(specifier)
  : specifier;
