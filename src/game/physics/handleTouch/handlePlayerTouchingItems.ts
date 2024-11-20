import type {
  ItemInPlay,
  PlayableItem,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { handlePlayerTouchingDeadly } from "./handlePlayerTouchingDeadly";
import { handlePlayerTouchingPickup } from "./handlePlayerTouchingPickup";
import { handlePlayerTouchingPortal } from "./handlePlayerTouchingPortal";
import type { Xyz } from "@/utils/vectors";
import type { GameState } from "@/game/gameState/GameState";

/**
 * @returns true is the physics needs to halt after this handler
 */
export const handlePlayerTouchingItems = <RoomId extends string>(
  playableItem: PlayableItem<RoomId>,
  collisions: Iterable<UnknownItemInPlay<RoomId>>,
  xyzDelta: Xyz,
  gameState: GameState<RoomId>,
) => {
  const {
    portal = [],
    deadly = [],
    pickup = [],
  } = Object.groupBy(collisions, (item) => {
    switch (item.type) {
      case "baddie":
      case "deadly-block":
        return "deadly";
      case "floor":
        return item.config.deadly ? "deadly" : "other";
      case "portal":
        return "portal";
      case "pickup":
        return "pickup";
    }
    return "other"; // no special behaviour for player colliding with
  }) as {
    portal: Array<ItemInPlay<"portal", PlanetName, RoomId>>;
    deadly: Array<
      | ItemInPlay<"baddie", PlanetName, RoomId>
      | ItemInPlay<"deadly-block", PlanetName, RoomId>
      | ItemInPlay<"floor", PlanetName, RoomId>
    >;
    pickup: Array<ItemInPlay<"pickup", PlanetName, RoomId>>;
  };

  const firstPortal = portal.at(0);

  if (firstPortal !== undefined) {
    if (
      handlePlayerTouchingPortal(gameState, playableItem, firstPortal, xyzDelta)
    ) {
      // has activated the portal:
      return true;
    }
  }

  if (deadly?.length > 0) {
    if (handlePlayerTouchingDeadly<RoomId>(gameState, playableItem)) {
      return true;
    }
  }
  for (const p of pickup) {
    handlePlayerTouchingPickup(gameState, playableItem, p);
  }

  return false;
};
