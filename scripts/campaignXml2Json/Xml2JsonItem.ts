import type { CompassDirections, CompassDirectionsNESW } from "./readToJson";

// just the behavio(u)rs that we care to parse
type Behavior =
  | "behavior of disappearance on jump into"
  | "behavior of disappearance on touch";

export type Xml2JsonItem = {
  x: string;
  y: string;
  z: string;
  behavior?: Behavior;
} & (
  | {
      kind: `${string}-door-${CompassDirectionsNESW}`;
      class: "door";
      where: CompassDirections;
    }
  //| Xml2JsonWallItem having this in the union this messes up discriminated unions since
  // there's nothing good to discriminate on
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
        | "portable-brick"
        | "another-portable-brick"
        | "ball"
        | "bars-ew"
        | "bars-ns"
        | "bomb"
        | "cap"
        | "charles-robot"
        | "cylinder" // the tower - how is this "free"?
        | "donuts"
        | "drum"
        | "elephant"
        | "elephant-head"
        | "extra-life"
        | "handbag"
        | "helicopter-bug"
        | "high-jumps"
        | "horn"
        | "imperial-guard"
        | "monkey"
        | "mortal-fish"
        | "quick-steps"
        | "crown"
        | "reincarnation-fish"
        | "remote-control" //joystick
        | "sandwich"
        | "shield"
        | "siren" // daleks!
        | "stool" // anvil
        | "switch"
        | "throne-guard"
        | "bubble-robot"
        | "bighead-robot"
        | "trampoline"
        | "mortal-cap";
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
      kind: "imperial-guard-head" | "diver" | "turtle" | "book";
      orientation: CompassDirectionsNESW;
      class: "freeitem";
    }
);
