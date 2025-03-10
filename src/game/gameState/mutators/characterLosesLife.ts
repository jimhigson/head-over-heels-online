import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../gameStateSelectors/selectPlayableItem";
import { addItemToRoom } from "./addItemToRoom";
import {
  combinePlayablesInSymbiosis,
  uncombinePlayablesFromSymbiosis,
} from "./symbiosis";
import { entryState } from "../PlayableEntryState";
import { removeHushPuppiesFromRoom } from "./removeHushPuppiesFromRoom";
import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import { otherIndividualCharacterName } from "../../../model/modelTypes";
import { collision1to1 } from "../../collision/aabbCollision";
import type { PlayableItem } from "../../physics/itemPredicates";
import { store } from "../../../store/store";
import { gameOver } from "../../../store/slices/gameMenusSlice";

export const combinedPlayableLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
  headOverHeels: PlayableItem<"headOverHeels", RoomId>,
) => {
  const room = gameState.characterRooms["headOverHeels"]!;

  headOverHeels.state.head.lives--;
  headOverHeels.state.heels.lives--;

  headOverHeels.state.head.lastDiedAt = headOverHeels.state.head.gameTime;
  headOverHeels.state.heels.lastDiedAt = headOverHeels.state.heels.gameTime;

  const totalLivesRemaining =
    headOverHeels.state.head.lives + headOverHeels.state.heels.lives;
  if (totalLivesRemaining === 0) {
    gameState.events.emit("gameOver");
    return; // terminal outcome - game over
  }

  const headHasLives = headOverHeels.state.head.lives > 0;
  const heelsHasLives = headOverHeels.state.heels.lives > 0;

  //whatever else we're doing, heels can't keep her item:
  headOverHeels.state.heels.carrying = null;

  const continuingWithOneCharacter =
    (headHasLives && !heelsHasLives) || (!headHasLives && heelsHasLives);

  if (continuingWithOneCharacter) {
    const survivingCharacterName = headHasLives ? "head" : "heels";

    gameState.currentCharacterName = survivingCharacterName;

    resetPlayableToEntryState(gameState, headOverHeels);

    // create a new heads/heels
    const survivingCharacter =
      uncombinePlayablesFromSymbiosis(headOverHeels)[survivingCharacterName];

    const reloadedRoom = reloadRoomWithCharacterInIt({
      gameState,
      playableItems: [survivingCharacter],
      roomId: room.id,
    });

    gameState.characterRooms = { [survivingCharacterName]: reloadedRoom };
    gameState.entryState = {
      [survivingCharacterName]: entryState(survivingCharacter),
    };

    return; // non-terminal outcome - continue playing with just one character*/
  }

  // continuing with both characters:
  const headOverHeelsEntryState = gameState.entryState.headOverHeels;
  const enteredInSymbiosis = headOverHeelsEntryState !== undefined;

  if (enteredInSymbiosis) {
    // fairly straightforward case of restoring in symbiosis:
    resetPlayableToEntryState(gameState, headOverHeels);
    const reloadedRoom = reloadRoomWithCharacterInIt({
      gameState,
      playableItems: [headOverHeels],
      roomId: room.id,
    });
    gameState.characterRooms = { headOverHeels: reloadedRoom };
    return; // non-terminal outcome - resume in reloaded room, still in symbiosis*/
  } else {
    // case of entering as individuals, joining, and then dying:
    // try to unjoin and put back into the room:
    const { head, heels } = uncombinePlayablesFromSymbiosis(headOverHeels);

    resetPlayableToEntryState(gameState, head);
    resetPlayableToEntryState(gameState, heels);

    if (collision1to1(head, heels)) {
      // can't put then back as individuals without a collision - it is likely they
      // entered via the same door. Recombine and continue:
      const rejoined = combinePlayablesInSymbiosis({ head, heels });
      // give headOverHeels heels' entry state:
      resetPlayableToEntryState(gameState, rejoined, "heels");
      const reloadedRoom = reloadRoomWithCharacterInIt({
        gameState,
        playableItems: [rejoined],
        roomId: room.id,
      });
      gameState.characterRooms = { headOverHeels: reloadedRoom };
      gameState.entryState = { headOverHeels: entryState(rejoined) };
      return; // non-terminal outcome - reentry in symbiosis
    } else {
      // can put back separate and at their own locations - is likely they entered via different doors/teleporters:
      const reloadedRoom = reloadRoomWithCharacterInIt({
        gameState,
        playableItems: [head, heels],
        roomId: room.id,
      });
      gameState.characterRooms = { head: reloadedRoom, heels: reloadedRoom };
      return; // non-terminal state - reentry in symbiosis
    }
  }
};

const reloadRoomWithCharacterInIt = <RoomId extends string>({
  gameState,
  playableItems,
  roomId,
}: {
  gameState: GameState<RoomId>;
  playableItems: Array<PlayableItem<CharacterName, NoInfer<RoomId>>>;
  roomId: RoomId;
}) => {
  const { campaign } = gameState;

  const reloadedRoom = loadRoom(
    campaign.rooms[roomId],
    gameState.pickupsCollected[roomId],
  );
  for (const playableItem of playableItems) {
    addItemToRoom({ room: reloadedRoom, item: playableItem });

    if (playableItem.type === "head" || playableItem.type === "headOverHeels") {
      removeHushPuppiesFromRoom(reloadedRoom, gameState);
    }
  }

  return reloadedRoom;
};

const resetPlayableToEntryState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  playableItem: PlayableItem<CharacterName, RoomId>,
  /** if given, will use someone else's entry state. This is only really useful
   * to give headOverHeels heels' entry state when rejoining after losing a life
   */
  whoseEntryState: CharacterName = playableItem.id,
) => {
  const entryState = gameState.entryState[whoseEntryState];

  if (entryState === undefined) {
    //throw new Error(`No entry state for ${whoseEntryState}`);
  }

  playableItem.state = {
    ...playableItem.state,
    ...entryState,
    // clone vels because otherwise the player will mutate it and change their
    // entry state:
    //vels: { ...entryState.vels },
    expires: null,
    standingOnItemId: null,
  };
};

export const individualPlayableLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
  characterLosingLife: PlayableItem<IndividualCharacterName, RoomId>,
) => {
  const otherCharacter = selectPlayableItem(
    gameState,
    otherIndividualCharacterName(characterLosingLife.type),
  );

  characterLosingLife.state.lives--;
  characterLosingLife.state.lastDiedAt = characterLosingLife.state.gameTime;

  if (characterLosingLife.type === "heels") {
    characterLosingLife.state.carrying = null;
  }

  if (characterLosingLife.state.lives === 0) {
    delete gameState.characterRooms[characterLosingLife.id];

    const otherCharacterHasLives = otherCharacter !== undefined;

    if (otherCharacterHasLives) {
      gameState.currentCharacterName = otherCharacter.type;
      return; // non-terminal outcome - continue playing
    } else {
      gameState.events.emit("gameOver");
      return; // terminal outcome - game over
    }
  } else {
    // character losing the life still has lives left
    const roomWithCharacterLosingLife =
      gameState.characterRooms[characterLosingLife.type]!;

    resetPlayableToEntryState(gameState, characterLosingLife);

    const roomWithOtherPlayable =
      otherCharacter === undefined ? undefined : (
        gameState.characterRooms[otherCharacter.type]
      );

    const bothPlayablesInSameRoom =
      roomWithCharacterLosingLife === roomWithOtherPlayable;

    if (bothPlayablesInSameRoom) {
      // case where entered as headOverHeels
      const enteredInSymbiosis =
        gameState.entryState.headOverHeels !== undefined;

      if (enteredInSymbiosis) {
        const headOverHeels = combinePlayablesInSymbiosis({
          // the playable that lost the life will no longer be in the room:

          head:
            characterLosingLife.id === "head" ?
              characterLosingLife
            : roomWithCharacterLosingLife.items.head!,
          heels:
            characterLosingLife.id === "heels" ?
              characterLosingLife
            : roomWithCharacterLosingLife.items.heels!,
        });

        resetPlayableToEntryState(gameState, headOverHeels);

        const reloadedRoom = reloadRoomWithCharacterInIt({
          gameState,
          playableItems: [headOverHeels],
          roomId: roomWithCharacterLosingLife.id,
        });

        gameState.characterRooms = {
          headOverHeels: reloadedRoom,
        };
        gameState.currentCharacterName = "headOverHeels";

        return; // non-terminal outcome - continue playing
      }

      // don't reload the room:
      addItemToRoom({
        room: roomWithCharacterLosingLife,
        item: characterLosingLife,
      });
      return; // non-terminal outcome - continue playing
    } else {
      // the other player isn't in the same room as us:
      const reloadedRoom = reloadRoomWithCharacterInIt({
        gameState,
        playableItems: [characterLosingLife],
        roomId: roomWithCharacterLosingLife.id,
      });
      gameState.characterRooms[characterLosingLife.id] = reloadedRoom;
      return; // non-terminal outcome - continue playing in the reloaded room
    }
  }
};

export const playableLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
  characterLosingLifeItem: PlayableItem<CharacterName, RoomId>,
) => {
  if (characterLosingLifeItem.type === "headOverHeels") {
    combinedPlayableLosesLife(gameState, characterLosingLifeItem);
  } else {
    individualPlayableLosesLife(gameState, characterLosingLifeItem);
  }

  if (selectCurrentPlayableItem(gameState) === undefined) {
    store.dispatch(gameOver());
  }
};
