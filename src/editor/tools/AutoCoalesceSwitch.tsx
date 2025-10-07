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
      label="Coalesce"
      value={useAppSelectorWithLevelEditorSlice(
        (state) => state.levelEditor.autoCoalesce,
      )}
      onChange={(value) => {
        dispatch(setAutoCoalesce(value));
      }}
      shortcutKeys={["L"]}
      tooltipContent={`optimise blocks into single items while editing, or keep separate?`}
    />
  );
};
