import { useResizeDetector } from "react-resize-detector";
import { MapSvg } from "../../game/components/dialogs/menuDialog/dialogs/map/Map.svg";
import type { EditorRoomId } from "../editorTypes";
import { useEditorMapData } from "./useEditorMapData";
import { changeToRoom } from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";

export const EditorMap = () => {
  const {
    ref: mapContainerRef,
    width: mapContainerWidth,
    height: mapContainerHeight,
  } = useResizeDetector();
  const mapData = useEditorMapData();

  if (mapData === undefined) {
    return (
      <div className="h-full flex justify-center items-center w-full scale-editor bg-shadow text-white">
        <BitmapText>
          Could not solve map geometry - will show again on valid map data
        </BitmapText>
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
