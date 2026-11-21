import { memo } from "preact/compat";

import type { SceneryName } from "../../../sprites/planets";
import { itemGlyph, textureForItem } from "../../../sprites/textureForItem";
import { useEditorAppSelector } from "../../../store/store";
import { Timeago } from "../../../ui/Timeago";
import { camelToSpaced } from "../../../utils/camelToSpaced";
import { twClass } from "../../../utils/twClass.tsx";
import type { EditorJsonItemUnion, EditorRoomId } from "../../editorTypes";
import { selectCursorRoomId } from "../../slice/levelEditorSlice";
import {
  describeItem,
  type UndoItemEntry,
} from "../../slice/reducers/undoDescription";
import {
  type HistoryDirection,
  isLinkedStepNext,
  type UndoHistoryItem,
  type UndoLink,
} from "../../slice/reducers/undoReducers";
import type { WhichEditorGhostOfAnyItemType } from "../../WhichEditorGhostOf";

const maxIcons = 3;

/**
 * names an editor ghost after its item's own description, eg "lift 'l' top"
 */
const editorGhostDescriptions = {
  liftTop: "top",
  liftBottom: "bottom",
  emittedItem: "emitted item",
} as const satisfies Record<WhichEditorGhostOfAnyItemType, string>;

const verbClass = "text-highlightBeige";
const idClass = "text-pastelBlue";

type ItemIconProps = {
  item: EditorJsonItemUnion;
  scenery: SceneryName;
};

const ItemIcon = ({ item, scenery }: ItemIconProps) => {
  const glyph = itemGlyph(item);
  return glyph !== undefined ?
      <span class="text-single-line inline-block [--scale:1]">{glyph}</span>
    : <span
        class={twClass(
          `sprite ${textureForItem(item, scenery)} inline-block [--scale:1]`,
        )}
      />;
};

const ItemIcons = ({
  items,
  scenery,
}: {
  items: UndoItemEntry[];
  scenery: SceneryName;
}) => (
  <span>
    {items
      .slice(0, maxIcons)
      .map(([{ jsonItemId, whichEditorGhost }, item]) => (
        <ItemIcon
          key={`${jsonItemId}-${whichEditorGhost}`}
          item={item}
          scenery={scenery}
        />
      ))}
  </span>
);

const ItemDescriptions = ({ items }: { items: UndoItemEntry[] }) => {
  if (items.length === 1) {
    const [[{ jsonItemId, whichEditorGhost }, item]] = items;
    return (
      <span>
        <span class="text-single-line">{describeItem(item)} </span>
        <span class={`${idClass} text-single-line`}>{`'${jsonItemId}'`}</span>
        {whichEditorGhost !== undefined && (
          <span class="text-single-line">
            {` ${editorGhostDescriptions[whichEditorGhost]}`}
          </span>
        )}
      </span>
    );
  }

  const types = new Set(items.map(([, item]) => item.type));

  if (types.size === 1) {
    const [type] = types;
    return (
      <span class="text-single-line">
        {items.length} {camelToSpaced(type)}s
      </span>
    );
  }

  return <span class="text-single-line">{items.length} items</span>;
};

export const undoHistoryGridClassName =
  "grid grid-cols-[auto_auto_1fr_auto] items-center";

export const undoHistorySubgridClassName =
  "grid grid-cols-subgrid col-span-full";

type LinkedRoomProps = {
  roomId: EditorRoomId;
  link: UndoLink;
  direction: HistoryDirection;
};

/**
 * a room the entry's edit was also to - and, if something else has been done
 * there since, that it has to be undone (or redone) there
 */
const LinkedRoom = ({ roomId, link, direction }: LinkedRoomProps) => {
  const isNext = useEditorAppSelector((state) =>
    isLinkedStepNext(state.levelEditor.history[roomId], direction, link),
  );
  return (
    <span class="text-single-line">
      <span class={idClass}>{`'${roomId}'`}</span>
      {isNext ? "" : ` (changed since: ${direction} it there)`}
    </span>
  );
};

type LinkedRoomsProps = {
  link: undefined | UndoLink;
  direction: HistoryDirection;
};

/**
 * the other rooms an entry's edit was to, which undo and redo with it
 */
const LinkedRooms = ({ link, direction }: LinkedRoomsProps) => {
  const cursorRoomId = useEditorAppSelector(selectCursorRoomId);
  if (link === undefined) {
    return null;
  }
  return (
    <span class="text-single-line">
      {" with "}
      {link.roomIds
        .filter((roomId) => roomId !== cursorRoomId)
        .map((roomId) => (
          <LinkedRoom
            key={roomId}
            roomId={roomId}
            link={link}
            direction={direction}
          />
        ))}
    </span>
  );
};

type MoveBetweenRoomsRoomsProps = {
  fromRoomId: EditorRoomId;
  toRoomId: EditorRoomId;
  link: undefined | UndoLink;
  direction: HistoryDirection;
};

/**
 * where items moved between rooms went, as seen from the room whose history it
 * is: to the other room, from it, or (for a room only changed by the move,
 * eg its teleporters) from one to the other
 */
const MoveBetweenRoomsRooms = ({
  fromRoomId,
  toRoomId,
  link,
  direction,
}: MoveBetweenRoomsRoomsProps) => {
  const cursorRoomId = useEditorAppSelector(selectCursorRoomId);
  const room = (roomId: EditorRoomId) =>
    link === undefined ?
      <span class={`${idClass} text-single-line`}>{`'${roomId}'`}</span>
    : <LinkedRoom roomId={roomId} link={link} direction={direction} />;
  return (
    <span class="text-single-line">
      {cursorRoomId === fromRoomId ?
        <>
          {" to "}
          {room(toRoomId)}
        </>
      : cursorRoomId === toRoomId ?
        <>
          {" from "}
          {room(fromRoomId)}
        </>
      : <>
          {" from "}
          {room(fromRoomId)}
          {" to "}
          {room(toRoomId)}
        </>
      }
    </span>
  );
};

export type UndoEntryLabelProps = {
  entry: UndoHistoryItem;
  scenery: SceneryName;
  /**
   * whether the entry is to undo or to redo
   */
  direction: HistoryDirection;
};

const UndoEntryLabelUnmemoised = ({
  entry: { description, timestamp, link },
  scenery,
  direction,
}: UndoEntryLabelProps) => {
  const timeago = <Timeago timestamp={timestamp} class="text-lightGrey" />;

  switch (description.kind) {
    case "itemAction":
      return (
        <>
          <ItemIcons items={description.items} scenery={scenery} />
          <span class={`${verbClass} text-single-line`}>
            {description.verb}{" "}
          </span>
          <span>
            <ItemDescriptions items={description.items} />
            <LinkedRooms link={link} direction={direction} />
          </span>
          {timeago}
        </>
      );
    case "moveBetweenRooms":
      return (
        <>
          <ItemIcons items={description.items} scenery={scenery} />
          <span class={`${verbClass} text-single-line`}>Move </span>
          <span>
            <ItemDescriptions items={description.items} />
            <MoveBetweenRoomsRooms
              fromRoomId={description.fromRoomId}
              toRoomId={description.toRoomId}
              link={link}
              direction={direction}
            />
          </span>
          {timeago}
        </>
      );
    case "editItems":
      return (
        <>
          <ItemIcons items={description.items} scenery={scenery} />
          <span class={`${verbClass} text-single-line`}>Edit </span>
          <ItemDescriptions items={description.items} />
          {timeago}
        </>
      );
    case "changeColour":
      return (
        <>
          <span />
          <span class="text-single-line">Change </span>
          <span class="text-single-line">room colour</span>
          {timeago}
        </>
      );
    case "changeScenery":
      return (
        <>
          <span />
          <span class="text-single-line">Change </span>
          <span>
            <span class="text-single-line">scenery to </span>
            <span class={`${verbClass} text-single-line`}>
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
          <span class="text-single-line">Clear </span>
          <span class="text-single-line">room</span>
          {timeago}
        </>
      );
    case "pasteItems":
      return (
        <>
          <span />
          <span class="text-single-line">Paste </span>
          <span class="text-single-line">items</span>
          {timeago}
        </>
      );
    case "editRoomProperty":
      return (
        <>
          <span />
          <span class="text-single-line">Edit </span>
          <span class="text-single-line">room {description.property}</span>
          {timeago}
        </>
      );
    case "editRoomJson":
      return (
        <>
          <span />
          <span class="text-single-line">Edit </span>
          <span class="text-single-line">room JSON</span>
          {timeago}
        </>
      );
    case "renameRoom":
      return (
        <>
          <span />
          <span class={`${verbClass} text-single-line`}>Rename </span>
          <span class="text-single-line">
            <span class={idClass}>{`'${description.fromRoomId}'`}</span>
            {" to "}
            <span class={idClass}>{`'${description.toRoomId}'`}</span>
          </span>
          {timeago}
        </>
      );
    default:
      return description satisfies never;
  }
};

/**
 * an undo or redo entry's label, redrawn only when its own entry changes - so
 * pushing to the history doesn't redraw the whole of it
 */
export const UndoEntryLabel = memo(UndoEntryLabelUnmemoised);
