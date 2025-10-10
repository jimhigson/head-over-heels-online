import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsNoFootstepSounds,
  selectIsSoundMuted,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { toggleUserSetting } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { Switch } from "../../../../../../ui/Switch";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { DialogTitleBar } from "../DialogTitleBar";
import {
  optionsDialogClasses,
  optionsMenuScrollClasses,
  titleBarClasses,
} from "../options/optionsMenuColours";

export const SoundDialog = () => {
  const isMuted = useAppSelector(selectIsSoundMuted);
  const isNoFootstepSounds = useAppSelector(selectIsNoFootstepSounds);
  return (
    <>
      <Dialog fullScreen className={optionsDialogClasses}>
        <DialogTitleBar
          path={["Options", "Sounds"]}
          className={titleBarClasses}
        />
        <div className={optionsMenuScrollClasses}>
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
