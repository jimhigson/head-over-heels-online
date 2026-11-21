import { useCallback } from "preact/hooks";

import { useAppDispatch } from "../../../../../../store/hooks";
import { closeMenuThunk } from "../../../../../../store/slices/gameMenus/closeMenuThunk";
import { keyAssignmentPresetApplied } from "../../../../../../store/slices/userSettings/userSettingsSlice";
import {
  type KeyAssignmentPresetName,
  keyAssignmentPresets,
} from "../../../../../input/keyAssignmentPresets";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

export const InputPresetMenuItem = ({
  presetName,
}: {
  presetName: KeyAssignmentPresetName;
}) => {
  const { description } = keyAssignmentPresets[presetName];
  const dispatch = useAppDispatch();
  const onSelect = useCallback(() => {
    // choose the option:
    dispatch(keyAssignmentPresetApplied(presetName));
    // close the preset menu:
    dispatch(closeMenuThunk("inputPreset"));
  }, [dispatch, presetName]);
  return (
    <MenuItem
      id={presetName}
      key={presetName}
      label={presetName}
      doubleHeightWhenFocussed
      hint={
        description && (
          <span class={`${optionsHintMarkdownClassname} text-multi-line`}>
            {description}
          </span>
        )
      }
      onSelect={onSelect}
    />
  );
};
