import type { AnimatedTextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";

import { twClass } from "../../../../../../editor/twClass";
import {
  type DirectionsRelativeToMode,
  directionsRelativeToModes,
} from "../../../../../../store/slices/gameMenus/directionsRelativeToModes";
import { useDirectionsRelativeTo } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { nextDirectionRelativeTo } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/PlayableTailwindSprite";
import {
  optionsHintMarkdownClassname,
  spriteLeaderClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const markdown: Record<DirectionsRelativeToMode, string> = {
  screen: `**Screen**: Control is relative to the *screen*.
More intuitive if you find directions confusing in isometric games, but means hitting diagonals a lot`,
  world:
    "**World**: Control is relative to directions in the *isometric world* - like the original",
  mixed:
    "**Mixed (default)**: *Analogue sticks* move relative to the *screen*, digital inputs like *keys* and *d-pad* move relative to the *world*",
};

const ScreenRelativeControlValue = () => {
  const isScreenRelativeControl = useDirectionsRelativeTo();

  return (
    <SwitchN
      className="ml-auto"
      values={directionsRelativeToModes}
      value={isScreenRelativeControl}
    />
  );
};

export const ScreenRelativeControlMenuItem = () => {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  const leaderClass: Record<DirectionsRelativeToMode, string> = {
    screen: twClass(
      `${spriteClassname({ character: "heels", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-heels_screenDirections" satisfies AnimatedTextureTailwindClass}`,
    ),
    world: twClass(
      `${spriteClassname({ character: "heels", action: "idle", facingXy8: "right" })} ${"selectedMenuItem:texture-animated-heels_worldDirections" satisfies AnimatedTextureTailwindClass} sprites-normal-height`,
    ),
    mixed: twClass(
      `${spriteClassname({ character: "heels", action: "idle", facingXy8: "right" })} ${"selectedMenuItem:texture-animated-heels_mixedDirections" satisfies AnimatedTextureTailwindClass} sprites-normal-height`,
    ),
  };
  const directionsRelativeTo = useDirectionsRelativeTo();
  return (
    <MenuItem
      id="screenRelativeControl"
      label="Input axes"
      leader={
        <span
          className={`${spriteLeaderClasses} ${leaderClass[directionsRelativeTo]}`}
        />
      }
      valueElement={<ScreenRelativeControlValue />}
      onSelect={useDispatchActionCallback(nextDirectionRelativeTo)}
      hintInline
      verticalAlignItemsCentre
      className="sprites-double-height"
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={markdown[directionsRelativeTo]}
        />
      }
    />
  );
};
