import { objectValues } from "iter-tools-es";

import type { CharacterName } from "../../model/modelTypes";
import type { RoomJson } from "../../model/RoomJson";
import type { RoomState } from "../../model/RoomState";
import type { InputStateTrackerInterface } from "../input/InputStateTracker";
import type { CharacterRooms, GameState, PickupsCollected } from "./GameState";
import type { SavedCharacterRooms, SavedGame } from "./saving/SavedGameState";

import {
  type Campaign,
  type IndividualCharacterName,
} from "../../model/modelTypes";
import {
  getRoomItem,
  iterateRoomItems,
  roomSpatialIndexKey,
} from "../../model/RoomState";
import { typedURLSearchParams } from "../../options/queryParams";
import { badJsonClone } from "../../utils/badJsonClone";
import { emptyObject } from "../../utils/empty";
import {
  cheatRoomIdFromUrlHash,
  cheatsOn,
} from "../components/cheats/cheatRoomIdFromUrlHash";
import { GridSpatialIndex } from "../physics/gridSpace/GridSpatialIndex";
import { loadRoom } from "./loadRoom/loadRoom";
import { changeCharacterRoom } from "./mutators/changeCharacterRoom";
import { entryState } from "./PlayableEntryState";

export type StartingRooms<RoomId extends string> = Partial<
  Record<CharacterName, RoomId>
>;

export const findStartingRoomsInCampaign = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): StartingRooms<RoomId> => {
  const startingRoomIds: Partial<StartingRooms<RoomId>> = {};

  for (const r of Object.values<RoomJson<RoomId, string>>(campaign.rooms)) {
    for (const i of Object.values(r.items)) {
      if (i.type === "player") {
        const { which } = i.config;
        if (startingRoomIds[which] !== undefined) {
          throw new Error(`Campaign has duplicate starting rooms for ${which}`);
        }
        startingRoomIds[which] = r.id;
      }
    }
  }
  return startingRoomIds;
};

/**
 * For a given campaign, get the starting room for the two playable characters,
 * adjusted for cheats maybe
 */
const getStartingRoomIds = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): {
  startAs: IndividualCharacterName;
  campaignStartingRoomIds: StartingRooms<RoomId>;
  /** will be different from campaignStartingRoomIds if we had to modify it for cheats */
  startingRoomIds: StartingRooms<RoomId>;
  /** true iff we moved the character out of their normal room */
  changedCharacterRoomFromCampaign: boolean;
} => {
  const campaignStartingRoomIds = findStartingRoomsInCampaign(campaign);
  const startingRoomIds = {
    ...campaignStartingRoomIds,
  };

  // note it is technically possible to have a campaign with only one character, but
  // not no characters
  if (
    campaignStartingRoomIds.head === undefined &&
    campaignStartingRoomIds.heels === undefined
  ) {
    throw new Error("couldn't find either head or heels in campaign");
  }

  let startAs: IndividualCharacterName =
    typedURLSearchParams().get("playAsHeels") === "1" ? "heels"
      // default to head (so long as they are in the game)
    : campaignStartingRoomIds.head !== undefined ? "head"
    : "heels";

  // allow cheats to mutate the start position of either character:
  const cheatRoomId =
    cheatsOn() ?
      cheatRoomIdFromUrlHash(campaign, window.location.href)
    : undefined;
  if (cheatRoomId !== undefined) {
    startingRoomIds[startAs] = cheatRoomId;
  }

  // someone made a campaign without head - have to start as heels instead:
  if (startingRoomIds.head === undefined) {
    startAs = "heels";
  }

  return {
    campaignStartingRoomIds,
    startingRoomIds,
    startAs,
    changedCharacterRoomFromCampaign:
      cheatRoomId !== undefined &&
      campaignStartingRoomIds[startAs] !== startingRoomIds[startAs],
  };
};

type LoadGameStateOptions<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  inputStateTracker: InputStateTrackerInterface;
  savedGame?: SavedGame<RoomId>;
  writeInto?: Partial<GameState<RoomId>>;
};

/** spatial indexes are not saved - re-create them on load
 * @param loadedCharacterRooms the rooms loaded from the saved game. Mutated in-place.
 */
const addIndexToIndexSavedCharacterRooms = <RoomId extends string>(
  loadedCharacterRooms: SavedCharacterRooms<RoomId>,
): CharacterRooms<RoomId> => {
  for (const loadedRoomState of objectValues(loadedCharacterRooms)) {
    const asIndexed = loadedRoomState as RoomState<RoomId, string>;

    if (asIndexed[roomSpatialIndexKey] !== undefined) {
      // already indexed this room - this can happen if multiple characters are in
      // the same room since the same object will appear as multiple values in loadedCharacterRooms
      continue;
    }

    asIndexed[roomSpatialIndexKey] = new GridSpatialIndex(
      iterateRoomItems(loadedRoomState.items),
    );
  }

  return loadedCharacterRooms as CharacterRooms<RoomId>;
};

const _loadGameState = <RoomId extends string>({
  campaign,
  inputStateTracker,
  savedGame,
  writeInto = {},
}: LoadGameStateOptions<RoomId>): GameState<RoomId> => {
  if (savedGame) {
    const savedGameCharacterRooms = savedGame.gameState.characterRooms;
    const loadedCharacterRooms = badJsonClone(savedGameCharacterRooms);

    if (
      savedGameCharacterRooms.head !== undefined &&
      savedGameCharacterRooms.head.id === savedGameCharacterRooms.heels?.id
    ) {
      // we loaded two copies of the same room - reduce to one:
      loadedCharacterRooms.heels = loadedCharacterRooms.head;
    }

    Object.assign(writeInto, {
      inputStateTracker,
      // TODO: there's really no reason for this to be in the game state - this just highlights
      // why it's a bad idea to have it duplicated, when it could stay in (only) the store
      gameSpeed: 1,
      ...badJsonClone(savedGame.gameState),
    });

    writeInto.characterRooms =
      addIndexToIndexSavedCharacterRooms(loadedCharacterRooms);

    // cast here asserts that we have now added all the missing properties:
    return writeInto as GameState<RoomId>;
  }

  const {
    startAs,
    startingRoomIds,
    campaignStartingRoomIds,
    changedCharacterRoomFromCampaign,
  } = getStartingRoomIds(campaign);

  const defaultLoadRoom = {
    roomPickupsCollected: emptyObject,
    scrollsRead: emptyObject,
    isNewGame: true,
  };

  /** head's current room state, if head is in this game */
  const headRoom: RoomState<RoomId, string> | undefined =
    campaignStartingRoomIds.head &&
    loadRoom({
      // note - always load into their original room as per the campaign - if need to change, we can do later:
      roomJson: campaign.rooms[campaignStartingRoomIds.head],
      // we are not loading so nothing has been collected/read:
      ...defaultLoadRoom,
    });

  const heelsRoom: RoomState<RoomId, string> | undefined =
    campaignStartingRoomIds.heels === campaignStartingRoomIds.head ?
      headRoom
    : campaignStartingRoomIds.heels &&
      loadRoom({
        // note - always load into their original room as per the campaign - if need to change, we can do later:
        roomJson: campaign.rooms[campaignStartingRoomIds.heels],
        // we are not loading so nothing has been collected/read:
        ...defaultLoadRoom,
      });

  // both players, in their starting rooms:
  const headItem =
    headRoom === undefined ? undefined : getRoomItem("head", headRoom?.items);
  const heelsItem =
    heelsRoom === undefined ? undefined : (
      getRoomItem("heels", heelsRoom?.items)
    );

  // gather what we know so far:
  const gameState: GameState<RoomId> = Object.assign(writeInto, {
    inputStateTracker,
    gameSpeed: 1,

    currentCharacterName: startAs,
    entryState: {
      head: headItem === undefined ? undefined : entryState(headItem),
      heels: heelsItem === undefined ? undefined : entryState(heelsItem),
      // no headOverHeels: if loading from cold (not at save)
    },
    // new game - nothing picked up:
    pickupsCollected: {} as PickupsCollected<RoomId>,
    gameTime: 0,
    progression: 0,
    freeCharacters: {},

    characterRooms: {
      head: headRoom,
      heels: heelsRoom,
      // can't start a game in symbiosis so always undefined:
      headOverHeels: undefined,
    },
  });

  if (changedCharacterRoomFromCampaign) {
    // can happen if starting in playtest mode:
    // the character won't be in their starting room since it is different from the campaign
    //  - move them in via levelSelect
    const playableItem = startAs === "head" ? headItem : heelsItem;
    // load them:

    changeCharacterRoom({
      changeType: "level-select",
      gameState,
      playableItem: playableItem!,
      toRoomId: startingRoomIds[startAs]!,
      sourceItem: undefined, // no teleporter/portal etc they came though
    });
  }

  // create a gameState
  return gameState;
};

export const loadGameState = <RoomId extends string>(
  options: LoadGameStateOptions<RoomId>,
): GameState<RoomId> => {
  try {
    return _loadGameState<RoomId>(options);
  } catch (e) {
    throw new Error("failed to load game state", { cause: e });
  }
};
