import { useAppDispatch } from "../../store/hooks";
import { Switch } from "../../ui/Switch";
import {
  setAutoCoalesce,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const AutoCoalesceSwitch = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      className={className}
      label="coalesce"
      value={useAppSelectorWithLevelEditorSlice(
        (state) => state.levelEditor.autoCoalesce,
      )}
      onChange={(value) => {
        dispatch(setAutoCoalesce(value));
      }}
      shortcutKeys={["C"]}
    />
  );
};
