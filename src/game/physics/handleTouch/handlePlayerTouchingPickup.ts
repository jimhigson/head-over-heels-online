import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { type ItemInPlay } from "../../../model/ItemInPlay";
import { itemInPlayCentre } from "../../../model/itemInPlayCentre";
import { addPokeableNumbers } from "../../../model/ItemStateMap";
import { type CharacterName } from "../../../model/modelTypes";
import {
  crownCollected,
  reincarnationFishEaten,
  scrollRead,
} from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { store } from "../../../store/store";
import { addXyz, boxWithSize, originXyz } from "../../../utils/vectors/vectors";
import {
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { createSavedGame } from "../../gameState/saving/createSavedGame";
import { saveGameThunk } from "../../gameState/saving/saveGameThunk";
import { floatingTextFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { type PlayableItem } from "../itemPredicates";
import { blockSizePx } from "../mechanicsConstants";
import { type ItemTouchEvent } from "./ItemTouchEvent";

/**
 * how long to keep the floating text item in the room?
 * this just has to be long enough that the last line of text
 * is gone
 */
const floatingTextLife = 3_000;

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
    touchedItem,
    room: roomWithPickup,
  } = e;
  const { id: pickupId, config: pickupConfig } = touchedItem;
  const {
    id: roomId,
    roomJson: { items: roomJsonItems },
    roomTime,
  } = roomWithPickup;
  const { pickupsCollected } = gameState;

  if (pickupsCollected[roomId]?.[pickupId] === true) {
    // ignore already picked up items
    return;
  }

  // mark the item as picked up, but only if it is in the room's original list of items Eg,
  // if the item is injected at play-time (by cheats or some other mechanic), there's no point
  // marking it as collected or when it generates again it won't be possible to pick up
  const pickupWasCollected = () => {
    if (roomJsonItems[pickupId]) {
      if (pickupsCollected[roomId] === undefined) {
        pickupsCollected[roomId] = {};
      }
      pickupsCollected[roomId][pickupId] = true;
    }

    // probably a good time to save the game:
    store.dispatch(saveGameThunk(gameState));
  };

  const loadFloatingText = (textLines: string[]) => {
    const pickupCentre = itemInPlayCentre(touchedItem);
    const floatingTextItem: ItemInPlay<"floatingText", RoomId, RoomItemId> = {
      type: "floatingText",
      // floating text animates from its appearanceRoomTime, not the hash (only
      // used to de-synchronise animations), so the hash is irrelevant:
      hash: 0,
      id: `floatingText-${pickupId}` as RoomItemId,
      ...defaultItemProperties,
      fixedZIndex: floatingTextFixedZIndex, // high number ensures is always in front
      state: {
        ...defaultBaseState(),
        // zero-size box:
        box: boxWithSize(
          addXyz(pickupCentre, { z: blockSizePx.z / 2 }),
          originXyz,
        ),
        expires: roomTime + floatingTextLife,
      },
      config: {
        textLines,
        appearanceRoomTime: roomTime,
      },
    };
    return floatingTextItem;
  };

  switch (pickupConfig.gives) {
    case "hooter": {
      const toModify = selectHeadAbilities(player);
      if (toModify === undefined) {
        return;
      }
      toModify.hasHooter = true;
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText(["HOOTER", "COLLECTED"]),
      });
      pickupWasCollected();
      break;
    }

    case "doughnuts": {
      const toModify = selectHeadAbilities(player);
      if (toModify === undefined) {
        return;
      }
      toModify.doughnuts = addPokeableNumbers(toModify.doughnuts, 6);
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText(["+6", "DOUGHNUTS"]),
      });
      pickupWasCollected();
      break;
    }

    case "bag": {
      const toModify = selectHeelsAbilities(player);
      if (toModify === undefined) {
        return;
      }
      toModify.hasBag = true;
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText(["BAG", "COLLECTED"]),
      });
      pickupWasCollected();
      break;
    }

    case "shield": {
      if (player.type === "headOverHeels") {
        player.state.head.shieldCollectedAt = player.state.head.gameTime;
        player.state.heels.shieldCollectedAt = player.state.heels.gameTime;
      } else {
        player.state.shieldCollectedAt = player.state.gameTime;
      }
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText(["🛡", "SHIELD"]),
      });
      pickupWasCollected();
      break;
    }

    case "fast": {
      const toModify = selectHeadAbilities(player);
      if (toModify === undefined) {
        return;
      }
      toModify.fastStepsStartedAtDistance = toModify.gameWalkDistance;
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText(["⚡", "FAST STEPS"]),
      });
      pickupWasCollected();
      break;
    }

    case "jumps": {
      const toModify = selectHeelsAbilities(player);
      if (toModify === undefined) {
        return;
      }
      toModify.bigJumps += 10;
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText(["♨", "10", "BIG JUMPS"]),
      });
      pickupWasCollected();
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
        addItemToRoom({
          room: roomWithPickup,
          item: loadFloatingText(["+2", "LIVES", "EACH"]),
        });
      } else {
        player.state.lives = addPokeableNumbers(player.state.lives, 2);
        addItemToRoom({
          room: roomWithPickup,
          item: loadFloatingText(["+2", "LIVES"]),
        });
      }
      pickupWasCollected();
      break;

    case "scroll":
      // avoid the scroll being closed right away if the player already has jump held:
      store.dispatch(scrollRead(pickupConfig));
      pickupWasCollected();
      break;

    case "reincarnation": {
      // mark as collected before creating the save, so it is also collected in the saved game
      pickupWasCollected();

      const savedGame = createSavedGame(gameState, store.getState(), {
        characterPickingUp: player.type,
        pickupId,
      });

      // add text into the saved version of the room for when it is restored:
      // note there could be multiple copies of the room in the saved game:
      for (const savedRoom of Object.values(
        savedGame.gameState.characterRooms,
      )) {
        if (savedRoom.id === roomWithPickup.id) {
          const floatingText = loadFloatingText([
            "REINCARNATION",
            "POINT",
            "RESTORED",
          ]);
          // saved games are unindexed, so add the 'restored' version directly
          // to the room:
          savedRoom.items[floatingText.id] = floatingText;
        }
      }

      store.dispatch(reincarnationFishEaten(savedGame));
      // adding the floating text after saving the reincarnation point means the text won't be
      // in the reloaded room
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText(["REINCARNATION", "POINT", "SAVED"]),
      });

      break;
    }

    case "crown": {
      // a little experiment- let's go straight to the store, even though
      // we're in the game engine:
      store.dispatch(crownCollected(pickupConfig.planet));
      addItemToRoom({
        room: roomWithPickup,
        item: loadFloatingText([
          pickupConfig.planet.toUpperCase(),
          "LIBERATED!",
        ]),
      });
      pickupWasCollected();
      break;
    }

    default:
      pickupConfig satisfies never;
  }
};
