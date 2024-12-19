import type {
  CharacterName,
  IndividualCharacterName,
} from "@/model/modelTypes";
import { otherIndividualCharacterName } from "@/model/modelTypes";
import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import { selectPlayableItem } from "../gameStateSelectors/selectPlayableItem";
import { addItemToRoom } from "./addItemToRoom";
import type { PlayableItem } from "@/game/physics/itemPredicates";
import {
  combinePlayablesInSymbiosis,
  uncombinePlayablesFromSymbiosis,
} from "./symbiosis";
import { entryState } from "../PlayableEntryState";
import { collision1to1 } from "@/game/collision/aabbCollision";

export const combinedPlayableLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
  headOverHeels: PlayableItem<"headOverHeels", RoomId>,
) => {
  const room = gameState.characterRooms["headOverHeels"]!;

  headOverHeels.state.head.lives--;
  headOverHeels.state.heels.lives--;

  const totalLivesRemaining =
    headOverHeels.state.head.lives + headOverHeels.state.heels.lives;
  if (totalLivesRemaining === 0) {
    gameState.events.emit("gameOver");
    return; // terminal outcome - game over
  }

  const headHasLives = headOverHeels.state.head.lives > 0;
  const heelsHasLives = headOverHeels.state.heels.lives > 0;

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
      const reloadedRoom = reloadRoomWithCharacterInIt({
        gameState,
        playableItems: [headOverHeels],
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
  }

  return reloadedRoom;
};

const resetPlayableToEntryState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  playableItem: PlayableItem<CharacterName, RoomId>,
) => {
  const entryState = gameState.entryState[playableItem.id]!;

  playableItem.state = {
    ...playableItem.state,
    ...entryState,
    expires: null,
    standingOn: null,
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
          head: roomWithCharacterLosingLife.items.head!,
          heels: roomWithCharacterLosingLife.items.heels!,
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
};
