import type {
  SwitchSetting,
  PlayableActionState,
  ItemInPlayType,
} from "@/model/ItemInPlay";
import type { DirectionXy4 } from "@/utils/vectors/vectors";
import type { EmptyObject } from "type-fest";

type ItemRenderPropsMap = {
  portableBlock: {
    carried: boolean;
  };
  switch: {
    setting: SwitchSetting;
  };
  conveyor: {
    moving: boolean;
  };
  spring: {
    compressed: boolean;
  };
  block: {
    disappearing: boolean;
    bubbles: boolean;
  };
  /*book: {
    axis: "x" | "y";
  };*/
  barrier: {
    //axis: "x" | "y";
    bubbles: boolean;
  };
  teleporter: {
    flashing: boolean;
  };
  pickup: {
    bubbles: boolean;
  };
  hushPuppy: {
    bubbles: boolean;
  };
  deadlyBlock: EmptyObject;
  //deadlyBlock: {style: DeadlyItemStyle;} <--not needed since can't change
  baddie: {
    facingXy4?: DirectionXy4;
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
