import fastJsonPatch from "fast-json-patch";
import { readFile, writeFile } from "node:fs/promises";
import { campaign } from "../_generated/originalCampaign/campaign";
import type { OriginalCampaignRoomId } from "../_generated/originalCampaign/OriginalCampaignRoomId";
import { entries } from "../utils/entries";

const targetDir = "src/_generated/originalCampaign/patches";
const patchFilename = (roomId: OriginalCampaignRoomId) =>
  `${targetDir}/${roomId}.patch.json`;

const convertedJson = JSON.parse(
  await readFile(
    "src/_generated/originalCampaign/campaign.converted.json",
    "utf8",
  ),
);

for (const [roomId, room] of entries(campaign.rooms)) {
  console.log("making patch for", roomId);

  const convertedRoom = convertedJson.rooms[roomId];

  if (!convertedRoom) {
    console.warn(`Room ${roomId} not found in converted json`);
    continue;
  }

  const patch = fastJsonPatch.compare(convertedRoom, room);

  console.log(patch.length, "operations");

  await writeFile(patchFilename(roomId), JSON.stringify(patch));
}
