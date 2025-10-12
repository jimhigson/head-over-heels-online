import { keyAssignmentPresetChosen } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import {
  type KeyAssignmentPresetName,
  keyAssignmentPresets,
} from "../../../../../input/keyAssignmentPresets";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";

export const InputPresetMenuItem = ({
  presetName,
}: {
  presetName: KeyAssignmentPresetName;
}) => {
  const { description } = keyAssignmentPresets[presetName];
  return (
    <MenuItem
      hintInline
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
      onSelect={useDispatchActionCallback(
        keyAssignmentPresetChosen,
        presetName,
      )}
    />
  );
};
