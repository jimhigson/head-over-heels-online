import { Application } from "pixi.js";
import { type Campaign } from "../model/modelTypes";
import { changeCharacterRoom } from "./gameState/mutators/changeCharacterRoom";
import { listenForInput } from "./input/listenForInput";
import { initGameState } from "./gameState/initGameState";
import type { GameApi } from "./GameApi";
import { selectCurrentPlayableItem } from "./gameState/gameStateSelectors/selectPlayableItem";
import { initDevtools } from "@pixi/devtools";
import { selectCurrentRoomState } from "./gameState/GameState";
import { MainLoop } from "./mainLoop/mainLoop";
import type { Xy } from "../utils/vectors/vectors";

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaign: Campaign<RoomId>,
): Promise<GameApi<RoomId>> => {
  const app = new Application();
  if (import.meta.env.MODE === "development") {
    initDevtools({ app });
  }
  await app.init({ background: "#000000" });

  const gameState = initGameState({ campaign });
  const stopListeningForInput = listenForInput({
    inputState: gameState.inputState,
    onInputStateChange(inputStateChangeEvent) {
      gameState.events.emit("inputStateChanged", inputStateChangeEvent);
    },
  });

  const loop = new MainLoop(app, gameState).start();

  return {
    campaign,
    events: gameState.events,
    renderIn(containerElement) {
      containerElement.appendChild(app.canvas);
    },
    resizeTo(newSize: Xy) {
      console.log("explicitly setting app renderer size to", newSize);
      // app.resizeTo is not very reliable - it only resizes if the window resizes. That's usually
      // fine, but if the upscale changes without a window resize it can mean that we get the wrong size initially
      // instead - be explicit about it:
      app.renderer.resize(newSize.x, newSize.y);
    },
    changeRoom(roomId: RoomId) {
      changeCharacterRoom({
        playableItem: selectCurrentPlayableItem(gameState),
        gameState,
        toRoomId: roomId,
        changeType: "level-select",
      });
    },
    get currentRoom() {
      return selectCurrentRoomState(gameState);
    },
    get gameState() {
      return gameState;
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
