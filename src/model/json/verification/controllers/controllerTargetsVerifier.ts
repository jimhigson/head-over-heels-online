import { produce } from "immer";

import { entries } from "../../../../utils/entries";
import { roomJsonItemsEntriesIterable } from "../../../RoomJsonItemIterators";
import { getControlTargetJsonItemsInRoom } from "../../getControlTargetJsonItemsInRoom";
import { rewriteControllerTargetIdsInPlace } from "../../rewriteControllerTargetIdsInPlace";
import {
  type CampaignVerificationIssue,
  type CampaignVerifier,
} from "../CampaignVerification";
import {
  type VerificationJsonItemUnion,
  type VerificationRoomId,
  type VerificationRoomItemId,
  type VerificationRoomJson,
} from "../verificationTypes";

type ControllerTargetIssue =
  | {
      /** a modification's `expectType` doesn't match its target's type */
      type: "expectTypeMismatch";
      roomId: VerificationRoomId;
      itemId: VerificationRoomItemId;
      targetId: VerificationRoomItemId;
      expectType: string;
      actualType: string;
    }
  | {
      /** an explicitly listed target that isn't in the room */
      type: "missingTarget";
      roomId: VerificationRoomId;
      itemId: VerificationRoomItemId;
      targetId: VerificationRoomItemId;
    }
  | {
      /** no item in the room is acted on, explicitly or implicitly */
      type: "controlsNothing";
      roomId: VerificationRoomId;
      itemId: VerificationRoomItemId;
    };

const isController = (item: VerificationJsonItemUnion) =>
  item.type === "joystick" ||
  ((item.type === "switch" ||
    item.type === "button" ||
    item.type === "timer") &&
    "modifies" in item.config);

function* controllerIssues(
  roomId: VerificationRoomId,
  room: VerificationRoomJson,
  itemId: VerificationRoomItemId,
  item: VerificationJsonItemUnion,
): Generator<CampaignVerificationIssue<ControllerTargetIssue>> {
  for (const targetId of getControlTargetJsonItemsInRoom(item)) {
    if (targetId in room.items) {
      continue;
    }
    yield {
      severity: "error",
      roomId,
      itemId,
      msg: `‘${itemId}’ in ‘${roomId}’ targets item ‘${targetId}’, which isn't in the room`,
      fixable: true,
      fixText: `Remove the missing target ‘${targetId}’ from ‘${itemId}’ in ‘${roomId}’`,
      issueData: { type: "missingTarget", roomId, itemId, targetId },
      verifier: controllerTargetsVerifier,
    };
  }

  if (
    (item.type === "switch" ||
      item.type === "button" ||
      item.type === "timer") &&
    "modifies" in item.config
  ) {
    for (const { targets, expectType } of item.config.modifies) {
      for (const targetId of targets ?? []) {
        const actualType = room.items[targetId]?.type;
        if (actualType === undefined || actualType === expectType) {
          continue;
        }
        yield {
          severity: "warning",
          roomId,
          itemId,
          msg: `‘${itemId}’ in ‘${roomId}’ expects ‘${targetId}’ to be a ‘${expectType}’, but it's a ‘${actualType}’`,
          fixable: false,
          fixText: `Change ‘${itemId}’'s expectType to ‘${actualType}’, or point it at a ‘${expectType}’`,
          issueData: {
            type: "expectTypeMismatch",
            roomId,
            itemId,
            targetId,
            expectType,
            actualType,
          },
          verifier: controllerTargetsVerifier,
        };
      }
    }
  }

  if (
    isController(item) &&
    !getControlTargetJsonItemsInRoom(item, room).some(
      (targetId) => targetId in room.items,
    )
  ) {
    yield {
      severity: "warning",
      roomId,
      itemId,
      msg: `‘${itemId}’ in ‘${roomId}’ doesn't control any item in the room`,
      fixable: false,
      fixText: `Give ‘${itemId}’ a target that's in the room, or remove it`,
      issueData: { type: "controlsNothing", roomId, itemId },
      verifier: controllerTargetsVerifier,
    };
  }
}

/**
 * switches, buttons, timers and joysticks whose targets are missing from the
 * room, are of a type their modification doesn't expect, or who end up
 * controlling nothing at all. Only missing targets are auto-fixable (by
 * dropping them); the right fix for the others depends on intent
 */
export const controllerTargetsVerifier: CampaignVerifier<ControllerTargetIssue> =
  {
    name: "Controller targets",
    *check(campaign) {
      for (const [roomId, room] of entries(campaign.rooms)) {
        for (const [itemId, item] of roomJsonItemsEntriesIterable(room.items)) {
          yield* controllerIssues(roomId, room, itemId, item);
        }
      }
    },
    fix(campaign, issueData) {
      if (issueData.type !== "missingTarget") {
        throw new Error(
          `controller target issue ‘${issueData.type}’ cannot be auto-fixed`,
        );
      }
      const { roomId, itemId, targetId } = issueData;
      if (targetId in campaign.rooms[roomId].items) {
        throw new Error(
          `cannot auto-fix ‘${itemId}’ in ‘${roomId}’: ‘${targetId}’ now exists`,
        );
      }
      return produce(campaign, (draft) => {
        rewriteControllerTargetIdsInPlace(
          draft.rooms[roomId].items[itemId],
          (controlTargetId) =>
            controlTargetId === targetId ? undefined : controlTargetId,
        );
      });
    },
  };
