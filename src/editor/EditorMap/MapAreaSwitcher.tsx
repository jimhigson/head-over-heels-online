import { memo } from "preact/compat";

import { type MapArea } from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import { useEditorAppSelector } from "../../store/store";
import { RoomSelect } from "../../ui/RoomSelect";
import { type EditorRoomId } from "../editorTypes";
import { buttonSmallHeightClassNames } from "../toolbar/buttonSizeClassNames";
import {
  selectEditorMapAreaFirstRoomHues,
  selectEditorMapAreaLabels,
  selectEditorMapAreaRoomCounts,
} from "./useEditorMapData";

export type MapAreaSwitcherProps = {
  areas: ReadonlyArray<MapArea<EditorRoomId>>;
  shownAreaIndex: number;
  /** called with the first room of the area to switch to */
  onSwitchToRoom: (roomId: EditorRoomId) => void;
};

/**
 * chooses an area of the map by name - the areas' names are selected on
 * their own, so this doesn't re-render for edits that leave them
 */
const MapAreaSelect = memo(
  ({ shownAreaFirstRoomId, onSwitchToRoom }: MapAreaSelectProps) => {
    const areaLabels = useEditorAppSelector(selectEditorMapAreaLabels);
    const areaRoomCounts = useEditorAppSelector(selectEditorMapAreaRoomCounts);
    return (
      <RoomSelect<EditorRoomId>
        roomHues={useEditorAppSelector(selectEditorMapAreaFirstRoomHues)}
        roomLabel={(roomId) => areaLabels[roomId] ?? roomId}
        roomDetail={(roomId) => areaRoomCounts[roomId]}
        withoutSearch
        value={shownAreaFirstRoomId}
        onSelect={onSwitchToRoom}
        triggerButtonClassName={`px-1 ${buttonSmallHeightClassNames}`}
        tooltipContent="Go to an unconnected area of the map"
      />
    );
  },
);

export type MapAreaSelectProps = {
  shownAreaFirstRoomId: EditorRoomId;
  onSwitchToRoom: MapAreaSwitcherProps["onSwitchToRoom"];
};

/**
 * chooses between the map's areas, which aren't positioned relative to each
 * other. Hidden when there is only one area
 */
export const MapAreaSwitcher = ({
  areas,
  shownAreaIndex,
  onSwitchToRoom,
}: MapAreaSwitcherProps) =>
  areas.length < 2 ?
    null
  : <div class="z-10 flex leading-none text-white pointer-events-auto">
      <MapAreaSelect
        shownAreaFirstRoomId={areas[shownAreaIndex].firstRoomId}
        onSwitchToRoom={onSwitchToRoom}
      />
    </div>;
