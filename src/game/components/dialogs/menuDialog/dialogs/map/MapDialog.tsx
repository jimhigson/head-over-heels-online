import { useEffect, useMemo } from "preact/hooks";

import { useCheatsOn } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { useElementSize } from "../../../../../../utils/preact/useElementSize";
import { swopPlayables } from "../../../../../gameState/mutators/swopPlayables";
import { useGameApi } from "../../../../GameApiContext";
import { useScrollingFromInput } from "../useScrollingFromInput";
import { createClickableRoomBehaviour } from "./createClickableRoomBehaviour";
import { MapSvg } from "./Map.svg";
import { getMapColoursClass } from "./mapColours";
import { mapDialogColourClasses } from "./mapDialogColourClasses";
import { MapRoomTooltipBehaviour } from "./MapRoomTooltipBehaviour";
import { useMapDataForCurrentGame } from "./useMapDataForCurrentGame";
import { useAllowCharacterSwopping } from "./useTickingCurrentCharacterName";

const useGameMapBehaviours = <RoomId extends string>() => {
  const cheatsOn = useCheatsOn();
  const gameApi = useGameApi<RoomId>();

  return useMemo(() => {
    if (!cheatsOn) {
      return undefined;
    }

    const clickableBehaviour = createClickableRoomBehaviour((roomId) => {
      gameApi.changeRoom(roomId as RoomId);
    });

    return [MapRoomTooltipBehaviour, clickableBehaviour];
  }, [cheatsOn, gameApi]);
};

const MapDialog = <RoomId extends string>() => {
  const { ref: mapContainerRef, width: mapContainerWidth } =
    useElementSize<HTMLDialogElement>();
  const scrollingContentRef = useScrollingFromInput();

  const gameApi = useGameApi<RoomId>();

  useAllowCharacterSwopping();

  useEffect(() => {
    // readiness signal for network-cost measurement (true-site-size)
    performance.mark("open map");
  }, []);

  const mapData = useMapDataForCurrentGame<RoomId>();
  const mapColourClasses = getMapColoursClass(mapData.curRoomScenery);

  const mapSvg = (
    <MapSvg<RoomId>
      onPlayableClick={(name) => swopPlayables(gameApi.gameState, name)}
      containerWidth={mapContainerWidth}
      behaviours={useGameMapBehaviours<RoomId>()}
      {...mapData}
    />
  );

  return (
    <DialogPortal>
      <Dialog
        ref={mapContainerRef}
        fullScreen
        class={`${mapDialogColourClasses} pr-0 p-0 mobile:pl-0 justify-center ${mapColourClasses.containerClassName}`}
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="map"
      >
        <div
          class="overflow-y-scroll scrollbar scrollbar-w-1 h-min"
          ref={scrollingContentRef}
        >
          {mapSvg}
        </div>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for preact/compat lazy() */
export default MapDialog;
