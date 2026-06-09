import { type DirectionXy4 } from "../../utils/vectors/vectors";
import {
  type ActivatedWhenSubset,
  type JsonMovement,
} from "./utilityJsonConfigTypes";

/**
 * the movements each monster is allowed - the single source of truth, from which
 * the per-monster `movement` types below are derived (rather than duplicating the
 * lists in both the types and runtime code)
 */
export const monsterMovements = {
  bubbleRobot: ["patrol-randomly-xy8"],
  computerBot: [
    // moonbase16
    "patrol-randomly-xy4-and-reverse",
    "towards-on-shortest-axis-xy4",
  ],
  dalek: ["patrol-randomly-diagonal"],
  elephant: ["patrol-randomly-xy4"],
  elephantHead: ["turn-to-player"],
  emperor: ["towards-analogue"],
  emperorsGuardian: ["towards-analogue-unless-planet-crowns"],
  helicopterBug: [
    // blacktooth53market
    "towards-analogue",
    "patrol-randomly-xy8",
  ],
  homingBot: ["towards-tripped-on-axis-xy4"],
  monkey: [
    // moonbase16
    "patrol-randomly-xy4",
    "towards-on-shortest-axis-xy4",
  ],
  skiHead: [
    // #bookworld31
    "back-forth",
    "clockwise",
    // remake
    "forwards",
  ],
  turtle: [
    "back-forth",
    "clockwise",
    // remake
    "anticlockwise",
    "forwards",
  ],
  cyberman: ["towards-on-shortest-axis-xy4"],
} as const satisfies Record<string, readonly JsonMovement[]>;

export type MonsterWhich = keyof typeof monsterMovements;

/** the movements valid for a given monster */
export type MonsterMovement<W extends MonsterWhich> =
  (typeof monsterMovements)[W][number];

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
  movement: MonsterMovement<"cyberman">;
  startDirection: DirectionXy4;
};

export type MonsterJsonConfig =
  | {
      which: "bubbleRobot";
      movement: MonsterMovement<"bubbleRobot">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "computerBot";
      movement: MonsterMovement<"computerBot">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "dalek";
      movement: MonsterMovement<"dalek">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "elephant";
      movement: MonsterMovement<"elephant">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "elephantHead";
      movement: MonsterMovement<"elephantHead">;
      startDirection: DirectionXy4;
      // is always unmoving:
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "emperor";
      movement: MonsterMovement<"emperor">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "emperorsGuardian";
      movement: MonsterMovement<"emperorsGuardian">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "helicopterBug";
      movement: MonsterMovement<"helicopterBug">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "homingBot";
      movement: MonsterMovement<"homingBot">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "monkey";
      movement: MonsterMovement<"monkey">;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | {
      which: "skiHead";
      activated: ActivatedWhenSubset<"off" | "on">;
      movement: MonsterMovement<"skiHead">;
      startDirection: DirectionXy4;
      style: "greenAndPink" | "starsAndStripes";
    }
  | {
      which: "turtle";
      movement: MonsterMovement<"turtle">;
      startDirection: DirectionXy4;
      activated: ActivatedWhenSubset<"off" | "on">;
    }
  | CybermanConfig;
