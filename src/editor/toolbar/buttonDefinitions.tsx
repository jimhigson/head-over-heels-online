import { playableTailwindSpriteClassname } from "../../game/components/tailwindSprites/playableTailwindSpriteClassname";
import { rotatingSceneryTiles } from "../../model/inPlaceMutators/rotatingSceneryTiles";
import { type JsonItemType } from "../../model/json/JsonItem";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { emptyArray, emptyObject } from "../../utils/empty";
import { twClass } from "../../utils/twClass";
import {
  type LevelEditorState,
  selectCurrentEditingRoomJson,
} from "../slice/levelEditorSlice";
import {
  DissapearingItemToolbarIcon,
  LabelledToolbarIcon,
  StackedToolbarIcons,
} from "./buttons/ToolbarButtonContentPatterns";
import { buttonSpriteRevertColourClasses } from "./buttonSizeClassNames";
import { type ItemToolButtonProps } from "./ItemToolButton";

export const buttonDefinitions = {
  "block.organic": {
    ariaLabel: "Organic block",
    itemTool: {
      type: "block",
      config: { style: "organic" },
    },
    shortcutKeys: ["B"],
    tooltipContent: `## Block
The basic block`,
    children: (
      <span
        class={`sprite ${"texture-block_organic" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.organic.disappearing": {
    ariaLabel: "Disappearing organic block",
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
    ariaLabel: "Artificial block",
    itemTool: { type: "block", config: { style: "artificial" } },
    shortcutKeys: ["⌥B"],
    tooltipContent: `## Block
Basic block with a metallic look`,
    children: (
      <span
        class={`sprite ${"texture-block_artificial" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.artificial.disappearing": {
    ariaLabel: "Disappearing artificial block",
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
    ariaLabel: "Tower",
    itemTool: { type: "block", config: { style: "tower" } },
    shortcutKeys: ["T"],
    tooltipContent: `## Tower
Very high block`,
    children: (
      <span
        class={`sprite ${"texture-tower" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.book": {
    ariaLabel: "Book block",
    itemTool: { type: "block", config: { style: "book" } },
    children: (
      <span
        class={`sprite ${"texture-book_x" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.x": {
    ariaLabel: "Barrier on x axis",
    itemTool: { type: "barrier", config: { axis: "x" } },
    children: (
      <span
        class={`sprite ${"texture-barrier_x" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.y": {
    ariaLabel: "Barrier on y axis",
    itemTool: { type: "barrier", config: { axis: "y" } },
    children: (
      <span
        class={`sprite ${"texture-barrier_y" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.x.disappearing": {
    ariaLabel: "Disappearing barrier on x axis",
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
    ariaLabel: "Disappearing barrier on y axis",
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
    ariaLabel: "Mojo (dalek)",
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
        class={`sprite ${"texture-dalek_1" satisfies TextureTailwindClass} ${"activated:texture-animated-dalek" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.cyberman": {
    ariaLabel: "Guard (cyberman)",
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
    ariaLabel: "Ski-head monster",
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
        class={`sprite ${"texture-skiHead_greenAndPink_towards" satisfies TextureTailwindClass} ${"activated:texture-skiHead_greenAndPink_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.helicopterBug": {
    ariaLabel: "Helicopter bug",
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
        class={`sprite ${"texture-helicopterBug_1" satisfies TextureTailwindClass} ${"activated:texture-animated-helicopterBug" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.turtle": {
    ariaLabel: "Turtle",
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
        class={`sprite ${"texture-turtle_towards_1" satisfies TextureTailwindClass} ${"activated:texture-animated-turtle_right" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.homingBot": {
    ariaLabel: "Homing bot",
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
        class={`sprite ${"texture-headlessBase" satisfies TextureTailwindClass} ${"activated:texture-animated-headlessBase_scan" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.computerBot": {
    ariaLabel: "Computer bot",
    itemTool: {
      type: "monster",
      config: {
        which: "computerBot",
        activated: "on",
        startDirection: "towards",
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
    ariaLabel: "Bubble bot",
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
    ariaLabel: "Monkey",
    itemTool: {
      type: "monster",
      config: {
        which: "monkey",
        activated: "on",
        startDirection: "towards",
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
    ariaLabel: "Elephant",
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
    ariaLabel: "Elephant head",
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
        class={`sprite ${"texture-elephant_towards" satisfies TextureTailwindClass} ${"activated:texture-elephant_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.emperorsGuardian": {
    ariaLabel: "Emperor's guardian",
    itemTool: {
      type: "monster",
      config: {
        which: "emperorsGuardian",
        activated: "on",
        movement: "towards-analogue-unless-planet-crowns",
      },
    },
    class: "inline relative",
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
    ariaLabel: "Emperor",
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
        class={`sprite ${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.extraLife": {
    ariaLabel: "Extra life pickup",
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
    ariaLabel: "Shield pickup",
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
    ariaLabel: "Extra jumps pickup",
    itemTool: { type: "pickup", config: { gives: "jumps" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={"texture-whiteRabbit_jumps" satisfies TextureTailwindClass}
        text="♨"
      />
    ),
  },
  "pickup.fast": {
    ariaLabel: "Speed pickup",
    itemTool: { type: "pickup", config: { gives: "fast" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={"texture-whiteRabbit_fast" satisfies TextureTailwindClass}
        text="⚡"
      />
    ),
  },
  "pickup.bag": {
    ariaLabel: "Bag pickup",
    itemTool: { type: "pickup", config: { gives: "bag" } },
    children: (
      <span
        class={`sprite ${"texture-bag" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.hooter": {
    ariaLabel: "Hooter pickup",
    itemTool: {
      type: "pickup",
      config: { gives: "hooter" },
    },
    tooltipContent: `## hooter

head's doughnut firing hooter`,
    children: (
      <span
        class={`sprite ${"texture-hooter" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.doughnuts": {
    ariaLabel: "Doughnuts pickup",
    itemTool: { type: "pickup", config: { gives: "doughnuts" } },
    children: (
      <span
        class={`sprite ${"texture-doughnuts" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.reincarnation": {
    ariaLabel: "Reincarnation pickup",
    itemTool: { type: "pickup", config: { gives: "reincarnation" } },
    children: (
      <span
        class={`sprite ${"texture-fish_1" satisfies TextureTailwindClass} ${"activated:texture-animated-fish" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.crown": {
    ariaLabel: "Crown pickup",
    itemTool: {
      type: "pickup",
      config: { gives: "crown", planet: "blacktooth" },
    },
    children: (
      <span
        class={`sprite ${"texture-crown_blacktooth" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.scroll": {
    ariaLabel: "Scroll",
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
        class={`sprite ${"texture-scroll" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "deadlyBlock.volcano": {
    ariaLabel: "Volcano",
    itemTool: { type: "deadlyBlock", config: { style: "volcano" } },
    tooltipContent: `## Volcano`,
    shortcutKeys: ["V"],
    children: (
      <span
        class={`sprite ${"texture-volcano_1" satisfies TextureTailwindClass} ${"activated:texture-animated-volcano" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "deadlyBlock.toaster": {
    ariaLabel: "Toaster",
    itemTool: { type: "deadlyBlock", config: { style: "toaster" } },
    tooltipContent: `## Toaster\n\ncharging stations for the Emperor's Guardians`,
    children: (
      <span
        class={`sprite ${"texture-toaster_1" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingDeadly.spikyBall": {
    ariaLabel: "Spiky ball",
    itemTool: {
      type: "slidingDeadly",
      config: { style: "spikyBall", startingPhase: 1 },
    },
    tooltipContent: `## Spiky ball
rolls fast if pushed

deadly to touch`,
    children: (
      <span
        class={`sprite ${"texture-spikyBall_1" satisfies TextureTailwindClass} ${"activated:texture-spikyBall_2" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  lamp: {
    ariaLabel: "Lamp",
    itemTool: {
      type: "lamp",
      config: { direction: "towards", activated: true },
    },
    tooltipContent: `## Lamp

shines a beam of light along an axis

monsters will not walk into the light

can be turned on/off by switches and buttons`,
    children: (
      <span
        class={`sprite ${"texture-lamp_on_towards" satisfies TextureTailwindClass} ${"activated:texture-lamp_on_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  mirror: {
    ariaLabel: "Mirror",
    itemTool: {
      type: "mirror",
      config: { orientation: "awayRight" },
    },
    tooltipContent: `## Mirror

sits diagonally to the axes and reflects light beams

reflective on both sides

rotates to the other diagonal when collided with`,
    children: (
      <span
        class={`sprite ${"texture-mirror_awayRight" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  spikes: {
    ariaLabel: "Spikes",
    itemTool: { type: "spikes", config: emptyObject },
    tooltipContent: `## spikes

deadly to touch on top

safe to run into the sides`,
    children: (
      <span
        class={`sprite ${"texture-spikes" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "moveableDeadly.deadFish": {
    ariaLabel: "Dead fish",
    itemTool: { type: "moveableDeadly", config: { style: "deadFish" } },
    tooltipContent: `## dead fish

(deadly to touch)

dead fish decompose very quickly and it rapidly
turns so poisonous that a single lick can kill`,
    children: (
      <span
        class={`sprite ${"texture-fish_dead" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  charles: {
    ariaLabel: "Charles bot",
    itemTool: { type: "charles", config: emptyObject },
    children: (
      <StackedToolbarIcons
        topClasses={`${"texture-charles_towards" satisfies TextureTailwindClass} ${"activated:texture-charles_right" satisfies TextureTailwindClass}`}
      />
    ),
  },
  joystick: {
    ariaLabel: "Joystick",
    itemTool: {
      type: "joystick",
      config: {
        // omit list of charles by default = controls all in the room
      },
    },
    tooltipContent: `## Joystick
Controls one or more Charles bots

Change *which* Charles in the json`,
    children: (
      <span
        class={`sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  switch: {
    ariaLabel: "Switch",
    itemTool: {
      type: "switch",
      config: {
        initialSetting: "left",
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
        class={`sprite ${"texture-switch_left" satisfies TextureTailwindClass} ${"activated:texture-switch_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  button: {
    ariaLabel: "Button",
    itemTool: {
      type: "button",
      config: {
        modifies: emptyArray,
      },
    },
    tooltipContent: `## button`,
    children: (
      <span
        class={`sprite ${"texture-buttonInGame" satisfies TextureTailwindClass} ${"activated:texture-buttonInGame_pressed" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  emitter: {
    ariaLabel: "Emitter",
    itemTool: {
      type: "emitter",
      config: {
        emits: { type: "firedDoughnut", config: { direction: "left" } },
        period: 4000,
        maximum: 10,
      },
    },
    tooltipContent: `## Emitter\nCreates items at regular intervals\n\nEdit the json to configure what it emits`,
    children: (
      <span
        class={`sprite ${"texture-hud_char_E" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  timer: {
    ariaLabel: "Timer",
    itemTool: {
      type: "timer",
      config: {
        period: 2000,
        initialSetting: "left",
        modifies: [],
      },
    },
    tooltipContent: `## Timer\nPeriodically toggles switch-style modifications\n\nEdit the json to configure targets`,
    children: (
      <span
        class={`sprite ${"texture-hud_char_T" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  spring: {
    ariaLabel: "Spring",
    itemTool: {
      type: "spring",
      config: {},
    },
    children: (
      <span
        class={`sprite ${"texture-spring_released" satisfies TextureTailwindClass} ${"activated:texture-spring_compressed" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.cube": {
    ariaLabel: "Portable cube",
    itemTool: { type: "portableBlock", config: { style: "cube" } },
    children: (
      <span
        class={`sprite ${"texture-cube" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.drum": {
    ariaLabel: "Portable drum",
    itemTool: { type: "portableBlock", config: { style: "drum" } },
    children: (
      <span
        class={`sprite ${"texture-drum" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.sticks": {
    ariaLabel: "Portable sticks",
    itemTool: { type: "portableBlock", config: { style: "sticks" } },
    children: (
      <span
        class={`sprite ${"texture-sticks" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  pushableBlock: {
    ariaLabel: "Pushable step stool",
    itemTool: { type: "pushableBlock", config: {} },
    children: (
      <span
        class={`sprite ${"texture-stepStool" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  ball: {
    ariaLabel: "Ball",
    itemTool: { type: "ball", config: emptyObject },
    children: (
      <span
        class={`sprite ${"texture-ball" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingBlock.puck": {
    ariaLabel: "Sliding puck",
    itemTool: {
      type: "slidingBlock",
      config: { style: "puck" },
    },
    tooltipContent: `## Sliding puck

Small item that can be stood on and slides when touched`,
    children: (
      <span
        class={`sprite ${"texture-puck" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingBlock.book": {
    ariaLabel: "Sliding book",
    itemTool: {
      type: "slidingBlock",
      config: { style: "book" },
    },
    tooltipContent: `## Sliding book

Why are the books slippery?`,
    children: (
      <span
        class={`sprite ${"texture-book_y" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  lift: {
    ariaLabel: "Lift",
    itemTool: { type: "lift", config: { top: 11, bottom: 0 } },
    class: "inline relative",
    children: (
      <>
        <span
          class={`sprite inline-block absolute top-0 left-0 ${"texture-lift_static" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
        />
        <span
          class={`sprite inline-block absolute top-0 left-0 ${"texture-lift_1" satisfies TextureTailwindClass} ${"activated:texture-animated-lift" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses} [button:active_&]:top-oneScaledPix`}
        />
      </>
    ),
  },
  "conveyor.away": {
    ariaLabel: "Conveyor moving away",
    itemTool: { type: "conveyor", config: { direction: "away" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_y_1" satisfies TextureTailwindClass} ${"activated:texture-animated-conveyor_y" satisfies AnimatedTextureTailwindClass}`}
        text="↗"
      />
    ),
  },
  "conveyor.towards": {
    ariaLabel: "Conveyor moving towards",
    itemTool: { type: "conveyor", config: { direction: "towards" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_y_1" satisfies TextureTailwindClass} ${"activated:texture-animated-reversed-conveyor_y" satisfies AnimatedTextureTailwindClass}`}
        text="↙"
      />
    ),
  },
  "conveyor.left": {
    ariaLabel: "Conveyor moving left",
    itemTool: { type: "conveyor", config: { direction: "left" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_x_1" satisfies TextureTailwindClass} ${"activated:texture-animated-conveyor_x" satisfies AnimatedTextureTailwindClass}`}
        text="↖"
      />
    ),
  },
  "conveyor.right": {
    ariaLabel: "Conveyor moving right",
    itemTool: { type: "conveyor", config: { direction: "right" } },
    children: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_x_1" satisfies TextureTailwindClass} ${"activated:texture-animated-reversed-conveyor_x" satisfies AnimatedTextureTailwindClass}`}
        text="↘"
      />
    ),
  },
  teleporter: {
    ariaLabel: "Teleporter",
    itemTool: {
      type: "teleporter",
      config: {},
    },
    children: (
      <span
        class={`sprite ${"texture-teleporter" satisfies TextureTailwindClass} ${"activated:texture-animated-teleporter_flashing" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  portableTeleporter: {
    ariaLabel: "Portable teleporter",
    itemTool: {
      type: "portableTeleporter",
      config: {},
    },
    children: (
      <span
        class={`sprite ${"texture-portableTeleporter" satisfies TextureTailwindClass} ${"activated:texture-animated-portableTeleporter_flashing" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  movingPlatform: {
    ariaLabel: "Moving platform",
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
        class={`sprite ${"texture-sandwich" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  hushPuppy: {
    ariaLabel: "Hush puppy",
    itemTool: {
      type: "hushPuppy",
      config: {},
    },
    children: (
      <span
        class={`sprite ${"texture-hushPuppy" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  floor: {
    ariaLabel: "Floor",
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
        class={`sprite ${"texture-blacktooth_floor" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "player.head": {
    ariaLabel: "Head start position",
    itemTool: {
      type: "player",
      config: { which: "head" },
    },
    tooltipContent: `## Head

Place on of these into one room

This is where head will start the game`,
    children: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "player.heels": {
    ariaLabel: "Heels start position",
    itemTool: {
      type: "player",
      config: { which: "heels" },
    },
    tooltipContent: `## Heels

Place on of these into one room

This is where head will start the game`,
    children: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.head": {
    ariaLabel: "NPC head",
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "head", startDirection: "towards" },
    },
    tooltipContent: `##NPC head
Citizens of Freedom

stand around not doing much`,
    children: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.heels": {
    ariaLabel: "NPC heels",
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "heels", startDirection: "towards" },
    },
    tooltipContent: `##NPC heels
Citizens of Freedom

stand around not doing much`,
    children: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.headOverHeels": {
    ariaLabel: "NPC head over heels",
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "headOverHeels", startDirection: "towards" },
    },
    tooltipContent: `## NPC head over heels
Citizens of Freedom

stand around not doing much`,
    children: (
      <StackedToolbarIcons
        topClasses={`${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "head", action: "idle", facingXy8: "right" })}`}
        bottomClasses={`${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "BlockStack" as "BlockStack", character: "heels", action: "idle", facingXy8: "right" })}`}
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
      ariaLabel: "Wall",
      itemTool: {
        type: "wall" as "wall",
        config: {
          direction: "away" as "away",
          tiles: Array.from(rotatingSceneryTiles(scenery, 1)),
        },
      },
      children: (
        <span
          class={`sprite ${textureClassname} ${buttonSpriteRevertColourClasses}`}
        />
      ),
    };
  },
} as const satisfies {
  [s in string]:
    | ((state: LevelEditorState) => ItemToolButtonProps<JsonItemType>)
    | ItemToolButtonProps<JsonItemType>;
};
