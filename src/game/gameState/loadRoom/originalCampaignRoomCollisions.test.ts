import { expect, test } from "vitest";

import { campaign } from "../../../_generated/originalCampaign/campaign";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { entries } from "../../../utils/entries";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { isSolid } from "../../physics/itemPredicates";
import { loadRoom } from "./loadRoom";

const roomCases = entries(campaign.rooms).map(([roomId, roomJson]) => ({
  roomId,
  roomJson,
}));

const roomsNotChecked = new Set<string>([
  // penitentiary20's ceiling blocks intentionally overlap the walls, they aren't
  // meant to be reachable, they exist only as a hint as to where to jump in the room above
  "penitentiary20",
]);

test.for(roomCases)(
  "room $roomId has no colliding solid items",
  ({ roomId, roomJson }, { skip }) => {
    if (roomsNotChecked.has(roomId)) {
      skip("ceiling blocks intentionally overlap full-height walls");
    }

    const roomState = loadRoom({
      roomJson,
      scrollsRead: {},
      roomPickupsCollected: {},
      isNewGame: false,
      userSettings: {
        soundSettings: {},
        displaySettings: {},
        pokesEnabled: {},
      },
    }) as RoomState<string, string>;

    const spatialIndex = roomState[roomSpatialIndexKey];

    const collisions = roomItemsIterable(roomState.items)
      .flatMap((i) =>
        collisionItemWithIndex(i, spatialIndex)
          .filter(
            (col) =>
              isSolid(i) &&
              isSolid(col) &&
              // walls are allowed to collide with other walls, since they have
              // thickness - only really possible in large rooms with extra walls
              !(i.type === "wall" && col.type === "wall"),
          )
          .map(
            (col) =>
              `${i.id} @${JSON.stringify(i.state.position)} #${JSON.stringify(i.aabb)} collides with ${col.id} @${JSON.stringify(col.state.position)} #${JSON.stringify(col.aabb)}`,
          ),
      )
      .toArray();

    expect(collisions).toEqual([]);
  },
);
