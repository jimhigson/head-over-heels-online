import { useCallback } from "preact/hooks";

import { useAppDispatch } from "../../../../../../store/hooks";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { keyAssignmentPresetApplied } from "../../../../../../store/slices/userSettings/userSettingsSlice";
import {
  type KeyAssignmentPresetName,
  keyAssignmentPresets,
} from "../../../../../input/keyAssignmentPresets";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";
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
    dispatch(backToParentMenu());
  }, [dispatch, presetName]);
  return (
    <MenuItem
      id={presetName}
      key={presetName}
      label={presetName}
      doubleHeightWhenFocussed
      hint={
        description && (
          <BitmapText className={optionsHintMarkdownClassname}>
            {description}
          </BitmapText>
        )
      }
      onSelect={onSelect}
    />
  );
};
