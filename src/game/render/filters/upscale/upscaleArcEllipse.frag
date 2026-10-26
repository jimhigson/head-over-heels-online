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
 */

#include "fragFns/upscaleArcCommon.glsl"

uniform sampler2D uAnchors;
uniform sampler2D uPeaks;

// which part of the curve this run of the pass writes: 0 its centre, 1 its
// semi-axes, 2 its exponent
uniform float uPart;

vec2 packWord(float value){
	float word = clamp(floor(value * 256.0 + 0.5), 0.0, 65535.0);
	return vec2(floor(word / 256.0), mod(word, 256.0)) / 255.0;
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
