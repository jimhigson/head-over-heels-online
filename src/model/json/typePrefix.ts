import { type ItemInPlayType } from "../ItemInPlay";
import { type CharacterName } from "../modelTypes";
import { type JsonItemType } from "./JsonItem";

/**
 * Short (1–2 char) prefix for each item type, used to build compact item
 * ids like `w`, `w1`, `w2` for walls. Auto-converted rooms and editor-added
 * items share this table so ids look consistent across both sources.
 */
export const typePrefix = {
  ball: "bl",
  barrier: "br",
  block: "b",
  blocker: "bl",
  bubbles: "bb",
  button: "bu",
  charles: "ch",
  conveyor: "co",
  deadlyBlock: "db",
  door: "d",
  doorFrame: "df",
  doorLegs: "dl",
  emitter: "e",
  firedDoughnut: "fd",
  floatingText: "ft",
  floor: "f",
  hushPuppy: "h",
  joystick: "j",
  lamp: "la",
  lift: "l",
  lightBeam: "lb",
  mirror: "mr",
  monster: "m",
  moveableDeadly: "md",
  movingPlatform: "mp",
  outOfBounds: "oo",
  particle: "pa",
  pickup: "pi",
  player: "pl",
  portableBlock: "pr",
  portableTeleporter: "pt",
  portal: "po",
  pushableBlock: "pu",
  sceneryCrown: "sc",
  sceneryPlayer: "sp",
  slidingBlock: "sb",
  slidingDeadly: "sd",
  soundEffect: "se",
  spikes: "sk",
  spring: "sg",
  stopAutowalk: "sa",
  switch: "sw",
  teleporter: "t",
  timer: "ti",
  wall: "w",
} as const satisfies Record<
  Exclude<ItemInPlayType, CharacterName> | JsonItemType,
  string
>;
