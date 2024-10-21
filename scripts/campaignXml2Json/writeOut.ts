import patch from "../../src/_generated/originalCampaign/patch.json";
import fastJsonPatch, { Operation } from "fast-json-patch";
import { AnyRoom } from "../../src/modelTypes";
import { writeFile } from "node:fs/promises";

const roomTsObjectEntry = (room: AnyRoom): string =>
  `"${room.id}": ${JSON.stringify(room)} satisfies RoomJson<"${room.planet}", OriginalCampaignRoomId>`;

export const writeOut = async (rooms: Record<string, AnyRoom>) => {
  const targetDir = "src/_generated/originalCampaign/";
  const jsonConvertedFilename = `${targetDir}/campaign.converted.json`;
  const tsFilename = `${targetDir}/campaign.ts`;

  const writeConvertedJsonPromise = writeFile(
    jsonConvertedFilename,
    JSON.stringify(rooms),
  );

  const patchedJson = fastJsonPatch.applyPatch(
    rooms,
    patch as Operation[],
  ).newDocument;

  const writeTsPromise = writeFile(
    tsFilename,
    `
    import type {Campaign, RoomJson} from "../../modelTypes.ts";\n
    
    export type OriginalCampaignRoomId = ${Object.keys(rooms)
      .map((rid) => `"${rid}"`)
      .join("|")};\n
        
    export const campaign = { ${Object.values(patchedJson)
      .map(roomTsObjectEntry)
      .join(",\n")} } as const satisfies Campaign<OriginalCampaignRoomId>;\n`,
  );

  await Promise.all([writeTsPromise, writeConvertedJsonPromise]);
};
