import type { Campaign, CharacterName, RoomJson } from "@/model/modelTypes";
import type { GameState, PickupsCollected } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { actions, defaultKeyAssignments } from "../input/listenForInput";
import { loadRoom } from "./loadRoom/loadRoom";
import { fromAllEntries } from "@/utils/entries";
import type { RenderOptions } from "../RenderOptions";
import mitt from "mitt";
import type { ApiEvents } from "../GameApi";

type StartingRooms<RoomId extends string> = Partial<
  Record<CharacterName, RoomId>
>;

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

  // note it is technically possible to have a campaign with only one character, but
  // not no characters
  if (startingRooms.head === undefined && startingRooms.heels === undefined) {
    throw new Error("couldn't find either head or heels in campaign");
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

  const headsRoom =
    starts.head && loadRoom(campaign.rooms[starts.head], pickupsCollected);
  const heelsRoom =
    starts.heels && loadRoom(campaign.rooms[starts.heels], pickupsCollected);

  return {
    keyAssignment: defaultKeyAssignments,
    // if head isn't in the campaign (unusual!), start with heels
    currentCharacterName: starts.head === undefined ? "heels" : "head",
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
