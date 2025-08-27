import { expect, test } from "vitest";

import { campaign } from "../../../../../../_generated/originalCampaign/campaign";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";

test("starting room finds only two rooms", () => {
  expect(
    sortRoomGridPositions(
      roomGridPositions({
        campaign,
        roomId: "blacktooth1head",
      }),
    ),
  ).toMatchInlineSnapshot(`
    {
      "blacktooth10/left": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 7,
          "y": 8,
          "z": 0,
        },
        "roomId": "blacktooth10",
        "subRoomId": "left",
      },
      "blacktooth10/right": {
        "boundaries": {
          "away": "wall",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 6,
          "y": 8,
          "z": 0,
        },
        "roomId": "blacktooth10",
        "subRoomId": "right",
      },
      "blacktooth11/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 8,
          "z": 0,
        },
        "roomId": "blacktooth11",
        "subRoomId": "*",
      },
      "blacktooth12/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 8,
          "z": 0,
        },
        "roomId": "blacktooth12",
        "subRoomId": "*",
      },
      "blacktooth13/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 10,
          "y": 8,
          "z": 0,
        },
        "roomId": "blacktooth13",
        "subRoomId": "*",
      },
      "blacktooth14/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 11,
          "y": 8,
          "z": 0,
        },
        "roomId": "blacktooth14",
        "subRoomId": "*",
      },
      "blacktooth15/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 10,
          "y": 9,
          "z": 0,
        },
        "roomId": "blacktooth15",
        "subRoomId": "*",
      },
      "blacktooth16/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 10,
          "y": 10,
          "z": 0,
        },
        "roomId": "blacktooth16",
        "subRoomId": "*",
      },
      "blacktooth17triple/left": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 12,
          "y": 10,
          "z": 0,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "left",
      },
      "blacktooth17triple/middle": {
        "boundaries": {
          "away": "open",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 11,
          "y": 10,
          "z": 0,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "middle",
      },
      "blacktooth17triple/right": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 11,
          "y": 11,
          "z": 0,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "right",
      },
      "blacktooth18/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 12,
          "y": 11,
          "z": 0,
        },
        "roomId": "blacktooth18",
        "subRoomId": "*",
      },
      "blacktooth19/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 13,
          "y": 10,
          "z": 0,
        },
        "roomId": "blacktooth19",
        "subRoomId": "*",
      },
      "blacktooth1head/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "roomId": "blacktooth1head",
        "subRoomId": "*",
      },
      "blacktooth2/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 5,
          "y": 11,
          "z": 1,
        },
        "roomId": "blacktooth2",
        "subRoomId": "*",
      },
      "blacktooth20/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 13,
          "y": 11,
          "z": 0,
        },
        "roomId": "blacktooth20",
        "subRoomId": "*",
      },
      "blacktooth21fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 13,
          "y": 12,
          "z": 0,
        },
        "roomId": "blacktooth21fish",
        "subRoomId": "*",
      },
      "blacktooth22/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 13,
          "y": 13,
          "z": 0,
        },
        "roomId": "blacktooth22",
        "subRoomId": "*",
      },
      "blacktooth23heels/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -1,
          "y": 0,
          "z": 0,
        },
        "roomId": "blacktooth23heels",
        "subRoomId": "*",
      },
      "blacktooth24/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": 4,
          "z": -2,
        },
        "roomId": "blacktooth24",
        "subRoomId": "*",
      },
      "blacktooth25/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 4,
          "z": -2,
        },
        "roomId": "blacktooth25",
        "subRoomId": "*",
      },
      "blacktooth26/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 4,
          "z": -1,
        },
        "roomId": "blacktooth26",
        "subRoomId": "*",
      },
      "blacktooth27fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 9,
          "y": 5,
          "z": -1,
        },
        "roomId": "blacktooth27fish",
        "subRoomId": "*",
      },
      "blacktooth28/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": 5,
          "z": -1,
        },
        "roomId": "blacktooth28",
        "subRoomId": "*",
      },
      "blacktooth29/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 9,
          "y": 6,
          "z": -1,
        },
        "roomId": "blacktooth29",
        "subRoomId": "*",
      },
      "blacktooth3/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 5,
          "y": 10,
          "z": 1,
        },
        "roomId": "blacktooth3",
        "subRoomId": "*",
      },
      "blacktooth30/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 6,
          "z": 0,
        },
        "roomId": "blacktooth30",
        "subRoomId": "*",
      },
      "blacktooth31/left": {
        "boundaries": {
          "away": "open",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": 6,
          "z": 0,
        },
        "roomId": "blacktooth31",
        "subRoomId": "left",
      },
      "blacktooth31/right": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 8,
          "y": 7,
          "z": 0,
        },
        "roomId": "blacktooth31",
        "subRoomId": "right",
      },
      "blacktooth32/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 9,
          "z": 0,
        },
        "roomId": "blacktooth32",
        "subRoomId": "*",
      },
      "blacktooth33/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 10,
          "z": 0,
        },
        "roomId": "blacktooth33",
        "subRoomId": "*",
      },
      "blacktooth34/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": 10,
          "z": 1,
        },
        "roomId": "blacktooth34",
        "subRoomId": "*",
      },
      "blacktooth35/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 11,
          "z": 1,
        },
        "roomId": "blacktooth35",
        "subRoomId": "left",
      },
      "blacktooth35/right": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 8,
          "y": 12,
          "z": 1,
        },
        "roomId": "blacktooth35",
        "subRoomId": "right",
      },
      "blacktooth36/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 12,
          "z": 1,
        },
        "roomId": "blacktooth36",
        "subRoomId": "*",
      },
      "blacktooth37/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 9,
          "y": 13,
          "z": 1,
        },
        "roomId": "blacktooth37",
        "subRoomId": "*",
      },
      "blacktooth38/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 9,
          "y": 14,
          "z": 1,
        },
        "roomId": "blacktooth38",
        "subRoomId": "*",
      },
      "blacktooth39/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 14,
          "z": 0,
        },
        "roomId": "blacktooth39",
        "subRoomId": "*",
      },
      "blacktooth4/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 5,
          "y": 10,
          "z": 0,
        },
        "roomId": "blacktooth4",
        "subRoomId": "*",
      },
      "blacktooth40fish/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 9,
          "y": 15,
          "z": 0,
        },
        "roomId": "blacktooth40fish",
        "subRoomId": "left",
      },
      "blacktooth40fish/right": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 9,
          "y": 16,
          "z": 0,
        },
        "roomId": "blacktooth40fish",
        "subRoomId": "right",
      },
      "blacktooth41/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 10,
          "y": 14,
          "z": 0,
        },
        "roomId": "blacktooth41",
        "subRoomId": "*",
      },
      "blacktooth42/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 11,
          "y": 14,
          "z": 0,
        },
        "roomId": "blacktooth42",
        "subRoomId": "*",
      },
      "blacktooth43/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 12,
          "y": 14,
          "z": 0,
        },
        "roomId": "blacktooth43",
        "subRoomId": "*",
      },
      "blacktooth44market/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 13,
          "y": 13,
          "z": -1,
        },
        "roomId": "blacktooth44market",
        "subRoomId": "*",
      },
      "blacktooth45market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 12,
          "y": 13,
          "z": -1,
        },
        "roomId": "blacktooth45market",
        "subRoomId": "*",
      },
      "blacktooth46market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 12,
          "y": 14,
          "z": -1,
        },
        "roomId": "blacktooth46market",
        "subRoomId": "*",
      },
      "blacktooth47market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 12,
          "y": 15,
          "z": -1,
        },
        "roomId": "blacktooth47market",
        "subRoomId": "*",
      },
      "blacktooth48market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 12,
          "y": 16,
          "z": -1,
        },
        "roomId": "blacktooth48market",
        "subRoomId": "*",
      },
      "blacktooth49market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 13,
          "y": 16,
          "z": -1,
        },
        "roomId": "blacktooth49market",
        "subRoomId": "*",
      },
      "blacktooth5/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 5,
          "y": 9,
          "z": 0,
        },
        "roomId": "blacktooth5",
        "subRoomId": "*",
      },
      "blacktooth50market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 14,
          "y": 16,
          "z": -1,
        },
        "roomId": "blacktooth50market",
        "subRoomId": "*",
      },
      "blacktooth51/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 14,
          "y": 15,
          "z": -1,
        },
        "roomId": "blacktooth51",
        "subRoomId": "*",
      },
      "blacktooth52market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 15,
          "y": 16,
          "z": -1,
        },
        "roomId": "blacktooth52market",
        "subRoomId": "*",
      },
      "blacktooth53market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 15,
          "y": 17,
          "z": -1,
        },
        "roomId": "blacktooth53market",
        "subRoomId": "*",
      },
      "blacktooth54/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 15,
          "y": 18,
          "z": -1,
        },
        "roomId": "blacktooth54",
        "subRoomId": "*",
      },
      "blacktooth55/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 15,
          "y": 18,
          "z": -2,
        },
        "roomId": "blacktooth55",
        "subRoomId": "*",
      },
      "blacktooth56/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 14,
          "y": 18,
          "z": -2,
        },
        "roomId": "blacktooth56",
        "subRoomId": "*",
      },
      "blacktooth57/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 13,
          "y": 18,
          "z": -2,
        },
        "roomId": "blacktooth57",
        "subRoomId": "*",
      },
      "blacktooth58triple/left": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 14,
          "y": 19,
          "z": -2,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "left",
      },
      "blacktooth58triple/middle": {
        "boundaries": {
          "away": "open",
          "left": "open",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 13,
          "y": 19,
          "z": -2,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "middle",
      },
      "blacktooth58triple/right": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 13,
          "y": 20,
          "z": -2,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "right",
      },
      "blacktooth59/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 13,
          "y": 21,
          "z": -2,
        },
        "roomId": "blacktooth59",
        "subRoomId": "*",
      },
      "blacktooth6/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 6,
          "y": 9,
          "z": 0,
        },
        "roomId": "blacktooth6",
        "subRoomId": "*",
      },
      "blacktooth60/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 13,
          "y": 22,
          "z": -2,
        },
        "roomId": "blacktooth60",
        "subRoomId": "*",
      },
      "blacktooth61/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 15,
          "y": 19,
          "z": -2,
        },
        "roomId": "blacktooth61",
        "subRoomId": "*",
      },
      "blacktooth62fish/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 15,
          "y": 20,
          "z": -2,
        },
        "roomId": "blacktooth62fish",
        "subRoomId": "left",
      },
      "blacktooth62fish/right": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "open",
        },
        "gridPosition": {
          "x": 15,
          "y": 21,
          "z": -2,
        },
        "roomId": "blacktooth62fish",
        "subRoomId": "right",
      },
      "blacktooth63/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 14,
          "y": 21,
          "z": -2,
        },
        "roomId": "blacktooth63",
        "subRoomId": "*",
      },
      "blacktooth64/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 43,
          "y": 40,
          "z": -2,
        },
        "roomId": "blacktooth64",
        "subRoomId": "*",
      },
      "blacktooth65/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 43,
          "y": 41,
          "z": -2,
        },
        "roomId": "blacktooth65",
        "subRoomId": "*",
      },
      "blacktooth66/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 43,
          "y": 42,
          "z": -2,
        },
        "roomId": "blacktooth66",
        "subRoomId": "*",
      },
      "blacktooth67/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 42,
          "y": 42,
          "z": -2,
        },
        "roomId": "blacktooth67",
        "subRoomId": "*",
      },
      "blacktooth68/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 43,
          "y": 43,
          "z": -2,
        },
        "roomId": "blacktooth68",
        "subRoomId": "*",
      },
      "blacktooth69/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 41,
          "y": 42,
          "z": -2,
        },
        "roomId": "blacktooth69",
        "subRoomId": "*",
      },
      "blacktooth7/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 5,
          "y": 8,
          "z": 0,
        },
        "roomId": "blacktooth7",
        "subRoomId": "*",
      },
      "blacktooth70/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 42,
          "y": 43,
          "z": -2,
        },
        "roomId": "blacktooth70",
        "subRoomId": "*",
      },
      "blacktooth71/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 42,
          "y": 44,
          "z": -2,
        },
        "roomId": "blacktooth71",
        "subRoomId": "*",
      },
      "blacktooth72/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 42,
          "y": 45,
          "z": -2,
        },
        "roomId": "blacktooth72",
        "subRoomId": "*",
      },
      "blacktooth73/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 43,
          "y": 45,
          "z": -2,
        },
        "roomId": "blacktooth73",
        "subRoomId": "*",
      },
      "blacktooth74/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 44,
          "y": 45,
          "z": -2,
        },
        "roomId": "blacktooth74",
        "subRoomId": "*",
      },
      "blacktooth75/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 44,
          "y": 44,
          "z": -2,
        },
        "roomId": "blacktooth75",
        "subRoomId": "*",
      },
      "blacktooth76/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 44,
          "y": 43,
          "z": -2,
        },
        "roomId": "blacktooth76",
        "subRoomId": "*",
      },
      "blacktooth77/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 41,
          "y": 44,
          "z": -2,
        },
        "roomId": "blacktooth77",
        "subRoomId": "*",
      },
      "blacktooth78/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 41,
          "y": 45,
          "z": -2,
        },
        "roomId": "blacktooth78",
        "subRoomId": "*",
      },
      "blacktooth79fish/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 41,
          "y": 45,
          "z": -1,
        },
        "roomId": "blacktooth79fish",
        "subRoomId": "*",
      },
      "blacktooth80/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 41,
          "y": 46,
          "z": -2,
        },
        "roomId": "blacktooth80",
        "subRoomId": "*",
      },
      "blacktooth81/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 41,
          "y": 47,
          "z": -2,
        },
        "roomId": "blacktooth81",
        "subRoomId": "*",
      },
      "blacktooth82/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 42,
          "y": 47,
          "z": -2,
        },
        "roomId": "blacktooth82",
        "subRoomId": "*",
      },
      "blacktooth83tofreedom/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 43,
          "y": 47,
          "z": -2,
        },
        "roomId": "blacktooth83tofreedom",
        "subRoomId": "*",
      },
      "blacktooth84/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 40,
          "y": 44,
          "z": -2,
        },
        "roomId": "blacktooth84",
        "subRoomId": "*",
      },
      "blacktooth85/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 39,
          "y": 44,
          "z": -2,
        },
        "roomId": "blacktooth85",
        "subRoomId": "*",
      },
      "blacktooth86/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 39,
          "y": 43,
          "z": -2,
        },
        "roomId": "blacktooth86",
        "subRoomId": "*",
      },
      "blacktooth87crown/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 39,
          "y": 42,
          "z": -2,
        },
        "roomId": "blacktooth87crown",
        "subRoomId": "*",
      },
      "blacktooth8fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 5,
          "y": 7,
          "z": 0,
        },
        "roomId": "blacktooth8fish",
        "subRoomId": "*",
      },
      "blacktooth9/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 4,
          "y": 7,
          "z": 0,
        },
        "roomId": "blacktooth9",
        "subRoomId": "*",
      },
      "finalroom/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 50,
          "y": 52,
          "z": -2,
        },
        "roomId": "finalroom",
        "subRoomId": "*",
      },
      "moonbase1/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 22,
          "y": 26,
          "z": -2,
        },
        "roomId": "moonbase1",
        "subRoomId": "*",
      },
      "moonbase10/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 28,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase10",
        "subRoomId": "*",
      },
      "moonbase11/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 28,
          "y": 30,
          "z": -2,
        },
        "roomId": "moonbase11",
        "subRoomId": "*",
      },
      "moonbase12/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 28,
          "y": 31,
          "z": -2,
        },
        "roomId": "moonbase12",
        "subRoomId": "*",
      },
      "moonbase13/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 23,
          "y": 28,
          "z": -2,
        },
        "roomId": "moonbase13",
        "subRoomId": "*",
      },
      "moonbase14/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 23,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase14",
        "subRoomId": "*",
      },
      "moonbase15/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 22,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase15",
        "subRoomId": "*",
      },
      "moonbase16/left": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "open",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 25,
          "y": 28,
          "z": -2,
        },
        "roomId": "moonbase16",
        "subRoomId": "left",
      },
      "moonbase16/right": {
        "boundaries": {
          "away": "wall",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 24,
          "y": 28,
          "z": -2,
        },
        "roomId": "moonbase16",
        "subRoomId": "right",
      },
      "moonbase17/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 25,
          "y": 27,
          "z": -2,
        },
        "roomId": "moonbase17",
        "subRoomId": "*",
      },
      "moonbase18/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 27,
          "y": 31,
          "z": -2,
        },
        "roomId": "moonbase18",
        "subRoomId": "*",
      },
      "moonbase19/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 29,
          "y": 30,
          "z": -2,
        },
        "roomId": "moonbase19",
        "subRoomId": "*",
      },
      "moonbase2/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 23,
          "y": 26,
          "z": -2,
        },
        "roomId": "moonbase2",
        "subRoomId": "*",
      },
      "moonbase20/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 30,
          "y": 30,
          "z": -2,
        },
        "roomId": "moonbase20",
        "subRoomId": "*",
      },
      "moonbase21tosafari/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 30,
          "y": 31,
          "z": -2,
        },
        "roomId": "moonbase21tosafari",
        "subRoomId": "*",
      },
      "moonbase22topenitentiary/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 30,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase22topenitentiary",
        "subRoomId": "*",
      },
      "moonbase23/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 31,
          "y": 30,
          "z": -2,
        },
        "roomId": "moonbase23",
        "subRoomId": "*",
      },
      "moonbase24toegyptus/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 31,
          "y": 31,
          "z": -2,
        },
        "roomId": "moonbase24toegyptus",
        "subRoomId": "*",
      },
      "moonbase25tobookworld/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 31,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase25tobookworld",
        "subRoomId": "*",
      },
      "moonbase26/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 32,
          "y": 30,
          "z": -2,
        },
        "roomId": "moonbase26",
        "subRoomId": "*",
      },
      "moonbase27/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 33,
          "y": 30,
          "z": -2,
        },
        "roomId": "moonbase27",
        "subRoomId": "*",
      },
      "moonbase28/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 33,
          "y": 31,
          "z": -2,
        },
        "roomId": "moonbase28",
        "subRoomId": "*",
      },
      "moonbase29/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 34,
          "y": 31,
          "z": -2,
        },
        "roomId": "moonbase29",
        "subRoomId": "*",
      },
      "moonbase3/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 23,
          "y": 27,
          "z": -2,
        },
        "roomId": "moonbase3",
        "subRoomId": "*",
      },
      "moonbase30/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 33,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase30",
        "subRoomId": "*",
      },
      "moonbase31/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 34,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase31",
        "subRoomId": "*",
      },
      "moonbase32/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 34,
          "y": 33,
          "z": -2,
        },
        "roomId": "moonbase32",
        "subRoomId": "*",
      },
      "moonbase33triple/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 34,
          "y": 34,
          "z": -2,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "left",
      },
      "moonbase33triple/middle": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "open",
        },
        "gridPosition": {
          "x": 34,
          "y": 35,
          "z": -2,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "middle",
      },
      "moonbase33triple/right": {
        "boundaries": {
          "away": "doorway",
          "left": "open",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 33,
          "y": 35,
          "z": -2,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "right",
      },
      "moonbase34/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 35,
          "y": 35,
          "z": -2,
        },
        "roomId": "moonbase34",
        "subRoomId": "*",
      },
      "moonbase35/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 35,
          "y": 36,
          "z": -2,
        },
        "roomId": "moonbase35",
        "subRoomId": "*",
      },
      "moonbase36/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 33,
          "y": 36,
          "z": -2,
        },
        "roomId": "moonbase36",
        "subRoomId": "*",
      },
      "moonbase4/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 21,
          "y": 26,
          "z": -2,
        },
        "roomId": "moonbase4",
        "subRoomId": "*",
      },
      "moonbase5/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 21,
          "y": 27,
          "z": -2,
        },
        "roomId": "moonbase5",
        "subRoomId": "*",
      },
      "moonbase6/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 21,
          "y": 28,
          "z": -2,
        },
        "roomId": "moonbase6",
        "subRoomId": "*",
      },
      "moonbase7/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 21,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase7",
        "subRoomId": "*",
      },
      "moonbase8/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 20,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase8",
        "subRoomId": "*",
      },
      "moonbase9/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 27,
          "y": 29,
          "z": -2,
        },
        "roomId": "moonbase9",
        "subRoomId": "*",
      },
    }
  `);
});

test("blacktooth2", () => {
  expect(
    sortRoomGridPositions(
      roomGridPositions({
        campaign,
        roomId: "blacktooth2",
      }),
    ),
  ).toMatchInlineSnapshot(`
    {
      "blacktooth10/left": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 2,
          "y": -3,
          "z": -1,
        },
        "roomId": "blacktooth10",
        "subRoomId": "left",
      },
      "blacktooth10/right": {
        "boundaries": {
          "away": "wall",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 1,
          "y": -3,
          "z": -1,
        },
        "roomId": "blacktooth10",
        "subRoomId": "right",
      },
      "blacktooth11/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 3,
          "y": -3,
          "z": -1,
        },
        "roomId": "blacktooth11",
        "subRoomId": "*",
      },
      "blacktooth12/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 4,
          "y": -3,
          "z": -1,
        },
        "roomId": "blacktooth12",
        "subRoomId": "*",
      },
      "blacktooth13/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 5,
          "y": -3,
          "z": -1,
        },
        "roomId": "blacktooth13",
        "subRoomId": "*",
      },
      "blacktooth14/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 6,
          "y": -3,
          "z": -1,
        },
        "roomId": "blacktooth14",
        "subRoomId": "*",
      },
      "blacktooth15/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 5,
          "y": -2,
          "z": -1,
        },
        "roomId": "blacktooth15",
        "subRoomId": "*",
      },
      "blacktooth16/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 5,
          "y": -1,
          "z": -1,
        },
        "roomId": "blacktooth16",
        "subRoomId": "*",
      },
      "blacktooth17triple/left": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 7,
          "y": -1,
          "z": -1,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "left",
      },
      "blacktooth17triple/middle": {
        "boundaries": {
          "away": "open",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 6,
          "y": -1,
          "z": -1,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "middle",
      },
      "blacktooth17triple/right": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 6,
          "y": 0,
          "z": -1,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "right",
      },
      "blacktooth18/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 7,
          "y": 0,
          "z": -1,
        },
        "roomId": "blacktooth18",
        "subRoomId": "*",
      },
      "blacktooth19/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": -1,
          "z": -1,
        },
        "roomId": "blacktooth19",
        "subRoomId": "*",
      },
      "blacktooth1head/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -5,
          "y": -11,
          "z": -1,
        },
        "roomId": "blacktooth1head",
        "subRoomId": "*",
      },
      "blacktooth2/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "roomId": "blacktooth2",
        "subRoomId": "*",
      },
      "blacktooth20/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 0,
          "z": -1,
        },
        "roomId": "blacktooth20",
        "subRoomId": "*",
      },
      "blacktooth21fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 1,
          "z": -1,
        },
        "roomId": "blacktooth21fish",
        "subRoomId": "*",
      },
      "blacktooth22/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 2,
          "z": -1,
        },
        "roomId": "blacktooth22",
        "subRoomId": "*",
      },
      "blacktooth23heels/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -6,
          "y": -11,
          "z": -1,
        },
        "roomId": "blacktooth23heels",
        "subRoomId": "*",
      },
      "blacktooth24/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 3,
          "y": -7,
          "z": -3,
        },
        "roomId": "blacktooth24",
        "subRoomId": "*",
      },
      "blacktooth25/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 4,
          "y": -7,
          "z": -3,
        },
        "roomId": "blacktooth25",
        "subRoomId": "*",
      },
      "blacktooth26/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 4,
          "y": -7,
          "z": -2,
        },
        "roomId": "blacktooth26",
        "subRoomId": "*",
      },
      "blacktooth27fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 4,
          "y": -6,
          "z": -2,
        },
        "roomId": "blacktooth27fish",
        "subRoomId": "*",
      },
      "blacktooth28/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 3,
          "y": -6,
          "z": -2,
        },
        "roomId": "blacktooth28",
        "subRoomId": "*",
      },
      "blacktooth29/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 4,
          "y": -5,
          "z": -2,
        },
        "roomId": "blacktooth29",
        "subRoomId": "*",
      },
      "blacktooth3/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 0,
          "y": -1,
          "z": 0,
        },
        "roomId": "blacktooth3",
        "subRoomId": "*",
      },
      "blacktooth30/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 4,
          "y": -5,
          "z": -1,
        },
        "roomId": "blacktooth30",
        "subRoomId": "*",
      },
      "blacktooth31/left": {
        "boundaries": {
          "away": "open",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 3,
          "y": -5,
          "z": -1,
        },
        "roomId": "blacktooth31",
        "subRoomId": "left",
      },
      "blacktooth31/right": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 3,
          "y": -4,
          "z": -1,
        },
        "roomId": "blacktooth31",
        "subRoomId": "right",
      },
      "blacktooth32/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 3,
          "y": -2,
          "z": -1,
        },
        "roomId": "blacktooth32",
        "subRoomId": "*",
      },
      "blacktooth33/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 3,
          "y": -1,
          "z": -1,
        },
        "roomId": "blacktooth33",
        "subRoomId": "*",
      },
      "blacktooth34/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 3,
          "y": -1,
          "z": 0,
        },
        "roomId": "blacktooth34",
        "subRoomId": "*",
      },
      "blacktooth35/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 3,
          "y": 0,
          "z": 0,
        },
        "roomId": "blacktooth35",
        "subRoomId": "left",
      },
      "blacktooth35/right": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 3,
          "y": 1,
          "z": 0,
        },
        "roomId": "blacktooth35",
        "subRoomId": "right",
      },
      "blacktooth36/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 4,
          "y": 1,
          "z": 0,
        },
        "roomId": "blacktooth36",
        "subRoomId": "*",
      },
      "blacktooth37/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 4,
          "y": 2,
          "z": 0,
        },
        "roomId": "blacktooth37",
        "subRoomId": "*",
      },
      "blacktooth38/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 4,
          "y": 3,
          "z": 0,
        },
        "roomId": "blacktooth38",
        "subRoomId": "*",
      },
      "blacktooth39/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 4,
          "y": 3,
          "z": -1,
        },
        "roomId": "blacktooth39",
        "subRoomId": "*",
      },
      "blacktooth4/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 0,
          "y": -1,
          "z": -1,
        },
        "roomId": "blacktooth4",
        "subRoomId": "*",
      },
      "blacktooth40fish/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 4,
          "y": 4,
          "z": -1,
        },
        "roomId": "blacktooth40fish",
        "subRoomId": "left",
      },
      "blacktooth40fish/right": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 4,
          "y": 5,
          "z": -1,
        },
        "roomId": "blacktooth40fish",
        "subRoomId": "right",
      },
      "blacktooth41/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 5,
          "y": 3,
          "z": -1,
        },
        "roomId": "blacktooth41",
        "subRoomId": "*",
      },
      "blacktooth42/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 6,
          "y": 3,
          "z": -1,
        },
        "roomId": "blacktooth42",
        "subRoomId": "*",
      },
      "blacktooth43/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 7,
          "y": 3,
          "z": -1,
        },
        "roomId": "blacktooth43",
        "subRoomId": "*",
      },
      "blacktooth44market/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": 2,
          "z": -2,
        },
        "roomId": "blacktooth44market",
        "subRoomId": "*",
      },
      "blacktooth45market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 7,
          "y": 2,
          "z": -2,
        },
        "roomId": "blacktooth45market",
        "subRoomId": "*",
      },
      "blacktooth46market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 7,
          "y": 3,
          "z": -2,
        },
        "roomId": "blacktooth46market",
        "subRoomId": "*",
      },
      "blacktooth47market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 7,
          "y": 4,
          "z": -2,
        },
        "roomId": "blacktooth47market",
        "subRoomId": "*",
      },
      "blacktooth48market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 7,
          "y": 5,
          "z": -2,
        },
        "roomId": "blacktooth48market",
        "subRoomId": "*",
      },
      "blacktooth49market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": 5,
          "z": -2,
        },
        "roomId": "blacktooth49market",
        "subRoomId": "*",
      },
      "blacktooth5/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 0,
          "y": -2,
          "z": -1,
        },
        "roomId": "blacktooth5",
        "subRoomId": "*",
      },
      "blacktooth50market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 9,
          "y": 5,
          "z": -2,
        },
        "roomId": "blacktooth50market",
        "subRoomId": "*",
      },
      "blacktooth51/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 4,
          "z": -2,
        },
        "roomId": "blacktooth51",
        "subRoomId": "*",
      },
      "blacktooth52market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 10,
          "y": 5,
          "z": -2,
        },
        "roomId": "blacktooth52market",
        "subRoomId": "*",
      },
      "blacktooth53market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 10,
          "y": 6,
          "z": -2,
        },
        "roomId": "blacktooth53market",
        "subRoomId": "*",
      },
      "blacktooth54/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 10,
          "y": 7,
          "z": -2,
        },
        "roomId": "blacktooth54",
        "subRoomId": "*",
      },
      "blacktooth55/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 10,
          "y": 7,
          "z": -3,
        },
        "roomId": "blacktooth55",
        "subRoomId": "*",
      },
      "blacktooth56/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 7,
          "z": -3,
        },
        "roomId": "blacktooth56",
        "subRoomId": "*",
      },
      "blacktooth57/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 8,
          "y": 7,
          "z": -3,
        },
        "roomId": "blacktooth57",
        "subRoomId": "*",
      },
      "blacktooth58triple/left": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 8,
          "z": -3,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "left",
      },
      "blacktooth58triple/middle": {
        "boundaries": {
          "away": "open",
          "left": "open",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 8,
          "z": -3,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "middle",
      },
      "blacktooth58triple/right": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": 8,
          "y": 9,
          "z": -3,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "right",
      },
      "blacktooth59/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 10,
          "z": -3,
        },
        "roomId": "blacktooth59",
        "subRoomId": "*",
      },
      "blacktooth6/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 1,
          "y": -2,
          "z": -1,
        },
        "roomId": "blacktooth6",
        "subRoomId": "*",
      },
      "blacktooth60/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 8,
          "y": 11,
          "z": -3,
        },
        "roomId": "blacktooth60",
        "subRoomId": "*",
      },
      "blacktooth61/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 10,
          "y": 8,
          "z": -3,
        },
        "roomId": "blacktooth61",
        "subRoomId": "*",
      },
      "blacktooth62fish/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 10,
          "y": 9,
          "z": -3,
        },
        "roomId": "blacktooth62fish",
        "subRoomId": "left",
      },
      "blacktooth62fish/right": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "open",
        },
        "gridPosition": {
          "x": 10,
          "y": 10,
          "z": -3,
        },
        "roomId": "blacktooth62fish",
        "subRoomId": "right",
      },
      "blacktooth63/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 9,
          "y": 10,
          "z": -3,
        },
        "roomId": "blacktooth63",
        "subRoomId": "*",
      },
      "blacktooth64/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 38,
          "y": 29,
          "z": -3,
        },
        "roomId": "blacktooth64",
        "subRoomId": "*",
      },
      "blacktooth65/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 38,
          "y": 30,
          "z": -3,
        },
        "roomId": "blacktooth65",
        "subRoomId": "*",
      },
      "blacktooth66/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 38,
          "y": 31,
          "z": -3,
        },
        "roomId": "blacktooth66",
        "subRoomId": "*",
      },
      "blacktooth67/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 37,
          "y": 31,
          "z": -3,
        },
        "roomId": "blacktooth67",
        "subRoomId": "*",
      },
      "blacktooth68/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 38,
          "y": 32,
          "z": -3,
        },
        "roomId": "blacktooth68",
        "subRoomId": "*",
      },
      "blacktooth69/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 36,
          "y": 31,
          "z": -3,
        },
        "roomId": "blacktooth69",
        "subRoomId": "*",
      },
      "blacktooth7/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 0,
          "y": -3,
          "z": -1,
        },
        "roomId": "blacktooth7",
        "subRoomId": "*",
      },
      "blacktooth70/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 37,
          "y": 32,
          "z": -3,
        },
        "roomId": "blacktooth70",
        "subRoomId": "*",
      },
      "blacktooth71/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 37,
          "y": 33,
          "z": -3,
        },
        "roomId": "blacktooth71",
        "subRoomId": "*",
      },
      "blacktooth72/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 37,
          "y": 34,
          "z": -3,
        },
        "roomId": "blacktooth72",
        "subRoomId": "*",
      },
      "blacktooth73/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 38,
          "y": 34,
          "z": -3,
        },
        "roomId": "blacktooth73",
        "subRoomId": "*",
      },
      "blacktooth74/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 39,
          "y": 34,
          "z": -3,
        },
        "roomId": "blacktooth74",
        "subRoomId": "*",
      },
      "blacktooth75/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 39,
          "y": 33,
          "z": -3,
        },
        "roomId": "blacktooth75",
        "subRoomId": "*",
      },
      "blacktooth76/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 39,
          "y": 32,
          "z": -3,
        },
        "roomId": "blacktooth76",
        "subRoomId": "*",
      },
      "blacktooth77/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 36,
          "y": 33,
          "z": -3,
        },
        "roomId": "blacktooth77",
        "subRoomId": "*",
      },
      "blacktooth78/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 36,
          "y": 34,
          "z": -3,
        },
        "roomId": "blacktooth78",
        "subRoomId": "*",
      },
      "blacktooth79fish/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 36,
          "y": 34,
          "z": -2,
        },
        "roomId": "blacktooth79fish",
        "subRoomId": "*",
      },
      "blacktooth80/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 36,
          "y": 35,
          "z": -3,
        },
        "roomId": "blacktooth80",
        "subRoomId": "*",
      },
      "blacktooth81/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 36,
          "y": 36,
          "z": -3,
        },
        "roomId": "blacktooth81",
        "subRoomId": "*",
      },
      "blacktooth82/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 37,
          "y": 36,
          "z": -3,
        },
        "roomId": "blacktooth82",
        "subRoomId": "*",
      },
      "blacktooth83tofreedom/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 38,
          "y": 36,
          "z": -3,
        },
        "roomId": "blacktooth83tofreedom",
        "subRoomId": "*",
      },
      "blacktooth84/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 35,
          "y": 33,
          "z": -3,
        },
        "roomId": "blacktooth84",
        "subRoomId": "*",
      },
      "blacktooth85/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 34,
          "y": 33,
          "z": -3,
        },
        "roomId": "blacktooth85",
        "subRoomId": "*",
      },
      "blacktooth86/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 34,
          "y": 32,
          "z": -3,
        },
        "roomId": "blacktooth86",
        "subRoomId": "*",
      },
      "blacktooth87crown/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 34,
          "y": 31,
          "z": -3,
        },
        "roomId": "blacktooth87crown",
        "subRoomId": "*",
      },
      "blacktooth8fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 0,
          "y": -4,
          "z": -1,
        },
        "roomId": "blacktooth8fish",
        "subRoomId": "*",
      },
      "blacktooth9/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -1,
          "y": -4,
          "z": -1,
        },
        "roomId": "blacktooth9",
        "subRoomId": "*",
      },
      "finalroom/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 45,
          "y": 41,
          "z": -3,
        },
        "roomId": "finalroom",
        "subRoomId": "*",
      },
      "moonbase1/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 17,
          "y": 15,
          "z": -3,
        },
        "roomId": "moonbase1",
        "subRoomId": "*",
      },
      "moonbase10/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 23,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase10",
        "subRoomId": "*",
      },
      "moonbase11/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 23,
          "y": 19,
          "z": -3,
        },
        "roomId": "moonbase11",
        "subRoomId": "*",
      },
      "moonbase12/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 23,
          "y": 20,
          "z": -3,
        },
        "roomId": "moonbase12",
        "subRoomId": "*",
      },
      "moonbase13/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 18,
          "y": 17,
          "z": -3,
        },
        "roomId": "moonbase13",
        "subRoomId": "*",
      },
      "moonbase14/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 18,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase14",
        "subRoomId": "*",
      },
      "moonbase15/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 17,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase15",
        "subRoomId": "*",
      },
      "moonbase16/left": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "open",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 20,
          "y": 17,
          "z": -3,
        },
        "roomId": "moonbase16",
        "subRoomId": "left",
      },
      "moonbase16/right": {
        "boundaries": {
          "away": "wall",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 19,
          "y": 17,
          "z": -3,
        },
        "roomId": "moonbase16",
        "subRoomId": "right",
      },
      "moonbase17/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 20,
          "y": 16,
          "z": -3,
        },
        "roomId": "moonbase17",
        "subRoomId": "*",
      },
      "moonbase18/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 22,
          "y": 20,
          "z": -3,
        },
        "roomId": "moonbase18",
        "subRoomId": "*",
      },
      "moonbase19/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 24,
          "y": 19,
          "z": -3,
        },
        "roomId": "moonbase19",
        "subRoomId": "*",
      },
      "moonbase2/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 18,
          "y": 15,
          "z": -3,
        },
        "roomId": "moonbase2",
        "subRoomId": "*",
      },
      "moonbase20/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 25,
          "y": 19,
          "z": -3,
        },
        "roomId": "moonbase20",
        "subRoomId": "*",
      },
      "moonbase21tosafari/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 25,
          "y": 20,
          "z": -3,
        },
        "roomId": "moonbase21tosafari",
        "subRoomId": "*",
      },
      "moonbase22topenitentiary/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 25,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase22topenitentiary",
        "subRoomId": "*",
      },
      "moonbase23/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 26,
          "y": 19,
          "z": -3,
        },
        "roomId": "moonbase23",
        "subRoomId": "*",
      },
      "moonbase24toegyptus/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 26,
          "y": 20,
          "z": -3,
        },
        "roomId": "moonbase24toegyptus",
        "subRoomId": "*",
      },
      "moonbase25tobookworld/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 26,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase25tobookworld",
        "subRoomId": "*",
      },
      "moonbase26/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 27,
          "y": 19,
          "z": -3,
        },
        "roomId": "moonbase26",
        "subRoomId": "*",
      },
      "moonbase27/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 28,
          "y": 19,
          "z": -3,
        },
        "roomId": "moonbase27",
        "subRoomId": "*",
      },
      "moonbase28/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 28,
          "y": 20,
          "z": -3,
        },
        "roomId": "moonbase28",
        "subRoomId": "*",
      },
      "moonbase29/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 29,
          "y": 20,
          "z": -3,
        },
        "roomId": "moonbase29",
        "subRoomId": "*",
      },
      "moonbase3/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 18,
          "y": 16,
          "z": -3,
        },
        "roomId": "moonbase3",
        "subRoomId": "*",
      },
      "moonbase30/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 28,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase30",
        "subRoomId": "*",
      },
      "moonbase31/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 29,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase31",
        "subRoomId": "*",
      },
      "moonbase32/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 29,
          "y": 22,
          "z": -3,
        },
        "roomId": "moonbase32",
        "subRoomId": "*",
      },
      "moonbase33triple/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 29,
          "y": 23,
          "z": -3,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "left",
      },
      "moonbase33triple/middle": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "open",
        },
        "gridPosition": {
          "x": 29,
          "y": 24,
          "z": -3,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "middle",
      },
      "moonbase33triple/right": {
        "boundaries": {
          "away": "doorway",
          "left": "open",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 28,
          "y": 24,
          "z": -3,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "right",
      },
      "moonbase34/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 30,
          "y": 24,
          "z": -3,
        },
        "roomId": "moonbase34",
        "subRoomId": "*",
      },
      "moonbase35/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 30,
          "y": 25,
          "z": -3,
        },
        "roomId": "moonbase35",
        "subRoomId": "*",
      },
      "moonbase36/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 28,
          "y": 25,
          "z": -3,
        },
        "roomId": "moonbase36",
        "subRoomId": "*",
      },
      "moonbase4/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 16,
          "y": 15,
          "z": -3,
        },
        "roomId": "moonbase4",
        "subRoomId": "*",
      },
      "moonbase5/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 16,
          "y": 16,
          "z": -3,
        },
        "roomId": "moonbase5",
        "subRoomId": "*",
      },
      "moonbase6/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 16,
          "y": 17,
          "z": -3,
        },
        "roomId": "moonbase6",
        "subRoomId": "*",
      },
      "moonbase7/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": 16,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase7",
        "subRoomId": "*",
      },
      "moonbase8/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 15,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase8",
        "subRoomId": "*",
      },
      "moonbase9/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 22,
          "y": 18,
          "z": -3,
        },
        "roomId": "moonbase9",
        "subRoomId": "*",
      },
    }
  `);
});
