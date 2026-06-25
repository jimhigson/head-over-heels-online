import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { controllerReferences } from "../helpers/controllerReferences";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type ControllerExpectTypeMismatch = {
  roomId: VerificationRoomId;
  itemId: VerificationRoomItemId;
  targetId: VerificationRoomItemId;
  expectType: string;
  actualType: string;
};

/**
 * a switch/button/timer modification whose `expectType` doesn't match the
 * actual type of its target. Detection only - the correct fix (retype the
 * modification or repoint it) depends on intent and isn't always expressible.
 */
export const controllerExpectTypeVerifier: CampaignVerifier<ControllerExpectTypeMismatch> =
  {
    name: "Controller expectType mismatch",
    *check(campaign) {
      for (const { roomId, itemId, targetId, via } of controllerReferences(
        campaign,
      )) {
        if (via.kind !== "modifies") {
          continue;
        }
        if (!(targetId in campaign.rooms[roomId].items)) {
          continue;
        }
        const actualType = campaign.rooms[roomId].items[targetId].type;
        if (actualType === via.expectType) {
          continue;
        }
        yield {
          severity: "warning",
          roomId,
          itemId,
          msg: `‘${itemId}’ in ‘${roomId}’ expects ‘${targetId}’ to be a ‘${via.expectType}’, but it's a ‘${actualType}’`,
          fixable: false,
          fixText: `Change ‘${itemId}’'s expectType to ‘${actualType}’, or point it at a ‘${via.expectType}’`,
          issueData: {
            roomId,
            itemId,
            targetId,
            expectType: via.expectType,
            actualType,
          },
          verifier: controllerExpectTypeVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
