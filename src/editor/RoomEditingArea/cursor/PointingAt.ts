import type { Simplify } from "type-fest";
import type { Plane, Xy, Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../../editorTypes";

export type BasePointingAt = {
  /** the room that we're pointing at */
  roomId: EditorRoomId;
  /** the xy position of the pointer */
  scrXy: Xy;
};

export type PointingAtNothing = Simplify<
  BasePointingAt & {
    world: undefined;
  }
>;

export type PointingAtOnItem = {
  /**
   * vector of the direction to the face being pointed to from the
   * centre of the object
   *
   * which face of the item's aabb have we interpreted the pointer
   * to be pointed at? Usually one of the visible faces, but can
   * be a 'back' face in some cases, like placing a door on an
   * invisible wall
   */
  face: Xyz;

  /**
   * the corner being pointed at, if any
   */
  corner?: Xyz;

  /**
   * Plane defines the plane of resizing from this edge,
   * and the position of the edge, in terms of the item's aabb
   */
  edge?: Plane;
};

export type PointingAtItem = Simplify<
  BasePointingAt & {
    world: {
      /**
       * the in-play item that was pointed at
       */
      itemId: EditorRoomItemId;
      /**
       * the position of location being pointed at, in world coords
       */
      position: Xyz;
      /**
       * which face of the item's aabb have we interpreted the pointer
       * to be pointed at? Usually one of the visible faces, but can
       * be a 'back' face in some cases, like placing a door on an
       * invisible wall
       */
      onItem: PointingAtOnItem;
    };
  }
>;

export type MaybePointingAtSomething = PointingAtItem | PointingAtNothing;
