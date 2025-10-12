import type { ResolutionName } from "../../../../../../originalGame";

import { resolutions } from "../../../../../../originalGame";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectEmulatedResolutionName } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { setEmulatedResolution } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { keys } from "../../../../../../utils/entries";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";
import {
  optionsDialogClasses,
  optionsMenuScrollClasses,
  titleBarClasses,
} from "../options/optionsMenuColours";

export const ResolutionMenuItem = ({
  resolutionName,
}: {
  resolutionName: ResolutionName;
}) => {
  const currentResolutionName = useAppSelector(selectEmulatedResolutionName);
  const resolution = resolutions[resolutionName];
  return (
    <MenuItem
      id={resolutionName}
      key={resolutionName}
      label={`${currentResolutionName === resolutionName ? "* " : ""}${resolution.name}`}
      doubleHeightWhenFocussed
      hintInline
      hint={
        <BitmapText className={optionsHintMarkdownClassname}>
          {resolution.size.x} x {resolution.size.y}
        </BitmapText>
      }
      onSelect={useDispatchActionCallback(
        setEmulatedResolution,
        resolutionName,
      )}
    />
  );
};

export const EmulatedResolutionDialog = () => {
  return (
    <DialogPortal>
      <Dialog fullScreen className={optionsDialogClasses}>
        <DialogTitleBar
          path={["Options", "Emulated Res."]}
          className={titleBarClasses}
        />
        <div className={optionsMenuScrollClasses}>
          <MenuItems>
            {keys(resolutions).map((resolutionName) => (
              <ResolutionMenuItem
                key={resolutionName}
                resolutionName={resolutionName}
              />
            ))}
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
