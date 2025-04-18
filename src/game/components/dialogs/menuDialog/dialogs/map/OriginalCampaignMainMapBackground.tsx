import type { OriginalCampaignRoomId } from "../../../../../../_generated/originalCampaign/OriginalCampaignRoomId";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import type { MapBackgroundProps } from "./MapBackground";
import { MapBackgroundSection } from "./MapBackgroundSection";
import { mapClasses } from "./mapColours";
import { mapSvgMargin } from "./mapConstants";
import { MarketSpecialBackground } from "./MarketSpecialBackground";
import { roomWorldPosition } from "./roomWorldPosition";
import type { SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";

/**
 * the central map of the original campaign is (messily) being treated as a
 * hand-edited special case:
 */
export const OriginalCampaignMainMapBackground = <RoomId extends string>({
  gridPositions,
  mapBounds,
  containerWidth,
}: MapBackgroundProps<RoomId>) => {
  const originalCampaignPositions =
    gridPositions as unknown as SortedObjectOfRoomGridPositionSpecs<OriginalCampaignRoomId>;

  // projected y ordinal of the top-back corner of the room
  const topOfRoomFloor = projectWorldXyzToScreenXy(
    roomWorldPosition({ x: 1, y: 1, z: 0 }),
  ).y;
  // projected y ordinal of the top-back corner of the room
  const topOfRoomWall = projectWorldXyzToScreenXy(
    roomWorldPosition({ x: 1, y: 1, z: 1 }),
  ).y;

  type RoomAndSubRoomId = keyof typeof originalCampaignPositions;

  const yAboveRoom = (roomAboveId: RoomAndSubRoomId) => {
    const y1 = projectWorldXyzToScreenXy(
      roomWorldPosition(originalCampaignPositions[roomAboveId].gridPosition),
    ).y;
    return y1 + topOfRoomWall;
  };
  const yBetweenRooms = (
    roomAboveId: RoomAndSubRoomId,
    roomBelowId: RoomAndSubRoomId,
  ) => {
    if (originalCampaignPositions[roomAboveId] === undefined) {
      throw new Error(roomAboveId);
    }
    if (originalCampaignPositions[roomBelowId] === undefined) {
      throw new Error(roomBelowId);
    }

    const y1 = projectWorldXyzToScreenXy(
      roomWorldPosition(originalCampaignPositions[roomAboveId].gridPosition),
    ).y;
    const y2 =
      projectWorldXyzToScreenXy(
        roomWorldPosition(originalCampaignPositions[roomBelowId].gridPosition),
      ).y +
      topOfRoomFloor +
      mapSvgMargin;
    return (y1 + y2) / 2;
  };

  return (
    <>
      {/*
                do not translate this - safari has a bug that css filtered foreign object
                contents do not render correctly when translated
              */}
      <MapBackgroundSection
        y={yAboveRoom("finalroom/*") - mapBounds.t}
        mapTitle={"Freedom"}
        className={mapClasses.freedom.bgClassName}
      />
      <MapBackgroundSection
        y={
          yBetweenRooms("finalroom/*", "blacktooth83tofreedom/*") - mapBounds.t
        }
        mapTitle={"Castle Blacktooth"}
        className={mapClasses.blacktooth.bgClassName}
      />
      <MapBackgroundSection
        y={yBetweenRooms("blacktooth87crown/*", "moonbase35/*") - mapBounds.t}
        mapTitle={"moonbase"}
        className={mapClasses.moonbase.bgClassName}
      />
      <MapBackgroundSection
        y={yBetweenRooms("moonbase4/*", "blacktooth62fish/right") - mapBounds.t}
        mapTitle={"Blacktooth escape"}
        className={mapClasses.blacktooth.bgClassName}
      />
      <MarketSpecialBackground
        mapBounds={mapBounds}
        originalCampaignPositions={originalCampaignPositions}
        containerWidth={containerWidth}
      />
      <MapBackgroundSection
        y={yBetweenRooms("blacktooth24/*", "blacktooth1head/*") - mapBounds.t}
        mapTitle={"Jail"}
        className={mapClasses.jail.bgClassName}
      />
    </>
  );
};
