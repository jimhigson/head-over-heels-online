import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsNoFootstepSounds,
  selectIsSoundMuted,
  selectRoomEntryTunes,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  nextRoomEntryTunes,
  type RoomEntryTunesSetting,
  roomEntryTunesSettings,
  toggleUserSetting,
} from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { Switch, SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import {
  optionsDialogClasses,
  optionsHintMarkdownClassname,
  optionsMenuScrollClasses,
  titleBarClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { DialogTitleBar } from "../DialogTitleBar";

const roomEntryTunesDescription = (
  roomEntryTunes: RoomEntryTunesSetting,
): string =>
  roomEntryTunes === "always" ?
    `Like the original, plays the jingle in *every* room`
  : roomEntryTunes === "sparse" ? `Play jingles when the scenery changes`
  : `Nope, off`;

export const SoundDialog = () => {
  const isMuted = useAppSelector(selectIsSoundMuted);
  const isNoFootstepSounds = useAppSelector(selectIsNoFootstepSounds);
  const roomEntryTunes = useAppSelector(selectRoomEntryTunes);
  return (
    <Dialog fullScreen class={optionsDialogClasses} dialogId="sound">
      <DialogTitleBar path={["Options", "Sounds"]} class={titleBarClasses} />
      <div class={optionsMenuScrollClasses}>
        <MenuItems>
          <MenuItem
            doubleHeight
            id="mute"
            label="Mute"
            valueElement={<Switch class="ml-auto" value={isMuted} />}
            verticalAlignItemsCentre
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "soundSettings.mute",
            })}
          />
          <MenuItem
            doubleHeight
            id="roomEntry"
            label="Room entry jingles"
            valueElement={
              <SwitchN
                class="ml-auto"
                values={roomEntryTunesSettings}
                value={roomEntryTunes}
              />
            }
            verticalAlignItemsCentre
            onSelect={useDispatchActionCallback(nextRoomEntryTunes)}
            disabled={isMuted}
            hint={
              <BlockyMarkdown
                class={optionsHintMarkdownClassname}
                markdown={roomEntryTunesDescription(roomEntryTunes)}
              />
            }
          />
          <MenuItem
            doubleHeight
            id="footsteps"
            label="Footsteps"
            valueElement={
              <Switch class="ml-auto" value={!isMuted && !isNoFootstepSounds} />
            }
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
