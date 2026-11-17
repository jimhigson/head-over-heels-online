import { collision2Items } from "../../../../game/collision/aabbCollision";
import { loadRoom } from "../../../../game/gameState/loadRoom/loadRoom";
import { noPlanetsLiberated } from "../../../../store/slices/gameInPlay/gameInPlaySlice";
import { emptyUserSettings } from "../../../../store/slices/userSettings/emptyUserSettings";
import { emptyObject } from "../../../../utils/empty";
import { entries } from "../../../../utils/entries";
import { itemBehaviourKey } from "../../../ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../../ItemInPlayNarrowedUnions";
import { roomItemsIterable } from "../../../roomItemsInPlayIterators";
import { roomSpatialIndexKey } from "../../../RoomState";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { itemIdMd, valueMd } from "../helpers/messageMarkdown";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
  type VerificationRoomJson,
} from "../verificationTypes";

type SolidItemsOverlap = {
  roomId: VerificationRoomId;
  itemIds: [VerificationRoomItemId, VerificationRoomItemId];
};

type LoadedItem = UnionOfAllItemInPlayTypes<string, string>;

/**
 * whether two items, as loaded, are solid to each other and overlap - not
 * merely touching, and not parts of the same json item
 */
const areOverlappingSolids = (a: LoadedItem, b: LoadedItem): boolean =>
  a.jsonItemId !== undefined &&
  b.jsonItemId !== undefined &&
  a.jsonItemId !== b.jsonItemId &&
  !a[itemBehaviourKey].isNonSolid(a, b) &&
  !b[itemBehaviourKey].isNonSolid(b, a) &&
  collision2Items(a, b);

/**
 * as a spatial index predicate: whether a candidate in the box overlaps the
 * querying item, solid to each other
 */
const overlapsAsSolid = (
  candidate: LoadedItem,
  _box: unknown,
  subject: LoadedItem,
): boolean => areOverlappingSolids(subject, candidate);

/**
 * the pairs of json items in a room whose loaded items overlap while solid to
 * each other, each pair once
 */
const overlappingSolidJsonItemPairs = (
  room: VerificationRoomJson,
): [VerificationRoomItemId, VerificationRoomItemId][] => {
  // loading builds a spatial index of the room's items, used here and then
  // dropped with the loaded room:
  const roomState = loadRoom({
    roomJson: room,
    roomPickupsCollected: emptyObject,
    scrollsRead: emptyObject,
    planetsLiberated: noPlanetsLiberated,
    // with the players in their starting rooms:
    isNewGame: true,
    userSettings: emptyUserSettings,
  });
  const spatialIndex = roomState[roomSpatialIndexKey];

  const pairKeys = new Set<string>();
  const pairs: [VerificationRoomItemId, VerificationRoomItemId][] = [];
  for (const item of roomItemsIterable(roomState.items)) {
    const { jsonItemId } = item;
    if (
      jsonItemId === undefined ||
      item[itemBehaviourKey].isPositionless(item)
    ) {
      continue;
    }
    for (const { jsonItemId: otherJsonItemId } of spatialIndex.filterInBox(
      item.state.box,
      overlapsAsSolid,
      item,
      item,
    )) {
      if (otherJsonItemId === undefined) {
        continue;
      }
      const pair: [VerificationRoomItemId, VerificationRoomItemId] =
        jsonItemId < otherJsonItemId ?
          [jsonItemId, otherJsonItemId]
        : [otherJsonItemId, jsonItemId];
      const pairKey = pair.join("\n");
      if (!pairKeys.has(pairKey)) {
        pairKeys.add(pairKey);
        pairs.push(pair);
      }
    }
  }
  return pairs;
};

/**
 * each room's overlapping pairs, kept for as long as that version of the room
 * is - an unchanged room is the same object from one verification to the
 * next, so is only loaded and checked again once it changes
 */
const overlappingPairsOfRoom = new WeakMap<
  VerificationRoomJson,
  [VerificationRoomItemId, VerificationRoomItemId][]
>();

/**
 * a type name with its indefinite article, in markdown - eg "a *block*",
 * "an *emitter*"
 */
const withArticle = (itemType: string): string =>
  `${/^[aeiou]/.test(itemType) ? "an" : "a"} ${valueMd(itemType)}`;

/**
 * what a pair of items are, in the order given - "two *wall* items" when they
 * are the same type, otherwise eg "a *block* and a *monster* item"
 */
const itemTypesDescription = (
  room: VerificationRoomJson,
  [itemId, otherItemId]: [VerificationRoomItemId, VerificationRoomItemId],
): string => {
  const itemType = room.items[itemId].type;
  const otherItemType = room.items[otherItemId].type;
  return itemType === otherItemType ?
      `two ${valueMd(itemType)} items`
    : `${withArticle(itemType)} and ${withArticle(otherItemType)} item`;
};

/**
 * two items in a room that are solid to each other, and overlap
 */
export const solidItemsOverlapVerifier: CampaignVerifier<SolidItemsOverlap> = {
  name: "Solid items overlap",
  *check(campaign) {
    for (const [roomId, room] of entries(campaign.rooms)) {
      const pairs = overlappingPairsOfRoom.getOrInsertComputed(
        room,
        overlappingSolidJsonItemPairs,
      );
      for (const itemIds of pairs) {
        const [itemId, otherItemId] = itemIds;
        yield {
          severity: "error",
          roomId,
          itemIds,
          msg: `${itemTypesDescription(room, itemIds)} in ‘${valueMd(roomId)}’: ‘${itemIdMd(itemId)}’ and ‘${itemIdMd(otherItemId)}’ overlap`,
          fixable: false,
          fixText: `Move ‘${itemId}’ or ‘${otherItemId}’ in ‘${roomId}’ so they don’t overlap`,
          issueData: { roomId, itemIds },
          verifier: solidItemsOverlapVerifier,
        };
      }
    }
  },
  fix() {
    return notAutoFixable();
  },
};
