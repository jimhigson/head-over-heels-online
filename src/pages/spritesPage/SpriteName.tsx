import { useTip } from "../../ui/tip/useTip";
import { abbreviatedSpriteName } from "./abbreviatedSpriteName";

export type SpriteNameProps = {
  name: string;
  size?: { width: number; height: number };
};

/**
 * the texture id, shortened to fit
 */
export const SpriteName = ({ name, size }: SpriteNameProps) => {
  const { interestfor, tip } = useTip(
    <div class="text-left">
      <div>{name}</div>
      {size !== undefined && (
        <div>
          {size.width}&nbsp;x&nbsp;{size.height}
        </div>
      )}
    </div>,
  );

  return (
    <>
      <button
        type="button"
        interestfor={interestfor}
        class="text-moss zx:text-zxYellow toppy:text-toppyWarm3 mt-1 text-left"
      >
        {abbreviatedSpriteName(name)}
      </button>
      {tip}
    </>
  );
};
