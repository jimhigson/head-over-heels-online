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

export const tabDrag = <Payload>(
  /**
   * the type it is carried under - a mime type of its own
   */
  dragType: string,
): TabDrag<Payload> => ({
  start(dragEvent, payload) {
    const { dataTransfer } = dragEvent;
    if (dataTransfer === null) {
      return;
    }
    dataTransfer.setData(dragType, JSON.stringify(payload));
    dataTransfer.effectAllowed = "move";
  },
  carries: (dragEvent) =>
    dragEvent.dataTransfer?.types.includes(dragType) ?? false,
  dropped(dragEvent) {
    const payloadJson = dragEvent.dataTransfer?.getData(dragType);
    return payloadJson ? (JSON.parse(payloadJson) as Payload) : undefined;
  },
});
