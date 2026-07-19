#!/usr/bin/env python3
"""Build the HeadOverHeels variable font from glyph-outline JSON emitted by
genFont.ts.

opentype.js can only write CFF outlines and no gvar, and a hand-assembled glyf
variable font (though valid to fontTools/OTS) is silently not animated by
Chromium. fontTools' varLib produces a font Chromium does animate: we build two
masters - a normal one and a double-height one (every glyph twice as tall at the
same width) - and varLib derives the fvar/gvar tables.

The vertical metrics (ascent/descent) are deliberately IDENTICAL in both masters,
so they do not vary with the axis. Varying them (via MVAR) is unreliable: there
is no MVAR tag for hhea ascent/descent at all, and Chrome computes inline-box
metrics from the unvaried default instance even where MVAR entries exist. With
constant metrics every browser does the same line-box maths, and the CSS layer
(the text-double-height utility) compensates for the doubled ink with a fixed,
derivable offset.

Usage: buildVariableFont.py <glyphData.json> <output.woff2>
"""
import json
import os
import sys
import tempfile

from fontTools.designspaceLib import (
    AxisDescriptor,
    DesignSpaceDocument,
    InstanceDescriptor,
    SourceDescriptor,
)
from fontTools.fontBuilder import FontBuilder
from fontTools.otlLib.builder import buildStatTable
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.varLib import build as varlib_build

# seconds between the OpenType head epoch (1904-01-01) and the unix epoch, used
# to convert the manifest's unix `builtAt` into a head timestamp
MAC_EPOCH_OFFSET = 2_082_844_800

FAMILY_NAME = "HeadOverHeels"


def glyph_name(unicode_value):
    return "glyph%x" % unicode_value


def draw_contour(pen, pts):
    """Draw one closed contour of (x, y, on_curve) points, emitting lineTo for
    on-on segments and qCurveTo for runs of off-curve controls. A contour with
    no on-curve points at all is drawn as the TrueType all-off-curve special
    case (a closed quadratic B-spline)."""
    if all(on for (_, _, on) in pts):
        pen.moveTo(pts[0][:2])
        for p in pts[1:]:
            pen.lineTo(p[:2])
        pen.closePath()
        return
    if not any(on for (_, _, on) in pts):
        pen.qCurveTo(*[p[:2] for p in pts], None)
        pen.closePath()
        return
    start = next(i for i, p in enumerate(pts) if p[2])
    ordered = pts[start:] + pts[:start]
    pen.moveTo(ordered[0][:2])
    off_run = []
    for p in ordered[1:]:
        if p[2]:
            if off_run:
                pen.qCurveTo(*off_run, p[:2])
                off_run = []
            else:
                pen.lineTo(p[:2])
        else:
            off_run.append(p[:2])
    if off_run:
        pen.qCurveTo(*off_run, ordered[0][:2])
    pen.closePath()


def build_master(
    data, glyph_order, cmap, y_scale, ascender, descender, style_name, unit
):
    """One master: every glyph's y-coordinates scaled by y_scale, advance widths
    unchanged. The vertical metrics (and the underline, which is a metric too)
    are passed in unscaled - identical for every master - so the axis varies
    only the outlines, never the metrics."""
    fb = FontBuilder(data["unitsPerEm"], isTTF=True)
    fb.setupGlyphOrder(glyph_order)
    fb.setupCharacterMap(cmap)

    glyf = {".notdef": TTGlyphPen(None).glyph()}
    metrics = {".notdef": (int(round(data["notdefAdvance"])), 0)}
    for g in data["glyphs"]:
        name = glyph_name(g["unicode"])
        pen = TTGlyphPen(None)
        xs = []
        for contour in g["contours"]:
            # a point is [x, y] (on-curve) or [x, y, 0] (off-curve quadratic
            # control); consecutive off-curve points imply on-curve midpoints
            # per TrueType, so runs of them render as a smooth B-spline
            pts = [
                (int(round(p[0])), int(round(p[1] * y_scale)), len(p) < 3)
                for p in contour
            ]
            draw_contour(pen, pts)
            xs.extend(p[0] for p in pts)
        glyf[name] = pen.glyph()
        metrics[name] = (int(round(g["advanceWidth"])), min(xs) if xs else 0)

    fb.setupGlyf(glyf)
    fb.setupHorizontalMetrics(metrics)
    asc, desc = int(round(ascender)), int(round(descender))
    fb.setupHorizontalHeader(ascent=asc, descent=desc)
    fb.setupNameTable({"familyName": FAMILY_NAME, "styleName": style_name})
    fb.setupOS2(
        sTypoAscender=asc,
        sTypoDescender=desc,
        sTypoLineGap=0,
        usWinAscent=asc,
        usWinDescent=abs(desc),
    )
    # a 1px-thick underline sitting a 1px gap below the baseline: the top edge
    # of the stroke (underlinePosition) is one pixel below the baseline, and
    # the stroke itself (underlineThickness) is one pixel tall - both on our
    # 8px design grid rather than fontTools' unitsPerEm=1000-derived defaults
    fb.setupPost(underlinePosition=-unit, underlineThickness=unit)
    # don't let save() stamp the current time into head.modified
    fb.font.recalcTimestamp = False
    fb.font["head"].created = MAC_EPOCH_OFFSET
    fb.font["head"].modified = MAC_EPOCH_OFFSET
    return fb.font


def main():
    json_path, out_path = sys.argv[1], sys.argv[2]
    with open(json_path) as fh:
        data = json.load(fh)

    axis = data["axis"]
    glyph_order = [".notdef"] + [glyph_name(g["unicode"]) for g in data["glyphs"]]
    cmap = {g["unicode"]: glyph_name(g["unicode"]) for g in data["glyphs"]}
    asc, desc = data["ascender"], data["descender"]
    unit = data["unitsPerPixel"]

    # same asc/desc (and underline) for both masters: metrics must not vary with
    # the axis (see module docstring). The double master's taller outlines
    # overflow these metrics by design; CSS compensates with a constant nudge.
    normal = build_master(data, glyph_order, cmap, 1, asc, desc, "Regular", unit)
    double = build_master(data, glyph_order, cmap, 2, asc, desc, "Double", unit)

    tmp = tempfile.mkdtemp()
    normal_path = os.path.join(tmp, "normal.ttf")
    double_path = os.path.join(tmp, "double.ttf")
    normal.save(normal_path)
    double.save(double_path)

    doc = DesignSpaceDocument()
    ax = AxisDescriptor()
    ax.name, ax.tag = axis["name"], axis["tag"]
    ax.minimum, ax.default, ax.maximum = axis["min"], axis["default"], axis["max"]
    doc.addAxis(ax)
    for path, location, style in (
        (normal_path, axis["default"], "Normal"),
        (double_path, axis["max"], "Double"),
    ):
        source = SourceDescriptor()
        source.path = path
        source.location = {axis["name"]: location}
        source.styleName = style
        doc.addSource(source)
    for location, style in ((axis["default"], "Normal"), (axis["max"], "Double")):
        instance = InstanceDescriptor()
        instance.location = {axis["name"]: location}
        instance.styleName = style
        instance.familyName = FAMILY_NAME
        doc.addInstance(instance)

    built = varlib_build(doc)
    varfont = built[0] if isinstance(built, tuple) else built

    buildStatTable(
        varfont,
        [
            {
                "tag": axis["tag"],
                "name": axis["name"],
                "values": [
                    {"value": axis["default"], "name": "Normal", "flags": 0x2},
                    {"value": axis["max"], "name": "Double"},
                ],
            }
        ],
        elidedFallbackName="Normal",
    )

    # `created` is fixed (a notional first-created date) so it never churns;
    # `modified` carries the manifest's builtAt, which genFont.ts only advances
    # when the font design genuinely changes - so an unchanged design rebuilds to
    # identical bytes, and a real change bumps the version's timestamp
    built_at = int(data.get("builtAt", 0))
    varfont.recalcTimestamp = False
    varfont["head"].created = MAC_EPOCH_OFFSET
    varfont["head"].modified = MAC_EPOCH_OFFSET + built_at
    varfont.flavor = "woff2"
    varfont.save(out_path)
    print("wrote %s (%d glyphs)" % (out_path, len(glyph_order)))


if __name__ == "__main__":
    main()
