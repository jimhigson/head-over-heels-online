import { expect, test } from "vitest";

import { campaign } from "../../_generated/originalCampaign/campaign";
import { exitGameRoomId } from "../json/ItemConfigMap";
import { type AnyRoomJson } from "../RoomJson";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import { type TeleporterLink } from "./teleporterLinks";

test("traversing original campaign from the start room", () => {
  expect(
    sortRoomGridPositions(
      roomGridPositions({
        campaign,
        roomId: "blacktooth1head",
      }).keys(),
    ),
  ).toMatchInlineSnapshot(`
    {
      "blacktooth0switches/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 1,
          "y": 0,
          "z": 0,
        },
        "roomId": "blacktooth0switches",
        "subRoomId": "*",
        "subgraph": 0,
      },
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
      },
      "blacktooth1head/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
      },
      "finalroom/*": {
        "boundaries": {
          "away": "doorway",
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
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
        "subgraph": 0,
      },
    }
  `);
});

test("traversing original campaign from the final room", () => {
  expect(
    sortRoomGridPositions(
      roomGridPositions({
        campaign,
        roomId: "finalroom",
      }).keys(),
    ),
  ).toMatchInlineSnapshot(`
    {
      "blacktooth0switches/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -49,
          "y": -52,
          "z": 2,
        },
        "roomId": "blacktooth0switches",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth10/left": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -43,
          "y": -44,
          "z": 2,
        },
        "roomId": "blacktooth10",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "blacktooth10/right": {
        "boundaries": {
          "away": "wall",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -44,
          "y": -44,
          "z": 2,
        },
        "roomId": "blacktooth10",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "blacktooth11/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -42,
          "y": -44,
          "z": 2,
        },
        "roomId": "blacktooth11",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth12/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -41,
          "y": -44,
          "z": 2,
        },
        "roomId": "blacktooth12",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth13/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -40,
          "y": -44,
          "z": 2,
        },
        "roomId": "blacktooth13",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth14/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -39,
          "y": -44,
          "z": 2,
        },
        "roomId": "blacktooth14",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth15/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -40,
          "y": -43,
          "z": 2,
        },
        "roomId": "blacktooth15",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth16/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -40,
          "y": -42,
          "z": 2,
        },
        "roomId": "blacktooth16",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth17triple/left": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -38,
          "y": -42,
          "z": 2,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "blacktooth17triple/middle": {
        "boundaries": {
          "away": "open",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -39,
          "y": -42,
          "z": 2,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "middle",
        "subgraph": 0,
      },
      "blacktooth17triple/right": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": -39,
          "y": -41,
          "z": 2,
        },
        "roomId": "blacktooth17triple",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "blacktooth18/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -38,
          "y": -41,
          "z": 2,
        },
        "roomId": "blacktooth18",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth19/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -37,
          "y": -42,
          "z": 2,
        },
        "roomId": "blacktooth19",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth1head/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -50,
          "y": -52,
          "z": 2,
        },
        "roomId": "blacktooth1head",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth2/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -45,
          "y": -41,
          "z": 3,
        },
        "roomId": "blacktooth2",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth20/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -37,
          "y": -41,
          "z": 2,
        },
        "roomId": "blacktooth20",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth21fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -37,
          "y": -40,
          "z": 2,
        },
        "roomId": "blacktooth21fish",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth22/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -37,
          "y": -39,
          "z": 2,
        },
        "roomId": "blacktooth22",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth23heels/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -51,
          "y": -52,
          "z": 2,
        },
        "roomId": "blacktooth23heels",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth24/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -42,
          "y": -48,
          "z": 0,
        },
        "roomId": "blacktooth24",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth25/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -41,
          "y": -48,
          "z": 0,
        },
        "roomId": "blacktooth25",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth26/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -41,
          "y": -48,
          "z": 1,
        },
        "roomId": "blacktooth26",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth27fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -41,
          "y": -47,
          "z": 1,
        },
        "roomId": "blacktooth27fish",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth28/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -42,
          "y": -47,
          "z": 1,
        },
        "roomId": "blacktooth28",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth29/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -41,
          "y": -46,
          "z": 1,
        },
        "roomId": "blacktooth29",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth3/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -45,
          "y": -42,
          "z": 3,
        },
        "roomId": "blacktooth3",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth30/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -41,
          "y": -46,
          "z": 2,
        },
        "roomId": "blacktooth30",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth31/left": {
        "boundaries": {
          "away": "open",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -42,
          "y": -46,
          "z": 2,
        },
        "roomId": "blacktooth31",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "blacktooth31/right": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": -42,
          "y": -45,
          "z": 2,
        },
        "roomId": "blacktooth31",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "blacktooth32/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -42,
          "y": -43,
          "z": 2,
        },
        "roomId": "blacktooth32",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth33/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -42,
          "y": -42,
          "z": 2,
        },
        "roomId": "blacktooth33",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth34/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -42,
          "y": -42,
          "z": 3,
        },
        "roomId": "blacktooth34",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth35/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -42,
          "y": -41,
          "z": 3,
        },
        "roomId": "blacktooth35",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "blacktooth35/right": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": -42,
          "y": -40,
          "z": 3,
        },
        "roomId": "blacktooth35",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "blacktooth36/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -41,
          "y": -40,
          "z": 3,
        },
        "roomId": "blacktooth36",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth37/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -41,
          "y": -39,
          "z": 3,
        },
        "roomId": "blacktooth37",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth38/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -41,
          "y": -38,
          "z": 3,
        },
        "roomId": "blacktooth38",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth39/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -41,
          "y": -38,
          "z": 2,
        },
        "roomId": "blacktooth39",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth4/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -45,
          "y": -42,
          "z": 2,
        },
        "roomId": "blacktooth4",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth40fish/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -41,
          "y": -37,
          "z": 2,
        },
        "roomId": "blacktooth40fish",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "blacktooth40fish/right": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": -41,
          "y": -36,
          "z": 2,
        },
        "roomId": "blacktooth40fish",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "blacktooth41/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -40,
          "y": -38,
          "z": 2,
        },
        "roomId": "blacktooth41",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth42/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -39,
          "y": -38,
          "z": 2,
        },
        "roomId": "blacktooth42",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth43/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -38,
          "y": -38,
          "z": 2,
        },
        "roomId": "blacktooth43",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth44market/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -37,
          "y": -39,
          "z": 1,
        },
        "roomId": "blacktooth44market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth45market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -38,
          "y": -39,
          "z": 1,
        },
        "roomId": "blacktooth45market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth46market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -38,
          "y": -38,
          "z": 1,
        },
        "roomId": "blacktooth46market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth47market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -38,
          "y": -37,
          "z": 1,
        },
        "roomId": "blacktooth47market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth48market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -38,
          "y": -36,
          "z": 1,
        },
        "roomId": "blacktooth48market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth49market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -37,
          "y": -36,
          "z": 1,
        },
        "roomId": "blacktooth49market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth5/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -45,
          "y": -43,
          "z": 2,
        },
        "roomId": "blacktooth5",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth50market/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -36,
          "y": -36,
          "z": 1,
        },
        "roomId": "blacktooth50market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth51/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -36,
          "y": -37,
          "z": 1,
        },
        "roomId": "blacktooth51",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth52market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -35,
          "y": -36,
          "z": 1,
        },
        "roomId": "blacktooth52market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth53market/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -35,
          "y": -35,
          "z": 1,
        },
        "roomId": "blacktooth53market",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth54/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -35,
          "y": -34,
          "z": 1,
        },
        "roomId": "blacktooth54",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth55/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -35,
          "y": -34,
          "z": 0,
        },
        "roomId": "blacktooth55",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth56/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -36,
          "y": -34,
          "z": 0,
        },
        "roomId": "blacktooth56",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth57/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -37,
          "y": -34,
          "z": 0,
        },
        "roomId": "blacktooth57",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth58triple/left": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "open",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -36,
          "y": -33,
          "z": 0,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "blacktooth58triple/middle": {
        "boundaries": {
          "away": "open",
          "left": "open",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -37,
          "y": -33,
          "z": 0,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "middle",
        "subgraph": 0,
      },
      "blacktooth58triple/right": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "open",
        },
        "gridPosition": {
          "x": -37,
          "y": -32,
          "z": 0,
        },
        "roomId": "blacktooth58triple",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "blacktooth59/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -37,
          "y": -31,
          "z": 0,
        },
        "roomId": "blacktooth59",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth6/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -44,
          "y": -43,
          "z": 2,
        },
        "roomId": "blacktooth6",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth60/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -37,
          "y": -30,
          "z": 0,
        },
        "roomId": "blacktooth60",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth61/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -35,
          "y": -33,
          "z": 0,
        },
        "roomId": "blacktooth61",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth62fish/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -35,
          "y": -32,
          "z": 0,
        },
        "roomId": "blacktooth62fish",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "blacktooth62fish/right": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "open",
        },
        "gridPosition": {
          "x": -35,
          "y": -31,
          "z": 0,
        },
        "roomId": "blacktooth62fish",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "blacktooth63/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -36,
          "y": -31,
          "z": 0,
        },
        "roomId": "blacktooth63",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth64/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -7,
          "y": -12,
          "z": 0,
        },
        "roomId": "blacktooth64",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth65/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -7,
          "y": -11,
          "z": 0,
        },
        "roomId": "blacktooth65",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth66/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -7,
          "y": -10,
          "z": 0,
        },
        "roomId": "blacktooth66",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth67/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -8,
          "y": -10,
          "z": 0,
        },
        "roomId": "blacktooth67",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth68/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -7,
          "y": -9,
          "z": 0,
        },
        "roomId": "blacktooth68",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth69/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -9,
          "y": -10,
          "z": 0,
        },
        "roomId": "blacktooth69",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth7/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -45,
          "y": -44,
          "z": 2,
        },
        "roomId": "blacktooth7",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth70/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -8,
          "y": -9,
          "z": 0,
        },
        "roomId": "blacktooth70",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth71/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -8,
          "y": -8,
          "z": 0,
        },
        "roomId": "blacktooth71",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth72/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -8,
          "y": -7,
          "z": 0,
        },
        "roomId": "blacktooth72",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth73/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -7,
          "y": -7,
          "z": 0,
        },
        "roomId": "blacktooth73",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth74/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -6,
          "y": -7,
          "z": 0,
        },
        "roomId": "blacktooth74",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth75/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -6,
          "y": -8,
          "z": 0,
        },
        "roomId": "blacktooth75",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth76/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -6,
          "y": -9,
          "z": 0,
        },
        "roomId": "blacktooth76",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth77/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -9,
          "y": -8,
          "z": 0,
        },
        "roomId": "blacktooth77",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth78/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -9,
          "y": -7,
          "z": 0,
        },
        "roomId": "blacktooth78",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth79fish/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -9,
          "y": -7,
          "z": 1,
        },
        "roomId": "blacktooth79fish",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth80/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -9,
          "y": -6,
          "z": 0,
        },
        "roomId": "blacktooth80",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth81/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -9,
          "y": -5,
          "z": 0,
        },
        "roomId": "blacktooth81",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth82/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -8,
          "y": -5,
          "z": 0,
        },
        "roomId": "blacktooth82",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth83tofreedom/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -7,
          "y": -5,
          "z": 0,
        },
        "roomId": "blacktooth83tofreedom",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth84/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -10,
          "y": -8,
          "z": 0,
        },
        "roomId": "blacktooth84",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth85/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -11,
          "y": -8,
          "z": 0,
        },
        "roomId": "blacktooth85",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth86/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -11,
          "y": -9,
          "z": 0,
        },
        "roomId": "blacktooth86",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth87crown/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -11,
          "y": -10,
          "z": 0,
        },
        "roomId": "blacktooth87crown",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth8fish/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -45,
          "y": -45,
          "z": 2,
        },
        "roomId": "blacktooth8fish",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "blacktooth9/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -46,
          "y": -45,
          "z": 2,
        },
        "roomId": "blacktooth9",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "finalroom/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "roomId": "finalroom",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase1/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -28,
          "y": -26,
          "z": 0,
        },
        "roomId": "moonbase1",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase10/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -22,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase10",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase11/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -22,
          "y": -22,
          "z": 0,
        },
        "roomId": "moonbase11",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase12/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -22,
          "y": -21,
          "z": 0,
        },
        "roomId": "moonbase12",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase13/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -27,
          "y": -24,
          "z": 0,
        },
        "roomId": "moonbase13",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase14/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -27,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase14",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase15/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -28,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase15",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase16/left": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "open",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -25,
          "y": -24,
          "z": 0,
        },
        "roomId": "moonbase16",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "moonbase16/right": {
        "boundaries": {
          "away": "wall",
          "left": "open",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -26,
          "y": -24,
          "z": 0,
        },
        "roomId": "moonbase16",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "moonbase17/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -25,
          "y": -25,
          "z": 0,
        },
        "roomId": "moonbase17",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase18/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -23,
          "y": -21,
          "z": 0,
        },
        "roomId": "moonbase18",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase19/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -21,
          "y": -22,
          "z": 0,
        },
        "roomId": "moonbase19",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase2/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -27,
          "y": -26,
          "z": 0,
        },
        "roomId": "moonbase2",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase20/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -20,
          "y": -22,
          "z": 0,
        },
        "roomId": "moonbase20",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase21tosafari/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -20,
          "y": -21,
          "z": 0,
        },
        "roomId": "moonbase21tosafari",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase22topenitentiary/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -20,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase22topenitentiary",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase23/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -19,
          "y": -22,
          "z": 0,
        },
        "roomId": "moonbase23",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase24toegyptus/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -19,
          "y": -21,
          "z": 0,
        },
        "roomId": "moonbase24toegyptus",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase25tobookworld/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -19,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase25tobookworld",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase26/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -18,
          "y": -22,
          "z": 0,
        },
        "roomId": "moonbase26",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase27/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -17,
          "y": -22,
          "z": 0,
        },
        "roomId": "moonbase27",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase28/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -17,
          "y": -21,
          "z": 0,
        },
        "roomId": "moonbase28",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase29/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -16,
          "y": -21,
          "z": 0,
        },
        "roomId": "moonbase29",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase3/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -27,
          "y": -25,
          "z": 0,
        },
        "roomId": "moonbase3",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase30/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -17,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase30",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase31/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -16,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase31",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase32/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -16,
          "y": -19,
          "z": 0,
        },
        "roomId": "moonbase32",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase33triple/left": {
        "boundaries": {
          "away": "open",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -16,
          "y": -18,
          "z": 0,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "left",
        "subgraph": 0,
      },
      "moonbase33triple/middle": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "open",
          "towards": "open",
        },
        "gridPosition": {
          "x": -16,
          "y": -17,
          "z": 0,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "middle",
        "subgraph": 0,
      },
      "moonbase33triple/right": {
        "boundaries": {
          "away": "doorway",
          "left": "open",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -17,
          "y": -17,
          "z": 0,
        },
        "roomId": "moonbase33triple",
        "subRoomId": "right",
        "subgraph": 0,
      },
      "moonbase34/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "doorway",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -15,
          "y": -17,
          "z": 0,
        },
        "roomId": "moonbase34",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase35/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -15,
          "y": -16,
          "z": 0,
        },
        "roomId": "moonbase35",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase36/*": {
        "boundaries": {
          "away": "wall",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -17,
          "y": -16,
          "z": 0,
        },
        "roomId": "moonbase36",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase4/*": {
        "boundaries": {
          "away": "doorway",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -29,
          "y": -26,
          "z": 0,
        },
        "roomId": "moonbase4",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase5/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -29,
          "y": -25,
          "z": 0,
        },
        "roomId": "moonbase5",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase6/*": {
        "boundaries": {
          "away": "doorway",
          "left": "wall",
          "right": "wall",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -29,
          "y": -24,
          "z": 0,
        },
        "roomId": "moonbase6",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase7/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "doorway",
          "towards": "doorway",
        },
        "gridPosition": {
          "x": -29,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase7",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase8/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -30,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase8",
        "subRoomId": "*",
        "subgraph": 0,
      },
      "moonbase9/*": {
        "boundaries": {
          "away": "wall",
          "left": "doorway",
          "right": "wall",
          "towards": "wall",
        },
        "gridPosition": {
          "x": -23,
          "y": -23,
          "z": 0,
        },
        "roomId": "moonbase9",
        "subRoomId": "*",
        "subgraph": 0,
      },
    }
  `);
});

const testRoom = (id: string, items: AnyRoomJson["items"]): AnyRoomJson => ({
  id,
  planet: "blacktooth",
  color: { hue: "white", shade: "basic" },
  items,
});

/** the teleporter links in the campaign, reconstructed from the graph's edges */
const collectTeleporterLinks = (
  rooms: Record<string, AnyRoomJson>,
  fromRoomId: string,
): TeleporterLink<string>[] => {
  const graph = roomGridPositions({
    campaign: { rooms },
    roomId: fromRoomId,
    totalGraph: true,
  });
  const teleporterLinks: TeleporterLink<string>[] = [];
  for (const [from, edges] of graph) {
    for (const [to, edge] of edges) {
      if (edge.kind === "teleporter") {
        teleporterLinks.push({
          from: {
            roomId: from.roomId,
            subRoomId: from.subRoomId,
            itemId: edge.viaItemId,
          },
          to: {
            roomId: to.roomId,
            subRoomId: to.subRoomId,
            itemId: edge.toItemId,
          },
        });
      }
    }
  }
  return teleporterLinks;
};

test("teleporter with toPosition resolves the destination sub-room (no item id)", () => {
  expect(
    collectTeleporterLinks(
      {
        a: testRoom("a", {
          tp_a: {
            type: "teleporter",
            position: { x: 0, y: 0, z: 0 },
            config: { toRoom: "b", toPosition: { x: 1, y: 1, z: 0 } },
          },
        }),
        b: testRoom("b", {}),
      },
      "a",
    ),
  ).toEqual<TeleporterLink<string>[]>([
    {
      from: { roomId: "a", subRoomId: "*", itemId: "tp_a" },
      to: { roomId: "b", subRoomId: "*" },
    },
  ]);
});

test("teleporter with toItemId resolves to that item", () => {
  expect(
    collectTeleporterLinks(
      {
        a: testRoom("a", {
          tp_a: {
            type: "teleporter",
            position: { x: 0, y: 0, z: 0 },
            config: { toRoom: "b", toItemId: "tp_b" },
          },
        }),
        b: testRoom("b", {
          tp_b: {
            type: "teleporter",
            position: { x: 2, y: 2, z: 0 },
            config: {},
          },
        }),
      },
      "a",
    ),
  ).toEqual<TeleporterLink<string>[]>([
    {
      from: { roomId: "a", subRoomId: "*", itemId: "tp_a" },
      to: { roomId: "b", subRoomId: "*", itemId: "tp_b" },
    },
    // tp_b has no target, so it resolves to the only teleporter in its room (itself)
    {
      from: { roomId: "b", subRoomId: "*", itemId: "tp_b" },
      to: { roomId: "b", subRoomId: "*", itemId: "tp_b" },
    },
  ]);
});

test("teleporter with only toRoom resolves to the single teleporter in the destination", () => {
  expect(
    collectTeleporterLinks(
      {
        a: testRoom("a", {
          tp_a: {
            type: "teleporter",
            position: { x: 0, y: 0, z: 0 },
            config: { toRoom: "b" },
          },
        }),
        b: testRoom("b", {
          only_tp: {
            type: "teleporter",
            position: { x: 3, y: 1, z: 0 },
            config: {},
          },
        }),
      },
      "a",
    ),
  ).toEqual<TeleporterLink<string>[]>([
    {
      from: { roomId: "a", subRoomId: "*", itemId: "tp_a" },
      to: { roomId: "b", subRoomId: "*", itemId: "only_tp" },
    },
    // only_tp has no target, so it resolves to the only teleporter in its room (itself)
    {
      from: { roomId: "b", subRoomId: "*", itemId: "only_tp" },
      to: { roomId: "b", subRoomId: "*", itemId: "only_tp" },
    },
  ]);
});

test("teleporter to a room with multiple teleporters and no explicit target is dropped", () => {
  expect(
    collectTeleporterLinks(
      {
        a: testRoom("a", {
          tp_a: {
            type: "teleporter",
            position: { x: 0, y: 0, z: 0 },
            config: { toRoom: "b" },
          },
        }),
        b: testRoom("b", {
          tp_b1: {
            type: "teleporter",
            position: { x: 1, y: 1, z: 0 },
            config: {},
          },
          tp_b2: {
            type: "teleporter",
            position: { x: 2, y: 2, z: 0 },
            config: {},
          },
        }),
      },
      "a",
    ),
  ).toEqual<TeleporterLink<string>[]>([]);
});

test("teleporter to the exit-game room is ignored", () => {
  expect(
    collectTeleporterLinks(
      {
        a: testRoom("a", {
          tp_a: {
            type: "teleporter",
            position: { x: 0, y: 0, z: 0 },
            config: { toRoom: exitGameRoomId },
          },
        }),
      },
      "a",
    ),
  ).toEqual<TeleporterLink<string>[]>([]);
});

test("a same-room teleporter is recorded while gathering (it is filtered only at render)", () => {
  expect(
    collectTeleporterLinks(
      {
        a: testRoom("a", {
          tp_a: {
            type: "teleporter",
            position: { x: 0, y: 0, z: 0 },
            config: {},
          },
        }),
      },
      "a",
    ),
  ).toEqual<TeleporterLink<string>[]>([
    {
      from: { roomId: "a", subRoomId: "*", itemId: "tp_a" },
      to: { roomId: "a", subRoomId: "*", itemId: "tp_a" },
    },
  ]);
});

test("a mutual teleporter pair yields a link in each direction", () => {
  expect(
    collectTeleporterLinks(
      {
        a: testRoom("a", {
          door_ab: {
            type: "door",
            position: { x: 0, y: 0, z: 0 },
            config: { toRoom: "b", direction: "right" },
          },
          tp_a: {
            type: "teleporter",
            position: { x: 1, y: 1, z: 0 },
            config: { toRoom: "b" },
          },
        }),
        b: testRoom("b", {
          tp_b: {
            type: "teleporter",
            position: { x: 1, y: 1, z: 0 },
            config: { toRoom: "a" },
          },
        }),
      },
      "a",
    ),
  ).toEqual<TeleporterLink<string>[]>([
    {
      from: { roomId: "a", subRoomId: "*", itemId: "tp_a" },
      to: { roomId: "b", subRoomId: "*", itemId: "tp_b" },
    },
    {
      from: { roomId: "b", subRoomId: "*", itemId: "tp_b" },
      to: { roomId: "a", subRoomId: "*", itemId: "tp_a" },
    },
  ]);
});
