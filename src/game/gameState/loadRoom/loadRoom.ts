import { loadWalls } from "./loadWalls";
import { loadItemFromJson } from "./loadItem";
import { collision1toMany } from "../../collision/aabbCollision";
import { objectValues } from "iter-tools";
import type { RoomPickupsCollected } from "../GameState";
import { loadFloorAndCeiling } from "./loadFloorAndCeiling";
import type { UnknownItemInPlay } from "../../../model/ItemInPlay";
import type { RoomStateItems, RoomState } from "../../../model/modelTypes";
import type { RoomJson } from "../../../model/RoomJson";
import type { SceneryName } from "../../../sprites/planets";
import { entries } from "../../../utils/entries";
import { iterate } from "../../../utils/iterate";
import { isSolid } from "../../physics/itemPredicates";
import { store } from "../../../store/store";

// might do this again later, or use it as a template to gather other item types
/*
function* gatherConveyors<RoomId extends string>(
  sorted: Iterable<UnknownItemInPlay<RoomId>>,
): Generator<UnknownItemInPlay<RoomId>> {
  const { conveyors = [], others = [] } = Object.groupBy(sorted, (item) =>
    item.type === "conveyor" ? "conveyors" : "others",
  ) as {
    conveyors: ItemInPlay<"conveyor", SceneryName, RoomId>[] | undefined;
    others: UnknownItemInPlay<RoomId>[] | undefined;
  };

  // group conveyors by their direction:
  const conveyorsByDirection = Object.groupBy(
    conveyors,
    (conveyor) => conveyor.config.direction,
  );

  yield* others;

  for (const [d, directionConveyors] of objectEntriesIter(
    conveyorsByDirection,
  )) {
    const axisOfConveyorTravel = directionAxis(d as DirectionXy4);
    const axisCrossingConveyorTravel =
      perpendicularAxisXy(axisOfConveyorTravel);
    const byOrdinal = Object.groupBy(
      directionConveyors,
      (conveyor) =>
        `${conveyor.state.position[axisCrossingConveyorTravel]}${conveyor.state.position.z}`,
    );

    for (const conveyorsInline of objectValues(byOrdinal)) {
      if (conveyorsInline === undefined) {
        continue;
      }

      const conveyorPosition = (c: ItemInPlay<"conveyor">) =>
        c.state.position[axisOfConveyorTravel];

      const sortedConveyorsInLine = conveyorsInline.sort(
        (a, b) => conveyorPosition(a) - conveyorPosition(b),
      );

      const conveyorBlocks: ItemInPlay<"conveyor", SceneryName, RoomId>[] = [];
      for (const c of sortedConveyorsInLine) {
        const currentBlock = conveyorBlocks.at(-1);

        if (
          currentBlock === undefined ||
          conveyorPosition(currentBlock) +
            currentBlock.aabb[axisOfConveyorTravel] !==
            conveyorPosition(c)
        ) {
          conveyorBlocks.push(c);
        } else {
          // expand the current block:
          currentBlock.aabb = {
            ...currentBlock.aabb,
            [axisOfConveyorTravel]:
              currentBlock.aabb[axisOfConveyorTravel] + blockSizePx.w,
          };
          currentBlock.config.count = (currentBlock.config.count ?? 1) + 1;
        }
      }

      yield* conveyorBlocks;
    }
  }
}
  */

function* loadItems<RoomId extends string>(
  roomJson: RoomJson<SceneryName, RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
  isFirstLoad: boolean,
): Generator<UnknownItemInPlay<RoomId>> {
  const { scrollsRead } = store.getState();

  const ent = entries(roomJson.items);
  for (const [id, item] of ent) {
    if (item.type === "player" && !isFirstLoad) {
      continue;
    }
    yield* loadItemFromJson(id, item, roomPickupsCollected, scrollsRead);
  }
}

/**
 * convert items from a flat list to an object map, key'd by their ids
 */
const itemsInItemObjectMap = <
  P extends SceneryName,
  RoomId extends string,
  ItemId extends string,
>(
  items: Iterable<UnknownItemInPlay<RoomId>>,
): RoomStateItems<P, RoomId, ItemId> => {
  return iterate(items).reduce(
    (ac, cur) => {
      return {
        ...ac,
        [cur.id]: cur,
      };
    },
    {} as RoomStateItems<P, RoomId, ItemId>,
  );
};

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <P extends SceneryName, RoomId extends string>(
  roomJson: RoomJson<P, RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
  isFirstLoad = false,
): RoomState<P, RoomId> => {
  const loadedItems: RoomStateItems<P, RoomId> = {
    ...itemsInItemObjectMap(loadFloorAndCeiling(roomJson)),
    ...itemsInItemObjectMap(loadWalls(roomJson)),
    ...itemsInItemObjectMap(
      /*gatherConveyors(*/ loadItems(
        roomJson,
        roomPickupsCollected,
        isFirstLoad,
      ) /*)*/,
    ),
  };

  // the physics will go nuts if things are overlapping, so check and reject
  // if they are:
  for (const i of objectValues(loadedItems)) {
    const collisions = collision1toMany(i, objectValues(loadedItems));
    const solidCol = collisions.find(
      (col) =>
        isSolid(i) &&
        isSolid(col) &&
        // walls are allowed to collide with other walls, since they have thickness
        // - this is only really possible in large rooms with extra walls
        !(i.type === "wall" && col.type === "wall"),
    );

    if (solidCol !== undefined) {
      throw new Error(
        `item ${i.id} @${JSON.stringify(i.state.position)} #${JSON.stringify(i.aabb)} is colliding with (solid item) ${solidCol.id} @${JSON.stringify(solidCol.state.position)} #${JSON.stringify(solidCol.aabb)} on loading room ${roomJson.id}`,
      );
    }
  }

  const roomState: RoomState<P, RoomId> = {
    ...roomJson,
    roomJson,
    items: {
      ...loadedItems,
      //...extraItems,
    },
    roomTime: 0,
  };

  return roomState;
};
