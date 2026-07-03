import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsCrtFilter,
  selectShowFps,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { toggleUserSetting } from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { Switch } from "../../../../../../ui/Switch";
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
import { FullscreenMenuItem } from "./FullscreenMenuItem";
import { SpritesOptionMenuItem } from "./SpritesOptionMenuItem";

const crtEffectMarkdown = `Here for the nostalgia?

Make your fancy new screen look like it’s 1987 again.`;

export const DisplayOptionsDialog = () => {
  return (
    <Dialog
      fullScreen
      className={optionsDialogClasses}
      dialogId="displayOptions"
    >
      <DialogTitleBar
        path={["Options", "Display"]}
        className={titleBarClasses}
      />
      <div className={optionsMenuScrollClasses}>
        <MenuItems>
          {
            // keep inline (not deploymentType()) to allow tree-shaking
            import.meta.env.TAURI_ENV_PLATFORM && <FullscreenMenuItem />
          }
          <SpritesOptionMenuItem />
          <MenuItem
            doubleHeight
            id="crtFilter"
            verticalAlignItemsCentre
            label={
              <>
                <span>
                  <span className="text-midRed zx:text-zxRed toppy:text-toppyPink2">
                    C
                  </span>
                  <span className="text-moss zx:text-zxGreen toppy:text-toppyCool2">
                    R
                  </span>
                  <span className="text-pastelBlue zx:text-zxBlue toppy:text-toppyGrey2">
                    T
                  </span>
                </span>
                <span>{" TV Effect"}</span>
              </>
            }
            valueElement={
              <Switch
                className="ml-auto"
                value={useAppSelector(selectIsCrtFilter)}
              />
            }
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "displaySettings.crtFilter",
            })}
            hint={
              <BlockyMarkdown
                className={optionsHintMarkdownClassname}
                markdown={crtEffectMarkdown}
              />
            }
          />
          <MenuItem
            doubleHeight
            id="emulatedResolution"
            label="Emulated Resolution"
            subMenuId="emulatedResolution"
            verticalAlignItemsCentre
            hint={
              <BlockyMarkdown
                className={optionsHintMarkdownClassname}
                markdown={`See more of the room by choosing a higher resolution to emulate.`}
              />
            }
          />
          <MenuItem
            doubleHeight
            verticalAlignItemsCentre
            id="showFps"
            label="Show FPS"
            valueElement={
              <Switch
                className="ml-auto"
                value={useAppSelector(selectShowFps)}
              />
            }
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "showFps",
            })}
            hint={
              <BlockyMarkdown
                className={optionsHintMarkdownClassname}
                markdown={`Frames per second shown during gameplay.`}
              />
            }
          />
          <MenuItemSeparator />
        </MenuItems>
      </div>
    </Dialog>
  );
};
