import {
  selectHeelsAbilities,
  selectPlayableItem,
} from "@/game/gameState/gameStateSelectors/selectPlayableItem";
import type { StartingRooms } from "@/game/gameState/initGameState";
import { initGameState, startingRooms } from "@/game/gameState/initGameState";
import { changeCharacterRoom } from "@/game/gameState/mutators/changeCharacterRoom";
import { playableLosesLife } from "@/game/gameState/mutators/characterLosesLife";
import { setStandingOn } from "@/game/gameState/mutators/modifyStandingOn";
import { swopPlayables } from "@/game/gameState/mutators/swopCharacters";
import type { ItemInPlay } from "@/model/ItemInPlay";
import type { PlayableActionState } from "@/model/ItemStateMap";
import type {
  RoomState,
  Campaign,
  IndividualCharacterName,
  CharacterName,
} from "@/model/modelTypes";
import { zxSpectrumResolution } from "@/originalGame";
import type { SceneryName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import { iterate } from "@/utils/iterate";
import { addXyz } from "@/utils/vectors/vectors";
import { objectValues } from "iter-tools";
import { vi, expect } from "vitest";

export type TestCampaignRoomId =
  | "heelsStartingRoom"
  | "headStartingRoom"
  | "thirdRoom";
export const roomProperties = {
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: { away: [], left: [] },
} as const satisfies Partial<RoomState<"blacktooth", TestCampaignRoomId>>;
export const testCampaign = {
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
        hushPuppy: {
          type: "hushPuppy",
          position: { x: 0, y: 0, z: 4 },
          config: {},
        },
      },
    },
  },
} as const satisfies Campaign<TestCampaignRoomId>;

export const mutatorsTestHarness = () => {
  const gameState = initGameState({
    campaign: testCampaign,
    renderOptions: {
      showBoundingBoxes: "none",
      showShadowMasks: false,
      upscale: {
        scaleFactor: 1,
        effectiveSize: zxSpectrumResolution,
      },
    },
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
      ) as ItemInPlay<"portal", SceneryName, TestCampaignRoomId>;

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
      shouldBeACopyOf: RoomState<SceneryName, TestCampaignRoomId>;
      thisRoom: RoomState<SceneryName, TestCampaignRoomId> | undefined;
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
      room: RoomState<SceneryName, TestCampaignRoomId> | undefined,
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
        SceneryName,
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
