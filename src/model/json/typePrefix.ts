import type { JsonItemType } from "./JsonItem";

/**
 * Short (1–2 char) prefix for each item type, used to build compact item
 * ids like `w`, `w1`, `w2` for walls. Auto-converted rooms and editor-added
 * items share this table so ids look consistent across both sources.
 */
export const typePrefix: Record<JsonItemType, string> = {
  ball: "bl",
  barrier: "br",
  block: "b",
  bubbles: "bb",
  button: "bu",
  charles: "ch",
  conveyor: "co",
  deadlyBlock: "db",
  door: "d",
  emitter: "e",
  firedDoughnut: "fd",
  floor: "f",
  hushPuppy: "h",
  joystick: "j",
  lift: "l",
  monster: "m",
  moveableDeadly: "md",
  movingPlatform: "mp",
  pickup: "pi",
  player: "pl",
  portableBlock: "pr",
  portableTeleporter: "pt",
  pushableBlock: "pu",
  sceneryCrown: "sc",
  sceneryPlayer: "sp",
  slidingBlock: "sb",
  slidingDeadly: "sd",
  spikes: "sk",
  spring: "sg",
  switch: "sw",
  teleporter: "t",
  wall: "w",
};
