import { playableTailwindSpriteClassname } from "../game/components/tailwindSprites/playableTailwindSpriteClassname";
import { type JsonItemUnion } from "../model/json/JsonItem";
import { twClass } from "../utils/twClass" with { type: "macro" };
import { type SceneryName } from "./planets";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "./spritesheet/spritesheetData/TextureTailwindClass";

export const textureForItem = (
  item: JsonItemUnion,
  scenery: SceneryName,
): AnimatedTextureTailwindClass | TextureTailwindClass => {
  switch (item.type) {
    case "block":
      switch (item.config.style) {
        case "organic":
          return item.config.disappearing?.on === "stand" ?
              twClass(`texture-block_organic_disappearing`)
            : twClass(`texture-block_organic`);
        case "artificial":
          return item.config.disappearing?.on === "stand" ?
              twClass(`texture-block_artificial_disappearing`)
            : twClass(`texture-block_artificial`);
        case "book":
          return twClass(`texture-book_d0`);
        case "tower": {
          switch (scenery) {
            case "moonbase":
              return twClass(`texture-tower_moonbase`);
            default:
              return twClass(`texture-tower`);
          }
        }
        default:
          item.config satisfies never;
      }
      break;
    case "barrier":
      switch (item.config.axis) {
        case "x":
          return twClass(`texture-barrier_d0`);
        case "y":
          return twClass(`texture-barrier_d2`);
        default:
          item.config.axis satisfies never;
      }
      break;
    case "pickup":
      switch (item.config.gives) {
        case "bag":
          return twClass(`texture-bag`);
        case "shield":
          return twClass(`texture-whiteRabbit_shield`);
        case "jumps":
          return twClass(`texture-whiteRabbit_jumps`);
        case "extra-life":
          return twClass(`texture-whiteRabbit_extra-life`);
        case "fast":
          return twClass(`texture-whiteRabbit_fast`);
        case "doughnuts":
          return twClass(`texture-doughnuts`);
        case "hooter":
          return twClass(`texture-hooter`);
        case "reincarnation":
          return twClass(`texture-fish_1`);
        case "scroll":
          return twClass(`texture-scroll`);
        case "crown":
          switch (item.config.planet) {
            case "blacktooth":
              return twClass(`texture-crown_blacktooth`);
            case "egyptus":
              return twClass(`texture-crown_egyptus`);
            case "bookworld":
              return twClass(`texture-crown_bookworld`);
            case "penitentiary":
              return twClass(`texture-crown_penitentiary`);
            case "safari":
              return twClass(`texture-crown_safari`);
            default:
              item.config.planet satisfies never;
          }
          break;
        default:
          item.config satisfies never;
      }
      break;
    case "sceneryCrown":
      switch (item.config.planet) {
        case "blacktooth":
          return twClass(`texture-crown_blacktooth`);
        case "egyptus":
          return twClass(`texture-crown_egyptus`);
        case "bookworld":
          return twClass(`texture-crown_bookworld`);
        case "penitentiary":
          return twClass(`texture-crown_penitentiary`);
        case "safari":
          return twClass(`texture-crown_safari`);
        default:
          item.config.planet satisfies never;
      }
      break;
    case "charles":
      return twClass(`texture-charles_d6`);
    case "monster":
      switch (item.config.which) {
        case "dalek":
          return twClass(`texture-dalek_1`);
        case "cyberman":
          return twClass(`texture-cyberman_d6`);
        case "bubbleRobot":
        case "emperor":
          return twClass(`texture-bubbles_cold_2`);
        case "elephant":
        case "elephantHead":
          return twClass(`texture-elephant_d6`);
        case "homingBot":
          return twClass(`texture-headlessBase`);
        case "monkey":
          return twClass(`texture-monkey_d6`);
        case "emperorsGuardian":
          return twClass(`texture-ball`);
        case "turtle":
          return twClass(`texture-turtle_d6_1`);
        case "helicopterBug":
          return twClass(`texture-helicopterBug_1`);
        case "skiHead":
          switch (item.config.style) {
            case "greenAndPink":
              return twClass(`texture-skiHead_greenAndPink_d6`);
            case "starsAndStripes":
              return twClass(`texture-skiHead_starsAndStripes_d6`);
            default:
              item.config.style satisfies never;
          }
          break;
        case "computerBot":
          return twClass(`texture-computerBot_d6`);
        default:
          item.config satisfies never;
      }
      break;
    case "deadlyBlock":
      switch (item.config.style) {
        case "toaster":
          return twClass(`texture-toaster_1`);
        case "volcano":
          return twClass(`texture-volcano_1`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "spikes":
      return twClass(`texture-spikes`);
    case "spring":
      return twClass(`texture-spring_compressed`);
    case "ball":
      return twClass(`texture-ball`);
    case "pushableBlock":
      return twClass(`texture-stepStool`);
    case "movingPlatform":
      return twClass(`texture-sandwich`);
    case "slidingBlock":
      switch (item.config.style) {
        case "book":
          return twClass(`texture-book_d2`);
        case "puck":
          return twClass(`texture-puck`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "portableBlock":
      switch (item.config.style) {
        case "cube":
          return twClass(`texture-cube`);
        case "drum":
          return twClass(`texture-drum`);
        case "sticks":
          return twClass(`texture-sticks`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "moveableDeadly":
      switch (item.config.style) {
        case "deadFish":
          return twClass(`texture-fish_1`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "slidingDeadly":
      switch (item.config.style) {
        case "spikyBall":
          return twClass(`texture-spikyBall_1`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "teleporter":
      return twClass(`texture-teleporter`);
    case "portableTeleporter":
      return twClass(`texture-portableTeleporter`);
    case "lift":
      return twClass(`texture-lift_static`);
    case "hushPuppy":
      return twClass(`texture-hushPuppy`);
    case "joystick":
      return twClass(`texture-joystick_ball`);
    case "switch":
      return twClass(`texture-switch_left`);
    case "conveyor":
      switch (item.config.direction) {
        case "away":
        case "towards":
          return twClass(`texture-conveyor_d2_1`);
        case "left":
        case "right":
          return twClass(`texture-conveyor_d0_1`);
        default:
          item.config satisfies never;
      }
      break;
    case "door":
      switch (item.config.direction) {
        case "away":
        case "towards":
          return twClass(`texture-door_frame_generic_d0_whole`);
        case "left":
        case "right":
          return twClass(`texture-door_frame_generic_d2_whole`);
        default:
          item.config.direction satisfies never;
      }
      break;
    case "player":
      switch (item.config.which) {
        case "head":
        case "headOverHeels":
          return playableTailwindSpriteClassname({
            spritesheetName: "BlockStack" as "BlockStack",
            character: "head",
            action: "idle",
            facingXy8: "towards",
          });
        case "heels":
          return playableTailwindSpriteClassname({
            spritesheetName: "BlockStack" as "BlockStack",
            character: "heels",
            action: "idle",
            facingXy8: "towards",
          });
        default:
          item.config.which satisfies never;
      }
      break;
    case "sceneryPlayer":
      switch (item.config.which) {
        case "head":
        case "headOverHeels":
          return playableTailwindSpriteClassname({
            spritesheetName: "BlockStack" as "BlockStack",
            character: "head",
            action: "idle",
            facingXy8: item.config.startDirection,
          });
        case "heels":
          return playableTailwindSpriteClassname({
            spritesheetName: "BlockStack" as "BlockStack",
            character: "heels",
            action: "idle",
            facingXy8: item.config.startDirection,
          });
        default:
          item.config.which satisfies never;
      }
      break;
    case "firedDoughnut":
      return twClass(`texture-bubbles_taupe_2`);
    case "wall":
      switch (item.config.direction) {
        case "away":
        case "towards":
          switch (scenery) {
            case "blacktooth":
              return twClass(`texture-blacktooth_wall_plain_d2`);
            case "egyptus":
              return twClass(`texture-egyptus_wall_hieroglyphics_d2`);
            case "bookworld":
              return twClass(`texture-bookworld_wall_book_d2`);
            case "penitentiary":
              return twClass(`texture-penitentiary_wall_loop_d2`);
            case "safari":
              return twClass(`texture-safari_wall_wall_d2`);
            case "jail":
              return twClass(`texture-jail_wall_bars_d2`);
            case "market":
              return twClass(`texture-market_wall_fruits_d2`);
            case "moonbase":
              return twClass(`texture-moonbase_dark_wall_window1_d2`);
            default:
              scenery satisfies never;
          }
          break;
        case "left":
        case "right":
          switch (scenery) {
            case "blacktooth":
              return twClass(`texture-blacktooth_wall_plain_d0`);
            case "egyptus":
              return twClass(`texture-egyptus_wall_hieroglyphics_d0`);
            case "bookworld":
              return twClass(`texture-bookworld_wall_book_d0`);
            case "penitentiary":
              return twClass(`texture-penitentiary_wall_loop_d0`);
            case "safari":
              return twClass(`texture-safari_wall_wall_d0`);
            case "jail":
              return twClass(`texture-jail_wall_bars_d0`);
            case "market":
              return twClass(`texture-market_wall_fruits_d0`);
            case "moonbase":
              return twClass(`texture-moonbase_dark_wall_window1_d0`);
            default:
              scenery satisfies never;
          }
          break;
        default:
          item.config.direction satisfies never;
      }
      break;
    case "floor":
      switch (item.config.floorType) {
        case "standable":
          switch (item.config.scenery) {
            case "blacktooth":
              return twClass(`texture-blacktooth_floor`);
            case "egyptus":
              return twClass(`texture-egyptus_floor`);
            case "bookworld":
              return twClass(`texture-bookworld_floor`);
            case "penitentiary":
              return twClass(`texture-penitentiary_floor`);
            case "safari":
              return twClass(`texture-safari_floor`);
            case "jail":
              return twClass(`texture-jail_floor`);
            case "market":
              return twClass(`texture-market_floor`);
            case "moonbase":
              return twClass(`texture-moonbase_floor`);
            default:
              item.config.scenery satisfies never;
          }
          break;
        case "deadly":
          return twClass("texture-generic_floor_deadly");
        case "none":
          return twClass("texture-blank");
      }

      return twClass(`texture-blacktooth_floor`);
    case "bubbles":
      return twClass(`texture-bubbles_white_1`);
    case "emitter":
    case "timer":
      // these have no sprite of their own - they are shown as a font-text glyph
      // (see itemGlyph) where the DOM context allows text, and blank otherwise:
      return twClass("texture-blank");
    case "button":
      return twClass("texture-buttonInGame");
    case "lamp":
      switch (item.config.direction) {
        case "left":
          return (item.config.activated ?? true) ?
              twClass("texture-lamp_on_d0")
            : twClass("texture-lamp_off_d0");
        case "away":
          return (item.config.activated ?? true) ?
              twClass("texture-lamp_on_d2")
            : twClass("texture-lamp_off_d2");
        case "towards":
          return (item.config.activated ?? true) ?
              twClass("texture-lamp_on_d6")
            : twClass("texture-lamp_off_d6");
        case "right":
          return (item.config.activated ?? true) ?
              twClass("texture-lamp_on_d4")
            : twClass("texture-lamp_off_d4");
        default:
          item.config.direction satisfies never;
      }
      break;
    case "mirror":
      switch (item.config.orientation) {
        // at the base camera angle awayLeft shows edge-on (d1), awayRight
        // face-on (d3):
        case "awayLeft":
          return twClass("texture-mirror_d1");
        case "awayRight":
          return twClass("texture-mirror_d3");
        default:
          item.config.orientation satisfies never;
      }
      break;
    case "floatingText":
      // shown as a font-text glyph (see itemGlyph) where text is allowed:
      return twClass("texture-blank");
    default:
      item satisfies never;
      return twClass("texture-blank");
  }
  throw new Error("by the types, this shouldn't be possible");
};

/**
 * The single-character glyph shown for items that have no sprite of their own
 * (emitter, timer, floating-text). Rendered as font text by DOM consumers;
 * `undefined` means the item has a real sprite ({@link textureForItem}).
 */
export const itemGlyph = (item: JsonItemUnion): string | undefined => {
  switch (item.type) {
    case "emitter":
      return "E";
    case "timer":
      return "T";
    case "floatingText":
      return "t";
    default:
      return undefined;
  }
};
