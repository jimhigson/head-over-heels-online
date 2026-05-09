/**
 * Strips the ICCP (ICC profile) chunk from a WebP buffer.
 * This ensures raw RGB values are preserved when the image is decoded,
 * regardless of browser color management behaviour.
 */
export const stripIccProfileWebp = (webpBuffer: ArrayBuffer): ArrayBuffer => {
  const view = new DataView(webpBuffer);
  const chunks: ArrayBuffer[] = [];

  // RIFF header: "RIFF" (4) + fileSize (4) + "WEBP" (4) = 12 bytes
  chunks.push(webpBuffer.slice(0, 12));

  let offset = 12;
  let strippedSize = 0;

  while (offset < webpBuffer.byteLength) {
    const chunkSize = view.getUint32(offset + 4, true); // little-endian
    // RIFF chunks are padded to even size
    const paddedSize = chunkSize + (chunkSize % 2);
    const totalChunkSize = 8 + paddedSize; // FourCC(4) + size(4) + data

    const type = new TextDecoder().decode(
      new Uint8Array(webpBuffer, offset, 4),
    );

    if (type === "ICCP") {
      strippedSize += totalChunkSize;
    } else {
      chunks.push(webpBuffer.slice(offset, offset + totalChunkSize));
    }

    offset += totalChunkSize;
  }

  if (strippedSize === 0) {
    return webpBuffer;
  }

  // Update the RIFF file size (at offset 4) to reflect removed chunks
  const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let pos = 0;
  for (const chunk of chunks) {
    result.set(new Uint8Array(chunk), pos);
    pos += chunk.byteLength;
  }

  // RIFF size field = total file size - 8 (excludes "RIFF" + size field itself)
  const riffView = new DataView(result.buffer);
  riffView.setUint32(4, totalLength - 8, true);

  return result.buffer;
};
