import type { PlanetName } from "@/sprites/planets";
import type { Xyz, Xy } from "@/utils/vectors/vectors";
import { EitherPlayableState, ItemInPlay, FreeItemState, EmptyObject, SwitchSetting } from "./ItemInPlay";
import type { JsonItemConfig } from "./json/JsonItem";


export type ItemStateMap<RoomId extends string> = {
  head: EitherPlayableState<RoomId> & {
    hasHooter: boolean;
    /** how many big jumps we can do */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    donuts: number;
    fastSteps: number;
  };
  heels: EitherPlayableState<RoomId> & {
    hasBag: boolean;
    /** how many big jumps we can do (from picking up a bunny) */
    // TODO: these properties should be recognised
    // by the type system as belonging only to head
    // or heels
    bigJumps: number;
    carrying: ItemInPlay<"portableBlock", PlanetName, RoomId> |
    ItemInPlay<"spring", PlanetName, RoomId> |
    null;
  };
  spring: FreeItemState<RoomId>;
  portableBlock: FreeItemState<RoomId>;
  movableBlock: FreeItemState<RoomId>;
  baddie: FreeItemState<RoomId> & {
    activated: boolean;
    vels: {
      walking: Xyz;
    };
  };
  pickup: FreeItemState<RoomId>;
  aliveFish: FreeItemState<RoomId>;
  lift: {
    direction: "up" | "down";
    vels: {
      lift: Xyz;
    };
  };
  stopAutowalk: EmptyObject;
  conveyor: {
    moving: boolean;
  };
  block: Pick<JsonItemConfig<"block", PlanetName, string>, "disappearing">;
  switch: {
    setting: SwitchSetting;
    /**
     * the frame this switch was last touched on. Frames only switch if they are touched and weren't
     * already touched on the previous frame
     */
    touchedOnProgression: number;
  };
  charles: FreeItemState<RoomId> & {
    // others will follow this soon - facing is changing to a vector
    facing: Xy;
  };
  ball: FreeItemState<RoomId> & {
    vels: {
      rolling: Xyz;
    };
  };
};
