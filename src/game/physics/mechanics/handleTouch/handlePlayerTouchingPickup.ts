import type { PlayableItem, ItemInPlay } from "@/model/ItemInPlay";
import {
  type GameState,
  currentRoom,
  pickupCollected,
} from "../../../gameState/GameState";
import { teleportAnimationDuration } from "../../../render/animationTimings";

export const handlePlayerTouchingPickup = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem,
  pickup: ItemInPlay<"pickup">,
) => {
  const roomId = currentRoom(gameState).id;
  if (pickupCollected(gameState, roomId, pickup.id)) {
    // ignore already picked up items
    return;
  }

  const roomPickupCollections = gameState.pickupsCollected[roomId] as Record<
    string,
    true
  >;
  roomPickupCollections[pickup.id] = true;
  pickup.state.expires = gameState.gameTime + teleportAnimationDuration;
  pickup.renderingDirty = true;

  switch (pickup.config.gives) {
    case "extra-life":
      player.state.lives += 2;
  }
};
