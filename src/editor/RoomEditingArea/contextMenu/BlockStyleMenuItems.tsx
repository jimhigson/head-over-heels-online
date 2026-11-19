import {
  deadlyBlockStyles,
  portableBlockStyles,
} from "../../../model/json/ItemConfigMap";
import { type JsonItemType } from "../../../model/json/JsonItem";
import { blockStyles } from "../../../model/json/utilityJsonConfigTypes";
import { canBlockBeTower } from "../../canBlockBeTower";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import { type EditorCommandDispatchable } from "../../commands/EditorCommand";
import {
  type ItemSubtype,
  itemTypeAndMaybeSubtype,
  type SubtypeOfItemType,
} from "../../itemTypeAndSubtype";
import { setSelectedItemsSubtype } from "../../slice/levelEditorSlice";
import { type RestylableItemType } from "../../slice/reducers/blockDeadlinessAndStyleReducers";
import { useSelectedJsonItems } from "./useSelectedJsonItems";

type Restyling<T extends RestylableItemType> = {
  /**
   * the styles items of the type can have, in the order the switch cycles them
   */
  styles: readonly SubtypeOfItemType<T>[];
  /**
   * gives the selected items of the type a style
   */
  restyle: (style: SubtypeOfItemType<T>) => EditorCommandDispatchable;
};

const restylingOfItemType: { [T in RestylableItemType]: Restyling<T> } = {
  block: {
    styles: blockStyles,
    restyle: (style) =>
      setSelectedItemsSubtype({
        itemType: "block",
        subtype: style,
        timestamp: Date.now(),
      }),
  },
  deadlyBlock: {
    styles: deadlyBlockStyles,
    restyle: (style) =>
      setSelectedItemsSubtype({
        itemType: "deadlyBlock",
        subtype: style,
        timestamp: Date.now(),
      }),
  },
  portableBlock: {
    styles: portableBlockStyles,
    restyle: (style) =>
      setSelectedItemsSubtype({
        itemType: "portableBlock",
        subtype: style,
        timestamp: Date.now(),
      }),
  },
};

const isRestylableItemType = (
  itemType: JsonItemType,
): itemType is RestylableItemType => itemType in restylingOfItemType;

type StyleSettingMenuItemProps<T extends RestylableItemType> = {
  itemType: T;
  /**
   * the styles to offer, in the order the switch cycles them
   */
  styles: readonly SubtypeOfItemType<T>[];
  /**
   * the styles the selected items have now
   */
  currentStyles: ReadonlySet<ItemSubtype | undefined>;
};

const StyleSettingMenuItem = <T extends RestylableItemType>({
  itemType,
  styles,
  currentStyles,
}: StyleSettingMenuItemProps<T>) => {
  const restyling: Restyling<T> = restylingOfItemType[itemType];
  return (
    <CommandContextMenuItem
      command={{
        type: "setting",
        label: "Style",
        values: styles,
        // a mixed selection shows the first style, in list order, any of them has:
        value: styles.find((style) => currentStyles.has(style)) ?? styles[0],
        action: restyling.restyle,
      }}
    />
  );
};

/**
 * Style switch for a selection whose items are all one restylable type - all
 * blocks, all deadly blocks or all portable blocks. Tower is offered only if
 * every selected block can be one.
 */
export const BlockStyleMenuItems = () => {
  const items = useSelectedJsonItems();
  const [firstItem] = items;
  if (
    firstItem === undefined ||
    !isRestylableItemType(firstItem.type) ||
    items.some((item) => item.type !== firstItem.type)
  ) {
    return null;
  }
  const itemType = firstItem.type;
  const styles = restylingOfItemType[itemType].styles.filter(
    (style) =>
      style !== "tower" ||
      items.every(
        (item) => item.type !== "block" || canBlockBeTower(item.config),
      ),
  );

  return (
    <StyleSettingMenuItem
      itemType={itemType}
      styles={styles}
      currentStyles={
        new Set(items.map((item) => itemTypeAndMaybeSubtype(item).subtype))
      }
    />
  );
};
