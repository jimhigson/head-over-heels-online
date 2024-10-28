import patch from "../../src/_generated/originalCampaign/patch.json";
import fastJsonPatch, { Operation } from "fast-json-patch";
import { AnyRoomJson } from "../../src/modelTypes";
import { writeFile } from "node:fs/promises";
import { canonicalize } from "json-canonicalize";

const roomTsObjectEntry = (room: AnyRoomJson): string =>
  `"${room.id}": ${canonicalize(room)} satisfies RoomJson<"${room.planet}", OriginalCampaignRoomId>`;

export const writeOut = async (rooms: Record<string, AnyRoomJson>) => {
  const targetDir = "src/_generated/originalCampaign/";
  const jsonConvertedFilename = `${targetDir}/campaign.converted.json`;
  const tsFilename = `${targetDir}/campaign.ts`;

  const writeConvertedJsonPromise = writeFile(
    jsonConvertedFilename,
    JSON.stringify({ rooms }),
  );

  const patchedJson = fastJsonPatch.applyPatch(
    { rooms },
    patch as Operation[],
  ).newDocument;

  const writeTsPromise = writeFile(
    tsFilename,
    `
    /* eslint-disable */
    import type {Campaign, RoomJson} from "../../modelTypes.ts";\n
    
    export type OriginalCampaignRoomId = ${Object.keys(rooms)
      .map((rid) => `"${rid}"`)
      .join("|")};\n
        
    export const campaign = { 
      "rooms": { 
        ${Object.values(patchedJson.rooms).map(roomTsObjectEntry).join(",\n")}
       }
    } as const satisfies Campaign<OriginalCampaignRoomId> as Campaign<OriginalCampaignRoomId>;`,
  );

  await Promise.all([writeTsPromise, writeConvertedJsonPromise]);
};
