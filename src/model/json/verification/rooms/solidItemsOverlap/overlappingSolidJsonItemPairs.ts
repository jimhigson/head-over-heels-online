import { loadRoom } from "../../../../../game/gameState/loadRoom/loadRoom";
import { noPlanetsLiberated } from "../../../../../store/slices/gameInPlay/gameInPlaySlice";
import { emptyUserSettings } from "../../../../../store/slices/userSettings/emptyUserSettings";
import { emptyObject } from "../../../../../utils/empty";
import { blockSizePx } from "../../../../blockSizePx";
import { defaultRoomHeightBlocks } from "../../../../defaultRoomHeightBlocks";
import { itemBehaviourKey } from "../../../../ItemInPlay";
import { roomItemsIterable } from "../../../../roomItemsInPlayIterators";
import { roomSpatialIndexKey } from "../../../../RoomState";
import type {
  VerificationRoomId,
  VerificationRoomItemId,
  VerificationRoomJson,
} from "../../verificationTypes";
import { overlapsAsSolid } from "./overlapsAsSolid";

/**
 * the pairs of json items in a room whose loaded items overlap while solid to
 * each other, each pair once
 */
export const overlappingSolidJsonItemPairs = (
  roomId: VerificationRoomId,
  room: VerificationRoomJson,
): [VerificationRoomItemId, VerificationRoomItemId][] => {
  // loading builds a spatial index of the room's items, used here and then
  // dropped with the loaded room:
  const roomState = loadRoom({
    roomId,
    roomJson: room,
    roomPickupsCollected: emptyObject,
    scrollsRead: emptyObject,
    planetsLiberated: noPlanetsLiberated,
    // with the players in their starting rooms:
    isNewGame: true,
    userSettings: emptyUserSettings,
  });
  const spatialIndex = roomState[roomSpatialIndexKey];
  const roomTopZ = blockSizePx.z * (room.height ?? defaultRoomHeightBlocks);

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
      { subject: item, roomTopZ },
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
