import { notableItemSlotPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/ItemsInRoomLayout";
import { useMapContext } from "../../game/components/dialogs/menuDialog/dialogs/map/MapContext";
import { type RoomDecoratorProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { roomWorldPosition } from "../../game/components/dialogs/menuDialog/dialogs/map/roomWorldPosition";
import { translateXyz } from "../../game/components/dialogs/menuDialog/dialogs/map/svgHelpers";
import { useRoomNode } from "../../game/components/dialogs/menuDialog/dialogs/map/useRoomNode";
import { blockSizePx } from "../../game/physics/mechanicsConstants";
import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import {
  type TeleporterCell,
  type TeleporterLink,
} from "../../model/map/teleporterLinks";
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

/**
 * the icon position of a teleporter in a cell, if it's shown on the map
 */
const useTeleporterAnchor = ({
  roomId,
  subRoomId,
  itemId,
}: TeleporterCell<EditorRoomId>): undefined | Xy => {
  const { useRoomJson, useNotableItems } = useMapContext<EditorRoomId>();
  const roomJson = useRoomJson(roomId);
  const notableItems = useNotableItems(roomId, subRoomId);
  const slot =
    itemId === undefined ? undefined : (
      notableItemSlotPositions(notableItems, roomJson, subRoomId)[itemId]
    );
  return slot === undefined ? undefined : slotToScreen(slot);
};

type TeleporterLinkArrowProps = {
  link: TeleporterLink<EditorRoomId>;
  /**
   * where the link's target room is drawn, relative to its source room
   */
  targetDelta: Xy;
  /**
   * unique among the map's arrows, for its gradient
   */
  gradientId: string;
};

const TeleporterLinkArrow = ({
  link: { from, to },
  targetDelta,
  gradientId,
}: TeleporterLinkArrowProps) => {
  const fromAnchor = useTeleporterAnchor(from);
  const toAnchor = useTeleporterAnchor(to);
  // the links leaving the target, to find any partner coming back:
  const teleporterLinksFrom =
    useMapContext<EditorRoomId>().useTeleporterLinksFrom(
      to.roomId,
      to.subRoomId,
    );

  const fromKey = cellKey(from);
  const toKey = cellKey(to);
  // a partner going back the other way is drawn with this one, as one
  // double-headed arrow
  const isMutual = teleporterLinksFrom.some(
    (targetLink) => cellKey(targetLink.to) === fromKey,
  );
  if (isMutual && fromKey > toKey) {
    // a mutual pair is drawn once, by its canonical (smaller-key) end
    return null;
  }

  // point at the actual teleporter icons when shown, else the room centres
  const p1 = fromAnchor ?? roomCentreScreen;
  const p2 = addXy(targetDelta, toAnchor ?? roomCentreScreen);

  const between = subXy(p2, p1);
  const length = lengthXy(between);
  if (length === 0) {
    return null;
  }
  const dir = scaleXy(between, 1 / length);

  const d = arrowPath(p1, p2, dir, isMutual);

  if (isMutual) {
    return <path d={d} />;
  }

  // one-way arrows fade light-gray at the source to white at the destination
  return (
    <>
      <linearGradient
        id={gradientId}
        gradientUnits="userSpaceOnUse"
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
      >
        <stop offset={0} stopColor="lightgray" />
        <stop offset={1} stopColor="white" />
      </linearGradient>
      <path d={d} fill={`url(#${gradientId})`} />
    </>
  );
};

const EditorMapTeleporterLinkDecorator = ({
  roomId,
  subRoomId,
}: RoomDecoratorProps<EditorRoomId>) => {
  const { useShownArea, useTeleporterLinksFrom } =
    useMapContext<EditorRoomId>();
  const { gridPositions } = useShownArea();
  const roomNode = useRoomNode(roomId, subRoomId);
  const teleporterLinksFrom = useTeleporterLinksFrom(roomId, subRoomId);

  const fromKey: GridPositionKey = `${roomId}/${subRoomId}`;
  const sourceScreen = projectWorldXyzToScreenXy(
    roomWorldPosition(roomNode.gridPosition),
  );

  const arrows = teleporterLinksFrom.flatMap((link, index) => {
    if (link.from.roomId === link.to.roomId) {
      // same-room teleporter - nothing to draw across the map
      return [];
    }

    const targetSpec = gridPositions[cellKey(link.to)];
    if (targetSpec === undefined) {
      // target room is not placed on this map
      return [];
    }

    const targetScreen = projectWorldXyzToScreenXy(
      roomWorldPosition(targetSpec.gridPosition),
    );

    return [
      <TeleporterLinkArrow
        key={index}
        link={link}
        targetDelta={subXy(targetScreen, sourceScreen)}
        gradientId={`teleporterArrow-${fromKey}-${index}`.replace(
          /[^\w-]/g,
          "_",
        )}
      />,
    ];
  });

  if (arrows.length === 0) {
    // no outgoing links from this room - don't emit an empty wrapper <g>
    return null;
  }

  return (
    <g
      transform={translateXyz(roomWorldPosition(roomNode.gridPosition))}
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
