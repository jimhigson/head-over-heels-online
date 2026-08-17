/* which paths the review compares as images rather than as text. Pure - safe
   to import from build.ts under node as well as from the page. */

const imageMimes = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
} as const;

type ImageExtension = keyof typeof imageMimes;

const extensionOf = (path: string): string => (path.split(".").pop() ?? "").toLowerCase();

const isImageExtension = (extension: string): extension is ImageExtension =>
  extension in imageMimes;

export const isImagePath = (path: string): boolean => isImageExtension(extensionOf(path));

export const imageMimeOf = (path: string): string => {
  const extension = extensionOf(path);
  if (!isImageExtension(extension)) {
    throw new Error(`${path} is not an image path`);
  }
  return imageMimes[extension];
};
