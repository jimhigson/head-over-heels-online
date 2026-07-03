import { NonIdealState } from "../../ui/NonIdealState";
import { SpinnerHead } from "../../ui/Spinner";
import { type EditorRoomId } from "../editorTypes";
import { previewHeightPx, previewWidthPx } from "./renderRoomPreviewImage";
import { useRoomPreviewSnapshot } from "./useRoomPreviewSnapshot";

export type RoomPreviewProps = {
  roomId: EditorRoomId;
};

const previewBoxStyle = {
  width: `${previewWidthPx}px`,
  height: `${previewHeightPx}px`,
};

export const RoomPreview = ({ roomId }: RoomPreviewProps) => {
  const preview = useRoomPreviewSnapshot(roomId);

  if (preview?.status === "ready") {
    return (
      <img
        src={preview.dataUrl}
        alt={`preview of room ${roomId}`}
        width={previewWidthPx}
        height={previewHeightPx}
        class="[image-rendering:pixelated]"
        style={previewBoxStyle}
      />
    );
  }

  if (preview?.status === "error") {
    return (
      <NonIdealState
        text="Preview failed to load"
        class="bg-midRed text-white"
        style={previewBoxStyle}
      />
    );
  }

  return (
    <div style={previewBoxStyle} class="bg-pureBlack">
      <SpinnerHead />
    </div>
  );
};
