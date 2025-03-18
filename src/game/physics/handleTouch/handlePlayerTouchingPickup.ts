import type { ItemInPlay } from "../../../model/ItemInPlay";
import { addPokeableNumbers } from "../../../model/ItemStateMap";
import type { CharacterName } from "../../../model/modelTypes";
import {
  crownCollected,
  reincarnationFishEaten,
  scrollRead,
} from "../../../store/slices/gameMenusSlice";
import { store } from "../../../store/store";
import {
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { createSavedGame } from "../../gameState/saving/createSavedGame";
import type { PlayableItem } from "../itemPredicates";
import type { ItemTouchEvent } from "./ItemTouchEvent";

export const handlePlayerTouchingPickup = <
  RoomId extends string,
  RoomItemId extends string,
>(
  e: ItemTouchEvent<
    RoomId,
    RoomItemId,
    PlayableItem<CharacterName, RoomId, RoomItemId>,
    ItemInPlay<"pickup", RoomId, RoomItemId>
  >,
) => {
  const {
    gameState,
    movingItem: player,
    touchedItem: { id: pickupId, config: pickupConfig },
    room: {
      id: roomId,
      roomJson: { items: roomJsonItems },
    },
  } = e;
  const { pickupsCollected } = gameState;

  if (pickupsCollected[roomId]?.[pickupId] === true) {
    // ignore already picked up items
    return;
  }

  // mark the item as picked up, but only if it is in the room's original list of items Eg,
  // if the item is injected at play-time (by cheats or some other mechanic), there's no point
  // marking it as collected or when it generates again it won't be possible to pick up
  if (roomJsonItems[pickupId]) {
    if (pickupsCollected[roomId] === undefined) {
      pickupsCollected[roomId] = {};
    }
    pickupsCollected[roomId][pickupId] = true;
  }

  switch (pickupConfig.gives) {
    case "hooter": {
      const toModify = selectHeadAbilities(player);
      if (toModify !== undefined) {
        toModify.hasHooter = true;
        break;
      }
      break;
    }

    case "doughnuts": {
      const toModify = selectHeadAbilities(player);
      if (toModify !== undefined) {
        toModify.doughnuts = addPokeableNumbers(toModify.doughnuts, 6);
      }
      break;
    }

    case "bag": {
      const toModify = selectHeelsAbilities(player);
      if (toModify !== undefined) {
        toModify.hasBag = true;
        break;
      }
      break;
    }

    case "shield": {
      if (player.type === "headOverHeels") {
        player.state.head.shieldCollectedAt = player.state.head.gameTime;
        player.state.heels.shieldCollectedAt = player.state.heels.gameTime;
      } else {
        player.state.shieldCollectedAt = player.state.gameTime;
      }
      break;
    }

    case "fast": {
      const toModify = selectHeadAbilities(player);
      if (toModify !== undefined) {
        toModify.fastStepsStartedAtDistance = toModify.gameWalkDistance;
      }
      break;
    }

    case "jumps": {
      const toModify = selectHeelsAbilities(player);
      if (toModify !== undefined) {
        toModify.bigJumps += 10;
      }
      break;
    }

    case "extra-life":
      if (player.type === "headOverHeels") {
        player.state.head.lives = addPokeableNumbers(
          player.state.head.lives,
          2,
        );
        player.state.heels.lives = addPokeableNumbers(
          player.state.heels.lives,
          2,
        );
      } else {
        player.state.lives = addPokeableNumbers(player.state.lives, 2);
      }
      break;

    case "scroll":
      // avoid the scroll being closed right away if the player already has jump held:
      store.dispatch(scrollRead(pickupConfig.page));
      break;

    case "reincarnation": {
      store.dispatch(
        reincarnationFishEaten(createSavedGame(gameState, store.getState())),
      );
      break;
    }

    case "crown": {
      // a little experiment- let's go straight to the store, even though
      // we're in the game engine:
      store.dispatch(crownCollected(pickupConfig.planet));
      break;
    }

    default:
      pickupConfig satisfies never;
  }
};
