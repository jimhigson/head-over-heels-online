import { Application, Container } from "pixi.js";
import { Campaign, RoomState } from "../model/modelTypes";
import { currentRoom, GameState } from "@/game/gameState/GameState";
import { zxSpectrumResolution } from "../originalGame";
import mitt, { Emitter } from "mitt";
import { loadRoom } from "./gameState/loadRoom/loadRoom";
import { PlanetName } from "@/sprites/planets";
import { listenForInput } from "./input/listenForInput";
import { initGameState } from "./gameState/initGameState";
import { upscale } from "./upscale";
import { renderRoom } from "./render/renderRoom";
import { gameEngineTicks } from "./physics/gameEngineTicks";
import { RenderOptions } from "./RenderOptions";

type ApiEvents<RoomId extends string> = {
  roomChange: RoomId;
};

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  events: Emitter<ApiEvents<RoomId>>;
  /** view a different room, without moving the playable character. Mostly for debugging etc */
  viewRoom: (newRoom: RoomId) => void;
  /** gets the game state for the room that is currently being viewed */
  viewingRoom: RoomState<PlanetName, RoomId>;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  set renderOptions(options: RenderOptions<RoomId>);
  stop: () => void;
};

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaign: Campaign<RoomId>,
): Promise<GameApi<RoomId>> => {
  // TODO: re-render on HMR: https://vite.dev/guide/api-hmr.html

  let renderOptions: RenderOptions<RoomId> = {};
  const gameState = initGameState(campaign);
  // the viewing room isn't necessarily the room of the curren playable character,
  // but only because I allow click-through for debugging
  let viewingRoom = currentRoom(gameState);

  const app = new Application();
  await app.init({ background: "#000000", resizeTo: window });

  const inputStop = listenForInput(gameState);

  const events = mitt<ApiEvents<RoomId>>();

  const worldContainer = new Container();
  app.stage.addChild(worldContainer);

  upscale(app, worldContainer);

  gameEngineTicks(app, gameState, worldContainer);

  worldContainer.y = zxSpectrumResolution.height * 0.7;

  const viewRoom = (loadedRoom: RoomState<PlanetName, RoomId>) => {
    viewingRoom = loadedRoom;

    for (const item of viewingRoom.items) {
      if (item.renders) {
        item.renderingDirty = true;
        item.renderPositionDirty = true;
      }
    }

    worldContainer.removeChildren();

    const roomContainer = renderRoom(loadedRoom, renderOptions);

    worldContainer.addChild(roomContainer);

    events.emit("roomChange", loadedRoom.id);
  };

  viewRoom(viewingRoom);

  return {
    campaign,
    events,
    renderIn(gameDiv) {
      gameDiv.appendChild(app.canvas);
    },
    viewRoom(roomId: RoomId) {
      if (roomId !== viewingRoom.id) viewRoom(loadRoom(campaign.rooms[roomId]));
    },
    get viewingRoom() {
      return viewingRoom;
    },
    get gameState() {
      return gameState;
    },
    set renderOptions(options: RenderOptions<RoomId>) {
      renderOptions = options;
      viewRoom(viewingRoom);
    },
    stop() {
      console.log("tearing down game");
      app.stage.removeChild(worldContainer);
      app.canvas.parentNode?.removeChild(app.canvas);
      app.destroy();
      inputStop();
    },
  };
};
