import type { UnknownAction } from "@reduxjs/toolkit";

import { Container } from "pixi.js";

import type { ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import type {
  EditorItemInPlayUnion,
  EditorRoomId,
  EditorRoomItemId,
} from "../../../../editor/editorTypes";
import type { RootStateWithLevelEditorSlice } from "../../../../editor/slice/levelEditorSlice";
import type {
  ItemInPlay,
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import type { SwitchItemModificationUnion } from "../../../../model/json/SwitchConfig";
import type { JsonMovement } from "../../../../model/json/utilityJsonConfigTypes";
import type { DirectionXy4 } from "../../../../utils/vectors/vectors";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { spritesheetPalette } from "../../../../../gfx/spritesheetPalette";
import {
  changeToRoom,
  selectHoveredItem,
  selectSelectedJsonItemIds,
  selectTool,
  setClickableAnnotationHovered,
} from "../../../../editor/slice/levelEditorSlice";
import { iterateRoomItems } from "../../../../model/RoomState";
import { store } from "../../../../store/store";
import { outlineFilters } from "../../filters/outlineFilter";
import { RevertColouriseFilter } from "../../filters/RevertColouriseFilter";
import { noFilters } from "../../filters/standardFilters";
import { showTextInContainer } from "../../hud/showNumberInContainer";

const selectionColour = spritesheetPalette.pastelBlue;
const pointerHoverFilter = outlineFilters.highlightBeige;
const eyeDropperHoverFilter = outlineFilters.midRed;
const controlHighlightFilter = outlineFilters.white;
const selectedFilter = new RevertColouriseFilter(selectionColour);

const directionArrows = {
  left: `↖`,
  away: `↗`,
  right: `↘`,
  towards: `↙`,
};

const isItemThatControlsOtherItems = (
  item: UnionOfAllItemInPlayTypes<string, string>,
): item is
  | ItemInPlay<"button">
  | (ItemInPlay<"switch"> & {
      config: {
        modifies: Array<
          SwitchItemModificationUnion<EditorRoomId, EditorRoomItemId>
        >;
      };
    }) => {
  return (
    (item.type === "switch" && item.config.type === "in-room") ||
    item.type === "button"
  );
};

const movementPatternAnnotationText = (
  movement: JsonMovement,
  startDirection: DirectionXy4,
) => {
  switch (movement) {
    case "back-forth": {
      switch (startDirection) {
        case "left":
          return "↖↘";
        case "right":
          return "↘↖";
        case "away":
          return "↗↙";
        case "towards":
          return "↙↗";
        default:
          startDirection satisfies never;
          throw new Error(`Unexpected startDirection`);
      }
    }

    case "forwards": {
      switch (startDirection) {
        case "left":
          return "↖";
        case "right":
          return "↘";
        case "away":
          return "↗";
        case "towards":
          return "↙";
        default:
          startDirection satisfies never;
          throw new Error(`Unexpected startDirection`);
      }
    }

    case "clockwise": {
      switch (startDirection) {
        case "left":
          return "↖↗↘↙";
        case "right":
          return "↘↙↖↘";
        case "away":
          return "↗↘↙↖";
        case "towards":
          return "↙↖↗↘";
        default:
          startDirection satisfies never;
          throw new Error(`Unexpected startDirection`);
      }
    }

    case "towards-analogue":
      return "➡.⬅";
  }
  // something we didn't write one for yet
  return "";
};

/** adds annotations on top of the normal item renderer, for items
 *
 * that get extra rendering in the editor:
 *    * selected item visual effect
 *    * hovered item visual effect
 *    * doors (destination and clickthrough)
 */
export class EditorAnnotationsRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  public readonly output: Container = new Container({
    label: "EditorAnnotationsRenderer",
  });

  constructor(
    readonly renderContext: ItemRenderContext<T>,
    private readonly childRenderer: ItemPixiRenderer<T>,
  ) {
    this.output.addChild(childRenderer.output);

    this.#initAnnotations();
    // if (item.type === "doorFrame" && item.config.part === "top") {
    // }
  }

  #initAnnotations() {
    const item = this.renderContext.item as unknown as EditorItemInPlayUnion<T>;

    switch (item.type) {
      case "pickup":
        if (
          item.config.gives === "shield" ||
          item.config.gives === "extra-life" ||
          item.config.gives === "jumps" ||
          item.config.gives === "fast"
        ) {
          // in-game, the 'gives' of the white rabbit is not shown, but in-editor
          // let the editor know this
          const annotationText = {
            shield: "🛡",
            jumps: "♨",
            fast: "⚡",
            "extra-life": "+2",
          };

          this.#addTextAnnotation({
            annotationText: annotationText[item.config.gives],
            yAdj: -16,
          });
        }
        break;

      case "doorFrame":
        if (
          // by annotating the near part of the door, the annotation won't be
          // covered up by a closer part of the same door (render layers don't impact
          // pointer hit testing)
          item.config.part === "near"
        ) {
          const { rooms } = (store.getState() as RootStateWithLevelEditorSlice)
            .levelEditor.campaignInProgress;

          const {
            config: { toRoom, direction },
          } = item;

          const toRoomExists = !!rooms[toRoom];

          const toRoomUpper = toRoom.toUpperCase();

          const arrow = directionArrows[direction];
          const text =
            direction === "away" || direction === "right" ?
              `${toRoomUpper}${arrow}`
            : `${arrow}${toRoomUpper}`;

          this.#addTextAnnotation({
            annotationText: text,
            yAdj: direction === "left" || direction === "away" ? -48 : 0,
            error: !toRoomExists,
            clickDispatch:
              toRoomExists ?
                () => changeToRoom(toRoom as EditorRoomId)
              : undefined,
          });
        }
        break;

      case "teleporter":
        {
          const { rooms } = (store.getState() as RootStateWithLevelEditorSlice)
            .levelEditor.campaignInProgress;

          const {
            config: { toRoom },
          } = item;

          const toRoomExists = !!rooms[toRoom];

          this.#addTextAnnotation({
            annotationText: `➡${toRoom.toUpperCase()}`,
            yAdj: -12,
            error: !toRoomExists,
            clickDispatch:
              toRoomExists ?
                () => changeToRoom(toRoom as EditorRoomId)
              : undefined,
          });
        }
        break;

      case "conveyor":
        {
          const {
            config: { direction },
          } = item;

          const arrow = directionArrows[direction];

          this.#addTextAnnotation({ annotationText: arrow, yAdj: -12 });
        }
        break;

      case "movingPlatform":
        {
          const {
            config: { movement, startDirection },
          } = item;

          this.#addTextAnnotation({
            annotationText: movementPatternAnnotationText(
              movement,
              startDirection,
            ),
            yAdj: -12,
          });
        }
        break;

      case "monster":
        {
          const { config } = item;

          if (config.which === "turtle" || config.which === "skiHead") {
            this.#addTextAnnotation({
              annotationText: movementPatternAnnotationText(
                config.movement,
                config.startDirection,
              ),
              yAdj: -12,
            });
          }
        }
        break;
    }
  }

  #addTextAnnotation({
    annotationText,
    yAdj = 0,
    error = false,
    clickDispatch,
  }: {
    annotationText: string;
    yAdj?: number;
    error?: boolean;
    clickDispatch?: () => UnknownAction;
  }) {
    // this needs pixi 8.10, but that had some regressions when I tried it:
    // function renderJSXToDOM(jsx: ReactElement): HTMLDivElement {
    //   const container = document.createElement("div");
    //   const root = createRoot(container);
    //   root.render(jsx);
    //   return container;
    // }
    // const textArea = new DOMContainer({
    //   element: document.createElement("textarea"),
    //   anchor: { x: 0, y: 0 },
    // });

    const {
      renderContext: { frontLayer },
    } = this;

    const colourFilter = new RevertColouriseFilter(
      error ? spritesheetPalette.midRed : spritesheetPalette.white,
    );
    const annotationContainer = showTextInContainer(
      new Container({
        label: "EditorAnnotationTextContainer",
        filters: [colourFilter, outlineFilters.pureBlack],
      }),
      annotationText,
    );
    annotationContainer.y = yAdj;

    if (clickDispatch !== undefined) {
      annotationContainer.eventMode = "static";

      annotationContainer.on("click", () => {
        // ⬇️ doesn't work (won't stop click getting to the div wrapping the canvas that the editor is listening to)
        // e.nativeEvent.stopPropagation();
        store.dispatch(clickDispatch());
      });
      annotationContainer.on("mouseover", () => {
        if (
          (store.getState() as RootStateWithLevelEditorSlice).levelEditor.tool
            .type !== "pointer"
        ) {
          return;
        }
        // TODO: this is over-dispatching - need some way to
        // prevent firing when enter/leave children
        store.dispatch(setClickableAnnotationHovered(true));
        colourFilter.targetColor = spritesheetPalette.pastelBlue;
      });
      annotationContainer.on("mouseout", () => {
        store.dispatch(setClickableAnnotationHovered(false));
        colourFilter.targetColor = spritesheetPalette.white;
      });
      annotationContainer.cursor = "pointer";
    }

    this.output.addChild(annotationContainer);
    frontLayer.attach(annotationContainer);
  }

  tick(tickContext: ItemTickContext) {
    this.#updateSelectedAndHovered();

    this.childRenderer.tick(tickContext);
  }

  #updateSelectedAndHovered() {
    const {
      renderContext: { item, room },
    } = this;

    const { clickableAnnotationHovered } = (
      store.getState() as RootStateWithLevelEditorSlice
    ).levelEditor;

    const { jsonItemId } = item;

    const state = store.getState() as RootStateWithLevelEditorSlice;
    const hoveredJsonItem = selectHoveredItem(state);
    const selectedJsonItemIds = selectSelectedJsonItemIds(state);
    const tool = selectTool(state);

    const isHovered =
      jsonItemId &&
      hoveredJsonItem?.jsonItemId === jsonItemId &&
      !clickableAnnotationHovered;
    const isSelected =
      jsonItemId && (selectedJsonItemIds as string[]).includes(jsonItemId);

    const showControlHighlight = () =>
      jsonItemId !== undefined &&
      // when switch is hovered, highlight the items it controls:
      (iterateRoomItems(room.items).some((otherItem) => {
        return (
          otherItem.jsonItemId === hoveredJsonItem?.jsonItemId &&
          isItemThatControlsOtherItems(otherItem) &&
          otherItem.config.modifies.some((m) => {
            return (
              m.expectType === item.type &&
              (m.targets === undefined || m.targets.includes(jsonItemId))
            );
          })
        );
      }) ||
        // highlight the switch when the item it is connected to is hovered
        (isItemThatControlsOtherItems(item) &&
          iterateRoomItems(room.items).some(
            ({
              jsonItemId: maybeSwitchedItemJsonItemId,
              type: maybeSwitchedItemType,
            }) => {
              return (
                maybeSwitchedItemJsonItemId !== undefined &&
                maybeSwitchedItemJsonItemId === hoveredJsonItem?.jsonItemId &&
                item.config.modifies.some(
                  (m) =>
                    m.expectType === maybeSwitchedItemType &&
                    (m.targets === undefined ||
                      m.targets.includes(maybeSwitchedItemJsonItemId)),
                )
              );
            },
          )) ||
        // highlight charles when controlling joystick hovered:
        (item.type === "charles" &&
          iterateRoomItems(room.items).some((otherItem) => {
            return (
              otherItem.jsonItemId === hoveredJsonItem?.jsonItemId &&
              otherItem.type === "joystick" &&
              otherItem.config.controls.some((c) => c === jsonItemId)
            );
          })) ||
        // highlight joysticks when the charles they control is hovered:
        (item.type === "joystick" &&
          item.config.controls.some((c) => hoveredJsonItem?.jsonItemId === c)));

    this.output.filters =
      isHovered && isSelected ?
        [
          selectedFilter,
          tool.type === "eyeDropper" ?
            eyeDropperHoverFilter
          : pointerHoverFilter,
        ]
      : isHovered ?
        tool.type === "eyeDropper" ?
          eyeDropperHoverFilter
        : pointerHoverFilter
      : isSelected ? selectedFilter
      : showControlHighlight() ? controlHighlightFilter
      : noFilters;
  }

  destroy(): void {
    this.output.destroy();
    this.childRenderer.destroy();
  }
}

/**
 * create this renderer *iff* we are rendering in the editor
 */
export const maybeWrapInEditorSelectedRenderer = <T extends ItemInPlayType>(
  item: ItemTypeUnion<T, string, string>,
  itemRenderContext: ItemRenderContext<T>,
  childRenderer: ItemPixiRenderer<T>,
): ItemPixiRenderer<T> => {
  return itemRenderContext.general.editor ?
      (new EditorAnnotationsRenderer(
        itemRenderContext as ItemRenderContext<T>,
        childRenderer,
      ) as ItemPixiRenderer<T>)
    : childRenderer;
};
