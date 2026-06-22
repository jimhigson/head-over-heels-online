import { exitGameRoomId } from "../ItemConfigMap";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import { allDoors, candidatePartners } from "./helpers/doorPartner";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

type DoorAmbiguousLink = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
  count: number;
};

/**
 * A5: a door with no `toDoor` whose destination has more than one matching door
 * back - the engine's `findDestinationPortal` picks one arbitrarily
 */
export const doorAmbiguousLinkVerifier: CampaignVerifier<DoorAmbiguousLink> = {
  name: "Ambiguous door link",
  *check(campaign) {
    for (const { roomId, doorId, door } of allDoors(campaign)) {
      const { toRoom, toDoor, direction } = door.config;
      if (
        toDoor !== undefined ||
        toRoom === exitGameRoomId ||
        !(toRoom in campaign.rooms)
      ) {
        continue;
      }
      const count = candidatePartners(
        campaign,
        roomId,
        toRoom,
        direction,
      ).length;
      if (count <= 1) {
        continue;
      }
      yield {
        severity: "error",
        roomId,
        itemId: doorId,
        msg: `Door ‘${doorId}’ in ‘${roomId}’ has ${count} matching doors back from ‘${toRoom}’ and no toDoor — the game picks one arbitrarily`,
        fixable: false,
        fixText: `Give door ‘${doorId}’ a toDoor naming its partner in ‘${toRoom}’`,
        issueData: { roomId, doorId, toRoom, count },
        verifier: doorAmbiguousLinkVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
