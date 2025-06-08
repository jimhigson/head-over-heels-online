import type { JsonItemType } from "../../model/json/JsonItem";
import { Button } from "../../ui/button";
import { store } from "../../store/store";
import {
  selectTool,
  setTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import type { ItemTool } from "../Tool";
import nanoEqual from "nano-equal";

import type { PropsWithChildren } from "react";

type ItemToolButtonProps<T extends JsonItemType> = {
  itemTool: ItemTool<T>;
  className?: string;
};

export const ItemToolButton = <T extends JsonItemType>({
  itemTool,
  children,
  className,
}: PropsWithChildren<ItemToolButtonProps<T>>) => {
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);

  const isCurrentTool = nanoEqual(
    currentTool?.type === "item" && currentTool.item,
    itemTool,
  );
  return (
    <Button
      data-isCurrentTool={isCurrentTool}
      className={`active:pt-oneScaledPix h-3 w-3 gap-0 inline-flex overflow-hidden ${isCurrentTool ? "bg-pastelBlue" : ""} ${className ?? ""}`}
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
    >
      {children}
    </Button>
  );
};
