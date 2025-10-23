import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectIsCrtFilter,
  selectShowFps,
  useIsUncolourised,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import {
  goToSubmenu,
  toggleUserSetting,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { Switch } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { DialogTitleBar } from "../DialogTitleBar";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";
import {
  optionsDialogClasses,
  optionsMenuScrollClasses,
  titleBarClasses,
} from "../options/optionsMenuColours";

const colouriseMarkdown = `![](texture-animated-head_walking_towards?float-right&mt-1)**Off**: Original *two-tone* spectrum graphics

**On**: *16-colour* palette with colourised sprites`;

const crtEffectMarkdown = `Here for the nostalgia?

Make your fancy new screen look like it’s 1987 again.`;

export const DisplayOptionsDialog = () => {
  return (
    <Dialog fullScreen className={optionsDialogClasses}>
      <DialogTitleBar
        path={["Options", "Display"]}
        className={titleBarClasses}
      />
      <div className={optionsMenuScrollClasses}>
        <MenuItems>
          <MenuItem
            hintInline
            className="sprites-double-height"
            id="colourise"
            label="Colourise"
            valueElement={
              <Switch className="ml-auto" value={!useIsUncolourised()} />
            }
            onSelect={useDispatchActionCallback(toggleUserSetting, {
              path: "displaySettings.uncolourised",
            })}
            hint={
              <BlockyMarkdown
                className={optionsHintMarkdownClassname}
                markdown={colouriseMarkdown}
              />
            }
            verticalAlignItemsCentre
          />
          <MenuItem
            hintInline
            className="sprites-double-height"
            id="crtFilter"
            verticalAlignItemsCentre
            label={
              <span className="align-top">
                <span className="bg-shadow zx:bg-pureBlack inline-block">
                  <BitmapText className="text-midRed zx:text-zxRed">
                    C
                  </BitmapText>
                  <BitmapText className="text-moss zx:text-zxGreen">
                    R
                  </BitmapText>
                  <BitmapText className="text-pastelBlue zx:text-zxBlue">
                    T
                  </BitmapText>
                </span>
                <BitmapText>{" TV Effect"}</BitmapText>
              </span>
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
            hintInline
            className="sprites-double-height"
            id="emulatedResolution"
            label="Emulated Resolution"
            onSelect={useDispatchActionCallback(
              goToSubmenu,
              "emulatedResolution",
            )}
            verticalAlignItemsCentre
            hint={
              <BlockyMarkdown
                className={optionsHintMarkdownClassname}
                markdown={`See more of the room by choosing a higher resolution to emulate.`}
              />
            }
          />
          <MenuItem
            hintInline
            className="sprites-double-height"
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
