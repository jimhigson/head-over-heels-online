import { type FunctionComponent } from "preact";
import { memo, Suspense } from "preact/compat";
import { useMemo } from "preact/hooks";
import { type ValueOf } from "type-fest";

import { type TeleporterLink } from "../../../../../../model/map/teleporterLinks";
import { MapBackground } from "./MapBackground";
import { mapSvgMarginX, mapSvgMarginY } from "./mapConstants";
import { useMapContext } from "./MapContext";
import { type MapArea, type MapData } from "./MapData";
import { RoomSvg } from "./Room.svg";
import { type RoomDecoratorProps } from "./RoomDecoratorProps";
import { roomWorldPosition } from "./roomWorldPosition";
import { ScrollIntoView } from "./ScrollIntoView";
import { translateXyz } from "./svgHelpers";

export type MapSvgProps<RoomId extends string> = MapData<RoomId> & {
  /** which of the map's areas to draw */
  areaIndex?: number;
  containerWidth?: number;
};

export type Bounds = {
  b: number;
  t: number;
  l: number;
  r: number;
};

type MapDecoratorLayerProps<RoomId extends string> = {
  decorators: FunctionComponent<RoomDecoratorProps<RoomId>>[];
  transform: string;
  orderedPositions: ValueOf<MapArea<RoomId>["gridPositions"]>[];
  gridPositions: MapArea<RoomId>["gridPositions"];
  curRoomId: RoomId | undefined;
  curSubRoomId: string | undefined;
  teleporterLinks: TeleporterLink<RoomId>[] | undefined;
};

/**
 * renders one `<g>` per decorator, each invoking the decorator once for every
 * placed room. used both under the rooms (prefix) and over them (postfix)
 */
const MapDecoratorLayerUnmemoised = <RoomId extends string>({
  decorators,
  transform,
  orderedPositions,
  gridPositions,
  curRoomId,
  curSubRoomId,
  teleporterLinks,
}: MapDecoratorLayerProps<RoomId>) => (
  <>
    {decorators.map((Decorator, decoratorIndex) => (
      <g key={decoratorIndex} transform={transform}>
        {orderedPositions.map(({ roomId, subRoomId, boundaries }) => (
          <Suspense key={`${roomId}/${subRoomId}`} fallback={null}>
            <Decorator
              roomId={roomId}
              subRoomId={subRoomId}
              boundaries={boundaries}
              isCurrentRoom={curRoomId === roomId}
              isCurrentSubRoom={
                curRoomId === roomId && curSubRoomId === subRoomId
              }
              allGridPositions={gridPositions}
              teleporterLinks={teleporterLinks}
            />
          </Suspense>
        ))}
      </g>
    ))}
  </>
);

// memoised, since none of its props depend on what is in the rooms - so an edit
// inside a room leaves every room's decorations alone:
const MapDecoratorLayer = memo(MapDecoratorLayerUnmemoised);

/**
 * the map's areas - drawing what is in each room from the map's context, so
 * it must be inside a `MapContextProvider`
 */
export const MapSvg = <RoomId extends string>({
  areas,
  areaIndex = 0,
  containerWidth,
  curRoomId,
  curSubRoomId,
  curRoomScenery,
  teleporterLinks,
}: MapSvgProps<RoomId>) => {
  const { prefixDecorators, postfixDecorators } = useMapContext<RoomId>();
  const area = areas[areaIndex];
  const { gridPositions, mapBounds } = area;

  const orderedPositions = useMemo(
    () => Object.values(gridPositions) as ValueOf<typeof gridPositions>[],
    [gridPositions],
  );

  if (containerWidth === undefined) {
    // until the container width is known, don't render anything. This prop is optional
    // to avoid the multiple call-sites that all need the same check from having to
    // do the branching themselves
    return null;
  }

  const contentW = mapBounds.r - mapBounds.l + 2 * mapSvgMarginX;
  const contentH = mapBounds.b - mapBounds.t + 2 * mapSvgMarginY;

  const gridTransform = `translate(${-mapBounds.l + mapSvgMarginX + (containerWidth - contentW) / 2},${-mapBounds.t + mapSvgMarginY})`;

  // the map's background (the planet artwork and title) normally comes from
  // the current room's planet. If the area being shown doesn't contain the
  // current room (eg after paging to another area with < >), the background
  // uses the planet of that area's first room instead:
  const backgroundRoomId =
    curRoomId === undefined ? undefined
    : orderedPositions.some(({ roomId }) => roomId === curRoomId) ? curRoomId
    : area.firstRoomId;

  const decoratorLayerProps = {
    transform: gridTransform,
    orderedPositions,
    gridPositions,
    curRoomId,
    curSubRoomId,
    teleporterLinks,
  };

  return (
    <svg
      class={"w-full"}
      style={{
        minWidth: `${contentW}px`,
        height: `${contentH}px`,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {backgroundRoomId === undefined ? null : (
        <MapBackground<RoomId>
          area={area}
          backgroundRoomId={backgroundRoomId}
          curRoomScenery={curRoomScenery}
          containerWidth={containerWidth}
        />
      )}
      {prefixDecorators.length > 0 && (
        <MapDecoratorLayer
          decorators={prefixDecorators}
          {...decoratorLayerProps}
        />
      )}
      <g transform={gridTransform}>
        {orderedPositions.map((gridPositionSpec) => {
          const { roomId, subRoomId, gridPosition } = gridPositionSpec;
          const roomRenderingId: `${RoomId}/${string}` = `${roomId}/${subRoomId}`;
          const isCurrentRoom = curRoomId === roomId;

          return (
            <g
              key={roomRenderingId}
              data-id={roomRenderingId}
              transform={translateXyz(roomWorldPosition(gridPosition))}
            >
              <RoomSvg
                roomGridPositionSpec={gridPositionSpec}
                isCurrentRoom={isCurrentRoom}
              />
              {isCurrentRoom ?
                <ScrollIntoView svg smooth />
              : null}
            </g>
          );
        })}
      </g>
      {postfixDecorators.length > 0 && (
        <MapDecoratorLayer
          decorators={postfixDecorators}
          {...decoratorLayerProps}
        />
      )}
    </svg>
  );
};
