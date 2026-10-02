import { lowestRoomIdOfArea } from "../../game/components/dialogs/menuDialog/dialogs/map/lowestRoomIdOfArea";
import { type MapArea } from "../../game/components/dialogs/menuDialog/dialogs/map/MapData";
import { Button } from "../../ui/Button";
import { type EditorRoomId } from "../editorTypes";

export type MapAreaSwitcherProps = {
  areas: ReadonlyArray<MapArea<EditorRoomId>>;
  shownAreaIndex: number;
  /** called with the first room of the area to switch to */
  onSwitchToRoom: (roomId: EditorRoomId) => void;
};

/**
 * < and > buttons for paging between the map's areas, which aren't positioned
 * relative to each other. Hidden when there is only one area
 */
export const MapAreaSwitcher = ({
  areas,
  shownAreaIndex,
  onSwitchToRoom,
}: MapAreaSwitcherProps) => {
  if (areas.length < 2) {
    return null;
  }

  const switchBy = (delta: -1 | 1) => {
    const area = areas[(shownAreaIndex + delta + areas.length) % areas.length];
    onSwitchToRoom(lowestRoomIdOfArea(area.gridPositions));
  };

  return (
    <div class="absolute bottom-1 right-1 z-10 flex gap-half text-white">
      <Button
        class="px-1 py-half"
        onClick={() => switchBy(-1)}
        tooltipContent="Previous unconnected area of the map"
      >
        <span class="text-single-line">{"<"}</span>
      </Button>
      <span class="text-single-line self-center">{`${shownAreaIndex + 1}/${areas.length}`}</span>
      <Button
        class="px-1 py-half"
        onClick={() => switchBy(1)}
        tooltipContent="Next unconnected area of the map"
      >
        <span class="text-single-line">{">"}</span>
      </Button>
    </div>
  );
};
