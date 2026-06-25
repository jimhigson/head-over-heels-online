import { produce } from "immer";

import { type CampaignVerifier } from "../CampaignVerification";
import {
  controllerReferences,
  type ControllerVia,
} from "../helpers/controllerReferences";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type DeadControllerReference = {
  roomId: VerificationRoomId;
  itemId: VerificationRoomItemId;
  targetId: VerificationRoomItemId;
  via: ControllerVia;
};

/**
 * a switch/button/timer `targets` or joystick `controls` entry naming an
 * item that isn't in the room. Auto-fixable by dropping the dead reference.
 */
export const deadControllerReferenceVerifier: CampaignVerifier<DeadControllerReference> =
  {
    name: "Controller references a missing item",
    *check(campaign) {
      for (const { roomId, itemId, targetId, via } of controllerReferences(
        campaign,
      )) {
        if (targetId in campaign.rooms[roomId].items) {
          continue;
        }
        yield {
          severity: "error",
          roomId,
          itemId,
          msg: `‘${itemId}’ in ‘${roomId}’ references item ‘${targetId}’, which isn't in the room`,
          fixable: true,
          fixText: `Remove the missing reference ‘${targetId}’ from ‘${itemId}’ in ‘${roomId}’`,
          issueData: { roomId, itemId, targetId, via },
          verifier: deadControllerReferenceVerifier,
        };
      }
    },
    fix(campaign, { roomId, itemId, targetId, via }) {
      if (targetId in campaign.rooms[roomId].items) {
        throw new Error(
          `cannot auto-fix ‘${itemId}’ in ‘${roomId}’: ‘${targetId}’ now exists`,
        );
      }
      return produce(campaign, (draft) => {
        const item = draft.rooms[roomId].items[itemId];
        if (via.kind === "joystickControls") {
          if (item.type === "joystick" && item.config.controls !== undefined) {
            item.config.controls = item.config.controls.filter(
              (target) => target !== targetId,
            );
          }
          return;
        }
        if (
          (item.type === "switch" ||
            item.type === "button" ||
            item.type === "timer") &&
          "modifies" in item.config
        ) {
          const mod = item.config.modifies[via.modIndex];
          if (mod.targets !== undefined) {
            mod.targets = mod.targets.filter((target) => target !== targetId);
          }
        }
      });
    },
  };
