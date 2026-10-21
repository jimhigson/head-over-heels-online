import { type SceneryName } from "../../../../../../sprites/planets";
import { MapBackgroundSection } from "./MapBackgroundSection";
import { getMapColoursClass } from "./mapColours";
import { useMapContext } from "./MapContext";
import { type MapArea } from "./MapData";
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

export type MapBackgroundProps<RoomId extends string> = {
  /**
   * the map's area being drawn
   */
  area: MapArea<RoomId>;
  /** the room whose planet the background shows */
  backgroundRoomId: RoomId;
  /**
   * the scenery of the current room, for the map's colours
   */
  curRoomScenery: SceneryName | undefined;
  containerWidth: number;
};

export const MapBackground = <RoomId extends string>({
  area,
  backgroundRoomId,
  curRoomScenery,
  containerWidth,
}: MapBackgroundProps<RoomId>) => {
  const { isOriginalCampaign, useRoomJson } = useMapContext<RoomId>();
  const { planet } = useRoomJson(backgroundRoomId);

  const isMainMapForOriginalCampaign =
    isOriginalCampaign &&
    !["penitentiary", "bookworld", "egyptus", "safari"].includes(planet);

  const mapColours = getMapColoursClass(curRoomScenery);

  if (isMainMapForOriginalCampaign) {
    return (
      <OriginalCampaignMainMapBackground
        area={area}
        containerWidth={containerWidth}
      />
    );
  }
  // simple case of a map background representing a single planet:
  return (
    <MapBackgroundSection
      mapTitle={sceneryToMapTitle[planet]}
      class={mapColours.bgClassName}
    />
  );
};
