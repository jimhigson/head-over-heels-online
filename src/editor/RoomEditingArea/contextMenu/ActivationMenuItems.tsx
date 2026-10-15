import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  activationForItem,
  activationLabel,
  type ActivationState,
} from "../../itemActivation";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
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
 * Enable/disable switch for the selection, between the activation states
 * supported by every selected item (eg "Enable on player near" only when all
 * selected items are cybermen). Hidden when any selected item has no
 * enable/disable concept.
 */
export const ActivationMenuItems = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

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

  // supported by every selected item:
  const options = activationStates.filter((activation) =>
    activations.every((a) => a.supported.includes(activation)),
  );

  if (options.length < 2) {
    return null;
  }

  // a mixed selection shows the first of their states:
  const shownActivation =
    options.find((activation) =>
      activations.some((a) => a.current === activation),
    ) ?? options[0];

  return (
    <CommandContextMenuItem
      command={{
        type: "setting",
        label: "Activation",
        values: options,
        valueLabels: options.map((activation) => activationLabel[activation]),
        value: shownActivation,
        action: (activation) =>
          setSelectedItemsActivation({ activation, timestamp: Date.now() }),
      }}
    />
  );
};
