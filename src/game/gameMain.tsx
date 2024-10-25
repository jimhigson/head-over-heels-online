import { Application, Container } from "pixi.js";
import { RoomJson, Campaign, LoadedRoom, AnyLoadedRoom } from "../modelTypes";
import { zxSpectrumResolution } from "../originalGame";
import { hintColours, Shades } from "../hintColours";
import { ColorReplaceFilter } from "pixi-filters";
import { renderItems } from "./render/renderItems";
import { renderFloor } from "./render/renderFloor";
import { renderExtent } from "./render/renderExtent";
import mitt, { Emitter } from "mitt";
import { loadRoom } from "./loadRoom/loadRoom";
import { PlanetName } from "@/sprites/planets";

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

export const paletteSwapFilters = (shades: Shades) => [
  // MultiColorReplaceFilter from '@pixi/filter-multi-color-replace' is also an option but its api is not as friendly
  new ColorReplaceFilter({
    originalColor: 0x00ffff,
    targetColor: shades.basic,
    tolerance: 0.05,
  }),
  new ColorReplaceFilter({
    originalColor: 0x008888,
    targetColor: shades.dimmed,
    tolerance: 0.05,
  }),
];

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

  roomContainer.filters = paletteSwapFilters(hintColours[room.color].main);

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
  roomChange: RoomJson<PlanetName, RoomId>;
};

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  currentRoom: RoomJson<PlanetName, RoomId>;
  roomState: LoadedRoom<PlanetName, RoomId>;
  events: Emitter<ApiEvents<RoomId>>;
  goToRoom: (newRoom: RoomId) => void;
  renderIn: (app: Application) => void;
  stop: () => void;
};

export const gameMain = <RoomId extends string>(
  campaign: Campaign<RoomId>,
  startingRoom?: NoInfer<RoomId>,
): GameApi<RoomId> => {
  let currentRoom = campaign.rooms[startingRoom || campaign.startRoom];
  let loadedRoom: LoadedRoom<PlanetName, RoomId>;
  let app: Application | undefined;

  const events = mitt<ApiEvents<RoomId>>();

  const worldContainer = new Container();

  // move origin to centre horizontally of screen:
  worldContainer.x = zxSpectrumResolution.width / 2;
  worldContainer.y = zxSpectrumResolution.height * 0.7;

  const renderOptions: RenderOptions<RoomId> = {
    onPortalClick(roomId) {
      switchToRoom(roomId);
    },
  };

  const switchToRoom = (roomId: RoomId) => {
    const room = campaign.rooms[roomId];

    if (room === undefined) {
      throw new Error(`no room found with id ${roomId}`);
    }

    currentRoom = room;
    loadedRoom = loadRoom(room);

    worldContainer.removeChildren();

    const roomContainer = renderRoom(loadedRoom, renderOptions);

    centreRoomInRendering(loadedRoom, roomContainer);

    worldContainer.addChild(roomContainer);

    events.emit("roomChange", room);
  };

  switchToRoom(startingRoom || campaign.startRoom);

  return {
    campaign,
    get currentRoom() {
      return currentRoom;
    },
    get roomState() {
      return loadedRoom;
    },
    events,
    renderIn(a) {
      app = a;
      app.stage.addChild(worldContainer);
    },
    goToRoom(roomId: RoomId) {
      switchToRoom(roomId);
    },
    stop: () => app?.stage?.removeChild(worldContainer),
  };
};
