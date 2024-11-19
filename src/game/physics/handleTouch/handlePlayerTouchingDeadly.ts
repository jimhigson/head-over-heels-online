import type { GameState } from "@/game/gameState/GameState";
import { characterFadeInOrOutDuration } from "@/game/render/animationTimings";
import type { PlayableItem } from "@/model/ItemInPlay";

export function handlePlayerTouchingDeadly<RoomId extends string>(
  gameState: GameState<RoomId>,
  subjectItem: PlayableItem<string>,
) {
  subjectItem.state.action = "death";
  subjectItem.state.expires = gameState.gameTime + characterFadeInOrOutDuration;
}
