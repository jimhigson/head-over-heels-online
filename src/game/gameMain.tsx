import { Application, Container } from "pixi.js";
import { Campaign } from "../model/modelTypes";
import { currentRoom } from "@/game/gameState/GameState";
import { changeCharacterRoom } from "./gameState/changeCharacterRoom";
import { zxSpectrumResolution } from "../originalGame";
import mitt from "mitt";
import { listenForInput } from "./input/listenForInput";
import { initGameState } from "./gameState/initGameState";
import { upscale } from "./upscale";
import { RenderOptions } from "./RenderOptions";
import { mainLoop } from "./physics/mainLoop";
import { ApiEvents, GameApi } from "./GameApi";

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaign: Campaign<RoomId>,
): Promise<GameApi<RoomId>> => {
  // TODO: re-render on HMR: https://vite.dev/guide/api-hmr.html

  const renderOptions: RenderOptions<RoomId> = { showBoundingBoxes: false };

  // the viewing room isn't necessarily the room of the curren playable character,
  // but only because I allow click-through for debugging

  const app = new Application();
  await app.init({ background: "#000000", resizeTo: window });

  const apiEvents = mitt<ApiEvents<RoomId>>();

  const worldContainer = new Container();
  app.stage.addChild(worldContainer);

  const gameState = initGameState(campaign, renderOptions, apiEvents);
  const inputStop = listenForInput(gameState);
  upscale(app, worldContainer);

  const loop = mainLoop(app, gameState, worldContainer).start();

  worldContainer.y = zxSpectrumResolution.height * 0.7;

  return {
    campaign,
    events: apiEvents,
    renderIn(gameDiv) {
      gameDiv.appendChild(app.canvas);
    },
    changeRoom(roomId: RoomId) {
      changeCharacterRoom(gameState, roomId);
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
      console.log("tearing down game");
      app.stage.removeChild(worldContainer);
      app.canvas.parentNode?.removeChild(app.canvas);
      loop.stop();
      inputStop();
      app.destroy();
    },
  };
};
