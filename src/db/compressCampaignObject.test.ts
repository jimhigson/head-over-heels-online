import { expect, test } from "vitest";

import { campaign } from "../_generated/originalCampaign/campaign";
import {
  compressCampaignObject,
  decompressCampaignObject,
} from "./compressCampaignObject";

test("campaign is restored after compress + decompress", async () => {
  const restored = await decompressCampaignObject(
    await compressCampaignObject(campaign),
  );
  expect(restored).toEqual(campaign);
});

test("compresses to quite small", async () => {
  // the original campaign is quite a lot of json:
  const compressed = await compressCampaignObject(campaign);
  const decompressedJson = JSON.stringify(campaign);

  const expectedSizeLessThan = 55_000; // 55kb or so

  const compressionRatio = compressed.length / decompressedJson.length;
  expect(compressed.length).toBeLessThan(expectedSizeLessThan);
  // more than 85% compression, even after base64 encoding into a string
  expect(compressionRatio).toBeLessThan(0.15);
});
