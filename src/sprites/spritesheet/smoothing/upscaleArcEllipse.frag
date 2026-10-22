#version 300 es
precision highp float;

/*
 * Each arc's curve |x/a|^n + |y/b|^n = 1, written at its anchor (from
 * upscaleArcAnchors.frag, or for an over-the-top arc upscaleArcPeaks.frag)
 * for the upscale to read - in sheet axes, to a 256th of a pixel: one part
 * of it per run of this pass, as uPart says.
 *
 * Output per texel, at an anchor (all zero elsewhere), each value 16 bits
 * high byte first:
 *   part 0 - r, g: the centre across the sheet from the anchor, offset by
 *            128 pixels; b, a: the centre down the sheet, likewise
 *   part 1 - r, g: the semi-axis across the sheet; b, a: the one down it
 *   part 2 - r, g: the exponent n, to a 256th
 *
 * An over-the-top arc whose sides do not reach their widest points has
 * only a fit through its runs to go on, which leaves its apex anywhere
 * across the row it is drawn in and its width a guess. Where a curve that
 * is known from its widest points is at hand, and keeps all this arc's
 * runs near, the arc is drawn to that instead. First its own ring's far
 * half: the peak of the same length facing back along the axis. Failing
 * that, a stroke it is stacked with: a peak of the same length and quarter
 * within three rows along the axis, taken either as concentric with this
 * one - a rim's outlines and the band between them share a centre, their
 * semi-axes differing by the rows between - or as the same curve shifted
 * along the axis. Black outlines' peaks are looked to first, then this
 * class's own. An arc of a peak and one run each side has too little to
 * tell one curve from another, and keeps its own
 */

#include "fragFns/upscaleArcCommon.glsl"

uniform sampler2D uAnchors;
uniform sampler2D uPeaks;
// the black outlines' peaks, which a coloured stroke's arc may be stacked
// with; the same texture as uPeaks for the black outlines' own pass
uniform sampler2D uMasterPeaks;

// which part of the curve this run of the pass writes: 0 its centre, 1 its
// semi-axes, 2 its exponent
uniform float uPart;

vec2 packWord(float value){
	float word = clamp(floor(value * 256.0 + 0.5), 0.0, 65535.0);
	return vec2(floor(word / 256.0), mod(word, 256.0)) / 255.0;
}

// how far along the axis, in rows, a stacked stroke's peak is looked for
const int maxStackGap = 3;
// the most this arc's run centres may stray from a lent curve
const float maxStackStray = 0.5;
// the fewest runs and single pixels each side an arc needs to be lent a
// curve: fewer cannot tell one curve from another
const int minLentItems = 2;

// whether the peak's curve is known from its widest points
bool isDetermined(PeakArc arc){
	return arc.closed || arc.atExtreme;
}

// whether the curve keeps all the points near, with the exponent fitted to
// them
bool curveFits(vec2 points[maxFitPoints], int count, vec2 centre, vec2 axes, out float exponent){
	exponent = ellipseExponent;
	if (axes.x <= 0.0 || axes.y <= 0.0) return false;
	exponent = fitExponent(points, count, centre, axes);
	return keepsNear(points, count, 0, 0, maxStackStray, centre, axes, exponent);
}

// the curve a stroke stacked with the one at p lends it, if any, in this
// arc's frame: the nearer peak first, and the outward of two as near
bool stackedCurve(ivec2 p, int quarter, PeakArc own, sampler2D peaks, out vec2 centre, out vec2 axes, out float exponent){
	vec2 ownPoints[maxFitPoints];
	int ownCount = peakFitPoints(peakClippedToArc(own), ownPoints);
	for (int rows = 1; rows <= maxStackGap; rows++){
		for (int inward = 0; inward < 2; inward++){
			int gap = inward == 0 ? -rows : rows;
			ivec2 q = p + toSheet(ivec2(0, gap), quarter);
			PeakArc other;
			int otherQuarter;
			if (!decodePeak(texture(peaks, (vec2(q) + 0.5) / uSheetSize), other, otherQuarter)) continue;
			if (otherQuarter != quarter || other.peakLength != own.peakLength || !isDetermined(other)) continue;
			vec2 otherCentre;
			vec2 otherAxes;
			float otherExponent;
			bool otherFromExtremes;
			if (!fitPeak(other, otherCentre, otherAxes, otherExponent, otherFromExtremes)) continue;
			// concentric: the other's centre, which lies the rows between
			// further along this frame's axis, and semi-axes as much longer
			centre = otherCentre + vec2(0.0, float(gap));
			axes = otherAxes + float(gap);
			if (curveFits(ownPoints, ownCount, centre, axes, exponent)) return true;
			// the same curve, shifted along the axis
			centre = otherCentre;
			axes = otherAxes;
			if (curveFits(ownPoints, ownCount, centre, axes, exponent)) return true;
		}
	}
	return false;
}

// the curve of the far half of the peak's own ring, if known from its
// widest points and keeping this half's runs near: the first peak of the
// same length facing back along the axis, within the largest ring and the
// item; in this peak's frame
bool farHalfCurve(ivec2 p, int quarter, PeakArc own, out vec2 centre, out vec2 axes, out float exponent){
	int across = (quarter + 2) & 3;
	for (int y = 2; y < 2 * int(maxRadius); y++){
		ivec2 q = p + toSheet(ivec2(own.peakLength - 1, y), quarter);
		// past the item's edge the scan would be reading another sprite
		if (srcAt(q).a < 0.5) return false;
		PeakArc other;
		int otherQuarter;
		if (!decodePeak(texture(uPeaks, (vec2(q) + 0.5) / uSheetSize), other, otherQuarter)) continue;
		if (otherQuarter != across || other.peakLength != own.peakLength) continue;
		if (!isDetermined(other)) return false;
		vec2 otherCentre;
		vec2 otherAxes;
		float otherExponent;
		bool otherFromExtremes;
		if (!fitPeak(other, otherCentre, otherAxes, otherExponent, otherFromExtremes)) return false;
		// the one centre, in the sheet and then in this peak's frame
		vec2 sheetCentre = vec2(q - p) + toSheetF(otherCentre, across);
		centre = toSheetF(sheetCentre, (4 - quarter) & 3);
		axes = otherAxes;
		vec2 ownPoints[maxFitPoints];
		int ownCount = peakFitPoints(peakClippedToArc(own), ownPoints);
		return curveFits(ownPoints, ownCount, centre, axes, exponent);
	}
	return false;
}

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(0.0);
	vec2 uv = (vec2(p) + 0.5) / uSheetSize;
	ArcRuns arc;
	PeakArc peakArc;
	int quarter;
	vec2 centre;
	vec2 axes;
	float exponent;
	if (decodePeak(texture(uPeaks, uv), peakArc, quarter)){
		bool fromExtremes;
		if (!fitPeak(peakArc, centre, axes, exponent, fromExtremes)) return;
		if (!isDetermined(peakArc) && peakArc.hCount + peakArc.singles + peakArc.vCount >= minLentItems){
			vec2 lentCentre;
			vec2 lentAxes;
			float lentExponent;
			if (farHalfCurve(p, quarter, peakArc, lentCentre, lentAxes, lentExponent)
				|| stackedCurve(p, quarter, peakArc, uMasterPeaks, lentCentre, lentAxes, lentExponent)
				|| stackedCurve(p, quarter, peakArc, uPeaks, lentCentre, lentAxes, lentExponent)){
				centre = lentCentre;
				axes = lentAxes;
				exponent = lentExponent;
			}
		}
	} else if (decodeAnchor(texture(uAnchors, uv), arc, quarter)){
		if (!fitArc(arc, centre, axes, exponent)) return;
	} else {
		return;
	}
	vec2 sheetCentre = toSheetF(centre, quarter);
	// a quarter turn swaps which axis is across the sheet; the exponent is
	// the same whichever way the curve lies
	vec2 sheetAxes = (quarter == 1 || quarter == 3) ? axes.yx : axes;
	finalColor = uPart == 0.0 ? vec4(packWord(sheetCentre.x + 128.0), packWord(sheetCentre.y + 128.0))
		: uPart == 1.0 ? vec4(packWord(sheetAxes.x), packWord(sheetAxes.y))
		: vec4(packWord(exponent), 0.0, 0.0);
}
