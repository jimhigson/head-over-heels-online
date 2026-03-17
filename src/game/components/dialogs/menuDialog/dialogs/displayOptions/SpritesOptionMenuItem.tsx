import type {
  AnimatedTextureTailwindClass,
  TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import type { SpriteOption } from "../../../../../../store/slices/gameMenus/gameMenusSlice";

import { useAppSelector } from "../../../../../../store/hooks";
import { selectSpritesOption } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  nextSpritesOption,
  spriteOptionValues,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
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

const spritesOptionMarkdown: Record<SpriteOption, string> = {
  BlockStack: `16 colour sprites, expanded but faithful to the original`,
  Toppy: `*Toppy*'s redrawn and reworked sprites`,
  Speccy: `Original *two-tone* zx-spectrum graphics`,
};

export const SpritesOptionMenuItem = () => {
  const spritesOption = useAppSelector(selectSpritesOption);
  return (
    <MenuItem
      hintInline
      className="sprites-double-height"
      id="spritesOption"
      label="Sprites"
      valueElement={
        <SwitchN
          className="ml-auto"
          values={spriteOptionValues}
          value={spritesOption}
        />
      }
      onSelect={useDispatchActionCallback(nextSpritesOption)}
      verticalAlignItemsCentre
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={`${spritesOptionMarkdown[spritesOption]}

${spritesOptionExampleSpritesMarkdown}`}
        />
      }
    />
  );
};
