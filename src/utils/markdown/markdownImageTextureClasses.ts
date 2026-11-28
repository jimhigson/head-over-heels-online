import {
  matchAllOutsideCode,
  replaceAllOutsideCode,
} from "./matchAllOutsideCode";

/**
 * a markdown image. The game's markdown gives an image's classes as its src,
 * separated by `?` and `&`, with its texture first
 */
const markdownImageRegex = /!\[[^\]]*?\]\([^)]+?\)/;

const srcClassSeparatorRegex = /[?&]/;

/**
 * an image split around the start of its src - its alt can't hold a `]`, so
 * the first `](` starts the src
 */
const imageParts = (image: string): { opening: string; src: string } => {
  const srcStart = image.indexOf("](") + "](".length;
  return { opening: image.slice(0, srcStart), src: image.slice(srcStart, -1) };
};

const textureClassOfSrc = (src: string): string => {
  const [textureClass] = src.split(srcClassSeparatorRegex);
  return textureClass.trim();
};

/**
 * the texture class of every image in some markdown, in order
 */
export const markdownImageTextureClasses = (
  markdown: string,
): IteratorObject<string> =>
  matchAllOutsideCode(markdown, markdownImageRegex).map((image) =>
    textureClassOfSrc(imageParts(image).src),
  );

/**
 * the markdown with every image of one texture class changed to another,
 * keeping the images' other classes
 */
export const replaceMarkdownImageTextureClass = (
  markdown: string,
  fromTextureClass: string,
  toTextureClass: string,
): string =>
  replaceAllOutsideCode(markdown, markdownImageRegex, (image) => {
    const { opening, src } = imageParts(image);
    if (textureClassOfSrc(src) !== fromTextureClass) {
      return image;
    }
    const [srcTextureClass] = src.split(srcClassSeparatorRegex);
    return `${opening}${toTextureClass}${src.slice(srcTextureClass.length)})`;
  });
