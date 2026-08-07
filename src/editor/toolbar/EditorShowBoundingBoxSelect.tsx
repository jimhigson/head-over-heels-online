import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import { useGetEditorRoomState } from "../EditorRoomStateProvider";

export const EditorShowBoundingBoxSelect = () => {
  const getRoomState = useGetEditorRoomState();
  return (
    <ShowBoundingBoxSelect getCurrentRoomItems={() => getRoomState().items} />
  );
};
