import {
  animatedTextureClassName,
  textureClassName,
} from "../../../../sprites/css/textureClassName";
import { makeBaseSpritesheetData } from "../../../../sprites/spritesheet/spritesheetData/makeBaseSpritesheetData";
import {
  spritesheetArtName,
  spritesheetMetas,
  type SpritesheetName,
  spritesheetNameValues,
} from "../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { keysIter } from "../../../../utils/entries";

/**
 * every texture class one spritesheet's art can draw: each texture, and each
 * animation played either way
 */
const textureClassNamesOfSpritesheetArt = (
  spritesheetArtName: SpritesheetName,
): Set<string> => {
  const { frames, animations } = makeBaseSpritesheetData(
    spritesheetMetas[spritesheetArtName],
  );
  return new Set(keysIter(frames).map(textureClassName)).union(
    new Set(
      keysIter(animations).flatMap((animationId) => [
        animatedTextureClassName(animationId, false),
        animatedTextureClassName(animationId, true),
      ]),
    ),
  );
};

/**
 * every texture class an image in markdown can draw with, whichever
 * spritesheet the player chooses
 */
export const knownImageTextureClassNames: ReadonlySet<string> = new Set(
  spritesheetNameValues.map((spritesheetName) =>
    spritesheetArtName(spritesheetMetas[spritesheetName]),
  ),
)
  .values()
  .map(textureClassNamesOfSpritesheetArt)
  .reduce((knownClassNames, spritesheetClassNames) =>
    knownClassNames.intersection(spritesheetClassNames),
  );
