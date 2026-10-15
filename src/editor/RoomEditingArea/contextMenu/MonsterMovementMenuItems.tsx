import { monsterMovements } from "../../../model/json/MonsterJsonConfig";
import { type JsonMovement } from "../../../model/json/utilityJsonConfigTypes";
import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  setSelectedMonstersMovement,
} from "../../slice/levelEditorSlice";

const movementLabel = (movement: JsonMovement): string =>
  movement.replaceAll("-", " ");

/**
 * Movement switch for a selection of monsters, between the movements valid for
 * every selected monster (the intersection). Hidden unless the selection is
 * entirely monsters with a choice of movement.
 */
export const MonsterMovementMenuItems = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

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

  // a mixed selection shows the first of their movements:
  const shownMovement =
    intersection.find((movement) => currents.has(movement)) ?? intersection[0];

  if (intersection.length < 2) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "setting",
        label: "Movement",
        values: intersection,
        valueLabels: intersection.map(movementLabel),
        value: shownMovement,
        action: (movement) =>
          setSelectedMonstersMovement({ movement, timestamp: Date.now() }),
      }}
    />
  );
};
