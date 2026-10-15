import {
  type MirrorOrientation,
  mirrorOrientations,
} from "../../../model/MirrorOrientation";
import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  setSelectedItemsMirrorOrientation,
} from "../../slice/levelEditorSlice";

// the mirror's pane projected to the screen: the awayLeft pane is edge-on (a
// vertical sliver), the awayRight pane is face-on (a horizontal rectangle):
const orientationGlyph = {
  awayLeft: "|",
  awayRight: "-",
} as const satisfies Record<MirrorOrientation, string>;

/**
 * Orientation switch for the selected mirror(s), between the two pane
 * orientations, shown as the pane's projection with - and |. Hidden unless
 * every selected item is a mirror.
 */
export const MirrorOrientationMenuItems = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  const items = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  const currents = new Set<MirrorOrientation>();
  for (const item of items) {
    if (item.type !== "mirror") {
      // not an all-mirrors selection:
      return null;
    }
    currents.add(item.config.orientation);
  }

  if (currents.size === 0) {
    return null;
  }

  // a mixed selection shows the first of their orientations:
  const shownOrientation =
    mirrorOrientations.find((orientation) => currents.has(orientation)) ??
    mirrorOrientations[0];

  return (
    <CommandContextMenuItem
      command={{
        type: "setting",
        label: "Orientation",
        values: mirrorOrientations,
        valueLabels: mirrorOrientations.map(
          (orientation) => orientationGlyph[orientation],
        ),
        value: shownOrientation,
        action: (orientation) =>
          setSelectedItemsMirrorOrientation({
            orientation,
            timestamp: Date.now(),
          }),
      }}
    />
  );
};
