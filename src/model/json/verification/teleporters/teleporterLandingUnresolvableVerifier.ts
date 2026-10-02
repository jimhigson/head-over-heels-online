import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { allTeleporters, teleporterLanding } from "../helpers/teleporterTarget";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type TeleporterLandingUnresolvable = {
  roomId: VerificationRoomId;
  teleporterId: VerificationRoomItemId;
  targetRoom: VerificationRoomId;
};

/**
 * a teleporter that names neither a position nor an item to land on, in a
 * destination room without exactly one teleporter to land on instead
 */
export const teleporterLandingUnresolvableVerifier: CampaignVerifier<TeleporterLandingUnresolvable> =
  {
    name: "Teleporter has nowhere to land",
    *check(campaign) {
      for (const { roomId, teleporterId, teleporter } of allTeleporters(
        campaign,
      )) {
        const target = teleporterLanding(
          campaign,
          roomId,
          teleporterId,
          teleporter.config,
        );
        if (
          target === undefined ||
          target.landing.type !== "unresolvable" ||
          // a named item that is missing has its own verifier:
          target.landing.reason === "missingItem"
        ) {
          continue;
        }
        const { targetRoom } = target;
        yield {
          severity: "error",
          roomId,
          itemId: teleporterId,
          msg:
            target.landing.reason === "noTeleporter" ?
              `Teleporter ‘${teleporterId}’ in ‘${roomId}’ leads to ‘${targetRoom}’, which has no teleporter to land on`
            : `Teleporter ‘${teleporterId}’ in ‘${roomId}’ leads to ‘${targetRoom}’, which has several teleporters - set which to land on`,
          fixable: false,
          fixText: `Where to land needs choosing by hand: set a toItemId or toPosition`,
          issueData: { roomId, teleporterId, targetRoom },
          verifier: teleporterLandingUnresolvableVerifier,
        };
      }
    },
    fix: notAutoFixable,
  };
