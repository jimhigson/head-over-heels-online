import { keysIter } from "../../utils/entries";
import { type TextureId } from "./spritesheetData/makeSpritesheetData";

type TexturesPredicate<Id extends string = TextureId> = (
  candidate: Id,
) => boolean;
export type TexturesSpecifier<Id extends string = TextureId> =
  Iterable<Id> | TexturesPredicate<Id>;

export const reifyTextureIds = <Id extends string>(
  specifier: TexturesSpecifier<Id>,
  spritesheetDataFrames: Partial<Record<Id, unknown>>,
): Iterable<Id> =>
  typeof specifier === "function" ?
    keysIter(spritesheetDataFrames).filter(specifier)
  : specifier;
