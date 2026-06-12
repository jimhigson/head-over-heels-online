import { type RoomDecoratorProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { roomWorldPosition } from "../../game/components/dialogs/menuDialog/dialogs/map/roomWorldPosition";
import { translateXyz } from "../../game/components/dialogs/menuDialog/dialogs/map/svgHelpers";
import {
  type TeleporterCell,
  type TeleporterLink,
} from "../../game/components/dialogs/menuDialog/dialogs/map/teleporterLinks";
import { blockSizePx } from "../../game/physics/mechanicsConstants";
import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import {
  addXy,
  lengthXy,
  scaleXy,
  subXy,
  type Xy,
} from "../../utils/vectors/vectors";
import { type EditorRoomId } from "../editorTypes";
import {
  alongPerp,
  arrowShaftWidth,
  pointsToPath,
  roomCentreScreen,
  roomHalfXY,
} from "./mapDecoratorGeometry";

/** length and base-width of the arrowhead */
const arrowSize = blockSizePx.x * 1.5;

/**
 * screen position of a notable item's icon (its 0..1 slot), relative to the
 * room's `<g>` origin - mirrors the transform in ItemsInRoomLayout (`-3`), then
 * lifts a further 16px so the arrow meets the icon's body rather than its base
 */
const slotToScreen = (slot: Xy): Xy =>
  addXy(projectWorldXyzToScreenXy(scaleXy(slot, roomHalfXY)), {
    x: 0,
    y: -3 - 16,
  });

/** the key under which a cell's grid position is stored in `gridPositions` */
type GridPositionKey = `${EditorRoomId}/${string}`;

const cellKey = ({
  roomId,
  subRoomId,
}: TeleporterCell<EditorRoomId>): GridPositionKey => `${roomId}/${subRoomId}`;

const linkId = (link: TeleporterLink<EditorRoomId>) =>
  `${cellKey(link.from)}->${cellKey(link.to)}`;

/**
 * a single closed arrow silhouette from `from` to `to` (unit direction `dir`),
 * with a head at `to` - and also at `from` when `doubleHeaded`
 */
const arrowPath = (
  from: Xy,
  to: Xy,
  dir: Xy,
  doubleHeaded: boolean,
): string => {
  const shaftHalf = arrowShaftWidth / 2;
  const headHalf = arrowSize / 2;
  const headStep = scaleXy(dir, arrowSize);
  const toBase = subXy(to, headStep);

  if (doubleHeaded) {
    const fromBase = addXy(from, headStep);
    return pointsToPath([
      from,
      alongPerp(fromBase, dir, headHalf),
      alongPerp(fromBase, dir, shaftHalf),
      alongPerp(toBase, dir, shaftHalf),
      alongPerp(toBase, dir, headHalf),
      to,
      alongPerp(toBase, dir, -headHalf),
      alongPerp(toBase, dir, -shaftHalf),
      alongPerp(fromBase, dir, -shaftHalf),
      alongPerp(fromBase, dir, -headHalf),
    ]);
  }

  return pointsToPath([
    alongPerp(from, dir, shaftHalf),
    alongPerp(toBase, dir, shaftHalf),
    alongPerp(toBase, dir, headHalf),
    to,
    alongPerp(toBase, dir, -headHalf),
    alongPerp(toBase, dir, -shaftHalf),
    alongPerp(from, dir, -shaftHalf),
  ]);
};

const EditorMapTeleporterLinkDecorator = ({
  roomId,
  subRoomId,
  mapData,
}: RoomDecoratorProps<EditorRoomId>) => {
  const { gridPositions, teleporterLinks, notableItemsByCell } = mapData;

  if (teleporterLinks === undefined) {
    return null;
  }

  const fromKey: GridPositionKey = `${roomId}/${subRoomId}`;
  const sourceSpec = gridPositions[fromKey];
  if (sourceSpec === undefined) {
    return null;
  }
  const sourceScreen = projectWorldXyzToScreenXy(
    roomWorldPosition(sourceSpec.gridPosition),
  );

  const allLinkIds = new Set(teleporterLinks.map(linkId));

  /** the icon position of a teleporter, if it's shown on the map, else undefined */
  const anchorFor = (
    cell: GridPositionKey,
    itemId: string | undefined,
  ): undefined | Xy => {
    if (itemId === undefined) {
      return undefined;
    }
    const slot = notableItemsByCell?.[cell]?.positions[itemId];
    return slot === undefined ? undefined : slotToScreen(slot);
  };

  const arrows = teleporterLinks.flatMap((link, index) => {
    if (cellKey(link.from) !== fromKey) {
      // only this cell's outgoing links are drawn here
      return [];
    }
    if (link.from.roomId === link.to.roomId) {
      // same-room teleporter - nothing to draw across the map
      return [];
    }

    const toKey = cellKey(link.to);
    const targetSpec = gridPositions[toKey];
    if (targetSpec === undefined) {
      // target room is not placed on this map
      return [];
    }

    const mutual = allLinkIds.has(`${toKey}->${fromKey}`);
    if (mutual && fromKey > toKey) {
      // a mutual pair is drawn once, by its canonical (smaller-key) end
      return [];
    }

    const targetScreen = projectWorldXyzToScreenXy(
      roomWorldPosition(targetSpec.gridPosition),
    );
    const delta = subXy(targetScreen, sourceScreen);

    // point at the actual teleporter icons when shown, else the room centres
    const p1 = anchorFor(fromKey, link.from.itemId) ?? roomCentreScreen;
    const p2 = addXy(
      delta,
      anchorFor(toKey, link.to.itemId) ?? roomCentreScreen,
    );

    const between = subXy(p2, p1);
    const length = lengthXy(between);
    if (length === 0) {
      return [];
    }
    const dir = scaleXy(between, 1 / length);

    const d = arrowPath(p1, p2, dir, mutual);

    if (mutual) {
      return [<path key={index} d={d} />];
    }

    // one-way arrows fade light-gray at the source to white at the destination
    const gradientId = `teleporterArrow-${fromKey}-${index}`.replace(
      /[^\w-]/g,
      "_",
    );
    return [
      <linearGradient
        key={`${index}-gradient`}
        id={gradientId}
        gradientUnits="userSpaceOnUse"
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
      >
        <stop offset={0} stopColor="lightgray" />
        <stop offset={1} stopColor="white" />
      </linearGradient>,
      <path key={index} d={d} fill={`url(#${gradientId})`} />,
    ];
  });

  if (arrows.length === 0) {
    // no outgoing links from this room - don't emit an empty wrapper <g>
    return null;
  }

  return (
    <g
      transform={translateXyz(roomWorldPosition(sourceSpec.gridPosition))}
      style={{ pointerEvents: "none" }}
      fill="white"
      stroke="black"
      strokeWidth={1}
    >
      {arrows}
    </g>
  );
};

export default EditorMapTeleporterLinkDecorator;
