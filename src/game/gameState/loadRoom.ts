import { UnknownItemState, UnknownJsonItem } from "@/Item";
import { RoomState, RoomJson } from "@/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { blockXyzToFineXyz } from "../render/projectToScreen";
import mitt from "mitt";

function* expandWalls<R extends string>(
  room: RoomJson<PlanetName, R>,
): Generator<UnknownItemState<R>> {
  for (let i = room.size.y - 1; i >= 0; i--) {
    yield {
      type: "wall",
      config: { side: "left", style: room.walls.left[i] },
      position: { x: room.size.x, y: i, z: 0 },
      events: mitt(), // TODO: question if a wall really needs an event bus!
    };
  }

  for (let xi = room.size.x - 1; xi >= 0; xi--) {
    yield {
      type: "wall",
      config: { side: "away", style: room.walls.away[xi] },
      position: { x: xi, y: room.size.y, z: 0 },
      events: mitt(), // TODO: question if a wall really needs an event bus!
    };
  }
}

function* loadItems<R extends string>(
  items: UnknownJsonItem<R>[],
): Generator<UnknownItemState<R>> {
  for (const item of items.values()) {
    if (item.type === "door") {
      const {
        config: { axis },
        position,
      } = item;

      const crossAxis = axis === "x" ? "y" : "x";

      const inHiddenWall =
        (axis === "x" && item.position.y === 0) ||
        (axis === "y" && item.position.x === 0);

      // doors on the front are moved back half a square to embed them inside the unseen near-side wall:
      const crossAxisComponent = {
        [crossAxis]: inHiddenWall
          ? position[crossAxis] - 0.5
          : position[crossAxis],
      };

      yield {
        ...item,
        config: {
          ...item.config,
          inHiddenWall,
        },
        type: "doorFar",
        position: {
          ...item.position,
          [axis]: item.position[axis] + 1,
          ...crossAxisComponent,
        },
        events: mitt(),
      };
      yield {
        ...item,
        config: {
          ...item.config,
          inHiddenWall,
        },
        type: "doorNear",
        position: {
          ...item.position,
          ...crossAxisComponent,
        },
        events: mitt(),
      };
    } else yield { ...item, events: mitt() };
  }
}

// moves everything from its 'block' position to its pixel xyz position
function* positionItems<R extends string>(
  items: Iterable<UnknownItemState<R>>,
): Generator<UnknownItemState<R>> {
  for (const i of items) {
    yield {
      ...i,
      position: blockXyzToFineXyz(i.position),
    };
  }
}

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <P extends PlanetName, R extends string>(
  roomJson: RoomJson<P, R>,
): RoomState<P, R> => {
  return {
    ...roomJson,
    items: [
      ...positionItems([
        ...loadItems(Object.values(roomJson.items)),
        ...expandWalls(roomJson),
      ]),
    ],
  };
};
