import type { Campaign, CharacterName, RoomJson } from "@/model/modelTypes";
import type { GameState, PickupsCollected } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { actions, defaultKeyAssignments } from "../input/listenForInput";
import { loadRoom } from "./loadRoom/loadRoom";
import { fromAllEntries } from "@/utils/entries";
import type { RenderOptions } from "../RenderOptions";
import mitt from "mitt";
import type { ApiEvents } from "../GameApi";

type StartingRooms<RoomId extends string> = Record<CharacterName, RoomId>;

/** 
  For a given campaign, get the starting room for the two playable characters.
  This is nothing smarter than a search through every item in every room until we find them
*/
const startingRooms = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): StartingRooms<RoomId> => {
  const startingRooms: Partial<StartingRooms<RoomId>> = {};

  for (const r of Object.values<RoomJson<PlanetName, RoomId>>(campaign.rooms)) {
    for (const i of Object.values(r.items)) {
      if (i.type === "player") {
        const { which } = i.config;
        startingRooms[which] = r.id;
      }
    }
  }

  if (startingRooms.head === undefined) {
    throw new Error("couldn't find head in campaign");
  }
  if (startingRooms.heels === undefined) {
    throw new Error("couldn't find heels in campaign");
  }

  return startingRooms as StartingRooms<RoomId>;
};

export const initGameState = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  renderOptions: RenderOptions<RoomId>,
): GameState<RoomId> => {
  const starts = startingRooms(campaign);

  const pickupsCollected = fromAllEntries(
    Object.keys(campaign.rooms).map((roomId) => [roomId, {}]),
  ) as PickupsCollected<RoomId>;

  const headsRoom = loadRoom(campaign.rooms[starts.head], pickupsCollected);
  const heelsRoom = loadRoom(campaign.rooms[starts.heels], pickupsCollected);

  return {
    keyAssignment: defaultKeyAssignments,
    currentCharacterName: "head",
    characterRooms: {
      head: headsRoom,
      heels: heelsRoom,
    },
    inputState: fromAllEntries(actions.map((action) => [action, false])),
    renderOptions,
    campaign,
    events: mitt<ApiEvents<RoomId>>(),
    pickupsCollected,
    gameTime: 0,
  };
};
