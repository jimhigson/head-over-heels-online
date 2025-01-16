import { Application } from "pixi.js";
import { type Campaign } from "../model/modelTypes";
import { selectCurrentRoom } from "@/game/gameState/GameState";
import { changeCharacterRoom } from "./gameState/mutators/changeCharacterRoom";
import { listenForInput } from "./input/listenForInput";
import { initGameState } from "./gameState/initGameState";
import { type RenderOptions } from "./RenderOptions";
import { mainLoop } from "./mainLoop/mainLoop";
import type { GameApi } from "./GameApi";
import { selectCurrentPlayableItem } from "./gameState/gameStateSelectors/selectPlayableItem";
import { initDevtools } from "@pixi/devtools";

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaign: Campaign<RoomId>,
  renderOptions: RenderOptions,
): Promise<GameApi<RoomId>> => {
  const app = new Application();
  if (import.meta.env.MODE === "development") {
    initDevtools({ app });
  }
  await app.init({ background: "#000000", resizeTo: window });

  const gameState = initGameState({ campaign, renderOptions });
  const stopListeningForInput = listenForInput({
    inputAssignmentHandle: gameState,
    inputState: gameState.inputState,
    onInputStateChange(inputState) {
      gameState.events.emit("inputStateChanged", inputState);
    },
  });

  const loop = mainLoop(app, gameState).start();

  return {
    campaign,
    events: gameState.events,
    renderIn(containerElement) {
      containerElement.appendChild(app.canvas);
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
      return selectCurrentRoom(gameState);
    },
    get gameState() {
      return gameState;
    },
    set renderOptions(options: RenderOptions) {
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
