import type { Campaign } from "../../../../../../model/modelTypes";
import type { SceneryName } from "../../../../../../sprites/planets";
import { type Bounds } from "./Map.svg";
import { MapBackgroundSection } from "./MapBackgroundSection";
import { OriginalCampaignMainMapBackground } from "./OriginalCampaignMainMapBackground";
import type { SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";
import { useMapColours } from "./useMapColours";

const sceneryToMapTitle: Record<SceneryName, string> = {
  blacktooth: "blacktooth",
  bookworld: "bookworld",
  jail: "blacktooth",
  egyptus: "egyptus",
  moonbase: "moonbase",
  market: "market",
  penitentiary: "penitentiary",
  safari: "safari",
};

export type MapBackgroundProps<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  curRoomId: RoomId;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  mapBounds: Bounds;
  containerWidth: number;
};

export const MapBackground = <RoomId extends string>(
  props: MapBackgroundProps<RoomId>,
) => {
  const { campaign, curRoomId } = props;

  const isMainMapForOriginalCampaign =
    campaign.name === "original" &&
    !["penitentiary", "bookworld", "egyptus", "safari"].includes(
      campaign.rooms[curRoomId].planet,
    );

  const mapColours = useMapColours();
  if (isMainMapForOriginalCampaign) {
    return <OriginalCampaignMainMapBackground {...props} />;
  } else {
    // simple case of a map background representing a single planet:
    return (
      <MapBackgroundSection
        mapTitle={sceneryToMapTitle[campaign.rooms[curRoomId].planet]}
        className={mapColours.bgClassName}
      />
    );
  }
};
