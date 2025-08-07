import { getConsolidatableVector } from "../../consolidateItems/ConsolidatableJsonItem";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { getJsonItemTimes } from "../../model/times";
import { useAppDispatch } from "../../store/hooks";
import { store } from "../../store/store";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  elementWiseProductXyz,
  originXyz,
  unitXyz,
  type Xyz,
} from "../../utils/vectors/vectors";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { itemMoveOrResizeWouldCollide } from "../RoomEditingArea/cursor/editWouldCollide";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import {
  commitCurrentPreviewedEdits,
  moveOrResizeItemAsPreview,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../slice/levelEditorSliceSelectors";
import { ToolbarButton } from "./ToolbarButton";

export const NudgeButtons = () => {
  const dispatch = useAppDispatch();

  const selectedJsonItems = useAppSelectorWithLevelEditorSlice((state) =>
    state.levelEditor.selectedJsonItemIds.map(
      (jsonItemId) =>
        selectCurrentRoomFromLevelEditorState(state.levelEditor).items[
          jsonItemId
        ],
    ),
  );
  const anythingSelected = selectedJsonItems.length > 0;
  const roomState = useEditorRoomState();

  const consolidatableAxes =
    anythingSelected ?
      elementWiseProductXyz(
        ...selectedJsonItems.map((i) => getConsolidatableVector(i)),
      )
    : originXyz;

  const largestSize =
    anythingSelected ?
      selectedJsonItems
        .map((i) => getJsonItemTimes(i))
        .reduce(
          (acc, times) => ({
            x: Math.max(acc.x, times.x),
            y: Math.max(acc.y, times.y),
            z: Math.max(acc.z, times.z),
          }),
          unitXyz,
        )
    : originXyz;

  const nudgeBy =
    (posVector: Xyz = originXyz, timesDelta?: Partial<Xyz>) =>
    () => {
      if (roomState === null) {
        return;
      }

      const levelEditorStoreState = (
        store.getState() as RootStateWithLevelEditorSlice
      ).levelEditor;

      const { gridResolution, selectedJsonItemIds: jsonItemIds } =
        levelEditorStoreState;

      // scale the position vector by grid resolution in all directions but z:
      const positionDelta =
        timesDelta ? posVector : (
          elementWiseProductXyz(posVector, {
            x: gridResolution,
            y: gridResolution,
            z: 1,
          })
        );

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
          timesDelta: { ...originXyz, ...timesDelta },
        }),
      );
      dispatch(commitCurrentPreviewedEdits());
    };

  return (
    <div className="flex flex-row flex-wrap gap-x-0 gap-y-oneScaledPix items-center mt-1">
      <BitmapText
        className="inline-block mr-1 text-lightGrey leading-none pr-oneScaledPix"
        noSlitWords
      >
        {"move  "}
      </BitmapText>
      <div className="flex flex-row flex-wrap gap-oneScaledPix items-center">
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={nudgeBy(unitVectors.left)}
          shortcutKeys={["ArrowLeft"]}
        >
          <BitmapText className="relative leading-none">↖</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={nudgeBy(unitVectors.right)}
          shortcutKeys={["ArrowRight"]}
        >
          <BitmapText className="relative leading-none">↘</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={nudgeBy(unitVectors.away)}
          shortcutKeys={["ArrowUp"]}
        >
          <BitmapText className="relative leading-none">↗</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={nudgeBy(unitVectors.towards)}
          shortcutKeys={["ArrowDown"]}
        >
          <BitmapText className="relative leading-none">↙</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={nudgeBy(unitVectors.up)}
          shortcutKeys={["PageUp"]}
        >
          <BitmapText className="relative leading-none">⬆</BitmapText>
        </ToolbarButton>
        <ToolbarButton
          small
          disabled={!anythingSelected}
          onClick={nudgeBy(unitVectors.down)}
          shortcutKeys={["PageDown"]}
        >
          <BitmapText className="relative leading-none">⬇</BitmapText>
        </ToolbarButton>
      </div>

      <div className="flex flex-row flex-wrap gap-x-0 gap-y-oneScaledPix items-center">
        <BitmapText
          className="inline-block mr-1 text-lightGrey leading-none pr-oneScaledPix"
          noSlitWords
        >
          {"grow  "}
        </BitmapText>
        <div className="flex flex-row flex-wrap gap-oneScaledPix items-center">
          <ToolbarButton
            small
            disabled={consolidatableAxes.x === 0}
            onClick={nudgeBy(undefined, { x: 1 })}
            shortcutKeys={["⌥ArrowLeft"]}
          >
            <BitmapText className="relative leading-none">↖</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={consolidatableAxes.x === 0}
            onClick={nudgeBy({ x: -1, y: 0, z: 0 }, { x: 1 })}
            shortcutKeys={["⌥ArrowRight"]}
          >
            <BitmapText className="relative leading-none">↘</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={consolidatableAxes.y === 0}
            onClick={nudgeBy(undefined, { y: 1 })}
            shortcutKeys={["⌥ArrowUp"]}
          >
            <BitmapText className="relative leading-none">↗</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={consolidatableAxes.y === 0}
            onClick={nudgeBy({ x: 0, y: -1, z: 0 }, { y: 1 })}
            shortcutKeys={["⌥ArrowDown"]}
          >
            <BitmapText className="relative leading-none">↙</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={consolidatableAxes.z === 0}
            onClick={nudgeBy(undefined, { z: 1 })}
            shortcutKeys={["⌥PageUp"]}
          >
            <BitmapText className="relative leading-none">⬆</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={consolidatableAxes.z === 0}
            onClick={nudgeBy({ x: 0, y: 0, z: -1 }, { z: 1 })}
            shortcutKeys={["⌥PageDown"]}
          >
            <BitmapText className="relative leading-none">⬇</BitmapText>
          </ToolbarButton>
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-x-0 gap-y-oneScaledPix items-center">
        <BitmapText
          className="inline-block mr-1 text-lightGrey leading-none pr-oneScaledPix"
          noSlitWords
        >
          shrink
        </BitmapText>
        <div className="flex flex-row flex-wrap gap-oneScaledPix items-center">
          <ToolbarButton
            small
            disabled={largestSize.x <= 1}
            onClick={nudgeBy(undefined, { x: -1 })}
            shortcutKeys={["⌥⇧ArrowRight"]}
          >
            <BitmapText className="relative leading-none">↘</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={largestSize.x <= 1}
            onClick={nudgeBy({ x: 1, y: 0, z: 0 }, { x: -1 })}
            shortcutKeys={["⌥⇧ArrowLeft"]}
          >
            <BitmapText className="relative leading-none">↖</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={largestSize.y <= 1}
            onClick={nudgeBy(undefined, { y: -1 })}
            shortcutKeys={["⌥⇧ArrowDown"]}
          >
            <BitmapText className="relative leading-none">↙</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={largestSize.y <= 1}
            onClick={nudgeBy({ x: 0, y: 1, z: 0 }, { y: -1 })}
            shortcutKeys={["⌥⇧ArrowUp"]}
          >
            <BitmapText className="relative leading-none">↗</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={largestSize.z <= 1}
            onClick={nudgeBy(undefined, { z: -1 })}
            shortcutKeys={["⌥⇧PageDown"]}
          >
            <BitmapText className="relative leading-none">⬇</BitmapText>
          </ToolbarButton>
          <ToolbarButton
            small
            disabled={largestSize.z <= 1}
            onClick={nudgeBy({ x: 0, y: 0, z: 1 }, { z: -1 })}
            shortcutKeys={["⌥⇧PageUp"]}
          >
            <BitmapText className="relative leading-none">⬆</BitmapText>
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
};
