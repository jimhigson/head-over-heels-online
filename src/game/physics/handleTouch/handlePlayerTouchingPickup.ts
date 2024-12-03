import type { PlayableItem, ItemInPlay } from "@/model/ItemInPlay";
import { type GameState, currentRoom } from "../../gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import type { CharacterName } from "@/model/modelTypes";
import { makeItemDisappear } from "@/game/gameState/makeItemDissapear";

export const handlePlayerTouchingPickup = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem<CharacterName, RoomId>,
  pickup: ItemInPlay<"pickup", PlanetName, RoomId>,
) => {
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
  handlePlayerTouchingDisappearing(gameState, player, pickup);

  switch (pickup.config.gives) {
    case "hooter": {
      if (player.type === "head") {
        player.state.hasHooter = true;
        break;
      }
      break;
    }

    case "donuts": {
      if (player.type === "head") {
        player.state.donuts += 6;
        break;
      }
      break;
    }

    case "bag": {
      if (player.type === "heels") {
        player.state.hasBag = true;
        break;
      }
      break;
    }

    case "shield": {
      player.state.shield = 99;
      break;
    }

    case "fast": {
      if (player.type === "head") {
        player.state.fastSteps = 99;
      }
      break;
    }

    case "jumps": {
      if (player.type === "heels") {
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

export const handlePlayerTouchingDisappearing = <RoomId extends string>(
  gameState: GameState<RoomId>,
  _player: PlayableItem<CharacterName, RoomId>,
  disappearingItem:
    | ItemInPlay<"pickup", PlanetName, RoomId>
    | ItemInPlay<"block", PlanetName, RoomId>
    | ItemInPlay<"barrier", PlanetName, RoomId>,
) => {
  makeItemDisappear(disappearingItem, gameState);
};
