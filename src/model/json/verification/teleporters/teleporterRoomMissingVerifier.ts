import { produce } from "immer";

import { createNewRoom } from "../../../inPlaceMutators/createNewRoom";
import { exitGameRoomId } from "../../ItemConfigMap";
import { type TeleporterLandingConfig } from "../../resolveTeleporterLanding";
import { type CampaignVerifier } from "../CampaignVerification";
import { allTeleporters, teleportersInRoom } from "../helpers/teleporterTarget";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type TeleporterRoomMissing = {
  roomId: VerificationRoomId;
  teleporterId: VerificationRoomItemId;
  toRoom: VerificationRoomId;
};

/** rooms created by the fix are this size, unless the teleporter needs more */
const newRoomMinimumSize = { x: 8, y: 8 };

/**
 * a teleporter whose `toRoom` isn't `$$final` and isn't a room in the
 * campaign. Fixed by creating that room, holding a teleporter back
 */
export const teleporterRoomMissingVerifier: CampaignVerifier<TeleporterRoomMissing> =
  {
    name: "Teleporter to missing room",
    *check(campaign) {
      for (const { roomId, teleporterId, teleporter } of allTeleporters(
        campaign,
      )) {
        const { toRoom } = teleporter.config;
        // no toRoom is a same-room teleporter:
        if (
          toRoom === undefined ||
          toRoom === exitGameRoomId ||
          toRoom in campaign.rooms
        ) {
          continue;
        }
        yield {
          severity: "error",
          roomId,
          itemId: teleporterId,
          msg: `Teleporter ‘${teleporterId}’ in ‘${roomId}’ leads to ‘${toRoom}’, which isn't a room in this campaign`,
          fixable: true,
          fixText: `Create new room "${toRoom}" to teleport to`,
          issueData: { roomId, teleporterId, toRoom },
          verifier: teleporterRoomMissingVerifier,
        };
      }
    },
    fix(campaign, { roomId, teleporterId, toRoom: newRoomId }) {
      if (newRoomId in campaign.rooms) {
        // made by an earlier fix in the same batch, for another teleporter
        return campaign;
      }
      const fromRoom = campaign.rooms[roomId];
      const teleporter = fromRoom.items[teleporterId];
      if (teleporter.type !== "teleporter") {
        throw new Error(
          `cannot auto-fix: ‘${teleporterId}’ in ‘${roomId}’ is not a teleporter`,
        );
      }
      const { position } = teleporter;
      const times = teleporter.config.times ?? {};
      const newRoom = createNewRoom<VerificationRoomId, VerificationRoomItemId>(
        newRoomId,
        {
          x: Math.max(newRoomMinimumSize.x, position.x + (times.x ?? 1)),
          y: Math.max(newRoomMinimumSize.y, position.y + (times.y ?? 1)),
        },
        fromRoom.color,
        fromRoom.planet,
        [{ x: 0, y: 0 }],
      );
      // the way back lands on this teleporter, named if it isn't the only one:
      const backToTeleporter =
        teleportersInRoom(campaign, roomId).length === 1 ?
          {}
        : { toItemId: teleporterId };

      return produce(campaign, (draft) => {
        draft.rooms[newRoomId] = {
          ...newRoom,
          items: {
            ...newRoom.items,
            ["teleporter" as VerificationRoomItemId]: {
              type: "teleporter",
              position,
              config: {
                ...(teleporter.config.times === undefined ?
                  {}
                : { times: teleporter.config.times }),
                toRoom: roomId,
                ...backToTeleporter,
              },
            },
          },
        };
        const draftTeleporter = draft.rooms[roomId].items[teleporterId];
        if (draftTeleporter.type === "teleporter") {
          draftTeleporter.config.toRoom = newRoomId;
          // viewed with both landing fields optional, so either can be deleted:
          const landingConfig: TeleporterLandingConfig = draftTeleporter.config;
          delete landingConfig.toPosition;
          delete landingConfig.toItemId;
        }
      });
    },
  };
