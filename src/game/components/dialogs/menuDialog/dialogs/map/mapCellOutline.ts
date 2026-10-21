import { type RoomNode } from "../../../../../../model/map/roomGridPositions";
import {
  type RoomJson,
  roomVerticalLink,
  subRoomById,
} from "../../../../../../model/RoomJson";
import { roomJsonItemsIterable } from "../../../../../../model/RoomJsonItemIterators";

/**
 * a wall at the back of a cell drawn tall: none where the side opens onto
 * more of the same room
 */
export type MapCellWall = "doorway" | "none" | "wall";

/**
 * what the map draws for one cell (a sub-room, or a whole undivided room)
 */
export type MapCellOutline = {
  /**
   * a solid floor, or only an outline around a hole when every floor in the
   * cell is `none`
   */
  floor: "hole" | "solid";
  deadlyFloor: boolean;
  /**
   * drawn as a tall box, with walls, because there is a room above it
   */
  high: boolean;
  awayWall: MapCellWall;
  leftWall: MapCellWall;
  /**
   * the vertical edge at the back corner, where the away and left walls meet
   */
  backCornerPost: boolean;
  /**
   * the vertical edge at the front end of the left wall
   */
  leftWallFrontPost: boolean;
  /**
   * the vertical edge at the right end of the away wall
   */
  awayWallRightPost: boolean;
  /**
   * the vertical edge at the front corner
   */
  frontPost: boolean;
};

/**
 * the room's floors that lie (at least partly) in the cell
 */
const floorsInCell = <RoomId extends string>(
  roomJson: RoomJson<RoomId, string>,
  subRoomId: string,
) => {
  const cellArea = subRoomById(roomJson, subRoomId)?.physicalPosition;
  return roomJsonItemsIterable(roomJson)
    .filter((item) => item.type === "floor")
    .filter(
      ({ position, config: { times } }) =>
        cellArea === undefined ||
        (position.x < cellArea.to.x &&
          position.x + times.x > cellArea.from.x &&
          position.y < cellArea.to.y &&
          position.y + times.y > cellArea.from.y),
    )
    .toArray();
};

/**
 * what the map draws for one of its cells - its floor, and whether it is a
 * tall box with walls and edges because a room is above it
 */
export const mapCellOutline = <RoomId extends string>(
  roomJson: RoomJson<RoomId, string>,
  { subRoomId, boundaries }: RoomNode<RoomId>,
): MapCellOutline => {
  const floors = floorsInCell(roomJson, subRoomId);
  const high = roomVerticalLink(roomJson, "above", subRoomId) !== undefined;

  // sides that open onto more of the room have no wall to draw:
  const wallOn = (side: "away" | "left"): MapCellWall =>
    !high || boundaries[side] === "open" ? "none" : boundaries[side];
  const awayWall = wallOn("away");
  const leftWall = wallOn("left");

  return {
    floor:
      floors.every(({ config }) => config.floorType === "none") ? "hole" : (
        "solid"
      ),
    deadlyFloor: floors.some(({ config }) => config.floorType === "deadly"),
    high,
    awayWall,
    leftWall,
    // edges only where a wall meets them, so none rise in the open space
    // between cells of the same room:
    backCornerPost: awayWall !== "none" || leftWall !== "none",
    leftWallFrontPost: leftWall !== "none",
    awayWallRightPost: awayWall !== "none",
    frontPost:
      high && !(boundaries.right === "open" && boundaries.towards === "open"),
  };
};
