import type {
  AnimatedTextureTailwindClass,
  TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";

import { useDirectionsRelativeTo } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { assignInputStart } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/playableTailwindSpriteClassname";
import {
  optionsHintMarkdownClassname,
  spriteLeaderClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { multilineTextClass } from "../../multilineTextClass";
import { SelectKeysMenuAssignmentValue } from "./SelectKeysMenuAssignmentValue";

export const SelectTheKeysMenuItems = () => {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  const isScreenRelativeControl = useDirectionsRelativeTo() === "screen";

  return (
    <>
      <div className="col-span-3">
        <BitmapText
          TagName="h2"
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1  sprites-double-height`}
        >
          Movement
        </BitmapText>
      </div>
      <MenuItem
        id="left"
        label={`Left ${isScreenRelativeControl ? "⬅" : "↖"}`}
        leader={
          <span
            className={`${spriteLeaderClasses} ${
              isScreenRelativeControl ?
                `${spriteClassname({ character: "head", action: "idle", facingXy8: "towardsLeft" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "towardsLeft" })}`
              : `${spriteClassname({ character: "head", action: "idle", facingXy8: "left" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "left" })}`
            }`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="left" />}
        onSelect={useDispatchActionCallback(assignInputStart, "left")}
      />
      <MenuItem
        id="right"
        label={`Right ${isScreenRelativeControl ? "➡" : "↘"}`}
        leader={
          <span
            className={`${spriteLeaderClasses} ${
              isScreenRelativeControl ?
                `${spriteClassname({ character: "head", action: "idle", facingXy8: "awayRight" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "awayRight" })}`
              : `${spriteClassname({ character: "head", action: "idle", facingXy8: "right" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "right" })}`
            }`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="right" />}
        onSelect={useDispatchActionCallback(assignInputStart, "right")}
      />
      <MenuItem
        id="up"
        label={`Up ${isScreenRelativeControl ? "⬆" : "↗"}`}
        leader={
          <span
            className={`${spriteLeaderClasses} ${
              isScreenRelativeControl ?
                `${spriteClassname({ character: "head", action: "idle", facingXy8: "awayLeft" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "awayLeft" })}`
              : `${spriteClassname({ character: "head", action: "idle", facingXy8: "away" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "away" })}`
            }`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="away" />}
        onSelect={useDispatchActionCallback(assignInputStart, "away")}
      />
      <MenuItem
        id="down"
        label={`Down ${isScreenRelativeControl ? "⬇" : "↙"}`}
        leader={
          <span
            className={`${spriteLeaderClasses} ${
              isScreenRelativeControl ?
                `${spriteClassname({ character: "head", action: "idle", facingXy8: "towardsRight" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "towardsRight" })}`
              : `${spriteClassname({ character: "head", action: "idle", facingXy8: "towards" })} selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "towards" })}`
            }`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="towards" />}
        onSelect={useDispatchActionCallback(assignInputStart, "towards")}
      />
      <MenuItem
        id="jump"
        label="Jump"
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-spring_released" satisfies TextureTailwindClass} ${"selectedMenuItem:texture-spring_compressed" satisfies TextureTailwindClass}`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="jump" />}
        onSelect={useDispatchActionCallback(assignInputStart, "jump")}
      />
      <div className="col-span-3">
        <BitmapText
          TagName="h2"
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1  sprites-double-height`}
        >
          Character-specific Abilities
        </BitmapText>
      </div>
      <div className={`${multilineTextClass} col-span-3`}>
        <BlockyMarkdown
          markdown={`**NOTE:** Some puzzles require Heels to jump and pick up/down simultaneously - keep a key assigned to *both jump and carry*`}
          className={optionsHintMarkdownClassname}
        />
      </div>
      <MenuItem
        id="carry"
        label="Carry"
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-bag" satisfies TextureTailwindClass}`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="carry" />}
        onSelect={useDispatchActionCallback(assignInputStart, "carry")}
        hint={
          <BlockyMarkdown
            className={optionsHintMarkdownClassname}
            markdown={`Carrying is **Heels only** and requires the bag`}
          />
        }
        hintInline
      />
      <MenuItem
        id="fire"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            Fire dough- nuts
          </BitmapText>
        }
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-doughnuts" satisfies TextureTailwindClass}`}
          />
        }
        hint={
          <BlockyMarkdown
            className={optionsHintMarkdownClassname}
            markdown={`Firing doughnuts is **Head only** and requires the hooter`}
          />
        }
        hintInline
        valueElement={<SelectKeysMenuAssignmentValue action="fire" />}
        onSelect={useDispatchActionCallback(assignInputStart, "fire")}
      />
      <div className="col-span-3">
        <BitmapText
          TagName="h2"
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1  sprites-double-height`}
        >
          Character Swopping
        </BitmapText>
      </div>
      <MenuItem
        id="swop"
        label="Swop"
        valueElement={<SelectKeysMenuAssignmentValue action="swop" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop")}
        hint={
          <BlockyMarkdown
            className={optionsHintMarkdownClassname}
            markdown={`Works like the original game. *Cycles through* the characters, Moves *in and out of symbiosis* if head is on top of heels`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-blank" satisfies TextureTailwindClass} relative overflow-hidden`}
          >
            <span
              className={`${spriteLeaderClasses} ${spriteClassname({ character: "head", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-head_walking_towardsRight" satisfies AnimatedTextureTailwindClass} absolute right-[50%]`}
            />
            <span
              className={`${spriteLeaderClasses} ${spriteClassname({ character: "heels", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-heels_walking_towardsRight" satisfies AnimatedTextureTailwindClass} absolute left-[50%]`}
            />
          </span>
        }
      />
      <MenuItem
        id="swopHead"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            Swop to head
          </BitmapText>
        }
        valueElement={<SelectKeysMenuAssignmentValue action="swop.head" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop.head")}
        hint={
          <BlockyMarkdown
            className={optionsHintMarkdownClassname}
            markdown={`Go *directly* to *Head*, avoiding cycling if in symbiosis`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} ${spriteClassname({ character: "head", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-head_walking_towardsRight" satisfies AnimatedTextureTailwindClass}`}
          />
        }
      />
      <MenuItem
        id="swopHeels"
        label={
          <div className={`w-6 ${multilineTextClass}`}>
            <BitmapText className={`me-1`}>Swop to</BitmapText>
            <BitmapText
              className={`text-pinkHalfbrite selectedMenuItem:text-pink`}
            >
              heels
            </BitmapText>
          </div>
        }
        valueElement={<SelectKeysMenuAssignmentValue action="swop.heels" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop.heels")}
        hint={
          <BlockyMarkdown
            className={optionsHintMarkdownClassname}
            markdown={`Go *directly* to *Heels*, avoiding cycling if in symbiosis`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} ${spriteClassname({ character: "heels", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-heels_walking_towardsRight" satisfies AnimatedTextureTailwindClass}`}
          />
        }
      />
      <div className="col-span-3">
        <BitmapText
          TagName="h2"
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1  sprites-double-height`}
        >
          Stopping the Game
        </BitmapText>
      </div>
      <MenuItem
        id="map"
        label="Map"
        valueElement={<SelectKeysMenuAssignmentValue action="map" />}
        onSelect={useDispatchActionCallback(assignInputStart, "map")}
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-scroll" satisfies TextureTailwindClass}`}
          />
        }
      />
      <MenuItem
        id="hold"
        // changed from hold to pause - "hold" is mistakable for carry
        label="Pause"
        valueElement={<SelectKeysMenuAssignmentValue action="hold" />}
        onSelect={useDispatchActionCallback(assignInputStart, "hold")}
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-drum" satisfies TextureTailwindClass}`}
          />
        }
      />
      <MenuItem
        id="menu"
        // changed from hold to pause - "hold" is mistakable for carry
        label="Menu"
        valueElement={
          <SelectKeysMenuAssignmentValue action="menu_openOrExit" />
        }
        onSelect={useDispatchActionCallback(
          assignInputStart,
          "menu_openOrExit",
        )}
      />
      <div className="col-span-3">
        <BitmapText
          TagName="h2"
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1 sprites-double-height pb-1`}
        >
          Look controls
        </BitmapText>
        <BlockyMarkdown
          markdown={`Look controls are useful for seeing more of larger rooms that don’t fit on the screen.`}
          className={optionsHintMarkdownClassname}
        />
      </div>
      <MenuItem
        id="lookShift"
        label={`Look`}
        valueElement={<SelectKeysMenuAssignmentValue action="lookShift" />}
        onSelect={useDispatchActionCallback(assignInputStart, "lookShift")}
        hint={
          <BlockyMarkdown
            className={optionsHintMarkdownClassname}
            markdown={`Hold the look key and press a direction to look around the room`}
          />
        }
        hintInline
      />
      <MenuItem
        id="lookLeft"
        label={`Look ⬅`}
        valueElement={<SelectKeysMenuAssignmentValue action="lookLeft" />}
        onSelect={useDispatchActionCallback(assignInputStart, "lookLeft")}
      />
      <MenuItem
        id="lookRight"
        label={`Look ➡`}
        valueElement={<SelectKeysMenuAssignmentValue action="lookRight" />}
        onSelect={useDispatchActionCallback(assignInputStart, "lookRight")}
      />
      <MenuItem
        id="lookUp"
        label={`Look ⬆`}
        valueElement={<SelectKeysMenuAssignmentValue action="lookUp" />}
        onSelect={useDispatchActionCallback(assignInputStart, "lookUp")}
      />
      <MenuItem
        id="lookDown"
        label={`Look ⬇`}
        valueElement={<SelectKeysMenuAssignmentValue action="lookDown" />}
        onSelect={useDispatchActionCallback(assignInputStart, "lookDown")}
      />
      <div className="col-span-3">
        <BitmapText
          TagName="h2"
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1  sprites-double-height`}
        >
          Remake Option Toggles
        </BitmapText>
      </div>
      <MenuItem
        id="cycleSprites"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            Next skin
          </BitmapText>
        }
        valueElement={<SelectKeysMenuAssignmentValue action="cycleSprites" />}
        onSelect={useDispatchActionCallback(assignInputStart, "cycleSprites")}
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-switch_left" satisfies TextureTailwindClass} sprites-normal-height`}
          />
        }
      />
      <MenuItem
        id="cycleRes"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            Cycle res- olution
          </BitmapText>
        }
        valueElement={
          <SelectKeysMenuAssignmentValue action="cycleResolution" />
        }
        onSelect={useDispatchActionCallback(
          assignInputStart,
          "cycleResolution",
        )}
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-switch_left" satisfies TextureTailwindClass} sprites-normal-height`}
          />
        }
      />
      <MenuItem
        id="toggleCrt"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            Toggle CRT effect
          </BitmapText>
        }
        valueElement={
          <SelectKeysMenuAssignmentValue action="toggleCrtFilter" />
        }
        onSelect={useDispatchActionCallback(
          assignInputStart,
          "toggleCrtFilter",
        )}
        leader={
          <span
            className={`${spriteLeaderClasses} ${"texture-switch_left" satisfies TextureTailwindClass} sprites-normal-height`}
          />
        }
      />
    </>
  );
};
