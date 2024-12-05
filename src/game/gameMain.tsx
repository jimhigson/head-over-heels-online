import { Application } from "pixi.js";
import { type Campaign } from "../model/modelTypes";
import { currentRoom } from "@/game/gameState/GameState";
import { changeCharacterRoom } from "./gameState/gameStateTransitions/changeCharacterRoom";
import { listenForInput } from "./input/listenForInput";
import { initGameState } from "./gameState/initGameState";
import type { RenderOptions } from "./RenderOptions";
import { mainLoop } from "./mainLoop/mainLoop";
import type { GameApi } from "./GameApi";

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaign: Campaign<RoomId>,
): Promise<GameApi<RoomId>> => {
  // TODO: re-render on HMR: https://vite.dev/guide/api-hmr.html

  const renderOptions: RenderOptions<RoomId> = { showBoundingBoxes: "none" };

  // the viewing room isn't necessarily the room of the curren playable character,
  // but only because I allow click-through for debugging

  // can set: {resizeTo: document.querySelector('.pixi-container')} to resize the app in a different container
  // (ie, a div created by react) and also {resolution:4} to do some resolution scaling
  const app = new Application();
  await app.init({ background: "#000000", resizeTo: window });

  const gameState = initGameState(campaign, renderOptions);
  const stopListeningForInput = listenForInput(gameState);

  const loop = mainLoop(app, gameState).start();

  return {
    campaign,
    events: gameState.events,
    renderIn(gameDiv) {
      gameDiv.appendChild(app.canvas);
    },
    changeRoom(roomId: RoomId) {
      changeCharacterRoom({
        gameState,
        toRoomId: roomId,
        changeType: "level-select",
      });
    },
    get currentRoom() {
      return currentRoom(gameState);
    },
    get gameState() {
      return gameState;
    },
    set renderOptions(options: RenderOptions<RoomId>) {
      gameState.renderOptions = options;
    },
    stop() {
      console.warn("tearing down game");
      app.canvas.parentNode?.removeChild(app.canvas);
      loop.stop();
      stopListeningForInput();
      app.destroy();
    },
  };
};
