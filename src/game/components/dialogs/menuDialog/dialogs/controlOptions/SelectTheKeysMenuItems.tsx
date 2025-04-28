import { twMerge } from "tailwind-merge";
import {
  goToSubmenu,
  assignInputStart,
} from "../../../../../../store/slices/gameMenusSlice";
import {
  selectCurrentInputPreset,
  useIsScreenRelativeControl,
} from "../../../../../../store/selectors";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { multilineTextClass } from "../../multilineTextClass";
import { SelectKeysMenuAssignmentValue } from "./SelectKeysMenuAssignmentValue";
import { spriteLeaderClasses } from "./spriteLeaderClasses";
import { useAppSelector } from "../../../../../../store/hooks";

export const CurrentPresetValue = ({ className }: { className?: string }) => {
  const currentPresetName = useAppSelector(selectCurrentInputPreset);

  return (
    <BitmapText
      className={twMerge(
        `text-nowrap`,
        "text-pinkHalfbrite zx:text-zxRed selectedMenuItem:text-pink zx:selectedMenuItem:text-zxRed",
        className,
      )}
    >
      {currentPresetName ?? "custom"}
    </BitmapText>
  );
};

export const SelectTheKeysMenuItems = () => {
  const isScreenRelativeControl = useIsScreenRelativeControl();

  return (
    <>
      <MenuItem
        id="preset"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            key/ button preset
          </BitmapText>
        }
        valueElement={<CurrentPresetValue />}
        onSelect={useDispatchActionCallback(goToSubmenu, "inputPreset")}
      />
      <MenuItem
        id="left"
        label={`Left ${isScreenRelativeControl ? "⬅" : "↖"}`}
        leader={
          <span
            className={`${spriteLeaderClasses} ${
              isScreenRelativeControl ?
                "texture-head.walking.towardsLeft.2 selectedMenuItem:texture-animated-head.walking.towardsLeft"
              : "texture-head.walking.left.2 selectedMenuItem:texture-animated-head.walking.left"
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
                "texture-head.walking.awayRight.2 selectedMenuItem:texture-animated-head.walking.awayRight"
              : "texture-head.walking.right.2 selectedMenuItem:texture-animated-head.walking.right"
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
                "texture-head.walking.awayLeft.2 selectedMenuItem:texture-animated-head.walking.awayLeft"
              : "texture-head.walking.away.2 selectedMenuItem:texture-animated-head.walking.away"
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
                "texture-head.walking.towardsRight.2 selectedMenuItem:texture-animated-head.walking.towardsRight"
              : "texture-head.walking.towards.2 selectedMenuItem:texture-animated-head.walking.towards"
            }`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="towards" />}
        onSelect={useDispatchActionCallback(assignInputStart, "towards")}
      />
      <div className={`${multilineTextClass} col-span-3`}>
        <BitmapText className="text-midRed bg-pureBlack inline-block zx:text-zxRed zx:bg-zxYellow me-1">
          Note:
        </BitmapText>
        <BitmapText className="text-midGrey zx:text-zxBlack">
          some puzzles require you to jump and pick up simultaneously - assign a
          key for both jump and carry
        </BitmapText>
      </div>
      <MenuItem
        id="jump"
        label="Jump"
        leader={
          <span
            className={`${spriteLeaderClasses} texture-spring.released selectedMenuItem:texture-spring.compressed`}
          />
        }
        valueElement={<SelectKeysMenuAssignmentValue action="jump" />}
        onSelect={useDispatchActionCallback(assignInputStart, "jump")}
      />
      <MenuItem
        id="carry"
        label="Carry"
        leader={<span className={`${spriteLeaderClasses} texture-bag`} />}
        valueElement={<SelectKeysMenuAssignmentValue action="carry" />}
        onSelect={useDispatchActionCallback(assignInputStart, "carry")}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`**carrying is heels only**. requires the bag`}
          />
        }
        hintInline
      />
      <MenuItem
        id="fire"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            fire dough- nuts
          </BitmapText>
        }
        leader={<span className={`${spriteLeaderClasses} texture-doughnuts`} />}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`**firing doughnuts is head only**. requires the hooter`}
          />
        }
        hintInline
        valueElement={<SelectKeysMenuAssignmentValue action="fire" />}
        onSelect={useDispatchActionCallback(assignInputStart, "fire")}
      />
      <MenuItem
        id="swop"
        label="Swop"
        valueElement={<SelectKeysMenuAssignmentValue action="swop" />}
        onSelect={useDispatchActionCallback(assignInputStart, "swop")}
        hint={
          <BlockyMarkdown
            className="text-midGrey zx:text-zxBlack"
            markdown={`Like the swop key from the original game; *cycles through* the characters, Moves *in and out of symbiosis* if head is on top of heels`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} texture-blank relative overflow-hidden`}
          >
            <span
              className={`${spriteLeaderClasses} texture-head.walking.towardsRight.2 selectedMenuItem:texture-animated-head.walking.towardsRight absolute right-[50%]`}
            />
            <span
              className={`${spriteLeaderClasses} texture-heels.walking.towardsRight.2 selectedMenuItem:texture-animated-heels.walking.towardsRight absolute left-[50%]`}
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
            className="text-midGrey zx:text-zxBlack"
            markdown={`**shortcut**: go *directly* to *head*, avoiding cycling if in symbiosis`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} texture-head.walking.towardsRight.2 selectedMenuItem:texture-animated-head.walking.towardsRight`}
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
            className="text-midGrey zx:text-zxBlack"
            markdown={`**shortcut**: go *directly* to *heels*, avoiding cycling if in symbiosis`}
          />
        }
        hintInline
        leader={
          <span
            className={`${spriteLeaderClasses} texture-heels.walking.towardsRight.2 selectedMenuItem:texture-animated-heels.walking.towardsRight`}
          />
        }
      />
      <MenuItem
        id="map"
        label="Map"
        valueElement={<SelectKeysMenuAssignmentValue action="map" />}
        onSelect={useDispatchActionCallback(assignInputStart, "map")}
        leader={<span className={`${spriteLeaderClasses} texture-scroll`} />}
      />
      <MenuItem
        id="hold"
        // changed from hold to pause - "hold" is mistakable for carry
        label="Pause"
        valueElement={<SelectKeysMenuAssignmentValue action="hold" />}
        onSelect={useDispatchActionCallback(assignInputStart, "hold")}
      />
      <MenuItem
        id="toggleColourisation"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            toggle colour- isation
          </BitmapText>
        }
        valueElement={
          <SelectKeysMenuAssignmentValue action="toggleColourisation" />
        }
        onSelect={useDispatchActionCallback(
          assignInputStart,
          "toggleColourisation",
        )}
      />
    </>
  );
};
