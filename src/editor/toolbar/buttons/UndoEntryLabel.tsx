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
        <span className="text-single-line">{describeItem(item)} </span>
        <span className={`${idClass} text-single-line`}>{`'${id}'`}</span>
      </span>
    );
  }

  const types = new Set(items.map(([, item]) => item.type));

  if (types.size === 1) {
    const [type] = types;
    return (
      <span className="text-single-line">
        {items.length} {camelToSpaced(type)}s
      </span>
    );
  }

  return <span className="text-single-line">{items.length} items</span>;
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
          <span className={`${verbClass} text-single-line`}>
            {description.verb}{" "}
          </span>
          <ItemDescriptions items={description.items} />
          {timeago}
        </>
      );
    case "editItems":
      return (
        <>
          <ItemIcons items={description.items} scenery={scenery} />
          <span className={`${verbClass} text-single-line`}>Edit </span>
          <ItemDescriptions items={description.items} />
          {timeago}
        </>
      );
    case "changeColour":
      return (
        <>
          <span />
          <span className="text-single-line">Change </span>
          <span className="text-single-line">room colour</span>
          {timeago}
        </>
      );
    case "changeScenery":
      return (
        <>
          <span />
          <span className="text-single-line">Change </span>
          <span>
            <span className="text-single-line">scenery to </span>
            <span className={`${verbClass} text-single-line`}>
              {description.sceneryName}
            </span>
          </span>
          {timeago}
        </>
      );
    case "clearRoom":
      return (
        <>
          <span />
          <span className="text-single-line">Clear </span>
          <span className="text-single-line">room</span>
          {timeago}
        </>
      );
    case "pasteItems":
      return (
        <>
          <span />
          <span className="text-single-line">Paste </span>
          <span className="text-single-line">items</span>
          {timeago}
        </>
      );
    case "editRoomProperty":
      return (
        <>
          <span />
          <span className="text-single-line">Edit </span>
          <span className="text-single-line">room {description.property}</span>
          {timeago}
        </>
      );
    case "editRoomJson":
      return (
        <>
          <span />
          <span className="text-single-line">Edit </span>
          <span className="text-single-line">room JSON</span>
          {timeago}
        </>
      );
    default:
      return description satisfies never;
  }
};
