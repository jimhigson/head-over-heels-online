import { twMerge } from "tailwind-merge";
import { MenuItemComponent } from "./MenuItemComponent";
import {
  useCurrentMenu,
  useCurrentMenuSelectedItemIndex,
} from "../../../../store/selectors";

export const MenuItems = ({
  className,
  selectedClassName,
}: {
  className?: string;
  selectedClassName?: string;
}) => {
  const menu = useCurrentMenu();
  const selectedItemIndex = useCurrentMenuSelectedItemIndex();

  if (menu === undefined || selectedItemIndex === undefined) throw new Error();

  return (
    <div
      className={twMerge(
        "grid grid-cols-menuItems gap-x-1 gap-y-oneScaledPix",
        className,
      )}
    >
      {menu.items.map((mi, i) => {
        const isSelected = i === selectedItemIndex;
        return (
          <MenuItemComponent
            className={isSelected ? selectedClassName : ""}
            key={i}
            menuItem={mi}
            selected={isSelected}
          />
        );
      })}
    </div>
  );
};
