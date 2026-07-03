import { type ComponentChildren } from "preact";
import { type PropsWithChildren } from "preact/compat";

import { type JsonItemType } from "../../model/json/JsonItem";
import { store } from "../../store/store";
import { type ShortcutKeys } from "../../ui/useKeyboardShortcut";
import { type ItemTool } from "../RoomEditingArea/interactivity/Tool";
import { setTool } from "../slice/levelEditorSlice";
import { ToolbarButton } from "./buttons/ToolbarButton";
import { useIsCurrentItemTool } from "./useIsCurrentItemTool";

export type ItemToolButtonProps<T extends JsonItemType> = PropsWithChildren<{
  itemTool: ItemTool<T>;
  class?: string;
  shortcutKeys?: ShortcutKeys;
  tooltipContent?: ComponentChildren;
  /** accessible name for the icon-only button */
  ariaLabel: string;
}>;

export const ItemToolButton = <T extends JsonItemType>({
  itemTool,
  children,
  class: className,
  shortcutKeys,
  tooltipContent,
  ariaLabel,
}: ItemToolButtonProps<T>) => {
  const isCurrentTool = useIsCurrentItemTool(itemTool);

  return (
    <ToolbarButton
      isCurrentTool={isCurrentTool}
      class={className}
      ariaLabel={ariaLabel}
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
      shortcutKeys={shortcutKeys}
      tooltipContent={tooltipContent}
    >
      {children}
    </ToolbarButton>
  );
};
