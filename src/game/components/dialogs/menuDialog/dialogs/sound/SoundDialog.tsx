import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsNoFootstepSounds,
  selectIsNoRoomEntryTunes,
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
  const isNoRoomEntryTunes = useAppSelector(selectIsNoRoomEntryTunes);
  return (
    <Dialog fullScreen className={optionsDialogClasses} dialogId="sound">
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
          <MenuItem
            className="sprites-double-height"
            id="roomEntry"
            label="Room entry tunes"
            valueElement={<Switch value={!isMuted && !isNoRoomEntryTunes} />}
            verticalAlignItemsCentre
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "soundSettings.noRoomEntryTunes",
            })}
            disabled={isMuted}
          />
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
  );
};
