import { CompassDirections, CompassDirectionsNESW } from "./readToJson";

export type Xml2JsonItem = {
  x: string;
  y: string;
  z: string;
} & (
  | {
      kind: `${string}-door-${string}`;
      class: "door";
      where: CompassDirections;
    }
  | {
      kind:
        | "teleport"
        | "teleport-too"
        | "brick1"
        | "brick2"
        | "vulcano" /* sic */
        | "toaster"
        | "spikes"
        | "puppy"
        | "book";
      class: "griditem";
    }
  | {
      kind:
        | "bars-ns"
        | "bars-ew"
        | "extra-life"
        | "high-jumps"
        | "quick-steps"
        | "shield"
        | "donuts"
        | "handbag"
        | "reincarnation-fish"
        | "mortal-fish"
        | "trampoline"
        | "horn"
        | "cylinder" // the tower - how is this "free"?
        | "siren" // daleks!
        | "remote-control" //joystick
        | "stool" // anvil
        | "bomb"
        | "another-portable-brick"
        | "drum"
        | "charles-robot"
        | "switch"
        | "helicopter-bug"
        | "ball"
        | "cap"
        | "imperial-guard"
        | "monkey"
        | "elephant"
        | "sandwich";
      class: "freeitem";
    }
  | {
      kind: "conveyor";
      orientation: CompassDirectionsNESW;
      class: "griditem";
    }
  | {
      kind: "elevator";
      top: string;
      bottom: string;
      class: "freeitem";
    }
  | {
      kind: "imperial-guard-head" | "diver" | "book";
      orientation: CompassDirectionsNESW;
      class: "freeitem";
    }
);
