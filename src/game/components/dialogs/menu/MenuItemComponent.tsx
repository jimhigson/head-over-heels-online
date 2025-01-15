import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText } from "../../Sprite";
import type { Menu, MenuItem } from "./mainMenu";
import { CurrentKeyAssignment } from "./CurrentKeyAssignment";

type MenuItemComponentProps = {
  menu: Menu;
  menuItem: MenuItem;
  selected: boolean;
};
export const MenuItemComponent = ({
  menu,
  menuItem,
  selected,
}: MenuItemComponentProps) => {
  const itemColor =
    selected ?
      spritesheetPalette[menu.selectedColour]
    : spritesheetPalette[menu.itemColour];

  const labelEle = (
    <BitmapText colour={itemColor}>
      {selected ? "==" : "{}"}
      {menuItem.label}
    </BitmapText>
  );
  return (
    <div className={`block relative ${selected ? "[--doubleHeight:2]" : ""}`}>
      {labelEle}
      {menuItem.type === "key" && (
        <CurrentKeyAssignment
          className="absolute left-selectKeysIndent top-0"
          action={menuItem.action}
          keyColor={spritesheetPalette.midRed}
          deliminatorColor={itemColor}
        />
      )}
    </div>
  );
};
