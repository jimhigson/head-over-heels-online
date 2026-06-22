import { entries } from "../../../../utils/entries";
import { type DirectionXy4 } from "../../../../utils/vectors/vectors";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJson";
import {
  candidatePartnerDoors,
  type DoorRef as PartnerDoorRef,
} from "../../candidatePartnerDoors";
import { exitGameRoomId } from "../../ItemConfigMap";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

export type DoorRef = PartnerDoorRef<VerificationRoomId>;

/** every door in the campaign, as DoorRefs */
export function* allDoors(campaign: VerificationCampaign): Generator<DoorRef> {
  for (const [roomId, room] of entries(campaign.rooms)) {
    for (const [doorId, door] of iterateRoomJsonItemsWithIds(
      room.items,
      "door",
    )) {
      yield { roomId, doorId, door };
    }
  }
}

/**
 * candidate partner doors in `toRoom` for a door leaving `fromRoom` in
 * `sourceDirection`: doors whose `config.toRoom === fromRoom` and
 * `config.direction === oppositeDirection(sourceDirection)`. This mirrors exactly
 * `findDestinationPortal`'s door-matching predicate (changeCharacterRoom.ts),
 * json-side, ignoring `toDoor`.
 */
export const candidatePartners = (
  campaign: VerificationCampaign,
  fromRoom: VerificationRoomId,
  toRoom: VerificationRoomId,
  sourceDirection: DirectionXy4,
): DoorRef[] =>
  candidatePartnerDoors(campaign.rooms, fromRoom, toRoom, sourceDirection);

/** every door in `toRoom` that links back to `fromRoom`, in any direction */
export const doorsBackTo = (
  campaign: VerificationCampaign,
  fromRoom: VerificationRoomId,
  toRoom: VerificationRoomId,
): DoorRef[] => {
  if (!(toRoom in campaign.rooms)) {
    return [];
  }
  return iterateRoomJsonItemsWithIds(campaign.rooms[toRoom].items, "door")
    .filter(([, door]) => door.config.toRoom === fromRoom)
    .map(
      ([doorId, door]): DoorRef => ({
        roomId: toRoom,
        doorId: doorId as VerificationRoomItemId,
        door,
      }),
    )
    .toArray();
};

export type DoorPartnerResolution =
  | { kind: "ambiguous"; count: number }
  | { kind: "exitGame" }
  | { kind: "missingRoom" }
  | { kind: "none" }
  | { kind: "unambiguous"; partner: DoorRef };

/**
 * the door a door connects to, honouring `toDoor` when set, otherwise the unique
 * opposite-direction door back. Distinguishes exit-game / missing-room / no-partner
 * / ambiguous (toDoor unset and >1 candidate) / unambiguous.
 */
export const resolveDoorPartner = (
  campaign: VerificationCampaign,
  ref: DoorRef,
): DoorPartnerResolution => {
  const { toRoom, toDoor, direction } = ref.door.config;
  if (toRoom === exitGameRoomId) {
    return { kind: "exitGame" };
  }
  if (!(toRoom in campaign.rooms)) {
    return { kind: "missingRoom" };
  }
  const candidates = candidatePartners(campaign, ref.roomId, toRoom, direction);
  if (toDoor !== undefined) {
    const named = candidates.find((candidate) => candidate.doorId === toDoor);
    return named === undefined ?
        { kind: "none" }
      : { kind: "unambiguous", partner: named };
  }
  if (candidates.length === 0) {
    return { kind: "none" };
  }
  if (candidates.length > 1) {
    return { kind: "ambiguous", count: candidates.length };
  }
  const [partner] = candidates;
  return { kind: "unambiguous", partner };
};

/**
 * the candidate partner doors in `ref`'s destination room that no *other* door
 * in `ref`'s own room already resolves to. When `ref` is a broken (dangling)
 * door and exactly one partner is left unclaimed, that partner must be the one
 * `ref` was meant to link to - even when several doors come back - because every
 * other door between the two rooms is already accounted for. This is what lets
 * an otherwise-ambiguous broken link be repaired to a single door.
 */
export const unclaimedPartners = (
  campaign: VerificationCampaign,
  ref: DoorRef,
): DoorRef[] => {
  const { roomId, doorId, door } = ref;
  const { toRoom, direction } = door.config;
  const candidates = candidatePartners(campaign, roomId, toRoom, direction);

  const claimed = new Set<VerificationRoomItemId>();
  for (const [siblingId, sibling] of iterateRoomJsonItemsWithIds(
    campaign.rooms[roomId].items,
    "door",
  )) {
    if (siblingId === doorId || sibling.config.toRoom !== toRoom) {
      continue;
    }
    const resolved = resolveDoorPartner(campaign, {
      roomId,
      doorId: siblingId as VerificationRoomItemId,
      door: sibling,
    });
    if (resolved.kind === "unambiguous" && resolved.partner.roomId === toRoom) {
      claimed.add(resolved.partner.doorId);
    }
  }

  return candidates.filter((candidate) => !claimed.has(candidate.doorId));
};

/**
 * the door a broken (dangling) door was most likely meant to link to, or
 * `undefined` when it can't be inferred unambiguously. Two signals, strongest
 * first:
 *
 * 1. a candidate that links *back* to this door (`toDoor` names it) - a mutual
 *    link is a deliberate pairing, decisive even when several doors come back
 *    and other doors are also misconfigured (sequel_23's room_45 ↔ room_47).
 * 2. otherwise the single candidate no correctly-resolving sibling already
 *    claims (sequel_23's room_52 ↔ room_3).
 */
export const inferredPartner = (
  campaign: VerificationCampaign,
  ref: DoorRef,
): DoorRef | undefined => {
  const { doorId, door } = ref;
  const candidates = candidatePartners(
    campaign,
    ref.roomId,
    door.config.toRoom,
    door.config.direction,
  );

  const backLinking = candidates.filter(
    (candidate) => candidate.door.config.toDoor === doorId,
  );
  if (backLinking.length === 1) {
    const [partner] = backLinking;
    return partner;
  }
  // two doors both naming this one back is contradictory, not a clean pairing
  if (backLinking.length > 1) {
    return undefined;
  }

  const unclaimed = unclaimedPartners(campaign, ref);
  if (unclaimed.length === 1) {
    const [partner] = unclaimed;
    return partner;
  }
  return undefined;
};
