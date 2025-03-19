import type { EmptyObject } from "type-fest";
import type {
  SwitchSetting,
  Disappear,
  ItemInPlayType,
} from "../../../model/ItemInPlay";
import type { PlayableActionState } from "../../../model/ItemStateMap";
import type {
  DirectionXy4,
  DirectionXy8,
} from "../../../utils/vectors/vectors";

type PortableItemRenderProps = {
  highlighted: boolean;
};

type PlayableRenderProps = {
  facingXy8: DirectionXy8;
  action: PlayableActionState;
  teleportingPhase: "in" | "out" | null;

  highlighted: boolean;
  flashing: boolean;
  shining: boolean;
};

type ItemRenderPropsMap = {
  portableBlock: PortableItemRenderProps;
  sceneryPlayer: PortableItemRenderProps;
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
    activated: boolean;
  };

  //deadlyBlock: {style: DeadlyItemStyle;} <--not needed since can't change
  monster: {
    facingXy4?: DirectionXy4;
    activated: boolean;
    busyLickingDoughnutsOffFace: boolean;
  };
  charles: {
    facingXy4: DirectionXy4;
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
