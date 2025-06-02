import { Container } from "pixi.js";
import type { ItemTool } from "../../../editor/Tool";
import type { ItemInPlayType } from "../../../model/ItemInPlay";
import { iterate } from "../../../utils/iterate";
import { loadItemFromJson } from "../../gameState/loadRoom/loadItemFromJson";
import { createSprite } from "../createSprite";
import { createItemRenderer } from "../item/itemRender/createItemRenderer";
import type { ItemAppearance } from "./ItemAppearance";
import type { JsonItemUnion } from "../../../model/json/JsonItem";
import type { ItemSoundAndGraphicsRenderer } from "../item/itemRender/ItemSoundAndGraphicsRenderer";
import { originXyz } from "../../../utils/vectors/vectors";

type CursorRenderProps = {
  toolItemJson?: ItemTool | undefined;

  delegateRenderers?: Array<ItemSoundAndGraphicsRenderer<ItemInPlayType>>;
};

export const cursorAppearance: ItemAppearance<"cursor", CursorRenderProps> = ({
  renderContext,
  currentRendering,
  tickContext,
}) => {
  const {
    item: {
      state: { tool },
    },
    general,
    room,
  } = renderContext;

  const toolItemJson: ItemTool | undefined =
    (tool !== undefined && tool.type === "item" && tool.item) || undefined;

  const currentlyRenderedProps = currentRendering?.renderProps;

  if (toolItemJson === undefined) {
    if (currentlyRenderedProps?.toolItemJson) {
      // previously also had not tool json - render nothing new:
      return "no-update";
    } else {
      // newly went back to a simple sprite:
      return {
        output: createSprite("editor.cursor.floor"),
        renderProps: {
          delegateRenderers: undefined,
        },
      };
    }
  } else {
    if (toolItemJson === currentlyRenderedProps?.toolItemJson) {
      // reuse the delegate renderers from last time:
      currentlyRenderedProps.delegateRenderers!.forEach((d) =>
        d.tick(tickContext),
      );
      return "no-update";
    } else {
      // create completely new delegate renderers, and the structure to contain them:
      const delegateRenderers = iterate(
        loadItemFromJson(
          "cursor/preview",
          {
            ...toolItemJson,
            // position is relative to the cursor, ie always zero:
            position: originXyz,
          } as JsonItemUnion<string, string>,
          renderContext.room.roomJson,
        ),
      )
        .map((loadedItem) =>
          createItemRenderer({
            item: loadedItem,
            general,
            room,
          }),
        )
        .toArray();

      const output = new Container({
        label: "cursor",
        children: [
          createSprite("editor.cursor.floor"),
          ...delegateRenderers
            .map((dr) => {
              // quietly (ha) ignore the sound output
              return dr.output.graphics;
            })
            .filter((graphics) => graphics !== undefined),
        ],
      });

      return {
        output,
        renderProps: {
          delegateRenderers,
          toolItemJson,
        },
      };
    }
  }
};
