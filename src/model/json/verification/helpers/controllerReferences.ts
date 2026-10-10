import { entries } from "../../../../utils/entries";
import { roomJsonItemsEntriesIterable } from "../../../RoomJson";
import {
  getReferencedItems,
  type ItemReferenceVia,
} from "../../getReferencedItems";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

export type ControllerVia = ItemReferenceVia;

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
 * (`controls`) makes to another item in its room, across the campaign
 */
export function* controllerReferences(
  campaign: VerificationCampaign,
): Generator<ControllerRef> {
  for (const [roomId, room] of entries(campaign.rooms)) {
    for (const [itemId, item] of roomJsonItemsEntriesIterable(room.items)) {
      for (const { targetId, via } of getReferencedItems(item)) {
        yield { roomId, itemId, targetId, via };
      }
    }
  }
}
