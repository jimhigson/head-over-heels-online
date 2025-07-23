import type { JsonItemType } from "../../model/json/JsonItem";
import { store } from "../../store/store";
import {
  selectTool,
  setTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import type { ItemTool } from "../Tool";
import nanoEqual from "nano-equal";

import type { PropsWithChildren } from "react";
import type { ShortcutKeys } from "./useKeyboardShortcut";
import { ToolbarButton } from "./ToolbarButton";

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
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);

  const isCurrentTool = nanoEqual(
    currentTool?.type === "item" && currentTool.item,
    itemTool,
  );
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
