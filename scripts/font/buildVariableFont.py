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

Usage: buildVariableFont.py <glyphData.json> <output.woff2|output.ttf>

The output's extension chooses the flavour: woff2 for the web, ttf for a font
the os can install (macOS Font Book and friends do not read woff2).
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
from fontTools.feaLib.builder import addOpenTypeFeatures
from fontTools.fontBuilder import FontBuilder
from fontTools.otlLib.builder import buildStatTable
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib.removeOverlaps import removeOverlaps
from fontTools.varLib import build as varlib_build

# seconds between the OpenType head epoch (1904-01-01) and the unix epoch, used
# to convert the manifest's unix `builtAt` into a head timestamp
MAC_EPOCH_OFFSET = 2_082_844_800


# OS/2 fsSelection bit 7: use the sTypo* metrics for line spacing
USE_TYPO_METRICS = 1 << 7


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
    data, glyph_order, cmap, y_scale, ascender, descender, style_name, unit,
    family_name,
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
    # a one-pixel line gap. The ink fills the em box exactly - a cap reaches the
    # ascent and a descender reaches the descent - so with no gap a line holding
    # a 'p' touches the caps of the line beneath it. One design pixel of leading
    # is the smallest that keeps rows apart on the grid the art is drawn on
    line_gap = unit
    fb.setupHorizontalHeader(ascent=asc, descent=desc, lineGap=line_gap)
    # psName as well as the family/style: without a PostScript name (name id 6)
    # an os has nothing stable to identify the font by, and CoreText invents one
    fb.setupNameTable(
        {
            "familyName": family_name,
            "styleName": style_name,
            "psName": "%s-%s" % (family_name, style_name),
        }
    )
    fb.setupOS2(
        # fsSelection bit 7 is only defined from version 4 on
        version=4,
        sTypoAscender=asc,
        sTypoDescender=desc,
        sTypoLineGap=line_gap,
        usWinAscent=asc,
        usWinDescent=abs(desc),
        # USE_TYPO_METRICS: read the sTypo* values above on every platform,
        # rather than hhea on one and usWin* (which carry no gap) on another
        fsSelection=USE_TYPO_METRICS,
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


def feature_source(kern_pairs, ligatures):
    """The `kern` and `liga` feature source for the manifest's pairs and
    sequences, or None when there is neither. Both language systems are
    declared: with only the implied DFLT/dflt, a shaper that resolves the text
    to `latn` finds no features at all."""
    blocks = []
    if kern_pairs:
        rules = "".join(
            "  pos %s %s %d;\n"
            % (
                glyph_name(p["left"]),
                glyph_name(p["right"]),
                int(round(p["adjustment"])),
            )
            for p in kern_pairs
        )
        blocks.append("feature kern {\n%s} kern;\n" % rules)
    if ligatures:
        rules = "".join(
            "  sub %s by %s;\n"
            % (
                " ".join(glyph_name(c) for c in lig["sequence"]),
                glyph_name(lig["becomes"]),
            )
            for lig in ligatures
        )
        blocks.append("feature liga {\n%s} liga;\n" % rules)
    if not blocks:
        return None
    return (
        "languagesystem DFLT dflt;\n"
        "languagesystem latn dflt;\n" + "".join(blocks)
    )


def contours_of(glyph):
    """One glyph's outlines back out of a built glyf table, in the same
    [x, y] / [x, y, 0] form the manifest uses."""
    if glyph.numberOfContours <= 0:
        return []
    contours, start = [], 0
    for end in glyph.endPtsOfContours:
        contours.append(
            [
                (
                    [glyph.coordinates[i][0], glyph.coordinates[i][1]]
                    if glyph.flags[i] & 0x01
                    else [glyph.coordinates[i][0], glyph.coordinates[i][1], 0]
                )
                for i in range(start, end + 1)
            ]
        )
        start = end + 1
    return contours


def simplify_outlines(data, glyph_order, cmap, asc, desc, unit, family_name):
    """Merge each glyph's contours into the fewest that draw the same ink.

    The glyphs are drawn as a traced body with separate shapes laid over it -
    a corner arc, a chamfer, a scoop - which overlap it along whole edges. That
    is correct under non-zero fill but says the same boundary twice, so the
    outlines are put through skia's path simplifier once here.

    Once, and before either master: both are built from this same contour data
    and differ only by a y scale, so simplifying it up front leaves them with
    identical point counts and order. Simplifying the finished variable font
    instead would rewrite points that gvar's deltas are indexed by."""
    merged = build_master(
        data, glyph_order, cmap, 1, asc, desc, "Regular", unit, family_name
    )
    removeOverlaps(merged, removeHinting=False)
    glyf = merged["glyf"]
    for g in data["glyphs"]:
        g["contours"] = contours_of(glyf[glyph_name(g["unicode"])])
    return data


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
    family_name = data["familyName"]
    data = simplify_outlines(data, glyph_order, cmap, asc, desc, unit, family_name)
    normal = build_master(
        data, glyph_order, cmap, 1, asc, desc, "Regular", unit, family_name
    )
    double = build_master(
        data, glyph_order, cmap, 2, asc, desc, "Double", unit, family_name
    )

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
        instance.familyName = family_name
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

    # features go on the merged font, not the masters: advances are identical
    # in both, so neither the kern pairs nor the ligatures vary with the axis
    # and there is nothing for varLib to interpolate
    fea = feature_source(data.get("kernPairs"), data.get("ligatures"))
    if fea is not None:
        fea_path = os.path.join(tmp, "features.fea")
        with open(fea_path, "w") as fh:
            fh.write(fea)
        addOpenTypeFeatures(varfont, fea_path)

    # `created` is fixed (a notional first-created date) so it never churns;
    # `modified` carries the manifest's builtAt, which genFont.ts only advances
    # when the font design genuinely changes - so an unchanged design rebuilds to
    # identical bytes, and a real change bumps the version's timestamp
    built_at = int(data.get("builtAt", 0))
    varfont.recalcTimestamp = False
    varfont["head"].created = MAC_EPOCH_OFFSET
    varfont["head"].modified = MAC_EPOCH_OFFSET + built_at
    # the extension asks for the flavour: the same TrueType tables either
    # way, compressed for the web or left bare for an os to install
    varfont.flavor = None if out_path.endswith(".ttf") else "woff2"
    varfont.save(out_path)
    print("wrote %s (%d glyphs)" % (out_path, len(glyph_order)))


if __name__ == "__main__":
    main()
