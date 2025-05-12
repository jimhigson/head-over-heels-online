import type { Simplify } from "type-fest";
import type { JsonItemType, JsonItemConfig } from "../model/json/JsonItem";
import type { MonsterWhich } from "../model/json/MonsterJsonConfig";
import type { BlockStyle } from "../model/json/utilityJsonConfigTypes";
import { Button } from "../ui/button";
import { twClass } from "./twClass";
import type { EditorRoomId, EditorRoomItemId } from "./EditorRoomId.1";

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

type ItemButtonProps<T extends JsonItemType> = {
  type: T;
  config: JsonItemConfig<T, EditorRoomId, EditorRoomItemId>;
};
export const ItemButton = <T extends JsonItemType>(
  props: ItemButtonProps<T>,
) => {
  const iconClasses =
    itemTypeToButtonIconClasses[
      props.type === "monster" ?
        (`monster[which=${(props.config as JsonItemConfig<"monster", EditorRoomId, EditorRoomItemId>).which}]` as const)
      : props.type === "block" ?
        (`block[style=${(props.config as JsonItemConfig<"block", EditorRoomId, EditorRoomItemId>).style}]` as const)
      : props.type
    ];

  return (
    <Button className="flex-1 h-min p-quarter grow-0">
      <span
        className={`${iconClasses} relative [button:active_&]:top-quarter`}
      />
    </Button>
  );
};
