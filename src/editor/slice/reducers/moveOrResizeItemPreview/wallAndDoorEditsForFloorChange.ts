import { generateHoleInWallsForDoor } from "../../../../model/inPlaceMutators/generateHoleInWallsForDoor";
import { doorWidth } from "../../../../model/json/verification/helpers/roomPerimeter";
import { iterateRoomJsonItemsWithIds } from "../../../../model/RoomJsonItemIterators";
import {
  addXyz,
  directionsXy4,
  doorAlongAxis,
  perpendicularAxisXy,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../../editorTypes";
import { type PreviewedRoomItemEdits } from "../../levelEditorSlice";
import { floorEdgeLineCoord } from "../../perimeterGapFillingEdits";

/**
 * the edits that keep a floor's walls and doors around its edges as the floor
 * moves or resizes - or undefined if the change is not a valid edit, because a
 * door would no longer fit on its edge.
 *
 * Moving the floor along an edge carries that edge's walls and doors with it.
 * Resizing leaves them where they are: walls are cut back to the floor, and
 * doors only move when the floor's end would otherwise leave them hanging off
 * it - then they are pushed along with the end, until they would be pushed off
 * the other end. Closing any gaps this leaves in the perimeter is left to the
 * caller.
 */
export const wallAndDoorEditsForFloorChange = (
  room: EditorRoomJson,
  floor: EditorJsonItem<"floor">,
  positionDelta: Xyz,
  timesDelta: undefined | Xyz,
): PreviewedRoomItemEdits | undefined => {
  const floorStart = floor.position;
  const floorEnd = addXyz(floor.position, floor.config.times);
  const newFloorStart = addXyz(floor.position, positionDelta);
  const newFloorEnd = addXyz(
    newFloorStart,
    timesDelta ? addXyz(floor.config.times, timesDelta) : floor.config.times,
  );

  const edits: PreviewedRoomItemEdits = {};

  for (const direction of directionsXy4) {
    const alongAxis = doorAlongAxis(direction);
    const throughAxis = perpendicularAxisXy(alongAxis);

    const lineCoord = floorEdgeLineCoord(direction, floorStart, floorEnd);
    const newLineCoord = floorEdgeLineCoord(
      direction,
      newFloorStart,
      newFloorEnd,
    );
    const lineStart = floorStart[alongAxis];
    const lineEnd = floorEnd[alongAxis];
    const newLineStart = newFloorStart[alongAxis];
    const newLineEnd = newFloorEnd[alongAxis];

    if (
      lineCoord === newLineCoord &&
      lineStart === newLineStart &&
      lineEnd === newLineEnd
    ) {
      continue;
    }

    const isResizedAlong = (timesDelta?.[alongAxis] ?? 0) !== 0;
    // a move carries everything on the edge along with it, a resize doesn't:
    const shift = isResizedAlong ? 0 : positionDelta[alongAxis];

    const isOnLine = (
      item: EditorJsonItem<"door"> | EditorJsonItem<"wall">,
      length: number,
    ) =>
      item.config.direction === direction &&
      item.position[throughAxis] === lineCoord &&
      item.position[alongAxis] < lineEnd &&
      item.position[alongAxis] + length > lineStart;

    const lineWalls = iterateRoomJsonItemsWithIds(room.items, "wall")
      .filter(
        ([, wall]) =>
          wall.position.z === floor.position.z &&
          isOnLine(wall, wall.config.tiles.length),
      )
      .toArray();
    const lineDoors = iterateRoomJsonItemsWithIds(room.items, "door")
      .filter(([, door]) => isOnLine(door, doorWidth))
      .toArray();

    const lineWallEdits: Record<
      EditorRoomItemId,
      EditorJsonItem<"wall"> | null
    > = {};

    for (const [id, wall] of lineWalls) {
      const { tiles } = wall.config;
      const wallStart = wall.position[alongAxis] + shift;

      // cut back to the floor:
      const clippedStart = Math.max(wallStart, newLineStart);
      const clippedEnd = Math.min(wallStart + tiles.length, newLineEnd);
      lineWallEdits[id] =
        clippedEnd <= clippedStart ? null : (
          {
            ...wall,
            position: {
              ...wall.position,
              [throughAxis]: newLineCoord,
              [alongAxis]: clippedStart,
            },
            config: {
              ...wall.config,
              tiles: tiles.slice(
                clippedStart - wallStart,
                clippedEnd - wallStart,
              ),
            },
          }
        );
    }

    const movedDoors = lineDoors
      .map(([id, door]) => {
        const carriedStart = door.position[alongAxis] + shift;
        const doorStart = Math.min(
          Math.max(carriedStart, newLineStart),
          newLineEnd - doorWidth,
        );
        return {
          id,
          door,
          isPushed: doorStart !== carriedStart,
          movedDoor: {
            ...door,
            position: {
              ...door.position,
              [throughAxis]: newLineCoord,
              [alongAxis]: doorStart,
            },
          },
        };
      })
      .sort(
        (a, b) =>
          a.movedDoor.position[alongAxis] - b.movedDoor.position[alongAxis],
      );

    for (const [i, { movedDoor }] of movedDoors.entries()) {
      const doorStart = movedDoor.position[alongAxis];
      const nextDoor = movedDoors[i + 1]?.movedDoor;
      const isPushedOffFloor = doorStart < newLineStart;
      const isPushedIntoNextDoor =
        nextDoor !== undefined &&
        doorStart + doorWidth > nextDoor.position[alongAxis];
      if (isPushedOffFloor || isPushedIntoNextDoor) {
        return undefined;
      }
    }

    for (const { id, isPushed, movedDoor } of movedDoors) {
      edits[id] = movedDoor;

      if (isPushed) {
        // pushed over walls, so cut them where the door now is:
        for (const [cutId, cutWall] of generateHoleInWallsForDoor(
          lineWallEdits,
          direction,
          movedDoor.position,
        )) {
          lineWallEdits[cutId] = cutWall;
        }
      }
    }

    Object.assign(edits, lineWallEdits);
  }

  return edits;
};
