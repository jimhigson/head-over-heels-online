# Hand-drawn upscale labels

Ground truth for the learned upscale: a frame of the BlockStack sheet drawn
by hand at 4x, as the upscale should render it.

- `templates/<textureId>.png` is the frame at 4x, nearest-neighbour, written
  by `pnpm gen:upscaleLabelTemplates` (optionally followed by texture ids).
  Paint over a copy of it and save the result as `<textureId>.png` in this
  directory.
- Every pixel of a label is one of the frame's own colours, or transparent.
  No blending and no new shades: the model learns which nearby source pixel's
  colour each output pixel takes, so the output stays exact for the palette
  swops.
- A label's pixel (x, y) lies within source pixel (⌊x/4⌋, ⌊y/4⌋). Keep to
  that: the template's alignment is the frame's.
- Colours in the templates are as the browser decodes the sheet (its colour
  profile applied), so eyedrop from the template rather than typing palette
  values.
