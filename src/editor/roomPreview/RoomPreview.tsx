import { SpinnerHead } from "../../ui/Spinner";
import { type EditorRoomId } from "../editorTypes";
import { previewHeightPx, previewWidthPx } from "./renderRoomPreviewImage";
import { useRoomPreview } from "./useRoomPreview";

export type RoomPreviewProps = {
  roomId: EditorRoomId;
};

const previewBoxStyle = {
  width: `${previewWidthPx}px`,
  height: `${previewHeightPx}px`,
};

export const RoomPreview = ({ roomId }: RoomPreviewProps) => {
  const preview = useRoomPreview(roomId);

  if (preview?.status === "ready") {
    return (
      <img
        src={preview.dataUrl}
        alt={`preview of room ${roomId}`}
        width={previewWidthPx}
        height={previewHeightPx}
        className="[image-rendering:pixelated]"
        style={previewBoxStyle}
      />
    );
  }

  if (preview?.status === "error") {
    return <div style={previewBoxStyle} />;
  }

  return (
    <div style={previewBoxStyle} className="bg-pureBlack">
      <SpinnerHead />
    </div>
  );
};
