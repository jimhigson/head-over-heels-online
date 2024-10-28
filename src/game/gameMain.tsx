import { Application, Container } from "pixi.js";
import { Campaign, LoadedRoom, AnyLoadedRoom } from "../modelTypes";
import { GameState } from "@/game/gameState/GameState";
import { zxSpectrumResolution } from "../originalGame";
import { renderExtent } from "./render/renderExtent";
import mitt, { Emitter } from "mitt";
import { loadRoom } from "./gameState/loadRoom";
import { PlanetName } from "@/sprites/planets";
import { listenForInput } from "./input/listenForInput";
import { initGameState } from "./gameState/initGameState";
import { upscale } from "./upscale";
import { renderRoom } from "./renderRoom";

export type RenderOptions<RoomId extends string> = {
  onPortalClick: (roomId: RoomId) => void;
};

const centreRoomInRendering = (
  room: AnyLoadedRoom,
  container: Container,
): void => {
  const { leftSide, rightSide, frontSide, top } = renderExtent(room);

  const renderingMedianX = (rightSide.x + leftSide.x) / 2;
  const renderingMedianY = (top + frontSide.y) / 2;

  container.x = -renderingMedianX;
  container.y = -renderingMedianY;
};

type ApiEvents<RoomId extends string> = {
  roomChange: RoomId;
};

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  events: Emitter<ApiEvents<RoomId>>;
  /** view a different room, without moving the playable character. Mostly for debugging etc */
  viewRoom: (newRoom: RoomId) => void;
  /** gets the game state for the room that is currently being viewed */
  viewingRoom: LoadedRoom<PlanetName, RoomId>;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  stop: () => void;
};

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaign: Campaign<RoomId>,
): Promise<GameApi<RoomId>> => {
  const gameState = initGameState(campaign);
  // the viewing room isn't necessarily the room of the curren playable character,
  // but only because I allow click-through for debugging
  let viewingRoom = gameState[gameState.currentCharacter].roomState;

  const app = new Application();
  await app.init({ background: "#000000", resizeTo: window });
  upscale(app);

  console.log("setting up game");
  const inputStop = listenForInput(gameState);

  const events = mitt<ApiEvents<RoomId>>();

  const worldContainer = new Container();
  app.stage.addChild(worldContainer);

  // move origin to centre horizontally of screen:
  worldContainer.x = zxSpectrumResolution.width / 2;
  worldContainer.y = zxSpectrumResolution.height * 0.7;

  const renderOptions: RenderOptions<RoomId> = {
    onPortalClick(roomId) {
      viewRoom(loadRoom(campaign.rooms[roomId]));
    },
  };

  const viewRoom = (loadedRoom: LoadedRoom<PlanetName, RoomId>) => {
    viewingRoom = loadedRoom;

    worldContainer.removeChildren();

    const roomContainer = renderRoom(loadedRoom, renderOptions);

    centreRoomInRendering(loadedRoom, roomContainer);

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
    stop() {
      console.log("tearing down game");
      app.stage.removeChild(worldContainer);
      app.canvas.parentNode?.removeChild(app.canvas);
      app.destroy();
      inputStop();
    },
  };
};
