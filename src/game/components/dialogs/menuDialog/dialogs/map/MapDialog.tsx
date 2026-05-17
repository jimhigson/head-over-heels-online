import { useMemo } from "preact/hooks";

import { useCheatsOn } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { useElementSize } from "../../../../../../utils/react/useElementSize";
import { swopPlayables } from "../../../../../gameState/mutators/swopPlayables";
import { useGameApi } from "../../../../GameApiContext";
import { useScrollingFromInput } from "../useScrollingFromInput";
import { createClickableRoomDecorator } from "./createClickableRoomDecorator";
import { LazyMapRoomTooltipDecorator } from "./LazyMapRoomTooltipDecorator";
import { MapSvg } from "./Map.svg";
import { getMapColoursClass } from "./mapColours";
import { useMapDataForCurrentGame } from "./useMapDataForCurrentGame";
import { useAllowCharacterSwopping } from "./useTickingCurrentCharacterName";

const useGameMapClickableAreaDecorators = <RoomId extends string>() => {
  const cheatsOn = useCheatsOn();
  const gameApi = useGameApi<RoomId>();

  return useMemo(() => {
    if (!cheatsOn) {
      return undefined;
    }

    const clickableDecorator = createClickableRoomDecorator((roomId) => {
      gameApi.changeRoom(roomId as RoomId);
    });

    return [LazyMapRoomTooltipDecorator, clickableDecorator];
  }, [cheatsOn, gameApi]);
};

const MapDialog = <RoomId extends string>() => {
  const { ref: mapContainerRef, width: mapContainerWidth } =
    useElementSize<HTMLDialogElement>();
  const scrollingContentRef = useScrollingFromInput();

  const gameApi = useGameApi<RoomId>();

  useAllowCharacterSwopping();

  const mapData = useMapDataForCurrentGame<RoomId>();
  const mapColourClasses = getMapColoursClass(mapData.curRoomScenery);

  const mapSvg = (
    <MapSvg<RoomId>
      onPlayableClick={(name) => swopPlayables(gameApi.gameState, name)}
      containerWidth={mapContainerWidth}
      clickableAreaDecorators={useGameMapClickableAreaDecorators<RoomId>()}
      {...mapData}
    />
  );

  return (
    <DialogPortal>
      <Dialog
        ref={mapContainerRef}
        fullScreen
        className={`bg-white zx:bg-zxBlack toppy:bg-toppyBlack pr-0 p-0 mobile:pl-0 justify-center ${mapColourClasses.containerClassName}`}
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="map"
      >
        <div
          className="overflow-y-scroll scrollbar scrollbar-w-1 h-min"
          ref={scrollingContentRef}
        >
          {mapSvg}
        </div>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for React.lazy */
export default MapDialog;
