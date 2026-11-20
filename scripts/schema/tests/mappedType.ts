/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EmptyObject } from "type-fest";

type ItemTypes = "door" | "floor" | "wall";
type ItemUnion = {
  [K in ItemTypes]: {
    type: K;
    position: { x: number; y: number };
    config: K extends "door" ? { toRoom: string } : EmptyObject;
  };
}[ItemTypes];
