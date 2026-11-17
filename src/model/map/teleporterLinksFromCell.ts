import { type AllUnionFields } from "type-fest";

import { emptyArray } from "../../utils/empty";
import { exitGameRoomId } from "../json/ItemConfigMap";
import { type JsonItem } from "../json/JsonItem";
import { resolveTeleporterLanding } from "../json/resolveTeleporterLanding";
import { type Campaign } from "../modelTypes";
import { type RoomJson } from "../RoomJson";
import {
  iterateRoomJsonItemIds,
  iterateRoomJsonItemsWithIds,
} from "../RoomJsonItemIterators";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { type TeleporterLink } from "./teleporterLinks";

/** the teleporter config with all the union branches' fields flattened to optional */
type FlatTeleporterConfig<RoomId extends string> = AllUnionFields<
  JsonItem<"teleporter", RoomId>["config"]
>;

/** where a teleporter lands: the destination (sub-)room and item, when known */
type TeleporterTargetEndpoint = { subRoomId: string; itemId?: string };

/**
 * which sub-room (and which item) of the target room does this teleporter
 * land on? Undefined when it has nowhere to land
 */
const findTargetEndpoint = <RoomId extends string>(
  config: FlatTeleporterConfig<RoomId>,
  targetRoom: RoomJson<RoomId, string>,
  /** the teleporter being used, when it lands in its own room */
  sourceItemIdInTarget: string | undefined,
): TeleporterTargetEndpoint | undefined => {
  const landing = resolveTeleporterLanding(
    config,
    iterateRoomJsonItemIds(
      targetRoom.items,
      "teleporter",
      "portableTeleporter",
    ),
    (itemId): itemId is string => itemId in targetRoom.items,
    sourceItemIdInTarget,
  );
  switch (landing.type) {
    case "item":
      return {
        subRoomId: findSubRoomForItem(
          targetRoom.items[landing.itemId].position,
          "block",
          targetRoom,
        ),
        itemId: landing.itemId,
      };
    case "unresolvable":
      return undefined;
    default:
      landing satisfies never;
  }
};

/**
 * the teleporter links leaving one cell: one for each teleporter in it that
 * lands somewhere in the campaign
 */
export const teleporterLinksFromCell = <RoomId extends string>(
  campaign: Pick<Campaign<RoomId>, "rooms">,
  roomId: RoomId,
  subRoomId: string,
): TeleporterLink<RoomId>[] => {
  const room = campaign.rooms[roomId];
  const teleporterLinks: TeleporterLink<RoomId>[] = [];
  for (const [teleporterId, teleporter] of iterateRoomJsonItemsWithIds(
    room.items,
    "teleporter",
    "portableTeleporter",
  )) {
    if (findSubRoomForItem(teleporter.position, "block", room) !== subRoomId) {
      continue;
    }
    const config = teleporter.config as FlatTeleporterConfig<RoomId>;
    const targetRoomId = config.toRoom ?? roomId;
    if (targetRoomId === exitGameRoomId) {
      continue;
    }
    const targetRoom = campaign.rooms[targetRoomId];
    if (targetRoom === undefined) {
      continue;
    }
    const target = findTargetEndpoint(
      config,
      targetRoom,
      targetRoomId === roomId ? teleporterId : undefined,
    );
    if (target === undefined) {
      continue;
    }
    teleporterLinks.push({
      from: { roomId, subRoomId, itemId: teleporterId },
      to: {
        roomId: targetRoomId,
        subRoomId: target.subRoomId,
        itemId: target.itemId,
      },
    });
  }
  // a shared empty result, so callers comparing by identity see no change:
  return teleporterLinks.length === 0 ? emptyArray : teleporterLinks;
};
