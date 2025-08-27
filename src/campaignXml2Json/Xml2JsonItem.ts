import type { Subset } from "../utils/subset";
import type { CompassDirections, CompassDirectionsNESW } from "./readToJson";

// just the behavio(u)rs that we care to parse
export type DisappearingBehavior =
  | "behavior of disappearance as soon as Head appears"
  | "slowly vanishing when some free dude is above"
  | "vanishing on contact"
  | "vanishing when some free dude is above";

export type XmlItemMonsterBehaviour =
  | "behavior of detector"
  | "behavior of hunter in four directions"
  | "behavior of move then turn left and move"
  | "behavior of random patroling in eight directions" // [sic]
  | "behavior of random patroling in four primary directions" // [sic]
  | "behavior of random patroling in four secondary directions" // [sic]
  | "behavior of there and back"
  | "behavior of waiting hunter in eight directions"
  | "behavior of waiting hunter in four directions";

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
      kind: "bars-ew" | "bars-ns";
      behavior: "vanishing on contact";
      class: "freeitem"; // why is this free?
    }
  | {
      kind: "bighead-robot" | "monkey";
      class: "freeitem";
      behavior: Subset<
        XmlItemMonsterBehaviour,
        | "behavior of hunter in four directions"
        | "behavior of random patroling in four primary directions"
      >;
    }
  | {
      kind: "book";
      class: "freeitem";
      behavior?: "behavior of thing able to move by pushing";
    }
  | {
      kind: "book";
      class: "griItem";
      behavior?: "vanishing when some free dude is above";
    }
  | {
      kind: "brick1" | "brick2";
      class: "griditem";
      behavior?: DisappearingBehavior;
    }
  | {
      kind: "conveyor";
      orientation: CompassDirectionsNESW;
      class: "griditem";
      // one room has a conveyor with a disappearing behavior (bookworld|byblos)2
      behavior?:
        | "behavior of conveyor"
        | "vanishing when some free dude is above";
    }
  | {
      kind: "diver" | "imperial-guard-head" | "turtle";
      class: "freeitem";
      behavior: XmlItemMonsterBehaviour;
      orientation: CompassDirectionsNESW;
    }
  | {
      kind: "elephant-head";
      class: "freeitem";
      orientation: CompassDirectionsNESW;
    }
  | {
      kind: "elevator";
      top: string;
      bottom: string;
      class: "freeitem";
      ascent?: string;
      ascending?: string;
      behavior?: "behavior of elevator";
    }
  | {
      kind: "emperor" | "throne-guard";
      class: "freeitem";
      behavior: Subset<
        XmlItemMonsterBehaviour,
        "behavior of waiting hunter in eight directions"
      >;
    }
  | {
      kind: "head" | "headoverheels" | "heels";
      orientation: CompassDirectionsNESW;
      top: string;
      bottom: string;
      class: "freeitem";
    }
  | {
      kind: "sandwich" | "stool";
      class: "freeitem";
      orientation?: CompassDirectionsNESW;
      behavior:
        | "behavior of flying there and back"
        | "behavior of move then turn right and move"
        | "behavior of there and back"
        | "behavior of thing able to move by pushing"
        // undefined in safari37crown and finalRoom
        | undefined;
    }
  | {
      kind:
        | "another-portable-brick"
        | "ball"
        | "big-jumps"
        | "cap"
        | "charles-robot"
        | "crown"
        | "cylinder" // the tower - how is this "free"?
        | "donuts"
        | "drum"
        | "extra-life"
        | "handbag"
        | "horn" // hooter
        | "mortal-cap"
        | "mortal-fish"
        | "portable-brick"
        | "quick-steps"
        | "reincarnation-fish"
        | "remote-control" //joystick
        | "shield"
        | "spring-stool"
        | "switch";
      class: "freeitem";
    }
  | {
      kind:
        | "bomb"
        | "bubble-robot"
        | "elephant"
        | "helicopter-bug"
        | "imperial-guard"
        | "siren"; // daleks!
      class: "freeitem";
      behavior: XmlItemMonsterBehaviour;
    }
  | {
      kind:
        | "puppy"
        | "spikes"
        | "teleport-too"
        | "teleport"
        | "toaster"
        | "vulcano" /* [sic] */;
      class: "griditem";
    }
);
