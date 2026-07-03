import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import {
  redo,
  selectCurrentEditingRoomScenery,
  selectRedoHistory,
  selectUndoHistory,
  undo,
  undoHovered,
} from "../../slice/levelEditorSlice";
import { MenuButton, MenuItemButton } from "./MenuButton";
import { ToolbarButton } from "./ToolbarButton";
import { IconWithTwoLineHoverText } from "./ToolbarButtonContentPatterns";
import {
  UndoEntryLabel,
  undoHistoryGridClassName,
  undoHistorySubgridClassName,
} from "./UndoEntryLabel";

const maxHistoryItems = 50;

export const UndoRedoButtons = () => {
  const dispatch = useAppDispatch();

  const undoHistory = useEditorAppSelector(selectUndoHistory);
  const redoHistory = useEditorAppSelector(selectRedoHistory);
  const scenery = useEditorAppSelector(selectCurrentEditingRoomScenery);

  const nextUndo = undoHistory.at(-1);
  const nextRedo = redoHistory.at(-1);

  return (
    <div className="flex flex-row gap-oneScaledPix bg-metallicBlue">
      <MenuButton
        contentsClassName={undoHistoryGridClassName}
        main={
          <ToolbarButton
            ariaLabel="Undo"
            disabled={nextUndo === undefined}
            onClick={() => {
              dispatch(undo());
            }}
            tooltipContent={
              nextUndo ?
                <div className="flex flex-col gap-1">
                  <span className="text-double-height">Undo</span>
                  <div className={undoHistoryGridClassName}>
                    <UndoEntryLabel entry={nextUndo} scenery={scenery} />
                  </div>
                </div>
              : undefined
            }
            shortcutKeys={["⌘Z", "^Z"]}
          >
            <IconWithTwoLineHoverText
              icon={<span className="text-single-line">⎌</span>}
              topText="un"
              bottomText="do"
            />
          </ToolbarButton>
        }
      >
        {undoHistory
          .slice(-maxHistoryItems)
          .reverse()
          .map((entry, index) => (
            <MenuItemButton
              key={index}
              className={undoHistorySubgridClassName}
              onClick={() => dispatch(undo({ steps: index + 1 }))}
              onMouseEnter={() =>
                dispatch(undoHovered(undoHistory.length - index))
              }
              onMouseLeave={() => dispatch(undoHovered(0))}
            >
              <UndoEntryLabel entry={entry} scenery={scenery} />
            </MenuItemButton>
          ))}
      </MenuButton>
      <MenuButton
        contentsClassName={undoHistoryGridClassName}
        main={
          <ToolbarButton
            ariaLabel="Redo"
            disabled={nextRedo === undefined}
            onClick={() => {
              dispatch(redo());
            }}
            tooltipContent={
              nextRedo ?
                <div className="flex flex-col gap-1">
                  <span className="text-double-height">Redo</span>
                  <div className={undoHistoryGridClassName}>
                    <UndoEntryLabel entry={nextRedo} scenery={scenery} />
                  </div>
                </div>
              : undefined
            }
            shortcutKeys={["⌘⇧Z", "^⇧Z"]}
          >
            <IconWithTwoLineHoverText
              icon={<span className="text-single-line">⟳</span>}
              topText="re"
              bottomText="do"
            />
          </ToolbarButton>
        }
      >
        {redoHistory
          .slice(-maxHistoryItems)
          .reverse()
          .map((entry, index) => (
            <MenuItemButton
              key={index}
              className={undoHistorySubgridClassName}
              onClick={() => dispatch(redo({ steps: index + 1 }))}
              onMouseEnter={() =>
                dispatch(undoHovered(-(redoHistory.length - index)))
              }
              onMouseLeave={() => dispatch(undoHovered(0))}
            >
              <UndoEntryLabel entry={entry} scenery={scenery} />
            </MenuItemButton>
          ))}
      </MenuButton>
    </div>
  );
};
