// character constants shared between the DOM (which renders them with the
// generated "HeadOverHeels" web font) and the font generator's glyph table
// (scripts/font/hudGlyphs.ts). this source really needs a nerd font to read it:
// https://www.nerdfonts.com/cheat-sheet
export const nerdFontDiscordChar = "\uf1ff";
export const nerdFontGithubChar = "\ue709";
export const nerdFontTwitchChar = "\uf1e8";
export const nerdFontAppleChar = "\ue711";
export const nerdFontGoogleChar = "\ue7f0";

// double-width (16px) menu-item leader glyphs, in the private-use area. Their
// glyph art is built from an existing 8px glyph: the focussed one is a doubled
// fast-forward, the unfocussed one is a bullet-leader plus its mirror, so each
// leader renders as a single char instead of two.
export const menuLeaderFocussedChar = "\ue021";
export const menuLeaderUnfocussedChar = "\ue020";
// the focussed leader reversed, for back buttons, so the DOM needn't flip it
export const menuLeaderBackChar = "\ue022";
