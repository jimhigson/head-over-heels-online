import { loadRoom } from "./loadRoom/loadRoom";
import mitt from "mitt";
import type { GameEvents } from "../GameApi";
import { entryState } from "./PlayableEntryState";
import type { CharacterName, Campaign } from "../../model/modelTypes";
import type { RoomJson } from "../../model/RoomJson";
import type { CharacterRooms, GameState, PickupsCollected } from "./GameState";
import type { InputStateTrackerInterface } from "../input/InputStateTracker";
import { getRoomItem } from "../../model/RoomState";
import { emptyObject } from "../../utils/empty";
import type { SavedGameState } from "./saving/SavedGameState";
import { transformObject } from "../../utils/entries";
import { badJsonClone } from "../../utils/badJsonClone";

export type StartingRooms<RoomId extends string> = Partial<
  Record<CharacterName, RoomId>
>;

/** 
  For a given campaign, get the starting room for the two playable characters.
  This is nothing smarter than a search through every item in every room until we find them
*/
export const startingRoomIds = <RoomId extends string>(
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
  writeInto = {},
}: {
  campaign: Campaign<RoomId>;
  inputStateTracker: InputStateTrackerInterface;
  savedGame?: SavedGameState<RoomId>;
  writeInto?: Partial<GameState<RoomId>>;
}): GameState<RoomId> => {
  const roomIds = startingRoomIds(campaign, savedGame);

  const pickupsCollected = {} as PickupsCollected<RoomId>;

  const headRoom =
    savedGame ?
      savedGame.gameState.characterRooms.head &&
      badJsonClone(savedGame.gameState.characterRooms.head)
    : roomIds.head &&
      loadRoom({
        roomJson: campaign.rooms[roomIds.head],
        roomPickupsCollected: pickupsCollected[roomIds.head] ?? emptyObject,
        isNewGame: savedGame === undefined,
      });
  const heelsRoom =
    // first check if in the same room:
    roomIds.heels === roomIds.head ? headRoom
    : savedGame ?
      savedGame.gameState.characterRooms.heels &&
      badJsonClone(savedGame.gameState.characterRooms.heels)
    : roomIds.heels &&
      loadRoom({
        roomJson: campaign.rooms[roomIds.heels],
        roomPickupsCollected: pickupsCollected[roomIds.heels] ?? emptyObject,
        isNewGame: savedGame === undefined,
      });
  //the game can't start in symbiosis (why?) but can be loaded into it
  const headOverHeelsRoom =
    savedGame?.gameState.characterRooms.headOverHeels &&
    badJsonClone(savedGame.gameState.characterRooms.headOverHeels);

  // even if we are loading, override characterRooms from the save, since we may
  // need two references to a single room state object, which json can't do
  const characterRooms: CharacterRooms<RoomId> = {
    head: headRoom,
    heels: heelsRoom,
    headOverHeels: headOverHeelsRoom,
  };

  // create a gameApi
  return Object.assign(writeInto, {
    events: mitt<GameEvents<RoomId>>(),
    inputStateTracker,
    campaign,
    gameSpeed: 1,

    // saved game can override any of the above
    ...(savedGame ?
      badJsonClone(savedGame?.gameState)
    : {
        // not saving - initialise some things:

        // if head isn't in the campaign (unusual!), start with heels
        currentCharacterName: roomIds.head === undefined ? "heels" : "head",
        entryState: {
          head:
            headRoom === undefined ? undefined : (
              entryState(getRoomItem("head", headRoom?.items)!)
            ),
          heels:
            heelsRoom === undefined ? undefined : (
              entryState(getRoomItem("heels", heelsRoom?.items)!)
            ),
          // no headOverHeels: if loading from cold (not at save)
        },
        pickupsCollected,
        gameTime: 0,
        progression: 0,
      }),

    characterRooms,
  });
};
