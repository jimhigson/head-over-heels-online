import { Application, Container, Graphics } from "pixi.js";
import type { RoomJson } from "../../../../../../model/RoomJson";
import type { GameState } from "../../../../../gameState/GameState";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import { wallRenderHeight } from "../../../../../physics/mechanicsConstants";
import { getColorScheme } from "../../../../../hintColours";
import { blockSizePx } from "../../../../../../sprites/spritePivots";
import { objectValues } from "iter-tools";
import { iterate } from "../../../../../../utils/iterate";
import type { Xy } from "../../../../../../utils/vectors/vectors";
import {
  addXy,
  doorAlongAxis,
  oppositeDirection,
  originXy,
  scaleXy,
  subXy,
} from "../../../../../../utils/vectors/vectors";
import type { Campaign } from "../../../../../../model/modelTypes";
import { iterateToContainer } from "../../../../../iterateToContainer";
import type { JsonItem } from "../../../../../../model/json/JsonItem";
import { entries } from "../../../../../../utils/entries";
import { unitVectors } from "../../../../../../utils/vectors/unitVectors";

const gapHoriz = 6;
const gapVert = 8;

export const mapMain = async <RoomId extends string>(
  gameState: GameState<RoomId>,
): Promise<Application> => {
  const app = new Application();

  await app.init({
    background: "#000000",
    // run on the shared ticker to keep in sync with the input state tracker
    sharedTicker: true,
  });

  const roomsContainer = new Container();
  roomsContainer.x = 200;
  roomsContainer.y = 180;
  app.stage.addChild(roomsContainer);

  const startRoomId = gameState.characterRooms.head!.roomJson.id;
  iterateToContainer(
    renderSprawl(startRoomId, gameState.campaign),
    roomsContainer,
  );

  return app;
};

export const xyAsArray = ({ x = 0, y = 0 }: Partial<Xy>): [number, number] => {
  return [x, y];
};

const iterateDoors = <RoomId extends string>(
  room: RoomJson<RoomId, string>,
) => {
  return iterate(objectValues(room.items)).filter((i) => i.type === "door");
};

const doorRenderOffset = <RoomId extends string>(
  linkingDoorIdFromPreviousRoom: string,
  fromRoom: RoomJson<RoomId, string>,
  room: RoomJson<RoomId, string>,
): Xy => {
  const doorInLinkingRoom = fromRoom.items[
    linkingDoorIdFromPreviousRoom
  ] as JsonItem<"door", RoomId, string>;

  const doorInThisRoom = iterateDoors(room).find(
    (d) =>
      d.config.toRoom === fromRoom.id &&
      d.config.direction ===
        oppositeDirection(doorInLinkingRoom.config.direction),
  );
  if (doorInThisRoom === undefined) {
    throw new Error(
      `Door ${linkingDoorIdFromPreviousRoom} not found in room ${room.id}`,
    );
  }
  return addXy(
    projectWorldXyzToScreenXy(
      scaleXy(unitVectors[doorInLinkingRoom.config.direction], gapHoriz),
    ),
    subXy(
      projectWorldXyzToScreenXy(doorInLinkingRoom.position),
      projectWorldXyzToScreenXy(doorInThisRoom.position),
    ),
  );
};

function* renderSprawl<RoomId extends string>(
  startRoomId: RoomId,
  campaign: Campaign<RoomId>,
  renderedAlready: Partial<Record<RoomId, true>> = {},
  link?:
    | { type: "above" }
    | { type: "below" }
    | { type: "door"; doorIdInLinkingRoom: string },
  fromRoom?: RoomJson<RoomId, string>,
  previousRoomRenderOffset: Xy = originXy,
): Generator<Container> {
  renderedAlready[startRoomId] = true;

  const room = campaign.rooms[startRoomId];

  const roomRenderOffset: Xy = addXy(
    previousRoomRenderOffset,
    link === undefined ? originXy
    : link.type === "above" ? { x: 0, y: -gapVert }
    : link.type === "below" ? { x: 0, y: gapVert }
    : doorRenderOffset(link.doorIdInLinkingRoom, fromRoom!, room),
  );

  const thisRoomContainer = renderRoomThumb(room);
  thisRoomContainer.x = roomRenderOffset.x;
  thisRoomContainer.y = roomRenderOffset.y;
  yield thisRoomContainer;

  if (room.roomAbove !== undefined) {
    const { roomAbove } = room;
    if (!renderedAlready[roomAbove]) {
      yield* renderSprawl(
        roomAbove,
        campaign,
        renderedAlready,
        { type: "above" },
        room,
        roomRenderOffset,
      );
    }
  }

  if (room.roomBelow !== undefined) {
    const { roomBelow } = room;
    if (!renderedAlready[roomBelow]) {
      yield* renderSprawl(
        roomBelow,
        campaign,
        renderedAlready,
        { type: "below" },
        room,
        roomRenderOffset,
      );
    }
  }

  const doorsEntries = [
    ...iterate(entries(room.items)).filter(
      ([_itemId, item]) => item.type === "door",
    ),
  ] as [string, JsonItem<"door", RoomId, string>][];
  for (const [doorItemId, doorItem] of doorsEntries) {
    const { toRoom } = doorItem.config;
    if (!renderedAlready[toRoom]) {
      yield* renderSprawl(
        toRoom,
        campaign,
        renderedAlready,
        { type: "door", doorIdInLinkingRoom: doorItemId },
        room,
        roomRenderOffset,
      );
    }
  }
}

export const renderRoomThumb = <RoomId extends string>({
  id,
  size: { x: sizeX, y: sizeY },
  color,
  items,
  floor,
}: RoomJson<RoomId, string>) => {
  console.log("rendering room", id);
  const roomContainer = new Container({ label: id });

  const wallRenderHeightBlocks = wallRenderHeight / blockSizePx.h;

  const topBackCorner = projectWorldXyzToScreenXy({
    x: sizeX,
    y: sizeY,
    z: wallRenderHeightBlocks,
  });
  const bottomBackCorner = projectWorldXyzToScreenXy({
    x: sizeX,
    y: sizeY,
    z: 0,
  });
  const bottomLeftCorner = projectWorldXyzToScreenXy({ x: sizeX, y: 0 });
  const topLeftCorner = projectWorldXyzToScreenXy({
    x: sizeX,
    y: 0,
    z: wallRenderHeightBlocks,
  });
  const bottomRightCorner = projectWorldXyzToScreenXy({ x: 0, y: sizeY });
  const topRightCorner = projectWorldXyzToScreenXy({
    x: 0,
    y: sizeY,
    z: wallRenderHeightBlocks,
  });

  const fillColour = getColorScheme(color).main.original;
  const towardsEdgeColour = getColorScheme(color).edges.towards.original;
  const rightEdgeColour = getColorScheme(color).edges.right.original;

  const roomShape = new Graphics()
    // hexagon for main room fill:
    .moveTo(...xyAsArray(bottomRightCorner))
    .lineTo(...xyAsArray(topRightCorner))
    .lineTo(...xyAsArray(topBackCorner))
    .lineTo(...xyAsArray(topLeftCorner))
    .lineTo(...xyAsArray(bottomLeftCorner));

  if (floor === "none") {
    // continue outline, dodging the floor:
    roomShape.lineTo(...xyAsArray(bottomBackCorner)).fill(fillColour);
  } else {
    roomShape
      .lineTo(0, 0)
      .fill(fillColour)
      // lines splitting floor and left/away walls:
      .moveTo(...xyAsArray(bottomLeftCorner))
      .lineTo(...xyAsArray(bottomBackCorner))
      .lineTo(...xyAsArray(bottomRightCorner))
      .stroke(0x000000);
  }
  // line splitting left and away walls:
  roomShape
    .moveTo(...xyAsArray(bottomBackCorner))
    .lineTo(...xyAsArray(topBackCorner))
    .stroke(0x000000);

  roomContainer.addChild(roomShape);

  roomContainer.addChild(
    new Graphics({ y: 2 })
      //edges:
      .moveTo(...xyAsArray(bottomLeftCorner))
      .lineTo(0, 0)
      .stroke(towardsEdgeColour)
      .moveTo(...xyAsArray(bottomRightCorner))
      .lineTo(0, 0)
      .stroke(rightEdgeColour)
      // line splitting the edges:
      .moveTo(0, -1)
      .lineTo(0, 1)
      .stroke(0x000000),
  );

  const doorsIter = iterate(objectValues(items)).filter(
    (i) => i.type === "door",
  );
  for (const d of doorsIter) {
    const doorOrigin = projectWorldXyzToScreenXy(d.position);
    const doorGraphics = new Graphics()
      .lineTo(...xyAsArray(projectWorldXyzToScreenXy({ x: 2 })))
      .lineTo(...xyAsArray(projectWorldXyzToScreenXy({ x: 2, z: 3 })))
      .lineTo(...xyAsArray(projectWorldXyzToScreenXy({ x: 0, z: 3 })))
      .lineTo(0, 0)
      .fill(fillColour)
      .stroke(0x000000);

    doorGraphics.x = doorOrigin.x;
    doorGraphics.y = doorOrigin.y;

    const axis = doorAlongAxis(d.config.direction);
    if (axis === "y") {
      doorGraphics.scale.x = -1;
    }

    roomContainer.addChild(doorGraphics);
  }

  return roomContainer;
};
