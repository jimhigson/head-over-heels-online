import type { Simplify } from "type-fest";
import type { JsonItemType, JsonItemConfig } from "../../model/json/JsonItem";
import type { MonsterWhich } from "../../model/json/MonsterJsonConfig";
import type { BlockStyle } from "../../model/json/utilityJsonConfigTypes";
import { Button } from "../../ui/button";
import { twClass } from "../twClass";
import type { EditorRoomId, EditorRoomItemId } from "../EditorRoomId";
import { store } from "../../store/store";
import {
  selectTool,
  setTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import type { ItemTool } from "../Tool";
import nanoEqual from "nano-equal";
import type {
  DeadlyBlockStyle,
  PortableBlockStyle,
} from "../../model/json/ItemConfigMap";

const itemTypeToButtonIconClasses: Simplify<
  Partial<
    Record<
      | JsonItemType
      | `monster[which=${MonsterWhich}]`
      | `block[style=${BlockStyle}]`
      | `portableBlock[style=${PortableBlockStyle}]`
      | `pushableBlock[style=${PortableBlockStyle}]`
      | `deadlyBlock[style=${DeadlyBlockStyle}]`,
      string
    >
  >
> = twClass({
  door: "sprite texture-door.frame.generic.x.whole",
  ball: "sprite texture-ball",
  teleporter: "sprite texture-teleporter",
  conveyor:
    "sprite texture-conveyor.y.1 [button:hover_&]:texture-animated-conveyor.x",
  lift: "sprite texture-lift.static [button:hover_&]:texture-animated-lift",
  barrier: "sprite texture-barrier.x",
  pickup: "sprite texture-whiteRabbit",
  "portableBlock[style=cube]": "sprite texture-cube",
  "pushableBlock[style=stepStool]": "sprite texture-stepStool",
  "movingPlatform[style=sandwich]": "sprite texture-sandwich",
  charles:
    "sprite texture-charles.towards [button:hover_&]:texture-charles.right",
  joystick: "sprite texture-joystick",
  switch: `sprite texture-switch.left [button:hover_&]:texture-switch.right`,
  spikes: `sprite texture-spikes`,
  "deadlyBlock[style=volcano]":
    "sprite texture-volcano.1 [button:hover_&]:texture-animated-volcano",
  slidingDeadly: `sprite texture-spikyBall.1 [button:hover_&]:texture-spikyBall.2`,
  "monster[which=turtle]":
    "sprite texture-turtle.towards.1 [button:hover_&]:texture-animated-turtle.right",
  "monster[which=dalek]":
    "sprite texture-dalek.1 [button:hover_&]:texture-animated-dalek",
  "monster[which=elephantHead]":
    "sprite texture-elephant.towards [button:hover_&]:texture-elephant.right",
  "monster[which=skiHead]":
    "sprite texture-skiHead.greenAndPink.towards [button:hover_&]:texture-skiHead.greenAndPink.right",
  "monster[which=cyberman]":
    "sprite texture-cyberman.towards [button:hover_&]:texture-cyberman.right",
  "block[style=organic]": `sprite texture-block.organic`,
  "block[style=artificial]": `sprite texture-block.artificial`,
  "block[style=book]": `sprite texture-book.x`,
});

type ItemToolButtonProps<T extends JsonItemType> = {
  itemTool: ItemTool<T>;
};

const getIconClasses = <T extends JsonItemType>(
  itemTool: ItemTool<T>,
): string | undefined => {
  if (itemTool.type === "monster") {
    return itemTypeToButtonIconClasses[
      `monster[which=${(itemTool.config as JsonItemConfig<"monster", EditorRoomId, EditorRoomItemId>).which}]`
    ];
  } else if (
    itemTool.type === "block" ||
    itemTool.type === "portableBlock" ||
    itemTool.type === "deadlyBlock" ||
    itemTool.type === "movingPlatform" ||
    itemTool.type === "pushableBlock"
  ) {
    return itemTypeToButtonIconClasses[
      `${itemTool.type}[style=${(itemTool.config as JsonItemConfig<"block", EditorRoomId, EditorRoomItemId>).style}]`
    ];
  }
  return itemTypeToButtonIconClasses[itemTool.type];
};

export const ItemToolButton = <T extends JsonItemType>({
  itemTool,
}: ItemToolButtonProps<T>) => {
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);

  const iconClasses = getIconClasses(itemTool);

  const isCurrentTool = nanoEqual(
    currentTool?.type === "item" && currentTool.item,
    itemTool,
  );
  return (
    <Button
      className={`flex-1 h-min p-quarter grow-0 ${isCurrentTool ? "bg-pastelBlue" : ""}`}
      onClick={() => store.dispatch(setTool({ type: "item", item: itemTool }))}
    >
      <span
        className={`${iconClasses} relative [button:active_&]:top-oneScaledPix`}
      />
    </Button>
  );
};
