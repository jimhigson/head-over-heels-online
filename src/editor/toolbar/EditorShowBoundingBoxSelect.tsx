import { ShowBoundingBoxSelect } from "../../game/debug/ShowBoundingBoxSelect";
import { useEditorRoomState } from "../slice/levelEditorSelectors";

export const EditorShowBoundingBoxSelect = () => {
  const roomState = useEditorRoomState();
  return <ShowBoundingBoxSelect getCurrentRoomItems={() => roomState.items} />;
};
