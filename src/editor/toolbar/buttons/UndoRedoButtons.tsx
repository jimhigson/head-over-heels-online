import { useEffect } from "preact/hooks";

import { useAppDispatch } from "../../../store/hooks";
import {
  type EditorRootState,
  useEditorAppSelector,
} from "../../../store/store";
import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import {
  redo,
  selectCurrentEditingRoomScenery,
  selectRedoHistory,
  selectUndoHistory,
  undo,
  undoHovered,
} from "../../slice/levelEditorSlice";
import { type UndoHistoryItem } from "../../slice/reducers/undoReducers";
import { MenuButton, MenuItemButton } from "./MenuButton";
import {
  UndoEntryLabel,
  undoHistoryGridClassName,
  undoHistorySubgridClassName,
} from "./UndoEntryLabel";

const maxHistoryItems = 50;

type HistoryDirection = "redo" | "undo";

const selectHistory = {
  undo: selectUndoHistory,
  redo: selectRedoHistory,
} as const satisfies Record<
  HistoryDirection,
  (state: EditorRootState) => UndoHistoryItem[]
>;

type HistoryDirectionProps = {
  direction: HistoryDirection;
};

/**
 * the next entry to undo or redo, for the button's tooltip - mounted only
 * while the tooltip shows, so only then does it follow the history
 */
const NextHistoryEntryTooltip = ({ direction }: HistoryDirectionProps) => {
  const nextEntry = useEditorAppSelector((state) =>
    selectHistory[direction](state).at(-1),
  );
  const scenery = useEditorAppSelector(selectCurrentEditingRoomScenery);

  if (nextEntry === undefined) {
    return null;
  }

  return (
    <div class="flex flex-col gap-1">
      <span class="text-double-height">
        {direction === "undo" ? "Undo" : "Redo"}
      </span>
      <div class={undoHistoryGridClassName}>
        <UndoEntryLabel entry={nextEntry} scenery={scenery} />
      </div>
    </div>
  );
};

/**
 * the undo or redo history to step back or forward through - mounted only
 * while its menu is open, so only then does it follow the history
 */
const HistoryMenuItems = ({ direction }: HistoryDirectionProps) => {
  const dispatch = useAppDispatch();
  const history = useEditorAppSelector(selectHistory[direction]);
  // closing the menu unmounts the entries before any of them sees the pointer
  // leave, so stop previewing the hovered one then:
  useEffect(() => () => dispatch(undoHovered(0)), [dispatch]);
  const scenery = useEditorAppSelector(selectCurrentEditingRoomScenery);

  return (
    <>
      {history
        .slice(-maxHistoryItems)
        .reverse()
        .map((entry, index) => (
          <MenuItemButton
            // keyed by entry, so each keeps its (memoised) label as more are pushed:
            key={entry}
            class={undoHistorySubgridClassName}
            onClick={() =>
              dispatch(
                direction === "undo" ?
                  undo({ steps: index + 1 })
                : redo({ steps: index + 1 }),
              )
            }
            onMouseEnter={() =>
              dispatch(
                undoHovered(
                  direction === "undo" ?
                    history.length - index
                  : -(history.length - index),
                ),
              )
            }
            onMouseLeave={() => dispatch(undoHovered(0))}
          >
            <UndoEntryLabel entry={entry} scenery={scenery} />
          </MenuItemButton>
        ))}
    </>
  );
};

const HistoryButton = ({ direction }: HistoryDirectionProps) => {
  // the closed button only needs to know if there is any history to show:
  const hasHistory = useEditorAppSelector(
    (state) => selectHistory[direction](state).length > 0,
  );

  return (
    <MenuButton
      contentsClassName={undoHistoryGridClassName}
      main={
        <CommandToolbarButton
          command={actionCommandDefinitions[direction]}
          tooltipContent={
            hasHistory ?
              <NextHistoryEntryTooltip direction={direction} />
            : undefined
          }
        />
      }
    >
      {hasHistory ?
        [<HistoryMenuItems key={direction} direction={direction} />]
      : []}
    </MenuButton>
  );
};

export const UndoRedoButtons = () => (
  <div class="flex flex-row gap-oneScaledPix bg-metallicBlue">
    <HistoryButton direction="undo" />
    <HistoryButton direction="redo" />
  </div>
);
