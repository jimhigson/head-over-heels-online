import {
  columnarDecode,
  type ColumnarEncoded,
  isColumnarEncoded,
} from "../columnar/decoder";
import { compressObject, decompressObject } from "./compressObject";

/**
 * Serialise a campaign-shaped object (anything with a `rooms` map) to a
 * url-safe-base64 gzip string for the db or a playtest `data:` url. The rooms
 * are columnar-encoded first as an internal implementation detail;
 * {@link decompressCampaignObject} reverses it. The encoder is lazy-imported so
 * it splits into its own chunk and stays out of the game bundle (the game only
 * ever decodes).
 */
export const compressCampaignObject = async (
  campaign: object,
): Promise<string> => {
  const { columnarEncode } = await import("../columnar/encoder");
  return compressObject(columnarEncode(campaign));
};

/**
 * Inverse of {@link compressCampaignObject}. Campaigns stored before columnar
 * encoding are plain json with no `_enc` marker, and are returned as-is.
 */
export const decompressCampaignObject = async <T extends object>(
  base64: string,
): Promise<T> => {
  const stored = await decompressObject<ColumnarEncoded | T>(base64);
  return (isColumnarEncoded(stored) ? columnarDecode(stored) : stored) as T;
};
