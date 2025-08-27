import nanoEqual from "nano-equal";
import { expect, test } from "vitest";

import { campaign } from "../_generated/originalCampaign/campaign";
import { compressObject, decompressObject } from "./compressObject";

test("compress/decompress object restored", async () => {
  const originalObject = {
    name: "Test Object",
    value: 42,
    nested: {
      array: [1, 2, 3],
      boolean: true,
    },
  };

  const decompressed = await decompressObject<typeof originalObject>(
    await compressObject(originalObject),
  );

  // Check that the decompressed object matches the original
  if (
    !nanoEqual(JSON.stringify(decompressed), JSON.stringify(originalObject))
  ) {
    throw new Error("Decompressed object does not match the original");
  }
});

test("compresses to quite small", async () => {
  // the original campaign is quite a lot of json:
  const compressed = await compressObject(campaign);
  const decompressedJson = JSON.stringify(campaign);

  const expectedSizeLessThan = 55_000; // 55kb or so

  const compressionRatio = compressed.length / decompressedJson.length;
  expect(compressed.length).toBeLessThan(expectedSizeLessThan);
  // more than 90% compression, even after base64 encoding into a string
  expect(compressionRatio).toBeLessThan(0.1);
});
