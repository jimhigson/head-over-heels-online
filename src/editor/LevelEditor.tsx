import { LevelEditorToolbar } from "./LevelEditorToolbar";
import { RoomEditingArea } from "./RoomEditingArea/RoomEditingArea";

const LevelEditor = () => {
  return (
    <div>
      <RoomEditingArea />
      <LevelEditorToolbar />
    </div>
  );
};

export default LevelEditor;
