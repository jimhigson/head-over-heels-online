import { oppositeDirection } from "../../../utils/vectors/vectors";
import { exitGameRoomId } from "../ItemConfigMap";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import {
  allDoors,
  candidatePartners,
  doorsBackTo,
} from "./helpers/doorPartner";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

type DoorDirectionMismatch = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
};

/**
 * A4: a door whose destination has a door back, but none facing the opposite
 * direction - so `findDestinationPortal` can't match it. Detection only: which
 * of the two doors is geometrically wrong can't be determined safely (flipping
 * either makes them match, but only one is correct for its wall), so this is
 * fixed by hand.
 */
export const doorDirectionMismatchVerifier: CampaignVerifier<DoorDirectionMismatch> =
  {
    name: "Door direction mismatch",
    *check(campaign) {
      for (const { roomId, doorId, door } of allDoors(campaign)) {
        const { toRoom, direction } = door.config;
        if (toRoom === exitGameRoomId || !(toRoom in campaign.rooms)) {
          continue;
        }
        // 0 back is A3's job; a correctly-facing partner means no mismatch
        if (
          doorsBackTo(campaign, roomId, toRoom).length === 0 ||
          candidatePartners(campaign, roomId, toRoom, direction).length > 0
        ) {
          continue;
        }
        yield {
          severity: "error",
          roomId,
          itemId: doorId,
          msg: `Door ‘${doorId}’ in ‘${roomId}’ links to ‘${toRoom}’, whose return door faces the wrong way (it should face ‘${oppositeDirection(direction)}’)`,
          fixable: false,
          fixText: `Turn the door in ‘${toRoom}’ that leads back to ‘${roomId}’ to face ‘${oppositeDirection(direction)}’`,
          issueData: { roomId, doorId, toRoom },
          verifier: doorDirectionMismatchVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
