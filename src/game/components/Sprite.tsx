import { useEffect, useState } from "react";
import { createSprite, type CreateSpriteOptions } from "../render/createSprite";
import { Application } from "pixi.js";

export interface SpriteProps {
  spriteOptions: CreateSpriteOptions;
  className?: string;
}

/** displays one sprite from the spritesheet */
export const Sprite = ({ spriteOptions, className }: SpriteProps) => {
  const [containerEle, setContainerEle] = useState<HTMLSpanElement | null>(
    null,
  );

  useEffect(() => {
    if (containerEle === null) return;

    const app = new Application();

    const asyncEffect = async () => {
      await app.init({ backgroundAlpha: 0, resizeTo: containerEle });
      containerEle.appendChild(app.canvas);
      const sprite = createSprite(spriteOptions);

      sprite.x = containerEle.clientWidth / 2;
      sprite.y = containerEle.clientHeight;
      sprite.scale = containerEle.clientWidth / sprite.width;
      app.stage.addChild(sprite);
    };

    asyncEffect();

    return () => {
      containerEle.removeChild(app.canvas);
      app.destroy();
    };
  }, [containerEle, spriteOptions]);

  return <span className={className} ref={setContainerEle} />;
};
