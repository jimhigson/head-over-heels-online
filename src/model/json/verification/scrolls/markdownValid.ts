import { headingsMissingSpace } from "../../../../utils/markdown/headingsMissingSpace";
import { markdownImageTextureClasses } from "../../../../utils/markdown/markdownImageTextureClasses";
import { knownImageTextureClassNames } from "./knownImageTextureClassNames";

/**
 * something in some markdown that the game can't show as it is meant
 */
export type MarkdownProblem =
  | {
      type: "headingMissingSpace";
      /**
       * the whole line, which shows as text with its `#`s
       */
      heading: string;
    }
  | {
      type: "unknownImageTexture";
      /**
       * the image's texture class, which matches no texture
       */
      textureClass: string;
    };

/**
 * every problem in some markdown, in order - none when it is valid
 */
export function* markdownValid(markdown: string): Generator<MarkdownProblem> {
  for (const heading of headingsMissingSpace(markdown)) {
    yield { type: "headingMissingSpace", heading };
  }
  for (const textureClass of markdownImageTextureClasses(markdown)) {
    if (!knownImageTextureClassNames.has(textureClass)) {
      yield { type: "unknownImageTexture", textureClass };
    }
  }
}
