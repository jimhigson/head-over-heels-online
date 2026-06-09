import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  directionsXy4,
  directionsXy8,
  type DirectionXy8,
} from "../../../utils/vectors/vectors";
import {
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
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
 * Start-direction options for the selection. Offers the directions valid for
 * every selected item (4-way, or 8-way when all are sceneryPlayers), excluding
 * the one they are all already facing. Hidden unless every selected item has a
 * start direction.
 */
export const StartDirectionMenuItems = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

  const items = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  const supportedPerItem: (readonly DirectionXy8[])[] = [];
  const currents = new Set<DirectionXy8>();
  for (const item of items) {
    if (!("startDirection" in item.config)) {
      // not every selected item has a start direction:
      return null;
    }
    supportedPerItem.push(
      item.type === "sceneryPlayer" ? directionsXy8 : directionsXy4,
    );
    currents.add(item.config.startDirection);
  }

  if (supportedPerItem.length === 0) {
    return null;
  }

  // directions valid for every selected item:
  const intersection = supportedPerItem.reduce((acc, supported) =>
    acc.filter((direction) => supported.includes(direction)),
  );

  // don't offer the direction they are all already facing:
  const uniformCurrent = currents.size === 1 ? [...currents][0] : undefined;
  const options = intersection.filter(
    (direction) => direction !== uniformCurrent,
  );

  return (
    <>
      {options.map((direction) => (
        <ContextMenuItem
          key={direction}
          value={direction}
          onSelect={() =>
            dispatch(
              setSelectedItemsStartDirection({
                startDirection: direction,
                timestamp: Date.now(),
              }),
            )
          }
        >
          {directionLabel(direction)}
        </ContextMenuItem>
      ))}
    </>
  );
};
