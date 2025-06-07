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
      className={`flex w-3 h-3 ${isCurrentTool ? "bg-pastelBlue" : ""}`}
      onClick={() => store.dispatch(setTool({ type: "pointer" }))}
    >
      <span
        className={`sprite texture-hud.char.↖ relative [button:active_&]:top-quarter`}
      />
    </Button>
  );
};
