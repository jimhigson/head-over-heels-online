import type { Application, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import { moveSpriteToItemProjection, renderItem } from "../render/renderItems";
import { sortItemsByDrawOrder } from "../render/sortItemsByDrawOrder";
import type { PlanetName } from "@/sprites/planets";
import type { RoomState } from "@/model/modelTypes";
import { renderCurrentRoom } from "../render/renderCurrentRoom";
import type { RenderOptions } from "../RenderOptions";
import { swopCharacters } from "../gameState/swopCharacters";
import { tickItem } from "./tickItem";
import { objectValues } from "iter-tools";
import { zxSpectrumResolution } from "@/originalGame";
import { upscale } from "../render/upscale";
import { renderHud } from "../render/hud/renderHud";
import {
  itemFalls,
  type AnyItemInPlay,
  type UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { iterate } from "@/utils/iterate";

// if the period of the frame rate is less than this value, each rendering tick
// will be split into multiple physics ticks down to this size:
// this needs to be small enough that the fastest movement
// (jumping: 2px per frame in original game @25fps, so 50px per second)
// can be guaranteed to take up every half-pixel position.
//  So, 10ms = 0.01s, at 50px/s gives 0.01 * 50 = 0.5px
const maximumDeltaMS = 10;

export const progressGameStateForTick = <RoomId extends string>(
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const physicsTickCount = Math.ceil(deltaMS / maximumDeltaMS);
  const physicsTickMs = deltaMS / physicsTickCount;

  for (let i = 0; i < physicsTickCount; i++) {
    const room = currentRoom(gameState);

    for (const item of objectValues(room.items)) {
      tickItem(item, gameState, physicsTickMs);
    }

    gameState.gameTime += physicsTickMs;
  }
};

const itemHasExpired = <RoomId extends string>(
  item: UnknownItemInPlay,
  gameState: GameState<RoomId>,
) =>
  item.state.expires !== undefined && item.state.expires < gameState.gameTime;

const deleteItemFromRoom = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  itemToDelete: AnyItemInPlay<RoomId>,
) => {
  if (itemToDelete.positionContainer !== undefined) {
    itemToDelete.positionContainer.destroy();
  }
  delete room.items[itemToDelete.id];
  for (const item of iterate(objectValues(room.items))) {
    if (itemFalls(item) && item.state.standingOn === itemToDelete) {
      item.state.standingOn = null;
    }
  }
};

const updateRenderingToMatchState = <RoomId extends string>(
  gameState: GameState<RoomId>,
  lastRenderedRoom: RoomState<PlanetName, RoomId> | undefined,
  worldContainer: Container,
  renderOptions: RenderOptions<RoomId>,
) => {
  const curRoom = currentRoom(gameState);

  if (curRoom !== lastRenderedRoom) {
    // this fails if the room was already rendered - we don't remove renderings if the other player is still in the other room!
    console.log(
      "will render from scratch",
      curRoom.id,
      "since we currently have",
      lastRenderedRoom?.id,
    );
    // the room is not currently rendered - render from scratch
    worldContainer.removeChildren();
    const roomContainer = renderCurrentRoom(gameState, renderOptions);
    worldContainer.addChild(roomContainer);
  } else {
    // the room is already rendered but needs updating
    let sortDirty = false;
    for (const item of objectValues(curRoom.items)) {
      if (item.renderPositionDirty) {
        moveSpriteToItemProjection(item);
        item.renderPositionDirty = false;
        sortDirty = true;
      }
      if (item.renderingDirty) {
        renderItem(item, gameState);
        item.renderingDirty = false;
      }
    }
    if (sortDirty) {
      // re-sort the room's items:
      sortItemsByDrawOrder(objectValues(curRoom.items));
    }
  }
};

export const mainLoop = <RoomId extends string>(
  app: Application,
  gameState: GameState<RoomId>,
) => {
  // the last room we rendered - this allows us to track when the room has changed
  // since the last tick so we can set up the change
  let lastRenderedRoom: RoomState<PlanetName, RoomId> | undefined = undefined;
  let lastRenderOptions: RenderOptions<RoomId> | undefined = undefined;

  const worldContainer = new Container();
  worldContainer.y = zxSpectrumResolution.height * 0.7;
  app.stage.addChild(worldContainer);

  const hudContainer = new Container();
  app.stage.addChild(hudContainer);

  //app.stage.filters = new RevertColouriseFilter(
  // new Color("rgb(255, 255, 0)"),
  //);

  const updateHud = renderHud(hudContainer);

  const upscaler = upscale(app);
  const handleTick = ({ deltaMS }: Ticker) => {
    upscaler.rescale();
    worldContainer.x = app.renderer.width / upscaler.curUpscale / 2;

    updateHud(gameState);

    const { inputState } = gameState;

    if (inputState.swop) {
      swopCharacters(gameState);
      // we have now handled that keypress, turn it off until the key is pressed again,
      // which will turn this flag back on
      inputState.swop = false;
    }

    const room = currentRoom(gameState);
    const { renderOptions } = gameState;

    if (lastRenderOptions !== renderOptions) {
      console.log(
        `render options changed!          
          renderOptions: ${lastRenderOptions} -> ${renderOptions}`,
      );

      // removing the lastRenderedRoom will force a re-render after the physics are done
      lastRenderedRoom = undefined;
      lastRenderOptions = renderOptions;
    }

    for (const item of objectValues(room.items)) {
      if (itemHasExpired(item, gameState)) {
        deleteItemFromRoom(room, item);
      }
    }

    progressGameStateForTick(gameState, deltaMS);

    updateRenderingToMatchState(
      gameState,
      lastRenderedRoom,
      worldContainer,
      renderOptions,
    );
    lastRenderedRoom = currentRoom(gameState);
  };

  return {
    start() {
      app.ticker.add(handleTick);
      return this;
    },
    stop() {
      app.stage.removeChild(worldContainer);
      app.ticker.remove(handleTick);
    },
  };
};
