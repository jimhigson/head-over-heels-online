import { Application, Container, PointData } from "pixi.js";
import { AnyRoom, PlanetName, RoomJson, RoomId, Xy } from "../../modelTypes";
import { zxSpectrumResolution } from "../../originalGame";
import { hintColours, Shades } from "../../hintColours";
import {
  blockSizePx,
  pixiSpriteSheet,
  type TextureId,
} from "../../sprites/pixiSpriteSheet";
import { ColorReplaceFilter } from "pixi-filters";
import { renderItems } from "./renderItems";
import { renderWalls } from "./renderWalls";
import { renderFrontDoors } from "./renderDoor";
import { renderFloor } from "./renderFloor";
import { projectToScreen } from "./projectToScreen";
import { renderExtent } from "./renderExtent";

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

export const doorTexture = (room: AnyRoom, axis: "x" | "y") => {
  const worldSpecificTexture =
    pixiSpriteSheet.textures[
      `${room.planet}.door.front.${axis}` as TextureId
    ] !== undefined;

  const frontTexture = (
    worldSpecificTexture
      ? `${room.planet}.door.front.${axis}`
      : `generic.door.front.${axis}`
  ) as TextureId;
  const backTexture = (
    worldSpecificTexture
      ? `${room.planet}.door.back.${axis}`
      : `generic.door.back.${axis}`
  ) as TextureId;

  return {
    frontTexture,
    backTexture,
  };
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
  options: RenderWorldOptions,
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
  options: RenderWorldOptions,
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

export type RenderWorldOptions = {
  onPortalClick: (roomId: RoomId) => void;
};

const centreRoomInRendering = (room: AnyRoom, container: Container): void => {
  const { leftSide, rightSide, frontSide, top } = renderExtent(room);

  const renderingMedianX = (rightSide.x + leftSide.x) / 2;
  const renderingMedianY = (top + frontSide.y) / 2;

  container.x = -renderingMedianX;
  container.y = -renderingMedianY;
};

export const renderWorld = (
  app: Application,
  room: AnyRoom,
  options: RenderWorldOptions,
) => {
  console.log("rendering room", room);

  // TODO: render a bit extra for any side with a door (to go under the door - about half a block)

  const worldContainer = new Container();

  // move origin to centre of screen
  // TODO: change depending on geometry of current room
  worldContainer.x = zxSpectrumResolution.width / 2;
  worldContainer.y = zxSpectrumResolution.height * 0.7;

  const roomContainer = renderRoom(room, options);

  centreRoomInRendering(room, roomContainer);

  worldContainer.addChild(roomContainer);

  app.stage.addChild(worldContainer);

  return () => {
    app.stage?.removeChild(worldContainer);
  };
};
