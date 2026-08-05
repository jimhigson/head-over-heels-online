import { type VersionKey } from "../reportData";
import { getVersionDataUri } from "./rowData";

/** the smallest rectangle of the diff extent containing every differing pixel */
export type DiffBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DiffResult = {
  /** magenta-on-transparent png of the differing pixels, as a data uri */
  dataUri: string;
  count: number;
  /** absent when the two versions are byte-identical */
  box: DiffBox | undefined;
  width: number;
  height: number;
};

const loadImage = (dataUri: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUri;
  });

const drawingContextOf = (
  canvas: HTMLCanvasElement,
): CanvasRenderingContext2D => {
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
 * Pixel diff of one version pair of a row: magenta on fully transparent, over
 * the union extent of both images, with any pixel outside the smaller image's
 * bounds counted as differing. The generator precomputes the same count for
 * the base-vs-working pair with the identical algorithm, so the two never
 * disagree.
 */
const computeDiff = async (
  rowIndex: number,
  versionA: VersionKey,
  versionB: VersionKey,
): Promise<DiffResult> => {
  const [imageA, imageB] = await Promise.all([
    loadImage(getVersionDataUri(rowIndex, versionA)),
    loadImage(getVersionDataUri(rowIndex, versionB)),
  ]);
  const widthA = imageA.naturalWidth;
  const heightA = imageA.naturalHeight;
  const widthB = imageB.naturalWidth;
  const heightB = imageB.naturalHeight;
  const unionWidth = Math.max(widthA, widthB);
  const unionHeight = Math.max(heightA, heightB);

  const rgbaA = rgbaOf(imageA);
  const rgbaB = rgbaOf(imageB);

  const diffImageData = new ImageData(unionWidth, unionHeight);
  const diffRgba = diffImageData.data;
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
        const offsetOut = (y * unionWidth + x) * 4;
        diffRgba[offsetOut] = 255;
        diffRgba[offsetOut + 1] = 0;
        diffRgba[offsetOut + 2] = 255;
        diffRgba[offsetOut + 3] = 255;
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

  const diffCanvas = document.createElement("canvas");
  diffCanvas.width = unionWidth;
  diffCanvas.height = unionHeight;
  drawingContextOf(diffCanvas).putImageData(diffImageData, 0, 0);

  return {
    dataUri: diffCanvas.toDataURL(),
    count,
    box:
      maxX >= minX ?
        { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 }
      : undefined,
    width: unionWidth,
    height: unionHeight,
  };
};

const diffCache = new Map<string, Promise<DiffResult>>();

/** memoised `computeDiff`, keyed by row and unordered version pair */
export const getDiffResult = (
  rowIndex: number,
  versionA: VersionKey,
  versionB: VersionKey,
): Promise<DiffResult> => {
  const cacheKey = `${rowIndex}:${[versionA, versionB].sort().join("|")}`;
  const cached = diffCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  const pending = computeDiff(rowIndex, versionA, versionB);
  diffCache.set(cacheKey, pending);
  return pending;
};
