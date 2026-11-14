import { useCallback, useMemo, useState } from "preact/hooks";

import { createClickableRoomBehaviour } from "../../game/components/dialogs/menuDialog/dialogs/map/createClickableRoomBehaviour";
import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import {
  MapContextProvider,
  type MapContextValue,
  noCellPlayables,
} from "../../game/components/dialogs/menuDialog/dialogs/map/MapContext";
import { type RoomBehaviourComponent } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { selectNotableItems } from "../../game/components/dialogs/menuDialog/dialogs/map/selectNotableItems";
import { originalUserId } from "../../gameInfo";
import { teleporterLinksFromCell } from "../../model/map/teleporterLinksFromCell";
import { emptyObject } from "../../utils/empty";
import { useElementSize } from "../../utils/preact/useElementSize";
import { mapAreaIndexOfRoom } from "../EditorMap/mapAreaIndexOfRoom";
import { MapAreaSwitcher } from "../EditorMap/MapAreaSwitcher";
import { editorMapAreas } from "../EditorMap/useEditorMapData";
import { type EditorCampaign, type EditorRoomId } from "../editorTypes";
import { EditorMapRoomTooltipBehaviour } from "../roomPreview/EditorMapRoomTooltipBehaviour";
import { firstSubRoomId } from "../slice/inPlaceMutators/firstSubRoomId";

/**
 * the map's areas, and the context its rooms draw from with the given room
 * as current
 */
const useMapForRoom = (
  campaign: EditorCampaign,
  roomId: EditorRoomId,
  behaviours: RoomBehaviourComponent<EditorRoomId>[],
  chosenRoomId: EditorRoomId | undefined,
  /**
   * any room of the area to show
   */
  shownAreaRoomId: EditorRoomId,
) => {
  const mapAreas = useMemo(() => editorMapAreas(campaign), [campaign]);
  const shownAreaIndex =
    mapAreas.isError ? 0 : mapAreaIndexOfRoom(mapAreas.areas, shownAreaRoomId);
  const maybeShownArea =
    mapAreas.isError ? undefined : mapAreas.areas[shownAreaIndex];
  const mapContext = useMemo(
    (): MapContextValue<EditorRoomId> => ({
      isOriginalCampaign: campaign.locator.userId === originalUserId,
      currentCharacterName: "head",
      onPlayableClick: undefined,
      behaviours,
      prefixDecorators: [],
      postfixDecorators: [],
      // none of these call any hooks, so are fine to swap for others when
      // the campaign or choice changes:
      useShownArea() {
        // the map is only drawn when its geometry could be solved:
        if (import.meta.env.DEV && maybeShownArea === undefined) {
          throw new Error("the map was drawn without its geometry solved");
        }
        return maybeShownArea!;
      },
      useCurRoomId: () => roomId,
      useCurSubRoomId: () => firstSubRoomId(campaign.rooms[roomId]),
      useCurRoomScenery: () => campaign.rooms[roomId].planet,
      useTeleporterLinksFrom: (mapRoomId, subRoomId) =>
        teleporterLinksFromCell(campaign, mapRoomId, subRoomId),
      useRoomJson: (mapRoomId) => campaign.rooms[mapRoomId],
      // the editor collects no pickups:
      useNotableItems: (mapRoomId, subRoomId) =>
        selectNotableItems(campaign.rooms[mapRoomId], emptyObject, subRoomId),
      useCellPlayables: () => noCellPlayables,
      useRoomVisited: () => false,
      useIsRoomSelected: (mapRoomId) => mapRoomId === chosenRoomId,
    }),
    [campaign, maybeShownArea, roomId, behaviours, chosenRoomId],
  );
  return { mapAreas, shownAreaIndex, mapContext };
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

  const chooseOnClickBehaviours = useChooseOnClickBehaviours(choose);
  const { mapAreas, shownAreaIndex, mapContext } = useMapForRoom(
    campaign,
    mapRoomId,
    chooseOnClickBehaviours,
    chosenRoomId,
    shownAreaRoomId,
  );

  return (
    <div class="flex flex-col gap-1 h-full">
      <div class="relative flex-1 min-h-0">
        <div
          class="h-full overflow-y-auto bg-editor-checkerboard scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue"
          ref={mapContainerRef}
        >
          {mapAreas.isError ?
            <span class="text-multi-line text-lightGrey">
              {`Could not draw the map:\n${mapAreas.errors.join("\n")}`}
            </span>
          : mapContainerHeight !== 0 && (
              <MapContextProvider value={mapContext}>
                <MapSvg<EditorRoomId> containerWidth={mapContainerWidth} />
              </MapContextProvider>
            )
          }
        </div>
        {!mapAreas.isError && (
          <MapAreaSwitcher
            areas={mapAreas.areas}
            shownAreaIndex={shownAreaIndex}
            onSwitchToRoom={setShownAreaRoomId}
          />
        )}
      </div>
    </div>
  );
};
