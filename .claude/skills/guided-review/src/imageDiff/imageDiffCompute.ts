/* Pixel comparison of two versions of an image, in the browser via canvas.
   Counting is exact over the union extent of both images, with any pixel
   outside the smaller image's bounds counted as differing. */

/** the smallest rectangle containing every differing pixel, in image px */
export type DiffBox = { x: number; y: number; width: number; height: number };

export type ImageDiffStats = {
  count: number;
  /** union-extent pixel total, the denominator of the percentage */
  total: number;
  width: number;
  height: number;
  /** absent when the pair is pixel-identical */
  box: DiffBox | undefined;
};

const loadImage = (dataUri: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUri;
  });

export const imageDimensions = async (
  dataUri: string,
): Promise<{ width: number; height: number }> => {
  const image = await loadImage(dataUri);
  return { width: image.naturalWidth, height: image.naturalHeight };
};

const drawingContextOf = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("this browser gave no 2d canvas context");
  }
  return context;
};

const rgbaOf = (image: HTMLImageElement): Uint8ClampedArray => {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = drawingContextOf(canvas);
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, canvas.width, canvas.height).data;
};

/**
 * one pass over the union extent: counts and bounds the differing pixels, and
 * paints them opaque white into `paintInto` when a diff image is wanted too -
 * a stencil the overlay recolours in css, not a fixed-colour image
 */
const comparePixels = (
  imageA: HTMLImageElement,
  imageB: HTMLImageElement,
  paintInto: ImageData | undefined,
): ImageDiffStats => {
  const widthA = imageA.naturalWidth;
  const heightA = imageA.naturalHeight;
  const widthB = imageB.naturalWidth;
  const heightB = imageB.naturalHeight;
  const unionWidth = Math.max(widthA, widthB);
  const unionHeight = Math.max(heightA, heightB);

  const rgbaA = rgbaOf(imageA);
  const rgbaB = rgbaOf(imageB);

  let count = 0;
  let minX = unionWidth;
  let minY = unionHeight;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < unionHeight; y++) {
    for (let x = 0; x < unionWidth; x++) {
      const inA = x < widthA && y < heightA;
      const inB = x < widthB && y < heightB;
      let differs = true;
      if (inA && inB) {
        const offsetA = (y * widthA + x) * 4;
        const offsetB = (y * widthB + x) * 4;
        differs =
          rgbaA[offsetA] !== rgbaB[offsetB] ||
          rgbaA[offsetA + 1] !== rgbaB[offsetB + 1] ||
          rgbaA[offsetA + 2] !== rgbaB[offsetB + 2] ||
          rgbaA[offsetA + 3] !== rgbaB[offsetB + 3];
      }
      if (differs) {
        count += 1;
        if (paintInto !== undefined) {
          const offsetOut = (y * unionWidth + x) * 4;
          paintInto.data[offsetOut] = 255;
          paintInto.data[offsetOut + 1] = 255;
          paintInto.data[offsetOut + 2] = 255;
          paintInto.data[offsetOut + 3] = 255;
        }
        if (x < minX) {
          minX = x;
        }
        if (y < minY) {
          minY = y;
        }
        if (x > maxX) {
          maxX = x;
        }
        if (y > maxY) {
          maxY = y;
        }
      }
    }
  }

  return {
    count,
    total: unionWidth * unionHeight,
    width: unionWidth,
    height: unionHeight,
    box:
      maxX >= minX ?
        { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 }
      : undefined,
  };
};

/** stats only - nothing but numbers retained, so a sweep over every image can
    let each pair's pixel data go as it moves on */
export const computeImageDiffStats = async (
  fromUri: string,
  toUri: string,
): Promise<ImageDiffStats> => {
  const [imageFrom, imageTo] = await Promise.all([loadImage(fromUri), loadImage(toUri)]);
  return comparePixels(imageFrom, imageTo, undefined);
};

export type ImageDiffRender = ImageDiffStats & {
  /** white-on-transparent stencil of the differing pixels, recoloured by
      whatever css masks it in */
  dataUri: string;
};

const renderCache = new Map<string, Promise<ImageDiffRender>>();

/** the white-stencil diff image of a pair, memoised per row and unordered pair */
export const renderImageDiff = (
  /** cache key naming the row and pair, eg `${path}|2|4` with indexes sorted */
  cacheKey: string,
  fromUri: string,
  toUri: string,
): Promise<ImageDiffRender> => {
  const cached = renderCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  const pending = (async (): Promise<ImageDiffRender> => {
    const [imageFrom, imageTo] = await Promise.all([loadImage(fromUri), loadImage(toUri)]);
    const unionWidth = Math.max(imageFrom.naturalWidth, imageTo.naturalWidth);
    const unionHeight = Math.max(imageFrom.naturalHeight, imageTo.naturalHeight);
    const painted = new ImageData(unionWidth, unionHeight);
    const stats = comparePixels(imageFrom, imageTo, painted);
    const canvas = document.createElement("canvas");
    canvas.width = unionWidth;
    canvas.height = unionHeight;
    drawingContextOf(canvas).putImageData(painted, 0, 0);
    return { ...stats, dataUri: canvas.toDataURL() };
  })();
  renderCache.set(cacheKey, pending);
  return pending;
};
