import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsCrtFilter,
  selectIsSmoothSprites,
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

const smoothSpritesMarkdown = `Redraws the sprites with smooth edges at your
screen’s resolution, using the cleanEdge algorithm.

Purists look away.`;

export const DisplayOptionsDialog = () => {
  return (
    <Dialog fullScreen class={optionsDialogClasses} dialogId="displayOptions">
      <DialogTitleBar path={["Options", "Display"]} class={titleBarClasses} />
      <div class={optionsMenuScrollClasses}>
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
                  <span class="text-midRed zx:text-zxRed toppy:text-toppyPink2">
                    C
                  </span>
                  <span class="text-moss zx:text-zxGreen toppy:text-toppyCool2">
                    R
                  </span>
                  <span class="text-pastelBlue zx:text-zxBlue toppy:text-toppyGrey2">
                    T
                  </span>
                </span>
                <span>{" TV Effect"}</span>
              </>
            }
            valueElement={
              <Switch
                class="ml-auto"
                value={useAppSelector(selectIsCrtFilter)}
              />
            }
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "displaySettings.crtFilter",
            })}
            hint={
              <BlockyMarkdown
                class={optionsHintMarkdownClassname}
                markdown={crtEffectMarkdown}
              />
            }
          />
          <MenuItem
            doubleHeight
            id="smoothSprites"
            verticalAlignItemsCentre
            label="Smooth Sprites"
            valueElement={
              <Switch
                class="ml-auto"
                value={useAppSelector(selectIsSmoothSprites)}
              />
            }
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "displaySettings.smoothSprites",
            })}
            hint={
              <BlockyMarkdown
                class={optionsHintMarkdownClassname}
                markdown={smoothSpritesMarkdown}
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
                class={optionsHintMarkdownClassname}
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
              <Switch class="ml-auto" value={useAppSelector(selectShowFps)} />
            }
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "showFps",
            })}
            hint={
              <BlockyMarkdown
                class={optionsHintMarkdownClassname}
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

/** default export for preact/compat lazy() */
export default DisplayOptionsDialog;
