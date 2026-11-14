import { type ComponentChildren } from "preact";
import { useState } from "preact/hooks";

/**
 * the side of a pane something is put beside
 */
type DropSide = "bottom" | "left" | "right" | "top";

/**
 * where over a pane something dragged there would go: beside it, or into it
 * (the centre)
 */
export type PaneDropPlace = "centre" | DropSide;

/**
 * how near a pane's edge (as a fraction of its size) a drop must be to go
 * beside it
 */
const edgeFraction = 0.25;

const paneDropPlace = (
  paneElement: HTMLElement,
  clientX: number,
  clientY: number,
): PaneDropPlace => {
  const { left, top, width, height } = paneElement.getBoundingClientRect();
  const fractionAcross = (clientX - left) / width;
  const fractionDown = (clientY - top) / height;
  const [[nearestSide, nearestDistance]] = (
    [
      ["left", fractionAcross],
      ["right", 1 - fractionAcross],
      ["top", fractionDown],
      ["bottom", 1 - fractionDown],
    ] satisfies Array<[DropSide, number]>
  ).toSorted(([, a], [, b]) => a - b);
  return nearestDistance < edgeFraction ? nearestSide : "centre";
};

/**
 * the part of the pane a drop would take, shown while dragging
 */
const dropPlaceClassNames = {
  centre: "inset-0",
  left: "inset-y-0 left-0 right-[50%]",
  right: "inset-y-0 right-0 left-[50%]",
  top: "inset-x-0 top-0 bottom-[50%]",
  bottom: "inset-x-0 bottom-0 top-[50%]",
} as const satisfies Record<PaneDropPlace, string>;

export type PaneDropZonesProps = {
  /**
   * whether a drag over the pane can be dropped on it
   */
  acceptsDrag: (dragEvent: DragEvent) => boolean;
  /**
   * a drag the pane accepts was dropped, beside it or into it
   */
  onDropAt: (dragEvent: DragEvent, place: PaneDropPlace) => void;
  class?: string;
  children: ComponentChildren;
};

/**
 * a pane that something dragged can be dropped beside (near an edge) or into
 * (the centre), highlighting where while it is dragged. Drags over a
 * `TabBar` inside are left to the bar
 */
export const PaneDropZones = ({
  acceptsDrag,
  onDropAt,
  class: className,
  children,
}: PaneDropZonesProps) => {
  const [dropPlace, setDropPlace] = useState<PaneDropPlace | undefined>(
    undefined,
  );

  return (
    <div
      class={`relative ${className ?? ""}`}
      onDragOver={(dragEvent) => {
        if (!acceptsDrag(dragEvent)) {
          return;
        }
        const { target, currentTarget, clientX, clientY } = dragEvent;
        if (
          target instanceof Element &&
          target.closest("[data-tab-bar]") !== null
        ) {
          setDropPlace(undefined);
          return;
        }
        dragEvent.preventDefault();
        setDropPlace(paneDropPlace(currentTarget, clientX, clientY));
      }}
      onDragLeave={(dragEvent) => {
        const { relatedTarget, currentTarget } = dragEvent;
        // still over the pane, just over another part of it:
        if (
          relatedTarget instanceof Node &&
          currentTarget.contains(relatedTarget)
        ) {
          return;
        }
        setDropPlace(undefined);
      }}
      onDrop={(dragEvent) => {
        setDropPlace(undefined);
        if (dropPlace === undefined || !acceptsDrag(dragEvent)) {
          return;
        }
        dragEvent.preventDefault();
        onDropAt(dragEvent, dropPlace);
      }}
    >
      {children}
      {dropPlace !== undefined && (
        <div
          class={`absolute ${dropPlaceClassNames[dropPlace]} bg-moss opacity-30 pointer-events-none z-slightlyAbove`}
        />
      )}
    </div>
  );
};
