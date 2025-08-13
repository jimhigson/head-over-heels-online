import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useScrollingFromInput } from "../useScrollingFromInput";
import { useResizeDetector } from "react-resize-detector";
import { useAllowCharacterSwopping } from "./useCurrentCharacterName";
import { useGameApi } from "../../../../GameApiContext";
import { MapSvg } from "./Map.svg";
import { swopPlayables } from "../../../../../gameState/mutators/swopCharacters";
import { useMapDataForCurrentGame } from "./useMapDataForCurrentGame";
import { getMapColoursClass } from "./mapColours";

export const MapDialog = <RoomId extends string>() => {
  const { ref: mapContainerRef, width: mapContainerWidth } =
    useResizeDetector();
  const scrollingContentRef = useScrollingFromInput();

  const gameApi = useGameApi<RoomId>();

  // the user can switch characters while looking at the map:
  useAllowCharacterSwopping();

  const mapData = useMapDataForCurrentGame<RoomId>();
  const mapColourClasses = getMapColoursClass(mapData.curRoomScenery);

  return (
    <DialogPortal>
      <Dialog
        ref={mapContainerRef}
        fullScreen
        className={`bg-white zx:bg-zxBlack pr-0 p-0 mobile:pl-0 justify-center ${mapColourClasses.containerClassName}`}
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <div
          className="overflow-y-scroll scrollbar scrollbar-w-1 h-min"
          ref={scrollingContentRef}
        >
          <MapSvg<RoomId>
            onPlayableClick={(name) => swopPlayables(gameApi.gameState, name)}
            containerWidth={mapContainerWidth}
            {...mapData}
          />
        </div>
      </Dialog>
    </DialogPortal>
  );
};
