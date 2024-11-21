import type { PlayableItem, ItemInPlay } from "@/model/ItemInPlay";
import { type GameState, currentRoom } from "../../gameState/GameState";
import { characterFadeInOrOutDuration } from "../../render/animationTimings";
import type { PlanetName } from "@/sprites/planets";

export const handlePlayerTouchingPickup = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem<RoomId>,
  pickup:
    | ItemInPlay<"pickup", PlanetName, RoomId>
    | ItemInPlay<"fish", PlanetName, RoomId>,
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
  pickup.state.expires = gameState.gameTime + characterFadeInOrOutDuration;

  if (pickup.type === "fish") {
    // TODO: handle fish (saving etc)
  } else {
    switch (pickup.config.gives) {
      case "extra-life":
        player.state.lives += 2;
    }
  }
};
