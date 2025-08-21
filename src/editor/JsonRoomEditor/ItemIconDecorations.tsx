import type { editor } from "monaco-editor";
import {
  selectCurrentEditingRoomJson,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { useEffect, useRef } from "react";
import { useLoadMonaco } from "./useLoadMonaco";
import type { EditorJsonItemUnion, EditorRoomJsonItems } from "../editorTypes";
import { findNodeAtLocation } from "jsonc-parser";
import { twClass } from "../twClass";
import type { Monaco } from "@monaco-editor/react";
import { keys } from "../../utils/entries";
import type { SceneryName } from "../../sprites/planets";
import type { TextureId } from "../../sprites/spriteSheetData";
import type { SanitisedForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { getParsedJsonFromEditor } from "./getParsedJsonFromEditor";

const textureForItem = (
  item: EditorJsonItemUnion,
  scenery: SceneryName,
): `texture-${SanitisedForClassName<TextureId>}` => {
  switch (item.type) {
    case "block":
      switch (item.config.style) {
        case "organic":
          return item.config.disappearing?.on === "stand" ?
              twClass(`texture-block_organic_disappearing`)
            : twClass(`texture-block_organic`);
        case "artificial":
          return item.config.disappearing?.on === "stand" ?
              twClass(`texture-block_artificial_disappearing`)
            : twClass(`texture-block_artificial`);
        case "book":
          return twClass(`texture-book_x`);
        case "tower":
          return twClass(`texture-tower`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "barrier":
      switch (item.config.axis) {
        case "x":
          return twClass(`texture-barrier_x`);
        case "y":
          return twClass(`texture-barrier_y`);
        default:
          item.config.axis satisfies never;
      }
      break;
    case "pickup":
      switch (item.config.gives) {
        case "bag":
          return twClass(`texture-bag`);
        case "shield":
        case "jumps":
        case "extra-life":
        case "fast":
          return twClass(`texture-whiteRabbit`);
        case "doughnuts":
          return twClass(`texture-doughnuts`);
        case "hooter":
          return twClass(`texture-hooter`);
        case "reincarnation":
          return twClass(`texture-fish_1`);
        case "scroll":
          return twClass(`texture-scroll`);
        case "crown":
          switch (item.config.planet) {
            case "blacktooth":
              return twClass(`texture-crown_blacktooth`);
            case "egyptus":
              return twClass(`texture-crown_egyptus`);
            case "bookworld":
              return twClass(`texture-crown_bookworld`);
            case "penitentiary":
              return twClass(`texture-crown_penitentiary`);
            case "safari":
              return twClass(`texture-crown_safari`);
            default:
              item.config.planet satisfies never;
          }
          break;
        default:
          item.config satisfies never;
      }
      break;
    case "sceneryCrown":
      switch (item.config.planet) {
        case "blacktooth":
          return twClass(`texture-crown_blacktooth`);
        case "egyptus":
          return twClass(`texture-crown_egyptus`);
        case "bookworld":
          return twClass(`texture-crown_bookworld`);
        case "penitentiary":
          return twClass(`texture-crown_penitentiary`);
        case "safari":
          return twClass(`texture-crown_safari`);
        default:
          item.config.planet satisfies never;
      }
      break;
    case "charles":
      return twClass(`texture-charles_towards`);
    case "monster":
      switch (item.config.which) {
        case "dalek":
          return twClass(`texture-dalek_1`);
        case "cyberman":
          return twClass(`texture-cyberman_towards`);
        case "bubbleRobot":
        case "emperor":
          return twClass(`texture-bubbles_cold_2`);
        case "elephant":
        case "elephantHead":
          return twClass(`texture-elephant_towards`);
        case "homingBot":
          return twClass(`texture-headlessBase`);
        case "monkey":
          return twClass(`texture-monkey_towards`);
        case "emperorsGuardian":
          return twClass(`texture-ball`);
        case "turtle":
          return twClass(`texture-turtle_towards_1`);
        case "helicopterBug":
          return twClass(`texture-helicopterBug_1`);
        case "skiHead":
          switch (item.config.style) {
            case "greenAndPink":
              return twClass(`texture-skiHead_greenAndPink_towards`);
            case "starsAndStripes":
              return twClass(`texture-skiHead_starsAndStripes_towards`);
            default:
              item.config.style satisfies never;
          }
          break;
        case "computerBot":
          return twClass(`texture-computerBot_towards`);
        default:
          item.config satisfies never;
      }
      break;
    case "deadlyBlock":
      switch (item.config.style) {
        case "toaster":
          return twClass(`texture-toaster_off`);
        case "volcano":
          return twClass(`texture-volcano_1`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "spikes":
      return twClass(`texture-spikes`);
    case "spring":
      return twClass(`texture-spring_compressed`);
    case "ball":
      return twClass(`texture-ball`);
    case "pushableBlock":
      return twClass(`texture-stepStool`);
    case "movingPlatform":
      return twClass(`texture-sandwich`);
    case "slidingBlock":
      switch (item.config.style) {
        case "book":
          return twClass(`texture-book_y`);
        case "puck":
          return twClass(`texture-puck`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "portableBlock":
      switch (item.config.style) {
        case "cube":
          return twClass(`texture-cube`);
        case "drum":
          return twClass(`texture-drum`);
        case "sticks":
          return twClass(`texture-sticks`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "moveableDeadly":
      switch (item.config.style) {
        case "deadFish":
          return twClass(`texture-fish_1`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "slidingDeadly":
      switch (item.config.style) {
        case "spikyBall":
          return twClass(`texture-spikyBall_1`);
        default:
          item.config.style satisfies never;
      }
      break;
    case "teleporter":
      return twClass(`texture-teleporter`);
    case "lift":
      return twClass(`texture-lift_static`);
    case "hushPuppy":
      return twClass(`texture-hushPuppy`);
    case "joystick":
      return twClass(`texture-joystick`);
    case "switch":
      return twClass(`texture-switch_left`);
    case "conveyor":
      switch (item.config.direction) {
        case "away":
        case "towards":
          return twClass(`texture-conveyor_y_1`);
        case "left":
        case "right":
          return twClass(`texture-conveyor_x_1`);
        default:
          item.config.direction satisfies never;
      }
      break;
    case "door":
      switch (item.config.direction) {
        case "away":
        case "towards":
          return twClass(`texture-door_frame_generic_x_whole`);
        case "left":
        case "right":
          return twClass(`texture-door_frame_generic_y_whole`);
        default:
          item.config.direction satisfies never;
      }
      break;
    case "player":
    case "sceneryPlayer":
      switch (item.config.which) {
        case "head":
        case "headOverHeels":
          return twClass(`texture-head_walking_towards_2`);
        case "heels":
          return twClass(`texture-heels_walking_towards_2`);
        default:
          item.config.which satisfies never;
      }
      break;
    case "firedDoughnut":
      return twClass(`texture-bubbles_taupe_2`);
    case "wall":
      switch (item.config.direction) {
        case "away":
        case "towards":
          switch (scenery) {
            case "blacktooth":
              return twClass(`texture-blacktooth_wall_plain_away`);
            case "egyptus":
              return twClass(`texture-egyptus_wall_hieroglyphics_away`);
            case "bookworld":
              return twClass(`texture-bookworld_wall_book_away`);
            case "penitentiary":
              return twClass(`texture-penitentiary_wall_loop_away`);
            case "safari":
              return twClass(`texture-safari_wall_wall_away`);
            case "jail":
              return twClass(`texture-jail_wall_bars_away`);
            case "market":
              return twClass(`texture-market_wall_fruits_away`);
            case "moonbase":
              return twClass(`texture-moonbase_dark_wall_window1_away`);
            default:
              scenery satisfies never;
          }
          break;
        case "left":
        case "right":
          switch (scenery) {
            case "blacktooth":
              return twClass(`texture-blacktooth_wall_plain_left`);
            case "egyptus":
              return twClass(`texture-egyptus_wall_hieroglyphics_left`);
            case "bookworld":
              return twClass(`texture-bookworld_wall_book_left`);
            case "penitentiary":
              return twClass(`texture-penitentiary_wall_loop_left`);
            case "safari":
              return twClass(`texture-safari_wall_wall_left`);
            case "jail":
              return twClass(`texture-jail_wall_bars_left`);
            case "market":
              return twClass(`texture-market_wall_fruits_left`);
            case "moonbase":
              return twClass(`texture-moonbase_dark_wall_window1_left`);
            default:
              scenery satisfies never;
          }
          break;
        default:
          item.config satisfies never;
      }
      break;
    case "floor":
      switch (item.config.floorType) {
        case "standable":
          switch (item.config.scenery) {
            case "blacktooth":
              return twClass(`texture-blacktooth_floor`);
            case "egyptus":
              return twClass(`texture-egyptus_floor`);
            case "bookworld":
              return twClass(`texture-bookworld_floor`);
            case "penitentiary":
              return twClass(`texture-penitentiary_floor`);
            case "safari":
              return twClass(`texture-safari_floor`);
            case "jail":
              return twClass(`texture-jail_floor`);
            case "market":
              return twClass(`texture-market_floor`);
            case "moonbase":
              return twClass(`texture-moonbase_floor`);
            default:
              item.config.scenery satisfies never;
          }
          break;
        case "deadly":
          return twClass("texture-generic_floor_deadly");
        case "none":
          return twClass("texture-blank");
      }

      return twClass(`texture-blacktooth_floor`);
    case "bubbles":
      return twClass(`texture-bubbles_white_1`);
    case "emitter":
      return twClass("texture-hud_char_?");
    case "button":
      return twClass("texture-button");
    default:
      item satisfies never;
      return twClass("texture-hud_char_?");
  }
  throw new Error("by the types, this shouldn't be possible");
};

function* generateItemIconDecorations({
  editor,
  jsonItems,
  scenery,
  monaco,
}: {
  editor: editor.IStandaloneCodeEditor;
  jsonItems: EditorRoomJsonItems;
  scenery: SceneryName;
  monaco: Monaco;
  //decorationsOptions: editor.IModelDecorationOptions;
}): Generator<editor.IModelDeltaDecoration, void, void> {
  const editorModel = editor.getModel();
  if (editorModel === null) {
    return;
  }

  const rootNode = getParsedJsonFromEditor(editor);

  if (rootNode === undefined) {
    return;
  }

  for (const selectedJsonItemId of keys(jsonItems)) {
    const node = findNodeAtLocation(rootNode, ["items", selectedJsonItemId]);

    if (node === undefined) {
      continue;
    }

    const { lineNumber, column } = editorModel.getPositionAt(node.offset);

    yield {
      range: new monaco.Range(lineNumber, column, lineNumber, column),
      options: {
        stickiness:
          monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
        glyphMarginClassName: twClass(
          // nb: texture name needs to not have a dot in it for this to work!
          `w-4 h-4 sprite ${textureForItem(jsonItems[selectedJsonItemId], scenery)} sprite-in-glyph-margin`,
        ),
      },
    };
  }
}

export const useItemIconDecorations = (
  editor: editor.IStandaloneCodeEditor | null,
): editor.IEditorDecorationsCollection | null => {
  const monaco = useLoadMonaco();
  const jsonItems = useAppSelectorWithLevelEditorSlice(
    (state) => selectCurrentEditingRoomJson(state).items,
  );
  const scenery = useAppSelectorWithLevelEditorSlice(
    (state) => selectCurrentEditingRoomJson(state).planet,
  );

  const collectionRef = useRef<editor.IEditorDecorationsCollection | null>(
    null,
  );

  useEffect(() => {
    if (editor === null || monaco === null) {
      return;
    }

    const decorations = [
      ...generateItemIconDecorations({
        editor,
        jsonItems,
        monaco,
        scenery,
      }),
    ];

    if (!collectionRef.current) {
      collectionRef.current = editor.createDecorationsCollection(decorations);
    } else {
      collectionRef.current.set(decorations); // replaces previous
    }
  }, [editor, jsonItems, monaco, scenery]);

  return collectionRef.current;
};
