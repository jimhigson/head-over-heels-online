import { Application, Container } from "pixi.js";
import { Campaign, LoadedRoom, AnyLoadedRoom, GameState } from "../modelTypes";
import { zxSpectrumResolution } from "../originalGame";
import { renderItems } from "./render/renderItems";
import { renderFloor } from "./render/renderFloor";
import { renderExtent } from "./render/renderExtent";
import mitt, { Emitter } from "mitt";
import { loadRoom } from "./gameState/loadRoom";
import { PlanetName } from "@/sprites/planets";
import { listenForInput } from "./input/listenForInput";
import { mainPaletteSwapFilters } from "./render/paletteSwapFilters";
import { initGameState } from "./gameState/initGameState";

function iterateToContainer(gen: Generator<Container>, into?: Container) {
  const c = into || new Container();
  for (const s of gen) {
    c.addChild(s);
  }
  return c;
}

function* renderRoomGenerator<RoomId extends string>(
  room: LoadedRoom<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  yield* renderFloor(room, options);
  yield iterateToContainer(renderItems(room, options));
}

const renderRoom = <P extends PlanetName, RoomId extends string>(
  room: LoadedRoom<P, RoomId>,
  options: RenderOptions<RoomId>,
) => {
  // NB: floor could be a tiling sprite and a graphics map:
  //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
  //  * https://pixijs.com/8.x/examples/masks/graphics

  const roomContainer = new Container();

  for (const container of renderRoomGenerator(room, options)) {
    roomContainer.addChild(container);
  }

  roomContainer.filters = mainPaletteSwapFilters(room);

  return roomContainer;
};

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
  renderIn: (app: Application) => void;
  gameState: GameState<RoomId>;
  stop: () => void;
};

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): GameApi<RoomId> => {
  const gameState = initGameState(campaign);
  // the viewing room isn't necessarily the room of the curren playable character,
  // but only because I allow click-through for debugging
  let viewingRoom = gameState[gameState.currentCharacter].roomState;

  let app: Application | undefined;

  console.log("setting up game");
  const inputStop = listenForInput(gameState.keyAssignment);

  const events = mitt<ApiEvents<RoomId>>();

  const worldContainer = new Container();

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
    renderIn(a) {
      app = a;
      app.stage.addChild(worldContainer);
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
      app?.stage?.removeChild(worldContainer);
      inputStop();
    },
  };
};
