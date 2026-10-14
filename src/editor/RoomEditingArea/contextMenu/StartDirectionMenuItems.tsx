import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { cn } from "../../../ui/cn";
import { MenuItem } from "../../../ui/menuBar/MenuItem";
import { type DirectionXy8 } from "../../../utils/vectors/vectors";
import { directionForItem } from "../../itemDirection";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  setSelectedItemsStartDirection,
} from "../../slice/levelEditorSlice";

// the on-screen arrow for each game direction, in the iso projection (the four
// cardinal directions appear diagonal, the four diagonals appear orthogonal):
const directionArrow = {
  away: "↗",
  towards: "↙",
  left: "↖",
  right: "↘",
  awayRight: "➡",
  towardsRight: "⬇",
  towardsLeft: "⬅",
  awayLeft: "⬆",
} satisfies Record<DirectionXy8, string>;

const directionLabel = (direction: DirectionXy8): string =>
  `${direction.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()} ${directionArrow[direction]}`;

/**
 * Direction arrows for the selection, one per direction valid for every
 * selected item (4-way, or 8-way when all are sceneryPlayers), the current one
 * highlighted. Choosing an arrow sets it, leaving the menu open. Works for any item with an editable facing -
 * a monster's start direction or a lamp's beam direction (see directionForItem)
 * - and is hidden unless every selected item has one.
 */
export const StartDirectionMenuItems = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const items = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  const supportedPerItem: (readonly DirectionXy8[])[] = [];
  const currents = new Set<DirectionXy8>();
  for (const item of items) {
    const itemDirection = directionForItem(item);
    if (itemDirection === undefined) {
      // not every selected item has an editable direction:
      return null;
    }
    supportedPerItem.push(itemDirection.supported);
    currents.add(itemDirection.current);
  }

  if (supportedPerItem.length === 0) {
    return null;
  }

  // directions valid for every selected item:
  const intersection = supportedPerItem.reduce((acc, supported) =>
    acc.filter((direction) => supported.includes(direction)),
  );

  if (intersection.length < 2) {
    return null;
  }

  return (
    <MenuItem
      label="Direction"
      keepsMenuOpen
      // choosing is by the arrows:
      onSelect={() => {}}
      control={
        <span class="flex">
          {intersection.map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={directionLabel(direction)}
              aria-pressed={currents.has(direction)}
              class={cn(
                "px-half text-single-line",
                // a mixed selection highlights every direction it has:
                currents.has(direction) ?
                  "bg-pastelBlue text-pureBlack"
                : "hover:text-white",
              )}
              onClick={() =>
                dispatch(
                  setSelectedItemsStartDirection({
                    startDirection: direction,
                    timestamp: Date.now(),
                  }),
                )
              }
            >
              {directionArrow[direction]}
            </button>
          ))}
        </span>
      }
    />
  );
};
