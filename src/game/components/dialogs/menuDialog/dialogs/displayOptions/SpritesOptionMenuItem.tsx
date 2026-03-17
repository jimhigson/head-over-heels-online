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

const spritesOptionExampleSpritesMarkdown = `![](texture-animated-heels_walking_towardsRight ?float-left&clear-right)![](texture-animated-turtle_towards ?float-left&clear-right)![](texture-crown_blacktooth ?float-left&clear-right)

![](texture-whiteRabbit ?float-left&clear-right&clear-left)![](texture-drum ?float-left&clear-right)![](texture-charles_towards ?float-left&clear-right)`;
const spritesOptionMarkdownBlockstack = `Jim @ *BlockStack*.ing recolouring of the original game sprites

${spritesOptionExampleSpritesMarkdown}`;
const spritesOptionMarkdownToppy = `*Toppy*'s redrawn and reworked sprites, drawn again from scratch

${spritesOptionExampleSpritesMarkdown}`;

const spritesOptionMarkdown: Record<SpriteOption, string> = {
  BlockStack: spritesOptionMarkdownBlockstack,
  Toppy: spritesOptionMarkdownToppy,
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
          markdown={spritesOptionMarkdown[spritesOption]}
        />
      }
    />
  );
};
