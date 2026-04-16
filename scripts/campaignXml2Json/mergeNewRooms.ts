import chalk from "chalk";
import { readdir, readFile } from "node:fs/promises";

import type { Campaign } from "../../src/model/modelTypes";
import type { AnyRoomJson } from "../../src/model/RoomJson";

const newRoomsDir = "src/_generated/originalCampaign/new-rooms";

/**
 * Merge hand-written new rooms (not from the original XML) into the campaign.
 * Reads .json files from the new-rooms directory and adds them to the campaign.
 */
export const mergeNewRooms = async (
  campaign: Campaign<string>,
): Promise<Campaign<string>> => {
  let filenames: string[];
  try {
    filenames = (await readdir(newRoomsDir)).filter((f) => f.endsWith(".json"));
  } catch {
    return campaign;
  }

  if (filenames.length === 0) {
    return campaign;
  }

  const newRooms: Record<string, AnyRoomJson> = {};

  for (const filename of filenames) {
    const room: AnyRoomJson = JSON.parse(
      await readFile(`${newRoomsDir}/${filename}`, "utf8"),
    );

    if (room.id === undefined) {
      throw new Error(`New room in ${filename} has no id`);
    }

    if (campaign.rooms[room.id] !== undefined) {
      throw new Error(
        `New room ${room.id} from ${filename} conflicts with an existing room`,
      );
    }

    console.log("🆕 Adding new room", chalk.green(room.id));
    newRooms[room.id] = room;
  }

  return {
    ...campaign,
    rooms: {
      ...campaign.rooms,
      ...newRooms,
    },
  };
};
