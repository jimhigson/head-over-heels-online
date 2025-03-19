import type { DirectionXy4 } from "../../utils/vectors/vectors";
import type {
  ActivatedWhenSubset,
  MovementsSubset,
} from "./utilityJsonConfigTypes";

export type MonsterJsonConfig =
  | {
      which: "emperorsGuardian";
      movement: MovementsSubset<"towards-analogue-unless-planet-crowns">;
      activated: ActivatedWhenSubset<"while-player-near">;
    }
  | {
      which: "emperor";
      movement: MovementsSubset<"towards-analogue">;
      activated: ActivatedWhenSubset<"while-player-near">;
    }
  | {
      which: "elephant";
      movement: MovementsSubset<"patrol-randomly-xy4">;
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "elephantHead";
      movement: MovementsSubset<"unmoving">;
      startDirection: DirectionXy4;
      // is always unmoving:
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "computerBot" | "monkey";
      movement: MovementsSubset<
        // moonbase16
        "towards-on-shortest-axis-xy4" | "patrol-randomly-xy4"
      >;
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "bubbleRobot";
      movement: MovementsSubset<"patrol-randomly-xy8">;
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "dalek";
      movement: MovementsSubset<"patrol-randomly-diagonal">;
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "homingBot";
      movement: MovementsSubset<"towards-tripped-on-axis-xy4">;
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "helicopterBug";
      movement: MovementsSubset<"patrol-randomly-xy8">;
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "helicopterBug";
      // blacktooth53market
      movement: MovementsSubset<"towards-analogue">;
      activated: ActivatedWhenSubset<"while-player-near">;
    }
  | {
      which: "turtle";
      movement: MovementsSubset<"clockwise">;
      startDirection: DirectionXy4;
      activated: ActivatedWhenSubset<"on">;
    }
  | {
      which: "cyberman";
      activated: ActivatedWhenSubset<
        // walking around normally
        | "on"
        // can wake up from charging:
        | "after-player-near"
        // charging and does not wake up when approached:
        | "off"
      >;
      movement: MovementsSubset<"towards-on-shortest-axis-xy4">;
      startDirection: DirectionXy4;
    }
  | {
      which: "skiHead";
      activated: ActivatedWhenSubset<"on">;
      movement: MovementsSubset<
        // #bookworld31
        "clockwise" | "back-forth"
      >;
      startDirection: DirectionXy4;
      style: "greenAndPink" | "starsAndStripes";
    };
