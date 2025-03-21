import { BitmapText } from "../../../../Sprite";
import { keys } from "../../../../../../utils/entries";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import Portal from "@mutabazia/react-portal";
import { BackMenuItem } from "../../BackMenuItem";
import {
  backToParentMenu,
  setEmulatedResolution,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import type { ResolutionName } from "../../../../../../originalGame";
import { resolutions } from "../../../../../../originalGame";
import { MenuItem } from "../../MenuItem";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectEmulatedResolutionName } from "../../../../../../store/selectors";

const camelCaseToSpaces = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1 $2");

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
      label={`${currentResolutionName === resolutionName ? "* " : ""}${camelCaseToSpaces(resolutionName)}`}
      doubleHeightWhenFocussed
      hint={`${resolution.x} x ${resolution.y}`}
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
      <Border
        className="bg-midGrey zx:bg-zxWhiteDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white pl-1">
        <Portal.Provider>
          <BitmapText
            TagName="h1"
            className="text-midRed zx:text-zxRed sprites-double-height ml-3"
          >
            Emulated resolution
          </BitmapText>
          <MenuItems className="text-metallicBlue zx:text-zxBlue selectedMenuItem:text-moss zx:selectedMenuItem:text-zxMagenta">
            {keys(resolutions).map((resolutionName) => (
              <ResolutionMenuItem resolutionName={resolutionName} />
            ))}
            <MenuItemSeparator />
            <BackMenuItem />
          </MenuItems>
          <SelectedItemHint className="text-midGrey zx:text-zxMagenta" />
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
