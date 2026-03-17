import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectSpritesOption,
  useIsUncolourised,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { toggleUserSetting } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Switch } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const colouriseMarkdown = `**Off**: Original *two-tone* spectrum graphics

**On**: *16-colour* palette with colourised sprites`;

export const ColouriseMenuItem = () => {
  const spritesOption = useAppSelector(selectSpritesOption);
  const isUncolourised = useIsUncolourised();
  const onSelect = useDispatchActionCallback(toggleUserSetting, {
    path: "displaySettings.uncolourised",
  });

  if (spritesOption !== "BlockStack") {
    return null;
  }
  return (
    <MenuItem
      hintInline
      className="sprites-double-height"
      id="colourise"
      label="Colourise"
      valueElement={<Switch className="ml-auto" value={!isUncolourised} />}
      onSelect={onSelect}
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={colouriseMarkdown}
        />
      }
      verticalAlignItemsCentre
    />
  );
};
