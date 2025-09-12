import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsNoFootstepSounds,
  selectIsSoundMuted,
} from "../../../../../../store/selectors";
import {
  backToParentMenu,
  toggleBoolean,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { Switch } from "../../../../../../ui/Switch";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import {
  optionsMenuItemColours,
  optionsMenuScrollClasses,
} from "../controlOptions/optionsMenuColours";
import { MobileStyleBackButton } from "../MobileStyleBackButton";

export const SoundDialog = () => {
  const isMuted = useAppSelector(selectIsSoundMuted);
  const isNoFootstepSounds = useAppSelector(selectIsNoFootstepSounds);
  return (
    <>
      <Border
        className="bg-lightGrey zx:bg-zxRedDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        fullScreen
        className={`bg-white zx:bg-zxWhite py-0 pl-1 ${optionsMenuItemColours}`}
      >
        <div
          className={
            "flex flex-col gap-1 " +
            "overflow-y-scroll scrollbar scrollbar-w-1 " +
            "min-h-full " +
            optionsMenuScrollClasses
          }
        >
          <MobileStyleBackButton className="pt-half" />
          <BitmapText
            TagName="h1"
            className="ml-3 text-midRed zx:text-zxBlue sprites-double-height block"
          >
            Sound Options
          </BitmapText>
          <MenuItems>
            <MenuItem
              doubleHeightWhenFocussed
              id="mute"
              label="Mute"
              valueElement={<Switch value={isMuted} />}
              verticalAlignItemsCentre
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.soundSettings.mute",
              )}
            />
            {/* <MenuItem
              doubleHeightWhenFocussed
              id="roomEntry"
              label="Room entry tunes"
              valueElement={<Switch value={!isMuted && !isNoRoomEntrySounds} />}
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.soundSettings.noRoomEntryTunes",
              )}
              disabled={isMuted}
            /> */}
            <MenuItem
              doubleHeightWhenFocussed
              id="footsteps"
              label="Footstep sounds"
              valueElement={<Switch value={!isMuted && !isNoFootstepSounds} />}
              verticalAlignItemsCentre
              onSelect={useDispatchActionCallback(
                toggleBoolean,
                "userSettings.soundSettings.noFootsteps",
              )}
              disabled={isMuted}
            />
            <MenuItemSeparator />
          </MenuItems>
        </div>
      </Dialog>
    </>
  );
};
