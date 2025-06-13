import { initialGameMenuSliceState } from "./slices/gameMenusSlice";
import type { PersistedState, PersistMigrate } from "redux-persist";
import { createMigrate } from "redux-persist";
import type { OmitDeep } from "type-fest";
import type { GameMenusSlicePersisted, RootState } from "./store";
import { iterateRoomItems, type RoomState } from "../model/RoomState";
import {
  floatingTextFixedZIndex,
  nonRenderingItemFixedZIndex,
} from "../game/render/sortZ/fixedZIndexes";
import type { CharacterRooms } from "../game/gameState/GameState";
import type { SavedGameState } from "../game/gameState/saving/SavedGameState";
import { objectEntriesIter } from "../utils/entries";

/**
 * A non-migration migration - just throws the user's config away and reverts to
 * the original starting state of the store
 */
const revertToInitialStateMigration = (
  state: PersistedState,
): PersistedState => {
  const migrateTo = initialGameMenuSliceState.userSettings;

  console.log(
    "migrating state: persisted is:",
    state,
    "I am not migrating - reverting to initial/default state:",
    migrateTo,
  );

  // have to hack it to accept this without the _persist key:
  // but docs seem to say it isn't needed. I think redux-persist has its
  // types wrong here.
  // https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
  return migrateTo as unknown as PersistedState;
};

export const gameMenusSliceMigrate: PersistMigrate = createMigrate(
  {
    1: revertToInitialStateMigration,
    2: revertToInitialStateMigration,
    3: revertToInitialStateMigration,
    4: revertToInitialStateMigration,
    5: revertToInitialStateMigration,
    6: revertToInitialStateMigration,
    7: revertToInitialStateMigration,
    8: revertToInitialStateMigration,
    9: revertToInitialStateMigration,
    10: revertToInitialStateMigration,
    11: revertToInitialStateMigration,
    12: revertToInitialStateMigration,
    13(persistedState: PersistedState) {
      // here we introduced sound settings - simply add them:
      const v12State = persistedState as OmitDeep<
        GameMenusSlicePersisted,
        "userSettings.soundSettings"
      > &
        PersistedState;

      const v13State = structuredClone(persistedState) as RootState &
        PersistedState;

      v13State.gameMenus.userSettings.soundSettings = {};

      console.log(
        "redux-persist migration: migrating state 12->13 by adding `{}` at `gameMenus.userSettings.soundSettings`",
        v12State,
        "->",
        v13State,
      );

      return v13State;
    },
    /** to test:
     *  ```sh
     *    git switch --detach 7a400fd02d5022
     *  ```
     */
    14(persistedState: PersistedState) {
      console.group(
        "redux-persist migration: migrating state 13->14 to add fixedZIndexes",
      );

      // here we introduced sound settings - simply add them:
      const v13State = persistedState as GameMenusSlicePersisted &
        PersistedState;

      const v14State = structuredClone(v13State) as GameMenusSlicePersisted &
        PersistedState;

      const giveFixedZIndexes = (room: RoomState<string, string>) => {
        for (const item of iterateRoomItems(room.items)) {
          type OldItem = Omit<typeof item, "fixedZIndex"> & {
            renders?: boolean;
          };

          if ((item as OldItem).renders === false) {
            console.log(item.id, "is a non-rendering item, giving fixedZIndex");
            item.fixedZIndex = nonRenderingItemFixedZIndex;
          } /*else if (item.type === "floorEdge") {
            console.log(
              item.id,
              "is getting .fixedZIndex = floorEdgeFixedZIndex",
            );
            item.fixedZIndex = floorEdgeFixedZIndex;
          }*/ else if (item.type === "floatingText") {
            console.log(
              item.id,
              "is getting .fixedZIndex = floatingTextFixedZIndex",
            );
            item.fixedZIndex = floatingTextFixedZIndex;
          }
        }
      };
      /**
       * update a 1 or 2 rooms for head, heels, headOverHeels - whichever
       * exists in the object given
       */
      const updateAllCharacterRooms = (
        characterRooms: CharacterRooms<string>,
      ) => {
        for (const [characterName, savedRoom] of objectEntriesIter(
          characterRooms,
        )) {
          console.group(
            "fixing room for",
            characterName,
            savedRoom.roomJson.id,
          );
          giveFixedZIndexes(savedRoom);
          console.groupEnd();
        }
      };

      const { currentGame } = v14State;

      if (currentGame !== undefined) {
        console.group("found a currentGame - migrating...");
        updateAllCharacterRooms(currentGame.gameState.characterRooms);
        console.groupEnd();
      }

      /**
       * reincarnation points can contain reincarnation points - recursively
       * migrate them however deep the json goes
       */
      const recursivelyMigrateReincarnationPoints = (
        savedGameState: SavedGameState | undefined,
      ) => {
        const reincarnationPoint =
          savedGameState?.store.gameMenus.reincarnationPoint;

        if (reincarnationPoint === undefined) {
          return;
        }
        console.log("found a reincarnation point - migrating...");
        updateAllCharacterRooms(reincarnationPoint.gameState.characterRooms);
        console.log("...reincarnation point migrated");
        const nextStateDeeper =
          reincarnationPoint.store.gameMenus.reincarnationPoint;
        if (nextStateDeeper !== undefined) {
          recursivelyMigrateReincarnationPoints(nextStateDeeper);
        }
      };
      recursivelyMigrateReincarnationPoints(currentGame);

      console.log("migration done");
      console.groupEnd();

      return v14State;
    },
  },
  { debug: true },
);
