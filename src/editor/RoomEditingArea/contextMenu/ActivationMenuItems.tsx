import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import {
  activationForItem,
  activationLabel,
  type ActivationState,
} from "../../itemActivation";
import {
  selectCurrentEditingRoomJson,
  selectSelectedJsonItemIds,
  setSelectedItemsActivation,
} from "../../slice/levelEditorSlice";

// the order activation options are listed in the menu:
const activationStates = [
  "enabled",
  "enabledOnPlayerNear",
  "enabledOnStand",
  "disabled",
] as const satisfies ActivationState[];

/**
 * Enable/disable actions for the selection. Renders one item per activation
 * state supported by every selected item (eg "Enable on player near" only when
 * all selected items are cybermen), so returns several items - or none, when no
 * selected item has an enable/disable concept.
 */
export const ActivationMenuItems = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentEditingRoomJson);

  const items = selectedJsonItemIds
    .map((id) => roomJson.items[id])
    .filter((item) => item !== undefined);

  const activations = items
    .map((item) => activationForItem(item))
    .filter((activation) => activation !== undefined);

  // only show when every selected item has an enable/disable concept:
  if (items.length === 0 || activations.length !== items.length) {
    return null;
  }

  const options = activationStates.filter(
    (activation) =>
      // supported by every selected item...
      activations.every((a) => a.supported.includes(activation)) &&
      // ...and not the state every selected item is already in:
      !activations.every((a) => a.current === activation),
  );

  return (
    <>
      {options.map((activation) => (
        <ContextMenuItem
          key={activation}
          value={activation}
          onSelect={() =>
            dispatch(
              setSelectedItemsActivation({
                activation,
                timestamp: Date.now(),
              }),
            )
          }
        >
          {activationLabel[activation]}
        </ContextMenuItem>
      ))}
    </>
  );
};
