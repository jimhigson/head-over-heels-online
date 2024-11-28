import type { PlayableItem, ItemInPlay } from "@/model/ItemInPlay";
import { type GameState, currentRoom } from "../../gameState/GameState";
import { fadeInOrOutDuration } from "../../render/animationTimings";
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
  handlePlayerTouchingDisappearing(gameState, player, pickup);

  if (pickup.type === "fish") {
    // TODO: handle fish (saving etc)
  } else {
    switch (pickup.config.gives) {
      case "extra-life":
        player.state.lives += 2;
    }
  }
};

export const handlePlayerTouchingDisappearing = <RoomId extends string>(
  gameState: GameState<RoomId>,
  _player: PlayableItem<RoomId>,
  disappearingItem:
    | ItemInPlay<"pickup", PlanetName, RoomId>
    | ItemInPlay<"fish", PlanetName, RoomId>
    | ItemInPlay<"block", PlanetName, RoomId>
    | ItemInPlay<"barrier", PlanetName, RoomId>,
) => {
  // already disappearing so leave as-is (do not extend the deadline):
  if (disappearingItem.state.expires !== null) return;

  disappearingItem.state.expires = gameState.gameTime + fadeInOrOutDuration;
  disappearingItem.state.unsolidAfterProgression = gameState.progression + 1;
};
