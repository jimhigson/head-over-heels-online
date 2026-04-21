import type {
  AnimatedTextureTailwindClass,
  TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import type { SpriteOption } from "../../../../../../store/slices/gameMenus/gameMenusSlice";

import { spriteOptionValues } from "../../../../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectSpritesOption } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { nextSpritesOption } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { spriteOptionEquals } from "../../../../../../store/slices/gameMenus/spriteOptionEquals";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const spritesOptionExampleSprites = [
  "texture-animated-heels_walking_towardsRight" satisfies AnimatedTextureTailwindClass,
  "texture-animated-turtle_towards" satisfies AnimatedTextureTailwindClass,
  "texture-crown_blacktooth" satisfies TextureTailwindClass,
  "texture-whiteRabbit_extra-life" satisfies TextureTailwindClass,
  "texture-drum" satisfies TextureTailwindClass,
  "texture-charles_towards" satisfies TextureTailwindClass,
  "texture-animated-switch" satisfies AnimatedTextureTailwindClass,
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

const spriteOptionIndex = (spriteOption: SpriteOption): number =>
  spriteOptionValues.findIndex((v) => spriteOptionEquals(v, spriteOption));

export const SpritesOptionMenuItem = () => {
  const spritesOption = useAppSelector(selectSpritesOption);
  return (
    <MenuItem
      hintInline
      className="sprites-double-height"
      id="spritesOption"
      label="Skin"
      valueElement={
        <SwitchN
          className="ml-auto"
          values={spriteOptionLabels}
          value={spriteOptionLabels[spriteOptionIndex(spritesOption)]}
        />
      }
      onSelect={useDispatchActionCallback(nextSpritesOption)}
      verticalAlignItemsCentre
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={`${spritesOptionDescription(spritesOption)}

${spritesOptionExampleSpritesMarkdown}`}
        />
      }
    />
  );
};
