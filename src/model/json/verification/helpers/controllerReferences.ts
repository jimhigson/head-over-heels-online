import { entries } from "../../../../utils/entries";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJson";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

export type ControllerVia =
  | { kind: "joystickControls" }
  | { kind: "modifies"; modIndex: number; expectType: string };

export type ControllerRef = {
  roomId: VerificationRoomId;
  /** the controller item (switch / button / timer / joystick) */
  itemId: VerificationRoomItemId;
  /** the item it references (always in the same room) */
  targetId: VerificationRoomItemId;
  via: ControllerVia;
};

/**
 * every reference a switch / button / timer (`modifies[].targets`) or joystick
 * (`controls`) makes to another item in its room. Modifications with no
 * `targets` mean "all items of `expectType`" and yield nothing (no specific
 * reference to check).
 */
export function* controllerReferences(
  campaign: VerificationCampaign,
): Generator<ControllerRef> {
  for (const [roomId, room] of entries(campaign.rooms)) {
    for (const [rawItemId, item] of iterateRoomJsonItemsWithIds(
      room.items,
      "switch",
      "button",
      "timer",
      "joystick",
    )) {
      const itemId = rawItemId as VerificationRoomItemId;
      if (item.type === "joystick") {
        for (const targetId of item.config.controls ?? []) {
          yield {
            roomId,
            itemId,
            targetId: targetId as VerificationRoomItemId,
            via: { kind: "joystickControls" },
          };
        }
        continue;
      }
      if (!("modifies" in item.config)) {
        continue;
      }
      for (const [modIndex, mod] of item.config.modifies.entries()) {
        for (const targetId of mod.targets ?? []) {
          yield {
            roomId,
            itemId,
            targetId: targetId as VerificationRoomItemId,
            via: { kind: "modifies", modIndex, expectType: mod.expectType },
          };
        }
      }
    }
  }
}
