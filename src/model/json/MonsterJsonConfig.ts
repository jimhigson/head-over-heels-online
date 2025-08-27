import type { DirectionXy4 } from "../../utils/vectors/vectors";
import type {
  ActivatedWhenSubset,
  MovementsSubset,
} from "./utilityJsonConfigTypes";

export type CybermanConfig = {
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
};

export type MonsterJsonConfig =
  | {
      which: "bubbleRobot";
      movement: MovementsSubset<"patrol-randomly-xy8">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "computerBot";
      movement: MovementsSubset<
        // moonbase16
        "patrol-randomly-xy4-and-reverse" | "towards-on-shortest-axis-xy4"
      >;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "dalek";
      movement: MovementsSubset<"patrol-randomly-diagonal">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "elephant";
      movement: MovementsSubset<"patrol-randomly-xy4">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "elephantHead";
      movement: MovementsSubset<"turn-to-player">;
      startDirection: DirectionXy4;
      // is always unmoving:
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "emperor";
      movement: MovementsSubset<"towards-analogue">;
      activated: ActivatedWhenSubset<"while-player-near">;
    }
  | {
      which: "emperorsGuardian";
      movement: MovementsSubset<"towards-analogue-unless-planet-crowns">;
      activated: ActivatedWhenSubset<"while-player-near">;
    }
  | {
      which: "helicopterBug";
      // blacktooth53market
      movement: MovementsSubset<"towards-analogue">;
      activated: ActivatedWhenSubset<"while-player-near">;
    }
  | {
      which: "helicopterBug";
      movement: MovementsSubset<"patrol-randomly-xy8">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "homingBot";
      movement: MovementsSubset<"towards-tripped-on-axis-xy4">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "monkey";
      movement: MovementsSubset<
        // moonbase16
        "patrol-randomly-xy4" | "towards-on-shortest-axis-xy4"
      >;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "skiHead";
      activated: ActivatedWhenSubset<"off" | "on">;
      movement: MovementsSubset<
        // #bookworld31
        | "back-forth"
        | "clockwise"
        // remake
        | "forwards"
      >;
      startDirection: DirectionXy4;
      style: "greenAndPink" | "starsAndStripes";
    }
  | {
      which: "turtle";
      movement: MovementsSubset<
        | "back-forth"
        | "clockwise"
        // remake
        | "forwards"
      >;
      startDirection: DirectionXy4;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | CybermanConfig;

export type MonsterWhich = MonsterJsonConfig["which"];
