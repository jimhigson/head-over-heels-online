import fastJsonPatch from "fast-json-patch";
import { readFile } from "node:fs/promises";
import { campaign } from "../../src/_generated/originalCampaign/campaign";

const convertedJson = JSON.parse(
  await readFile(
    "src/_generated/originalCampaign/campaign.converted.json",
    "utf8",
  ),
);

const patch = fastJsonPatch.compare(convertedJson, campaign);

console.log(JSON.stringify(patch));
