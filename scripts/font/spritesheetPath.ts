/**
 * the shipped gfx/sprites.webp has every non-frame area (including the HUD char
 * rows) masked to transparent, so the font is generated from the unmasked full
 * sheet iff2png keeps for reference. Glyph frame.y values (absolute sheet
 * coords) index straight into it
 */
export const spritesheetPath = "gfx/sprites.borders.png";
