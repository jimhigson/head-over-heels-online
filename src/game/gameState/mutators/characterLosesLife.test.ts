import { describe, expect, test, vi } from "vitest";
import type { StartingRooms } from "../initGameState";
import { initGameState, startingRooms } from "../initGameState";
import { defaultRenderOptions } from "@/game/RenderOptions";
import { playableLosesLife } from "./characterLosesLife";
import {
  selectHeelsAbilities,
  selectPlayableItem,
} from "../gameStateSelectors/selectPlayableItem";
import type {
  Campaign,
  CharacterName,
  IndividualCharacterName,
  RoomState,
} from "@/model/modelTypes";
import {
  individualCharacterNames,
  otherIndividualCharacterName,
} from "@/model/modelTypes";
import { startingLives } from "@/game/physics/mechanicsConstants";
import type { PlanetName } from "@/sprites/planets";
import type { ItemInPlay } from "@/model/ItemInPlay";
import { changeCharacterRoom } from "./changeCharacterRoom";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { blockSizePx } from "@/sprites/spritePivots";
import { addXyz } from "@/utils/vectors/vectors";
import { setStandingOn } from "./modifyStandingOn";
import { swopPlayables } from "./swopCharacters";
import type { PlayableActionState } from "@/model/ItemStateMap";

type TestCampaignRoomId =
  | "heelsStartingRoom"
  | "headStartingRoom"
  | "thirdRoom";
const roomProperties = {
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: { away: [], left: [] },
} as const satisfies Partial<RoomState<"blacktooth", TestCampaignRoomId>>;
const testCampaign = {
  rooms: {
    headStartingRoom: {
      ...roomProperties,
      id: "headStartingRoom",
      items: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: { which: "head" },
        },
        doorToHeelsStartingRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { toRoom: "heelsStartingRoom", direction: "right" },
        },
        doorToThirdRoom: {
          type: "door",
          position: { x: 0, y: 0, z: 0 },
          config: { toRoom: "thirdRoom", direction: "towards" },
        },
      },
    },
    heelsStartingRoom: {
      ...roomProperties,
      id: "heelsStartingRoom",
      items: {
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: { which: "heels" },
        },
        doorToHeadStartingRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { toRoom: "headStartingRoom", direction: "left" },
        },
        doorToThirdRoom: {
          type: "door",
          position: { x: 0, y: 0, z: 0 },
          config: { toRoom: "thirdRoom", direction: "towards" },
        },
      },
    },
    thirdRoom: {
      ...roomProperties,
      id: "thirdRoom",
      items: {
        doorToHeelsStartingRoom: {
          type: "door",
          position: { x: 3, y: 5, z: 0 },
          config: { toRoom: "heelsStartingRoom", direction: "away" },
        },
        doorToHeadStartingRoom: {
          type: "door",
          position: { x: 1, y: 5, z: 0 },
          config: { toRoom: "headStartingRoom", direction: "away" },
        },
      },
    },
  },
} as const satisfies Campaign<TestCampaignRoomId>;

const harness = () => {
  const gameState = initGameState({
    campaign: testCampaign,
    renderOptions: defaultRenderOptions,
  });

  const gameOverFn = vi.fn();
  gameState.events.on("gameOver", gameOverFn);

  return {
    gameState,
    gameOverFn,
    startingRooms: startingRooms(testCampaign) as Required<
      StartingRooms<TestCampaignRoomId>
    >,
    originalRooms: {
      head: gameState.characterRooms.head!,
      heels: gameState.characterRooms.heels!,
    },
    originalPlayableItems: {
      head: selectPlayableItem(gameState, "head"),
      heels: selectPlayableItem(gameState, "heels"),
    },
    swopToPlayer(playableName: IndividualCharacterName) {
      gameState.currentCharacterName = playableName;
    },
    expectGameContinues: () => expect(gameOverFn).not.toHaveBeenCalled(),
    expectGameOver: () => expect(gameOverFn).toHaveBeenCalled(),
    // convert next function to destructured args
    expectLifeCount({
      count,
      inSymbiosis = false,
      playableName,
    }: {
      playableName: CharacterName;
      inSymbiosis?: boolean;
      count: number;
    }) {
      if (inSymbiosis) {
        const playable = selectPlayableItem(gameState, "headOverHeels");
        if (playable === undefined) {
          expect.fail(
            `Could not find playable ${playableName} but asked for the lives in symbiosis`,
          );
        }
        expect(
          playable.state[playableName as IndividualCharacterName].lives,
        ).toEqual(count);
      } else {
        const playable = selectPlayableItem(
          gameState,
          playableName as IndividualCharacterName,
        );
        if (playable === undefined) {
          expect.fail(`Could not find playable ${playableName}`);
        }
        expect(playable.state.lives).toEqual(count);
      }
    },
    playableWalksToRoom(
      playableName: CharacterName,
      roomId: TestCampaignRoomId,
    ) {
      const sourceRoom = this.selectRoomOfPlayable(playableName);
      if (sourceRoom === undefined) {
        throw new Error(`Could not find room for ${playableName}`);
      }
      const sourcePortal = iterate(objectValues(sourceRoom.items)).find(
        (i) => i.type === "portal" && i.config.toRoom === roomId,
      ) as ItemInPlay<"portal", PlanetName, TestCampaignRoomId>;

      if (sourcePortal === undefined) {
        throw new Error(
          `harness asked ${playableName} to walk from ${sourceRoom.id} to ${roomId} but could not find a portal for that journey`,
        );
      }
      const playableItem = selectPlayableItem(gameState, playableName);
      if (playableItem === undefined) {
        throw new Error(`${playableName} not in the game`);
      }
      changeCharacterRoom({
        playableItem,
        gameState,
        changeType: "portal",
        toRoomId: roomId,
        sourcePortal,
        positionRelativeToSourcePortal: { x: 0, y: 0, z: 0 },
      });
    },
    putIntoSymbiosis() {
      const headRoom = this.selectRoomOfPlayable("head");
      const heelsRoom = this.selectRoomOfPlayable("heels");
      // can only go into symbiosis if in the same room:
      expect(headRoom).toBe(heelsRoom);

      const headPlayable = selectPlayableItem(gameState, "head")!;
      const heelsPlayable = selectPlayableItem(gameState, "heels")!;

      // get ready for symbiosis: positioned on top of each other,
      // standing on, and in an idle state
      headPlayable.state.position = addXyz(heelsPlayable.state.position, {
        z: blockSizePx.h,
      });
      setStandingOn({ above: headPlayable, below: heelsPlayable });
      headPlayable.state.action = "idle";
      heelsPlayable.state.action = "idle";

      swopPlayables(gameState);

      expect(gameState.currentCharacterName).toEqual("headOverHeels");

      expect(this.selectPlayable("headOverHeels")).toBeDefined();
      expect(this.selectPlayable("head")).not.toBeDefined();
      expect(this.selectPlayable("heels")).not.toBeDefined();
    },
    takeOutOfSymbiosis() {
      const headOverHeelsPlayable = selectPlayableItem(
        gameState,
        "headOverHeels",
      );
      if (headOverHeelsPlayable === undefined) {
        expect.fail("headOverHeels not in the game");
      }

      swopPlayables(gameState);

      expect(["head", "heels"]).toContain(gameState.currentCharacterName);

      expect(this.selectPlayable("headOverHeels")).not.toBeDefined();
      expect(this.selectPlayable("head")).toBeDefined();
      expect(this.selectPlayable("heels")).toBeDefined();
    },
    expectRoomToBeNonIdenticalCopy({
      thisRoom,
      shouldBeACopyOf,
    }: {
      shouldBeACopyOf: RoomState<PlanetName, TestCampaignRoomId>;
      thisRoom: RoomState<PlanetName, TestCampaignRoomId> | undefined;
    }) {
      expect(thisRoom).toBeDefined();
      expect(thisRoom?.id).toEqual(shouldBeACopyOf.id);
      expect(thisRoom).not.toBe(shouldBeACopyOf);
    },
    expectCharacterToBeInANonIdenticalCopyOfTheirOriginalRoom(
      playableName: IndividualCharacterName,
    ) {
      const originalRoom = this.originalRooms[playableName];
      const currentRoom = this.selectRoomOfPlayable(playableName);

      this.expectRoomToBeNonIdenticalCopy({
        thisRoom: currentRoom,
        shouldBeACopyOf: originalRoom,
      });
    },
    expectCharacterToBeInRoom(
      playableName: IndividualCharacterName,
      room: RoomState<PlanetName, TestCampaignRoomId> | undefined,
    ) {
      if (room === undefined) {
        expect.fail(
          `room not defined, cannot say if ${playableName} is in an undefined room`,
        );
      }

      const currentRoom = this.selectRoomOfPlayable(playableName);

      expect(currentRoom).toBe(room);
    },
    expectPlayableToBeInGame(playableName: CharacterName) {
      expect(this.selectPlayable(playableName)).toBeDefined();
    },
    expectPlayableToBeOutOfTheGame(playableName: CharacterName) {
      expect(this.selectPlayable(playableName)).not.toBeDefined();
    },
    playableLosesLife(playableName: CharacterName, count: number = 1) {
      for (let i = 0; i < count; i++) {
        const playable = selectPlayableItem(gameState, playableName);

        if (playable === undefined) {
          expect.fail(
            `Could not find playable ${playableName} while losing life ${i} of ${count}`,
          );
        }
        playableLosesLife(gameState, playable);
      }
    },
    selectRoomOfPlayable(playableName: CharacterName) {
      return gameState.characterRooms[playableName];
    },
    selectPlayable<C extends CharacterName = CharacterName>(playableName: C) {
      return selectPlayableItem<C, TestCampaignRoomId>(gameState, playableName);
    },
    carryItemIfHeels(playableName: CharacterName) {
      if (playableName === "heels" || playableName === "headOverHeels") {
        const playable = selectPlayableItem(gameState, playableName);
        if (playable === undefined) {
          expect.fail(`Could not find playable heels`);
        }
        const heelsAbilities = selectHeelsAbilities(playable);
        if (heelsAbilities === undefined) {
          expect.fail(`Could not find heels abilities`);
        }
        heelsAbilities.carrying = {
          type: "portableBlock",
          config: { style: "cube" },
        };
      }
    },
    expectPlayableToBeStoodAtPortal<R extends TestCampaignRoomId>(
      playableName: CharacterName,
      roomId: R,
      portalJsonId: string & keyof (typeof testCampaign)["rooms"][R]["items"],
    ) {
      const portalItemId = `${portalJsonId}/portal`;

      const playable = this.selectPlayable(playableName);
      if (!playable) {
        expect.fail(`Could not find playable ${playableName}`);
      }

      const room = this.selectRoomOfPlayable(playableName);
      if (room === undefined || room.id !== roomId) {
        expect.fail(`Could not find room ${roomId} for ${playableName}`);
      }

      const portal = room.items[portalItemId] as ItemInPlay<
        "portal",
        PlanetName,
        TestCampaignRoomId
      >;

      console.log(
        playable.state.position,
        addXyz(portal.state.position, portal.config.relativePoint),
      );

      expect(playable.state.position).toEqual(
        addXyz(portal.state.position, portal.config.relativePoint),
      );
    },
    expectPlayableAction(
      playableName: CharacterName,
      action: PlayableActionState,
    ) {
      expect(this.selectPlayable(playableName)?.state.action).toEqual(action);
    },
    expectNotCarryingIfHeels(playableName: CharacterName) {
      if (playableName === "heels" || playableName === "headOverHeels") {
        const playable = selectPlayableItem(gameState, playableName);
        if (playable === undefined) {
          expect.fail(`Could not find playable heels`);
        }
        const heelsAbilities = selectHeelsAbilities(playable);
        if (heelsAbilities === undefined) {
          expect.fail(`Could not find heels abilities`);
        }
        expect(heelsAbilities.carrying).toBeNull();
      }
    },
  };
};

describe("while not in symbiosis", () => {
  describe.each(individualCharacterNames)(
    "%s loses life",
    (playableLosingLifeName) => {
      const otherName = otherIndividualCharacterName(playableLosingLifeName);

      describe(`and it is ${playableLosingLifeName}'s last life`, () => {
        test(`but ${otherName} still has some left`, () => {
          const h = harness();

          h.playableLosesLife(playableLosingLifeName, startingLives);
          expect(h.selectPlayable(playableLosingLifeName)).toBeUndefined();
          expect(h.gameState.currentCharacterName).toEqual(otherName);
          h.expectGameContinues();
        });
        test(`and ${otherName} also has zero lives`, () => {
          const h = harness();

          // other player loses all their lives:
          h.playableLosesLife(otherName, startingLives);
          expect(h.selectPlayable(otherName)).toBeUndefined();

          expect(h.selectPlayable(playableLosingLifeName)).not.toBeUndefined();
          h.playableLosesLife(playableLosingLifeName, startingLives);
          expect(h.selectPlayable(playableLosingLifeName)).toBeUndefined();
          h.expectGameOver();
        });
      });
      describe(`but it is not ${playableLosingLifeName}'s last life`, () => {
        test(`while ${otherName} not in game (already lost all lives)`, () => {
          const h = harness();
          h.carryItemIfHeels(playableLosingLifeName);

          // other player loses all their lives:
          h.playableLosesLife(otherName, startingLives);
          expect(h.selectPlayable(otherName)).toBeUndefined();

          // now we lose just one life:
          h.playableLosesLife(playableLosingLifeName, 1);
          expect(h.selectPlayable(playableLosingLifeName)).not.toBeUndefined();
          h.expectLifeCount({
            playableName: playableLosingLifeName,
            count: startingLives - 1,
          });
          h.expectGameContinues();
          h.expectNotCarryingIfHeels(playableLosingLifeName);
        });
        describe(`while ${otherName} is in a different room`, () => {
          test(`${playableLosingLifeName} is in a reloaded version of the same room, with one less life`, () => {
            const h = harness();
            h.swopToPlayer(playableLosingLifeName);

            h.carryItemIfHeels(playableLosingLifeName);

            h.playableLosesLife(playableLosingLifeName);

            h.expectGameContinues();

            h.expectCharacterToBeInANonIdenticalCopyOfTheirOriginalRoom(
              playableLosingLifeName,
            );

            // one life less than starting number:
            h.expectLifeCount({
              playableName: playableLosingLifeName,
              count: startingLives - 1,
            });

            h.expectNotCarryingIfHeels(playableLosingLifeName);
          });
        });
        describe(`while ${otherName} is in the same room`, () => {
          describe("because they both entered the room as headOverHeels, and split once inside", () => {
            test("re-enter the room back in symbiosis", () => {
              const h = harness();
              h.playableWalksToRoom("head", "heelsStartingRoom");
              h.putIntoSymbiosis();
              h.playableWalksToRoom("headOverHeels", "thirdRoom");

              h.takeOutOfSymbiosis();

              const roomBeforeLosingLife = h.selectRoomOfPlayable("head")!;

              h.playableLosesLife("head");

              expect(h.selectPlayable("head")).toBeUndefined();
              expect(h.selectPlayable("heels")).toBeUndefined();
              expect(h.selectPlayable("headOverHeels")).toBeDefined();
              h.expectRoomToBeNonIdenticalCopy({
                thisRoom: h.selectRoomOfPlayable("headOverHeels"),
                shouldBeACopyOf: roomBeforeLosingLife,
              });
            });
          });
          describe(`because ${otherName} entered ${playableLosingLifeName}'s room`, () => {
            test(`${playableLosingLifeName} is in the original version of the room they started in, with one less life`, () => {
              const h = harness();
              h.swopToPlayer(otherName);

              h.playableWalksToRoom(
                otherName,
                h.startingRooms[playableLosingLifeName],
              );

              h.carryItemIfHeels(playableLosingLifeName);

              h.playableLosesLife(playableLosingLifeName);

              h.expectGameContinues();

              h.expectCharacterToBeInRoom(
                playableLosingLifeName,
                // room has not been reloaded (is still original, haven't moved from it)
                h.originalRooms[playableLosingLifeName],
              );
              h.expectCharacterToBeInRoom(
                otherName,
                // the other player is also in the original room of the player who lost a life, having moved there:
                h.originalRooms[playableLosingLifeName],
              );

              // one life less than starting number:
              h.expectLifeCount({
                playableName: playableLosingLifeName,
                count: startingLives - 1,
              });

              h.expectNotCarryingIfHeels(playableLosingLifeName);
            });
          });
          describe(`because ${playableLosingLifeName} entered ${otherName}'s room`, () => {
            test(`${playableLosingLifeName} is in the original version of the room they moved into, with one less life`, () => {
              const h = harness();
              h.swopToPlayer(playableLosingLifeName);

              h.playableWalksToRoom(
                playableLosingLifeName,
                h.startingRooms[otherName],
              );

              h.carryItemIfHeels(playableLosingLifeName);

              h.playableLosesLife(playableLosingLifeName);

              h.expectGameContinues();

              h.expectCharacterToBeInRoom(
                playableLosingLifeName,
                // room has not been reloaded (is still original)
                h.originalRooms[otherName],
              );

              // one life less than starting number:
              h.expectLifeCount({
                playableName: playableLosingLifeName,
                count: startingLives - 1,
              });

              h.expectNotCarryingIfHeels(playableLosingLifeName);
            });
          });
        });
      });
    },
  );
});

describe("while in symbiosis", () => {
  describe("after losing lives, neither characters have any lives left", () => {
    test("game ends", () => {
      const h = harness();
      h.playableWalksToRoom("head", "heelsStartingRoom");
      h.putIntoSymbiosis();
      h.selectPlayable("headOverHeels")!.state.head.lives = 1;
      h.selectPlayable("headOverHeels")!.state.heels.lives = 1;
      h.playableLosesLife("headOverHeels");
      h.expectGameOver();
    });
  });
  describe.each(individualCharacterNames)(
    "after losing lives, only %s has lives left",
    (individualWithLivesLeft) => {
      test("having entered the room in symbiosis", () => {
        const h = harness();
        h.playableWalksToRoom("head", "heelsStartingRoom");
        h.putIntoSymbiosis();
        h.playableWalksToRoom("headOverHeels", "thirdRoom");

        // now: we have walked into the third room as headOverHeels, having joined in heelsStartingRoom

        h.selectPlayable("headOverHeels")!.state[
          otherIndividualCharacterName(individualWithLivesLeft)
        ].lives = 1;

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLife("headOverHeels");

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable(individualWithLivesLeft),
          shouldBeACopyOf: roomBeforeLosingLife,
        });

        h.expectPlayableToBeOutOfTheGame("headOverHeels");
        h.expectPlayableToBeOutOfTheGame(
          otherIndividualCharacterName(individualWithLivesLeft),
        );
        h.expectPlayableToBeInGame(individualWithLivesLeft);
      });
      test("having entered the room individually", () => {
        const h = harness();
        h.playableWalksToRoom("head", "thirdRoom");
        h.playableWalksToRoom("heels", "thirdRoom");

        h.putIntoSymbiosis();

        // now: we have walked into the third room as individuals, and joined in thirdRoom:
        h.selectPlayable("headOverHeels")!.state[
          otherIndividualCharacterName(individualWithLivesLeft)
        ].lives = 1;

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLife("headOverHeels");

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable(individualWithLivesLeft),
          shouldBeACopyOf: roomBeforeLosingLife,
        });
        h.expectPlayableToBeInGame(individualWithLivesLeft);
        h.expectPlayableToBeOutOfTheGame("headOverHeels");
        h.expectPlayableToBeOutOfTheGame(
          otherIndividualCharacterName(individualWithLivesLeft),
        );
      });
    },
  );
  describe("after losing lives, both characters have lives left", () => {
    test("after entering the room in symbiosis", () => {
      const h = harness();
      h.playableWalksToRoom("head", "heelsStartingRoom");
      h.putIntoSymbiosis();
      h.playableWalksToRoom("headOverHeels", "thirdRoom");

      // now: we have walked into the third room in symbiosis from heel's starting room:

      const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
      h.playableLosesLife("headOverHeels");

      h.expectRoomToBeNonIdenticalCopy({
        thisRoom: h.selectRoomOfPlayable("headOverHeels"),
        shouldBeACopyOf: roomBeforeLosingLife,
      });

      h.expectPlayableToBeInGame("headOverHeels");
      h.expectPlayableToBeOutOfTheGame("heels");
      h.expectPlayableToBeOutOfTheGame("head");
    });
    describe("after entering the room individually", () => {
      /*  
      "Completion imminent, Ritman proceeded with his rigorous bug testing. A perfectionist,
      he would frequently track bugs while coding to avoid consequent errors. 
      "But one got through...only one..." he grimaces, draining the last of his pilsner. 
      "A friend of mine came round and wanted to play the game. I popped to the shop and was 
      gone five minutes. When I came back the game was frozen!"  
      from: https://www.eurogamer.net/the-making-of-head-over-heels
      */
      test(`having entered via the same door (would collide after room being reloaded and characters put in), 
        characters rejoin joined and at that door to avoid restarting with colliding individuals`, () => {
        const h = harness();
        h.playableWalksToRoom("head", "heelsStartingRoom");
        // both enter thirdRoom from heelsStartingRoom
        h.playableWalksToRoom("head", "thirdRoom");
        h.playableWalksToRoom("heels", "thirdRoom");
        h.putIntoSymbiosis();

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLife("headOverHeels");

        // now: we entered as individuals, joined, and died. We need to re-enter the room in symbiosis
        // to avoid colliding at the entry door:

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable("headOverHeels"),
          shouldBeACopyOf: roomBeforeLosingLife,
        });

        h.expectPlayableToBeInGame("headOverHeels");
        h.expectPlayableToBeOutOfTheGame("head");
        h.expectPlayableToBeOutOfTheGame("heels");

        h.expectPlayableToBeStoodAtPortal(
          "headOverHeels",
          "thirdRoom",
          "doorToHeelsStartingRoom",
        );
        h.expectPlayableAction("headOverHeels", "moving");
      });
      test("having entered via different doors, room is reloaded with characters separate and at their respective doors", () => {
        const h = harness();
        // both enter thirdRoom from their respective starting rooms:
        h.playableWalksToRoom("head", "thirdRoom");
        h.playableWalksToRoom("heels", "thirdRoom");
        h.putIntoSymbiosis();

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLife("headOverHeels");

        // now: we entered as individuals, joined, and died. We need to re-enter the room in symbiosis
        // to avoid colliding at the entry door:

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable("head"),
          shouldBeACopyOf: roomBeforeLosingLife,
        });
        // head and heels are in the same rooms
        expect(h.selectRoomOfPlayable("head")).toEqual(
          h.selectRoomOfPlayable("heels"),
        );

        h.expectPlayableToBeOutOfTheGame("headOverHeels");

        h.expectPlayableToBeStoodAtPortal(
          "head",
          "thirdRoom",
          "doorToHeadStartingRoom",
        );
        h.expectPlayableToBeStoodAtPortal(
          "heels",
          "thirdRoom",
          "doorToHeelsStartingRoom",
        );
        h.expectPlayableAction("head", "moving");
        h.expectPlayableAction("heels", "moving");
      });
    });
  });
});
