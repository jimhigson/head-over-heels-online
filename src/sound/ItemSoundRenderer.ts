import type { ItemTickContext } from "src/game/render/ItemRenderContexts";

import type { Renderer } from "../game/render/Renderer";
import type { ItemInPlayType } from "../model/ItemInPlay";
import type { ItemSoundRenderContext } from "./ItemSoundRenderContext";

export type ItemSoundRenderer<T extends ItemInPlayType> = Renderer<
  ItemSoundRenderContext<T>,
  ItemTickContext,
  AudioNode
>;

/** impose a standard constructor on the class */
export type ItemSoundRendererConstructableClass<T extends ItemInPlayType> = {
  new (renderContext: ItemSoundRenderContext<T>): ItemSoundRenderer<T>;
};
