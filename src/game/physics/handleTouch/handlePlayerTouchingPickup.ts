import { isItemType } from "../itemPredicates";
import type { CharacterName } from "@/model/modelTypes";
import type { ItemTouchEvent } from "./ItemTouchEvent";

const isHead = isItemType("head");
const isHeels = isItemType("heels");

export const handlePlayerTouchingPickup = <RoomId extends string>(
  e: ItemTouchEvent<RoomId, CharacterName, "pickup">,
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

    case "scroll":
      // avoid the scroll being closed right away if the player already has jump held:
      gameState.inputState.jump = false;
      gameState.events.emit("scrollOpened", {
        markdown: pickup.config.markdown,
      });
      break;

    case "reincarnation":
      //TODO:
      break;

    case "crown":
      //TODO:
      break;

    default:
      pickup.config satisfies never;
  }
};
