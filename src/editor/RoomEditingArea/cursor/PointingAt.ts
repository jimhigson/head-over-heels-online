import type { Simplify } from "type-fest";
import type { DirectionXyz4, Xy, Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../../EditorRoomId";

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

export type PointingAtItem = Simplify<
  BasePointingAt & {
    world: {
      itemId: EditorRoomItemId;
      /**
       * which face of the item's aabb have we interpreted the pointer
       * to be pointed at? Usually one of the visible faces, but can
       * be a 'back' face in some cases, like placing a door on an
       * invisible wall
       */
      face: DirectionXyz4;
      /** the position of location being pointed at, in world coords */
      position: Xyz;
    };
  }
>;

export type MaybePointingAtSomething = PointingAtItem | PointingAtNothing;
