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

// want to fit into the block grid with an outline, so 3blocks minus one (scales) pixel
const buttonSizeClassNames =
  "h-[calc(3*var(--block)-1px*var(--scale))] w-[calc(3*var(--block)-1px*var(--scale))]";

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
      data-iscurrenttool={isCurrentTool}
      className={`active:pt-oneScaledPix ${buttonSizeClassNames} gap-0 inline-flex overflow-hidden ${isCurrentTool ? "bg-pastelBlue" : ""} ${className ?? ""}`}
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
    >
      {children}
    </Button>
  );
};
