import { cloneElement, type ReactElement } from "react";

import type {
  RoomDecoratorProps,
  WrapClickableRoomDecoratorComponent,
} from "./RoomDecoratorProps";

export const createClickableRoomDecorator = <RoomId extends string>(
  onClick: (roomId: RoomId, subRoomId: string) => void,
): WrapClickableRoomDecoratorComponent<RoomId> => {
  const ClickableRoomDecorator = ({
    roomId,
    subRoomId,
    children,
  }: RoomDecoratorProps<RoomId> & { children: ReactElement }) =>
    cloneElement(children as ReactElement<Record<string, unknown>>, {
      "data-room-click": `${roomId}/${subRoomId}`,
      onClick: () => onClick(roomId, subRoomId),
    });

  return ClickableRoomDecorator;
};
