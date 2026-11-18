import { type SceneryName } from "../../../sprites/planets";
import { useAppDispatch } from "../../../store/hooks";
import {
  type EditorRootState,
  useEditorAppSelector,
} from "../../../store/store";
import { emptyArray } from "../../../utils/empty";
import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import {
  redo,
  selectCurrentEditingRoomScenery,
  selectRedoHistory,
  selectUndoHistory,
  undo,
} from "../../slice/levelEditorSlice";
import {
  type HistoryDirection,
  type UndoHistoryItem,
} from "../../slice/reducers/undoReducers";
import { MenuButton, MenuItemButton } from "./MenuButton";
import {
  UndoEntryLabel,
  undoHistoryGridClassName,
  undoHistorySubgridClassName,
} from "./UndoEntryLabel";
import { useHistoryHoverPreview } from "./useHistoryHoverPreview";

const maxHistoryItems = 50;

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
        <UndoEntryLabel
          entry={nextEntry}
          scenery={scenery}
          direction={direction}
        />
      </div>
    </div>
  );
};

type HistoryMenuItemProps = {
  direction: HistoryDirection;
  entry: UndoHistoryItem;
  /**
   * how many steps back (or forward) the entry is, the newest being 1
   */
  steps: number;
  /**
   * the entry, numbered from the oldest in its stack, from 1
   */
  entryNumber: number;
  scenery: SceneryName;
};

/**
 * an entry of the undo or redo history, to step back or forward to
 */
const HistoryMenuItem = ({
  direction,
  entry,
  steps,
  entryNumber,
  scenery,
}: HistoryMenuItemProps) => {
  const dispatch = useAppDispatch();
  const { onMouseEnter, onMouseLeave } = useHistoryHoverPreview(
    direction,
    entryNumber,
  );

  return (
    <MenuItemButton
      class={undoHistorySubgridClassName}
      onClick={() =>
        dispatch(direction === "undo" ? undo({ steps }) : redo({ steps }))
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <UndoEntryLabel entry={entry} scenery={scenery} direction={direction} />
    </MenuItemButton>
  );
};

/**
 * the undo or redo history to step back or forward through - mounted only
 * while its menu is open, so only then does it follow the history
 */
const HistoryMenuItems = ({ direction }: HistoryDirectionProps) => {
  const history = useEditorAppSelector(selectHistory[direction]);
  const scenery = useEditorAppSelector(selectCurrentEditingRoomScenery);

  return (
    <>
      {history
        .slice(-maxHistoryItems)
        .reverse()
        .map((entry, index) => (
          <HistoryMenuItem
            // keyed by entry, so each keeps its (memoised) label as more are pushed:
            key={entry}
            direction={direction}
            entry={entry}
            steps={index + 1}
            entryNumber={history.length - index}
            scenery={scenery}
          />
        ))}
    </>
  );
};

const HistoryButton = ({ direction }: HistoryDirectionProps) => {
  const historyLength = useEditorAppSelector(
    (state) => selectHistory[direction](state).length,
  );
  // hovering the button previews its next step, as hovering that entry does:
  const { onMouseEnter, onMouseLeave } = useHistoryHoverPreview(
    direction,
    historyLength,
  );
  const hasHistory = historyLength > 0;

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
          onMouseEnter={hasHistory ? onMouseEnter : undefined}
          onMouseLeave={hasHistory ? onMouseLeave : undefined}
        />
      }
    >
      {hasHistory ?
        [<HistoryMenuItems key={direction} direction={direction} />]
      : emptyArray}
    </MenuButton>
  );
};

export const UndoRedoButtons = () => (
  <div class="flex flex-row gap-oneScaledPix bg-metallicBlue">
    <HistoryButton direction="undo" />
    <HistoryButton direction="redo" />
  </div>
);
