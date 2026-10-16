import { type ExportedSoundId } from "../../_generated/sfxdex/sfx";
import {
  type ExitGameRoomId,
  exitGameRoomId,
} from "../../model/json/ItemConfigMap";
import { type Campaign } from "../../model/modelTypes";
import { type RoomJson } from "../../model/RoomJson";
import { emptyArray } from "../../utils/empty";
import { entryTuneForPlanet } from "../gameState/loadRoom/entryTuneForPlanet";

/**
 * the entry tune that may play on travelling to a room, as a list for
 * preloading - empty when leaving the game, or the room has no tune
 */
export const entryTuneSoundsForRoom = <RoomId extends string>(
  toRoom: ExitGameRoomId | RoomId,
  campaign: Campaign<RoomId>,
): readonly ExportedSoundId[] => {
  if (toRoom === exitGameRoomId) {
    return emptyArray;
  }
  const toRoomJson: RoomJson<RoomId, string> | undefined =
    campaign.rooms[toRoom];
  if (toRoomJson === undefined) {
    throw new Error(`room ${toRoom} does not exist in campaign`);
  }
  const entryTune = entryTuneForPlanet(toRoomJson.planet);
  return entryTune === undefined ? emptyArray : [entryTune];
};
