import {
  type MirrorOrientation,
  mirrorOrientations,
} from "../../../model/MirrorOrientation";
import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
  setSelectedItemsMirrorOrientation,
} from "../../slice/levelEditorSlice";

// the mirror's pane projected to the screen: the awayLeft pane is edge-on (a
// vertical sliver), the awayRight pane is face-on (a horizontal rectangle):
const orientationGlyph = {
  awayLeft: "|",
  awayRight: "-",
} as const satisfies Record<MirrorOrientation, string>;

/**
 * Flip the orientation of the selected mirror(s). A mirror has two pane
 * orientations, so this offers the one(s) the selection isn't already in - for
 * a single mirror, the other orientation (a flip). Shows the pane's projection
 * with - and |. Hidden unless every selected item is a mirror.
 */
export const MirrorOrientationMenuItems = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

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

  // don't offer the orientation they are all already in:
  const uniformCurrent = currents.size === 1 ? [...currents][0] : undefined;
  const options = mirrorOrientations.filter(
    (orientation) => orientation !== uniformCurrent,
  );

  return (
    <>
      {options.map((orientation) => (
        <ContextMenuItem
          key={orientation}
          value={orientation}
          onSelect={() =>
            dispatch(
              setSelectedItemsMirrorOrientation({
                orientation,
                timestamp: Date.now(),
              }),
            )
          }
        >
          {`flip ${orientationGlyph[orientation]}`}
        </ContextMenuItem>
      ))}
    </>
  );
};
