import type { AllUnionFields } from "type-fest";

import chalk from "chalk";

import type { JsonItemUnion } from "../../src/model/json/JsonItem";
import type { Campaign } from "../../src/model/modelTypes";

import {
  iterateRoomJsonItemsWithIds,
  type RoomJson,
} from "../../src/model/RoomJson";
import { entries } from "../../src/utils/entries";
import { transformObject } from "../../src/utils/transformObject";
import { xyzEqual } from "../../src/utils/vectors/vectors";

/**
 * Simplify teleporter configs where possible - if the destination room
 * has exactly one teleporter, we can remove toPosition since the game
 * will find it automatically
 */
export const simplifyCampaign = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): Campaign<RoomId> => {
  const { rooms } = campaign;

  const simplifiedRooms = transformObject(rooms, ([roomId, room]) => [
    roomId,
    simplifyRoom(room, rooms),
  ]);

  const simplifiedCount = entries(rooms).reduce(
    (count, [roomId]) =>
      count + (rooms[roomId] !== simplifiedRooms[roomId] ? 1 : 0),
    0,
  );

  console.log(
    chalk.green("✂"),
    `simplified ${chalk.yellow(simplifiedCount)} rooms`,
  );

  return {
    ...campaign,
    rooms: simplifiedRooms,
  } as Campaign<RoomId>;
};

const simplifyRoom = <RoomId extends string>(
  room: RoomJson<RoomId, string>,
  allRooms: Record<RoomId, RoomJson<RoomId, string>>,
): RoomJson<RoomId, string> => {
  type RoomItemId = string;

  let changed = false;
  const simplifiedItems = transformObject<
    RoomItemId,
    JsonItemUnion<RoomId>,
    RoomItemId,
    JsonItemUnion<RoomId>
  >(room.items, ([itemId, item]) => {
    const simplified = simplifyItem(item, room, allRooms);
    if (simplified !== item) {
      changed = true;
    }
    return [itemId, simplified] as const;
  });

  if (!changed) {
    return room;
  }

  return {
    ...room,
    items: simplifiedItems,
  };
};

const simplifyItem = <RoomId extends string>(
  item: JsonItemUnion<RoomId, string>,
  room: RoomJson<RoomId, string>,
  allRooms: Record<RoomId, RoomJson<RoomId, string>>,
): JsonItemUnion<RoomId, string> => {
  switch (item.type) {
    case "teleporter": {
      const config = item.config as AllUnionFields<typeof item.config>;
      const { toRoom, toPosition } = config;

      if (toPosition === undefined) {
        return item;
      }

      const destinationRoom = allRooms[toRoom as RoomId];
      if (destinationRoom === undefined) {
        return item;
      }

      const teleportersInDestination = iterateRoomJsonItemsWithIds(
        destinationRoom.items,
        "teleporter",
      ).toArray();

      if (teleportersInDestination.length === 1) {
        const [[, onlyTeleporter]] = teleportersInDestination;

        if (!xyzEqual(onlyTeleporter.position, toPosition)) {
          // toPosition doesn't match the only teleporter — it points somewhere
          // else, so we can't simplify
          return item;
        }

        console.log(
          chalk.green("✂"),
          "simplified teleporter",
          chalk.yellow(`${room.id}/${String(item.type)}`),
          "— removed toPosition (destination",
          chalk.cyan(String(toRoom)),
          "has exactly one teleporter)",
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { toPosition: _removed, ...simplifiedConfig } = config;

        return {
          ...item,
          config: simplifiedConfig,
        } as JsonItemUnion<RoomId, string>;
      }

      // find the item at toPosition in the destination room
      const matchingItem = iterateRoomJsonItemsWithIds(
        destinationRoom.items,
      ).find(([, destItem]) => xyzEqual(destItem.position, toPosition));

      if (matchingItem === undefined) {
        console.warn(
          `teleporter ${room.id}/${String(item.type)} points to position with no item in destination room`,
        );
        return item;
      }

      const [matchingId] = matchingItem;

      console.log(
        chalk.green("✂"),
        "simplified teleporter",
        chalk.yellow(`${room.id}/${String(item.type)}`),
        "— replaced toPosition with toItemId",
        chalk.cyan(String(matchingId)),
        "(destination",
        chalk.cyan(String(toRoom)) + ")",
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { toPosition: _removed, ...restConfig } = config;

      return {
        ...item,
        config: { ...restConfig, toItemId: matchingId },
      } as JsonItemUnion<RoomId, string>;
    }
    default:
      return item;
  }
};
