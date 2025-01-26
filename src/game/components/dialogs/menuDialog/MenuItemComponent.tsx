import { BitmapText } from "../../Sprite";
import type { MenuItem } from "./MenuItem";
import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { always } from "../../../../utils/always";
import {
  menuItemChosen,
  menuPointerSelectsItem,
} from "../../../../store/gameMenusSlice";
import type { Menu } from "./menus";

type MenuItemComponentProps = {
  menu: Menu;
  menuItem: MenuItem;
  selected: boolean;
  className?: string;
};
export const MenuItemComponent = ({
  menu,
  menuItem,
  selected,
  className,
}: MenuItemComponentProps) => {
  const show = useAppSelector(menuItem.showIf ?? always);
  const dispatch = useAppDispatch();
  const scrollIntoView = useAppSelector((state) => {
    return state.openMenus[0].scrollableSelection;
  });

  if (!show) return null;

  const needsDoubling =
    selected && menuItem.type !== "key" && !menuItem.disableDoubling;

  return (
    // contents div puts children into the grid layout:
    <div
      className={twMerge(
        "contents",
        needsDoubling ? "sprites-double-height" : "",
        className,
      )}
      onMouseMove={() => {
        const index = menu.items.indexOf(menuItem);
        if (!selected) {
          dispatch(menuPointerSelectsItem(index));
        }
      }}
      onClick={() => {
        const index = menu.items.indexOf(menuItem);
        if (!selected) {
          dispatch(menuPointerSelectsItem(index));
        }
        dispatch(menuItemChosen());
      }}
    >
      {/* first column content (icon thing)... */}
      <BitmapText
        className={twMerge(
          // inline-block is required for flipping with scale to work
          "inline-block col-start-1",
          //selected ? menu.selectedClassName : "",
          menuItem.type === "back" ? "scale-[-1]" : "",
        )}
      >
        {selected ? "⏩⏩" : "⁌⁍"}
      </BitmapText>

      {/* second column content (main label)... */}
      <div
        ref={
          selected && scrollIntoView ?
            (ele) =>
              ele?.scrollIntoView({ behavior: "instant", block: "center" })
          : undefined
        }
        className={twMerge(
          // if there is no value to show, take up the third column too:
          menuItem.ValueComponent === undefined ? "col-span-2" : "",

          // back buttons are usually at the bottom so set them away
          // from the normal menu items:
          menuItem.type === "back" ? "mt-1" : "",
          menuItem.className ?? "",
        )}
      >
        {typeof menuItem.label === "string" ?
          <>
            <BitmapText>{menuItem.label}</BitmapText>
          </>
        : <menuItem.label selected={selected} menuItem={menuItem} />}
      </div>

      {/* third column content (values etc) */}
      {menuItem.ValueComponent && (
        <menuItem.ValueComponent
          selected={selected}
          className={twMerge(
            // back buttons are usually at the bottom so set them away
            // from the normal menu items:
            menuItem.type === "back" ? "mt-1" : "",
            menuItem.className ?? "",
          )}
        />
      )}
    </div>
  );
};
