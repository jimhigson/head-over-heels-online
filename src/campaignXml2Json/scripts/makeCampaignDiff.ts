import fastJsonPatch from "fast-json-patch";
import { writeFile } from "node:fs/promises";
import { campaign } from "../../_generated/originalCampaign/campaign";
import type { OriginalCampaignRoomId } from "../../_generated/originalCampaign/OriginalCampaignRoomId";
import { entries } from "../../utils/entries";
import { convertCampaign } from "../convertCampaign";
import { badJsonCanonicalClone } from "../../utils/badJsonClone";
import { canonicalize } from "json-canonicalize";

const targetDir = "src/_generated/originalCampaign/patches";
const patchFilename = (roomId: OriginalCampaignRoomId) =>
  `${targetDir}/${roomId}.patch.json`;

const go = async () => {
  // first, get the converted json so we have a basis to compare against:
  // doing a jsonClone removes undefined values, and makes it like we've just loaded a json
  // file from disc:
  const convertedJson = badJsonCanonicalClone(await convertCampaign());

  for (const [roomId, room] of entries(campaign.rooms)) {
    console.log("making patch for", roomId);

    const convertedRoom = convertedJson.rooms[roomId];

    if (!convertedRoom) {
      console.warn(`Room ${roomId} not found in converted json`);
      continue;
    }

    const patch = fastJsonPatch.compare(convertedRoom, room);

    console.log(patch.length, "operations");

    await writeFile(patchFilename(roomId), canonicalize(patch));
  }
};

go();
