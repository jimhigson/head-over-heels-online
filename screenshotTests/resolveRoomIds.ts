import type { Campaign } from "../src/model/modelTypes";

import { keys, keysIter } from "../src/utils/entries";
import { iterate } from "../src/utils/iterate";

/** Resolves which room IDs to include based on filter parameters. */
export const resolveRoomIds = <RoomId extends string>(
  { rooms }: Campaign<RoomId>,
  roomsSpec: {
    /** Comma-separated list of room IDs or patterns with * wildcard (e.g., "blacktooth*,moonbase*") */
    rooms: string | undefined;
    /** Filter to rooms containing a specific item type (e.g., "conveyor") or type[configProp=value] (e.g., "monster[which=skiHead]") */
    roomsContaining: string | undefined;
  },
): RoomId[] => {
  if (roomsSpec.rooms) {
    const patterns = roomsSpec.rooms.split(",");
    const regexes = patterns.map(
      (pattern) => new RegExp(`^${pattern.replace(/\*/g, ".*")}$`),
    );
    return iterate(keysIter(rooms))
      .filter((roomId) => regexes.some((regex) => regex.test(roomId)))
      .toArray();
  }

  if (roomsSpec.roomsContaining) {
    const filterPattern =
      /^(?<type>[^[]+)(?:\[(?<prop>[^=]+)=(?<value>[^\]]+)\])?$/;
    const filters = roomsSpec.roomsContaining.split(",").map((filter) => {
      const match = filterPattern.exec(filter);
      if (!match?.groups) {
        throw new Error(`Invalid ROOMS_CONTAINING filter syntax: ${filter}`);
      }
      const { type, prop, value } = match.groups;
      return { type, configProp: prop, configValue: value };
    });
    return iterate(keysIter(rooms))
      .filter((roomId) => {
        const room = rooms[roomId];
        return Object.values(room.items).some((item) =>
          filters.some(
            ({ type, configProp, configValue }) =>
              item.type === type &&
              (configProp === undefined ||
                (configProp in item.config &&
                  item.config[configProp as keyof typeof item.config] ===
                    configValue)),
          ),
        );
      })
      .toArray();
  }
  return keys(rooms);
};
