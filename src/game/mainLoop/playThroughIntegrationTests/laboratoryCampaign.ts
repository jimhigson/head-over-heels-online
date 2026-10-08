import { basicEmptyRoom } from "../../../_testUtils/basicRoom";
import { inferRoomJson } from "../../../model/RoomJson";

const laboratoryRoom = inferRoomJson({
  color: {
    hue: "yellow",
    shade: "dimmed",
  },
  id: "laboratory",
  items: {
    "conveyor@0,0,0": {
      config: {
        direction: "away",
        times: {
          y: 2,
        },
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      type: "conveyor",
    },
    "floor@0,0,0": {
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
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: {
        direction: "right",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
        ],
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: {
        direction: "towards",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
        ],
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      type: "wall",
    },
    br2: {
      config: {
        axis: "x",
        times: {
          x: 13,
        },
      },
      position: {
        x: 0,
        y: 2,
        z: 10,
      },
      type: "barrier",
    },
    "block@0,4,0": {
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
      type: "block",
    },
    b1: {
      config: {
        style: "book",
        times: {
          y: 6,
        },
      },
      position: {
        x: 0,
        y: 7,
        z: 10,
      },
      type: "block",
    },
    db1: {
      config: {
        style: "volcano",
      },
      position: {
        x: 0,
        y: 11,
        z: 0,
      },
      type: "deadlyBlock",
    },
    db: {
      config: {
        style: "toaster",
      },
      position: {
        x: 0,
        y: 13,
        z: 0,
      },
      type: "deadlyBlock",
    },
    b: {
      config: {
        style: "book",
        times: {
          x: 14,
        },
      },
      position: {
        x: 0,
        y: 13,
        z: 10,
      },
      type: "block",
    },
    "wall@0,14,0": {
      config: {
        direction: "away",
        tiles: [
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
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
        x: 0,
        y: 14,
        z: 0,
      },
      type: "wall",
    },
    "teleporter@1,0,0": {
      config: {
        toPosition: {
          x: 1,
          y: 0,
          z: 0,
        },
        toRoom: "nowhere",
      },
      position: {
        x: 1,
        y: 0,
        z: 0,
      },
      type: "teleporter",
    },
    b3: {
      config: {
        style: "book",
        times: {
          x: 13,
        },
      },
      position: {
        x: 1,
        y: 10,
        z: 10,
      },
      type: "block",
    },
    b7: {
      config: {
        style: "book",
        times: {
          x: 4,
          y: 2,
        },
      },
      position: {
        x: 1,
        y: 11,
        z: 10,
      },
      type: "block",
    },
    "block@3,3,8": {
      config: {
        style: "organic",
      },
      position: {
        x: 3,
        y: 3,
        z: 8,
      },
      type: "block",
    },
    "block@3,5,8": {
      config: {
        style: "organic",
      },
      position: {
        x: 3,
        y: 5,
        z: 8,
      },
      type: "block",
    },
    "conveyor@3,6,0": {
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
      type: "conveyor",
    },
    "conveyor@3,9,0": {
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
      type: "conveyor",
    },
    "block@4,3,0": {
      config: {
        style: "artificial",
      },
      position: {
        x: 4,
        y: 3,
        z: 0,
      },
      type: "block",
    },
    "conveyor@4,6,0": {
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
      type: "conveyor",
    },
    "conveyor@4,6,5": {
      config: {
        direction: "right",
      },
      position: {
        x: 4,
        y: 6,
        z: 5,
      },
      type: "conveyor",
    },
    b9: {
      config: {
        style: "book",
        times: {
          z: 2,
        },
      },
      position: {
        x: 4,
        y: 9,
        z: 10,
      },
      type: "block",
    },
    "block@5,0,0": {
      config: {
        style: "organic",
      },
      position: {
        x: 5,
        y: 0,
        z: 0,
      },
      type: "block",
    },
    "block@6,6,2": {
      config: {
        style: "organic",
      },
      position: {
        x: 6,
        y: 6,
        z: 2,
      },
      type: "block",
    },
    "conveyor@6,7,0": {
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
      type: "conveyor",
    },
    "wall@7,0,0": {
      config: {
        direction: "towards",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
        ],
      },
      position: {
        x: 7,
        y: 0,
        z: 0,
      },
      type: "wall",
    },
    "block@8,0,0": {
      config: {
        style: "organic",
      },
      position: {
        x: 8,
        y: 0,
        z: 0,
      },
      type: "block",
    },
    "block@9,0,0": {
      config: {
        disappearing: {
          on: "stand",
        },
        style: "organic",
        times: {
          x: 3,
        },
      },
      position: {
        x: 9,
        y: 0,
        z: 0,
      },
      type: "block",
    },
    "block@9,0,1": {
      config: {
        disappearing: {
          on: "stand",
        },
        style: "organic",
      },
      position: {
        x: 9,
        y: 0,
        z: 1,
      },
      type: "block",
    },
    "block@9,0,3": {
      config: {
        disappearing: {
          on: "stand",
        },
        style: "organic",
      },
      position: {
        x: 9,
        y: 0,
        z: 3,
      },
      type: "block",
    },
    "barrier@10,6,0": {
      config: {
        axis: "x",
      },
      position: {
        x: 10,
        y: 6,
        z: 0,
      },
      type: "barrier",
    },
    "barrier@10,8,0": {
      config: {
        axis: "x",
      },
      position: {
        x: 10,
        y: 8,
        z: 0,
      },
      type: "barrier",
    },
    b10: {
      config: {
        style: "book",
        times: {
          y: 10,
        },
      },
      position: {
        x: 13,
        y: 0,
        z: 10,
      },
      type: "block",
    },
    "block@13,3,3": {
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
      type: "block",
    },
    "block@13,4,2": {
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
      type: "block",
    },
    "block@13,5,0": {
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
      type: "block",
    },
    "block@13,7,0": {
      config: {
        style: "tower",
      },
      position: {
        x: 13,
        y: 7,
        z: 0,
      },
      type: "block",
    },
    b11: {
      config: {
        style: "book",
        times: {
          y: 2,
        },
      },
      position: {
        x: 13,
        y: 11,
        z: 10,
      },
      type: "block",
    },
    mr1: {
      config: {
        orientation: "awayRight",
      },
      position: {
        x: 14,
        y: 0,
        z: 1,
      },
      type: "mirror",
    },
    "block@14,3,0": {
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
      type: "block",
    },
    b4: {
      config: {
        style: "book",
        times: {
          y: 4,
        },
      },
      position: {
        x: 14,
        y: 10,
        z: 10,
      },
      type: "block",
    },
    b12: {
      config: {
        style: "book",
      },
      position: {
        x: 15,
        y: 0,
        z: 10,
      },
      type: "block",
    },
    b2: {
      config: {
        style: "book",
        times: {
          y: 14,
        },
      },
      position: {
        x: 16,
        y: 0,
        z: 10,
      },
      type: "block",
    },
    la1: {
      config: {
        activated: true,
        direction: "towards",
        times: {
          z: 2,
        },
      },
      position: {
        x: 16,
        y: 2,
        z: 2,
      },
      type: "lamp",
    },
    mr: {
      config: {
        orientation: "awayLeft",
        times: {
          z: 2,
        },
      },
      position: {
        x: 17,
        y: 0,
        z: 0,
      },
      type: "mirror",
    },
    b5: {
      config: {
        style: "organic",
        times: {
          z: 5,
        },
      },
      position: {
        x: 17,
        y: 0,
        z: 10,
      },
      type: "block",
    },
    "deadlyBlock@17,2,0": {
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
      type: "deadlyBlock",
    },
    la: {
      config: {
        activated: true,
        direction: "towards",
      },
      position: {
        x: 17,
        y: 2,
        z: 1,
      },
      type: "lamp",
    },
    la2: {
      config: {
        activated: true,
        direction: "right",
      },
      position: {
        x: 17,
        y: 2,
        z: 11,
      },
      type: "lamp",
    },
    "deadlyBlock@17,3,1": {
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
      type: "deadlyBlock",
    },
    "deadlyBlock@17,4,2": {
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
      type: "deadlyBlock",
    },
    "deadlyBlock@17,5,3": {
      config: {
        style: "volcano",
      },
      position: {
        x: 17,
        y: 5,
        z: 3,
      },
      type: "deadlyBlock",
    },
    b13: {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 17,
        y: 9,
        z: 12,
      },
    },
    b6: {
      config: {
        style: "organic",
        times: {
          z: 5,
        },
      },
      position: {
        x: 17,
        y: 10,
        z: 10,
      },
      type: "block",
    },
    b8: {
      config: {
        style: "organic",
        times: {
          z: 7,
        },
      },
      position: {
        x: 17,
        y: 13,
        z: 11,
      },
      type: "block",
    },
    "wall@18,0,0": {
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
      type: "wall",
    },
    "block@15.5,8,0": {
      config: {
        style: "artificial",
      },
      position: {
        x: 15.5,
        y: 8,
        z: 0,
      },
      type: "block",
    },
    "block@16,8.5,1": {
      config: {
        style: "artificial",
      },
      position: {
        x: 16,
        y: 8.5,
        z: 1,
      },
      type: "block",
    },
    br: {
      config: {
        axis: "y",
        times: {
          z: 2,
        },
      },
      position: {
        x: 6.625,
        y: 6,
        z: 0,
      },
      type: "barrier",
    },
    br1: {
      config: {
        axis: "x",
        times: {
          z: 2,
        },
      },
      position: {
        x: 3,
        y: 5.375,
        z: 0,
      },
      type: "barrier",
    },
    co1: {
      type: "conveyor",
      config: {
        direction: "left",
        times: {
          x: 12,
        },
      },
      position: {
        x: 1.125,
        y: 13,
        z: 15,
      },
    },
    co: {
      type: "conveyor",
      config: {
        direction: "left",
        times: {
          x: 9,
        },
      },
      position: {
        x: 3.125,
        y: 13,
        z: 18,
      },
    },
    "ball@10,4,0": {
      config: {},
      position: {
        x: 10,
        y: 4,
        z: 0,
      },
      type: "ball",
    },
    "ball@7,2,0": {
      config: {},
      position: {
        x: 7,
        y: 2,
        z: 0,
      },
      type: "ball",
    },
    "ball@7,4,0": {
      config: {},
      position: {
        x: 7,
        y: 4,
        z: 0,
      },
      type: "ball",
    },
    "ball@9,4,0": {
      config: {},
      position: {
        x: 9,
        y: 4,
        z: 0,
      },
      type: "ball",
    },
    "barrier@10,6,1": {
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
      type: "barrier",
    },
    "barrier@10,8,1": {
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
      type: "barrier",
    },
    bu: {
      config: {
        modifies: [
          {
            activates: false,
            expectType: "lamp",
          },
        ],
      },
      position: {
        x: 15,
        y: 13,
        z: 0,
      },
      type: "button",
    },
    ch1: {
      config: {},
      position: {
        x: 3,
        y: 3,
        z: 9,
      },
      type: "charles",
    },
    ch2: {
      config: {},
      position: {
        x: 3,
        y: 5,
        z: 9,
      },
      type: "charles",
    },
    db2: {
      config: {
        style: "toaster",
      },
      position: {
        x: 1,
        y: 13,
        z: 0,
      },
      type: "deadlyBlock",
    },
    "door@5,0,2": {
      config: {
        direction: "towards",
        toRoom: "nowhere",
      },
      position: {
        x: 5,
        y: 0,
        z: 2,
      },
      type: "door",
    },
    e: {
      config: {
        emits: {
          config: {
            direction: "right",
          },
          type: "firedDoughnut",
        },
        maximum: 40,
        period: 20_000,
      },
      position: {
        x: 12,
        y: 12,
        z: 10,
      },
      type: "emitter",
    },
    "emitter@17,0,7": {
      config: {
        emits: {
          config: {
            activated: "on",
            movement: "towards-on-shortest-axis-xy4",
            startDirection: "away",
            which: "cyberman",
          },
          type: "monster",
        },
        maximum: 5,
        period: 1_000,
      },
      position: {
        x: 17,
        y: 0,
        z: 7,
      },
      type: "emitter",
    },
    heels: {
      config: {
        which: "heels",
      },
      position: {
        x: 16,
        y: 9,
        z: 24,
      },
      type: "player",
    },
    "joystick@4,1,0": {
      config: {
        controls: ["ch1"],
      },
      position: {
        x: 4,
        y: 1,
        z: 0,
      },
      type: "joystick",
    },
    "joystick@5,3,0": {
      config: {
        controls: ["ch2"],
      },
      position: {
        x: 5,
        y: 3,
        z: 0,
      },
      type: "joystick",
    },
    "lift@0,4,3": {
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 0,
        y: 4,
        z: 3,
      },
      type: "lift",
    },
    "lift@1,4,2": {
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 1,
        y: 4,
        z: 2,
      },
      type: "lift",
    },
    "lift@13,6,1": {
      config: {
        bottom: 1,
        top: 2,
      },
      position: {
        x: 13,
        y: 6,
        z: 1,
      },
      type: "lift",
    },
    "lift@2,4,1": {
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 2,
        y: 4,
        z: 1,
      },
      type: "lift",
    },
    "lift@3,4,0": {
      config: {
        bottom: 0,
        top: 11,
      },
      position: {
        x: 3,
        y: 4,
        z: 0,
      },
      type: "lift",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: {
        x: 17,
        y: 0,
        z: 15,
      },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: {
        x: 0,
        y: 9,
        z: 12,
      },
      type: "monster",
    },
    m10: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "left",
        which: "cyberman",
      },
      position: {
        x: 0,
        y: 11,
        z: 1,
      },
      type: "monster",
    },
    m11: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        startDirection: "towards",
        which: "monkey",
      },
      position: {
        x: 1,
        y: 12.875,
        z: 18,
      },
      type: "monster",
    },
    m12: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: {
        x: 1,
        y: 2,
        z: 11,
      },
      type: "monster",
    },
    m2: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: {
        x: 17,
        y: 10,
        z: 15,
      },
      type: "monster",
    },
    m3: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: {
        x: 17,
        y: 13,
        z: 18,
      },
      type: "monster",
    },
    m4: {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: {
        x: 10,
        y: 7,
        z: 6,
      },
      type: "monster",
    },
    m5: {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "towards",
        which: "elephantHead",
      },
      position: {
        x: 4,
        y: 9,
        z: 12,
      },
      type: "monster",
    },
    m6: {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "towards",
        which: "elephantHead",
      },
      position: {
        x: 13,
        y: 1,
        z: 3,
      },
      type: "monster",
    },
    m7: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: {
        x: 6,
        y: 6,
        z: 3,
      },
      type: "monster",
    },
    m8: {
      config: {
        activated: "off",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: {
        x: 0,
        y: 13,
        z: 1,
      },
      type: "monster",
    },
    m9: {
      config: {
        activated: "after-player-near",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "right",
        which: "cyberman",
      },
      position: {
        x: 1,
        y: 13,
        z: 1,
      },
      type: "monster",
    },
    "monster@0,4,1": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "left",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: {
        x: 0,
        y: 4,
        z: 1,
      },
      type: "monster",
    },
    "monster@1,7,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: {
        x: 1,
        y: 7,
        z: 0,
      },
      type: "monster",
    },
    "monster@1,8,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "away",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: {
        x: 1,
        y: 8,
        z: 0,
      },
      type: "monster",
    },
    "monster@2,8,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: {
        x: 2,
        y: 8,
        z: 0,
      },
      type: "monster",
    },
    "monster@4,0,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "away",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: {
        x: 4,
        y: 0,
        z: 0,
      },
      type: "monster",
    },
    "monster@4,2,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "away",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: {
        x: 4,
        y: 2,
        z: 0,
      },
      type: "monster",
    },
    "monster@4,8,5": {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "away",
        which: "cyberman",
      },
      position: {
        x: 4,
        y: 8,
        z: 5,
      },
      type: "monster",
    },
    mp: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
      },
      position: {
        x: 16,
        y: 13,
        z: 12,
      },
      type: "movingPlatform",
    },
    mp1: {
      config: {
        activated: "on",
        movement: "towards-analogue",
        startDirection: "towards",
      },
      position: {
        x: 12.375,
        y: 7.5,
        z: 11,
      },
      type: "movingPlatform",
    },
    pi: {
      config: {
        gives: "shield",
      },
      position: {
        x: 15.75,
        y: 9.75,
        z: 23,
      },
      type: "pickup",
    },
    "pickup@0,4,9": {
      config: {
        gives: "doughnuts",
      },
      position: {
        x: 0,
        y: 5,
        z: 7,
      },
      type: "pickup",
    },
    "pickup@1,4,9": {
      config: {
        gives: "hooter",
      },
      position: {
        x: 1,
        y: 4,
        z: 9,
      },
      type: "pickup",
    },
    "pickup@12,0,0": {
      config: {
        gives: "bag",
      },
      position: {
        x: 12,
        y: 0,
        z: 0,
      },
      type: "pickup",
    },
    "pickup@17,1,0": {
      config: {
        gives: "shield",
      },
      position: {
        x: 17,
        y: 1,
        z: 0,
      },
      type: "pickup",
    },
    "pickup@3,5,11": {
      config: {
        gives: "reincarnation",
      },
      position: {
        x: 3,
        y: 5,
        z: 11,
      },
      type: "pickup",
    },
    "pickup@4,6,1": {
      config: {
        gives: "reincarnation",
      },
      position: {
        x: 4,
        y: 6,
        z: 1,
      },
      type: "pickup",
    },
    "pickup@4,6,10": {
      config: {
        gives: "bag",
      },
      position: {
        x: 4,
        y: 6,
        z: 10,
      },
      type: "pickup",
    },
    "pickup@4,6,13": {
      config: {
        gives: "reincarnation",
      },
      position: {
        x: 4,
        y: 6,
        z: 13,
      },
      type: "pickup",
    },
    "pickup@4,6,9": {
      config: {
        gives: "extra-life",
      },
      position: {
        x: 4,
        y: 6,
        z: 9,
      },
      type: "pickup",
    },
    "portableBlock@0,0,2": {
      config: {
        style: "cube",
      },
      position: {
        x: 0,
        y: 0,
        z: 2,
      },
      type: "portableBlock",
    },
    "portableBlock@0,0,7": {
      config: {
        style: "cube",
      },
      position: {
        x: 0,
        y: 0,
        z: 5,
      },
      type: "portableBlock",
    },
    "portableBlock@13,1,0": {
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 1,
        z: 0,
      },
      type: "portableBlock",
    },
    "portableBlock@13,1,1": {
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 1,
        z: 1,
      },
      type: "portableBlock",
    },
    "portableBlock@13,1,2": {
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 1,
        z: 2,
      },
      type: "portableBlock",
    },
    "portableBlock@13,2,0": {
      config: {
        style: "sticks",
      },
      position: {
        x: 13,
        y: 2,
        z: 0,
      },
      type: "portableBlock",
    },
    "portableBlock@13,3,0": {
      config: {
        style: "drum",
      },
      position: {
        x: 13,
        y: 3,
        z: 0,
      },
      type: "portableBlock",
    },
    "portableBlock@13,3,4": {
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 3,
        z: 4,
      },
      type: "portableBlock",
    },
    "portableBlock@13,4,0": {
      config: {
        style: "cube",
      },
      position: {
        x: 13,
        y: 4,
        z: 0,
      },
      type: "portableBlock",
    },
    "portableBlock@3,13,0": {
      config: {
        style: "cube",
      },
      position: {
        x: 3,
        y: 13,
        z: 0,
      },
      type: "portableBlock",
    },
    "portableBlock@4,13,0": {
      config: {
        style: "cube",
      },
      position: {
        x: 4,
        y: 13,
        z: 0,
      },
      type: "portableBlock",
    },
    "portableBlock@4,6,2": {
      config: {
        style: "drum",
      },
      position: {
        x: 4,
        y: 6,
        z: 2,
      },
      type: "portableBlock",
    },
    "portableBlock@5,13,0": {
      config: {
        style: "cube",
      },
      position: {
        x: 5,
        y: 13,
        z: 0,
      },
      type: "portableBlock",
    },
    "portableBlock@5,6,10": {
      config: {
        style: "cube",
      },
      position: {
        x: 5,
        y: 6,
        z: 10,
      },
      type: "portableBlock",
    },
    "pushableBlock@1,6,0": {
      config: {},
      position: {
        x: 1,
        y: 6,
        z: 0,
      },
      type: "pushableBlock",
    },
    "pushableBlock@1,6,1": {
      config: {},
      position: {
        x: 1,
        y: 6,
        z: 1,
      },
      type: "pushableBlock",
    },
    "pushableBlock@1,6,2": {
      config: {},
      position: {
        x: 1,
        y: 6,
        z: 2,
      },
      type: "pushableBlock",
    },
    "pushableBlock@10,7,0": {
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 0,
      },
      type: "pushableBlock",
    },
    "pushableBlock@10,7,1": {
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 1,
      },
      type: "pushableBlock",
    },
    "pushableBlock@10,7,2": {
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 2,
      },
      type: "pushableBlock",
    },
    "pushableBlock@10,7,3": {
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 3,
      },
      type: "pushableBlock",
    },
    "pushableBlock@10,7,4": {
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 4,
      },
      type: "pushableBlock",
    },
    "pushableBlock@10,7,5": {
      config: {},
      position: {
        x: 10,
        y: 7,
        z: 5,
      },
      type: "pushableBlock",
    },
    "pushableBlock@2,6,0": {
      config: {},
      position: {
        x: 2,
        y: 6,
        z: 0,
      },
      type: "pushableBlock",
    },
    "pushableBlock@2,6,1": {
      config: {},
      position: {
        x: 2,
        y: 6,
        z: 1,
      },
      type: "pushableBlock",
    },
    "pushableBlock@2,6,2": {
      config: {},
      position: {
        x: 2,
        y: 6,
        z: 2,
      },
      type: "pushableBlock",
    },
    "pushableBlock@2,9,0": {
      config: {},
      position: {
        x: 2,
        y: 9,
        z: 0,
      },
      type: "pushableBlock",
    },
    sb: {
      config: {
        style: "book",
      },
      position: {
        x: 0,
        y: 9,
        z: 11,
      },
      type: "slidingBlock",
    },
    sb1: {
      config: {
        style: "book",
      },
      position: {
        x: 2,
        y: 10,
        z: 11,
      },
      type: "slidingBlock",
    },
    "spring@13,0,0": {
      config: {},
      position: {
        x: 13,
        y: 0,
        z: 0,
      },
      type: "spring",
    },
    "spring@14,0,0": {
      config: {},
      position: {
        x: 14,
        y: 0,
        z: 0,
      },
      type: "spring",
    },
    sw: {
      config: {
        initialSetting: "left",
        modifies: [
          {
            activates: true,
            expectType: "monster",
            targets: ["m", "m1", "m2", "m3"],
          },
        ],
      },
      position: {
        x: 5,
        y: 12,
        z: 10,
      },
      type: "switch",
    },
    sw1: {
      config: {
        initialSetting: "left",
        modifies: [
          {
            expectType: "conveyor",
            reverses: false,
          },
        ],
      },
      position: {
        x: 0,
        y: 7,
        z: 11,
      },
      type: "switch",
    },
    "switch@17,12,0": {
      config: {
        initialSetting: "left",
        modifies: [
          {
            expectType: "monster",
            leftState: {
              activated: false,
            },
            rightState: {
              activated: true,
              everActivated: true,
            },
            targets: ["t1"],
          },
        ],
        type: "in-room",
      },
      position: {
        x: 17,
        y: 12,
        z: 0,
      },
      type: "switch",
    },
    t1: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
        which: "turtle",
      },
      position: {
        x: 16,
        y: 13,
        z: 1,
      },
      type: "monster",
    },
    t2: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "left",
        which: "turtle",
      },
      position: {
        x: 12,
        y: 12,
        z: 0,
      },
      type: "monster",
    },
    pi1: {
      type: "pickup",
      config: {
        gives: "bag",
      },
      position: {
        x: 16.5,
        y: 9,
        z: 15,
      },
    },
    pr: {
      type: "portableBlock",
      config: {
        style: "drum",
      },
      position: {
        x: 15.75,
        y: 9.75,
        z: 21,
      },
    },
    m13: {
      type: "monster",
      config: {
        which: "skiHead",
        style: "greenAndPink",
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
      },
      position: {
        x: 10.25,
        y: 13.125,
        z: 19,
      },
    },
    sw2: {
      type: "switch",
      config: {
        initialSetting: "left",
        modifies: [
          {
            expectType: "monster",
            switchedDirection: "left",
            targets: ["m13"],
          },
        ],
      },
      position: {
        x: 2.25,
        y: 13,
        z: 19,
      },
    },
    sw3: {
      type: "switch",
      config: {
        initialSetting: "left",
        modifies: [
          {
            expectType: "monster",
            switchedDirection: "right",
            targets: ["m13"],
          },
        ],
      },
      position: {
        x: 12.875,
        y: 13,
        z: 16,
      },
    },
  },
  planet: "egyptus",
});

/** a campaign holding the complex, deterministic "laboratory" room */
export const laboratoryCampaign = {
  locator: {
    campaignName: "basicGameStateTestCampaign",
    userId: "anon",
    version: 0,
  },
  rooms: {
    laboratory: laboratoryRoom,
    nowhere: basicEmptyRoom("nowhere"),
  },
};
