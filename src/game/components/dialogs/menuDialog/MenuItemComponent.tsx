import { BitmapText } from "../../Sprite";
import type { Menu } from "./menus";
import type { MenuItem } from "./MenuItem";
import { CurrentKeyAssignment } from "./CurrentKeyAssignment";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@/store/hooks";

const SwitchCurrentValue = ({
  switchMenuItem: { selector },
}: {
  switchMenuItem: MenuItem & { type: "switch" };
}) => {
  const value = useAppSelector((store) => (selector ? selector(store) : false));

  return (
    <BitmapText
      className={value ? "text-moss" : "text-midRed"}
      noTrim
      noSlitWords
    >
      {value ? "    ON" : "OFF"}
    </BitmapText>
  );
};

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
  const labelEle = (
    <>
      <BitmapText>{selected ? "⏩⏩" : "⁌⁍"}</BitmapText>
      {typeof menuItem.label === "string" ?
        <BitmapText noSpaceAfter>{menuItem.label}</BitmapText>
      : <menuItem.label selected={selected} />}
    </>
  );
  return (
    <>
      <div
        ref={
          selected ?
            (ele) => ele?.scrollIntoView({ behavior: "instant", block: "end" })
          : undefined
        }
        className={twMerge(
          selected && menuItem.type !== "key" && !menuItem.disableDoubling ?
            "sprites-double-height"
          : "",
          menuItem.type === "submenu" ? "col-span-2" : "",
          selected ? menu.selectedClassName : "",
          className,
        )}
      >
        {labelEle}
      </div>
      {menuItem.type === "key" && (
        <CurrentKeyAssignment
          className={selected ? menu.selectedClassName : ""}
          action={menuItem.action}
          keyClassName={selected ? "text-redShadow" : "text-midRed"}
        />
      )}
      {menuItem.type === "switch" && (
        <SwitchCurrentValue switchMenuItem={menuItem} />
      )}
    </>
  );
};
