import { type FloorType } from "../../../model/json/ItemConfigMap";
import { sceneryNames } from "../../../sprites/planets";
import { useEditorAppSelector } from "../../../store/store";
import { keys } from "../../../utils/entries";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import { type EditorJsonItem } from "../../editorTypes";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  setSelectedFloorsScenery,
  setSelectedFloorsType,
} from "../../slice/levelEditorSlice";

const floorTypeLabels = {
  deadly: "Make deadly",
  standable: "Make standable",
  none: "Make fallable",
} as const satisfies Record<FloorType, string>;

/**
 * floor type changes for a selection of floors - each type not every selected
 * floor already has - and, when all are standable, a scenery switch
 */
export const FloorMenuItems = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const floorConfigs: EditorJsonItem<"floor">["config"][] = [];
  for (const id of selectedJsonItemIds) {
    const item = roomJson.items[id];
    if (item?.type !== "floor") {
      // not an all-floors selection:
      return null;
    }
    floorConfigs.push(item.config);
  }
  const [firstFloorConfig] = floorConfigs;
  if (firstFloorConfig === undefined) {
    return null;
  }

  const standableSceneries = floorConfigs
    .map((floorConfig) =>
      floorConfig.floorType === "standable" ? floorConfig.scenery : undefined,
    )
    .filter((scenery) => scenery !== undefined);

  return (
    <>
      {keys(floorTypeLabels)
        .filter(
          (floorType) =>
            !floorConfigs.every(
              (floorConfig) => floorConfig.floorType === floorType,
            ),
        )
        .map((floorType) => (
          <CommandContextMenuItem
            key={floorType}
            command={{
              type: "action",
              label: floorTypeLabels[floorType],
              action: () =>
                setSelectedFloorsType({ floorType, timestamp: Date.now() }),
            }}
          />
        ))}
      {standableSceneries.length === floorConfigs.length && (
        <CommandContextMenuItem
          command={{
            type: "setting",
            label: "Scenery",
            values: sceneryNames,
            valueLabels: sceneryNames,
            // a mixed selection shows the first floor's scenery:
            value: standableSceneries[0],
            action: (scenery) =>
              setSelectedFloorsScenery({ scenery, timestamp: Date.now() }),
          }}
        />
      )}
    </>
  );
};
