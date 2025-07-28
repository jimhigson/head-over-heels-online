import type { JsonItemType } from "../../model/json/JsonItem";
import { store } from "../../store/store";
import { setTool } from "../slice/levelEditorSlice";
import type { ItemTool } from "../Tool";

import type { PropsWithChildren } from "react";
import type { ShortcutKeys } from "../../ui/useKeyboardShortcut";
import { ToolbarButton } from "./ToolbarButton";
import { useIsCurrentItemTool } from "./useIsCurrentItemTool";

type ItemToolButtonProps<T extends JsonItemType> = {
  itemTool: ItemTool<T>;
  className?: string;
  shortcutKeys?: ShortcutKeys;
};

export const ItemToolButton = <T extends JsonItemType>({
  itemTool,
  children,
  className,
  shortcutKeys,
}: PropsWithChildren<ItemToolButtonProps<T>>) => {
  const isCurrentTool = useIsCurrentItemTool(itemTool);

  return (
    <ToolbarButton
      isCurrentTool={isCurrentTool}
      className={className}
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
      shortcutKeys={shortcutKeys}
    >
      {children}
    </ToolbarButton>
  );
};
