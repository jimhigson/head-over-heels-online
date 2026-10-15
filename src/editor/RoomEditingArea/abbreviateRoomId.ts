import { type EditorRoomId } from "../editorTypes";

/**
 * shorten a room id to the first letter of each word, keeping any numbers
 * whole - eg `room_31` → `r31`, `button_climb` and `buttonClimb` → `bc`.
 * Words are split at `_`, `-`, spaces, camel-case humps and digit runs
 */
export const abbreviateRoomId = (roomId: EditorRoomId): string =>
  (roomId.match(/\d+|[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g) ?? [roomId])
    .map((word) => (/^\d/.test(word) ? word : word[0].toLowerCase()))
    .join("");
