import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsNoFootstepSounds,
  selectIsSoundMuted,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  backToParentMenu,
  toggleUserSetting,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
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
            Options ➡ Sounds
          </BitmapText>
          <MenuItems>
            <MenuItem
              className="sprites-double-height"
              id="mute"
              label="Mute"
              valueElement={<Switch value={isMuted} />}
              verticalAlignItemsCentre
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "soundSettings.mute",
              })}
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
              className="sprites-double-height"
              id="footsteps"
              label="Footstep sounds"
              valueElement={<Switch value={!isMuted && !isNoFootstepSounds} />}
              verticalAlignItemsCentre
              onSelect={useDispatchActionCallback(toggleUserSetting, {
                path: "soundSettings.noFootsteps",
              })}
              disabled={isMuted}
            />
            <MenuItemSeparator />
          </MenuItems>
        </div>
      </Dialog>
    </>
  );
};
