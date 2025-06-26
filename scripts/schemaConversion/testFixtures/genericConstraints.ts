/* eslint-disable @typescript-eslint/no-unused-vars */
type ItemConfigMap<RoomId extends string, RoomItemId extends string> = {
  door: {
    toRoom: RoomId;
    direction: string;
  };
  switch: {
    controls: RoomItemId[];
    type: "local" | "global";
  };
};

// With specific type parameters
type SpecificConfig = ItemConfigMap<"room1" | "room2", "item1" | "item2">;
type DoorConfig = SpecificConfig["door"];
type SwitchConfig = SpecificConfig["switch"];
