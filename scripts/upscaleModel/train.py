"""
Trains the upscale model on the labels and writes its weights and previews.
"""

import argparse
import sys
from pathlib import Path

import jax
import jax.numpy as jnp
import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from upscaleData import (  # noqa: E402
    colourFromOffsets,
    dihedral,
    featuresOf,
    loadLabels,
    scale,
    targetsOf,
)
from upscaleModel import apply, initParams  # noqa: E402

parser = argparse.ArgumentParser()
parser.add_argument("--labels-dir", default="gfx/upscaleLabels")
parser.add_argument("--out-dir", default="scripts/upscaleModel/out")
parser.add_argument("--steps", type=int, default=3000)
parser.add_argument("--batch", type=int, default=16)
parser.add_argument("--crop", type=int, default=24, help="source crop side")
parser.add_argument("--lr", type=float, default=2e-3)
parser.add_argument("--seed", type=int, default=0)
args = parser.parse_args()

items = loadLabels(args.labels_dir)
if not items:
    raise SystemExit(f"no labels in {args.labels_dir}")
print(f"{len(items)} labels")

def paddedToCrop(source, label):
    """
    a frame smaller than the crop in either direction, padded out with
    transparency so every crop is the same size
    """
    h, w = source.shape[:2]
    padH = max(args.crop - h, 0)
    padW = max(args.crop - w, 0)
    source = np.pad(source, ((0, padH), (0, padW), (0, 0)))
    label = np.pad(label, ((0, padH * scale), (0, padW * scale), (0, 0)))
    return source, label


# every dihedral variant of every label, as features and targets
examples = []
for textureId, source, label in items:
    for variant in range(8):
        s, l = paddedToCrop(dihedral(source, variant), dihedral(label, variant))
        examples.append((featuresOf(s), targetsOf(s, l)))

rng = np.random.default_rng(args.seed)


def sampleBatch():
    features = []
    targets = []
    for _ in range(args.batch):
        f, t = examples[rng.integers(len(examples))]
        h, w = f.shape[:2]
        side = args.crop
        y = rng.integers(h - side + 1)
        x = rng.integers(w - side + 1)
        features.append(f[y : y + side, x : x + side])
        targets.append(t[y * scale : (y + side) * scale, x * scale : (x + side) * scale])
    return jnp.asarray(np.stack(features)), jnp.asarray(np.stack(targets))


def loss(params, features, targets):
    logits = apply(params, features)
    logProbs = jax.nn.log_softmax(logits, axis=-1)
    valid = targets.any(axis=-1)
    # the probability mass on any source neighbour of the right colour
    masked = jnp.where(targets, logProbs, -1e9)
    logHit = jax.scipy.special.logsumexp(masked, axis=-1)
    return -(logHit * valid).sum() / jnp.maximum(valid.sum(), 1)


@jax.jit
def step(params, opt, features, targets, lr):
    value, grads = jax.value_and_grad(loss)(params, features, targets)
    m, v, t = opt
    t = t + 1
    m = jax.tree_util.tree_map(lambda m, g: 0.9 * m + 0.1 * g, m, grads)
    v = jax.tree_util.tree_map(lambda v, g: 0.999 * v + 0.001 * g * g, v, grads)
    mHat = jax.tree_util.tree_map(lambda m: m / (1 - 0.9**t), m)
    vHat = jax.tree_util.tree_map(lambda v: v / (1 - 0.999**t), v)
    params = jax.tree_util.tree_map(lambda p, m, v: p - lr * m / (jnp.sqrt(v) + 1e-8), params, mHat, vHat)
    return params, (m, v, t), value


params = initParams(jax.random.PRNGKey(args.seed))
zeros = jax.tree_util.tree_map(jnp.zeros_like, params)
opt = (zeros, zeros, jnp.zeros((), jnp.int32))

for i in range(args.steps):
    features, targets = sampleBatch()
    params, opt, value = step(params, opt, features, targets, args.lr)
    if i % 100 == 0 or i == args.steps - 1:
        print(f"step {i} loss {float(value):.4f}", flush=True)

outDir = Path(args.out_dir)
outDir.mkdir(parents=True, exist_ok=True)
flat = {}
for i, layer in enumerate(params):
    flat[f"w{i}"] = np.asarray(layer["w"])
    flat[f"b{i}"] = np.asarray(layer["b"])
np.savez(outDir / "weights.npz", **flat)

# previews and accuracy per label, on the unaugmented frames
for textureId, source, label in items:
    logits = apply(params, jnp.asarray(featuresOf(source)[None]))[0]
    offsets = np.asarray(logits.argmax(axis=-1))
    output = colourFromOffsets(source, offsets)
    targets = targetsOf(source, label)
    valid = targets.any(axis=-1)
    hit = np.take_along_axis(targets, offsets[..., None], axis=-1)[..., 0]
    accuracy = (hit & valid).sum() / max(valid.sum(), 1)
    print(f"{textureId}: {accuracy:.3%} of {valid.sum()} output pixels right")
    h, w = source.shape[:2]
    big = source.repeat(scale, axis=0).repeat(scale, axis=1)
    strip = np.concatenate([big, label, output], axis=1)
    Image.fromarray(strip.astype(np.uint8), "RGBA").save(outDir / f"{textureId}.png")
