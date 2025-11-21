import type { PropsWithChildren, ReactNode } from "react";

import type { JsonItemType } from "../../model/json/JsonItem";
import type { ShortcutKeys } from "../../ui/useKeyboardShortcut";
import type { ItemTool } from "../RoomEditingArea/interactivity/Tool";

import { store } from "../../store/store";
import { setTool } from "../slice/levelEditorSlice";
import { ToolbarButton } from "./buttons/ToolbarButton";
import { useIsCurrentItemTool } from "./useIsCurrentItemTool";

type ItemToolButtonProps<T extends JsonItemType> = {
  itemTool: ItemTool<T>;
  className?: string;
  shortcutKeys?: ShortcutKeys;
  tooltipContent?: ReactNode;
};

export const ItemToolButton = <T extends JsonItemType>({
  itemTool,
  children,
  className,
  shortcutKeys,
  tooltipContent,
}: PropsWithChildren<ItemToolButtonProps<T>>) => {
  const isCurrentTool = useIsCurrentItemTool(itemTool);

  return (
    <ToolbarButton
      isCurrentTool={isCurrentTool}
      className={className}
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
      shortcutKeys={shortcutKeys}
      tooltipContent={tooltipContent}
    >
      {children}
    </ToolbarButton>
  );
};
