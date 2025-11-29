import { twMerge } from "tailwind-merge";

import { useAppSelector } from "../../../../../../store/hooks";
import { selectCurrentInputPreset } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { goToSubmenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { multilineTextClass } from "../../multilineTextClass";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";

const markdown =
  "This blockstack.ing remake comes with modern default mappings for keyboard and controller. You can also select presets matching the original game or different systems.";

const CurrentPresetValue = ({ className }: { className?: string }) => {
  const currentPresetName = useAppSelector(selectCurrentInputPreset);

  return (
    <BitmapText
      className={twMerge(
        `text-nowrap`,
        "ml-auto",
        "text-pinkHalfbrite zx:text-zxRed selectedMenuItem:text-pink zx:selectedMenuItem:text-zxRed",
        className,
      )}
    >
      {currentPresetName ?? "custom"}
    </BitmapText>
  );
};

export const PresetMenuItem = () => (
  <MenuItem
    id="preset"
    doubleHeight
    label={
      <BitmapText className={`${multilineTextClass}`}>
        Key/button preset
      </BitmapText>
    }
    valueElement={<CurrentPresetValue />}
    onSelect={useDispatchActionCallback(goToSubmenu, "inputPreset")}
    opensSubMenu={true}
    hint={
      <BlockyMarkdown
        className={optionsHintMarkdownClassname}
        markdown={markdown}
      />
    }
    hintInline
  />
);
