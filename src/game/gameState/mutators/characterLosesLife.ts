import type { PokeableNumber } from "../../../model/ItemStateMap";
import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import type { PlayableItem } from "../../physics/itemPredicates";
import type { GameState } from "../GameState";

import {
  addPokeableNumbers,
  pokeableToNumber,
} from "../../../model/ItemStateMap";
import { otherIndividualCharacterName } from "../../../model/modelTypes";
import { selectCurrentCampaign } from "../../../store/slices/gameMenus/gameMenusSelectors";
import {
  gameOver,
  lostLife,
} from "../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../store/store";
import { emptyObject } from "../../../utils/empty";
import { collision1to1 } from "../../collision/aabbCollision";
import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../gameStateSelectors/selectPlayableItem";
import { loadRoom } from "../loadRoom/loadRoom";
import { entryState } from "../PlayableEntryState";
import { addItemToRoom } from "./addItemToRoom";
import { removeHushPuppiesFromRoom } from "./removeHushPuppiesFromRoom";
import {
  combinePlayablesInSymbiosis,
  uncombinePlayablesFromSymbiosis,
} from "./symbiosis";

/**
 * copy the invoation from Retrospec to avoid an unwinnable game when one
 * character loses all their lives but the other is still playing while still
 * making getting down to zero lives a problem
 * */
const loseLifeWithRetrospecModelLivesTransfer = (
  characterLosingLifeState: { lives: PokeableNumber },
  otherCharacterState?: { lives: PokeableNumber },
) => {
  characterLosingLifeState.lives = addPokeableNumbers(
    characterLosingLifeState.lives,
    -1,
  );

  // allow the other player to send one of their lives over - this is the Retrospec revised lives model
  // and avoids an unwinnable situation where one player has lost all their lives but the other continues playing
  // an unwinnable game:
  if (
    characterLosingLifeState.lives === 0 &&
    otherCharacterState !== undefined
  ) {
    const otherCharacterLives = pokeableToNumber(otherCharacterState.lives);

    if (otherCharacterLives >= 2) {
      characterLosingLifeState.lives = addPokeableNumbers(
        characterLosingLifeState.lives,
        1,
      );
      otherCharacterState.lives = addPokeableNumbers(
        otherCharacterState.lives,
        otherCharacterLives > 2 ?
          // sacrifice two to continue with one:
          -2
          // make an exception if the other character has exactly 2 lives left -
          // they can give one life but keep one so they can continue playing:
        : -1,
      );
    }
  }
};

const combinedPlayableLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
  headOverHeels: PlayableItem<"headOverHeels", RoomId>,
) => {
  const room = gameState.characterRooms["headOverHeels"]!;

  loseLifeWithRetrospecModelLivesTransfer(
    headOverHeels.state.head,
    headOverHeels.state.heels,
  );

  loseLifeWithRetrospecModelLivesTransfer(
    headOverHeels.state.heels,
    headOverHeels.state.head,
  );

  headOverHeels.state.head.lastDiedAt = headOverHeels.state.head.gameTime;
  headOverHeels.state.heels.lastDiedAt = headOverHeels.state.heels.gameTime;

  const totalLivesRemaining = addPokeableNumbers(
    headOverHeels.state.head.lives,
    headOverHeels.state.heels.lives,
  );
  if (totalLivesRemaining === 0) {
    return; // terminal outcome - game over should now be dispatched from the caller
  }

  const headHasLives = pokeableToNumber(headOverHeels.state.head.lives) > 0;
  const heelsHasLives = pokeableToNumber(headOverHeels.state.heels.lives) > 0;

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
  const campaign = selectCurrentCampaign<RoomId>(store.getState());

  const reloadedRoom = loadRoom({
    roomJson: campaign.rooms[roomId],
    roomPickupsCollected: gameState.pickupsCollected[roomId] ?? emptyObject,
    scrollsRead: store.getState().gameMenus.gameInPlay.scrollsRead,
  });
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
  /** TODO: @knownRoomIds - remove cast */
  whoseEntryState: CharacterName = playableItem.id as CharacterName,
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

const individualPlayableLosesLife = <
  RoomId extends string,
  RoomItemId extends string,
>(
  gameState: GameState<RoomId>,
  characterLosingLife: PlayableItem<
    IndividualCharacterName,
    RoomId,
    RoomItemId
  >,
) => {
  const otherCharacter = selectPlayableItem(
    gameState,
    otherIndividualCharacterName(characterLosingLife.type),
  );

  characterLosingLife.state.lastDiedAt = characterLosingLife.state.gameTime;

  if (characterLosingLife.type === "heels") {
    characterLosingLife.state.carrying = null;
  }

  loseLifeWithRetrospecModelLivesTransfer(
    characterLosingLife.state,
    otherCharacter?.state,
  );

  if (characterLosingLife.state.lives === 0) {
    delete gameState.characterRooms[characterLosingLife.id as CharacterName];

    const otherCharacterHasLives = otherCharacter !== undefined;

    if (otherCharacterHasLives) {
      gameState.currentCharacterName = otherCharacter.type;
      // non-terminal outcome - game will continue playing
    } // else is terminal outcome - game over. gameOver actions should now be dispatched from the caller

    return;
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
          /** TODO: @knownRoomIds - remove casts */
          head: (characterLosingLife.id === "head" ?
            characterLosingLife
          : roomWithCharacterLosingLife.items.head!) as PlayableItem<
            "head",
            RoomId,
            RoomItemId
          >,
          /** TODO: @knownRoomIds - remove casts */
          heels: (characterLosingLife.id === "heels" ?
            characterLosingLife
          : roomWithCharacterLosingLife.items.heels!) as PlayableItem<
            "heels",
            RoomId,
            RoomItemId
          >,
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
      /** TODO: @knownRoomIds - remove casts */
      gameState.characterRooms[characterLosingLife.id as CharacterName] =
        reloadedRoom;
      return; // non-terminal outcome - continue playing in the reloaded room
    }
  }
};

export const playableLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
  characterLosingLifeItem: PlayableItem<CharacterName, RoomId>,
) => {
  store.dispatch(lostLife({ characterLosingLifeItem }));
  if (characterLosingLifeItem.type === "headOverHeels") {
    combinedPlayableLosesLife(gameState, characterLosingLifeItem);
  } else {
    individualPlayableLosesLife(gameState, characterLosingLifeItem);
  }

  if (selectCurrentPlayableItem(gameState) === undefined) {
    store.dispatch(gameOver({ offerReincarnation: true }));
  }
};
