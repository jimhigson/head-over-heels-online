import { isItemType } from "../itemPredicates";
import { currentRoom } from "../../gameState/GameState";
import type { CharacterName } from "@/model/modelTypes";
import { makeItemFadeOut } from "@/game/gameState/mutators/makeItemFadeOut";
import type { ItemTouchEvent } from "./ItemTouchEvent";

const isHead = isItemType("head");
const isHeels = isItemType("heels");

export const handlePlayerTouchingPickup = <RoomId extends string>({
  gameState,
  movingItem: player,
  touchedItem: pickup,
}: ItemTouchEvent<RoomId, CharacterName, "pickup">) => {
  const roomId = currentRoom(gameState).id;
  if (gameState.pickupsCollected[roomId][pickup.id] === true) {
    // ignore already picked up items
    return;
  }

  const roomPickupCollections = gameState.pickupsCollected[roomId] as Record<
    string,
    true
  >;
  roomPickupCollections[pickup.id] = true;
  makeItemFadeOut(pickup, gameState);

  switch (pickup.config.gives) {
    case "hooter": {
      if (isHead(player)) {
        player.state.hasHooter = true;
        break;
      }
      break;
    }

    case "donuts": {
      if (isHead(player)) {
        player.state.donuts += 6;
        break;
      }
      break;
    }

    case "bag": {
      if (isHeels(player)) {
        player.state.hasBag = true;
        break;
      }
      break;
    }

    case "shield": {
      player.state.shieldCollectedAt = gameState.gameTime;
      break;
    }

    case "fast": {
      if (isHead(player)) {
        player.state.fastSteps = 99;
      }
      break;
    }

    case "jumps": {
      if (isHeels(player)) {
        player.state.bigJumps = 10;
      }
      break;
    }

    case "extra-life":
      player.state.lives += 2;
      break;

    case "reincarnation":
      //TODO:
      break;

    case "crown":
      //TODO:
      break;
  }
};
