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

const arrowClassname = "[button:not(:disabled):hover_&]:hidden mt-quarter";
const topText = "hidden [button:not(:disabled):hover_&]:inline mt-quarter";
const bottomText = "hidden [button:not(:disabled):hover_&]:inline";

export const UndoRedoButtons = () => {
  const dispatch = useAppDispatch();

  const canUndo = useAppSelectorWithLevelEditorSlice(selectCanUndo);
  const canRedo = useAppSelectorWithLevelEditorSlice(selectCanRedo);

  return (
    <>
      <ToolbarButton
        disabled={!canUndo}
        className="flex-col"
        onClick={() => {
          dispatch(undo());
        }}
      >
        <BitmapText className={arrowClassname}>⬅</BitmapText>
        <BitmapText className={topText}>Un</BitmapText>
        <BitmapText className={bottomText}>do</BitmapText>
      </ToolbarButton>
      <ToolbarButton
        disabled={!canRedo}
        className="flex-col"
        onClick={() => {
          dispatch(redo());
        }}
      >
        <BitmapText className={arrowClassname}>➡</BitmapText>
        <BitmapText className={topText}>Re</BitmapText>
        <BitmapText className={bottomText}>do</BitmapText>
      </ToolbarButton>
    </>
  );
};
