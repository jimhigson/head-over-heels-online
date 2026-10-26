"""
The labels as training data: each label png with its 1x source, the source's
colour-agnostic features, and per output pixel which source neighbours carry
the label's colour.
"""

from pathlib import Path

import numpy as np
from PIL import Image

scale = 4
# the source neighbourhood an output pixel may take its colour from
offsetRadius = 2
offsetSide = offsetRadius * 2 + 1
offsetCount = offsetSide * offsetSide

transparentClass, blackClass, fillClass = 0, 1, 2
blackThreshold = 26

# the eight neighbours whose sameness of colour is a feature
neighbourOffsets = [(1, 0), (0, 1), (-1, 0), (0, -1), (1, 1), (-1, 1), (-1, -1), (1, -1)]
featureCount = 3 + len(neighbourOffsets)


def classesOf(rgba):
    opaque = rgba[..., 3] > 127
    dark = rgba[..., :3].max(axis=-1) < blackThreshold
    return np.where(opaque, np.where(dark, blackClass, fillClass), transparentClass)


def padded(rgba, by):
    return np.pad(rgba, ((by, by), (by, by), (0, 0)))


def featuresOf(rgba):
    """
    per source pixel: its class as one-hot, then for each neighbour whether it
    is of exactly the same colour (transparent counting as one colour)
    """
    h, w = rgba.shape[:2]
    classes = classesOf(rgba)
    keyed = np.where(classes[..., None] == transparentClass, 0, rgba).astype(np.int32)
    pad = padded(keyed, 1)
    features = np.zeros((h, w, featureCount), np.float32)
    for cls in range(3):
        features[..., cls] = classes == cls
    for i, (dx, dy) in enumerate(neighbourOffsets):
        neighbour = pad[1 + dy : 1 + dy + h, 1 + dx : 1 + dx + w]
        features[..., 3 + i] = (neighbour == keyed).all(axis=-1)
    return features


def targetsOf(sourceRgba, labelRgba):
    """
    per output pixel, a mask over the offsetSide x offsetSide source
    neighbours of its source pixel marking those of the label's colour there;
    all-zero where no neighbour has it, which the loss ignores
    """
    h, w = sourceRgba.shape[:2]
    classes = classesOf(sourceRgba)
    keyed = np.where(classes[..., None] == transparentClass, 0, sourceRgba).astype(np.int32)
    labelClasses = classesOf(labelRgba)
    labelKeyed = np.where(labelClasses[..., None] == transparentClass, 0, labelRgba).astype(np.int32)
    pad = padded(keyed, offsetRadius)
    targets = np.zeros((h * scale, w * scale, offsetCount), bool)
    for i in range(offsetCount):
        dy, dx = divmod(i, offsetSide)
        dy -= offsetRadius
        dx -= offsetRadius
        neighbour = pad[offsetRadius + dy : offsetRadius + dy + h, offsetRadius + dx : offsetRadius + dx + w]
        upscaled = neighbour.repeat(scale, axis=0).repeat(scale, axis=1)
        targets[..., i] = (upscaled == labelKeyed).all(axis=-1)
    return targets


def colourFromOffsets(sourceRgba, offsets):
    """
    the output rgba given, per output pixel, the index of the source neighbour
    whose colour it takes
    """
    h, w = sourceRgba.shape[:2]
    pad = padded(sourceRgba, offsetRadius)
    ys, xs = np.mgrid[0 : h * scale, 0 : w * scale]
    sy, sx = ys // scale, xs // scale
    dy, dx = np.divmod(offsets, offsetSide)
    dy -= offsetRadius
    dx -= offsetRadius
    return pad[sy + dy + offsetRadius, sx + dx + offsetRadius]


def dihedral(image, variant):
    """
    the eight flips and rotations of an image, variant 0 being the image
    """
    out = image
    if variant & 1:
        out = out[:, ::-1]
    if variant & 2:
        out = out[::-1, :]
    if variant & 4:
        out = out.transpose(1, 0, *range(2, out.ndim))
    return np.ascontiguousarray(out)


def loadRgba(path):
    return np.asarray(Image.open(path).convert("RGBA"))


def sourceOfTemplate(templateRgba):
    return np.ascontiguousarray(templateRgba[::scale, ::scale])


def loadLabels(labelsDir):
    """
    every label with its source, as (textureId, source rgba, label rgba)
    """
    labelsDir = Path(labelsDir)
    templatesDir = labelsDir / "templates"
    items = []
    for labelPath in sorted(labelsDir.glob("*.png")):
        templatePath = templatesDir / labelPath.name
        if not templatePath.exists():
            raise FileNotFoundError(f"no template for label {labelPath.name}: run gen:upscaleLabelTemplates {labelPath.stem}")
        label = loadRgba(labelPath)
        source = sourceOfTemplate(loadRgba(templatePath))
        if label.shape[:2] != (source.shape[0] * scale, source.shape[1] * scale):
            raise ValueError(f"label {labelPath.name} is {label.shape[1]}x{label.shape[0]}, not {scale}x its template")
        items.append((labelPath.stem, source, label))
    return items
