import { spriteOptionValues } from "../../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectSpritesOption } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { cycleSpritesOptionThunk } from "../../../../../../store/slices/userSettings/cycleSpritesOptionThunk";
import { type SpriteOption } from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const spritesOptionExampleSprites = [
  "texture-animated-heels_walking_d5" satisfies AnimatedTextureTailwindClass,
  "texture-animated-turtle_d6" satisfies AnimatedTextureTailwindClass,
  "texture-crown_blacktooth" satisfies TextureTailwindClass,
  "texture-whiteRabbit_extra-life" satisfies TextureTailwindClass,
  "texture-drum" satisfies TextureTailwindClass,
  "texture-charles_d6" satisfies TextureTailwindClass,
];
const spritesOptionExampleSpritesMarkdown = spritesOptionExampleSprites
  .map((t) => `![](${t})`)
  .join("");

const spritesOptionLabel = (spriteOption: SpriteOption): string =>
  spriteOption.uncolourised ? "Speccy" : spriteOption.name;

const spritesOptionDescription = (spriteOption: SpriteOption): string =>
  spriteOption.uncolourised ? `Original *two-tone* zx-spectrum graphics`
  : spriteOption.name === "Toppy" ? `*Toppy*'s pixel art`
  : `Expanded 16-colour revision of the original`;

const spriteOptionLabels = spriteOptionValues.map(spritesOptionLabel);

export const SpritesOptionMenuItem = () => {
  const spritesOption = useAppSelector(selectSpritesOption);
  return (
    <MenuItem
      doubleHeight
      id="spritesOption"
      label="Skin"
      valueElement={
        <SwitchN
          class="ml-auto"
          values={spriteOptionLabels}
          value={spritesOptionLabel(spritesOption)}
        />
      }
      onSelect={useDispatchActionCallback(cycleSpritesOptionThunk)}
      verticalAlignItemsCentre
      hint={
        <BlockyMarkdown
          class={optionsHintMarkdownClassname}
          markdown={`${spritesOptionDescription(spritesOption)}

${spritesOptionExampleSpritesMarkdown}`}
        />
      }
    />
  );
};
