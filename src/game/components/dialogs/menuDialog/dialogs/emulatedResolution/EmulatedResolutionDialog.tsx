import {
  type ResolutionName,
  resolutions,
} from "../../../../../../originalGame";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectEmulatedResolutionName } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { setEmulatedResolution } from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { keys } from "../../../../../../utils/entries";
import {
  optionsDialogClasses,
  optionsHintMarkdownClassname,
  optionsMenuScrollClasses,
  titleBarClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";

const ResolutionMenuItem = ({
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
      hint={
        <span class={`${optionsHintMarkdownClassname} text-single-line`}>
          {resolution.size.x} x {resolution.size.y}
        </span>
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
      <Dialog
        fullScreen
        class={optionsDialogClasses}
        dialogId="emulatedResolution"
      >
        <DialogTitleBar
          path={["Options", "Display", "Res."]}
          class={titleBarClasses}
        />
        <div class={optionsMenuScrollClasses}>
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

/** default export for preact/compat lazy() */
export default EmulatedResolutionDialog;
