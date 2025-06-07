import { Button } from "../../ui/button";
import { store } from "../../store/store";
import {
  selectTool,
  setTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const PointerToolButton = () => {
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);

  const isCurrentTool = currentTool?.type === "pointer";

  return (
    <Button
      className={`flex-1 w-2 h-2 p-quarter ${isCurrentTool ? "bg-pastelBlue" : ""}`}
      onClick={() => store.dispatch(setTool({ type: "pointer" }))}
    >
      <span
        className={`sprite texture-hud.char.↖ relative [button:active_&]:top-quarter`}
      />
    </Button>
  );
};
