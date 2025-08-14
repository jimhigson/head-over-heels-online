import { readFile, writeFile } from "node:fs/promises";
import { canonicalize } from "json-canonicalize";
import { objectValues } from "iter-tools";
import { iterate } from "../utils/iterate";
import { orderBy } from "natural-orderby";
import type { AnyRoomJson } from "../model/RoomJson";
import type { Operation } from "fast-json-patch";
import fastJsonPatch from "fast-json-patch";
import chalk from "chalk";
import type { Campaign } from "../model/modelTypes";

const roomTs = (room: AnyRoomJson): string =>
  `
import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";\n
import {type OriginalCampaignRoomId} from '../OriginalCampaignRoomId.ts';\n
export const room = inferRoomJson(${canonicalize(room)}) satisfies RoomJson<OriginalCampaignRoomId, string, "${room.planet}">;
`;

const targetDir = "src/_generated/originalCampaign/";
const patchFilename = (roomId: string) =>
  `${targetDir}/patches/${roomId}.patch.json`;

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
    ...iterate(objectValues(convertedRoomsAndExtraRooms)).map(async (room) => {
      try {
        if (room.id === undefined) {
          throw new Error("room without an id");
        }

        let roomPatch: Operation[] | undefined;
        try {
          roomPatch = JSON.parse(
            await readFile(patchFilename(room.id), "utf8"),
          );
        } catch (_e) {
          // failed to load - proably no patch exists for this room
          roomPatch = undefined;
        }

        if (!roomPatch) {
          console.log(`❌ No patch for ${room.id}`);
          return writeFile(tsRoomFilename(room.id), roomTs(room));
        }

        console.log("✅ will patch room", chalk.yellow(room.id), "...");

        let roomPatched: AnyRoomJson | undefined = undefined;

        // repeatedly try, and remove/warn about paths that cannot be applied
        while (roomPatched === undefined) {
          try {
            roomPatched = fastJsonPatch.applyPatch(
              room,
              roomPatch,
              true,
            ).newDocument;
          } catch (e) {
            if (e instanceof fastJsonPatch.JsonPatchError) {
              if (e.name === "OPERATION_PATH_UNRESOLVABLE") {
                const failedPath = e.operation.path;
                console.warn(
                  `⚠️⚠️⚠️ Could not apply a path ${failedPath} for a patch at room ${room.id} - will drop this, but please check if this was not expected`,
                  "room ids are",
                  Object.keys(room.items),
                );

                roomPatch = roomPatch?.filter((op) => op.path !== failedPath);
              }
            } else {
              throw new Error(`Error applying patch to room ${room.id}`, {
                cause: e,
              });
            }
          }
        }

        return writeFile(tsRoomFilename(room.id), roomTs(roomPatched));
      } catch (e) {
        console.error(e);
        throw new Error(`Error writing room ${room.id}`, e as Error);
      }
    }),
  ]);
};
