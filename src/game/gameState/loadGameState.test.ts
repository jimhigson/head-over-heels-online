import type { PersistedState } from "redux-persist/es/types";
import { expect, test } from "vitest";

import blacktooth33v25 from "../../../e2e/fixtures/saves/v25/blacktooth33.json";
import bookworld21v25 from "../../../e2e/fixtures/saves/v25/bookworld21.json";
import finalroomV25 from "../../../e2e/fixtures/saves/v25/finalroom.json";
import { isFreeItem } from "../../model/itemInPlay/ItemInPlayNarrowedUnions";
import { roomItemsIterable } from "../../model/roomItemsInPlayIterators";
import { type Progression, roomSpatialIndexKey } from "../../model/RoomState";
import { campaign } from "../../originalCampaign/campaign";
import type { OriginalCampaignRoomId } from "../../originalCampaign/OriginalCampaignRoomId";
import { savedGamesMigrations } from "../../persistMigrations/savedGamesMigrations";
import { persistVersion } from "../../store/persist/persist";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import type { SavedGamesSliceState } from "../../store/slices/savedGames/savedGamesSlice";
import { badJsonClone } from "../../utils/badJsonClone";
import { valuesIter } from "../../utils/entries";
import { type Xyz, xyzEqual } from "../../utils/vectors/vectors";
import type { HudInputState } from "../input/hudInputState";
import { InputStateTracker } from "../input/InputStateTracker";
import { loadGameState } from "./loadGameState";
import { loadPlayer } from "./loadRoom/loadPlayer";
import type { SavedGame, UnindexedRoomState } from "./saving/SavedGameState";

test("if there is a saved game with both characters in the same room, only load one copy of that room", () => {
  const savedRoom: UnindexedRoomState<OriginalCampaignRoomId, string> = {
    id: "blacktooth1head",
    roomTime: 0,
    roomFrameStartTime: 0,
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
        pickupsCollected: {},
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
    "persist:hohol/savedGames": SavedGamesSliceState & PersistedState;
  };
};

/**
 * the items of a fixture's save once loaded - first migrated as the store
 * migrates saves when it rehydrates
 */
const loadedRoomItemsFromFixture = async (
  /** a save the game wrote at an older version */
  fixture: SaveFixture,
) => {
  const migratedSavedGames = (await savedGamesMigrations(
    badJsonClone(fixture.localStorage["persist:hohol/savedGames"]),
    persistVersion,
  )) as unknown as SavedGamesSliceState;
  const [savedGame] = Object.values(migratedSavedGames.saves) as Array<
    SavedGame<OriginalCampaignRoomId>
  >;
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
  async ([, fixture]) => {
    const itemsMarkingPickUpNext = (
      await loadedRoomItemsFromFixture(fixture as unknown as SaveFixture)
    ).filter((item) => "wouldPickUpNext" in item.state);

    expect(itemsMarkingPickUpNext).toEqual([]);
  },
);

test("an old save loads Heels with nothing to pick up next", async () => {
  const heelsWouldPickUpNextItemIds = (
    await loadedRoomItemsFromFixture(blacktooth33v25 as unknown as SaveFixture)
  )
    .filter((item) => item.type === "heels")
    .map((heels) => heels.state.wouldPickUpNextItemId);

  expect(heelsWouldPickUpNextItemIds).toEqual([null]);
});

test("old saves of monsters load with their touch timing initialised", async () => {
  const monsterDurationsOfTouch = (
    await loadedRoomItemsFromFixture(blacktooth33v25 as unknown as SaveFixture)
  )
    .filter((item) => item.type === "monster")
    .map((monster) => monster.state.durationOfTouch);

  // the save has a cyberman and a dalek:
  expect(monsterDurationsOfTouch).toEqual([0, 0]);
});

test("old saves load rooms with their frame starting at their room time", async () => {
  const migratedSavedGames = (await savedGamesMigrations(
    badJsonClone(
      (blacktooth33v25 as unknown as SaveFixture).localStorage[
        "persist:hohol/savedGames"
      ],
    ),
    persistVersion,
  )) as unknown as SavedGamesSliceState;
  const [savedGame] = Object.values(migratedSavedGames.saves) as Array<
    SavedGame<OriginalCampaignRoomId>
  >;
  const loadedGameState = loadGameState({
    campaign,
    inputStateTracker: new InputStateTracker(new Map(), {} as HudInputState),
    savedGame,
  });
  const rooms = valuesIter(loadedGameState.characterRooms).toArray();

  expect(rooms.map(({ roomFrameStartTime }) => roomFrameStartTime)).toEqual(
    rooms.map(({ roomTime }) => roomTime),
  );
});

test("old saves load free items with no carried speed", async () => {
  const freeItemsWithCarriedSpeed = (
    await loadedRoomItemsFromFixture(blacktooth33v25 as unknown as SaveFixture)
  )
    .filter(isFreeItem)
    .filter((freeItem) => freeItem.state.liftVel.z !== 0);

  expect(freeItemsWithCarriedSpeed).toEqual([]);
});

test("old saves of scenery players load facing their start direction", async () => {
  const sceneryPlayersFacingElsewhere = (
    await loadedRoomItemsFromFixture(finalroomV25 as unknown as SaveFixture)
  )
    .filter((item) => item.type === "sceneryPlayer")
    .filter(
      (sceneryPlayer) =>
        !xyzEqual(
          sceneryPlayer.state.visualFacingVector,
          sceneryPlayer.config.startDirection,
        ),
    );

  expect(sceneryPlayersFacingElsewhere).toEqual([]);
});

test("saves without a playable's visual facing load it from its facing", async () => {
  const savedWithoutVisualFacing = badJsonClone(
    blacktooth33v25,
  ) as unknown as SaveFixture;
  for (const savedGame of valuesIter(
    savedWithoutVisualFacing.localStorage["persist:hohol/savedGames"].saves,
  )) {
    for (const room of valuesIter(savedGame.gameState.characterRooms)) {
      for (const item of roomItemsIterable(room.items)) {
        if (item.type === "head" || item.type === "heels") {
          delete (item.state as { visualFacingVector?: unknown })
            .visualFacingVector;
        }
      }
    }
  }

  const playablesFacingElsewhere = (
    await loadedRoomItemsFromFixture(savedWithoutVisualFacing)
  )
    .filter((item) => item.type === "head" || item.type === "heels")
    .filter(
      (playable) =>
        !xyzEqual(playable.state.visualFacingVector, playable.state.facing),
    );

  expect(playablesFacingElsewhere).toEqual([]);
});

test.for([
  // types that have no times in json, saved without them:
  [
    "monster",
    [
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 1, z: 1 },
    ],
  ],
  ["head", [{ x: 1, y: 1, z: 1 }]],
  // saved without times:
  ["deadlyBlock", [{ x: 1, y: 1, z: 1 }]],
  // saved without times:
  ["teleporter", [{ x: 1, y: 1, z: 1 }]],
  // saved as `{ y: 8, z: 3 }`:
  ["barrier", [{ x: 1, y: 8, z: 3 }]],
  // saved as `{ y: 6 }`:
  ["conveyor", [{ x: 1, y: 6, z: 1 }]],
  // saved as `{ x: 8, y: 8 }`:
  [
    "floor",
    [
      { x: 8, y: 8, z: 1 },
      { x: 8, y: 8, z: 1 },
    ],
  ],
  // saved with only their tiles - right, towards, away, left, towards; then
  // right, towards, away, left, left:
  [
    "wall",
    [
      { x: 1, y: 8, z: 1 },
      { x: 3, y: 1, z: 1 },
      { x: 8, y: 1, z: 1 },
      { x: 1, y: 8, z: 1 },
      { x: 3, y: 1, z: 1 },
      { x: 1, y: 8, z: 1 },
      { x: 8, y: 1, z: 1 },
      { x: 8, y: 1, z: 1 },
      { x: 1, y: 3, z: 1 },
      { x: 1, y: 3, z: 1 },
    ],
  ],
] as const)(
  "old saves load %ss with their times complete",
  async ([itemType, expectedTimes]) => {
    const loadedTimes = (
      await loadedRoomItemsFromFixture(
        blacktooth33v25 as unknown as SaveFixture,
      )
    )
      .filter((item) => item.type === itemType)
      .map(({ config }) => config.times);

    expect(loadedTimes).toEqual(expectedTimes);
  },
);

test("old saves load emitters with their times complete", async () => {
  const emitterTimes = (
    await loadedRoomItemsFromFixture(finalroomV25 as unknown as SaveFixture)
  )
    .filter((item) => item.type === "emitter")
    .map((emitter) => emitter.config.times);

  // saved without times, then as `{ x: 1, y: 1, z: 0.1 }`:
  expect(emitterTimes).toEqual<Array<Xyz>>([
    { x: 1, y: 1, z: 1 },
    { x: 1, y: 1, z: 0.1 },
  ]);
});
