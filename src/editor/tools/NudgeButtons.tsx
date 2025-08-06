import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useAppDispatch } from "../../store/hooks";
import { store } from "../../store/store";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { elementWiseProductXyz, type Xyz } from "../../utils/vectors/vectors";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { itemMoveOrResizeWouldCollide } from "../RoomEditingArea/cursor/editWouldCollide";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import {
  commitCurrentPreviewedEdits,
  moveOrResizeItemAsPreview,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const NudgeButtons = () => {
  const dispatch = useAppDispatch();

  const anythingSelected = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.selectedJsonItemIds.length > 0,
  );
  const roomState = useEditorRoomState();

  const handleMove = (unitVector: Xyz) => {
    if (roomState === null) {
      return;
    }

    const levelEditorStoreState = (
      store.getState() as RootStateWithLevelEditorSlice
    ).levelEditor;

    const { gridResolution, selectedJsonItemIds: jsonItemIds } =
      levelEditorStoreState;

    const positionDelta = elementWiseProductXyz(unitVector, {
      x: gridResolution,
      y: gridResolution,
      z: 1,
    });

    const collides = itemMoveOrResizeWouldCollide({
      roomState,
      jsonItemIds,
      blockPositionDelta: positionDelta,
    });

    if (collides) {
      console.warn("nudge would collide");
      return;
    }

    dispatch(
      moveOrResizeItemAsPreview({
        jsonItemIds,
        positionDelta,
      }),
    );
    dispatch(commitCurrentPreviewedEdits());
  };

  return (
    <div className="flex flex-row flex-wrap gap-x-0 gap-y-oneScaledPix items-center">
      <BitmapText
        className="inline-block mr-1 text-lightGrey leading-none"
        noSlitWords
      >
        move
      </BitmapText>
      <div className="flex flex-row flex-wrap gap-oneScaledPix items-center">
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={() => {
            handleMove(unitVectors.left);
          }}
          shortcutKeys={["ArrowLeft"]}
          tooltipContent="Hotkey: **⬅**"
        >
          <BitmapText className="relative leading-none">↖</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={() => {
            handleMove(unitVectors.right);
          }}
          shortcutKeys={["ArrowRight"]}
          tooltipContent="Hotkey: **➡**"
        >
          <BitmapText className="relative leading-none">↘</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={() => {
            handleMove(unitVectors.away);
          }}
          shortcutKeys={["ArrowUp"]}
          tooltipContent="Hotkey: **⬆**"
        >
          <BitmapText className="relative leading-none">↗</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={() => {
            handleMove(unitVectors.towards);
          }}
          shortcutKeys={["ArrowDown"]}
          tooltipContent="Hotkey: **⬇**"
        >
          <BitmapText className="relative leading-none">↙</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={() => {
            handleMove(unitVectors.up);
          }}
          shortcutKeys={["⇧ArrowUp"]}
          tooltipContent="Hotkey: **shift-⬆**"
        >
          <BitmapText className="relative leading-none">⬆</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={() => {
            handleMove(unitVectors.down);
          }}
          shortcutKeys={["⇧ArrowDown"]}
          tooltipContent="Hotkey: **shift-⬇**"
        >
          <BitmapText className="relative leading-none">⬇</BitmapText>
        </ToolbarButton>
      </div>
    </div>
  );
};
