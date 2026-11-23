import type { EditorCommandPresentation } from "../../../../../../editor/commands/EditorCommand";

/**
 * goes to a room, from the in-game cmd-k menu
 */
export type GoToRoomCommand<RoomId extends string> =
  EditorCommandPresentation & {
    type: "goToRoom";
    roomId: RoomId;
  };

/**
 * a command to go to each of the rooms, keyed `room.<roomId>`
 */
export const goToRoomCommandDefinitions = <RoomId extends string>(
  roomIds: readonly RoomId[],
): Record<`room.${string}`, GoToRoomCommand<RoomId>> =>
  Object.fromEntries(
    roomIds.map((roomId) => [
      `room.${roomId}`,
      {
        type: "goToRoom",
        label: `Room: ${roomId}`,
        roomId,
      } satisfies GoToRoomCommand<RoomId>,
    ]),
  );
