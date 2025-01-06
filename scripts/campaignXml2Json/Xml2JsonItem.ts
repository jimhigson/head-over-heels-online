import type { CompassDirections, CompassDirectionsNESW } from "./readToJson";
import type { Subset } from "../../src/utils/subset";

// just the behavio(u)rs that we care to parse
export type DisappearingBehavior =
  | "behavior of disappearance on jump into"
  | "behavior of disappearance on touch";

export type XmlItemBaddieBehaviour =
  | "behavior of random patroling in four primary directions" // [sic]
  | "behavior of random patroling in four secondary directions" // [sic]
  | "behavior of random patroling in eight directions" // [sic]
  | "behavior of hunter in four directions"
  | "behavior of waiting hunter in eight directions"
  | "behavior of waiting hunter in four directions"
  | "behavior of detector"
  | "behavior of move then turn left and move"
  | "behavior of there and back";

export type Xml2JsonItem = {
  x: string;
  y: string;
  z: string;
} & (
  | {
      kind: `${string}-door-${CompassDirectionsNESW}`;
      class: "door";
      where: CompassDirections;
    }
  //| Xml2JsonWallItem having this in the union this messes up discriminated unions since
  // there's nothing good to discriminate on
  | {
      kind: "brick1" | "brick2";
      class: "griditem";
      behavior?: DisappearingBehavior;
    }
  | {
      kind:
        | "teleport"
        | "teleport-too"
        | "vulcano" /* [sic] */
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
        | "cap"
        | "charles-robot"
        | "cylinder" // the tower - how is this "free"?
        | "donuts"
        | "drum"
        | "extra-life"
        | "handbag"
        | "high-jumps"
        | "horn" // hooter
        | "mortal-fish"
        | "quick-steps"
        | "crown"
        | "reincarnation-fish"
        | "remote-control" //joystick
        | "shield"
        | "switch"
        | "trampoline"
        | "mortal-cap";
      class: "freeitem";
    }
  | {
      kind: "sandwich" | "stool"; // anvil/step-stool
      class: "freeitem";
      orientation?: CompassDirectionsNESW;
      behavior:
        | "behavior of thing able to move by pushing"
        | "behavior of flying there and back"
        | "behavior of move then turn right and move";
    }
  | {
      kind: "bars-ew" | "bars-ns";
      behavior: "behavior of disappearance on touch";
      class: "freeitem"; // why is this free?
    }
  | {
      kind: "bighead-robot" | "monkey";
      class: "freeitem";
      behavior: Subset<
        XmlItemBaddieBehaviour,
        | "behavior of hunter in four directions"
        | "behavior of random patroling in four primary directions"
      >;
    }
  | {
      kind: "emperor" | "throne-guard";
      class: "freeitem";
      behavior: Subset<
        XmlItemBaddieBehaviour,
        "behavior of waiting hunter in eight directions"
      >;
    }
  | {
      kind:
        | "bomb"
        | "bubble-robot"
        | "elephant-head"
        | "elephant"
        | "helicopter-bug"
        | "imperial-guard"
        | "siren"; // daleks!
      class: "freeitem";
      behavior: XmlItemBaddieBehaviour;
    }
  | {
      kind: "imperial-guard-head" | "diver" | "turtle" | "book";
      class: "freeitem";
      behavior: XmlItemBaddieBehaviour;
      orientation: CompassDirectionsNESW;
    }
  | {
      kind: "conveyor";
      orientation: CompassDirectionsNESW;
      class: "griditem";
      // one room has a conveyor with a disappearing behavior
      behavior?: "behavior of disappearance on jump into";
    }
  | {
      kind: "elevator";
      top: string;
      bottom: string;
      class: "freeitem";
    }
  | {
      kind: "head" | "heels" | "headoverheels";
      top: string;
      bottom: string;
      class: "freeitem";
    }
);
