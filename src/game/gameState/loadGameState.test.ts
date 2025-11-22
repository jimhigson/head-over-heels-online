import { expect, test } from "vitest";

import type { OriginalCampaignRoomId } from "../../_generated/originalCampaign/OriginalCampaignRoomId";
import type { HudInputState } from "../input/hudInputState";
import type { UnindexedRoomState } from "./saving/SavedGameState";

import { campaign } from "../../_generated/originalCampaign/campaign";
import { roomSpatialIndexKey } from "../../model/RoomState";
import { noPlanetsLiberated } from "../../store/slices/gameMenus/gameMenusSlice";
import { badJsonClone } from "../../utils/badJsonClone";
import { InputStateTracker } from "../input/InputStateTracker";
import { loadGameState } from "./loadGameState";
import { loadPlayer } from "./loadRoom/loadPlayer";

test("if there is a saved game with both characters in the same room, only load one copy of that room", () => {
  const savedRoom: UnindexedRoomState<OriginalCampaignRoomId, string> = {
    id: "blacktooth1head",
    roomTime: 0,
    items: {
      head: loadPlayer(
        {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "head",
          },
        },
        "head",
      ),
      heels: loadPlayer(
        {
          type: "player",
          position: { x: 1, y: 0, z: 0 },
          config: {
            which: "heels",
          },
        },
        "heels",
      ),
    },
    planet: "blacktooth",
    color: {
      hue: "yellow",
      shade: "basic",
    },
    roomJson: {
      id: "blacktooth1head",
      planet: "blacktooth",
      color: {
        hue: "yellow",
        shade: "basic",
      },
      items: {},
    },
  };

  const loadedGameState = loadGameState({
    campaign,
    inputStateTracker: new InputStateTracker(new Map(), {} as HudInputState),
    savedGame: {
      store: {
        gameMenus: {
          gameInPlay: {
            planetsLiberated: noPlanetsLiberated,
            scrollsRead: {},
            roomsExplored: {},
            campaignLocator: {
              campaignName: "original",
              userId: "@@original",
              version: -1,
            },
            freeCharacters: {},
          },
        },
      },
      saveTime: 0,
      gameState: {
        gameTime: 0,
        currentCharacterName: "heels",
        pickupsCollected: {},
        entryState: {},
        characterRooms: {
          // both characters in the same room:
          head: badJsonClone(savedRoom),
          heels: badJsonClone(savedRoom),
        },
      },
    },
  });

  // only one copy of the rooms should have been loaded:
  expect
    .soft(loadedGameState.characterRooms.head)
    .toBe(loadedGameState.characterRooms.heels);

  // the single loaded room should have an index added (this wasn't in the save, it needs to be
  // generated on load):
  expect
    .soft(loadedGameState.characterRooms.head![roomSpatialIndexKey])
    .toBeDefined();
});
