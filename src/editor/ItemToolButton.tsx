import type { Simplify } from "type-fest";
import type { JsonItemType, JsonItemConfig } from "../model/json/JsonItem";
import type { MonsterWhich } from "../model/json/MonsterJsonConfig";
import type { BlockStyle } from "../model/json/utilityJsonConfigTypes";
import { Button } from "../ui/button";
import { twClass } from "./twClass";
import type { EditorRoomId, EditorRoomItemId } from "./EditorRoomId";
import { store } from "../store/store";
import { setTool } from "./slice/levelEditorSlice";
import type { ItemTool } from "./Tool";

const itemTypeToButtonIconClasses: Simplify<
  Partial<
    Record<
      | JsonItemType
      | `monster[which=${MonsterWhich}]`
      | `block[style=${BlockStyle}]`,
      string
    >
  >
> = twClass({
  door: "sprite texture-door.frame.generic.x.whole",
  ball: "sprite texture-ball",
  charles:
    "sprite texture-charles.towards [button:hover_&]:texture-charles.right",
  switch: `sprite texture-switch.left [button:hover_&]:texture-switch.right`,
  "monster[which=turtle]":
    "sprite texture-turtle.towards.1 [button:hover_&]:texture-animated-turtle.right",
  "monster[which=dalek]":
    "sprite texture-dalek.1 [button:hover_&]:texture-animated-dalek",
  "monster[which=elephantHead]":
    "sprite texture-elephant.towards [button:hover_&]:texture-elephant.right",
  "monster[which=skiHead]":
    "sprite texture-skiHead.greenAndPink.towards [button:hover_&]:texture-skiHead.greenAndPink.right",
  "block[style=organic]": `sprite texture-block.organic`,
  "block[style=artificial]": `sprite texture-block.artificial`,
  "block[style=book]": `sprite texture-book.x`,
});

type ItemToolButtonProps<T extends JsonItemType> = {
  itemTool: ItemTool<T>;
};

export const ItemToolButton = <T extends JsonItemType>({
  itemTool,
}: ItemToolButtonProps<T>) => {
  const iconClasses =
    itemTypeToButtonIconClasses[
      itemTool.type === "monster" ?
        (`monster[which=${(itemTool.config as JsonItemConfig<"monster", EditorRoomId, EditorRoomItemId>).which}]` as const)
      : itemTool.type === "block" ?
        (`block[style=${(itemTool.config as JsonItemConfig<"block", EditorRoomId, EditorRoomItemId>).style}]` as const)
      : itemTool.type
    ];

  return (
    <Button
      className="flex-1 h-min p-quarter grow-0"
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
    >
      <span
        className={`${iconClasses} relative [button:active_&]:top-quarter`}
      />
    </Button>
  );
};
