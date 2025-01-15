import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText } from "../../Sprite";
import type { Menu, MenuItem } from "./mainMenu";
import { useAppSelector } from "@/store/hooks";
import type { Action } from "@/game/input/InputState";

const CurrentKeyAssignment = ({ action }: { action: Action }) => {
  const inputs = useAppSelector((state) => {
    return state.keyAssignment[action];
  });

  return inputs.map((input, i) => {
    return (
      <BitmapText key={i} colour={spritesheetPalette.midRed}>
        {input}
      </BitmapText>
    );
  });
};

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
      colour={
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
    <div className={`block ${selected ? "[--doubleHeight:2]" : ""}`}>
      {labelEle}
      {menuItem.type === "key" && (
        <CurrentKeyAssignment action={menuItem.action} />
      )}
    </div>
  );
};
