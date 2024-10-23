import { Application, Container, PointData } from "pixi.js";
import { AnyRoom, PlanetName, RoomJson, Campaign } from "../modelTypes";
import { zxSpectrumResolution } from "../originalGame";
import { hintColours, Shades } from "../hintColours";
import { blockSizePx } from "../sprites/pixiSpriteSheet";
import { ColorReplaceFilter } from "pixi-filters";
import { renderItems } from "./render/renderItems";
import { renderWalls } from "./render/renderWalls";
import { renderFrontDoors } from "./render/renderDoor";
import { renderFloor } from "./render/renderFloor";
import { projectToScreen } from "./render/projectToScreen";
import { renderExtent } from "./render/renderExtent";
import mitt, { Emitter } from "mitt";

export const xyzBlockPosition = (
  xBlock: number,
  yBlock: number,
  zBlock: number = 0,
): PointData => {
  const x = xBlock * blockSizePx.w;
  const y = yBlock * blockSizePx.d;
  const z = zBlock * blockSizePx.h;

  return projectToScreen(x, y, z);
};

function iterateToContainer(gen: Generator<Container>, into?: Container) {
  const c = into || new Container();
  for (const s of gen) {
    c.addChild(s);
  }
  return c;
}

function* renderBackground<RoomId extends string>(
  room: RoomJson<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  yield* renderFloor(room, options);
  yield* renderWalls(room, options);

  yield iterateToContainer(renderItems(room, options));
  yield* renderFrontDoors(room, options);
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
  room: RoomJson<P, RoomId>,
  options: RenderOptions<RoomId>,
) => {
  // NB: floor could be a tiling sprite and a graphics map:
  //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
  //  * https://pixijs.com/8.x/examples/masks/graphics

  const roomContainer = new Container();

  for (const container of renderBackground(room, options)) {
    roomContainer.addChild(container);
  }

  roomContainer.filters = paletteSwapFilters(hintColours[room.color].main);

  return roomContainer;
};

export type RenderOptions<RoomId extends string> = {
  onPortalClick: (roomId: RoomId) => void;
};

const centreRoomInRendering = (room: AnyRoom, container: Container): void => {
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
  events: Emitter<ApiEvents<RoomId>>;
  goToRoom: (newRoom: RoomJson<PlanetName, RoomId>) => void;
  renderIn: (app: Application) => void;
  stop: () => void;
};

export const gameMain = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): GameApi<RoomId> => {
  let currentRoom = campaign.rooms[campaign.startRoom];
  let app: Application | undefined;

  const events = mitt<ApiEvents<RoomId>>();

  const worldContainer = new Container();

  // move origin to centre horizontally of screen:
  worldContainer.x = zxSpectrumResolution.width / 2;
  worldContainer.y = zxSpectrumResolution.height * 0.7;

  const renderOptions: RenderOptions<RoomId> = {
    onPortalClick(roomId) {
      loadRoom(campaign.rooms[roomId]);
    },
  };

  const loadRoom = (room: RoomJson<PlanetName, RoomId>) => {
    currentRoom = room;

    worldContainer.removeChildren();

    const roomContainer = renderRoom(currentRoom, renderOptions);

    centreRoomInRendering(currentRoom, roomContainer);

    worldContainer.addChild(roomContainer);

    events.emit("roomChange", room);
  };

  loadRoom(currentRoom);

  return {
    campaign,
    get currentRoom() {
      return currentRoom;
    },
    events,
    renderIn(a) {
      app = a;
      app.stage.addChild(worldContainer);
    },
    goToRoom(room: RoomJson<PlanetName, RoomId>) {
      loadRoom(room);
    },
    stop: () => app?.stage?.removeChild(worldContainer),
  };
};
