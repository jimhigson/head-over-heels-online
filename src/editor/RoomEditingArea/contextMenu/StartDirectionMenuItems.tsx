import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { cn } from "../../../ui/cn";
import { MenuItem } from "../../../ui/menuBar/MenuItem";
import { camelToSpaced } from "../../../utils/camelToSpaced";
import { directionXyz8Glyphs } from "../../../utils/vectors/directionGlyphs";
import type { DirectionXyz8 } from "../../../utils/vectors/vectors";
import { directionForItem } from "../../itemDirection";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  setSelectedItemsStartDirection,
} from "../../slice/levelEditorSlice";

const directionLabel = (direction: DirectionXyz8): string =>
  `${camelToSpaced(direction)} ${directionXyz8Glyphs[direction]}`;

/**
 * Direction arrows for the selection, one per direction valid for every
 * selected item (4-way, or 8-way when all are sceneryPlayers), the current one
 * highlighted. Choosing an arrow sets it, leaving the menu open. Works for any item with an editable facing -
 * a monster's start direction, a lamp's beam direction, a conveyor's direction
 * or a lift's up or down (see directionForItem)
 * - and is hidden unless every selected item has one.
 */
export const StartDirectionMenuItems = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const items = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  const supportedPerItem: (readonly DirectionXyz8[])[] = [];
  const currents = new Set<DirectionXyz8>();
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
              {directionXyz8Glyphs[direction]}
            </button>
          ))}
        </span>
      }
    />
  );
};
