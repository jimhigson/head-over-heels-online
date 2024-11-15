import type { GameState } from "@/game/gameState/GameState";
import { progressGameState } from "@/game/mainLoop/progressGameState";
import type { TestRoomId } from "./basicRoom";

export const playGameThrough = (
  gameState: GameState<TestRoomId>,
  {
    frameRate = 60,
    forTime = 1000,
    frameCallback = (gameState) => gameState,
  }: {
    frameRate?: number;
    forTime?: number;
    /**
     * allows us to change the gamestate after certain frames, for example to change the
     * joystick input while the simulation is running
     */
    frameCallback?: (gameState: GameState<TestRoomId>) => GameState<TestRoomId>;
  } = { frameRate: 60, forTime: 1000 },
) => {
  const deltaMS = 1000 / frameRate;

  while (gameState.gameTime < forTime) {
    progressGameState(gameState, deltaMS);
    gameState = frameCallback(gameState);
  }
};
