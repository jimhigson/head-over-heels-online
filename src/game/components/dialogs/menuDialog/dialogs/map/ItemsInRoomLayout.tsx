import { useMemo, type ReactElement } from "react";
import { entries } from "../../../../../../utils/entries";

import {
  addXy,
  originXyz,
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

const selectSubRoomStartAndEnd = (
  subRoomId: string,
  roomJson: RoomJson<string, string>,
): { from: Xy; to: Xy } => {
  if (subRoomId === "*") {
    return {
      from: originXyz,
      to: roomJson.size,
    };
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
  roomJson: { size },
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
    const jsonItemNormalisedPosition = (item: PlayableItem): Xy => {
      const itemCentreXy = itemInPlayCentre(item);
      return {
        x: itemCentreXy.x / (size.x * blockSizePx.w),
        y: itemCentreXy.y / (size.y * blockSizePx.d),
      };
    };
    return roomItemPositions({
      items,
      itemNormalisedPosition: jsonItemNormalisedPosition,
    });
  }, [items, size]);
  return (
    <ItemsInRoomLayout
      ItemComponent={ItemComponent}
      items={items}
      positions={positions}
    />
  );
};
