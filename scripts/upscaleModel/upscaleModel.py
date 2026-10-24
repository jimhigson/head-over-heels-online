"""
The model: a stack of 3x3 convolutions over the source's features, ending in
one logit per output subpixel per source neighbour it might take its colour
from.
"""

import jax
import jax.numpy as jnp

from upscaleData import featureCount, offsetCount, scale

layerWidths = [24] * 7


def initParams(key):
    params = []
    widths = [featureCount, *layerWidths, offsetCount * scale * scale]
    for i, (fanIn, fanOut) in enumerate(zip(widths, widths[1:])):
        key, sub = jax.random.split(key)
        std = (2.0 / (fanIn * 9)) ** 0.5
        params.append(
            {
                "w": jax.random.normal(sub, (3, 3, fanIn, fanOut), jnp.float32) * std,
                "b": jnp.zeros((fanOut,), jnp.float32),
            }
        )
    return params


def apply(params, features):
    """
    features: (batch, h, w, featureCount) -> logits (batch, h*scale, w*scale,
    offsetCount)
    """
    x = features
    for i, layer in enumerate(params):
        x = jax.lax.conv_general_dilated(
            x, layer["w"], (1, 1), "SAME", dimension_numbers=("NHWC", "HWIO", "NHWC")
        ) + layer["b"]
        if i < len(params) - 1:
            x = jax.nn.relu(x)
    batch, h, w, _ = x.shape
    # pixel shuffle: the logits for each of the scale x scale subpixels
    x = x.reshape(batch, h, w, scale, scale, offsetCount)
    x = x.transpose(0, 1, 3, 2, 4, 5)
    return x.reshape(batch, h * scale, w * scale, offsetCount)


def receptiveField():
    return 2 * len(layerWidths) + 1
