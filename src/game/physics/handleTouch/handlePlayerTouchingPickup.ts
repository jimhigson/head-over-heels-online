import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { itemInPlayCentre } from "../../../model/itemInPlayCentre";
import { addPokeableNumbers } from "../../../model/ItemStateMap";
import type { CharacterName } from "../../../model/modelTypes";
import { blockSizePx } from "../../../sprites/spritePivots";
import {
  crownCollected,
  reincarnationFishEaten,
  scrollRead,
} from "../../../store/slices/gameMenusSlice";
import { store } from "../../../store/store";
import { addXyz, originXyz } from "../../../utils/vectors/vectors";
import {
  selectHeadAbilities,
  selectHeelsAbilities,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { createSavedGame } from "../../gameState/saving/createSavedGame";
import type { PlayableItem } from "../itemPredicates";
import type { ItemTouchEvent } from "./ItemTouchEvent";

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
  const { gameState, movingItem: player, touchedItem, room } = e;
  const { id: pickupId, config: pickupConfig } = touchedItem;
  const {
    id: roomId,
    roomJson: { items: roomJsonItems },
    roomTime,
  } = room;
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

  const addFloatingText = (textLines: string[]) => {
    const pickupCentre = itemInPlayCentre(touchedItem);
    const floatingTextItem: ItemInPlay<"floatingText"> = {
      type: "floatingText",
      id: `floatingText-${pickupId}` as RoomItemId,
      ...defaultItemProperties,
      fixedZIndex: 999, // high number ensures is always in front
      aabb: originXyz, // zero-size per aabb
      state: {
        ...defaultBaseState(),
        position: addXyz(pickupCentre, { z: blockSizePx.h / 2 }),
        expires: roomTime + floatingTextLife,
      },
      config: {
        textLines,
        appearanceRoomTime: roomTime,
      },
    };
    addItemToRoom({ room, item: floatingTextItem });
  };

  switch (pickupConfig.gives) {
    case "hooter": {
      const toModify = selectHeadAbilities(player);
      if (toModify !== undefined) {
        toModify.hasHooter = true;
      }
      addFloatingText(["hooter", "collected"]);
      break;
    }

    case "doughnuts": {
      const toModify = selectHeadAbilities(player);
      if (toModify !== undefined) {
        toModify.doughnuts = addPokeableNumbers(toModify.doughnuts, 6);
      }
      addFloatingText(["+6", "doughnuts"]);
      break;
    }

    case "bag": {
      const toModify = selectHeelsAbilities(player);
      if (toModify !== undefined) {
        toModify.hasBag = true;
      }
      addFloatingText(["bag", "collected"]);
      break;
    }

    case "shield": {
      if (player.type === "headOverHeels") {
        player.state.head.shieldCollectedAt = player.state.head.gameTime;
        player.state.heels.shieldCollectedAt = player.state.heels.gameTime;
      } else {
        player.state.shieldCollectedAt = player.state.gameTime;
      }
      addFloatingText(["🛡", "shield"]);
      break;
    }

    case "fast": {
      const toModify = selectHeadAbilities(player);
      if (toModify !== undefined) {
        toModify.fastStepsStartedAtDistance = toModify.gameWalkDistance;
      }
      addFloatingText(["⚡", "fast steps"]);
      break;
    }

    case "jumps": {
      const toModify = selectHeelsAbilities(player);
      if (toModify !== undefined) {
        toModify.bigJumps += 10;
      }
      addFloatingText(["♨", "10", "big jumps"]);
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
        addFloatingText(["+2", "lives", "each"]);
      } else {
        player.state.lives = addPokeableNumbers(player.state.lives, 2);
        addFloatingText(["+2", "lives"]);
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
      addFloatingText(["reincarnation", "point", "saved"]);
      break;
    }

    case "crown": {
      // a little experiment- let's go straight to the store, even though
      // we're in the game engine:
      store.dispatch(crownCollected(pickupConfig.planet));
      addFloatingText([pickupConfig.planet, "liberated!"]);
      break;
    }

    default:
      pickupConfig satisfies never;
  }
};
