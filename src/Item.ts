import { Direction, Xyz } from "./modelTypes";

export type Teleporter = {
  type: "teleporter";
  toRoom: string;
  position: Xyz;
};

export type Barrier = {
  type: "barrier";
  alongAxis: "x" | "y";
  position: Xyz;
};

export type Block = {
  type: "block";
  style: "organic" | "artificial";
  position: Xyz;
};

export type DeadlyBlock = {
  type: "deadly-block";
  style: "volcano" | "toaster";
  position: Xyz;
};

export type Conveyor = {
  type: "conveyor";
  direction: Direction;
  position: Xyz;
};

export type Pickup = {
  type: "pickup";
  gives: "extra-life" | "donuts" | "bag" | "hooter";
  position: Xyz;
};

export type Fish = {
  type: "fish";
  alive: boolean;
  position: Xyz;
};

export type Spring = {
  type: "spring";
  position: Xyz;
};

export type Item =
  | Teleporter
  | Barrier
  | Block
  | DeadlyBlock
  | Conveyor
  | Pickup
  | Fish
  | Spring;
