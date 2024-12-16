import type {
  SwitchSetting,
  PlayableActionState,
  ItemInPlayType,
  Disappear,
} from "@/model/ItemInPlay";
import type { DirectionXy4 } from "@/utils/vectors/vectors";
import type { EmptyObject } from "type-fest";

type PortableItemRenderProps = {
  highlighted: boolean;
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
    facingXy4?: DirectionXy4;
    activated: boolean;
    busyLickingDoughnutsOffFace: boolean;
  };
  charles: {
    facingXy4: DirectionXy4;
  };
  head: {
    facingXy4: DirectionXy4;
    action: PlayableActionState;
    teleportingPhase: "in" | "out" | null;
  };
  heels: {
    facingXy4: DirectionXy4;
    action: PlayableActionState;
    teleportingPhase: "in" | "out" | null;
  };
};

export type ItemRenderProps<T extends ItemInPlayType> =
  T extends keyof ItemRenderPropsMap ? ItemRenderPropsMap[T] : EmptyObject;

export type ItemInPlayTypesWithoutRenderProps = {
  [T in ItemInPlayType]: T extends keyof ItemRenderPropsMap ? never : T;
}[ItemInPlayType];
