import {
  type SpritesheetName,
  spritesheetNameValues,
} from "../../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectSpritesheetName } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { cycleSpritesheetNameThunk } from "../../../../../../store/slices/userSettings/cycleSpritesheetNameThunk";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const spritesheetExampleSprites = [
  "texture-animated-heels_walking_d5" satisfies AnimatedTextureTailwindClass,
  "texture-animated-turtle_d6" satisfies AnimatedTextureTailwindClass,
  "texture-crown_blacktooth" satisfies TextureTailwindClass,
  "texture-whiteRabbit_extra-life" satisfies TextureTailwindClass,
  "texture-drum" satisfies TextureTailwindClass,
  "texture-charles_d6" satisfies TextureTailwindClass,
];
const spritesheetExampleSpritesMarkdown = spritesheetExampleSprites
  .map((t) => `![](${t})`)
  .join("");

const spritesheetDescription = (spritesheetName: SpritesheetName): string =>
  spritesheetName === "speccy" ? `Original *two-tone* zx-spectrum graphics`
  : spritesheetName === "toppy" ? `*Toppy*'s pixel art`
  : `Expanded 16-colour revision of the original`;

export const SpritesheetMenuItem = () => {
  const spritesheetName = useAppSelector(selectSpritesheetName);
  return (
    <MenuItem
      doubleHeight
      id="spritesheetName"
      label="Skin"
      valueElement={
        <SwitchN
          class="ml-auto"
          values={spritesheetNameValues}
          value={spritesheetName}
        />
      }
      onSelect={useDispatchActionCallback(cycleSpritesheetNameThunk)}
      verticalAlignItemsCentre
      hint={
        <BlockyMarkdown
          class={optionsHintMarkdownClassname}
          markdown={`${spritesheetDescription(spritesheetName)}

${spritesheetExampleSpritesMarkdown}`}
        />
      }
    />
  );
};
