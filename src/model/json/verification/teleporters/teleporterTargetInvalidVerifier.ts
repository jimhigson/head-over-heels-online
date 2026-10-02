import { produce } from "immer";

import { type CampaignVerifier } from "../CampaignVerification";
import {
  allTeleporters,
  type TeleporterConfig,
  teleporterLanding,
  teleporterToItemId,
} from "../helpers/teleporterTarget";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type TeleporterTargetInvalid = {
  roomId: VerificationRoomId;
  teleporterId: VerificationRoomItemId;
  targetRoom: VerificationRoomId;
  toItemId: string;
};

/** whether the teleporter would still land somewhere without its toItemId */
const landsWithoutToItemId = (
  campaign: VerificationCampaign,
  roomId: VerificationRoomId,
  teleporterId: VerificationRoomItemId,
  config: TeleporterConfig,
): boolean => {
  // only the destination, so it lands by default:
  const destinationOnly = { toRoom: config.toRoom };
  return (
    teleporterLanding(campaign, roomId, teleporterId, destinationOnly)?.landing
      .type === "item"
  );
};

/**
 * a teleporter whose `toItemId` names an item that doesn't exist in the
 * destination room. Auto-fixable (drop the toItemId) only when the destination
 * has a single teleporter to fall back to.
 */
export const teleporterTargetInvalidVerifier: CampaignVerifier<TeleporterTargetInvalid> =
  {
    name: "Teleporter target item missing",
    *check(campaign) {
      for (const { roomId, teleporterId, teleporter } of allTeleporters(
        campaign,
      )) {
        const toItemId = teleporterToItemId(teleporter.config);
        const target = teleporterLanding(
          campaign,
          roomId,
          teleporterId,
          teleporter.config,
        );
        if (
          toItemId === undefined ||
          target === undefined ||
          target.landing.type !== "unresolvable" ||
          target.landing.reason !== "missingItem"
        ) {
          continue;
        }
        const { targetRoom } = target;
        const lone = landsWithoutToItemId(
          campaign,
          roomId,
          teleporterId,
          teleporter.config,
        );
        yield {
          severity: "error",
          roomId,
          itemId: teleporterId,
          msg: `Teleporter ‘${teleporterId}’ in ‘${roomId}’ targets item ‘${toItemId}’ in ‘${targetRoom}’, which doesn't exist`,
          fixable: lone,
          fixText:
            lone ?
              `Remove the toItemId — ‘${targetRoom}’ has a single teleporter to land on`
            : `Set a valid toItemId on teleporter ‘${teleporterId}’ in ‘${roomId}’ by hand`,
          issueData: { roomId, teleporterId, targetRoom, toItemId },
          verifier: teleporterTargetInvalidVerifier,
        };
      }
    },
    fix(campaign, { roomId, teleporterId, targetRoom, toItemId }) {
      const teleporter = campaign.rooms[roomId].items[teleporterId];
      if (
        teleporter.type !== "teleporter" ||
        !(targetRoom in campaign.rooms) ||
        toItemId in campaign.rooms[targetRoom].items ||
        !landsWithoutToItemId(campaign, roomId, teleporterId, teleporter.config)
      ) {
        throw new Error(
          `cannot auto-fix teleporter ‘${teleporterId}’ in ‘${roomId}’: its target isn't unambiguous`,
        );
      }
      return produce(campaign, (draft) => {
        const draftTeleporter = draft.rooms[roomId].items[teleporterId];
        if (
          (draftTeleporter.type === "teleporter" ||
            draftTeleporter.type === "portableTeleporter") &&
          "toItemId" in draftTeleporter.config
        ) {
          delete draftTeleporter.config.toItemId;
        }
      });
    },
  };
