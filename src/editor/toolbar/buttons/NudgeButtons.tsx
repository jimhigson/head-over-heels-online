import { getConsolidatableVector } from "../../../consolidateItems/ConsolidatableJsonItem";
import { getJsonItemTimes } from "../../../model/times";
import { useAppDispatch } from "../../../store/hooks";
import { editorStore, useEditorAppSelector } from "../../../store/store";
import { twClass } from "../../../utils/twClass" with { type: "macro" };
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  elementWiseProductXyz,
  originXyz,
  unitXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { useGetEditorRoomState } from "../../EditorRoomStateProvider";
import { type EditorJsonItemUnion } from "../../editorTypes";
import { isRotatable, type RotationSense } from "../../itemRotation";
import { itemMoveOrResizeWouldCollide } from "../../RoomEditingArea/cursor/editWouldCollide";
import { selectCurrentRoomJsonFromLevelEditorState } from "../../slice/levelEditorSelectors";
import {
  commitCurrentPreviewedEdits,
  moveOrResizeItemAsPreview,
  rotateCurrentToolItem,
  rotateSelectedItems,
  selectEditorCameraAngle,
  selectTool,
} from "../../slice/levelEditorSlice";
import { getMovableVector } from "../../slice/reducers/moveOrResizeItemPreview/getMovableVector";
import {
  apparentGrowArgs,
  apparentMoveVector,
  apparentNudgeAxis,
  apparentShrinkArgs,
  type NudgeArgs,
} from "./nudgeDirections";
import { ToolbarButton } from "./ToolbarButton";

const lineContainerClassName = twClass(
  "flex flex-row flex-wrap gap-x-0 gap-y-oneScaledPix items-center mt-1 w-full",
);

const lineTitleHeaderClassName = twClass(
  "inline-block mr-1 text-lightGrey leading-none pr-oneScaledPix min-w-6",
);

const useRotate = (selectedItems: EditorJsonItemUnion[]) => {
  const dispatch = useAppDispatch();
  const tool = useEditorAppSelector(selectTool);

  const selectionRotatable =
    selectedItems.length > 0 && selectedItems.every(isRotatable);
  // ItemTool is {type, config}; EditorJsonItemUnion is assignable to it, so the
  // cast just gives isRotatable the discriminated view it expects:
  const toolItemRotatable =
    tool.type === "item" && isRotatable(tool.item as EditorJsonItemUnion);

  const rotatable = !(selectionRotatable || toolItemRotatable);

  const rotate = (sense: RotationSense) => {
    if (selectionRotatable) {
      dispatch(rotateSelectedItems({ sense, timestamp: Date.now() }));
    } else {
      dispatch(rotateCurrentToolItem({ sense }));
    }
  };

  return { rotatable, rotate };
};

export const NudgeButtons = () => {
  const dispatch = useAppDispatch();
  const getRoomState = useGetEditorRoomState();

  const selectedJsonItems = useEditorAppSelector((state) =>
    state.levelEditor.selectedJsonItemIds.map(
      (jsonItemId) =>
        selectCurrentRoomJsonFromLevelEditorState(state.levelEditor).items[
          jsonItemId
        ],
    ),
  );
  const anythingSelected = selectedJsonItems.length > 0;

  const { rotatable, rotate } = useRotate(selectedJsonItems);

  // the buttons/arrow keys are labelled with screen directions; which physical
  // axis each acts on follows the camera angle:
  const cameraAngle = useEditorAppSelector(selectEditorCameraAngle);
  const leftRightAxis = apparentNudgeAxis("left", cameraAngle);
  const awayTowardsAxis = apparentNudgeAxis("away", cameraAngle);

  // minimum set of consolidatable axes for all selected items - dictates axes
  // can be resized along
  const consolidatableAxes =
    anythingSelected ?
      elementWiseProductXyz(
        ...selectedJsonItems.map((selItem) => getConsolidatableVector(selItem)),
      )
    : originXyz;

  // minimum set of movable axes for all selected items - dictates axes
  // can be moved along
  const movableAxes =
    anythingSelected ?
      elementWiseProductXyz(
        ...selectedJsonItems.map((selItem) => getMovableVector(selItem)),
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
      const levelEditorStoreState = editorStore.getState().levelEditor;
      const roomState = getRoomState();

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
        timesDelta: { ...originXyz, ...timesDelta },
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
          timestamp: Date.now(),
        }),
      );
      dispatch(commitCurrentPreviewedEdits());
    };

  const nudgeByArgs = ({ posVector, timesDelta }: NudgeArgs) =>
    nudgeBy(posVector, timesDelta);

  return (
    <div class={lineContainerClassName}>
      <span class={lineTitleHeaderClassName}>{"Move:"}</span>
      <div class="flex-grow" />
      <div class="flex flex-row flex-wrap gap-oneScaledPix items-center">
        <ToolbarButton
          small
          ariaLabel="Move left"
          disabled={movableAxes[leftRightAxis] === 0}
          onClick={nudgeBy(apparentMoveVector("left", cameraAngle))}
          shortcutKeys={["ArrowLeft"]}
        >
          <span class="relative text-single-line">↖</span>
        </ToolbarButton>
        <ToolbarButton
          small
          ariaLabel="Move right"
          disabled={movableAxes[leftRightAxis] === 0}
          onClick={nudgeBy(apparentMoveVector("right", cameraAngle))}
          shortcutKeys={["ArrowRight"]}
        >
          <span class="relative text-single-line">↘</span>
        </ToolbarButton>
        <ToolbarButton
          small
          ariaLabel="Move away"
          disabled={movableAxes[awayTowardsAxis] === 0}
          onClick={nudgeBy(apparentMoveVector("away", cameraAngle))}
          shortcutKeys={["ArrowUp"]}
        >
          <span class="relative text-single-line">↗</span>
        </ToolbarButton>
        <ToolbarButton
          small
          ariaLabel="Move towards"
          disabled={movableAxes[awayTowardsAxis] === 0}
          onClick={nudgeBy(apparentMoveVector("towards", cameraAngle))}
          shortcutKeys={["ArrowDown"]}
        >
          <span class="relative text-single-line">↙</span>
        </ToolbarButton>
        <ToolbarButton
          small
          ariaLabel="Move up"
          disabled={movableAxes.z === 0}
          onClick={nudgeBy(unitVectors.up)}
          shortcutKeys={
            movableAxes[awayTowardsAxis] === 0 ?
              ["PageUp", "⇧ArrowUp", "ArrowUp"]
            : ["PageUp", "⇧ArrowUp"]
          }
        >
          <span class="relative text-single-line">⬆</span>
        </ToolbarButton>
        <ToolbarButton
          small
          ariaLabel="Move down"
          disabled={movableAxes.z === 0}
          onClick={nudgeBy(unitVectors.down)}
          shortcutKeys={
            movableAxes[awayTowardsAxis] === 0 ?
              ["PageDown", "⇧ArrowDown", "ArrowDown"]
            : ["PageDown", "⇧ArrowDown"]
          }
        >
          <span class="relative text-single-line">⬇</span>
        </ToolbarButton>
      </div>

      <div class={lineContainerClassName}>
        <span class={lineTitleHeaderClassName}>{"Grow:"}</span>
        <div class="flex-grow" />
        <div class="flex flex-row flex-wrap gap-oneScaledPix items-center">
          <ToolbarButton
            small
            ariaLabel="Grow left"
            disabled={consolidatableAxes[leftRightAxis] === 0}
            onClick={nudgeByArgs(apparentGrowArgs("left", cameraAngle))}
            shortcutKeys={["⌥ArrowLeft"]}
          >
            <span class="relative text-single-line">↖</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Grow right"
            disabled={consolidatableAxes[leftRightAxis] === 0}
            onClick={nudgeByArgs(apparentGrowArgs("right", cameraAngle))}
            shortcutKeys={["⌥ArrowRight"]}
          >
            <span class="relative text-single-line">↘</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Grow away"
            disabled={consolidatableAxes[awayTowardsAxis] === 0}
            onClick={nudgeByArgs(apparentGrowArgs("away", cameraAngle))}
            shortcutKeys={["⌥ArrowUp"]}
          >
            <span class="relative text-single-line">↗</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Grow towards"
            disabled={consolidatableAxes[awayTowardsAxis] === 0}
            onClick={nudgeByArgs(apparentGrowArgs("towards", cameraAngle))}
            shortcutKeys={["⌥ArrowDown"]}
          >
            <span class="relative text-single-line">↙</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Grow up"
            disabled={consolidatableAxes.z === 0}
            onClick={nudgeBy(undefined, { z: 1 })}
            shortcutKeys={["⌥PageUp"]}
          >
            <span class="relative text-single-line">⬆</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Grow down"
            disabled={consolidatableAxes.z === 0}
            onClick={nudgeBy({ x: 0, y: 0, z: -1 }, { z: 1 })}
            shortcutKeys={["⌥PageDown"]}
          >
            <span class="relative text-single-line">⬇</span>
          </ToolbarButton>
        </div>
      </div>

      <div class={lineContainerClassName}>
        <span class={lineTitleHeaderClassName}>Shrink:</span>
        <div class="flex-grow" />
        <div class="flex flex-row flex-wrap gap-oneScaledPix items-center">
          <ToolbarButton
            small
            ariaLabel="Shrink right"
            disabled={largestSize[leftRightAxis] <= 1}
            onClick={nudgeByArgs(apparentShrinkArgs("right", cameraAngle))}
            shortcutKeys={["⌥⇧ArrowRight"]}
          >
            <span class="relative text-single-line">↘</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Shrink left"
            disabled={largestSize[leftRightAxis] <= 1}
            onClick={nudgeByArgs(apparentShrinkArgs("left", cameraAngle))}
            shortcutKeys={["⌥⇧ArrowLeft"]}
          >
            <span class="relative text-single-line">↖</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Shrink towards"
            disabled={largestSize[awayTowardsAxis] <= 1}
            onClick={nudgeByArgs(apparentShrinkArgs("towards", cameraAngle))}
            shortcutKeys={["⌥⇧ArrowDown"]}
          >
            <span class="relative text-single-line">↙</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Shrink away"
            disabled={largestSize[awayTowardsAxis] <= 1}
            onClick={nudgeByArgs(apparentShrinkArgs("away", cameraAngle))}
            shortcutKeys={["⌥⇧ArrowUp"]}
          >
            <span class="relative text-single-line">↗</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Shrink down"
            disabled={largestSize.z <= 1}
            onClick={nudgeBy(undefined, { z: -1 })}
            shortcutKeys={["⌥⇧PageDown"]}
          >
            <span class="relative text-single-line">⬇</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Shrink up"
            disabled={largestSize.z <= 1}
            onClick={nudgeBy({ x: 0, y: 0, z: 1 }, { z: -1 })}
            shortcutKeys={["⌥⇧PageUp"]}
          >
            <span class="relative text-single-line">⬆</span>
          </ToolbarButton>
        </div>
      </div>

      <div class={lineContainerClassName}>
        <span class={lineTitleHeaderClassName}>Rotate:</span>
        <div class="flex-grow" />
        <div class="flex flex-row flex-wrap gap-oneScaledPix items-center">
          <ToolbarButton
            small
            ariaLabel="Rotate anti-clockwise"
            disabled={rotatable}
            onClick={() => rotate("anticlockwise")}
            shortcutKeys={["["]}
            tooltipContent={`## Rotate anti-clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn anti-clockwise`}
          >
            <span class="relative text-single-line">↺</span>
          </ToolbarButton>
          <ToolbarButton
            small
            ariaLabel="Rotate clockwise"
            disabled={rotatable}
            onClick={() => rotate("clockwise")}
            shortcutKeys={["]"]}
            tooltipContent={`## Rotate clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn clockwise`}
          >
            <span class="relative text-single-line">↻</span>
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
};
