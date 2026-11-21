import { useCallback, useEffect, useMemo } from "preact/hooks";

import { createClickableRoomBehaviour } from "../../../../../../map/createClickableRoomBehaviour";
import { MapSvg } from "../../../../../../map/Map.svg";
import { getMapColoursClass } from "../../../../../../map/mapColours";
import { MapContextProvider } from "../../../../../../map/MapContext";
import { mapDialogColourClasses } from "../../../../../../map/mapDialogColourClasses";
import { type IndividualCharacterName } from "../../../../../../model/modelTypes";
import { closeMenuThunk } from "../../../../../../store/slices/gameMenus/closeMenuThunk";
import { useCheatsOn } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { emptyArray } from "../../../../../../utils/empty";
import { useElementSize } from "../../../../../../utils/preact/useElementSize";
import { swopPlayables } from "../../../../../gameState/mutators/swopPlayables";
import { useGameApi } from "../../../../GameApiContext";
import { useScrollingFromInputRef } from "../useScrollingFromInputRef";
import { MapRoomTooltipBehaviour } from "./MapRoomTooltipBehaviour";
import { useMapContextForCurrentGame } from "./useMapContextForCurrentGame";
import { useAllowCharacterSwopping } from "./useTickingCurrentCharacterName";

const useGameMapBehaviours = <RoomId extends string>() => {
  const cheatsOn = useCheatsOn();
  const gameApi = useGameApi<RoomId>();

  return useMemo(() => {
    if (!cheatsOn) {
      return emptyArray;
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
  const scrollingFromInputRef = useScrollingFromInputRef();

  const gameApi = useGameApi<RoomId>();

  useAllowCharacterSwopping();

  useEffect(() => {
    // readiness signal for network-cost measurement (true-site-size)
    performance.mark("open map");
  }, []);

  const onPlayableClick = useCallback(
    (name: IndividualCharacterName) => swopPlayables(gameApi.gameState, name),
    [gameApi],
  );
  const mapContext = useMapContextForCurrentGame<RoomId>(
    useGameMapBehaviours<RoomId>(),
    onPlayableClick,
  );
  const mapColourClasses = getMapColoursClass(mapContext.useCurRoomScenery());

  const mapSvg = (
    <MapContextProvider value={mapContext}>
      <MapSvg<RoomId> containerWidth={mapContainerWidth} />
    </MapContextProvider>
  );

  return (
    <DialogPortal>
      <Dialog
        ref={mapContainerRef}
        fullScreen
        class={`${mapDialogColourClasses} pr-0 p-0 mobile:pl-0 justify-center ${mapColourClasses.containerClassName}`}
        onClick={useDispatchActionCallback(closeMenuThunk, "map")}
        dialogId="map"
      >
        <div
          class="overflow-y-scroll scrollbar scrollbar-w-1 h-min"
          ref={scrollingFromInputRef}
        >
          {mapSvg}
        </div>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for preact/compat lazy() */
export default MapDialog;
