import { type RoomDecoratorProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { roomWorldPosition } from "../../game/components/dialogs/menuDialog/dialogs/map/roomWorldPosition";
import { translateXyz } from "../../game/components/dialogs/menuDialog/dialogs/map/svgHelpers";
import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import { roomNonContiguousRelationship } from "../../model/RoomJson";
import {
  addXy,
  addXyz,
  originXyz,
  subXy,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { type EditorRoomId } from "../editorTypes";
import {
  arrowShaftWidth,
  linePath,
  roomCentreScreen,
} from "./mapDecoratorGeometry";

/** the key under which a cell's grid position is stored in `gridPositions` */
type GridPositionKey = `${EditorRoomId}/${string}`;

/** twice the width of the teleporter arrow's shaft */
const lineWidth = arrowShaftWidth * 2;

const EditorMapNonContiguousRelationshipDecorator = ({
  roomId,
  subRoomId,
  mapData,
}: RoomDecoratorProps<EditorRoomId>) => {
  const { campaign, gridPositions } = mapData;

  // the relationship lives on the sub-room, so only the cell that owns it draws
  const relationship = roomNonContiguousRelationship(
    campaign.rooms[roomId],
    subRoomId,
  );
  if (relationship === undefined) {
    return null;
  }
  const {
    with: { room: withRoom, subRoom: withSubRoom },
    gridOffset,
  } = relationship;

  const fromKey: GridPositionKey = `${roomId}/${subRoomId}`;
  const sourceSpec = gridPositions[fromKey];
  if (sourceSpec === undefined) {
    return null;
  }

  // resolve the target by identity - the relationship names the room and
  // optionally the sub-room it links to
  const toKey: GridPositionKey = `${withRoom}/${withSubRoom ?? "*"}`;
  const targetSpec = gridPositions[toKey];
  if (targetSpec === undefined) {
    // the related room is not placed on this map
    return null;
  }

  // a reciprocal relationship (the target cell points back at this one with the
  // opposite offset) is drawn once, from its canonical (smaller-key) end
  const targetRelationship = roomNonContiguousRelationship(
    campaign.rooms[withRoom],
    withSubRoom,
  );
  const reciprocal =
    targetRelationship?.with.room === roomId &&
    (targetRelationship.with.subRoom ?? "*") === subRoomId &&
    xyzEqual(addXyz(targetRelationship.gridOffset, gridOffset), originXyz);
  if (reciprocal && fromKey > toKey) {
    return null;
  }

  const sourceScreen = projectWorldXyzToScreenXy(
    roomWorldPosition(sourceSpec.gridPosition),
  );
  const targetScreen = projectWorldXyzToScreenXy(
    roomWorldPosition(targetSpec.gridPosition),
  );
  const delta = subXy(targetScreen, sourceScreen);

  const d = linePath(
    roomCentreScreen,
    addXy(delta, roomCentreScreen),
    lineWidth,
  );
  if (d === "") {
    return null;
  }

  // a one-way link (the target doesn't point back with the opposite offset) is a
  // likely misconfiguration, so warn by drawing it solid red instead of the
  // usual semi-transparent black
  return (
    <g
      transform={translateXyz(roomWorldPosition(sourceSpec.gridPosition))}
      style={{ pointerEvents: "none" }}
      fill={reciprocal ? "black" : "red"}
      fillOpacity={reciprocal ? 0.5 : 1}
      stroke="none"
    >
      <path d={d} />
    </g>
  );
};

export default EditorMapNonContiguousRelationshipDecorator;
