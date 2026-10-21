import { type ComponentChildren, type VNode } from "preact";

import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { cn } from "../cn";
import { CommandItem } from "../command/CommandItem";
import { CurrentMarker } from "../CurrentMarker";
import { ShortcutUnderlinedLabel } from "../ShortcutUnderlinedLabel";
import { type ShortcutKeys } from "../useKeyboardShortcut";
import { MenuItemIconSpace } from "./MenuItemIconSpace";
import { shortcutHint } from "./shortcutHint";

export type MenuItemProps = {
  /** what the item says, and its value for keyboard navigation */
  label: string;
  onSelect: () => void;
  /** the keys that do the same thing outside the menu */
  shortcutKeys?: ShortcutKeys;
  /** shows the item as a ticked option, on or off */
  checked?: boolean;
  disabled?: boolean;
  /**
   * a control shown in the item, eg a switch for the setting it changes -
   * clicks on it go to the control rather than selecting the item
   */
  control?: ComponentChildren;
  /** choosing the item leaves its menu open, eg to see a setting change */
  keepsMenuOpen?: boolean;
  /** for the label */
  class?: string;
  /**
   * shown before the label, eg the toolbar button's icon: a sprite's texture,
   * or any content
   */
  icon?: TextureTailwindClass | VNode;
};

/** one entry in a menu bar's menu */
export const MenuItem = ({
  label,
  onSelect,
  shortcutKeys,
  checked,
  disabled = false,
  control,
  keepsMenuOpen = false,
  class: className,
  icon,
}: MenuItemProps) => (
  <CommandItem
    value={label}
    onSelect={() => {
      if (!disabled) {
        onSelect();
      }
    }}
    data-disabled={disabled ? "true" : "false"}
    data-keeps-menu-open={keepsMenuOpen ? "true" : "false"}
    class="group px-1 gap-2 justify-between data-[disabled=true]:!text-pastelBlue data-[disabled=true]:opacity-100"
  >
    <span class="flex items-center gap-1">
      <MenuItemIconSpace>
        {typeof icon === "string" ?
          <span
            class={`sprite ${icon} group-data-[disabled=true]:sprite-revert-to-two-tone-dim`}
          />
        : icon}
      </MenuItemIconSpace>
      <span class={cn("text-single-line whitespace-nowrap", className)}>
        {checked !== undefined && <CurrentMarker isCurrent={checked} />}
        <ShortcutUnderlinedLabel text={label} shortcutKeys={shortcutKeys} />
      </span>
    </span>
    {control !== undefined && (
      <span
        class="ml-auto"
        onClick={(mouseEvent) => mouseEvent.stopPropagation()}
      >
        {control}
      </span>
    )}
    {shortcutKeys !== undefined && (
      <span class="text-single-line whitespace-nowrap text-highlightBeige group-data-[disabled=true]:text-pastelBlue">
        {shortcutHint(shortcutKeys)}
      </span>
    )}
  </CommandItem>
);
