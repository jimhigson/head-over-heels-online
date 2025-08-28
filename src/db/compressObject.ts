import { fromUint8Array, toUint8Array } from "js-base64";

const urlSafeBase64 = true;

/** browsers don't yet have brotli native */
export const compressionFormat: CompressionFormat = "gzip";

export const compressObject = async (obj: object): Promise<string> => {
  const jsonStr = JSON.stringify(obj);
  const encoder = new TextEncoder();
  const jsonStrAsBinary = encoder.encode(jsonStr);

  // Create blob and stream it through compression
  const blob = new Blob([jsonStrAsBinary]);
  const cs = new CompressionStream(compressionFormat);
  const compressStream = blob.stream().pipeThrough(cs);

  // Read the compressed result
  const compressed = await new Response(compressStream).arrayBuffer();
  const bytes = new Uint8Array(compressed);

  return fromUint8Array(bytes, urlSafeBase64);
};

export const decompressObject = async <ExpectedType extends object>(
  base64: string,
): Promise<ExpectedType> => {
  try {
    const compressedBinary = toUint8Array(base64);

    // Create blob and stream it through decompression
    // Wrap in new Uint8Array to ensure proper ArrayBuffer type for TypeScript 5.9+
    const blob = new Blob([new Uint8Array(compressedBinary)]);
    const ds = new DecompressionStream(compressionFormat);
    const decompressStream = blob.stream().pipeThrough(ds);

    const decompressed = await new Response(decompressStream).text();
    return JSON.parse(decompressed) as ExpectedType;
  } catch (e) {
    throw new Error("error decompressing object", { cause: e });
  }
};
