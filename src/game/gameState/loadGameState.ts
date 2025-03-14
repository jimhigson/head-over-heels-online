import { loadRoom } from "./loadRoom/loadRoom";
import mitt from "mitt";
import type { GameEvents } from "../GameApi";
import { entryState } from "./PlayableEntryState";
import type { CharacterName, Campaign } from "../../model/modelTypes";
import type { RoomJson } from "../../model/RoomJson";
import type { GameState, PickupsCollected } from "./GameState";
import type { InputStateTrackerInterface } from "../input/InputStateTracker";
import { getRoomItem } from "../../model/RoomState";
import { emptyObject } from "../../utils/empty";
import type { SavedGameState } from "./saving/SavedGameState";
import { transformObject } from "../../utils/entries";
import { badJsonClone } from "./saving/badJsonClone";

export type StartingRooms<RoomId extends string> = Partial<
  Record<CharacterName, RoomId>
>;

/** 
  For a given campaign, get the starting room for the two playable characters.
  This is nothing smarter than a search through every item in every room until we find them
*/
export const startingRooms = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  savedGame?: SavedGameState<RoomId>,
): StartingRooms<RoomId> => {
  if (savedGame) {
    // get the starting rooms from the save:
    return transformObject(
      savedGame.gameState.characterRooms,
      ([charName, room]) => [charName, room.id],
    );
  }

  const results: Partial<StartingRooms<RoomId>> = {};

  for (const r of Object.values<RoomJson<RoomId, string>>(campaign.rooms)) {
    for (const i of Object.values(r.items)) {
      if (i.type === "player") {
        const { which } = i.config;
        results[which] = r.id;
      }
    }
  }

  // note it is technically possible to have a campaign with only one character, but
  // not no characters
  if (results.head === undefined && results.heels === undefined) {
    throw new Error("couldn't find either head or heels in campaign");
  }

  return results as StartingRooms<RoomId>;
};

export const loadGameState = <RoomId extends string>({
  campaign,
  inputStateTracker,
  savedGame,
}: {
  campaign: Campaign<RoomId>;
  inputStateTracker: InputStateTrackerInterface;
  savedGame?: SavedGameState<RoomId>;
}): GameState<RoomId> => {
  const starts = startingRooms(campaign, savedGame);

  const pickupsCollected = {} as PickupsCollected<RoomId>;

  const headRoom =
    starts.head &&
    (savedGame?.gameState.characterRooms.head ?
      badJsonClone(savedGame.gameState.characterRooms.head)
    : loadRoom({
        roomJson: campaign.rooms[starts.head],
        roomPickupsCollected: pickupsCollected[starts.head] ?? emptyObject,
        isNewGame: savedGame === undefined,
      }));
  const heelsRoom =
    starts.heels === starts.head ?
      headRoom
    : starts.heels &&
      (savedGame?.gameState.characterRooms.heels ?
        badJsonClone(savedGame.gameState.characterRooms.heels)
      : loadRoom({
          roomJson: campaign.rooms[starts.heels],
          roomPickupsCollected: pickupsCollected[starts.heels] ?? emptyObject,
          isNewGame: savedGame === undefined,
        }));

  const head = getRoomItem("head", headRoom?.items);
  const heels = getRoomItem("heels", heelsRoom?.items);

  // create a gameApi
  return {
    // if head isn't in the campaign (unusual!), start with heels
    currentCharacterName: starts.head === undefined ? "heels" : "head",
    characterRooms: {
      head: headRoom,
      heels: heelsRoom,
    },
    entryState: {
      head: headRoom === undefined ? undefined : entryState(head!),
      heels: heelsRoom === undefined ? undefined : entryState(heels!),
    },
    inputStateTracker,
    campaign,
    events: mitt<GameEvents<RoomId>>(),
    pickupsCollected,
    gameTime: 0,
    progression: 0,
    gameSpeed: 1,

    // saved game can override any of the above
    ...(savedGame ? badJsonClone(savedGame?.gameState) : {}),
  };
};
