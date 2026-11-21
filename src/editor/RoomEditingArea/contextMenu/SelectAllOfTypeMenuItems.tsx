import type { JsonItemType } from "../../../model/json/JsonItem";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  type ItemSubtype,
  itemTypeAndMaybeSubtype,
  type ItemTypeAndSubtype,
} from "../../itemTypeAndSubtype";
import { selectAllOfTypeInCursorRoom } from "../../slice/levelEditorSlice";
import { useSelectedJsonItems } from "./useSelectedJsonItems";

/**
 * per item type in the selection, "select all (type)", then "select all
 * (subtype) (type)" for each of its subtypes in the selection
 */
export const SelectAllOfTypeMenuItems = () => {
  const subtypesByItemType = new Map<
    JsonItemType,
    Map<ItemSubtype, ItemTypeAndSubtype>
  >();
  for (const item of useSelectedJsonItems()) {
    const subtypes = subtypesByItemType.getOrInsertComputed(
      item.type,
      () => new Map(),
    );
    const typeAndMaybeSubtype = itemTypeAndMaybeSubtype(item);
    if (typeAndMaybeSubtype.subtype !== undefined) {
      subtypes.set(typeAndMaybeSubtype.subtype, typeAndMaybeSubtype);
    }
  }

  return (
    <>
      {subtypesByItemType
        .entries()
        .flatMap(([itemType, subtypes]) => [
          <CommandContextMenuItem
            key={itemType}
            command={{
              type: "action",
              label: `Select all ${itemType}`,
              action: () =>
                selectAllOfTypeInCursorRoom({ itemType, subtype: undefined }),
            }}
          />,
          ...subtypes.values().map((typeAndSubtype) => (
            <CommandContextMenuItem
              key={`${itemType}-${typeAndSubtype.subtype}`}
              command={{
                type: "action",
                label: `Select all ${typeAndSubtype.subtype} ${itemType}`,
                action: () => selectAllOfTypeInCursorRoom(typeAndSubtype),
              }}
            />
          )),
        ])
        .toArray()}
    </>
  );
};
