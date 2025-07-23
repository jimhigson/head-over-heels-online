import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useAppDispatch } from "../../store/hooks";
import {
  redo,
  selectCanRedo,
  selectCanUndo,
  undo,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";

export const UndoRedoButtons = () => {
  const dispatch = useAppDispatch();

  const canUndo = useAppSelectorWithLevelEditorSlice(selectCanUndo);
  const canRedo = useAppSelectorWithLevelEditorSlice(selectCanRedo);

  return (
    <div className="flex flex-row gap-oneScaledPix bg-metallicBlue">
      <ToolbarButton
        disabled={!canUndo}
        onClick={() => {
          dispatch(undo());
        }}
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
