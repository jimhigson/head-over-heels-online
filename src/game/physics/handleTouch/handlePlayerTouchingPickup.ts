import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { CharacterName } from "../../../model/modelTypes";
import {
  crownCollected,
  scrollRead,
} from "../../../store/slices/gameMenusSlice";
import { saveFish } from "../../../store/slices/savedGamesSlice";
import { store } from "../../../store/store";
import { pick } from "../../../utils/pick";
import {
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import {
  savedGameGameMenuSliceFields,
  savedGameGameStateFields,
  type SavedGameState,
} from "../../gameState/SavedGameState";
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
    touchedItem: pickup,
    room: { id: roomId },
  } = e;

  if (gameState.pickupsCollected[roomId][pickup.id] === true) {
    // ignore already picked up items
    return;
  }

  const roomPickupCollections = gameState.pickupsCollected[roomId] as Record<
    string,
    true
  >;
  roomPickupCollections[pickup.id] = true;

  switch (pickup.config.gives) {
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
        toModify.doughnuts += 6;
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
        player.state.head.lives += 2;
        player.state.heels.lives += 2;
        break;
      } else {
        player.state.lives += 2;
      }
      break;

    case "scroll":
      // avoid the scroll being closed right away if the player already has jump held:
      store.dispatch(scrollRead(pickup.config.page));
      break;

    case "reincarnation": {
      // we stringify->parse (not structuredClone) because we want to
      // explicitly find circular structures or non-serializable data
      const savedGameState: SavedGameState = JSON.parse(
        JSON.stringify({
          saveTime: Date.now(),
          screenshotBase64: "IAMANIMAGE",
          ...pick(gameState, ...savedGameGameStateFields),
          ...pick(store.getState().gameMenus, ...savedGameGameMenuSliceFields),
        }),
      );
      console.log("fish is saving", savedGameState);
      store.dispatch(saveFish(savedGameState));
      break;
    }

    case "crown": {
      // a little experiment- let's go straight to the store, even though
      // we're in the game engine:
      store.dispatch(crownCollected(pickup.config.planet));
      break;
    }

    default:
      pickup.config satisfies never;
  }
};
