import { expect, test } from "vitest";

import { campaign } from "../../_generated/originalCampaign/campaign";
import { type OriginalCampaignRoomId } from "../../_generated/originalCampaign/OriginalCampaignRoomId";
import blacktooth33v25 from "../../../e2e/fixtures/saves/v25/blacktooth33.json";
import bookworld21v25 from "../../../e2e/fixtures/saves/v25/bookworld21.json";
import {
  type Progression,
  roomItemsIterable,
  roomSpatialIndexKey,
} from "../../model/RoomState";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import { badJsonClone } from "../../utils/badJsonClone";
import { valuesIter } from "../../utils/entries";
import { type HudInputState } from "../input/hudInputState";
import { InputStateTracker } from "../input/InputStateTracker";
import { loadGameState } from "./loadGameState";
import { loadPlayer } from "./loadRoom/loadPlayer";
import {
  type SavedGame,
  type UnindexedRoomState,
} from "./saving/SavedGameState";

test("if there is a saved game with both characters in the same room, only load one copy of that room", () => {
  const savedRoom: UnindexedRoomState<OriginalCampaignRoomId, string> = {
    id: "blacktooth1head",
    roomTime: 0,
    progression: 0 as Progression,
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

/** the shape of a committed e2e save fixture, as far as these tests read it */
type SaveFixture = {
  localStorage: {
    "persist:hohol/savedGames": {
      saves: Record<string, SavedGame<OriginalCampaignRoomId>>;
    };
  };
};

const loadedRoomItemsFromFixture = (
  /** a save the game wrote at an older version */
  fixture: SaveFixture,
) => {
  const [savedGame] = Object.values(
    fixture.localStorage["persist:hohol/savedGames"].saves,
  );
  const loadedGameState = loadGameState({
    campaign,
    inputStateTracker: new InputStateTracker(new Map(), {} as HudInputState),
    savedGame,
  });
  return valuesIter(loadedGameState.characterRooms)
    .flatMap((room) => roomItemsIterable(room.items))
    .toArray();
};

// v25 saves mark the item Heels would pick up next on the item itself:
test.for([
  ["blacktooth33", blacktooth33v25],
  ["bookworld21", bookworld21v25],
] as const)(
  "an old save (%s) loads with no item marking itself as next to pick up",
  ([, fixture]) => {
    const itemsMarkingPickUpNext = loadedRoomItemsFromFixture(
      fixture as unknown as SaveFixture,
    ).filter((item) => "wouldPickUpNext" in item.state);

    expect(itemsMarkingPickUpNext).toEqual([]);
  },
);

test("an old save loads Heels with nothing to pick up next", () => {
  const heelsWouldPickUpNextItemIds = loadedRoomItemsFromFixture(
    blacktooth33v25 as unknown as SaveFixture,
  )
    .filter((item) => item.type === "heels")
    .map((heels) => heels.state.wouldPickUpNextItemId);

  expect(heelsWouldPickUpNextItemIds).toEqual([null]);
});

test("old saves of monsters load with their touch timing initialised", () => {
  const monsterDurationsOfTouch = loadedRoomItemsFromFixture(
    blacktooth33v25 as unknown as SaveFixture,
  )
    .filter((item) => item.type === "monster")
    .map((monster) => monster.state.durationOfTouch);

  // the save has a cyberman and a dalek:
  expect(monsterDurationsOfTouch).toEqual([0, 0]);
});
