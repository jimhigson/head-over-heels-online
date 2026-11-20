import { memo } from "preact/compat";
import { useCallback, useMemo, useState } from "preact/hooks";

import { createClickableRoomBehaviour } from "../../map/createClickableRoomBehaviour";
import { MapSvg } from "../../map/Map.svg";
import { MapContextProvider } from "../../map/MapContext";
import { useCampaignMap } from "../../map/useCampaignMap";
import { mapSettingsHooks } from "../../store/mapSettingsHooks";
import { useElementSize } from "../../utils/preact/useElementSize";
import { LazyEditorMapNonContiguousRelationshipDecorator } from "../EditorMap/LazyEditorMapNonContiguousRelationshipDecorator";
import { LazyEditorMapTeleporterLinkDecorator } from "../EditorMap/LazyEditorMapTeleporterLinkDecorator";
import { MapAreaSwitcher } from "../EditorMap/MapAreaSwitcher";
import type { EditorCampaign, EditorRoomId } from "../editorTypes";
import { EditorMapRoomTooltipBehaviour } from "../roomPreview/EditorMapRoomTooltipBehaviour";

const chooseRoomMapPrefixDecorators = [
  memo(LazyEditorMapNonContiguousRelationshipDecorator),
];

const chooseRoomMapPostfixDecorators = [
  memo(LazyEditorMapTeleporterLinkDecorator),
];

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
  const { mapAreas, shownAreaIndex, mapContext } = useCampaignMap({
    campaign,
    currentRoomId: mapRoomId,
    shownAreaRoomId,
    behaviours: chooseOnClickBehaviours,
    prefixDecorators: chooseRoomMapPrefixDecorators,
    postfixDecorators: chooseRoomMapPostfixDecorators,
    settingsHooks: mapSettingsHooks,
    selectedRoomId: chosenRoomId,
  });

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
          // inset into the bottom-left of the map, over it:
          <div class="absolute bottom-0 left-0 flex pointer-events-none">
            <MapAreaSwitcher
              firstRoomIds={mapAreas.areas.map(
                ({ firstRoomId }) => firstRoomId,
              )}
              shownAreaIndex={shownAreaIndex}
              onSwitchToRoom={setShownAreaRoomId}
            />
          </div>
        )}
      </div>
    </div>
  );
};
