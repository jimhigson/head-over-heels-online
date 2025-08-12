import type { SceneryName } from "../../../../../../sprites/planets";
import { MapBackgroundSection } from "./MapBackgroundSection";
import { getMapColoursClass } from "./mapColours";
import type { MapData } from "./MapData";
import { OriginalCampaignMainMapBackground } from "./OriginalCampaignMainMapBackground";

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

export type MapBackgroundProps<RoomId extends string> = MapData<RoomId> & {
  curRoomId: RoomId;
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

  const mapColours = getMapColoursClass(props.curRoomScenery);

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
