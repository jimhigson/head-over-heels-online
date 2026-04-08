import { canonicalize } from "json-canonicalize";
import { orderBy } from "natural-orderby";
import { writeFile } from "node:fs/promises";

import type { Campaign } from "../../src/model/modelTypes";
import type { AnyRoomJson } from "../../src/model/RoomJson";

import { valuesIter } from "../../src/utils/entries";

const roomTs = (room: AnyRoomJson): string =>
  `
import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";\n
import {type OriginalCampaignRoomId} from '../OriginalCampaignRoomId.ts';\n
export const room = inferRoomJson(${canonicalize(room)}) satisfies RoomJson<OriginalCampaignRoomId, string, "${room.planet}">;
`;

export const writeOut = async ({
  rooms: convertedRooms,
  locator,
}: Campaign<string>) => {
  const targetDir = "src/_generated/originalCampaign/";
  const tsBarrellFilename = `${targetDir}/campaign.ts`;
  const tsRoomFilename = (roomId: string) => `${targetDir}/rooms/${roomId}.ts`;
  const tsRoomIdsFilename = `${targetDir}/OriginalCampaignRoomId.ts`;

  const convertedRoomsAndExtraRooms = {
    ...convertedRooms,
  };

  const roomIdsSorted = orderBy(Object.keys(convertedRoomsAndExtraRooms));

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
    import type {Campaign} from "../../model/modelTypes.ts";\n
    import {type OriginalCampaignRoomId} from './OriginalCampaignRoomId.ts';\n

    ${roomIdsSorted
      .map(
        (roomId) => `import {room as ${roomId}} from "./rooms/${roomId}.ts";`,
      )
      .join("\n")};\n

    export const campaign = {
      "locator": ${canonicalize(locator)},
      "rooms": {
        ${roomIdsSorted.join(",\n")}
       },
    } as const satisfies Campaign<OriginalCampaignRoomId> as Campaign<OriginalCampaignRoomId>;`,
  );

  await Promise.all([
    writeTsBarrell,
    writeOriginalCampaignRoomIdType,
    ...valuesIter(convertedRoomsAndExtraRooms).map(async (room) => {
      try {
        if (room.id === undefined) {
          throw new Error("room without an id");
        }

        return writeFile(tsRoomFilename(room.id), roomTs(room));
      } catch (e) {
        console.error(e);
        throw new Error(`Error writing room ${room.id}`, e as Error);
      }
    }),
  ]);
};
