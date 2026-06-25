import { produce } from "immer";

import { entries } from "../../../../utils/entries";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJson";
import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier } from "../CampaignVerification";
import {
  candidatePartners,
  type DoorRef,
  inferredPartner,
} from "../helpers/doorPartner";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type DanglingDoorTarget = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
  toDoor: string;
};

/**
 * finds doors whose `toDoor` names a door id that does not exist in the
 * destination room - the bug behind room_50 ↔ room_43 in sequel_23, where
 * `findDestinationPortal` can't match the partner portal and the transition
 * throws "no destination portal found to locate with"
 */
export const danglingDoorTargetVerifier: CampaignVerifier<DanglingDoorTarget> =
  {
    name: "Dangling door target",
    *check(campaign) {
      for (const [roomId, room] of entries(campaign.rooms)) {
        for (const [doorId, door] of iterateRoomJsonItemsWithIds(
          room.items,
          "door",
        )) {
          const { toRoom, toDoor } = door.config;

          if (
            toDoor === undefined ||
            toRoom === exitGameRoomId ||
            !(toRoom in campaign.rooms)
          ) {
            continue;
          }

          const ref: DoorRef = {
            roomId,
            doorId: doorId as VerificationRoomItemId,
            door,
          };
          // every door coming back from the destination room in the matching
          // direction - the only doors the link could validly resolve to
          const candidates = candidatePartners(
            campaign,
            roomId,
            toRoom,
            door.config.direction,
          );

          // the toDoor is fine only when it names one of those partners. Naming
          // a missing door, or an existing door that faces the wrong way / leads
          // elsewhere (sequel_23's room_6/door_2 -> timers), both break the
          // transition at gameplay time, so flag either.
          if (candidates.some((candidate) => candidate.doorId === toDoor)) {
            continue;
          }

          const returnDoors = candidates.length;
          // the partner the broken link was most likely meant for, when it can
          // be inferred: the only door back (just drop the toDoor), the door
          // that links back to this one, or the only one not already paired up
          const partner = inferredPartner(campaign, ref);
          // distinguish a missing door from one that exists but doesn't lead back
          const toDoorExists = toDoor in campaign.rooms[toRoom].items;

          yield {
            severity: "error",
            roomId,
            itemId: doorId as VerificationRoomItemId,
            msg:
              toDoorExists ?
                `Door ‘${doorId}’ in ‘${roomId}’ links to door ‘${toDoor}’ in ‘${toRoom}’, which doesn't lead back to ‘${roomId}’`
              : `Door ‘${doorId}’ in ‘${roomId}’ links to door ‘${toDoor}’ in ‘${toRoom}’, which does not exist`,
            fixable: partner !== undefined,
            fixText:
              partner === undefined ?
                `‘${toRoom}’ has ${returnDoors} doors back to ‘${roomId}’ in this direction, so this can't be removed automatically and must be fixed by hand`
              : returnDoors === 1 ?
                `Remove the broken link from door ‘${doorId}’ in ‘${roomId}’`
              : `Link door ‘${doorId}’ in ‘${roomId}’ to door ‘${partner.doorId}’ in ‘${toRoom}’`,
            issueData: {
              roomId,
              doorId: doorId as VerificationRoomItemId,
              toRoom,
              toDoor,
            },
            verifier: danglingDoorTargetVerifier,
          };
        }
      }
    },

    fix(campaign, { roomId, doorId, toRoom }) {
      const door = campaign.rooms[roomId].items[doorId];
      if (door.type !== "door") {
        throw new Error(`‘${doorId}’ in ‘${roomId}’ is not a door`);
      }
      const partner = inferredPartner(campaign, { roomId, doorId, door });
      if (partner === undefined) {
        // mirrors the `fixable === false` case on the issue: the link can only
        // be repaired when its intended partner can be inferred unambiguously
        throw new Error(
          `cannot auto-fix the broken link from door ‘${doorId}’ in ‘${roomId}’: the partner door is ambiguous`,
        );
      }
      const onlyDoorBack =
        candidatePartners(campaign, roomId, toRoom, door.config.direction)
          .length === 1;

      return produce(campaign, (draft) => {
        const draftDoor = draft.rooms[roomId].items[doorId];
        if (draftDoor.type === "door") {
          if (onlyDoorBack) {
            // the unclaimed partner is the only door back, so the link resolves
            // to it by direction alone once the broken toDoor is gone
            delete draftDoor.config.toDoor;
          } else {
            // several doors come back but only this partner is unmatched, so
            // name it explicitly
            draftDoor.config.toDoor = partner.doorId;
          }
        }
      });
    },
  };
