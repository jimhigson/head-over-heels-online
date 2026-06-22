import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import {
  allDoors,
  type DoorRef,
  resolveDoorPartner,
} from "./helpers/doorPartner";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

type DoorTwoWayLink = {
  roomId: VerificationRoomId;
  doorId: VerificationRoomItemId;
  partnerRoomId: VerificationRoomId;
  partnerDoorId: VerificationRoomItemId;
};

/**
 * when `ref` resolves unambiguously to a partner that itself resolves
 * unambiguously, but back to a *different* door, returns that partner (the pair
 * is crossed). Otherwise undefined.
 */
const crossedPartner = (
  campaign: VerificationCampaign,
  ref: DoorRef,
): DoorRef | undefined => {
  const forward = resolveDoorPartner(campaign, ref);
  if (forward.kind !== "unambiguous") {
    return undefined;
  }
  const backward = resolveDoorPartner(campaign, forward.partner);
  if (backward.kind !== "unambiguous") {
    return undefined;
  }
  const mutual =
    backward.partner.roomId === ref.roomId &&
    backward.partner.doorId === ref.doorId;
  return mutual ? undefined : forward.partner;
};

const key = (ref: { roomId: string; doorId: string }): string =>
  `${ref.roomId}/${ref.doorId}`;

/**
 * A3b: two-way doors that each resolve unambiguously to a partner, but not to
 * each other. Detection only - which `toDoor`s to rewrite is ambiguous (and can
 * cycle), so it's fixed by hand.
 */
export const doorTwoWayLinkVerifier: CampaignVerifier<DoorTwoWayLink> = {
  name: "Two-way doors not linked to each other",
  *check(campaign) {
    for (const ref of allDoors(campaign)) {
      const partner = crossedPartner(campaign, ref);
      if (partner === undefined) {
        continue;
      }
      // emit once per pair, from the lexicographically-smaller end
      if (key(ref) > key(partner)) {
        continue;
      }
      yield {
        severity: "error",
        roomId: ref.roomId,
        itemId: ref.doorId,
        msg: `Doors ‘${ref.doorId}’ in ‘${ref.roomId}’ and ‘${partner.doorId}’ in ‘${partner.roomId}’ link to partners, but not to each other`,
        fixable: false,
        fixText: `Make doors ‘${ref.doorId}’ and ‘${partner.doorId}’ name each other (or remove the crossed toDoor)`,
        issueData: {
          roomId: ref.roomId,
          doorId: ref.doorId,
          partnerRoomId: partner.roomId,
          partnerDoorId: partner.doorId,
        },
        verifier: doorTwoWayLinkVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
