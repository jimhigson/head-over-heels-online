import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText } from "../../Sprite";
import type { Menu, MenuItem } from "./mainMenu";

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
  const labelEle = (
    <BitmapText
      color={
        selected ?
          spritesheetPalette[menu.selectedColour]
        : spritesheetPalette[menu.itemColour]
      }
    >
      {selected ? "==" : "{}"}
      {menuItem.label}
    </BitmapText>
  );
  return (
    <div className={`block mb-1 ${selected ? "[--doubleHeight:2]" : ""}`}>
      {labelEle}
      {menuItem.type === "key" && <BitmapText>cur</BitmapText>}
    </div>
  );
};
