import { useEffect } from "preact/hooks";

import {
  type RoomBehaviourComponent,
  type RoomBehaviourProps,
} from "./RoomDecoratorProps";

export const createClickableRoomBehaviour = <RoomId extends string>(
  onClick: (roomId: RoomId, subRoomId: string, e: MouseEvent) => void,
): RoomBehaviourComponent<RoomId> => {
  const ClickableRoomBehaviour = ({
    roomId,
    subRoomId,
    interactiveAreaRef,
  }: RoomBehaviourProps<RoomId>) => {
    useEffect(() => {
      const el = interactiveAreaRef.current;
      if (!el) {
        return;
      }

      const handler = (e: MouseEvent) => onClick(roomId, subRoomId, e);

      el.addEventListener("click", handler);
      el.dataset.roomClick = `${roomId}/${subRoomId}`;
      return () => {
        el.removeEventListener("click", handler);
        delete el.dataset.roomClick;
      };
    }, [interactiveAreaRef, roomId, subRoomId]);

    return null;
  };

  return ClickableRoomBehaviour;
};
