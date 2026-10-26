# Learned upscale

Trains a small convolutional model to upscale the BlockStack sheet 4x from
the hand-drawn labels in `gfx/upscaleLabels/`, as which neighbouring source
pixel's colour each output pixel takes - so its output is always
palette-exact.

Runs under python with jax, numpy and pillow (no gpu needed; a laptop cpu
trains it in minutes):

```sh
python3 -m venv .venv && . .venv/bin/activate
pip install jax numpy pillow
python3 scripts/upscaleModel/train.py            # trains on every label
python3 scripts/upscaleModel/train.py --labels-dir some/dir --steps 4000
```

`train.py` writes `scripts/upscaleModel/out/weights.npz` and a preview png per
label beside it, with the source, the label and the model's output side by
side.
