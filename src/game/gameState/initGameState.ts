import { Campaign, PlayableCharacter, RoomJson } from "@/modelTypes";
import { GameState } from "@/game/gameState/GameState";
import { PlanetName } from "@/sprites/planets";
import { actions, defaultKeyAssignments } from "../input/listenForInput";
import { loadRoom } from "./loadRoom";
import { fromAllEntries } from "@/utils/entries";

type StartingRooms<RoomId extends string> = Record<PlayableCharacter, RoomId>;

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
        const which = i.config.which;
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
): GameState<RoomId> => {
  const starts = startingRooms(campaign);

  return {
    keyAssignment: defaultKeyAssignments,
    currentCharacter: "head",
    head: {
      hasHooter: false,
      donuts: 0,
      jumps: 0,
      lives: 8,
      shield: 0,
      roomState: loadRoom(campaign.rooms[starts.head]),
    },
    heels: {
      carrying: null,
      fast: 0,
      hasBag: false,
      lives: 8,
      shield: 0,
      roomState: loadRoom(campaign.rooms[starts.heels]),
    },
    inputState: fromAllEntries(actions.map((action) => [action, false])),
  };
};
