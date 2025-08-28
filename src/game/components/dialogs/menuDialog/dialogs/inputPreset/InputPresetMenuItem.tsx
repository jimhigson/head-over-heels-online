import { keyAssignmentPresetChosen } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import {
  type KeyAssignmentPresetName,
  keyAssignmentPresets,
} from "../../../../../input/keyAssignmentPresets";
import { MenuItem } from "../../MenuItem";

export const InputPresetMenuItem = ({
  presetName,
}: {
  presetName: KeyAssignmentPresetName;
}) => {
  return (
    <MenuItem
      id={presetName}
      key={presetName}
      label={presetName}
      doubleHeightWhenFocussed
      hint={keyAssignmentPresets[presetName].description}
      onSelect={useDispatchActionCallback(
        keyAssignmentPresetChosen,
        presetName,
      )}
    />
  );
};
