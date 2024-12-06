import patch from "../../src/_generated/originalCampaign/patch.json";
import type { Operation } from "fast-json-patch";
import fastJsonPatch from "fast-json-patch";
import { writeFile } from "node:fs/promises";
import { canonicalize } from "json-canonicalize";
import { objectValues } from "iter-tools";
import type { AnyRoomJson } from "../../src/model/modelTypes";
import { iterate } from "../../src/utils/iterate";
import { orderBy } from "natural-orderby";

const roomTs = (room: AnyRoomJson): string =>
  `
import type {RoomJson} from "../../../model/modelTypes.ts";\n
import {type OriginalCampaignRoomId} from '../OriginalCampaignRoomId.ts';\n
export const room = ${canonicalize(room)} satisfies RoomJson<"${room.planet}", OriginalCampaignRoomId>;
`;

export const writeOut = async (rooms: Record<string, AnyRoomJson>) => {
  const targetDir = "src/_generated/originalCampaign/";
  const jsonConvertedFilename = `${targetDir}/campaign.converted.json`;
  const tsBarrellFilename = `${targetDir}/campaign.ts`;
  const tsRoomFilename = (roomId: string) => `${targetDir}/rooms/${roomId}.ts`;
  const tsRoomIdsFilename = `${targetDir}/OriginalCampaignRoomId.ts`;
  const roomIdsSorted = orderBy(Object.keys(rooms));

  const writeConvertedJsonPromise = writeFile(
    jsonConvertedFilename,
    JSON.stringify({ rooms }),
  );

  let patchedJson;
  try {
    patchedJson = fastJsonPatch.applyPatch(
      { rooms },
      patch as Operation[],
    ).newDocument;
  } catch (e) {
    console.error("Error applying patch", "to", { rooms }, e);
    process.exit(1);
  }

  const writeOriginalCampaignRoomIdType = writeFile(
    tsRoomIdsFilename,
    `
        export type OriginalCampaignRoomId = ${roomIdsSorted
          .map((roomId) => `"${roomId}"`)
          .join("|\n")};\n
    `,
  );

  const writeTsBarrell = writeFile(
    tsBarrellFilename,
    `
    /* eslint-disable */
    import type {Campaign, RoomJson} from "../../model/modelTypes.ts";\n
    import {type OriginalCampaignRoomId} from './OriginalCampaignRoomId.ts';\n

    ${roomIdsSorted
      .map(
        (roomId) => `import {room as ${roomId}} from "./rooms/${roomId}.ts";`,
      )
      .join("\n")};\n
        
    export const campaign = { 
      "rooms": { 
        ${roomIdsSorted.join(",\n")}
       }
    } as const satisfies Campaign<OriginalCampaignRoomId> as Campaign<OriginalCampaignRoomId>;`,
  );

  await Promise.all([
    writeTsBarrell,
    writeOriginalCampaignRoomIdType,
    writeConvertedJsonPromise,
    ...iterate(objectValues(patchedJson.rooms)).map(async (room) => {
      return writeFile(tsRoomFilename(room.id), roomTs(room));
    }),
  ]);
};
