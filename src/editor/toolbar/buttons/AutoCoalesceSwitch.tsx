import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { Switch } from "../../../ui/Switch";
import { setAutoCoalesce } from "../../slice/levelEditorSlice";

export const AutoCoalesceSwitch = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      className={className}
      label="Coalesce"
      ariaLabel="Coalesce blocks"
      value={useEditorAppSelector((state) => state.levelEditor.autoCoalesce)}
      onChange={(value) => {
        dispatch(setAutoCoalesce(value));
      }}
      shortcutKeys={["L"]}
      tooltipContent={`Optimise blocks into single items while editing, or keep separate?`}
    />
  );
};
