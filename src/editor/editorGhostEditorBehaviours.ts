import {
  addXyz,
  elementWiseProductXyz,
  manhattanLengthXyz,
  unitXyz,
  type Xyz,
} from "../utils/vectors/vectors";
import type { EditorJsonItem, EditorJsonItemUnion } from "./editorTypes";
import type {
  ItemTypeWithEditorGhosts,
  WhichEditorGhostOf,
  WhichEditorGhostOfAnyItemType,
} from "./WhichEditorGhostOf";

/**
 * how a kind of editor ghost of items of type `T` is placed in its item's json, so
 * the editor can move it like an item - stateless, like the game's item
 * behaviours
 */
export type EditorGhostEditorBehaviour<T extends ItemTypeWithEditorGhosts> = {
  /**
   * where the editor ghost is, in blocks
   */
  blockPosition: (jsonItem: EditorJsonItem<T>) => Xyz;
  /**
   * if the user edits a part of an item, update the json item to reflect that
   * edit and return the new version of the item
   */
  getEditedItemWhenEditorGhostMoves: (
    jsonItem: EditorJsonItem<T>,
    destinationPositionOfEditorGhost: Xyz,
  ) => EditorJsonItem<T>;
  /**
   * the axes the editor ghost can move on (1) or not (0)
   */
  movableVector: Xyz;
};

/**
 * a lift's top or bottom: where the lift is in x and y, at that end's height.
 * It moves only up and down, never past the other end or below the floor
 */
const liftEndEditorGhostEditorBehaviour = (
  end: "bottom" | "top",
): EditorGhostEditorBehaviour<"lift"> => ({
  blockPosition: ({ position, config }) => ({ ...position, z: config[end] }),
  getEditedItemWhenEditorGhostMoves(jsonItem, { z }) {
    const { config } = jsonItem;
    return {
      ...jsonItem,
      config:
        end === "top" ?
          { ...config, top: Math.max(config.bottom, z) }
        : { ...config, bottom: Math.min(config.top, Math.max(0, z)) },
    };
  },
  movableVector: { x: 0, y: 0, z: 1 },
});

/**
 * what an emitter emits, drawn where the emitter is - moving it moves the
 * emitter
 */
const emittedItemEditorGhostEditorBehaviour: EditorGhostEditorBehaviour<"emitter"> =
  {
    blockPosition: ({ position }) => position,
    getEditedItemWhenEditorGhostMoves: (
      jsonItem,
      destinationPositionOfEditorGhost,
    ) => ({
      ...jsonItem,
      position: destinationPositionOfEditorGhost,
    }),
    movableVector: unitXyz,
  };

type EditorGhostEditorBehavioursOfItemType<T extends ItemTypeWithEditorGhosts> =
  Record<WhichEditorGhostOf<T>, EditorGhostEditorBehaviour<T>>;

/**
 * the behaviour of each editor ghost of each type of item that has editor ghosts
 */
export const editorGhostEditorBehaviours: {
  [T in ItemTypeWithEditorGhosts]: EditorGhostEditorBehavioursOfItemType<T>;
} = {
  lift: {
    liftTop: liftEndEditorGhostEditorBehaviour("top"),
    liftBottom: liftEndEditorGhostEditorBehaviour("bottom"),
  },
  emitter: {
    emittedItem: emittedItemEditorGhostEditorBehaviour,
  },
};

export const isJsonItemWithEditorGhosts = (
  jsonItem: EditorJsonItemUnion,
): jsonItem is Extract<
  EditorJsonItemUnion,
  { type: ItemTypeWithEditorGhosts }
> => jsonItem.type in editorGhostEditorBehaviours;

const isWhichEditorGhostOfItemType = <T extends ItemTypeWithEditorGhosts>(
  behavioursOfItemType: EditorGhostEditorBehavioursOfItemType<T>,
  whichEditorGhost: WhichEditorGhostOfAnyItemType,
): whichEditorGhost is WhichEditorGhostOf<T> =>
  whichEditorGhost in behavioursOfItemType;

/**
 * the behaviour of one of an item's editor ghosts - undefined if the item has
 * no such editor ghost
 */
export const maybeEditorGhostEditorBehaviour = <
  T extends ItemTypeWithEditorGhosts,
>(
  jsonItem: EditorJsonItem<T>,
  whichEditorGhost: WhichEditorGhostOfAnyItemType,
): EditorGhostEditorBehaviour<T> | undefined => {
  const behavioursOfItemType: EditorGhostEditorBehavioursOfItemType<T> =
    editorGhostEditorBehaviours[jsonItem.type];
  return isWhichEditorGhostOfItemType(behavioursOfItemType, whichEditorGhost) ?
      behavioursOfItemType[whichEditorGhost]
    : undefined;
};

/**
 * the item, edited for one of its editor ghosts being moved by `blockDelta` on
 * the axes the editor ghost can move on - undefined if that moves it nowhere, or the
 * item has no such editor ghost
 */
export const jsonItemWithEditorGhostMoved = (
  ownerJsonItem: EditorJsonItemUnion,
  whichEditorGhost: WhichEditorGhostOfAnyItemType,
  blockDelta: Xyz,
): EditorJsonItemUnion | undefined => {
  if (!isJsonItemWithEditorGhosts(ownerJsonItem)) {
    return undefined;
  }
  const behaviour = maybeEditorGhostEditorBehaviour(
    ownerJsonItem,
    whichEditorGhost,
  );
  if (behaviour === undefined) {
    return undefined;
  }
  const editorGhostDelta = elementWiseProductXyz(
    blockDelta,
    behaviour.movableVector,
  );
  if (manhattanLengthXyz(editorGhostDelta) === 0) {
    return undefined;
  }
  // typescript can't relate the behaviour's item type to the narrowed item's,
  // so the edited item comes back as a json item of either type:
  return behaviour.getEditedItemWhenEditorGhostMoves(
    ownerJsonItem,
    addXyz(behaviour.blockPosition(ownerJsonItem), editorGhostDelta),
  ) as EditorJsonItemUnion;
};
