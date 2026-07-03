import { useEffect, useRef } from "preact/hooks";

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
      <span className="text-white text-single-line">Filter:</span>
      <input
        ref={inputRef}
        type="text"
        value={spriteFilter}
        onChange={(e) => onSpriteFilterChange(e.target.value)}
        placeholder="texture id..."
        className="bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack text-white zx:text-zxWhite toppy:text-toppyWarm1 px-1 caret-midRed w-15"
      />
      {spriteFilter && (
        <Button
          className="bg-midRed zx:bg-zxRed toppy:bg-toppyPink2"
          onClick={() => onSpriteFilterChange("")}
        >
          <span className="text-single-line">x</span>
        </Button>
      )}
    </div>
  );
};
