/**
 * The double-width (16px) menu-item leader glyphs, in the private-use area.
 * Their art is built from an existing 8px glyph: the focussed one is a doubled
 * fast-forward, the unfocussed one is a bullet-leader plus its mirror.
 *
 * Only the font knows these codepoints - they are how its glyph table and its
 * ligature rules address the art. Text writes the ascii pairs (">>", "^^",
 * "<<") that ligate into them.
 */
export const menuLeaderFocussedChar = "";
export const menuLeaderUnfocussedChar = "";
/** the focussed leader reversed, for back buttons, so nothing need flip it */
export const menuLeaderBackChar = "";
