import { monsterMovements } from "../../../model/json/MonsterJsonConfig";
import { type JsonMovement } from "../../../model/json/utilityJsonConfigTypes";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
  setSelectedMonstersMovement,
} from "../../slice/levelEditorSlice";

const movementLabel = (movement: JsonMovement): string =>
  movement.replaceAll("-", " ");

/**
 * Movement options for a selection of monsters. Offers the movements valid for
 * every selected monster (the intersection), excluding the one they are all
 * already on. Hidden unless the selection is entirely monsters.
 */
export const MonsterMovementMenuItems = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

  const items = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  const supportedPerMonster: (readonly JsonMovement[])[] = [];
  const currents = new Set<JsonMovement>();
  for (const item of items) {
    if (item.type !== "monster") {
      // not an all-monsters selection:
      return null;
    }
    supportedPerMonster.push(monsterMovements[item.config.which]);
    currents.add(item.config.movement);
  }

  if (supportedPerMonster.length === 0) {
    return null;
  }

  // movements valid for every selected monster:
  const intersection = supportedPerMonster.reduce((acc, supported) =>
    acc.filter((movement) => supported.includes(movement)),
  );

  // don't offer the movement they are all already on:
  const uniformCurrent = currents.size === 1 ? [...currents][0] : undefined;
  const options = intersection.filter(
    (movement) => movement !== uniformCurrent,
  );

  return (
    <>
      {options.map((movement) => (
        <ContextMenuItem
          key={movement}
          value={movement}
          onSelect={() =>
            dispatch(
              setSelectedMonstersMovement({ movement, timestamp: Date.now() }),
            )
          }
        >
          {movementLabel(movement)}
        </ContextMenuItem>
      ))}
    </>
  );
};
