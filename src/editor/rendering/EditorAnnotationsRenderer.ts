import { type UnknownAction } from "@reduxjs/toolkit";
import { type Color, Container } from "pixi.js";
import { type AllUnionFields } from "type-fest";

import { OutlineFilter } from "../../game/render/filters/OutlineFilter";
import { RevertColouriseFilter } from "../../game/render/filters/RevertColouriseFilter";
import { noFilters } from "../../game/render/filters/standardFilters";
import { type DecorateItemMaybeRenderer } from "../../game/render/item/itemRender/DecorateItemRenderer";
import { type ItemChainPixiRenderer } from "../../game/render/item/itemRender/ItemPixiRenderer";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../game/render/ItemRenderContexts";
import { TextContainer } from "../../game/render/text/TextContainer";
import {
  type ItemInPlay,
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import { exitGameRoomId } from "../../model/json/ItemConfigMap";
import { type SwitchItemModificationUnion } from "../../model/json/SwitchConfig";
import { type JsonMovement } from "../../model/json/utilityJsonConfigTypes";
import { roomItemsIterable } from "../../model/RoomState";
import { paletteBlockstack } from "../../sprites/palette/spritesheetPalette";
import { editorStore, store } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import { isNegativeSideXy, type Xy } from "../../utils/vectors/vectors";
import {
  type EditorItemInPlayUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { editorUiScale } from "../editorUiScale";
import { type EditorViewport } from "../RoomEditingArea/viewport/EditorViewport";
import {
  changeToRoom,
  selectHoveredItem,
  selectSelectedJsonItemIds,
  selectTool,
  setClickableAnnotationHovered,
} from "../slice/levelEditorSlice";

const selectionColour = paletteBlockstack.pastelBlue;
const monsterWakesColour = paletteBlockstack.lightBeige;
const selectedFilter = new RevertColouriseFilter(selectionColour);

/**
 * outline filters owned by the editor, whose width tracks the viewport zoom so
 * outlines are always one *game* pixel thick - unlike the shared prebaked
 * {@link outlineFilters}, whose width follows the game's global upscale
 */
type EditorOutlineFilters = {
  pointerHover: OutlineFilter;
  monsterWakes: OutlineFilter;
  eyeDropperHover: OutlineFilter;
  controlHighlight: OutlineFilter;
};

const makeEditorOutlineFilters = (
  viewport: EditorViewport,
): EditorOutlineFilters => {
  // the outline is always exactly one game pixel, aligned to the sprite's own
  // pixel grid: width stays 1 and the filter's *resolution* tracks the inverse
  // of the zoom, so it rasterises the item at one texel per game pixel, dilates
  // by one texel, and nearest-upscales back to the screen blocky:
  const filters: EditorOutlineFilters = {
    pointerHover: new OutlineFilter({
      color: paletteBlockstack.highlightBeige,
      width: 1,
    }),
    monsterWakes: new OutlineFilter({
      color: monsterWakesColour,
      width: 1,
    }),
    eyeDropperHover: new OutlineFilter({
      color: paletteBlockstack.midRed,
      width: 1,
    }),
    controlHighlight: new OutlineFilter({
      color: paletteBlockstack.white,
      width: 1,
    }),
  };

  // the subscription lives as long as the viewport (which lives as long as
  // the pixi app):
  const trackZoom = () => {
    const { zoom } = viewport;
    for (const filter of valuesIter(filters)) {
      filter.resolution = 1 / zoom;
      // the one-game-pixel outline needs one game pixel of clearance, in
      // screen pixels (pixi truncates padding to an integer):
      filter.padding = Math.ceil(zoom);
    }
  };
  viewport.onChange(trackZoom);
  trackZoom();

  return filters;
};
const textAnnotationNormalColour = paletteBlockstack.white;
const textAnnotationErrorColour = paletteBlockstack.midRed;
const textClickableAnnotationHoverColour = paletteBlockstack.pastelBlue;

/** the isometric arrow glyph pointing along a cardinal direction vector */
const directionArrow = ({ x, y }: Xy): string =>
  y > 0 ?
    `↗` // away
  : y < 0 ?
    `↙` // towards
  : x > 0 ?
    `↖` // left
  : `↘`; // right

const isItemThatControlsOtherItems = (
  item: UnionOfAllItemInPlayTypes<string, string>,
): item is
  | (ItemInPlay<"button"> & {
      config: {
        type: "in-room";
        modifies: Array<
          SwitchItemModificationUnion<EditorRoomId, EditorRoomItemId>
        >;
      };
    })
  | (ItemInPlay<"switch"> & {
      config: {
        modifies: Array<
          SwitchItemModificationUnion<EditorRoomId, EditorRoomItemId>
        >;
      };
    }) => {
  return (
    (item.type === "switch" && item.config.type === "in-room") ||
    (item.type === "button" && item.config.type === "in-room")
  );
};

const movementPatternAnnotationText = (
  movement: JsonMovement,
  startDirection: Xy,
) => {
  const { x, y } = startDirection;

  switch (movement) {
    case "back-forth":
      return (
        x > 0 ?
          "↖↘" // left
        : x < 0 ?
          "↘↖" // right
        : y > 0 ?
          "↗↙" // away
        : "↙↗" // towards
      );

    case "forwards":
      return (
        x > 0 ?
          "↖" // left
        : x < 0 ?
          "↘" // right
        : y > 0 ?
          "↗" // away
        : "↙" // towards
      );

    case "clockwise":
      return (
        x > 0 ?
          "↖↗↘↙" // left
        : x < 0 ?
          "↘↙↖↗" // right
        : y > 0 ?
          "↗↘↙↖" // away
        : "↙↖↗↘" // towards
      );

    case "anticlockwise":
      return (
        x > 0 ?
          "↖↙↘↗" // left
        : x < 0 ?
          "↘↗↖↙" // right
        : y > 0 ?
          "↗↖↙↘" // away
        : "↙↘↗↖" // towards
      );

    case "towards-analogue":
      return "➡.⬅";
  }
  // something we didn't write one for yet
  return "";
};

const isWakingMonster = (item: EditorUnionOfAllItemInPlayTypes) => {
  return (
    item.type === "monster" && item.config.activated === "after-player-near"
  );
};

/** adds annotations on top of the normal item renderer, for items
 *
 * that get extra rendering in the editor:
 *    * selected item visual effect
 *    * hovered item visual effect
 *    * doors (destination and clickthrough)
 */
class EditorAnnotationsRenderer<
  T extends ItemInPlayType,
> implements ItemChainPixiRenderer<T> {
  public readonly output: Container = new Container({
    label: "EditorAnnotationsRenderer",
  });

  readonly renderContext: ItemRenderContext<T>;
  #childRenderer: ItemChainPixiRenderer<T>;
  #viewport: EditorViewport;
  #outlineFilters: EditorOutlineFilters;
  /** text annotations, counter-scaled so they read at a constant size under zoom */
  #annotations: TextContainer[] = [];

  constructor(
    renderContext: ItemRenderContext<T>,
    childRenderer: ItemChainPixiRenderer<T>,
    viewport: EditorViewport,
    editorOutlineFilters: EditorOutlineFilters,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    this.#viewport = viewport;
    this.#outlineFilters = editorOutlineFilters;
    this.output.addChild(childRenderer.output);

    this.#initAnnotations();
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
          const { rooms } =
            editorStore.getState().levelEditor.campaignInProgress;

          const {
            config: { toRoom, direction },
          } = item;

          if (toRoom !== exitGameRoomId) {
            const toRoomExists = !!rooms[toRoom];

            const arrow = directionArrow(direction);
            const text =
              direction.y > 0 || direction.x < 0 ?
                `${toRoom}${arrow}`
              : `${arrow}${toRoom}`;

            this.#addTextAnnotation({
              annotationText: text,
              yAdj: !isNegativeSideXy(direction) ? -48 : 0,
              tint:
                toRoomExists ?
                  textAnnotationNormalColour
                : textAnnotationErrorColour,
              clickDispatch:
                toRoomExists ?
                  () => changeToRoom(toRoom as EditorRoomId)
                : undefined,
            });
          }
        }
        break;

      case "teleporter":
      case "portableTeleporter":
        {
          const { rooms } =
            editorStore.getState().levelEditor.campaignInProgress;

          const config = item.config as AllUnionFields<typeof item.config>;

          const { toRoom, toItemId, toPosition } = config;

          const toRoomExists =
            // teleporter to finish game:
            toRoom === exitGameRoomId ||
            // same room teleporter:
            toRoom === undefined ||
            !!rooms[toRoom];

          const annotationText = `➡${toRoom ?? "."}${toItemId ? `:${toItemId}` : ""}${toPosition ? `@(${toPosition.x},${toPosition.y},${toPosition.z})` : ""}`;

          this.#addTextAnnotation({
            annotationText,
            yAdj: -12,
            tint:
              toRoomExists ?
                textAnnotationNormalColour
              : textAnnotationErrorColour,
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
            state: { disappearing },
          } = item;

          // a disappearing conveyor shows the disappear marker in place of its
          // direction arrow:
          this.#addTextAnnotation({
            annotationText:
              disappearing !== null ? "*" : directionArrow(direction),
            yAdj: -12,
          });
        }
        break;

      case "block":
      case "barrier":
        // disappearing blocks/barriers look identical to permanent ones in the
        // editor, so mark them:
        if (item.state.disappearing !== null) {
          this.#addTextAnnotation({ annotationText: "*", yAdj: -12 });
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

          switch (true) {
            case config.which === "cyberman" &&
              config.activated === "after-player-near":
              this.#addTextAnnotation({
                annotationText: "wake",
                tint: monsterWakesColour,
                yAdj: -12,
              });
              break;

            case config.which === "turtle" || config.which === "skiHead":
              this.#addTextAnnotation({
                annotationText: movementPatternAnnotationText(
                  config.movement,
                  config.startDirection,
                ),
                yAdj: -12,
              });
              break;
          }
        }
        break;
    }
  }

  #addTextAnnotation({
    annotationText,
    yAdj = 0,
    tint = textAnnotationNormalColour,
    clickDispatch,
  }: {
    annotationText: string;
    yAdj?: number;
    tint?: Color;
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
      renderContext: {
        frontLayer,
        general: { pixiRenderer, spritesheetVariants },
      },
    } = this;

    const annotationContainer = new TextContainer({
      pixiRenderer,
      spritesheet: spritesheetVariants.originalSpritesheet,
      label: "EditorAnnotationTextContainer",
      outline: true,
      colour: tint,
      text: annotationText,
      y: yAdj,
    });

    if (clickDispatch !== undefined) {
      annotationContainer.eventMode = "static";

      annotationContainer.on("click", () => {
        // ⬇️ doesn't work (won't stop click getting to the div wrapping the canvas that the editor is listening to)
        // e.nativeEvent.stopPropagation();
        store.dispatch(clickDispatch());
      });
      annotationContainer.on("mouseover", () => {
        if (editorStore.getState().levelEditor.tool.type !== "pointer") {
          return;
        }
        // TODO: this is over-dispatching - need some way to
        // prevent firing when enter/leave children
        store.dispatch(setClickableAnnotationHovered(true));
        annotationContainer.colour = textClickableAnnotationHoverColour;
      });
      annotationContainer.on("mouseout", () => {
        store.dispatch(setClickableAnnotationHovered(false));
        annotationContainer.colour = tint;
      });
      annotationContainer.cursor = "pointer";
    }

    this.output.addChild(annotationContainer);
    frontLayer.attach(annotationContainer);
    this.#annotations.push(annotationContainer);
  }

  /**
   * annotations are a ui overlay rather than part of the room, so they render
   * at a constant on-screen size: counter-scale them by the inverse of the
   * viewport zoom
   */
  #updateAnnotationScale() {
    if (this.#annotations.length === 0) {
      return;
    }
    // annotations counter-scale against the viewport zoom so they stay at the
    // editor ui's constant on-screen size (matching `.scale-editor`'s --scale):
    const onScreenScale = editorUiScale / this.#viewport.zoom;
    if (this.#annotations[0].scale.x === onScreenScale) {
      return;
    }
    for (const annotation of this.#annotations) {
      annotation.scale = onScreenScale;
    }
  }

  tick(tickContext: ItemTickContext) {
    this.#updateSelectedAndHovered();
    this.#updateAnnotationScale();

    this.#childRenderer.tick(tickContext);
  }

  #updateSelectedAndHovered() {
    const {
      renderContext: { room },
    } = this;
    const item = this.renderContext.item as unknown as EditorItemInPlayUnion<T>;

    const { clickableAnnotationHovered } = editorStore.getState().levelEditor;

    const { jsonItemId } = item;

    const state = editorStore.getState();
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
      (roomItemsIterable(room.items).some((otherItem) => {
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
          roomItemsIterable(room.items).some(
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
                      m.targets.includes(
                        maybeSwitchedItemJsonItemId as EditorRoomItemId,
                      )),
                )
              );
            },
          )) ||
        // highlight charles when controlling joystick hovered:
        // undefined controls = the joystick controls every charles in the room
        (item.type === "charles" &&
          roomItemsIterable(room.items).some((otherItem) => {
            return (
              otherItem.jsonItemId === hoveredJsonItem?.jsonItemId &&
              otherItem.type === "joystick" &&
              (otherItem.config.controls === undefined ||
                otherItem.config.controls.some((c) => c === jsonItemId))
            );
          })) ||
        // highlight joysticks when the charles they control is hovered:
        (item.type === "joystick" &&
          (item.config.controls === undefined ||
            item.config.controls.some(
              (c) => hoveredJsonItem?.jsonItemId === c,
            ))));

    const {
      pointerHover: pointerHoverFilter,
      eyeDropperHover: eyeDropperHoverFilter,
      controlHighlight: controlHighlightFilter,
      monsterWakes: monsterWakesFilter,
    } = this.#outlineFilters;

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
      : isWakingMonster(item) ? monsterWakesFilter
      : noFilters;
  }

  destroy(): void {
    this.output.destroy();
    this.#childRenderer.destroy();
  }
}

/**
 * makes a {@link DecorateItemRenderer} that wraps an item's appearance in
 * {@link EditorAnnotationsRenderer}. Registered via
 * `RoomRenderer.itemDecorators` when the level editor starts; a factory so the
 * renderer can counter-scale its annotations against the viewport's zoom.
 */
export const makeEditorAnnotationsDecorateItemRenderer = (
  viewport: EditorViewport,
): DecorateItemMaybeRenderer => {
  const editorOutlineFilters = makeEditorOutlineFilters(viewport);
  return (itemRenderContext, childRenderer) =>
    childRenderer ?
      new EditorAnnotationsRenderer(
        itemRenderContext,
        childRenderer,
        viewport,
        editorOutlineFilters,
      )
    : undefined;
};
