import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useContext } from "react";
import { ScaleFactorContext } from "../../ScaleFactorContext";
import { BitmapText } from "../../Sprite";
import type { MenuItem } from "./MenuItem";

type MenuItemComponentProps = {
  menuItem: MenuItem;
  selected: boolean;
};
export const MenuItemComponent = ({
  menuItem: { text },
  selected,
}: MenuItemComponentProps) => {
  const scaleFactor = useContext(ScaleFactorContext);
  return (
    <BitmapText
      scale={scaleFactor}
      doubleHeight={selected}
      color={
        selected ? spritesheetPalette.metallicBlue : spritesheetPalette.moss
      }
      className="block mb-1"
    >
      {selected ? "==" : "{}"}
      {text}
    </BitmapText>
  );
};
