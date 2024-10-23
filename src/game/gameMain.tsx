import { Application, Container, PointData } from "pixi.js";
import {
  AnyRoom,
  PlanetName,
  RoomJson,
  UnknownCampaign,
  CampaignRoomId,
  CampaignRoom,
} from "../modelTypes";
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
import { ValueOf } from "type-fest";

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

function* renderBackground(
  room: AnyRoom,
  options: RenderOptions,
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

const renderRoom = <P extends PlanetName>(
  room: RoomJson<P, string>,
  options: RenderOptions,
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

export type RenderOptions<C extends UnknownCampaign> = {
  onPortalClick: (roomId: CampaignRoomId<C>) => void;
};

const centreRoomInRendering = (room: AnyRoom, container: Container): void => {
  const { leftSide, rightSide, frontSide, top } = renderExtent(room);

  const renderingMedianX = (rightSide.x + leftSide.x) / 2;
  const renderingMedianY = (top + frontSide.y) / 2;

  container.x = -renderingMedianX;
  container.y = -renderingMedianY;
};

type ApiEvents<C extends UnknownCampaign> = {
  roomChange: CampaignRoom<C>;
};

export type GameApi<C extends UnknownCampaign> = {
  currentRoom: CampaignRoom<C>;
  events: Emitter<ApiEvents<C>>;
  goToRoom: (newRoom: CampaignRoomId<C>) => void;
  renderIn: (app: Application) => void;
  stop: () => void;
};

export const gameMain = <C extends UnknownCampaign>(
  campaign: C,
): GameApi<C> => {
  type RoomId = CampaignRoomId<C>;

  let currentRoom = Object.values(campaign)[0] as ValueOf<C>;
  let app: Application | undefined;

  const events = mitt<ApiEvents<C>>();

  const worldContainer = new Container();

  // move origin to centre horizontally of screen:
  worldContainer.x = zxSpectrumResolution.width / 2;
  worldContainer.y = zxSpectrumResolution.height * 0.7;

  const renderOptions: RenderOptions<C> = {
    onPortalClick(roomId) {
      currentRoom = campaign[roomId];
      loadRoom(campaign[roomId]);
    },
  };

  const loadRoom = (room: ValueOf<C>) => {
    currentRoom = room;

    worldContainer.removeChildren();

    const roomContainer = renderRoom(currentRoom, renderOptions);

    centreRoomInRendering(currentRoom, roomContainer);

    worldContainer.addChild(roomContainer);

    events.emit("roomChange", room);
  };

  loadRoom(currentRoom);

  return {
    get currentRoom() {
      return currentRoom;
    },
    events,
    renderIn(a) {
      app = a;
      app.stage.addChild(worldContainer);
    },
    goToRoom(room: RoomId) {
      loadRoom(campaign[room]);
    },
    stop: () => app?.stage?.removeChild(worldContainer),
  };
};
