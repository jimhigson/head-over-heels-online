import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { type SceneryName } from "../../../sprites/planets";
import { textureForItem } from "../../../sprites/textureForItem";
import { Timeago } from "../../../ui/Timeago";
import { twClass } from "../../../utils/twClass";
import { type EditorJsonItemUnion } from "../../editorTypes";
import {
  camelToSpaced,
  describeItem,
  type UndoItemEntry,
} from "../../slice/reducers/undoDescription";
import { type UndoHistoryItem } from "../../slice/reducers/undoReducers";

const maxIcons = 3;

const verbClass = "text-highlightBeige";
const idClass = "text-pastelBlue";

type ItemIconProps = {
  item: EditorJsonItemUnion;
  scenery: SceneryName;
};

const ItemIcon = ({ item, scenery }: ItemIconProps) => (
  <span
    className={twClass(
      `sprite ${textureForItem(item, scenery)} inline-block [--scale:1]`,
    )}
  />
);

const ItemIcons = ({
  items,
  scenery,
}: {
  items: UndoItemEntry[];
  scenery: SceneryName;
}) => (
  <span>
    {items.slice(0, maxIcons).map(([id, item]) => (
      <ItemIcon key={id} item={item} scenery={scenery} />
    ))}
  </span>
);

const ItemDescriptions = ({ items }: { items: UndoItemEntry[] }) => {
  if (items.length === 1) {
    const [[id, item]] = items;
    return (
      <span>
        <BitmapText>{describeItem(item)} </BitmapText>
        <BitmapText className={idClass}>{`'${id}'`}</BitmapText>
      </span>
    );
  }

  const types = new Set(items.map(([, item]) => item.type));

  if (types.size === 1) {
    const [type] = types;
    return (
      <BitmapText>
        {items.length} {camelToSpaced(type)}s
      </BitmapText>
    );
  }

  return <BitmapText>{items.length} items</BitmapText>;
};

export const undoHistoryGridClassName =
  "grid grid-cols-[auto_auto_1fr_auto] items-center";

export const undoHistorySubgridClassName =
  "grid grid-cols-subgrid col-span-full";

export type UndoEntryLabelProps = {
  entry: UndoHistoryItem;
  scenery: SceneryName;
};

export const UndoEntryLabel = ({
  entry: { description, timestamp },
  scenery,
}: UndoEntryLabelProps) => {
  const timeago = <Timeago timestamp={timestamp} className="text-lightGrey" />;

  switch (description.kind) {
    case "itemAction":
      return (
        <>
          <ItemIcons items={description.items} scenery={scenery} />
          <BitmapText className={verbClass}>{description.verb} </BitmapText>
          <ItemDescriptions items={description.items} />
          {timeago}
        </>
      );
    case "editItems":
      return (
        <>
          <ItemIcons items={description.items} scenery={scenery} />
          <BitmapText className={verbClass}>Edit </BitmapText>
          <ItemDescriptions items={description.items} />
          {timeago}
        </>
      );
    case "changeColour":
      return (
        <>
          <span />
          <BitmapText>Change </BitmapText>
          <BitmapText>room colour</BitmapText>
          {timeago}
        </>
      );
    case "changeScenery":
      return (
        <>
          <span />
          <BitmapText>Change </BitmapText>
          <span>
            <BitmapText>scenery to </BitmapText>
            <BitmapText className={verbClass}>
              {description.sceneryName}
            </BitmapText>
          </span>
          {timeago}
        </>
      );
    case "clearRoom":
      return (
        <>
          <span />
          <BitmapText>Clear </BitmapText>
          <BitmapText>room</BitmapText>
          {timeago}
        </>
      );
    case "pasteItems":
      return (
        <>
          <span />
          <BitmapText>Paste </BitmapText>
          <BitmapText>items</BitmapText>
          {timeago}
        </>
      );
    case "editRoomProperty":
      return (
        <>
          <span />
          <BitmapText>Edit </BitmapText>
          <BitmapText>room {description.property}</BitmapText>
          {timeago}
        </>
      );
    case "editRoomJson":
      return (
        <>
          <span />
          <BitmapText>Edit </BitmapText>
          <BitmapText>room JSON</BitmapText>
          {timeago}
        </>
      );
    default:
      return description satisfies never;
  }
};
