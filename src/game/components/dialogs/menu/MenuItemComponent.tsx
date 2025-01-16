import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText } from "../../Sprite";
import type { Menu, MenuItem } from "./mainMenu";
import { CurrentKeyAssignment } from "./CurrentKeyAssignment";
import { twMerge } from "tailwind-merge";

type MenuItemComponentProps = {
  menu: Menu;
  menuItem: MenuItem;
  selected: boolean;
  className: string;
};
export const MenuItemComponent = ({
  menu,
  menuItem,
  selected,
  className,
}: MenuItemComponentProps) => {
  const itemColor =
    selected ?
      spritesheetPalette[menu.selectedColour]
    : spritesheetPalette[menu.itemColour];

  const labelEle = (
    <BitmapText colour={itemColor} noSpaceAfter>
      {selected ? "==" : "{}"}
      {menuItem.label}
    </BitmapText>
  );
  return (
    <>
      <div
        className={twMerge(
          `${selected && menuItem.type !== "key" && !menuItem.disableDoubling ? "[--doubleHeight:2]" : ""}`,
          menuItem.type === "submenu" ? "col-span-2" : "",
          className,
        )}
      >
        {labelEle}
      </div>
      {menuItem.type === "key" && (
        <CurrentKeyAssignment
          className=""
          action={menuItem.action}
          keyColor={
            selected ? spritesheetPalette.redShadow : spritesheetPalette.midRed
          }
          deliminatorColor={itemColor}
        />
      )}
    </>
  );
};
