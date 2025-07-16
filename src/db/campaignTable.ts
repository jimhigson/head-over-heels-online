import type { Campaign } from "../model/modelTypes";
import { supabaseDb } from "./supabaseDb";
import { fromByteArray, toByteArray } from "base64-js";

// browsers don't yet have brotli
const compressionFormat: CompressionFormat = "gzip";

const compressObject = async (obj: object): Promise<string> => {
  const json = JSON.stringify(obj);
  const encoder = new TextEncoder();
  const data = encoder.encode(json);

  // Create blob and stream it through compression
  const blob = new Blob([data]);
  const cs = new CompressionStream(compressionFormat);
  const compressedStream = blob.stream().pipeThrough(cs);

  // Read the compressed result
  const compressed = await new Response(compressedStream).arrayBuffer();
  const bytes = new Uint8Array(compressed);

  return fromByteArray(bytes);
};

const decompressObject = async (base64: string): Promise<object> => {
  try {
    const bytes = toByteArray(base64);

    // Create blob and stream it through decompression
    const blob = new Blob([bytes]);
    const ds = new DecompressionStream(compressionFormat);
    const decompressedStream = blob.stream().pipeThrough(ds);

    const decompressed = await new Response(decompressedStream).text();
    return JSON.parse(decompressed);
  } catch (e) {
    throw new Error("error decompressing object", { cause: e });
  }
};

export const saveCampaignToDb = async (
  name: string,
  campaign: Campaign<string>,
) => {
  const res = await supabaseDb
    .from("campaigns")
    .upsert([{ name, data: await compressObject(campaign) }])
    .select();

  if (res.error) {
    throw new Error(`error saving to db ${res.error.details}`, {
      cause: res.error,
    });
  }

  return res.data;
};

export const loadCampaignFromDb = async (name: string) => {
  const res = await supabaseDb
    .from("campaigns")
    .select("data")
    .eq("name", name);

  if (res.error) {
    throw res.error;
  }
  const [row] = res.data;
  return (await decompressObject(row.data!)) as Campaign<string>;
};
