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
                "texture-head_walking_towardsLeft_2 selectedMenuItem:texture-animated-head_walking_towardsLeft"
              : "texture-head_walking_left_2 selectedMenuItem:texture-animated-head_walking_left"
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
                "texture-head_walking_awayRight_2 selectedMenuItem:texture-animated-head_walking_awayRight"
              : "texture-head_walking_right_2 selectedMenuItem:texture-animated-head_walking_right"
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
                "texture-head_walking_awayLeft_2 selectedMenuItem:texture-animated-head_walking_awayLeft"
              : "texture-head_walking_away_2 selectedMenuItem:texture-animated-head_walking_away"
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
                "texture-head_walking_towardsRight_2 selectedMenuItem:texture-animated-head_walking_towardsRight"
              : "texture-head_walking_towards_2 selectedMenuItem:texture-animated-head_walking_towards"
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
            className={`${spriteLeaderClasses} texture-spring_released selectedMenuItem:texture-spring_compressed`}
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
              className={`${spriteLeaderClasses} texture-head_walking_towardsRight_2 selectedMenuItem:texture-animated-head_walking_towardsRight absolute right-[50%]`}
            />
            <span
              className={`${spriteLeaderClasses} texture-heels_walking_towardsRight_2 selectedMenuItem:texture-animated-heels_walking_towardsRight absolute left-[50%]`}
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
            className={`${spriteLeaderClasses} texture-head_walking_towardsRight_2 selectedMenuItem:texture-animated-head_walking_towardsRight`}
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
            className={`${spriteLeaderClasses} texture-heels_walking_towardsRight_2 selectedMenuItem:texture-animated-heels_walking_towardsRight`}
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
        leader={<span className={`${spriteLeaderClasses} texture-drum`} />}
      />
      <div className="col-span-3">
        <BitmapText
          TagName="h2"
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1`}
        >
          Look controls
        </BitmapText>
        <BitmapText
          TagName="h2"
          className={`text-midGrey zx:text-zxBlack ${multilineTextClass}`}
        >
          useful for seeing more of larger rooms that don't fit on the screen.
        </BitmapText>
      </div>
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
          className={`text-midRed zx:text-zxBlue ${multilineTextClass} pt-1`}
        >
          Remake option toggles
        </BitmapText>
      </div>
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
      <MenuItem
        id="cycleRes"
        label={
          <BitmapText className={`inline-block w-6 ${multilineTextClass}`}>
            cycle res- olution
          </BitmapText>
        }
        valueElement={
          <SelectKeysMenuAssignmentValue action="cycleResolution" />
        }
        onSelect={useDispatchActionCallback(
          assignInputStart,
          "cycleResolution",
        )}
      />
    </>
  );
};
