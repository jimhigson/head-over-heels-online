/**
 * Strips the iCCP (ICC profile) chunk from a PNG buffer.
 * This ensures raw RGB values are preserved when the image is decoded,
 * regardless of browser color management behaviour.
 */
export const stripIccProfile = (pngBuffer: ArrayBuffer): ArrayBuffer => {
  const view = new DataView(pngBuffer);
  const chunks: ArrayBuffer[] = [];

  // Copy PNG signature (8 bytes)
  chunks.push(pngBuffer.slice(0, 8));

  let offset = 8;
  while (offset < pngBuffer.byteLength) {
    const length = view.getUint32(offset);
    const type = new TextDecoder().decode(
      new Uint8Array(pngBuffer, offset + 4, 4),
    );
    const chunkSize = 12 + length; // length(4) + type(4) + data(N) + crc(4)

    if (type !== "iCCP") {
      chunks.push(pngBuffer.slice(offset, offset + chunkSize));
    }

    offset += chunkSize;
  }

  // Concatenate all chunks
  const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let pos = 0;
  for (const chunk of chunks) {
    result.set(new Uint8Array(chunk), pos);
    pos += chunk.byteLength;
  }
  return result.buffer;
};
