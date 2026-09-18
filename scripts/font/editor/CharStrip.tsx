import { charBands } from "./charGroups";
import { contoursPath } from "./contourPath";
import { type EditorGlyph } from "./useGlyphs";

export type CharStripProps = {
  glyphs: EditorGlyph[];
  selected: string;
  onSelect: (char: string) => void;
};

/** screen pixels per design pixel in the strip */
const scale = 8;

/**
 * every character in the font, drawn as it currently comes out, in bands by
 * what kind of character it is - a letter is found by knowing it is a letter
 * rather than by knowing where the spritesheet keeps it.
 *
 * Each is drawn at its own width rather than boxed into a common one: these
 * glyphs are not all the same width, and squeezing the wide ones to match
 * would misrepresent the thing being edited
 */
export const CharStrip = ({ glyphs, selected, onSelect }: CharStripProps) => (
  <nav class="editor-chars">
    {charBands(glyphs).map((band) => (
      <section key={band.name} class="editor-char-band">
        <h2 class="editor-note">{band.name}</h2>
        <div class="editor-char-band-glyphs">
          {band.glyphs.map((glyph) => (
            <button
              key={glyph.char}
              type="button"
              title={`${glyph.char} — drawn by ${glyph.outline.drawnBy}`}
              data-selected={glyph.char === selected}
              onClick={() => onSelect(glyph.char)}
              class="editor-char"
              style={{ width: Math.max(8, glyph.frame.w) * scale + 2 }}
            >
              <svg
                viewBox={`0 0 ${glyph.frame.w} ${glyph.frame.h}`}
                width={glyph.frame.w * scale}
                height={glyph.frame.h * scale}
              >
                <path
                  d={contoursPath(glyph.outline.contours)}
                  fill="currentColor"
                  fill-rule="nonzero"
                />
              </svg>
              {glyph.outline.drawnBy === "vector" && (
                <span
                  class="editor-char-badge"
                  data-stale={glyph.outline.staleAgainstArt}
                />
              )}
            </button>
          ))}
        </div>
      </section>
    ))}
  </nav>
);
