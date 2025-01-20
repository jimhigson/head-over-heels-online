import { BitmapText } from "../../Sprite";
import type { Menu } from "./menus";
import type { MenuItem } from "./MenuItem";
import { CurrentKeyAssignment } from "./CurrentKeyAssignment";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { useAppSelector } from "../../../../store/hooks";

const SwitchCurrentValue = ({
  switchMenuItem: { selector },
  className,
}: {
  switchMenuItem: MenuItem & { type: "switch" };
  className?: string;
}) => {
  const value = useAppSelector((store) => (selector ? selector(store) : false));

  return (
    <div>
      <BitmapText
        className={clsx(
          value ? "bg-shadow" : "bg-redShadow",
          value ? "text-moss" : "text-midRed",
          className,
        )}
        noSlitWords
      >
        {value ? "  ON" : "OFF "}
      </BitmapText>
    </div>
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
      <BitmapText
        className={clsx("me-1", menuItem.type === "back" ? "scale-[-1]" : "")}
      >
        {selected ? "⏩⏩" : "⁌⁍"}
      </BitmapText>
      {typeof menuItem.label === "string" ?
        <BitmapText>{menuItem.label}</BitmapText>
      : <menuItem.label selected={selected} />}
    </>
  );
  const needsDoubling =
    selected && menuItem.type !== "key" && !menuItem.disableDoubling;

  return (
    <>
      <div
        ref={
          selected ?
            (ele) =>
              ele?.scrollIntoView({ behavior: "instant", block: "center" })
          : undefined
        }
        className={twMerge(
          needsDoubling ? "sprites-double-height" : "",
          menuItem.type === "submenu" ? "col-span-2" : "",
          menuItem.type === "back" ? "mt-1" : "",
          selected ? menu.selectedClassName : "",
          className,
        )}
      >
        {labelEle}
      </div>
      {menuItem.type === "key" && (
        <CurrentKeyAssignment
          className={twMerge(
            "flex flex-wrap gap-y-oneScaledPix gap-x-1",
            selected ? menu.selectedClassName : "",
          )}
          action={menuItem.action}
          keyClassName={selected ? "text-redShadow" : "text-midRed"}
          // me-0 prevents a gap after the delim, since we do that with gap-x-1 instead
          deliminatorClassName="me-0"
        />
      )}
      {menuItem.type === "switch" && (
        <SwitchCurrentValue
          className={needsDoubling ? "sprites-double-height" : ""}
          switchMenuItem={menuItem}
        />
      )}
    </>
  );
};
