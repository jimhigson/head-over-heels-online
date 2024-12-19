import type {
  SwitchSetting,
  ItemInPlayType,
  Disappear,
} from "@/model/ItemInPlay";
import type { PlayableActionState } from "@/model/ItemStateMap";
import type { Direction4Xy } from "@/utils/vectors/vectors";
import type { EmptyObject } from "type-fest";

type PortableItemRenderProps = {
  highlighted: boolean;
};

type PlayableRenderProps = {
  facingXy4: Direction4Xy;
  action: PlayableActionState;
  teleportingPhase: "in" | "out" | null;
};

type ItemRenderPropsMap = {
  portableBlock: PortableItemRenderProps;
  switch: {
    setting: SwitchSetting;
  };
  conveyor: {
    moving: boolean;
  };
  spring: PortableItemRenderProps & {
    compressed: boolean;
  };
  block: {
    disappear: Disappear;
  };
  teleporter: {
    flashing: boolean;
  };

  //deadlyBlock: {style: DeadlyItemStyle;} <--not needed since can't change
  baddie: {
    facingXy4?: Direction4Xy;
    activated: boolean;
    busyLickingDoughnutsOffFace: boolean;
  };
  charles: {
    facingXy4: Direction4Xy;
  };
  head: PlayableRenderProps;
  heels: PlayableRenderProps;
  headOverHeels: PlayableRenderProps;
};

export type ItemRenderProps<T extends ItemInPlayType> =
  T extends keyof ItemRenderPropsMap ? ItemRenderPropsMap[T] : EmptyObject;

export type ItemInPlayTypesWithoutRenderProps = {
  [T in ItemInPlayType]: T extends keyof ItemRenderPropsMap ? never : T;
}[ItemInPlayType];
