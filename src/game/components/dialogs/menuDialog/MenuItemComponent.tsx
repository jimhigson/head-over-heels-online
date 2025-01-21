import { BitmapText } from "../../Sprite";
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
          "inline-block",
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

const MenuItemKeyAssignment = ({
  switchMenuItem: { action },
  selected,
  className,
}: {
  switchMenuItem: MenuItem & { type: "key" };
  selected?: boolean;
  className?: string;
}) => {
  const assigningThisAction = useAppSelector(
    (store) => store.actionBeingAssignedKeys === action,
  );

  return (
    <CurrentKeyAssignment
      className={twMerge(
        "flex flex-wrap gap-y-oneScaledPix gap-x-1",
        className,
      )}
      action={action}
      keyClassName={selected ? "text-redShadow" : "text-midRed"}
      // me-0 prevents a gap after the delim, since we do that with gap-x-1 instead
      deliminatorClassName="me-0"
      flashingCursor={assigningThisAction}
    />
  );
};

type MenuItemComponentProps = {
  menuItem: MenuItem;
  selected: boolean;
  className?: string;
};
export const MenuItemComponent = ({
  menuItem,
  selected,
  className,
}: MenuItemComponentProps) => {
  const needsDoubling =
    selected && menuItem.type !== "key" && !menuItem.disableDoubling;

  return (
    <>
      {/* first column content (icon thing)... */}
      <BitmapText
        className={twMerge(
          // inline-block is required for flipping with scale to work
          "inline-block col-start-1",
          needsDoubling ? "sprites-double-height" : "",
          //selected ? menu.selectedClassName : "",
          menuItem.type === "back" ? "scale-[-1]" : "",
          className,
        )}
      >
        {selected ? "⏩⏩" : "⁌⁍"}
      </BitmapText>

      {/* second column content (main label thing)... */}
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
          className,
        )}
      >
        {typeof menuItem.label === "string" ?
          <>
            <BitmapText>{menuItem.label}</BitmapText>
          </>
        : <menuItem.label selected={selected} menuItem={menuItem} />}
      </div>
      {/* third column content (values etc) */}
      {menuItem.type === "key" && (
        <MenuItemKeyAssignment
          switchMenuItem={menuItem}
          selected={selected}
          className={className}
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
