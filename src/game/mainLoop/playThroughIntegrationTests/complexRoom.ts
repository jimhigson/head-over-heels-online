import { inferRoomJson } from "../../../model/RoomJson";

export const complexRoom = inferRoomJson({
  planet: "egyptus",
  color: {
    hue: "yellow",
    shade: "dimmed",
  },
  id: "laboratory",
  items: {
    "floor@0,0,0": {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: {
          x: 18,
          y: 14,
        },
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    "conveyor@0,0,0": {
      type: "conveyor",
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      config: {
        direction: "away",
        times: {
          y: 2,
        },
      },
    },
    "wall(towards)@0,0,0": {
      type: "wall",
      config: {
        direction: "towards",
        times: {
          x: 5,
        },
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    "wall(right)@0,0,0": {
      type: "wall",
      config: {
        direction: "right",
        times: {
          y: 14,
        },
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    "block@0,4,0": {
      type: "block",
      config: {
        disappearing: {
          on: "stand",
        },
        style: "organic",
      },
      position: {
        x: 0,
        y: 4,
        z: 0,
      },
    },
    "wall@0,14,0": {
      type: "wall",
      config: {
        direction: "away",
        tiles: [
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
        ],
      },
      position: {
        x: 0,
        y: 14,
        z: 0,
      },
    },
    "teleporter@1,0,0": {
      type: "teleporter",
      config: {
        toRoom: "nowhere",
        toPosition: {
          x: 1,
          y: 0,
          z: 0,
        },
      },
      position: {
        x: 1,
        y: 0,
        z: 0,
      },
    },
    "block@3,3,8": {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 3,
        y: 3,
        z: 8,
      },
    },
    "block@3,5,8": {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 3,
        y: 5,
        z: 8,
      },
    },
    "conveyor@3,6,0": {
      type: "conveyor",
      config: {
        direction: "away",
        times: {
          y: 3,
        },
      },
      position: {
        x: 3,
        y: 6,
        z: 0,
      },
    },
    "conveyor@3,9,0": {
      type: "conveyor",
      config: {
        direction: "left",
        times: {
          x: 3,
        },
      },
      position: {
        x: 3,
        y: 9,
        z: 0,
      },
    },
    "block@4,3,0": {
      type: "block",
      config: {
        style: "artificial",
      },
      position: {
        x: 4,
        y: 3,
        z: 0,
      },
    },
    "conveyor@4,6,0": {
      type: "conveyor",
      config: {
        direction: "right",
        times: {
          x: 3,
        },
      },
      position: {
        x: 4,
        y: 6,
        z: 0,
      },
    },
    "conveyor@4,6,5": {
      type: "conveyor",
      config: {
        direction: "right",
      },
      position: {
        x: 4,
        y: 6,
        z: 5,
      },
    },
    "block@5,0,0": {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 5,
        y: 0,
        z: 0,
      },
    },
    "block@6,6,2": {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 6,
        y: 6,
        z: 2,
      },
    },
    "conveyor@6,7,0": {
      type: "conveyor",
      config: {
        direction: "towards",
        times: {
          y: 3,
        },
      },
      position: {
        x: 6,
        y: 7,
        z: 0,
      },
    },
    "wall@7,0,0": {
      type: "wall",
      config: {
        direction: "towards",
        times: {
          x: 11,
        },
      },
      position: {
        x: 7,
        y: 0,
        z: 0,
      },
    },
    "wall@7,14,0": {
      type: "wall",
      config: {
        direction: "away",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: {
        x: 7,
        y: 14,
        z: 0,
      },
    },
    "block@8,0,0": {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 8,
        y: 0,
        z: 0,
      },
    },
    "block@9,0,0": {
      type: "block",
      config: {
        style: "organic",
        disappearing: {
          on: "stand",
        },
        times: {
          x: 3,
        },
      },
      position: {
        x: 9,
        y: 0,
        z: 0,
      },
    },
    "block@9,0,1": {
      type: "block",
      config: {
        style: "organic",
        disappearing: {
          on: "stand",
        },
      },
      position: {
        x: 9,
        y: 0,
        z: 1,
      },
    },
    "block@9,0,3": {
      type: "block",
      config: {
        style: "organic",
        disappearing: {
          on: "stand",
        },
      },
      position: {
        x: 9,
        y: 0,
        z: 3,
      },
    },
    "barrier@10,6,0": {
      type: "barrier",
      config: {
        axis: "x",
      },
      position: {
        x: 10,
        y: 6,
        z: 0,
      },
    },
    "barrier@10,8,0": {
      type: "barrier",
      config: {
        axis: "x",
      },
      position: {
        x: 10,
        y: 8,
        z: 0,
      },
    },
    "block@13,3,3": {
      type: "block",
      config: {
        style: "organic",
        times: {
          y: 2,
        },
      },
      position: {
        x: 13,
        y: 3,
        z: 3,
      },
    },
    "block@13,4,2": {
      type: "block",
      config: {
        style: "organic",
        times: {
          y: 2,
        },
      },
      position: {
        x: 13,
        y: 4,
        z: 2,
      },
    },
    "block@13,5,0": {
      type: "block",
      config: {
        style: "tower",
        times: {
          z: 2,
        },
      },
      position: {
        x: 13,
        y: 5,
        z: 0,
      },
    },
    "block@13,7,0": {
      type: "block",
      config: {
        style: "tower",
      },
      position: {
        x: 13,
        y: 7,
        z: 0,
      },
    },
    "block@14,3,0": {
      type: "block",
      config: {
        style: "tower",
        times: {
          z: 2,
        },
      },
      position: {
        x: 14,
        y: 3,
        z: 0,
      },
    },
    "deadlyBlock@17,2,0": {
      type: "deadlyBlock",
      config: {
        style: "volcano",
        times: {
          y: 4,
        },
      },
      position: {
        x: 17,
        y: 2,
        z: 0,
      },
    },
    "deadlyBlock@17,3,1": {
      type: "deadlyBlock",
      config: {
        style: "volcano",
        times: {
          y: 3,
        },
      },
      position: {
        x: 17,
        y: 3,
        z: 1,
      },
    },
    "deadlyBlock@17,4,2": {
      type: "deadlyBlock",
      config: {
        style: "volcano",
        times: {
          y: 2,
        },
      },
      position: {
        x: 17,
        y: 4,
        z: 2,
      },
    },
    "deadlyBlock@17,5,3": {
      type: "deadlyBlock",
      config: {
        style: "volcano",
      },
      position: {
        x: 17,
        y: 5,
        z: 3,
      },
    },
    "wall@18,0,0": {
      type: "wall",
      config: {
        direction: "left",
        tiles: [
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: {
        x: 18,
        y: 0,
        z: 0,
      },
    },
    "block@15.5,8,0": {
      type: "block",
      config: {
        style: "artificial",
      },
      position: {
        x: 15.5,
        y: 8,
        z: 0,
      },
    },
    "block@16,8.5,1": {
      type: "block",
      config: {
        style: "artificial",
      },
      position: {
        x: 16,
        y: 8.5,
        z: 1,
      },
    },
    "emitter@17,0,7": {
      type: "emitter",
      config: {
        emits: {
          type: "monster",
          config: {
            which: "cyberman",
            activated: "on",
            movement: "towards-on-shortest-axis-xy4",
            startDirection: "away",
          },
        },
        period: 1000,
        maximum: 5,
      },
      position: {
        x: 17,
        y: 0,
        z: 7,
      },
    },
    "door@5,0,2": {
      type: "door",
      config: {
        toRoom: "nowhere",
        direction: "towards",
      },
      position: {
        x: 5,
        y: 0,
        z: 2,
      },
    },
    "door@5,14,2": {
      type: "door",
      config: {
        toRoom: "nowhere",
        direction: "away",
      },
      position: {
        x: 5,
        y: 14,
        z: 2,
      },
    },
    "portableBlock@0,0,7": {
      type: "portableBlock",
      position: {
        x: 0,
        y: 0,
        z: 7,
      },
      config: {
        style: "cube",
      },
    },
    "portableBlock@0,0,2": {
      type: "portableBlock",
      position: {
        x: 0,
        y: 0,
        z: 2,
      },
      config: {
        style: "cube",
      },
    },
    "pushableBlock@10,7,0": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 0,
      },
    },
    "pushableBlock@10,7,1": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 1,
      },
    },
    "pushableBlock@10,7,2": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 2,
      },
    },
    "pushableBlock@10,7,3": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 3,
      },
    },
    "pushableBlock@10,7,4": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 4,
      },
    },
    "pushableBlock@10,7,5": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 5,
      },
    },
    "barrier@10,6,1": {
      type: "barrier",
      config: {
        axis: "x",
        disappearing: {
          on: "touch",
        },
      },
      position: {
        x: 10,
        y: 6,
        z: 1,
      },
    },
    "barrier@10,8,1": {
      type: "barrier",
      config: {
        axis: "x",
        disappearing: {
          on: "touch",
        },
      },
      position: {
        x: 10,
        y: 8,
        z: 1,
      },
    },
    "lift@0,4,3": {
      type: "lift",
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 0,
        y: 4,
        z: 3,
      },
    },
    "monster@0,4,1": {
      type: "monster",
      config: {
        which: "skiHead",
        movement: "back-forth",
        activated: "on",
        startDirection: "left",
        style: "starsAndStripes",
      },
      position: {
        x: 0,
        y: 4,
        z: 1,
      },
    },
    "pickup@0,4,9": {
      type: "pickup",
      config: {
        gives: "doughnuts",
      },
      position: {
        x: 0,
        y: 4,
        z: 9,
      },
    },
    "lift@1,4,2": {
      type: "lift",
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 1,
        y: 4,
        z: 2,
      },
    },
    "pickup@1,4,9": {
      type: "pickup",
      config: {
        gives: "hooter",
      },
      position: {
        x: 1,
        y: 4,
        z: 9,
      },
    },
    "lift@2,4,1": {
      type: "lift",
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 2,
        y: 4,
        z: 1,
      },
    },
    "lift@3,4,0": {
      type: "lift",
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 3,
        y: 4,
        z: 0,
      },
    },
    ch1: {
      type: "charles",
      config: {},
      position: {
        x: 3,
        y: 3,
        z: 9,
      },
    },
    ch2: {
      type: "charles",
      config: {},
      position: {
        x: 3,
        y: 5,
        z: 9,
      },
    },
    "pickup@3,5,11": {
      type: "pickup",
      config: {
        gives: "reincarnation",
      },
      position: {
        x: 3,
        y: 5,
        z: 11,
      },
    },
    "joystick@5,3,0": {
      type: "joystick",
      config: {
        controls: ["ch2"],
      },
      position: {
        x: 5,
        y: 3,
        z: 0,
      },
    },
    "monster@4,2,0": {
      type: "monster",
      config: {
        which: "skiHead",
        movement: "back-forth",
        startDirection: "away",
        style: "greenAndPink",
        activated: "on",
      },
      position: {
        x: 4,
        y: 2,
        z: 0,
      },
    },
    "monster@4,0,0": {
      type: "monster",
      config: {
        which: "skiHead",
        movement: "back-forth",
        startDirection: "away",
        style: "greenAndPink",
        activated: "on",
      },
      position: {
        x: 4,
        y: 0,
        z: 0,
      },
    },
    "joystick@4,1,0": {
      type: "joystick",
      config: {
        controls: ["ch1"],
      },
      position: {
        x: 4,
        y: 1,
        z: 0,
      },
    },
    "monster@4,8,5": {
      type: "monster",
      config: {
        which: "cyberman",
        movement: "towards-on-shortest-axis-xy4",
        activated: "on",
        startDirection: "away",
      },
      position: {
        x: 4,
        y: 8,
        z: 5,
      },
    },
    "pickup@4,6,9": {
      type: "pickup",
      config: {
        gives: "extra-life",
      },
      position: {
        x: 4,
        y: 6,
        z: 9,
      },
    },
    "pickup@4,6,10": {
      type: "pickup",
      config: {
        gives: "bag",
      },
      position: {
        x: 4,
        y: 6,
        z: 10,
      },
    },
    "pickup@4,6,13": {
      type: "pickup",
      config: {
        gives: "reincarnation",
      },
      position: {
        x: 4,
        y: 6,
        z: 13,
      },
    },
    "pickup@4,6,1": {
      type: "pickup",
      config: {
        gives: "reincarnation",
      },
      position: {
        x: 4,
        y: 6,
        z: 1,
      },
    },
    "portableBlock@4,6,2": {
      type: "portableBlock",
      config: {
        style: "drum",
      },
      position: {
        x: 4,
        y: 6,
        z: 2,
      },
    },
    "portableBlock@5,6,10": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 5,
        y: 6,
        z: 10,
      },
    },
    "monster@1,7,0": {
      type: "monster",
      config: {
        which: "skiHead",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        activated: "on",
      },
      position: {
        x: 1,
        y: 7,
        z: 0,
      },
    },
    "monster@2,8,0": {
      type: "monster",
      config: {
        which: "skiHead",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        activated: "on",
      },
      position: {
        x: 2,
        y: 8,
        z: 0,
      },
    },
    "monster@1,8,0": {
      type: "monster",
      config: {
        which: "skiHead",
        movement: "back-forth",
        startDirection: "away",
        style: "starsAndStripes",
        activated: "on",
      },
      position: {
        x: 1,
        y: 8,
        z: 0,
      },
    },
    "pushableBlock@2,6,0": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 2,
        y: 6,
        z: 0,
      },
    },
    "pushableBlock@2,9,0": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 2,
        y: 9,
        z: 0,
      },
    },
    "pushableBlock@1,6,0": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 1,
        y: 6,
        z: 0,
      },
    },
    "pushableBlock@1,6,1": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 1,
        y: 6,
        z: 1,
      },
    },
    "pushableBlock@1,6,2": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 1,
        y: 6,
        z: 2,
      },
    },
    "pushableBlock@2,6,1": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 2,
        y: 6,
        z: 1,
      },
    },
    "pushableBlock@2,6,2": {
      type: "pushableBlock",
      config: {},
      position: {
        x: 2,
        y: 6,
        z: 2,
      },
    },
    "portableBlock@13,1,0": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 1,
        z: 0,
      },
    },
    "portableBlock@13,1,1": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 1,
        z: 1,
      },
    },
    "portableBlock@13,1,2": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 1,
        z: 2,
      },
    },
    "spring@13,0,0": {
      type: "spring",
      config: {},
      position: {
        x: 13,
        y: 0,
        z: 0,
      },
    },
    "spring@14,0,0": {
      type: "spring",
      config: {},
      position: {
        x: 14,
        y: 0,
        z: 0,
      },
    },
    "portableBlock@13,2,0": {
      type: "portableBlock",
      config: {
        style: "sticks",
      },
      position: {
        x: 13,
        y: 2,
        z: 0,
      },
    },
    "portableBlock@13,3,0": {
      type: "portableBlock",
      config: {
        style: "drum",
      },
      position: {
        x: 13,
        y: 3,
        z: 0,
      },
    },
    "pickup@12,0,0": {
      type: "pickup",
      config: {
        gives: "bag",
      },
      position: {
        x: 12,
        y: 0,
        z: 0,
      },
    },
    "portableBlock@13,4,0": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 4,
        z: 0,
      },
    },
    "portableBlock@13.5,3,2": {
      type: "portableBlock",
      config: {
        style: "drum",
      },
      position: {
        x: 13.5,
        y: 3,
        z: 2,
      },
    },
    "lift@13,6,1": {
      type: "lift",
      config: {
        top: 2,
        bottom: 1,
      },
      position: {
        x: 13,
        y: 6,
        z: 1,
      },
    },
    "portableBlock@13,3,4": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 3,
        z: 4,
      },
    },
    "ball@7,4,0": {
      type: "ball",
      config: {},
      position: {
        x: 7,
        y: 4,
        z: 0,
      },
    },
    "ball@7,2,0": {
      type: "ball",
      config: {},
      position: {
        x: 7,
        y: 2,
        z: 0,
      },
    },
    "ball@9,4,0": {
      type: "ball",
      config: {},
      position: {
        x: 9,
        y: 4,
        z: 0,
      },
    },
    "ball@10,4,0": {
      type: "ball",
      config: {},
      position: {
        x: 10,
        y: 4,
        z: 0,
      },
    },
    t2: {
      type: "monster",
      config: {
        which: "turtle",
        movement: "clockwise",
        startDirection: "left",
        activated: "on",
      },
      position: {
        x: 12,
        y: 12,
        z: 0,
      },
    },
    t1: {
      type: "monster",
      config: {
        which: "turtle",
        movement: "clockwise",
        startDirection: "towards",
        activated: "on",
      },
      position: {
        x: 16,
        y: 13,
        z: 1,
      },
    },
    "switch@17,12,0": {
      type: "switch",
      config: {
        type: "in-room",
        initialSetting: "left",
        modifies: [
          {
            expectType: "monster",
            targets: ["t1"],
            leftState: {
              activated: false,
            },
            rightState: {
              activated: true,
              everActivated: true,
            },
          },
        ],
      },
      position: {
        x: 17,
        y: 12,
        z: 0,
      },
    },
    "pickup@17,1,0": {
      type: "pickup",
      config: {
        gives: "shield",
      },
      position: {
        x: 17,
        y: 1,
        z: 0,
      },
    },
    "pickup@17,1,1": {
      type: "pickup",
      config: {
        gives: "shield",
      },
      position: {
        x: 17,
        y: 1,
        z: 1,
      },
    },
    "pickup@17,1,2": {
      type: "pickup",
      config: {
        gives: "shield",
      },
      position: {
        x: 17,
        y: 1,
        z: 2,
      },
    },
    "pickup@16,1,0": {
      type: "pickup",
      config: {
        gives: "shield",
      },
      position: {
        x: 16,
        y: 1,
        z: 0,
      },
    },
    "pickup@16,1,1": {
      type: "pickup",
      config: {
        gives: "shield",
      },
      position: {
        x: 16,
        y: 1,
        z: 1,
      },
    },
    "pickup@15,1,0": {
      type: "pickup",
      config: {
        gives: "shield",
      },
      position: {
        x: 15,
        y: 1,
        z: 0,
      },
    },
    "portableBlock@5,13,0": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 5,
        y: 13,
        z: 0,
      },
    },
    "portableBlock@4,13,0": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 4,
        y: 13,
        z: 0,
      },
    },
    "portableBlock@3,13,0": {
      type: "portableBlock",
      config: {
        style: "cube",
      },
      position: {
        x: 3,
        y: 13,
        z: 0,
      },
    },
    heels: {
      type: "player",
      config: {
        which: "heels",
      },
      position: {
        x: 8,
        y: 0,
        z: 3,
      },
    },
  },
});
