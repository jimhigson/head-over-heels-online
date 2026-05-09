import type { EditorRoomId } from "../editorTypes";

import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { store } from "../../store/store";
import { useElementSize } from "../../utils/react/useElementSize";
import { changeToRoom } from "../slice/levelEditorSlice";
import { useEditorMapData } from "./useEditorMapData";

export const EditorMap = () => {
  const {
    ref: mapContainerRef,
    width: mapContainerWidth,
    height: mapContainerHeight,
  } = useElementSize<HTMLDivElement>();
  const mapData = useEditorMapData();

  if (mapData.isError) {
    return (
      <div className="p-1 h-full flex flex-col gap-y-1 w-full scale-editor bg-shadow text-white overflow-scroll">
        <BitmapText className="text-midRed sprites-double-height">
          Could not solve map geometry - will show again on valid map data
        </BitmapText>
        {mapData.errors.map((msg, i) => (
          <div key={i}>
            <BitmapText>{msg}</BitmapText>
          </div>
        ))}
      </div>
    );
  }

  if (mapContainerHeight === 0) {
    // probably means the panel the map is on has been minimised - render nothing:
    return null;
  }

  return (
    <div
      className={`h-full overflow-y-auto scale-editor bg-editor-checkerboard scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue`}
      ref={mapContainerRef}
    >
      <MapSvg<EditorRoomId>
        containerWidth={mapContainerWidth}
        onRoomClick={(roomId) => {
          store.dispatch(changeToRoom(roomId));
        }}
        {...mapData}
      />
    </div>
  );
};
