import { keysIter } from "../../utils/entries";
import { type TextureId } from "./spritesheetData/makeSpritesheetData";
import { type AppSpritesheetData } from "./variants/AppSpritesheet";

type TexturesPredicate = (candidate: TextureId) => boolean;
export type TexturesSpecifier = Iterable<TextureId> | TexturesPredicate;

export const reifyTextureIds = (
  specifier: TexturesSpecifier,
  spritesheetDataFrames: AppSpritesheetData["frames"],
): Iterable<TextureId> =>
  typeof specifier === "function" ?
    keysIter(spritesheetDataFrames).filter(specifier)
  : specifier;
