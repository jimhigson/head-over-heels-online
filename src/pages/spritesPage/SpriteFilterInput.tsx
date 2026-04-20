import { useEffect, useRef } from "react";

import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { Button } from "../../ui/Button";

export type SpriteFilterInputProps = {
  spriteFilter: string;
  onSpriteFilterChange: (filter: string) => void;
};

export const SpriteFilterInput = ({
  spriteFilter,
  onSpriteFilterChange,
}: SpriteFilterInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-row">
      <BitmapText className="text-white">Filter:</BitmapText>
      <input
        ref={inputRef}
        type="text"
        value={spriteFilter}
        onChange={(e) => onSpriteFilterChange(e.target.value)}
        placeholder="texture id..."
        className="font-head-over-heels bg-pureBlack zx:bg-zxBlack text-white zx:text-zxWhite px-1 caret-midRed w-15"
      />
      {spriteFilter && (
        <Button
          className="bg-midRed zx:bg-zxRed"
          onClick={() => onSpriteFilterChange("")}
        >
          <BitmapText>x</BitmapText>
        </Button>
      )}
    </div>
  );
};
