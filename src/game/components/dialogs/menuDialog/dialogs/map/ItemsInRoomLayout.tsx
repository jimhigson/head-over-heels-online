import { useMemo, type ReactElement } from "react";
import { entries } from "../../../../../../utils/entries";

import {
  addXy,
  elementWiseProductXyz,
  scaleXy,
  scaleXyz,
  type Xy,
} from "../../../../../../utils/vectors/vectors";
import { roomGridSizeXY } from "./mapConstants";
import { translateXyz } from "./svgHelpers";
import {
  NotableItemSvg,
  PlayableItemInRoom,
  type NotableItem,
} from "./NotableItem";
import { roomItemPositions } from "./roomItemPositions";
import type { JsonItemUnion } from "../../../../../../model/json/JsonItem";
import type { ConsolidatableConfig } from "../../../../../../model/json/utilityJsonConfigTypes";
import { timesNotMultiplied } from "../../../../../../model/json/utilityJsonConfigTypes";
import { emptyObject } from "../../../../../../utils/empty";
import type { RoomJson } from "../../../../../../model/RoomJson";
import type { PlayableItem } from "../../../../../physics/itemPredicates";
import { itemInPlayCentre } from "../../../../../../model/itemInPlayCentre";
import { blockSizePx } from "../../../../../../sprites/spritePivots";
import type { IndividualCharacterName } from "../../../../../../model/modelTypes";
import { roomJsonFloorsExtent } from "../../../../../render/floorsExtent";
import { normalise } from "../../../../../../utils/maths/normalise";

export const ItemsInRoomLayout = <ItemId extends string, Item>({
  items,
  positions,
  ItemComponent,
}: {
  items: Record<ItemId, Item>;
  positions: Record<ItemId, Xy>;
  ItemComponent: (props: { item: Item }) => ReactElement;
}) => {
  return (
    <g data-class="items">
      {entries(positions)
        .sort(([_aId, aPosition], [_bId, bPosition]) => {
          // do a quick z-sort so items are drawn in front/behind each other correctly
          return bPosition.y - aPosition.y + (bPosition.x - aPosition.x);
        })
        .map(([id, position]) => {
          return (
            <g
              data-position={JSON.stringify(position)}
              // * 0.6 = should be 2/3 but the icons are slightly oversize for their
              // slots so need squashing back in a bit
              transform={`${translateXyz(scaleXy(position, roomGridSizeXY * 0.5))} translate(0,-3)`}
              key={id}
            >
              <ItemComponent item={items[id]} />
            </g>
          );
        })}
    </g>
  );
};

/**
 * get the size (in blocks) of a sub-room, or the whole room if subRoomId is '*'
 * - used to normalise the position of items in the room to their 0..1 range
 */
const selectSubRoomStartAndEnd = (
  subRoomId: string,
  roomJson: RoomJson<string, string>,
): { from: Xy; to: Xy } => {
  if (subRoomId === "*") {
    const floorsExtent = roomJsonFloorsExtent(roomJson);

    if (floorsExtent === undefined) {
      throw new Error(
        `no floors in room ${roomJson.id} when trying to get start and end for subroom ${subRoomId}`,
      );
    }

    return floorsExtent;
  } else {
    if (!roomJson.meta?.subRooms) {
      throw new Error(
        `no subrooms in ${roomJson.id} when trying to get start and end for subroom ${subRoomId}`,
      );
    }
    return roomJson.meta.subRooms[subRoomId].physicalPosition;
  }
};

/** for showing notable items in non-loaded rooms on the map */
export const NotableJsonItemsInRoomLayout = <
  RoomId extends string,
  RoomItemId extends string,
>({
  items,
  roomJson,
  subRoomId,
}: {
  items: Record<RoomItemId, NotableItem<RoomId>>;
  roomJson: RoomJson<RoomId, RoomItemId>;
  subRoomId: string;
}) => {
  const positions = useMemo(() => {
    const jsonItemNormalisedPosition = (item: JsonItemUnion): Xy => {
      const times = {
        ...((item.config as ConsolidatableConfig).times ?? emptyObject),
        ...timesNotMultiplied,
      };
      const itemCentreXy = addXy(item.position, scaleXyz(times, 0.5));
      const subRoomStartAndEnd = selectSubRoomStartAndEnd(subRoomId, roomJson);
      return {
        x:
          (itemCentreXy.x - subRoomStartAndEnd.from.x) /
          (subRoomStartAndEnd.to.x - subRoomStartAndEnd.from.x),
        y:
          (itemCentreXy.y - subRoomStartAndEnd.from.y) /
          (subRoomStartAndEnd.to.y - subRoomStartAndEnd.from.y),
      };
    };
    return roomItemPositions({
      items,
      itemNormalisedPosition: jsonItemNormalisedPosition,
    });
  }, [items, roomJson, subRoomId]);
  return (
    <ItemsInRoomLayout
      ItemComponent={NotableItemSvg}
      items={items}
      positions={positions}
    />
  );
};

/**
 * for showing 'live'/loaded items in in-play rooms on the map. Currently,
 * only playable items are shown for in-play rooms, and this is only needed
 * when both are in the same room but not in symbiosis, so they are shown
 * approximately correctly positionally relative to each other
 */
export const InPlayItemsInRoomLayout = <
  RoomId extends string,
  RoomItemId extends string,
>({
  headItemInRoom,
  heelsItemInRoom,
  roomJson,
  currentCharacterName,
  onClick,
}: {
  headItemInRoom: PlayableItem<"head", RoomId>;
  heelsItemInRoom: PlayableItem<"heels", RoomId>;
  roomJson: RoomJson<RoomId, RoomItemId>;
  currentCharacterName: IndividualCharacterName;
  onClick?: (name: "head" | "heels") => void;
}) => {
  const ItemComponent = useMemo(
    () =>
      ({
        item: {
          type,
          state: { facing },
        },
      }: {
        item: PlayableItem<"head", RoomId> | PlayableItem<"heels", RoomId>;
      }) => {
        return (
          <PlayableItemInRoom
            characterName={type}
            facing={facing}
            isCurrent={currentCharacterName === type}
            onlyPlayableInRoom={false}
            onClick={onClick}
          />
        );
      },
    [currentCharacterName, onClick],
  );

  const items = useMemo(
    () => ({
      head: headItemInRoom,
      heels: heelsItemInRoom,
    }),
    [headItemInRoom, heelsItemInRoom],
  );

  const positions = useMemo(() => {
    /** normalise the item's position to 0..1 range according to the room's size */
    const jsonItemNormalisedPosition = (item: PlayableItem): Xy => {
      const itemCentreXy = itemInPlayCentre(item);
      const itemBlocksCentreXy = elementWiseProductXyz(itemInPlayCentre(item), {
        x: 1 / blockSizePx.w,
        y: 1 / blockSizePx.d,
        z: 1, // z doesn't matter
      });
      const floorExtent = roomJsonFloorsExtent(roomJson);
      if (floorExtent === undefined) {
        throw new Error(
          `no floors in room ${roomJson.id} when trying to get item position`,
        );
      }
      return {
        // todo: how is this taking into account the subroom the player is in
        // it seems like it isn't, but it mostly gets away with it because this
        // is only used for when heads and heels are in the same (sub)room and
        // only for the relative position between them, and it seems to work out
        // ok in practice
        x: normalise(
          itemBlocksCentreXy.x,
          floorExtent.from.x,
          floorExtent.to.x,
        ),
        y: normalise(itemCentreXy.y, floorExtent.from.y, floorExtent.to.y),
      };
    };
    return roomItemPositions({
      items,
      itemNormalisedPosition: jsonItemNormalisedPosition,
    });
  }, [items, roomJson]);

  return (
    <ItemsInRoomLayout
      ItemComponent={ItemComponent}
      items={items}
      positions={positions}
    />
  );
};
