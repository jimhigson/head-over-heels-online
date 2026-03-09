import type { Operation } from "fast-json-patch";

import chalk from "chalk";
import fastJsonPatch from "fast-json-patch";
import { objectValues } from "iter-tools-es";
import { readFile } from "node:fs/promises";

import type { Campaign } from "../model/modelTypes";
import type { AnyRoomJson } from "../model/RoomJson";

import { iterate } from "../utils/iterate";

const targetDir = "src/_generated/originalCampaign/";
const patchFilename = (roomId: string) =>
  `${targetDir}/patches/${roomId}.patch.json`;

/**
 * Apply JSON patches to each room in the campaign. Patches are stored as
 * individual .patch.json files per room and represent manual edits made on
 * top of the XML-converted rooms.
 */
export const applyCampaignPatches = async (
  campaign: Campaign<string>,
): Promise<Campaign<string>> => {
  const patchedRooms = Object.fromEntries(
    await Promise.all(
      iterate(objectValues(campaign.rooms)).map(async (room) => {
        if (room.id === undefined) {
          throw new Error("room without an id");
        }

        let roomPatch: Operation[] | undefined;
        try {
          roomPatch = JSON.parse(
            await readFile(patchFilename(room.id), "utf8"),
          );
        } catch (_e) {
          // failed to load - probably no patch exists for this room
          roomPatch = undefined;
        }

        if (!roomPatch) {
          console.log(`❌ No patch for ${room.id}`);
          return [room.id, room] as const;
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

        return [room.id, roomPatched] as const;
      }),
    ),
  );

  return {
    ...campaign,
    rooms: patchedRooms,
  };
};
