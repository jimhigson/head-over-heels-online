import { twMerge } from "tailwind-merge";

import { useAppSelector } from "../../../../../../store/hooks";
import { selectCurrentInputPreset } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const markdown =
  "This blockstack.ing remake comes with modern default mappings for keyboard and controller. You can also select presets matching the original game or different systems.";

const CurrentPresetValue = ({ class: className }: { class?: string }) => {
  const currentPresetName = useAppSelector(selectCurrentInputPreset);

  return (
    <span
      class={twMerge(
        `text-nowrap`,
        "ml-auto",
        "text-pinkHalfbrite zx:text-zxRed toppy:text-toppyPink1 selectedMenuItem:text-pink zx:selectedMenuItem:text-zxRed toppy:selectedMenuItem:text-toppyPink2",
        "text-single-line",
        className,
      )}
    >
      {currentPresetName ?? "custom"}
    </span>
  );
};

export const PresetMenuItem = () => (
  <MenuItem
    id="preset"
    doubleHeight
    label={<span class="text-multi-line">Key/button preset</span>}
    valueElement={<CurrentPresetValue />}
    subMenuId="inputPreset"
    hint={
      <BlockyMarkdown
        class={optionsHintMarkdownClassname}
        markdown={markdown}
      />
    }
  />
);
