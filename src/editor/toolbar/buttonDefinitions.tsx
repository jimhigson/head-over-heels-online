import type { JsonItemType } from "../../model/json/JsonItem";
import type {
  AnimatedTextureTailwindClass,
  TextureTailwindClass,
} from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import type { EditorRoomItemId } from "../editorTypes";
import type { LevelEditorState } from "../slice/levelEditorSlice";
import type { ItemToolButtonProps } from "./ItemToolButton";

import { playableTailwindSpriteClassname } from "../../game/components/tailwindSprites/PlayableTailwindSprite";
import { emptyArray, emptyObject } from "../../utils/empty";
import { selectCurrentEditingRoomJson } from "../slice/levelEditorSlice";
import { rotatingSceneryTiles } from "../slice/rotatingSceneryTiles";
import { twClass } from "../twClass";
import {
  DissapearingItemToolbarIcon,
  LabelledToolbarIcon,
  StackedToolbarIcons,
} from "./buttons/ToolbarButtonContentPatterns";
import { buttonSpriteRevertColourClasses } from "./buttonSizeClassNames";

export const buttonDefinitions = {
  "block.organic": {
    itemTool: {
      type: "block",
      config: { style: "organic" },
    },
    shortcutKeys: ["B"],
    tooltipContent: `## Block
The basic block`,
    children: (
      <span
        className={`sprite ${"texture-block_organic" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.organic.disappearing": {
    itemTool: {
      type: "block",
      config: { style: "organic", disappearing: { on: "stand" } },
    },
    shortcutKeys: ["⇧B"],
    tooltipContent: `## Block
Disappearing basic block`,
    children: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass(
          "texture-block_organic_disappearing" satisfies TextureTailwindClass,
        )}
      />
    ),
  },
  "block.artificial": {
    itemTool: { type: "block", config: { style: "artificial" } },
    shortcutKeys: ["⌥B"],
    tooltipContent: `## Block
Basic block with a metallic look`,
    children: (
      <span
        className={`sprite ${"texture-block_artificial" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.artificial.disappearing": {
    itemTool: {
      type: "block",
      config: { style: "artificial", disappearing: { on: "stand" } },
    },
    shortcutKeys: ["⌥⇧B"],
    tooltipContent: `## Block
Disappearing metallic look block`,
    children: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass(
          "texture-block_artificial_disappearing" satisfies TextureTailwindClass,
        )}
      />
    ),
  },
  "block.tower": {
    itemTool: { type: "block", config: { style: "tower" } },
    shortcutKeys: ["T"],
    tooltipContent: `## Tower
Very high block`,
    children: (
      <span
        className={`sprite ${"texture-tower" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.book": {
    itemTool: { type: "block", config: { style: "book" } },
    children: (
      <span
        className={`sprite ${"texture-book_x" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.x": {
    itemTool: { type: "barrier", config: { axis: "x" } },
    children: (
      <span
        className={`sprite ${"texture-barrier_x" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.y": {
    itemTool: { type: "barrier", config: { axis: "y" } },
    children: (
      <span
        className={`sprite ${"texture-barrier_y" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.x.disappearing": {
    itemTool: {
      type: "barrier",
      config: { axis: "x", disappearing: { on: "touch" } },
    },
    children: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass(
          "texture-barrier_x" satisfies TextureTailwindClass,
        )}
      />
    ),
  },
  "barrier.y.disappearing": {
    itemTool: {
      type: "barrier",
      config: { axis: "y", disappearing: { on: "touch" } },
    },
    children: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass(
          "texture-barrier_y" satisfies TextureTailwindClass,
        )}
      />
    ),
  },
  "monster.dalek": {
    itemTool: {
      type: "monster",
      config: {
        which: "dalek",
        movement: "patrol-randomly-diagonal",
        activated: "on",
      },
    },
    tooltipContent: `## mojo
the emperor's worker bots

patrols randomly in a diagonal pattern`,
    children: (
      <span
        className={`sprite ${"texture-dalek_1" satisfies TextureTailwindClass} ${"activated:texture-animated-dalek" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.cyberman": {
    itemTool: {
      type: "monster",
      config: {
        which: "cyberman",
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
      },
    },
    tooltipContent: `## guard
hovers towards the player on the shortest axis

heels can outrun, but not head

place on a toaster to make a charging guard`,
    children: (
      <StackedToolbarIcons
        topClasses={`${"texture-cyberman_towards" satisfies TextureTailwindClass} ${"activated:texture-cyberman_right" satisfies TextureTailwindClass}`}
        bottomClasses={`${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass}`}
      />
    ),
  },
  "monster.skiHead": {
    itemTool: {
      type: "monster",
      config: {
        which: "skiHead",
        style: "greenAndPink",
        activated: "on",
        movement: "back-forth",
        startDirection: "towards",
      },
    },
    tooltipContent: `## monster
moves *back and forth* by default

or can be set to *patrol clockwise*`,
    children: (
      <span
        className={`sprite ${"texture-skiHead_greenAndPink_towards" satisfies TextureTailwindClass} ${"activated:texture-skiHead_greenAndPink_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.helicopterBug": {
    itemTool: {
      type: "monster",
      config: {
        which: "helicopterBug",
        activated: "on",
        movement: "patrol-randomly-xy8",
      },
    },
    children: (
      <span
        className={`sprite ${"texture-helicopterBug_1" satisfies TextureTailwindClass} ${"activated:texture-animated-helicopterBug" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.turtle": {
    itemTool: {
      type: "monster",
      config: {
        which: "turtle",
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
      },
    },
    tooltipContent: `## turtle
plods along in a clockwise pattern`,
    children: (
      <span
        className={`sprite ${"texture-turtle_towards_1" satisfies TextureTailwindClass} ${"activated:texture-animated-turtle_right" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.homingBot": {
    itemTool: {
      type: "monster",
      config: {
        which: "homingBot",
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
      },
    },
    tooltipContent: `## homing bot
detects a player in a straight line on an axis and rushes towards them`,
    children: (
      <span
        className={`sprite ${"texture-headlessBase" satisfies TextureTailwindClass} ${"activated:texture-animated-headlessBase_scan" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.computerBot": {
    itemTool: {
      type: "monster",
      config: {
        which: "computerBot",
        activated: "on",
        movement: "patrol-randomly-xy4-and-reverse",
      },
    },
    tooltipContent: `## Computer bot
usually patrols randomly, but can be programmed to move towards the player`,
    children: (
      <StackedToolbarIcons
        topClasses={`${"texture-computerBot_towards" satisfies TextureTailwindClass} ${"activated:texture-computerBot_right" satisfies TextureTailwindClass}`}
      />
    ),
  },
  "monster.bubbleRobot": {
    itemTool: {
      type: "monster",
      config: {
        which: "bubbleRobot",
        activated: "on",
        movement: "patrol-randomly-xy8",
      },
    },
    tooltipContent: `## Bubble bot
patrols randomly in 8 directions

fast and dangerous`,
    children: (
      <StackedToolbarIcons
        topClasses={twClass(
          `${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass}`,
        )}
        bottomClasses={twClass(
          "texture-headlessBase" satisfies TextureTailwindClass,
        )}
      />
    ),
  },
  "monster.monkey": {
    itemTool: {
      type: "monster",
      config: {
        which: "monkey",
        activated: "on",
        movement: "patrol-randomly-xy4",
      },
    },
    children: (
      <StackedToolbarIcons
        topClasses={`${"texture-monkey_towards" satisfies TextureTailwindClass} ${"activated:texture-monkey_right" satisfies TextureTailwindClass}`}
      />
    ),
  },
  "monster.elephant": {
    itemTool: {
      type: "monster",
      config: {
        which: "elephant",
        activated: "on",
        movement: "patrol-randomly-xy4",
      },
    },
    children: (
      <StackedToolbarIcons
        topClasses={`${"texture-elephant_towards" satisfies TextureTailwindClass} ${"activated:texture-elephant_right" satisfies TextureTailwindClass}`}
      />
    ),
  },
  "monster.elephantHead": {
    itemTool: {
      type: "monster",
      config: {
        which: "elephantHead",
        activated: "on",
        movement: "turn-to-player",
        startDirection: "towards",
      },
    },
    tooltipContent: `## Elephant head
Things have gone weird

Stationary, but deadly`,
    children: (
      <span
        className={`sprite ${"texture-elephant_towards" satisfies TextureTailwindClass} ${"activated:texture-elephant_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.emperorsGuardian": {
    itemTool: {
      type: "monster",
      config: {
        which: "emperorsGuardian",
        activated: "on",
        movement: "towards-analogue-unless-planet-crowns",
      },
    },
    className: "inline relative",
    tooltipContent: `## Emperor's Guardian

very dangerous

moves towards the player, unless they have all four planet crowns

does not *like doughnuts*
`,
    children: (
      <StackedToolbarIcons
        topClasses={"texture-ball" satisfies TextureTailwindClass}
        bottomClasses={`${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass}`}
      />
    ),
  },
  "monster.emperor": {
    itemTool: {
      type: "monster",
      config: {
        which: "emperor",
        activated: "on",
        movement: "towards-analogue",
      },
    },
    tooltipContent: `## Emperor
The end boss, usually found guarding his Blacktooth crown`,
    children: (
      <span
        className={`sprite ${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.extraLife": {
    itemTool: { type: "pickup", config: { gives: "extra-life" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={
          "texture-whiteRabbit_extra-life" satisfies TextureTailwindClass
        }
        text="2"
      />
    ),
  },
  "pickup.shield": {
    itemTool: { type: "pickup", config: { gives: "shield" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={
          "texture-whiteRabbit_shield" satisfies TextureTailwindClass
        }
        text="🛡"
      />
    ),
  },
  "pickup.jumps": {
    itemTool: { type: "pickup", config: { gives: "jumps" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={"texture-whiteRabbit_jumps" satisfies TextureTailwindClass}
        text="♨"
      />
    ),
  },
  "pickup.fast": {
    itemTool: { type: "pickup", config: { gives: "fast" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={"texture-whiteRabbit_fast" satisfies TextureTailwindClass}
        text="⚡"
      />
    ),
  },
  "pickup.bag": {
    itemTool: { type: "pickup", config: { gives: "bag" } },
    children: (
      <span
        className={`sprite ${"texture-bag" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.hooter": {
    itemTool: {
      type: "pickup",
      config: { gives: "hooter" },
    },
    tooltipContent: `## hooter

head's doughnut firing hooter`,
    children: (
      <span
        className={`sprite ${"texture-hooter" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.doughnuts": {
    itemTool: { type: "pickup", config: { gives: "doughnuts" } },
    children: (
      <span
        className={`sprite ${"texture-doughnuts" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.reincarnation": {
    itemTool: { type: "pickup", config: { gives: "reincarnation" } },
    children: (
      <span
        className={`sprite ${"texture-fish_1" satisfies TextureTailwindClass} ${"activated:texture-animated-fish" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.crown": {
    itemTool: {
      type: "pickup",
      config: { gives: "crown", planet: "blacktooth" },
    },
    children: (
      <span
        className={`sprite ${"texture-crown_blacktooth" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.scroll": {
    itemTool: {
      type: "pickup",
      config: {
        gives: "scroll",
        source: "inline",
        markdown: "#Write me\n\nTODO: Put content here",
      },
    },
    children: (
      <span
        className={`sprite ${"texture-scroll" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "deadlyBlock.volcano": {
    itemTool: { type: "deadlyBlock", config: { style: "volcano" } },
    tooltipContent: `## Volcano`,
    shortcutKeys: ["V"],
    children: (
      <span
        className={`sprite ${"texture-volcano_1" satisfies TextureTailwindClass} ${"activated:texture-animated-volcano" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "deadlyBlock.toaster": {
    itemTool: { type: "deadlyBlock", config: { style: "toaster" } },
    tooltipContent: `## Toaster\n\ncharging stations for the Emperor's Guardians`,
    children: (
      <span
        className={`sprite ${"texture-toaster_off" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingDeadly.spikyBall": {
    itemTool: {
      type: "slidingDeadly",
      config: { style: "spikyBall", startingPhase: 1 },
    },
    tooltipContent: `## Spiky ball
rolls fast if pushed

deadly to touch`,
    children: (
      <span
        className={`sprite ${"texture-spikyBall_1" satisfies TextureTailwindClass} ${"activated:texture-spikyBall_2" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  spikes: {
    itemTool: { type: "spikes", config: emptyObject },
    tooltipContent: `## spikes

deadly to touch on top

safe to run into the sides`,
    children: (
      <span
        className={`sprite ${"texture-spikes" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "moveableDeadly.deadFish": {
    itemTool: { type: "moveableDeadly", config: { style: "deadFish" } },
    tooltipContent: `## dead fish

(deadly to touch)

dead fish decompose very quickly and it rapidly
turns so poisonous that a single lick can kill`,
    children: (
      <span
        className={`sprite ${"texture-fish_1" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  charles: {
    itemTool: { type: "charles", config: emptyObject },
    children: (
      <StackedToolbarIcons
        topClasses={`${"texture-charles_towards" satisfies TextureTailwindClass} ${"activated:texture-charles_right" satisfies TextureTailwindClass}`}
      />
    ),
  },
  joystick: {
    itemTool: {
      type: "joystick",
      config: {
        controls: [
          // the first charles put into a room will always have 'charles' as the id:
          "charles",
        ] as EditorRoomItemId[],
      },
    },
    tooltipContent: `## Joystick
Controls one or more Charles bots

Change *which* Charles in the json`,
    children: (
      <span
        className={`sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  switch: {
    itemTool: {
      type: "switch",
      config: {
        initialSetting: "left",
        type: "in-room",
        modifies: emptyArray,
      },
    },
    tooltipContent: `## Switch
toggles when touched.

edit the json to choose:

* de/activate monsters
* turn on/off moving platforms
* make blocks disappear on touch
* flip other switches
* change where teleporters go
* ... other things!`,
    children: (
      <span
        className={`sprite ${"texture-switch_left" satisfies TextureTailwindClass} ${"activated:texture-switch_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  button: {
    itemTool: {
      type: "button",
      config: {
        modifies: emptyArray,
      },
    },
    tooltipContent: `## button`,
    children: (
      <span
        className={`sprite ${"texture-buttonInGame" satisfies TextureTailwindClass} ${"activated:texture-buttonInGame_pressed" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  spring: {
    itemTool: {
      type: "spring",
      config: {},
    },
    children: (
      <span
        className={`sprite ${"texture-spring_released" satisfies TextureTailwindClass} ${"activated:texture-spring_compressed" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.cube": {
    itemTool: { type: "portableBlock", config: { style: "cube" } },
    children: (
      <span
        className={`sprite ${"texture-cube" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.drum": {
    itemTool: { type: "portableBlock", config: { style: "drum" } },
    children: (
      <span
        className={`sprite ${"texture-drum" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.sticks": {
    itemTool: { type: "portableBlock", config: { style: "sticks" } },
    children: (
      <span
        className={`sprite ${"texture-sticks" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  pushableBlock: {
    itemTool: { type: "pushableBlock", config: {} },
    children: (
      <span
        className={`sprite ${"texture-stepStool" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  ball: {
    itemTool: { type: "ball", config: emptyObject },
    children: (
      <span
        className={`sprite ${"texture-ball" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingBlock.puck": {
    itemTool: {
      type: "slidingBlock",
      config: { style: "puck" },
    },
    tooltipContent: `## Sliding puck

Small item that can be stood on and slides when touched`,
    children: (
      <span
        className={`sprite ${"texture-puck" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingBlock.book": {
    itemTool: {
      type: "slidingBlock",
      config: { style: "book" },
    },
    tooltipContent: `## Sliding book

Why are the books slippery?`,
    children: (
      <span
        className={`sprite ${"texture-book_y" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  lift: {
    itemTool: { type: "lift", config: { top: 11, bottom: 0 } },
    className: "inline relative",
    children: (
      <>
        <span
          className={`sprite inline-block absolute top-0 left-0 ${"texture-lift_static" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
        />
        <span
          className={`sprite inline-block absolute top-0 left-0 ${"texture-lift_1" satisfies TextureTailwindClass} ${"activated:texture-animated-lift" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
        />
      </>
    ),
  },
  "conveyor.away": {
    itemTool: { type: "conveyor", config: { direction: "away" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_y_1" satisfies TextureTailwindClass} ${"activated:texture-animated-conveyor_y" satisfies AnimatedTextureTailwindClass}`}
        text="↗"
      />
    ),
  },
  "conveyor.towards": {
    itemTool: { type: "conveyor", config: { direction: "towards" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_y_1" satisfies TextureTailwindClass} ${"activated:texture-animated-reversed-conveyor_y" satisfies AnimatedTextureTailwindClass}`}
        text="↙"
      />
    ),
  },
  "conveyor.left": {
    itemTool: { type: "conveyor", config: { direction: "left" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_x_1" satisfies TextureTailwindClass} ${"activated:texture-animated-conveyor_x" satisfies AnimatedTextureTailwindClass}`}
        text="↖"
      />
    ),
  },
  "conveyor.right": {
    itemTool: { type: "conveyor", config: { direction: "right" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_x_1" satisfies TextureTailwindClass} ${"activated:texture-animated-reversed-conveyor_x" satisfies AnimatedTextureTailwindClass}`}
        text="↘"
      />
    ),
  },
  teleporter: {
    itemTool: {
      type: "teleporter",
      config: {},
    },
    children: (
      <span
        className={`sprite ${"texture-teleporter" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  portableTeleporter: {
    itemTool: {
      type: "portableTeleporter",
      config: {},
    },
    children: (
      <span
        className={`sprite ${"texture-portableTeleporter" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  movingPlatform: {
    itemTool: {
      type: "movingPlatform",
      config: {
        movement: "clockwise",
        activated: "on",
        startDirection: "towards",
      },
    },
    tooltipContent: `## Moving Platform
Clockwise or back-and-forth

Can be (de)activated by a switch, or touch

Why a sandwich?`,
    children: (
      <span
        className={`sprite ${"texture-sandwich" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  hushPuppy: {
    itemTool: {
      type: "hushPuppy",
      config: {},
    },
    children: (
      <span
        className={`sprite ${"texture-hushPuppy" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  floor: {
    itemTool: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 1, y: 1 },
      },
    },
    children: (
      <span
        className={`sprite ${"texture-blacktooth_floor" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "player.head": {
    itemTool: {
      type: "player",
      config: { which: "head" },
    },
    tooltipContent: `## Head

Place on of these into one room

This is where head will start the game`,
    children: (
      <span
        className={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "player.heels": {
    itemTool: {
      type: "player",
      config: { which: "heels" },
    },
    tooltipContent: `## Heels

Place on of these into one room

This is where head will start the game`,
    children: (
      <span
        className={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.head": {
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "head", startDirection: "towards" },
    },
    tooltipContent: `##NPC head
Citizens of Freedom

stand around not doing much`,
    children: (
      <span
        className={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.heels": {
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "heels", startDirection: "towards" },
    },
    tooltipContent: `##NPC heels
Citizens of Freedom

stand around not doing much`,
    children: (
      <span
        className={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.headOverHeels": {
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "headOverHeels", startDirection: "towards" },
    },
    tooltipContent: `## NPC head over heels
Citizens of Freedom

stand around not doing much`,
    children: (
      <StackedToolbarIcons
        topClasses={`${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "walking", facingXy8: "right" })}`}
        bottomClasses={`${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "walking", facingXy8: "right" })}`}
      />
    ),
  },
  wall(state: LevelEditorState) {
    const scenery = selectCurrentEditingRoomJson({ levelEditor: state }).planet;

    const textureClassname = twClass(
      scenery === "blacktooth" ?
        ("texture-blacktooth_wall_plain_away" satisfies TextureTailwindClass)
      : scenery === "bookworld" ?
        ("texture-bookworld_wall_cowboy_away" satisfies TextureTailwindClass)
      : scenery === "jail" ?
        ("texture-jail_wall_bars_away" satisfies TextureTailwindClass)
      : scenery === "egyptus" ?
        ("texture-egyptus_wall_hieroglyphics_away" satisfies TextureTailwindClass)
      : scenery === "market" ?
        ("texture-market_wall_passage_away" satisfies TextureTailwindClass)
      : scenery === "moonbase" ?
        ("texture-moonbase_wall_window1_away" satisfies TextureTailwindClass)
      : scenery === "penitentiary" ?
        ("texture-penitentiary_wall_loop_away" satisfies TextureTailwindClass)
      : ("texture-safari_wall_wall_away" satisfies TextureTailwindClass),
    );

    return {
      itemTool: {
        type: "wall" as "wall",
        config: {
          direction: "away" as "away",
          tiles: Array.from(rotatingSceneryTiles(scenery, 1)),
        },
      },
      children: (
        <span
          className={`sprite ${textureClassname} ${buttonSpriteRevertColourClasses}`}
        />
      ),
    };
  },
} as const satisfies {
  [s in string]:
    | ((state: LevelEditorState) => ItemToolButtonProps<JsonItemType>)
    | ItemToolButtonProps<JsonItemType>;
};
