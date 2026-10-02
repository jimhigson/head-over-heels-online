import { originalUserId } from "../../../../../../gameInfo";
import { type SceneryName } from "../../../../../../sprites/planets";
import { MapBackgroundSection } from "./MapBackgroundSection";
import { getMapColoursClass } from "./mapColours";
import { type MapData } from "./MapData";
import { OriginalCampaignMainMapBackground } from "./OriginalCampaignMainMapBackground";

const sceneryToMapTitle: Record<SceneryName, string> = {
  blacktooth: "Blacktooth",
  bookworld: "Bookworld",
  jail: "Blacktooth",
  egyptus: "Egyptus",
  moonbase: "Moonbase",
  market: "Market",
  penitentiary: "Penitentiary",
  safari: "Safari",
};

export type MapBackgroundProps<RoomId extends string> = MapData<RoomId> & {
  /** which of the map's areas is drawn */
  areaIndex: number;
  /** the room whose planet the background shows */
  backgroundRoomId: RoomId;
  containerWidth: number;
};

export const MapBackground = <RoomId extends string>(
  props: MapBackgroundProps<RoomId>,
) => {
  const { campaign, backgroundRoomId, areas, areaIndex, containerWidth } =
    props;

  const isMainMapForOriginalCampaign =
    campaign.locator.userId === originalUserId &&
    !["penitentiary", "bookworld", "egyptus", "safari"].includes(
      campaign.rooms[backgroundRoomId].planet,
    );

  const mapColours = getMapColoursClass(props.curRoomScenery);

  if (isMainMapForOriginalCampaign) {
    return (
      <OriginalCampaignMainMapBackground
        area={areas[areaIndex]}
        containerWidth={containerWidth}
      />
    );
  }
  // simple case of a map background representing a single planet:
  return (
    <MapBackgroundSection
      mapTitle={sceneryToMapTitle[campaign.rooms[backgroundRoomId].planet]}
      class={mapColours.bgClassName}
    />
  );
};
