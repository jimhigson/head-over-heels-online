import { expect, test } from "vitest";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import { campaign } from "../../../../../../_generated/originalCampaign/campaign";

test("starting room finds only two rooms", () => {
  expect(
    sortRoomGridPositions(
      roomGridPositions({
        campaign,
        roomId: "blacktooth1head",
      }),
    ),
  ).toMatchInlineSnapshot(`
    [
      {
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
      {
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
    ]
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
    [
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
    ]
  `);
});
