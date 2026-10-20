import { playableTailwindSpriteClassname } from "../../game/components/tailwindSprites/playableTailwindSpriteClassname";
import { rotatingSceneryTiles } from "../../model/inPlaceMutators/rotatingSceneryTiles";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { type EditorRootState } from "../../store/store";
import { emptyArray, emptyObject } from "../../utils/empty";
import { twClass } from "../../utils/twClass" with { type: "macro" };
import { doorItemTool } from "../RoomEditingArea/interactivity/doorItemTool";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../slice/levelEditorSelectors";
import {
  DissapearingItemToolbarIcon,
  LabelledToolbarIcon,
  StackedToolbarIcons,
} from "../toolbar/buttons/ToolbarButtonContentPatterns";
import { buttonSpriteRevertColourClasses } from "../toolbar/buttonSizeClassNames";
import {
  type EditorCommandDefinition,
  type ItemToolCommand,
} from "./EditorCommand";

/** the items the editor can place, each as a command that picks its item tool */
export const itemToolCommandDefinitions = {
  "block.organic": {
    label: "Organic block",
    type: "itemTool",
    itemTool: {
      type: "block",
      config: { style: "organic" },
    },
    shortcutKeys: ["B"],
    tooltipContent: `## Block
The basic block`,
    icon: (
      <span
        class={`sprite ${"texture-block_organic" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.organic.disappearing": {
    label: "Disappearing organic block",
    type: "itemTool",
    itemTool: {
      type: "block",
      config: { style: "organic", disappearing: { on: "stand" } },
    },
    shortcutKeys: ["⇧B"],
    tooltipContent: `## Block
Disappearing basic block`,
    icon: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass<TextureTailwindClass>(
          "texture-block_organic_disappearing",
        )}
      />
    ),
  },
  "block.artificial": {
    label: "Artificial block",
    type: "itemTool",
    itemTool: { type: "block", config: { style: "artificial" } },
    shortcutKeys: ["⌥B"],
    tooltipContent: `## Block
Basic block with a metallic look`,
    icon: (
      <span
        class={`sprite ${"texture-block_artificial" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.artificial.disappearing": {
    label: "Disappearing artificial block",
    type: "itemTool",
    itemTool: {
      type: "block",
      config: { style: "artificial", disappearing: { on: "stand" } },
    },
    shortcutKeys: ["⌥⇧B"],
    tooltipContent: `## Block
Disappearing metallic look block`,
    icon: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass<TextureTailwindClass>(
          "texture-block_artificial_disappearing",
        )}
      />
    ),
  },
  "block.tower": {
    label: "Tower",
    type: "itemTool",
    itemTool: { type: "block", config: { style: "tower" } },
    shortcutKeys: ["T"],
    tooltipContent: `## Tower
Very high block`,
    icon: (
      <span
        class={`sprite ${"texture-tower" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "block.book": {
    label: "Book block",
    type: "itemTool",
    itemTool: { type: "block", config: { style: "book" } },
    icon: (
      <span
        class={`sprite ${"texture-book_d0" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.x": {
    label: "Barrier on x axis",
    type: "itemTool",
    itemTool: { type: "barrier", config: { axis: "x" } },
    icon: (
      <span
        class={`sprite ${"texture-barrier_d0" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.y": {
    label: "Barrier on y axis",
    type: "itemTool",
    itemTool: { type: "barrier", config: { axis: "y" } },
    icon: (
      <span
        class={`sprite ${"texture-barrier_d2" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "barrier.x.disappearing": {
    label: "Disappearing barrier on x axis",
    type: "itemTool",
    itemTool: {
      type: "barrier",
      config: { axis: "x", disappearing: { on: "touch" } },
    },
    icon: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass<TextureTailwindClass>("texture-barrier_d0")}
      />
    ),
  },
  "barrier.y.disappearing": {
    label: "Disappearing barrier on y axis",
    type: "itemTool",
    itemTool: {
      type: "barrier",
      config: { axis: "y", disappearing: { on: "touch" } },
    },
    icon: (
      <DissapearingItemToolbarIcon
        iconClassName={twClass<TextureTailwindClass>("texture-barrier_d2")}
      />
    ),
  },
  "monster.dalek": {
    label: "Mojo (dalek)",
    synonyms: ["robot"],
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-dalek_1" satisfies TextureTailwindClass} ${"activated:texture-animated-dalek" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.cyberman": {
    label: "Guard (cyberman)",
    synonyms: ["robot", "soldier"],
    type: "itemTool",
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
    icon: (
      <StackedToolbarIcons
        topClasses={`${"texture-cyberman_d6" satisfies TextureTailwindClass} ${"activated:texture-cyberman_d4" satisfies TextureTailwindClass}`}
        bottomClasses={`${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass}`}
      />
    ),
  },
  "monster.skiHead": {
    label: "Ski-head monster",
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-skiHead_greenAndPink_d6" satisfies TextureTailwindClass} ${"activated:texture-skiHead_greenAndPink_d4" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.helicopterBug": {
    label: "Helicopter bug",
    type: "itemTool",
    itemTool: {
      type: "monster",
      config: {
        which: "helicopterBug",
        activated: "on",
        movement: "patrol-randomly-xy8",
      },
    },
    icon: (
      <span
        class={`sprite ${"texture-helicopterBug_1" satisfies TextureTailwindClass} ${"activated:texture-animated-helicopterBug" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.turtle": {
    label: "Turtle",
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-turtle_d6_1" satisfies TextureTailwindClass} ${"activated:texture-animated-turtle_d4" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.homingBot": {
    label: "Homing bot",
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-headlessBase" satisfies TextureTailwindClass} ${"activated:texture-animated-headlessBase_scan" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.computerBot": {
    label: "Computer bot",
    type: "itemTool",
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
    icon: (
      <StackedToolbarIcons
        topClasses={`${"texture-computerBot_d6" satisfies TextureTailwindClass} ${"activated:texture-computerBot_d4" satisfies TextureTailwindClass}`}
      />
    ),
  },
  "monster.bubbleRobot": {
    label: "Bubble bot",
    type: "itemTool",
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
    icon: (
      <StackedToolbarIcons
        topClasses={`${twClass<TextureTailwindClass>("texture-bubbles_cold_2")} ${twClass<AnimatedTextureTailwindClass>("activated:texture-animated-bubbles_cold")}`}
        bottomClasses={twClass<TextureTailwindClass>("texture-headlessBase")}
      />
    ),
  },
  "monster.monkey": {
    label: "Monkey",
    type: "itemTool",
    itemTool: {
      type: "monster",
      config: {
        which: "monkey",
        activated: "on",
        startDirection: "towards",
        movement: "patrol-randomly-xy4",
      },
    },
    icon: (
      <StackedToolbarIcons
        topClasses={`${"texture-monkey_d6" satisfies TextureTailwindClass} ${"activated:texture-monkey_d4" satisfies TextureTailwindClass}`}
      />
    ),
  },
  "monster.elephant": {
    label: "Elephant",
    type: "itemTool",
    itemTool: {
      type: "monster",
      config: {
        which: "elephant",
        activated: "on",
        movement: "patrol-randomly-xy4",
      },
    },
    icon: (
      <StackedToolbarIcons
        topClasses={`${"texture-elephant_d6" satisfies TextureTailwindClass} ${"activated:texture-elephant_d4" satisfies TextureTailwindClass}`}
      />
    ),
  },
  "monster.elephantHead": {
    label: "Elephant head",
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-elephant_d6" satisfies TextureTailwindClass} ${"activated:texture-elephant_d4" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "monster.emperorsGuardian": {
    label: "Emperor's guardian",
    synonyms: ["boss"],
    type: "itemTool",
    itemTool: {
      type: "monster",
      config: {
        which: "emperorsGuardian",
        activated: "on",
        movement: "towards-analogue-unless-planet-crowns",
      },
    },
    toolbarClass: "inline relative",
    tooltipContent: `## Emperor's Guardian

very dangerous

moves towards the player, unless they have all four planet crowns

does not *like doughnuts*
`,
    icon: (
      <StackedToolbarIcons
        topClasses={"texture-ball" satisfies TextureTailwindClass}
        bottomClasses={`${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass}`}
      />
    ),
  },
  "monster.emperor": {
    label: "Emperor",
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-bubbles_cold_2" satisfies TextureTailwindClass} ${"activated:texture-animated-bubbles_cold" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.extraLife": {
    label: "Extra life pickup",
    synonyms: ["bunny", "rabbit", "lives"],
    type: "itemTool",
    itemTool: { type: "pickup", config: { gives: "extra-life" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={
          "texture-whiteRabbit_extra-life" satisfies TextureTailwindClass
        }
        text="2"
      />
    ),
  },
  "pickup.shield": {
    label: "Shield pickup",
    synonyms: ["invincible", "invulnerable", "iron pills", "bunny", "rabbit"],
    type: "itemTool",
    itemTool: { type: "pickup", config: { gives: "shield" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={
          "texture-whiteRabbit_shield" satisfies TextureTailwindClass
        }
        text="🛡"
      />
    ),
  },
  "pickup.jumps": {
    label: "Extra jumps pickup",
    synonyms: ["spring", "bunny", "rabbit"],
    type: "itemTool",
    itemTool: { type: "pickup", config: { gives: "jumps" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={"texture-whiteRabbit_jumps" satisfies TextureTailwindClass}
        text="♨"
      />
    ),
  },
  "pickup.fast": {
    label: "Speed pickup",
    synonyms: ["quick", "bunny", "rabbit"],
    type: "itemTool",
    itemTool: { type: "pickup", config: { gives: "fast" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={"texture-whiteRabbit_fast" satisfies TextureTailwindClass}
        text="⚡"
      />
    ),
  },
  "pickup.bag": {
    label: "Bag pickup",
    synonyms: ["handbag", "purse", "carry"],
    type: "itemTool",
    itemTool: { type: "pickup", config: { gives: "bag" } },
    icon: (
      <span
        class={`sprite ${"texture-bag" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.hooter": {
    label: "Hooter pickup",
    synonyms: ["horn", "weapon"],
    type: "itemTool",
    itemTool: {
      type: "pickup",
      config: { gives: "hooter" },
    },
    tooltipContent: `## hooter

head's doughnut firing hooter`,
    icon: (
      <span
        class={`sprite ${"texture-hooter" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.doughnuts": {
    label: "Doughnuts pickup",
    synonyms: ["ammo", "tray"],
    type: "itemTool",
    itemTool: { type: "pickup", config: { gives: "doughnuts" } },
    icon: (
      <span
        class={`sprite ${"texture-doughnuts" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.reincarnation": {
    label: "Reincarnation pickup",
    synonyms: ["fish", "save", "checkpoint"],
    type: "itemTool",
    itemTool: { type: "pickup", config: { gives: "reincarnation" } },
    icon: (
      <span
        class={`sprite ${"texture-fish_1" satisfies TextureTailwindClass} ${"activated:texture-animated-fish" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.crown": {
    label: "Crown pickup",
    type: "itemTool",
    itemTool: {
      type: "pickup",
      config: { gives: "crown", planet: "blacktooth" },
    },
    icon: (
      <span
        class={`sprite ${"texture-crown_blacktooth" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "pickup.scroll": {
    label: "Scroll",
    type: "itemTool",
    itemTool: {
      type: "pickup",
      config: {
        gives: "scroll",
        source: "inline",
        markdown: "#Write me\n\nTODO: Put content here",
      },
    },
    icon: (
      <span
        class={`sprite ${"texture-scroll" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "deadlyBlock.volcano": {
    label: "Volcano",
    synonyms: ["hazard"],
    type: "itemTool",
    itemTool: { type: "deadlyBlock", config: { style: "volcano" } },
    tooltipContent: `## Volcano`,
    shortcutKeys: ["V"],
    icon: (
      <span
        class={`sprite ${"texture-volcano_1" satisfies TextureTailwindClass} ${"activated:texture-animated-volcano" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "deadlyBlock.toaster": {
    label: "Toaster",
    synonyms: ["hazard"],
    type: "itemTool",
    itemTool: { type: "deadlyBlock", config: { style: "toaster" } },
    tooltipContent: `## Toaster\n\ncharging stations for the Emperor's Guardians`,
    icon: (
      <span
        class={`sprite ${"texture-toaster_1" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingDeadly.spikyBall": {
    label: "Spiky ball",
    synonyms: ["hazard"],
    type: "itemTool",
    itemTool: {
      type: "slidingDeadly",
      config: { style: "spikyBall", startingPhase: 1 },
    },
    tooltipContent: `## Spiky ball
rolls fast if pushed

deadly to touch`,
    icon: (
      <span
        class={`sprite ${"texture-spikyBall_1" satisfies TextureTailwindClass} ${"activated:texture-spikyBall_2" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  lamp: {
    label: "Lamp",
    type: "itemTool",
    itemTool: {
      type: "lamp",
      config: { direction: "towards", activated: true },
    },
    tooltipContent: `## Lamp

shines a beam of light along an axis

monsters will not walk into the light

can be turned on/off by switches and buttons`,
    icon: (
      <span
        class={`sprite ${"texture-lamp_on_d6" satisfies TextureTailwindClass} ${"activated:texture-lamp_on_d4" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  mirror: {
    label: "Mirror",
    type: "itemTool",
    itemTool: {
      type: "mirror",
      config: { orientation: "awayRight" },
    },
    tooltipContent: `## Mirror

sits diagonally to the axes and reflects light beams

reflective on both sides

rotates to the other diagonal when collided with`,
    icon: (
      <span
        class={`sprite ${"texture-mirror_d3" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  spikes: {
    label: "Spikes",
    synonyms: ["deadly", "hazard"],
    type: "itemTool",
    itemTool: { type: "spikes", config: emptyObject },
    tooltipContent: `## spikes

deadly to touch on top

safe to run into the sides`,
    icon: (
      <span
        class={`sprite ${"texture-spikes" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "moveableDeadly.deadFish": {
    label: "Dead fish",
    synonyms: ["deadly fish", "poison"],
    type: "itemTool",
    itemTool: { type: "moveableDeadly", config: { style: "deadFish" } },
    tooltipContent: `## dead fish

(deadly to touch)

dead fish decompose very quickly and it rapidly
turns so poisonous that a single lick can kill`,
    icon: (
      <span
        class={`sprite ${"texture-fish_dead" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  charles: {
    label: "Charles bot",
    type: "itemTool",
    itemTool: { type: "charles", config: emptyObject },
    icon: (
      <StackedToolbarIcons
        topClasses={`${"texture-charles_d6" satisfies TextureTailwindClass} ${"activated:texture-charles_d4" satisfies TextureTailwindClass}`}
      />
    ),
  },
  joystick: {
    label: "Joystick",
    type: "itemTool",
    itemTool: {
      type: "joystick",
      config: {
        // omit list of charles by default = controls all in the room
      },
    },
    tooltipContent: `## Joystick
Controls one or more Charles bots

Change *which* Charles in the json`,
    icon: (
      <span
        class={`sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  switch: {
    label: "Switch",
    synonyms: ["toggle"],
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-switch_left" satisfies TextureTailwindClass} ${"activated:texture-switch_right" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  button: {
    label: "Button",
    synonyms: ["toggle"],
    type: "itemTool",
    itemTool: {
      type: "button",
      config: {
        modifies: emptyArray,
      },
    },
    tooltipContent: `## button`,
    icon: (
      <span
        class={`sprite ${"texture-buttonInGame" satisfies TextureTailwindClass} ${"activated:texture-buttonInGame_pressed" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  emitter: {
    label: "Emitter",
    type: "itemTool",
    itemTool: {
      type: "emitter",
      config: {
        emits: { type: "firedDoughnut", config: { direction: "left" } },
        period: 4_000,
        maximum: 10,
      },
    },
    tooltipContent: `## Emitter\nCreates items at regular intervals\n\nEdit the json to configure what it emits`,
    icon: <span class="text-single-line">E</span>,
  },
  timer: {
    label: "Timer",
    type: "itemTool",
    itemTool: {
      type: "timer",
      config: {
        period: 2_000,
        initialSetting: "left",
        modifies: [],
      },
    },
    tooltipContent: `## Timer\nPeriodically toggles switch-style modifications\n\nEdit the json to configure targets`,
    icon: <span class="text-single-line">T</span>,
  },
  spring: {
    label: "Spring",
    type: "itemTool",
    itemTool: {
      type: "spring",
      config: {},
    },
    icon: (
      <span
        class={`sprite ${"texture-spring_released" satisfies TextureTailwindClass} ${"activated:texture-spring_compressed" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.cube": {
    label: "Portable cube",
    synonyms: ["carry", "pick up"],
    type: "itemTool",
    itemTool: { type: "portableBlock", config: { style: "cube" } },
    icon: (
      <span
        class={`sprite ${"texture-cube" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.drum": {
    label: "Portable drum",
    synonyms: ["carry", "pick up"],
    type: "itemTool",
    itemTool: { type: "portableBlock", config: { style: "drum" } },
    icon: (
      <span
        class={`sprite ${"texture-drum" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "portableBlock.sticks": {
    label: "Portable sticks",
    synonyms: ["carry", "pick up"],
    type: "itemTool",
    itemTool: { type: "portableBlock", config: { style: "sticks" } },
    icon: (
      <span
        class={`sprite ${"texture-sticks" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  pushableBlock: {
    label: "Pushable step stool",
    type: "itemTool",
    itemTool: { type: "pushableBlock", config: {} },
    icon: (
      <span
        class={`sprite ${"texture-stepStool" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  ball: {
    label: "Ball",
    type: "itemTool",
    itemTool: { type: "ball", config: emptyObject },
    icon: (
      <span
        class={`sprite ${"texture-ball" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingBlock.puck": {
    label: "Sliding puck",
    type: "itemTool",
    itemTool: {
      type: "slidingBlock",
      config: { style: "puck" },
    },
    tooltipContent: `## Sliding puck

Small item that can be stood on and slides when touched`,
    icon: (
      <span
        class={`sprite ${"texture-puck" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "slidingBlock.book": {
    label: "Sliding book",
    type: "itemTool",
    itemTool: {
      type: "slidingBlock",
      config: { style: "book" },
    },
    tooltipContent: `## Sliding book

Why are the books slippery?`,
    icon: (
      <span
        class={`sprite ${"texture-book_d2" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  lift: {
    label: "Lift",
    synonyms: ["elevator"],
    type: "itemTool",
    itemTool: { type: "lift", config: { top: 11, bottom: 0 } },
    toolbarClass: "inline relative",
    icon: (
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
    label: "Conveyor moving away",
    synonyms: ["belt"],
    type: "itemTool",
    itemTool: { type: "conveyor", config: { direction: "away" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_d2_1" satisfies TextureTailwindClass} ${"activated:texture-animated-conveyor_d2" satisfies AnimatedTextureTailwindClass}`}
        text="↗"
      />
    ),
  },
  "conveyor.towards": {
    label: "Conveyor moving towards",
    synonyms: ["belt"],
    type: "itemTool",
    itemTool: { type: "conveyor", config: { direction: "towards" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_d2_1" satisfies TextureTailwindClass} ${"activated:texture-animated-reversed-conveyor_d2" satisfies AnimatedTextureTailwindClass}`}
        text="↙"
      />
    ),
  },
  "conveyor.left": {
    label: "Conveyor moving left",
    synonyms: ["belt"],
    type: "itemTool",
    itemTool: { type: "conveyor", config: { direction: "left" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_d0_1" satisfies TextureTailwindClass} ${"activated:texture-animated-conveyor_d0" satisfies AnimatedTextureTailwindClass}`}
        text="↖"
      />
    ),
  },
  "conveyor.right": {
    label: "Conveyor moving right",
    synonyms: ["belt"],
    type: "itemTool",
    itemTool: { type: "conveyor", config: { direction: "right" } },
    icon: (
      <LabelledToolbarIcon
        iconClasses={`${"texture-conveyor_d0_1" satisfies TextureTailwindClass} ${"activated:texture-animated-reversed-conveyor_d0" satisfies AnimatedTextureTailwindClass}`}
        text="↘"
      />
    ),
  },
  teleporter: {
    label: "Teleporter",
    synonyms: ["transporter"],
    type: "itemTool",
    itemTool: {
      type: "teleporter",
      config: {},
    },
    icon: (
      <span
        class={`sprite ${"texture-teleporter" satisfies TextureTailwindClass} ${"activated:texture-animated-teleporter_flashing" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  portableTeleporter: {
    label: "Portable teleporter",
    type: "itemTool",
    itemTool: {
      type: "portableTeleporter",
      config: {},
    },
    icon: (
      <span
        class={`sprite ${"texture-portableTeleporter" satisfies TextureTailwindClass} ${"activated:texture-animated-portableTeleporter_flashing" satisfies AnimatedTextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  movingPlatform: {
    label: "Moving platform",
    type: "itemTool",
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
    icon: (
      <span
        class={`sprite ${"texture-sandwich" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  hushPuppy: {
    label: "Hush puppy",
    synonyms: ["dog", "vanishing block"],
    type: "itemTool",
    itemTool: {
      type: "hushPuppy",
      config: {},
    },
    icon: (
      <span
        class={`sprite ${"texture-hushPuppy" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  floor: {
    label: "Floor",
    type: "itemTool",
    itemTool: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 1, y: 1 },
      },
    },
    icon: (
      <span
        class={`sprite ${"texture-blacktooth_floor" satisfies TextureTailwindClass} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "player.head": {
    label: "Head start position",
    synonyms: ["spawn"],
    type: "itemTool",
    itemTool: {
      type: "player",
      config: { which: "head" },
    },
    tooltipContent: `## Head

Place on of these into one room

This is where head will start the game`,
    icon: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "head", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "player.heels": {
    label: "Heels start position",
    synonyms: ["spawn"],
    type: "itemTool",
    itemTool: {
      type: "player",
      config: { which: "heels" },
    },
    tooltipContent: `## Heels

Place on of these into one room

This is where head will start the game`,
    icon: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "heels", action: "walking", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.head": {
    label: "NPC head",
    type: "itemTool",
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "head", startDirection: "towards" },
    },
    tooltipContent: `## NPC head
Citizens of Freedom

stand around not doing much`,
    icon: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "head", action: "idle", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.heels": {
    label: "NPC heels",
    type: "itemTool",
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "heels", startDirection: "towards" },
    },
    tooltipContent: `## NPC heels
Citizens of Freedom

stand around not doing much`,
    icon: (
      <span
        class={`sprite ${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "heels", action: "idle", facingXy8: "right" })} ${buttonSpriteRevertColourClasses}`}
      />
    ),
  },
  "sceneryPlayer.headOverHeels": {
    label: "NPC head over heels",
    type: "itemTool",
    itemTool: {
      type: "sceneryPlayer",
      config: { which: "headOverHeels", startDirection: "towards" },
    },
    tooltipContent: `## NPC head over heels
Citizens of Freedom

stand around not doing much`,
    icon: (
      <StackedToolbarIcons
        topClasses={`${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "head", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "head", action: "idle", facingXy8: "right" })}`}
        bottomClasses={`${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "heels", action: "idle", facingXy8: "towards" })} activated:${playableTailwindSpriteClassname({ spritesheetName: "blockstack" as "blockstack", character: "heels", action: "idle", facingXy8: "right" })}`}
      />
    ),
  },
  wall(state: EditorRootState): ItemToolCommand {
    const scenery = selectCurrentCommittedRoomJsonFromLevelEditorState(
      state.levelEditor,
    ).planet;

    const textureClassname =
      scenery === "blacktooth" ?
        twClass<TextureTailwindClass>("texture-blacktooth_wall_plain_d2")
      : scenery === "bookworld" ?
        twClass<TextureTailwindClass>("texture-bookworld_wall_cowboy_d2")
      : scenery === "jail" ?
        twClass<TextureTailwindClass>("texture-jail_wall_bars_d2")
      : scenery === "egyptus" ?
        twClass<TextureTailwindClass>("texture-egyptus_wall_hieroglyphics_d2")
      : scenery === "market" ?
        twClass<TextureTailwindClass>("texture-market_wall_passage_d2")
      : scenery === "moonbase" ?
        twClass<TextureTailwindClass>("texture-moonbase_wall_window1_d2")
      : scenery === "penitentiary" ?
        twClass<TextureTailwindClass>("texture-penitentiary_wall_loop_d2")
      : twClass<TextureTailwindClass>("texture-safari_wall_wall_d2");

    return {
      label: "Wall",
      type: "itemTool",
      itemTool: {
        type: "wall" as "wall",
        config: {
          direction: "away" as "away",
          tiles: Array.from(rotatingSceneryTiles(scenery, 1)),
        },
      },
      icon: (
        <span
          class={`sprite ${textureClassname} ${buttonSpriteRevertColourClasses}`}
        />
      ),
    };
  },
  door(state: EditorRootState): ItemToolCommand {
    const { doorAutoAddsRoom } = state.levelEditor;
    const scenery = selectCurrentCommittedRoomJsonFromLevelEditorState(
      state.levelEditor,
    ).planet;

    const textureClassname =
      scenery === "moonbase" ?
        twClass<TextureTailwindClass>("texture-door_frame_moonbase_d0_whole")
      : twClass<TextureTailwindClass>("texture-door_frame_generic_d0_whole");

    return {
      label: doorAutoAddsRoom ? "Door (adds adjacent room)" : "Door",
      type: "itemTool",
      itemTool: doorItemTool(doorAutoAddsRoom),
      shortcutKeys: ["D"],
      icon: (
        <LabelledToolbarIcon
          iconClasses={`sprite top-[calc(-17px*var(--scale))] left-[calc(-2px*var(--scale))] ${textureClassname} ${buttonSpriteRevertColourClasses}`}
          text={doorAutoAddsRoom ? "+" : ""}
        />
      ),
    };
  },
} as const satisfies {
  [s in string]: EditorCommandDefinition<ItemToolCommand>;
};
