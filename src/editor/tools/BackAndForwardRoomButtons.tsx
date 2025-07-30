import { useAppDispatch } from "../../store/hooks";
import {
  roomBack,
  roomForward,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

const backTooltipMarkdown = `
## Back

Go back to the previous room

hotkey: **<**
`;

const forwardTooltipMarkdown = `
## Forward

The opposite of back

hotkey: **>**
`;

export const BackAndForwardRoomButtons = () => {
  const hasBack = useAppSelectorWithLevelEditorSlice(({ levelEditor }) => {
    const { editingRoomIdHistory } = levelEditor;
    return editingRoomIdHistory.back.length > 0;
  });
  const hasForward = useAppSelectorWithLevelEditorSlice(({ levelEditor }) => {
    const { editingRoomIdHistory } = levelEditor;
    return editingRoomIdHistory.forward.length > 0;
  });
  const dispatch = useAppDispatch();

  return (
    <>
      <ToolbarButton
        disabled={!hasBack}
        onClick={() => {
          dispatch(roomBack());
        }}
        // this is bit weird - need to give shift on OSX since the <
        // is on the , key, and can only be types using shift.
        // I think windows is the same, so this should be ok
        shortcutKeys={["⇧<"]}
        tooltipContent={backTooltipMarkdown}
      >
        <span className={`sprite texture-hud_char_lt relative`} />
      </ToolbarButton>
      <ToolbarButton
        disabled={!hasForward}
        onClick={() => {
          dispatch(roomForward());
        }}
        shortcutKeys={["⇧>"]}
        tooltipContent={forwardTooltipMarkdown}
      >
        <span className={`sprite texture-hud_char_gt relative`} />
      </ToolbarButton>
    </>
  );
};
