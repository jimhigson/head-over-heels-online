/**
 * something dragged (html drag and drop), eg a tab, carried under its own
 * type so drop targets can tell it from anything else dragged over them
 */
export type TabDrag<Payload> = {
  start: (dragEvent: DragEvent, payload: Payload) => void;
  /**
   * whether a drag (over a target) carries this - only the type can be read
   * until it is dropped
   */
  carries: (dragEvent: DragEvent) => boolean;
  /**
   * what was dropped, if it was this
   */
  dropped: (dragEvent: DragEvent) => Payload | undefined;
};

/**
 * identifies this page - a drag's payload means nothing to another page (eg
 * the same app open in another browser tab), whose ids are its own
 */
const pageToken = crypto.randomUUID();

export const tabDrag = <Payload>(
  /**
   * the type it is carried under - a mime type of its own
   */
  dragType: string,
): TabDrag<Payload> => {
  // only the types can be read while a drag is over a target, so this page's
  // token goes in the type, to turn away drags from other pages there:
  const pageDragType = `${dragType}+${pageToken}`;
  return {
    start(dragEvent, payload) {
      const { dataTransfer } = dragEvent;
      if (dataTransfer === null) {
        return;
      }
      dataTransfer.setData(pageDragType, JSON.stringify(payload));
      dataTransfer.effectAllowed = "move";
    },
    carries: (dragEvent) =>
      dragEvent.dataTransfer?.types.includes(pageDragType) ?? false,
    dropped(dragEvent) {
      const payloadJson = dragEvent.dataTransfer?.getData(pageDragType);
      return payloadJson ? (JSON.parse(payloadJson) as Payload) : undefined;
    },
  };
};
