import { type PlanetName } from "../../../sprites/planets";
import {
  type DirectionXy4,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { addDoorToRoom } from "../../inPlaceMutators/addDoorToRoom";
import { createNewRoom } from "../../inPlaceMutators/createNewRoom";
import { type CharacterName } from "../../modelTypes";
import {
  type AllRoomSubRoom,
  isWholeRoomSubRooms,
  type SubRoom,
} from "../../RoomJson";
import { type ExitGameRoomId } from "../ItemConfigMap";
import {
  type CampaignVerificationIssue,
  type CampaignVerifier,
} from "./CampaignVerification";
import { verificationGraph } from "./helpers/verificationGraph";
import {
  type VerificationCampaign,
  type VerificationJsonItemUnion,
  type VerificationRoomId,
  type VerificationRoomItemId,
  type VerificationRoomJson,
} from "./verificationTypes";

/** a fresh single-cell (or, with `gridPositions`, divided) room with full perimeter walls */
export const newRoom = (
  id: string,
  opts: { size?: Xy; gridPositions?: Xy[] } = {},
): VerificationRoomJson =>
  createNewRoom<VerificationRoomId, VerificationRoomItemId>(
    id as VerificationRoomId,
    opts.size ?? { x: 8, y: 8 },
    { hue: "cyan", shade: "basic" },
    "blacktooth",
    opts.gridPositions ?? [{ x: 0, y: 0 }],
  );

/** add a door (cutting the wall) and return its generated id */
export const addDoor = (
  room: VerificationRoomJson,
  direction: DirectionXy4,
  config: {
    toRoom: ExitGameRoomId | VerificationRoomId;
    toDoor?: string;
    toSubRoom?: string;
  },
  position: Xyz = { x: 0, y: 3, z: 0 },
): VerificationRoomItemId =>
  addDoorToRoom<VerificationRoomId, VerificationRoomItemId>(
    room,
    position,
    direction,
    {
      toRoom: config.toRoom,
      ...(config.toDoor !== undefined ? { toDoor: config.toDoor } : {}),
      ...(config.toSubRoom !== undefined ?
        { meta: { toSubRoom: config.toSubRoom } }
      : {}),
    },
  );

/** put an arbitrary json item into a room under `id`, returning the id */
export const addItem = (
  room: VerificationRoomJson,
  id: string,
  item: VerificationJsonItemUnion,
): VerificationRoomItemId => {
  const itemId = id as VerificationRoomItemId;
  room.items[itemId] = item;
  return itemId;
};

/** add a player start for a character, returning its generated id */
export const addPlayer = (
  room: VerificationRoomJson,
  which: CharacterName,
  position: Xyz = { x: 1, y: 1, z: 0 },
): VerificationRoomItemId =>
  addItem(room, `player_${which}`, {
    type: "player",
    position,
    config: { which },
  });

/** add a crown pickup for a planet, returning its generated id */
export const addCrown = (
  room: VerificationRoomJson,
  planet: PlanetName,
  position: Xyz = { x: 1, y: 1, z: 0 },
): VerificationRoomItemId =>
  addItem(room, `crown_${planet}`, {
    type: "pickup",
    position,
    config: { gives: "crown", planet },
  });

/**
 * merge a patch (vertical links, non-contiguous relationship) into the single
 * `"*"` cell of an undivided room, creating the whole-room sub-rooms entry
 */
export const setWholeRoomCell = (
  room: VerificationRoomJson,
  patch: Partial<AllRoomSubRoom<VerificationRoomId>>,
): void => {
  const subRooms = room.meta?.subRooms;
  const existing =
    subRooms !== undefined && isWholeRoomSubRooms(subRooms) ?
      subRooms["*"]
    : {};
  room.meta = { ...room.meta, subRooms: { "*": { ...existing, ...patch } } };
};

/**
 * merge a patch into one named cell of an already-divided room (built via
 * `newRoom` with several `gridPositions`, whose cells are keyed "0", "1", …)
 */
export const setSubRoomCell = (
  room: VerificationRoomJson,
  cellId: string,
  patch: Partial<SubRoom<VerificationRoomId>>,
): void => {
  const subRooms = room.meta?.subRooms;
  if (subRooms === undefined || isWholeRoomSubRooms(subRooms)) {
    throw new Error(`room ‘${room.id}’ is not divided into sub-rooms`);
  }
  Object.assign(subRooms[cellId], patch);
};

export const campaignOf = (
  rooms: Record<string, VerificationRoomJson>,
): VerificationCampaign => ({
  locator: { campaignName: "test", userId: "test", version: 0 },
  rooms: rooms as VerificationCampaign["rooms"],
});

/** materialise a verifier's generator `check` into an array for assertions */
export const runCheck = <TErr>(
  verifier: CampaignVerifier<TErr>,
  campaign: VerificationCampaign,
): CampaignVerificationIssue<TErr>[] =>
  verifier.check(campaign, verificationGraph(campaign)).toArray();
