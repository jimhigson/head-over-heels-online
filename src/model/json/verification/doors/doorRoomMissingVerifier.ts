import { produce } from "immer";

import { firstUntakenRoomId } from "../../../firstUntakenRoomId";
import { addReturnDoorInPlace } from "../../../inPlaceMutators/addReturnDoorInPlace";
import { createNewRoom } from "../../../inPlaceMutators/createNewRoom";
import { findSubRoomForItem } from "../../../map/itemIsInSubRoom";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJsonItemIterators";
import { exitGameRoomId, nowhereRoomId } from "../../ItemConfigMap";
import type { CampaignVerifier } from "../CampaignVerification";
import { allDoors } from "../helpers/doorPartner";
import { itemIdMd, valueMd } from "../helpers/messageMarkdown";
import type {
  VerificationCampaign,
  VerificationJsonItem,
  VerificationRoomId,
  VerificationRoomItemId,
  VerificationRoomJson,
} from "../verificationTypes";

type DoorRoomMissing = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
};

const newRoomSize = { x: 8, y: 8 };

/**
 * the room another door on the same wall of the same (sub-)room already leads
 * to, if any - a door beside it leads there too
 */
const roomBeyondSameWall = (
  campaign: VerificationCampaign,
  fromRoom: VerificationRoomJson,
  doorId: VerificationRoomItemId,
  door: VerificationJsonItem<"door">,
): undefined | VerificationRoomId => {
  const subRoomId = findSubRoomForItem(door.position, "block", fromRoom);
  return iterateRoomJsonItemsWithIds(fromRoom.items, "door").find(
    ([otherDoorId, otherDoor]) =>
      otherDoorId !== doorId &&
      otherDoor.config.direction === door.config.direction &&
      otherDoor.config.toRoom in campaign.rooms &&
      findSubRoomForItem(otherDoor.position, "block", fromRoom) === subRoomId,
  )?.[1].config.toRoom;
};

/**
 * A1: a door whose `toRoom` isn't `$$final` and isn't a room in the campaign.
 * Fixed by creating that room, holding a door back
 */
export const doorRoomMissingVerifier: CampaignVerifier<DoorRoomMissing> = {
  name: "Door to missing room",
  *check(campaign) {
    for (const { roomId, doorId, door } of allDoors(campaign)) {
      const { toRoom } = door.config;
      if (toRoom === exitGameRoomId || toRoom in campaign.rooms) {
        continue;
      }
      yield {
        severity: "error",
        roomId,
        itemIds: [doorId],
        msg: `Door ‘${itemIdMd(doorId)}’ in ‘${valueMd(roomId)}’ leads to ‘${valueMd(toRoom)}’, which isn't a room in this campaign`,
        fixable: true,
        fixText:
          toRoom === nowhereRoomId ?
            `Create a new room beyond door ‘${doorId}’ in ‘${roomId}’`
          : `Create new room "${toRoom}" beyond door ‘${doorId}’ in ‘${roomId}’`,
        issueData: { roomId, doorId, toRoom },
        verifier: doorRoomMissingVerifier,
      };
    }
  },
  fix(campaign, { roomId, doorId, toRoom }) {
    return produce(campaign, (draft) => {
      const fromRoom = draft.rooms[roomId];
      const door = fromRoom.items[doorId];
      if (door.type !== "door") {
        throw new Error(
          `cannot auto-fix: ‘${doorId}’ in ‘${roomId}’ is not a door`,
        );
      }
      const beyondSameWall = roomBeyondSameWall(draft, fromRoom, doorId, door);
      const newRoomId =
        toRoom === nowhereRoomId ?
          (beyondSameWall ?? firstUntakenRoomId(draft.rooms))
          // a named room an earlier fix made beyond some other wall can't
          // also be beyond this one:
        : toRoom in draft.rooms && toRoom !== beyondSameWall ?
          firstUntakenRoomId(draft.rooms)
        : toRoom;
      // unless it is the room already beyond this wall:
      if (!(newRoomId in draft.rooms)) {
        draft.rooms[newRoomId] = createNewRoom<
          VerificationRoomId,
          VerificationRoomItemId
        >(newRoomSize, fromRoom.color, fromRoom.planet, [{ x: 0, y: 0 }]);
      }
      door.config.toRoom = newRoomId;
      delete door.config.toDoor;
      delete door.config.meta;
      addReturnDoorInPlace({
        rooms: draft.rooms,
        fromRoomId: roomId,
        fromRoomJson: fromRoom,
        toRoomId: newRoomId,
        toRoomJson: draft.rooms[newRoomId],
        outgoingDoorEntry: [doorId, door],
      });
    });
  },
};
