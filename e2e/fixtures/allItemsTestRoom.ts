import { type Campaign } from "../../src/model/modelTypes";
import { inferRoomJson, type RoomJson } from "../../src/model/RoomJson";

/**
 * a purpose-built 16×16 moonbase room for the full-circle camera sweep: as
 * many visually distinct item types as possible, each directional type at
 * every direction and each styled type in every style. Sized to fit fully on
 * screen at the highest emulated resolution.
 *
 * every item sits on the floor (z=0), laid out on a grid across the room so
 * each stands apart and stays readable at every camera angle.
 */
export const allItemsTestRoom = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "allItemsTestRoom",
  planet: "moonbase",
  items: {
    floor: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 16, y: 16 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },

    // away wall split around a door; every moonbase tile type appears:
    wallAway1: {
      config: {
        direction: "away",
        tiles: [
          "coil",
          "window1",
          "window2",
          "window3",
          "window-clear",
          "coil",
          "window1",
        ],
      },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    doorAway: {
      config: { direction: "away", toRoom: "allItemsTestRoom" },
      position: { x: 7, y: 16, z: 0 },
      type: "door",
    },
    wallAway2: {
      config: {
        direction: "away",
        tiles: [
          "window2",
          "window3",
          "coil",
          "window-clear",
          "window1",
          "window2",
          "window3",
        ],
      },
      position: { x: 9, y: 16, z: 0 },
      type: "wall",
    },
    // left wall split around a door:
    wallLeft1: {
      config: {
        direction: "left",
        tiles: [
          "window2",
          "coil",
          "window-clear",
          "window1",
          "window3",
          "window2",
          "coil",
        ],
      },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    doorLeft: {
      config: { direction: "left", toRoom: "allItemsTestRoom" },
      position: { x: 16, y: 7, z: 0 },
      type: "door",
    },
    wallLeft2: {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window-clear",
          "window1",
          "coil",
        ],
      },
      position: { x: 16, y: 9, z: 0 },
      type: "wall",
    },
    // towards/right walls too (hidden at the base angle, but they render
    // once the camera rotates them to the far side), split around doors:
    wallTowards1: {
      config: {
        direction: "towards",
        tiles: [
          "window1",
          "coil",
          "window2",
          "window-clear",
          "window3",
          "coil",
          "window1",
          "window2",
          "window3",
          "coil",
          "window-clear",
          "window1",
        ],
      },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    wallTowards2: {
      config: { direction: "towards", tiles: ["window2", "coil"] },
      position: { x: 14, y: 0, z: 0 },
      type: "wall",
    },
    wallRight1: {
      config: {
        direction: "right",
        tiles: [
          "window3",
          "window2",
          "coil",
          "window1",
          "window-clear",
          "window2",
          "coil",
          "window3",
          "window1",
          "coil",
          "window2",
          "window-clear",
        ],
      },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    wallRight2: {
      config: { direction: "right", tiles: ["window1", "window3"] },
      position: { x: 0, y: 14, z: 0 },
      type: "wall",
    },
    // doors in the hidden walls too:
    doorTowards: {
      config: { direction: "towards", toRoom: "allItemsTestRoom" },
      position: { x: 12, y: 0, z: 0 },
      type: "door",
    },
    doorRight: {
      config: { direction: "right", toRoom: "allItemsTestRoom" },
      position: { x: 0, y: 12, z: 0 },
      type: "door",
    },

    // both playable characters (head is the starting player):
    head: {
      config: { which: "head" },
      position: { x: 0, y: 0, z: 0 },
      type: "player",
    },
    heels: {
      config: { which: "heels" },
      position: { x: 2, y: 0, z: 0 },
      type: "player",
    },

    // one of every simple pickup:
    fish: {
      config: { gives: "reincarnation" },
      position: { x: 3, y: 0, z: 0 },
      type: "pickup",
    },
    doughnuts: {
      config: { gives: "doughnuts" },
      position: { x: 5, y: 0, z: 0 },
      type: "pickup",
    },
    bag: {
      config: { gives: "bag" },
      position: { x: 6, y: 0, z: 0 },
      type: "pickup",
    },
    hooter: {
      config: { gives: "hooter" },
      position: { x: 8, y: 0, z: 0 },
      type: "pickup",
    },
    jumps: {
      config: { gives: "jumps" },
      position: { x: 9, y: 0, z: 0 },
      type: "pickup",
    },
    shield: {
      config: { gives: "shield" },
      position: { x: 11, y: 0, z: 0 },
      type: "pickup",
    },
    extraLife: {
      config: { gives: "extra-life" },
      position: { x: 14, y: 0, z: 0 },
      type: "pickup",
    },
    fast: {
      config: { gives: "fast" },
      position: { x: 15, y: 0, z: 0 },
      type: "pickup",
    },
    crown: {
      config: { gives: "crown", planet: "egyptus" },
      position: { x: 0, y: 2, z: 0 },
      type: "pickup",
    },
    scroll: {
      config: {
        gives: "scroll",
        source: "inline",
        markdown: "sweep allItemsTestRoom",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "pickup",
    },
    sceneryCrown: {
      config: { planet: "safari" },
      position: { x: 3, y: 2, z: 0 },
      type: "sceneryCrown",
    },
    teleporter: {
      config: { toPosition: { x: 1, y: 1, z: 0 } },
      position: { x: 5, y: 2, z: 0 },
      type: "teleporter",
    },

    // sliding/moveable things, both spiky ball phases:
    spikyBallPhase1: {
      config: { style: "spikyBall", startingPhase: 1 },
      position: { x: 6, y: 2, z: 0 },
      type: "slidingDeadly",
    },
    spikyBallPhase2: {
      config: { style: "spikyBall", startingPhase: 2 },
      position: { x: 8, y: 2, z: 0 },
      type: "slidingDeadly",
    },
    deadFish: {
      config: { style: "deadFish" },
      position: { x: 9, y: 2, z: 0 },
      type: "moveableDeadly",
    },
    puck: {
      config: { style: "puck" },
      position: { x: 11, y: 2, z: 0 },
      type: "slidingBlock",
    },
    slidingBook: {
      config: { style: "book" },
      position: { x: 12, y: 2, z: 0 },
      type: "slidingBlock",
    },
    spikes: {
      config: {},
      position: { x: 14, y: 2, z: 0 },
      type: "spikes",
    },
    spikesRow: {
      config: { times: { x: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "spikes",
    },

    // barriers on both axes, with times:
    barrierTall: {
      config: { axis: "x", times: { x: 3, z: 10 } },
      position: { x: 2, y: 3, z: 0 },
      type: "barrier",
    },
    barrierY: {
      config: { axis: "y", times: { y: 3 } },
      position: { x: 15, y: 2, z: 0 },
      type: "barrier",
    },

    // portable blocks, every style:
    portableCube: {
      config: { style: "cube" },
      position: { x: 5, y: 3, z: 0 },
      type: "portableBlock",
    },
    portableDrum: {
      config: { style: "drum" },
      position: { x: 6, y: 3, z: 0 },
      type: "portableBlock",
    },
    portableSticks: {
      config: { style: "sticks" },
      position: { x: 8, y: 3, z: 0 },
      type: "portableBlock",
    },

    // deadly blocks, both styles, single and multiplied:
    deadlyBlockTall: {
      config: { style: "toaster", times: { z: 10 } },
      position: { x: 9, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    deadlyVolcano: {
      config: { style: "volcano" },
      position: { x: 11, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    deadlyToasterRow: {
      config: { style: "toaster", times: { x: 2 } },
      position: { x: 12, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    hushPuppy: {
      config: {},
      position: { x: 14, y: 3, z: 0 },
      type: "hushPuppy",
    },

    // scenery players: both characters at every legal (8-way) direction:
    sceneryHeadAway: {
      config: { which: "head", startDirection: "away" },
      position: { x: 0, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeadAwayRight: {
      config: { which: "head", startDirection: "awayRight" },
      position: { x: 2, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeadRight: {
      config: { which: "head", startDirection: "right" },
      position: { x: 3, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeadTowardsRight: {
      config: { which: "head", startDirection: "towardsRight" },
      position: { x: 5, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeadTowards: {
      config: { which: "head", startDirection: "towards" },
      position: { x: 6, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeadTowardsLeft: {
      config: { which: "head", startDirection: "towardsLeft" },
      position: { x: 8, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeadLeft: {
      config: { which: "head", startDirection: "left" },
      position: { x: 9, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeadAwayLeft: {
      config: { which: "head", startDirection: "awayLeft" },
      position: { x: 11, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsAway: {
      config: { which: "heels", startDirection: "away" },
      position: { x: 12, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsAwayRight: {
      config: { which: "heels", startDirection: "awayRight" },
      position: { x: 14, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsRight: {
      config: { which: "heels", startDirection: "right" },
      position: { x: 15, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsTowardsRight: {
      config: { which: "heels", startDirection: "towardsRight" },
      position: { x: 0, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsTowards: {
      config: { which: "heels", startDirection: "towards" },
      position: { x: 2, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsTowardsLeft: {
      config: { which: "heels", startDirection: "towardsLeft" },
      position: { x: 3, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsLeft: {
      config: { which: "heels", startDirection: "left" },
      position: { x: 5, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHeelsAwayLeft: {
      config: { which: "heels", startDirection: "awayLeft" },
      position: { x: 6, y: 6, z: 0 },
      type: "sceneryPlayer",
    },

    // blocks: every style, single/multiplied, and towers of assorted heights
    // (blockTower1/2 and the 10-high towerTall):
    blockTall: {
      config: { style: "artificial", times: { z: 10 } },
      position: { x: 8, y: 6, z: 0 },
      type: "block",
    },
    blockArtificialRow: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 9, y: 6, z: 0 },
      type: "block",
    },
    blockOrganic: {
      config: { style: "organic" },
      position: { x: 11, y: 6, z: 0 },
      type: "block",
    },
    blockOrganicColumn: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 12, y: 6, z: 0 },
      type: "block",
    },
    blockBook: {
      config: { style: "book" },
      position: { x: 14, y: 6, z: 0 },
      type: "block",
    },
    blockTower1: {
      config: { style: "tower" },
      position: { x: 15, y: 6, z: 0 },
      type: "block",
    },
    blockTower2: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 0, y: 8, z: 0 },
      type: "block",
    },
    towerTall: {
      config: { style: "tower", times: { z: 10 } },
      position: { x: 2, y: 8, z: 0 },
      type: "block",
    },

    // lamps at every direction, shining and dark, stacked and single:
    lampAway: {
      config: { direction: "away", activated: true },
      position: { x: 3, y: 8, z: 0 },
      type: "lamp",
    },
    lampTowards: {
      config: { direction: "towards", activated: false },
      position: { x: 5, y: 8, z: 0 },
      type: "lamp",
    },
    lampLeft: {
      config: { direction: "left", activated: true, times: { z: 2 } },
      position: { x: 6, y: 8, z: 0 },
      type: "lamp",
    },
    lampRight: {
      config: { direction: "right", activated: false },
      position: { x: 8, y: 8, z: 0 },
      type: "lamp",
    },

    // conveyors at every direction plus a multiplied run:
    convAway: {
      config: { direction: "away", disabled: true },
      position: { x: 9, y: 8, z: 0 },
      type: "conveyor",
    },
    convTowards: {
      config: { direction: "towards", disabled: true },
      position: { x: 11, y: 8, z: 0 },
      type: "conveyor",
    },
    convLeft: {
      config: { direction: "left", disabled: true },
      position: { x: 12, y: 8, z: 0 },
      type: "conveyor",
    },
    convRight: {
      config: { direction: "right", disabled: true },
      position: { x: 14, y: 8, z: 0 },
      type: "conveyor",
    },
    convRun: {
      config: { direction: "left", disabled: true, times: { x: 2 } },
      position: { x: 0, y: 9, z: 0 },
      type: "conveyor",
    },

    // mirrors: both orientations, single and stacked:
    mirrorAwayRight: {
      config: { orientation: "awayRight" },
      position: { x: 15, y: 8, z: 0 },
      type: "mirror",
    },
    mirrorTall: {
      config: { orientation: "awayRight", times: { z: 10 } },
      position: { x: 2, y: 9, z: 0 },
      type: "mirror",
    },
    mirrorAwayLeft: {
      config: { orientation: "awayLeft" },
      position: { x: 3, y: 9, z: 0 },
      type: "mirror",
    },
    mirrorAwayLeftStacked: {
      config: { orientation: "awayLeft", times: { z: 2 } },
      position: { x: 5, y: 9, z: 0 },
      type: "mirror",
    },

    charles: {
      config: { activated: false },
      position: { x: 6, y: 9, z: 0 },
      type: "charles",
    },
    joystick: {
      config: {},
      position: { x: 8, y: 9, z: 0 },
      type: "joystick",
    },
    movingPlatform: {
      config: {
        movement: "back-forth",
        activated: "off",
        startDirection: "away",
      },
      position: { x: 9, y: 9, z: 0 },
      type: "movingPlatform",
    },
    portableTeleporter: {
      config: { toPosition: { x: 1, y: 1, z: 0 } },
      position: { x: 11, y: 9, z: 0 },
      type: "portableTeleporter",
    },

    // two further mirrors, one tall:
    mirrorBeamAway: {
      config: { orientation: "awayRight" },
      position: { x: 12, y: 9, z: 0 },
      type: "mirror",
    },
    mirrorBeamLeft: {
      config: { orientation: "awayLeft", times: { z: 2 } },
      position: { x: 14, y: 9, z: 0 },
      type: "mirror",
    },
    // every monster type at every direction, activated so its active-state
    // sprite shows:
    turtleAwayOn: {
      config: {
        which: "turtle",
        startDirection: "away",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 15, y: 9, z: 0 },
      type: "monster",
    },
    turtleTowardsOn: {
      config: {
        which: "turtle",
        startDirection: "towards",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 0, y: 11, z: 0 },
      type: "monster",
    },
    turtleLeftOn: {
      config: {
        which: "turtle",
        startDirection: "left",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 2, y: 11, z: 0 },
      type: "monster",
    },
    turtleRightOn: {
      config: {
        which: "turtle",
        startDirection: "right",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 3, y: 11, z: 0 },
      type: "monster",
    },
    cybermanAwayOn: {
      config: {
        which: "cyberman",
        startDirection: "away",
        movement: "towards-on-shortest-axis-xy4",
        activated: "on",
      },
      position: { x: 5, y: 11, z: 0 },
      type: "monster",
    },
    cybermanTowardsOn: {
      config: {
        which: "cyberman",
        startDirection: "towards",
        movement: "towards-on-shortest-axis-xy4",
        activated: "on",
      },
      position: { x: 6, y: 11, z: 0 },
      type: "monster",
    },
    cybermanLeftOn: {
      config: {
        which: "cyberman",
        startDirection: "left",
        movement: "towards-on-shortest-axis-xy4",
        activated: "on",
      },
      position: { x: 8, y: 11, z: 0 },
      type: "monster",
    },
    cybermanRightOn: {
      config: {
        which: "cyberman",
        startDirection: "right",
        movement: "towards-on-shortest-axis-xy4",
        activated: "on",
      },
      position: { x: 9, y: 11, z: 0 },
      type: "monster",
    },
    helicopterBugOn: {
      config: {
        which: "helicopterBug",
        movement: "patrol-randomly-xy8",
        activated: "on",
      },
      position: { x: 11, y: 11, z: 0 },
      type: "monster",
    },
    bubbleRobotOn: {
      config: {
        which: "bubbleRobot",
        movement: "patrol-randomly-xy8",
        activated: "on",
      },
      position: { x: 12, y: 11, z: 0 },
      type: "monster",
    },
    homingBotOn: {
      config: {
        which: "homingBot",
        movement: "towards-tripped-on-axis-xy4",
        activated: "on",
      },
      position: { x: 14, y: 11, z: 0 },
      type: "monster",
    },
    dalekOn: {
      config: {
        which: "dalek",
        movement: "patrol-randomly-diagonal",
        activated: "on",
      },
      position: { x: 15, y: 11, z: 0 },
      type: "monster",
    },
    elephantOn: {
      config: {
        which: "elephant",
        movement: "patrol-randomly-xy4",
        activated: "on",
      },
      position: { x: 2, y: 12, z: 0 },
      type: "monster",
    },
    emperorOn: {
      config: {
        which: "emperor",
        movement: "towards-analogue",
        activated: "on",
      },
      position: { x: 3, y: 12, z: 0 },
      type: "monster",
    },
    emperorsGuardianOn: {
      config: {
        which: "emperorsGuardian",
        movement: "towards-analogue-unless-planet-crowns",
        activated: "on",
      },
      position: { x: 5, y: 12, z: 0 },
      type: "monster",
    },
    computerBotAwayOn: {
      config: {
        which: "computerBot",
        startDirection: "away",
        movement: "patrol-randomly-xy4-and-reverse",
        activated: "on",
      },
      position: { x: 6, y: 12, z: 0 },
      type: "monster",
    },
    computerBotTowardsOn: {
      config: {
        which: "computerBot",
        startDirection: "towards",
        movement: "patrol-randomly-xy4-and-reverse",
        activated: "on",
      },
      position: { x: 8, y: 12, z: 0 },
      type: "monster",
    },
    computerBotLeftOn: {
      config: {
        which: "computerBot",
        startDirection: "left",
        movement: "patrol-randomly-xy4-and-reverse",
        activated: "on",
      },
      position: { x: 9, y: 12, z: 0 },
      type: "monster",
    },
    computerBotRightOn: {
      config: {
        which: "computerBot",
        startDirection: "right",
        movement: "patrol-randomly-xy4-and-reverse",
        activated: "on",
      },
      position: { x: 11, y: 12, z: 0 },
      type: "monster",
    },
    monkeyAwayOn: {
      config: {
        which: "monkey",
        startDirection: "away",
        movement: "patrol-randomly-xy4",
        activated: "on",
      },
      position: { x: 12, y: 12, z: 0 },
      type: "monster",
    },
    monkeyTowardsOn: {
      config: {
        which: "monkey",
        startDirection: "towards",
        movement: "patrol-randomly-xy4",
        activated: "on",
      },
      position: { x: 14, y: 12, z: 0 },
      type: "monster",
    },
    monkeyLeftOn: {
      config: {
        which: "monkey",
        startDirection: "left",
        movement: "patrol-randomly-xy4",
        activated: "on",
      },
      position: { x: 15, y: 12, z: 0 },
      type: "monster",
    },
    monkeyRightOn: {
      config: {
        which: "monkey",
        startDirection: "right",
        movement: "patrol-randomly-xy4",
        activated: "on",
      },
      position: { x: 0, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadGpAwayOn: {
      config: {
        which: "skiHead",
        style: "greenAndPink",
        startDirection: "away",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 2, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadGpTowardsOn: {
      config: {
        which: "skiHead",
        style: "greenAndPink",
        startDirection: "towards",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 3, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadGpLeftOn: {
      config: {
        which: "skiHead",
        style: "greenAndPink",
        startDirection: "left",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 5, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadGpRightOn: {
      config: {
        which: "skiHead",
        style: "greenAndPink",
        startDirection: "right",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 6, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadSsAwayOn: {
      config: {
        which: "skiHead",
        style: "starsAndStripes",
        startDirection: "away",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 8, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadSsTowardsOn: {
      config: {
        which: "skiHead",
        style: "starsAndStripes",
        startDirection: "towards",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 9, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadSsLeftOn: {
      config: {
        which: "skiHead",
        style: "starsAndStripes",
        startDirection: "left",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 11, y: 14, z: 0 },
      type: "monster",
    },
    skiHeadSsRightOn: {
      config: {
        which: "skiHead",
        style: "starsAndStripes",
        startDirection: "right",
        movement: "back-forth",
        activated: "on",
      },
      position: { x: 12, y: 14, z: 0 },
      type: "monster",
    },
    elephantHeadAwayOn: {
      config: {
        which: "elephantHead",
        startDirection: "away",
        movement: "turn-to-player",
        activated: "on",
      },
      position: { x: 14, y: 14, z: 0 },
      type: "monster",
    },
    elephantHeadTowardsOn: {
      config: {
        which: "elephantHead",
        startDirection: "towards",
        movement: "turn-to-player",
        activated: "on",
      },
      position: { x: 15, y: 14, z: 0 },
      type: "monster",
    },
    elephantHeadLeftOn: {
      config: {
        which: "elephantHead",
        startDirection: "left",
        movement: "turn-to-player",
        activated: "on",
      },
      position: { x: 0, y: 15, z: 0 },
      type: "monster",
    },
    elephantHeadRightOn: {
      config: {
        which: "elephantHead",
        startDirection: "right",
        movement: "turn-to-player",
        activated: "on",
      },
      position: { x: 2, y: 15, z: 0 },
      type: "monster",
    },

    // headOverHeels (symbiosis) scenery players at every legal direction:
    sceneryHohAway: {
      config: { which: "headOverHeels", startDirection: "away" },
      position: { x: 3, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHohAwayRight: {
      config: { which: "headOverHeels", startDirection: "awayRight" },
      position: { x: 5, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHohRight: {
      config: { which: "headOverHeels", startDirection: "right" },
      position: { x: 6, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHohTowardsRight: {
      config: { which: "headOverHeels", startDirection: "towardsRight" },
      position: { x: 8, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHohTowards: {
      config: { which: "headOverHeels", startDirection: "towards" },
      position: { x: 9, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHohTowardsLeft: {
      config: { which: "headOverHeels", startDirection: "towardsLeft" },
      position: { x: 11, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHohLeft: {
      config: { which: "headOverHeels", startDirection: "left" },
      position: { x: 12, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
    sceneryHohAwayLeft: {
      config: { which: "headOverHeels", startDirection: "awayLeft" },
      position: { x: 14, y: 15, z: 0 },
      type: "sceneryPlayer",
    },
  },
}) satisfies RoomJson<"allItemsTestRoom", string, "moonbase">;

/**
 * a single-room campaign wrapping the allItemsTestRoom, for encoding into a
 * playtest-style `data:` campaign URL
 */
export const allItemsTestRoomCampaign: Campaign<"allItemsTestRoom"> = {
  locator: { campaignName: "all-items-test-room", userId: "e2e", version: -1 },
  rooms: { allItemsTestRoom },
};
