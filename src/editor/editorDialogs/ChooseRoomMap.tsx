import { useCallback, useMemo, useState } from "preact/hooks";

import { createClickableRoomBehaviour } from "../../game/components/dialogs/menuDialog/dialogs/map/createClickableRoomBehaviour";
import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import {
  MapContextProvider,
  type MapContextValue,
  noCellPlayables,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapContext";
import { type RoomBehaviourComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { originalUserId } from "../../gameInfo";
import { useElementSize } from "../../utils/preact/useElementSize";
import { mapAreaIndexOfRoom } from "../EditorMap/mapAreaIndexOfRoom";
import { MapAreaSwitcher } from "../EditorMap/MapAreaSwitcher";
import {
  editorMapAreas,
  editorMapData,
  editorNotableItemsByCell,
} from "../EditorMap/useEditorMapData";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import { EditorMapRoomTooltipBehaviour } from "../roomPreview/EditorMapRoomTooltipBehaviour";
import { firstSubRoomId } from "../slice/inPlaceMutators/changeCurrentRoomInPlace";

/**
 * the map with the given room as current, and the context its rooms draw from
 */
const useMapForRoom = (
  campaign: EditorCampaign,
  roomId: EditorRoomId,
  behaviours: RoomBehaviourComponent<EditorRoomId>[],
  chosenRoomId: EditorRoomId | undefined,
) => {
  const mapAreas = useMemo(() => editorMapAreas(campaign), [campaign]);
  const mapData = useMemo(
    () =>
      editorMapData(
        mapAreas,
        roomId,
        firstSubRoomId(campaign.rooms[roomId]),
        campaign.rooms[roomId].planet,
      ),
    [mapAreas, campaign, roomId],
  );
  const mapContext = useMemo((): MapContextValue<EditorRoomId> => {
    const notableItemsByCell = editorNotableItemsByCell(campaign, mapAreas);
    return {
      isOriginalCampaign: campaign.locator.userId === originalUserId,
      currentCharacterName: "head",
      onPlayableClick: undefined,
      behaviours,
      prefixDecorators: [],
      postfixDecorators: [],
      // none of these call any hooks, so are fine to swap for others when
      // the campaign or choice changes:
      useRoomJson: (mapRoomId) => campaign.rooms[mapRoomId],
      useNotableItemsInCell: (cellKey) => notableItemsByCell[cellKey],
      useNotableItemsByCell: () => notableItemsByCell,
      useCellPlayables: () => noCellPlayables,
      useRoomVisited: () => false,
      useIsRoomSelected: (mapRoomId) => mapRoomId === chosenRoomId,
    };
  }, [campaign, mapAreas, behaviours, chosenRoomId]);
  return { mapData, mapContext };
};

/**
 * map behaviours that make clicking a room choose it, and hovering it show its
 * preview
 */
const useChooseOnClickBehaviours = (onChoose: (roomId: EditorRoomId) => void) =>
  useMemo(
    () => [
      createClickableRoomBehaviour<EditorRoomId>((roomId) => onChoose(roomId)),
      EditorMapRoomTooltipBehaviour,
    ],
    [onChoose],
  );

export type ChooseRoomMapProps = {
  campaign: EditorCampaign;
  /** marked as the current room; its area is shown unless one is chosen */
  mapRoomId: EditorRoomId;
  chosenRoomId: EditorRoomId | undefined;
  onChoose: (roomId: EditorRoomId) => void;
};

/**
 * choose a room by clicking it on the map
 */
export const ChooseRoomMap = ({
  campaign,
  mapRoomId,
  chosenRoomId,
  onChoose,
}: ChooseRoomMapProps) => {
  // any room of the area the map shows:
  const [shownAreaRoomId, setShownAreaRoomId] = useState(
    chosenRoomId ?? mapRoomId,
  );
  const choose = useCallback(
    (roomId: EditorRoomId) => {
      onChoose(roomId);
      setShownAreaRoomId(roomId);
    },
    [onChoose],
  );
  const {
    ref: mapContainerRef,
    width: mapContainerWidth,
    height: mapContainerHeight,
  } = useElementSize<HTMLDivElement>();

  const behaviours = useChooseOnClickBehaviours(choose);
  const { mapData, mapContext } = useMapForRoom(
    campaign,
    mapRoomId,
    behaviours,
    chosenRoomId,
  );
  const shownAreaIndex =
    mapData.isError ? 0 : mapAreaIndexOfRoom(mapData.areas, shownAreaRoomId);

  return (
    <div class="flex flex-col gap-1 h-full">
      <div class="relative flex-1 min-h-0">
        <div
          class="h-full overflow-y-auto bg-editor-checkerboard scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue"
          ref={mapContainerRef}
        >
          {mapData.isError ?
            <span class="text-multi-line text-lightGrey">
              {`Could not draw the map:\n${mapData.errors.join("\n")}`}
            </span>
          : mapContainerHeight !== 0 && (
              <MapContextProvider value={mapContext}>
                <MapSvg<EditorRoomId>
                  containerWidth={mapContainerWidth}
                  {...mapData}
                  areaIndex={shownAreaIndex}
                />
              </MapContextProvider>
            )
          }
        </div>
        {!mapData.isError && (
          <MapAreaSwitcher
            areas={mapData.areas}
            shownAreaIndex={shownAreaIndex}
            onSwitchToRoom={setShownAreaRoomId}
          />
        )}
      </div>
    </div>
  );
};
