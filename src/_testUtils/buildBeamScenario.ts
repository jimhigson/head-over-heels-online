import { loadCampaignFromDb } from "../db/campaign";
import { postgrestDb } from "../db/postgrestDb";
import { loadRoom } from "../game/gameState/loadRoom/loadRoom";
import {
  castBeamSegments,
  tickLampLightBeams,
} from "../game/itemBehaviours/LampBehaviour";
import { jimAtBlockstackingUserId } from "../gameInfo";
import { type ItemInPlay } from "../model/ItemInPlay";
import { roomItemsIterable } from "../model/roomItemsInPlayIterators";
import { type RoomJson } from "../model/RoomJson";
import { type RoomState } from "../model/RoomState";

/**
 * the "laboratory" campaign's room for benchmarking beam casting: a tall lamp
 * whose beam reflects several times and splits, in a room crowded with
 * monsters off the beam's path. A scroll in the room explains its layout
 */
const beamScenarioRoomId = "beam_scenario";

export type BeamScenarioRoomJson = RoomJson<string, string>;

/**
 * the scenario room's json, at the latest version in the db - so tests follow
 * the room as it is edited
 */
export const loadBeamScenarioRoomJson =
  async (): Promise<BeamScenarioRoomJson> => {
    const laboratoryCampaign = await loadCampaignFromDb(postgrestDb, {
      userId: jimAtBlockstackingUserId,
      campaignName: "laboratory",
    });
    const maybeRoomJson = laboratoryCampaign.rooms[beamScenarioRoomId];
    if (maybeRoomJson === undefined) {
      throw new Error(
        `laboratory campaign v${laboratoryCampaign.locator.version} has no "${beamScenarioRoomId}" room`,
      );
    }
    return maybeRoomJson;
  };

export type BeamScenario = {
  room: RoomState<string, string>;
  lamp: ItemInPlay<"lamp", string, string>;
};

/**
 * load the scenario room into play, fresh each call
 */
export const buildBeamScenario = (
  roomJson: BeamScenarioRoomJson,
): BeamScenario => {
  const room = loadRoom({
    roomJson,
    scrollsRead: {},
    roomPickupsCollected: {},
    userSettings: {
      soundSettings: {},
      displaySettings: {},
      pokesEnabled: {},
    },
  });
  const lamp = roomItemsIterable(room.items).find(
    (item) => item.type === "lamp",
  );
  if (lamp === undefined) {
    throw new Error("the beam scenario has no lamp");
  }
  return { room, lamp };
};

/** the pure cast being benchmarked - finds the whole beam path through the room */
export const castOnce = ({ room, lamp }: BeamScenario) =>
  castBeamSegments(lamp, room);

/**
 * the resulting in-play lightBeam items, reduced to stable fields and sorted
 * by id - for an identical-result snapshot before vs after the rewrite
 */
export const beamItemsSnapshot = ({ room, lamp }: BeamScenario) => {
  tickLampLightBeams(lamp, room);
  return roomItemsIterable(room.items)
    .filter((item) => item.type === "lightBeam")
    .map((b) => ({
      id: b.id,
      box: b.state.box,
      direction: b.config.direction,
      end: b.state.end,
    }))
    .toArray()
    .sort((a, b) => a.id.localeCompare(b.id));
};
