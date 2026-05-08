import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import {
  redo,
  selectCanRedo,
  selectCanUndo,
  undo,
} from "../../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const UndoRedoButtons = () => {
  const dispatch = useAppDispatch();

  const canUndo = useEditorAppSelector(selectCanUndo);
  const canRedo = useEditorAppSelector(selectCanRedo);

  return (
    <div className="flex flex-row gap-oneScaledPix bg-metallicBlue">
      <ToolbarButton
        disabled={!canUndo}
        onClick={() => {
          dispatch(undo());
        }}
        tooltipContent="## Undo"
        shortcutKeys={["⌘Z", "^Z"]}
      >
        <IconWithTwoLineHoverText
          icon={<BitmapText>⬅</BitmapText>}
          topText="un"
          bottomText="do"
        />
      </ToolbarButton>
      <ToolbarButton
        disabled={!canRedo}
        onClick={() => {
          dispatch(redo());
        }}
        tooltipContent="## Redo"
        shortcutKeys={["⌘⇧Z", "^⇧Z"]}
      >
        <IconWithTwoLineHoverText
          icon={<BitmapText>➡</BitmapText>}
          topText="re"
          bottomText="do"
        />
      </ToolbarButton>
    </div>
  );
};
