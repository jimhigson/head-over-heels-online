import { useEffect, useState } from "preact/hooks";

import { loadOriginalCampaign } from "../../_generated/originalCampaign/loadOriginalCampaign";
import { type Bounds, MapSvg } from "../../map/Map.svg";
import { getMapColoursClass } from "../../map/mapColours";
import { mapSvgMarginX } from "../../map/mapConstants";
import { MapContextProvider } from "../../map/MapContext";
import { mapDialogColourClasses } from "../../map/mapDialogColourClasses";
import { useCampaignMap } from "../../map/useCampaignMap";
import { type Campaign } from "../../model/modelTypes";
import { mapSettingsHooks } from "../../store/mapSettingsHooks";
import { emptyArray } from "../../utils/empty";
import { useElementSize } from "../../utils/preact/useElementSize";

/**
 * how wide a map area is drawn, margins included
 */
const areaMapWidth = ({ l, r }: Bounds) => r - l + 2 * mapSvgMarginX;

export type CampaignAreaMapProps = {
  campaign: Campaign<string>;
  /**
   * the room marked as current, whose map area is shown
   */
  roomId: string;
};

/**
 * one area of a campaign's map, filling the page - drawn from the campaign
 * alone, with no game being played
 */
const CampaignAreaMap = ({ campaign, roomId }: CampaignAreaMapProps) => {
  const { ref: mapContainerRef, width: mapContainerWidth } =
    useElementSize<HTMLDivElement>();
  const { mapAreas, shownAreaIndex, mapContext } = useCampaignMap({
    campaign,
    // marked as the current room, as in the game, which also gives the map
    // the background and title of its planet:
    currentRoomId: roomId,
    shownAreaRoomId: roomId,
    behaviours: emptyArray,
    prefixDecorators: emptyArray,
    postfixDecorators: emptyArray,
    settingsHooks: mapSettingsHooks,
    selectedRoomId: undefined,
  });
  const { containerClassName } = getMapColoursClass(
    mapContext.useCurRoomScenery(),
  );
  // the page is at least as wide as the area's map, so a map wider than the
  // window is laid out whole from the left, and the page scrolls across it:
  const mapWidth =
    mapAreas.isError ? 0 : (
      areaMapWidth(mapAreas.areas[shownAreaIndex].mapBounds)
    );

  return (
    <div
      ref={mapContainerRef}
      class={`min-h-screen ${mapDialogColourClasses} ${containerClassName}`}
      style={{ minWidth: `${mapWidth}px` }}
      data-map-page-area={roomId}
    >
      {mapAreas.isError ?
        <span class="text-multi-line">
          {`Could not draw the map:\n${mapAreas.errors.join("\n")}`}
        </span>
      : <MapContextProvider value={mapContext}>
          <MapSvg containerWidth={mapContainerWidth} />
        </MapContextProvider>
      }
    </div>
  );
};

/**
 * the `roomId` query param: the room marked as current, whose map area is shown
 */
const mapPageRoomId = (): null | string =>
  new URLSearchParams(window.location.search).get("roomId");

/**
 * the original campaign, once loaded - it's bundled with the game, so needs
 * nothing from the store or the db
 */
const useOriginalCampaign = (): Campaign<string> | undefined => {
  const [campaign, setCampaign] = useState<Campaign<string>>();
  useEffect(() => {
    loadOriginalCampaign().then(setCampaign);
  }, []);
  return campaign;
};

/**
 * the original campaign's map, full-page, at `/map?roomId=…` - one area of
 * it, the one holding the room
 */
export const MapPage = () => {
  const roomId = mapPageRoomId();
  const campaign = useOriginalCampaign();

  return (
    <>
      <title>Map</title>
      {roomId === null ?
        <span>the map page needs a roomId</span>
      : campaign === undefined ?
        null
      : !(roomId in campaign.rooms) ?
        <span>{`there is no room ‘${roomId}’ in the original campaign`}</span>
      : <CampaignAreaMap campaign={campaign} roomId={roomId} />}
    </>
  );
};

export default MapPage;
