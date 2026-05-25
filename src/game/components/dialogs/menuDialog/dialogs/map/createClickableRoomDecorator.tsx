import { cloneElement, type MouseEvent, type ReactElement } from "react";

import {
  type RoomDecoratorProps,
  type WrapClickableRoomDecoratorComponent,
} from "./RoomDecoratorProps";

export const createClickableRoomDecorator = <RoomId extends string>(
  onClick: (roomId: RoomId, subRoomId: string, e: MouseEvent) => void,
): WrapClickableRoomDecoratorComponent<RoomId> => {
  const ClickableRoomDecorator = ({
    roomId,
    subRoomId,
    children,
  }: RoomDecoratorProps<RoomId> & { children: ReactElement }) =>
    cloneElement(children as ReactElement<Record<string, unknown>>, {
      "data-room-click": `${roomId}/${subRoomId}`,
      onClick: (e: MouseEvent) => onClick(roomId, subRoomId, e),
    });

  return ClickableRoomDecorator;
};
