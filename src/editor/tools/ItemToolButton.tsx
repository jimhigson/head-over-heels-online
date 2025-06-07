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
};

export const ItemToolButton = <T extends JsonItemType>({
  itemTool,
  children,
}: PropsWithChildren<ItemToolButtonProps<T>>) => {
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);

  const isCurrentTool = nanoEqual(
    currentTool?.type === "item" && currentTool.item,
    itemTool,
  );
  return (
    <Button
      className={`flex-1 h-min p-quarter grow-0 ${isCurrentTool ? "bg-pastelBlue" : ""}`}
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
    >
      {children}
    </Button>
  );
};
