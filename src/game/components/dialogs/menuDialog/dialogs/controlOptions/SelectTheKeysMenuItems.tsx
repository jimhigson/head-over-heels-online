import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useDirectionsRelativeTo } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { assignInputStart } from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/playableTailwindSpriteClassname";
import {
  optionsHintMarkdownClassname,
  spriteLeaderClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { SelectKeysMenuAssignmentValue } from "./SelectKeysMenuAssignmentValue";

export const SelectTheKeysMenuItems = () => {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  const isScreenRelativeControl = useDirectionsRelativeTo() === "screen";

  return (
    <>
      <div class="col-span-3">
        <h2 class="text-midRed zx:text-zxBlue toppy:text-toppyPink2 pt-1 text-double-height">
          Movement
        </h2>
      </div>
      <MenuItem
        id="left"
        label={`Left ${isScreenRelativeControl ? "⬅" : "↖"}`}
        leader={
          <span
            class={`${spriteLeaderClasses} ${
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
            class={`${spriteLeaderClasses} ${
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
            class={`${spriteLeaderClasses} ${
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
            class={`${spriteLeaderClasses} ${
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
            class={`${spriteLeaderClasses} ${"texture-spring_released" satisfies TextureTailwindClass} ${"selectedMenuItem:texture-spring_compressed" satisfies TextureTailwindClass}`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="jump" />}
        onSelect={useDispatchActionCallback(assignInputStart, "jump")}
      />
      <div class="col-span-3">
        <h2 class="text-midRed zx:text-zxBlue toppy:text-toppyPink2 pt-1 text-double-height">
          Character-specific Abilities
        </h2>
      </div>
      <div class="text-multi-line col-span-3">
        <BlockyMarkdown
          markdown={`**NOTE:** Some puzzles require Heels to jump and pick up/down simultaneously - keep a key assigned to *both jump and carry*`}
          class={optionsHintMarkdownClassname}
        />
      </div>
      <MenuItem
        id="carry"
        label="Carry"
        leader={
          <span
            class={`${spriteLeaderClasses} ${"texture-bag" satisfies TextureTailwindClass}`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="carry" />}
        onSelect={useDispatchActionCallback(assignInputStart, "carry")}
        hint={
          <BlockyMarkdown
            class={optionsHintMarkdownClassname}
            markdown={`Carrying is **Heels only** and requires the bag`}
          />
        }
      />
      <MenuItem
        id="fire"
        label={
          <span class="inline-block w-6 text-multi-line">Fire dough- nuts</span>
        }
        leader={
          <span
            class={`${spriteLeaderClasses} ${"texture-doughnuts" satisfies TextureTailwindClass}`}
          />
        }
        hint={
          <BlockyMarkdown
            class={optionsHintMarkdownClassname}
            markdown={`Firing doughnuts is **Head only** and requires the hooter`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="fire" />}
        onSelect={useDispatchActionCallback(assignInputStart, "fire")}
      />
      <div class="col-span-3">
        <h2 class="text-midRed zx:text-zxBlue toppy:text-toppyPink2 pt-1 text-double-height">
          Character Swopping
        </h2>
      </div>
      <MenuItem
        id="swop"
        label="Swop"
        valueElement={<SelectKeysMenuAssignmentValue action="swop" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop")}
        hint={
          <BlockyMarkdown
            class={optionsHintMarkdownClassname}
            markdown={`Works like the original game. *Cycles through* the characters, Moves *in and out of symbiosis* if head is on top of heels`}
          />
        }
        leader={
          <span class="relative overflow-hidden w-3 h-3">
            <span
              class={`${spriteLeaderClasses} ${spriteClassname({ character: "head", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-head_walking_towardsRight" satisfies AnimatedTextureTailwindClass} absolute right-[50%]`}
            />
            <span
              class={`${spriteLeaderClasses} ${spriteClassname({ character: "heels", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-heels_walking_towardsRight" satisfies AnimatedTextureTailwindClass} absolute left-[50%]`}
            />
          </span>
        }
      />
      <MenuItem
        id="swopHead"
        label={
          <span class="inline-block w-6 text-multi-line">Swop to head</span>
        }
        valueElement={<SelectKeysMenuAssignmentValue action="swop.head" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop.head")}
        hint={
          <BlockyMarkdown
            class={optionsHintMarkdownClassname}
            markdown={`Go *directly* to *Head*, avoiding cycling if in symbiosis`}
          />
        }
        leader={
          <span
            class={`${spriteLeaderClasses} ${spriteClassname({ character: "head", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-head_walking_towardsRight" satisfies AnimatedTextureTailwindClass}`}
          />
        }
      />
      <MenuItem
        id="swopHeels"
        label={
          <div class="w-6 text-multi-line">
            <span class="me-1 text-single-line">Swop to</span>
            <span class="text-pinkHalfbrite selectedMenuItem:text-pink text-single-line">
              heels
            </span>
          </div>
        }
        valueElement={<SelectKeysMenuAssignmentValue action="swop.heels" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop.heels")}
        hint={
          <BlockyMarkdown
            class={optionsHintMarkdownClassname}
            markdown={`Go *directly* to *Heels*, avoiding cycling if in symbiosis`}
          />
        }
        leader={
          <span
            class={`${spriteLeaderClasses} ${spriteClassname({ character: "heels", action: "idle", facingXy8: "towardsRight" })} ${"selectedMenuItem:texture-animated-heels_walking_towardsRight" satisfies AnimatedTextureTailwindClass}`}
          />
        }
      />
      <div class="col-span-3">
        <h2 class="text-midRed zx:text-zxBlue toppy:text-toppyPink2 pt-1 text-double-height">
          Stopping the Game
        </h2>
      </div>
      <MenuItem
        id="map"
        label="Map"
        valueElement={<SelectKeysMenuAssignmentValue action="map" />}
        onSelect={useDispatchActionCallback(assignInputStart, "map")}
        leader={
          <span
            class={`${spriteLeaderClasses} ${"texture-scroll" satisfies TextureTailwindClass}`}
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
            class={`${spriteLeaderClasses} ${"texture-drum" satisfies TextureTailwindClass}`}
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
      <div class="col-span-3">
        <h2 class="text-midRed zx:text-zxBlue toppy:text-toppyPink2 pt-1 text-double-height pb-1">
          Camera
        </h2>
        <BlockyMarkdown
          markdown={`Rotate the camera to understand the room better.`}
          class={optionsHintMarkdownClassname}
        />
      </div>
      <MenuItem
        id="rotateCameraClockwise"
        label={
          <span class="inline-block w-6 text-multi-line">Rotate clockwise</span>
        }
        valueElement={
          <SelectKeysMenuAssignmentValue action="rotateCameraClockwise" />
        }
        onSelect={useDispatchActionCallback(
          assignInputStart,
          "rotateCameraClockwise",
        )}
        leader={
          <span
            class={`${spriteLeaderClasses} ${"texture-hud_char_↻" satisfies TextureTailwindClass}`}
          />
        }
      />
      <MenuItem
        id="rotateCameraAnticlockwise"
        label={
          <span class="inline-block w-6 text-multi-line">
            Rotate anticlockwise
          </span>
        }
        valueElement={
          <SelectKeysMenuAssignmentValue action="rotateCameraAnticlockwise" />
        }
        onSelect={useDispatchActionCallback(
          assignInputStart,
          "rotateCameraAnticlockwise",
        )}
        leader={
          <span
            class={`${spriteLeaderClasses} ${"texture-hud_char_↺" satisfies TextureTailwindClass}`}
          />
        }
      />
      <div class="col-span-3">
        <h2 class="text-midRed zx:text-zxBlue toppy:text-toppyPink2 pt-1 text-double-height pb-1">
          Look controls
        </h2>
        <BlockyMarkdown
          markdown={`Look controls are useful for seeing more of larger rooms that don’t fit on the screen.`}
          class={optionsHintMarkdownClassname}
        />
      </div>
      <MenuItem
        id="lookShift"
        label={`Look`}
        valueElement={<SelectKeysMenuAssignmentValue action="lookShift" />}
        onSelect={useDispatchActionCallback(assignInputStart, "lookShift")}
        hint={
          <BlockyMarkdown
            class={optionsHintMarkdownClassname}
            markdown={`Hold the look key and press a direction to look around the room`}
          />
        }
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
      <div class="col-span-3">
        <h2 class="text-midRed zx:text-zxBlue toppy:text-toppyPink2 pt-1 text-double-height">
          Remake Option Toggles
        </h2>
      </div>
      <MenuItem
        id="cycleSprites"
        label={<span class="inline-block w-6 text-multi-line">Next skin</span>}
        valueElement={<SelectKeysMenuAssignmentValue action="cycleSprites" />}
        onSelect={useDispatchActionCallback(assignInputStart, "cycleSprites")}
        leader={
          <span
            class={`${spriteLeaderClasses} ${"texture-switch_left" satisfies TextureTailwindClass} sprites-normal-height`}
          />
        }
      />
      <MenuItem
        id="cycleRes"
        label={
          <span class="inline-block w-6 text-multi-line">
            Cycle res- olution
          </span>
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
            class={`${spriteLeaderClasses} ${"texture-switch_left" satisfies TextureTailwindClass} sprites-normal-height`}
          />
        }
      />
      <MenuItem
        id="toggleCrt"
        label={
          <span class="inline-block w-6 text-multi-line">
            Toggle CRT effect
          </span>
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
            class={`${spriteLeaderClasses} ${"texture-switch_left" satisfies TextureTailwindClass} sprites-normal-height`}
          />
        }
      />
    </>
  );
};
