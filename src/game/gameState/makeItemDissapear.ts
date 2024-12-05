import type { ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import type { GameState } from "./GameState";
import { fadeInOrOutDuration } from "../render/animationTimings";

export const makeItemDisappear = <RoomId extends string>(
  disappearingItem:
    | ItemInPlay<"pickup", PlanetName, RoomId>
    | ItemInPlay<"block", PlanetName, RoomId>
    | ItemInPlay<"barrier", PlanetName, RoomId>
    | ItemInPlay<"hushPuppy", PlanetName, RoomId>,
  gameState: GameState<RoomId>,
) => {
  // already disappearing so leave as-is (do not extend the deadline):
  if (disappearingItem.state.expires !== null) return;

  disappearingItem.state.expires = gameState.gameTime + fadeInOrOutDuration;
  disappearingItem.state.unsolidAfterProgression = gameState.progression + 1;
};
