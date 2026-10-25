#version 300 es
precision highp float;

/*
 * Finds the arcs in the 1x sheet's outlines: the first of three arc passes,
 * then upscaleArcs.frag and upscaleArcSpread.frag. A pixel-art arc is a run
 * of single pixels at 45 degrees with arms of runs either side, each run as
 * long as or longer than the one before it, so the outline turns steadily
 * from one axis to the other - eg 3h-2h-1-2v-3v, horizontal runs of three
 * and two, a single pixel, then vertical runs of two and three.
 *
 * Each arc is found at its anchor: the single pixel of its middle nearest
 * its vertical end. Its arms are measured, and the arc keeps the most runs
 * through which an ellipse - or for a short, symmetric arc, a circle - can
 * be fitted with every run centre near it. An arc whose arms differ needs
 * enough of them that its ellipse is fitted, not merely threaded - two runs
 * on each arm, or one on an arm with three on the other; and an arm of three
 * equal runs is a straight line, not part of an arc. A
 * coloured outline is only taken as one where its arc's middle has the dark
 * body within it.
 *
 * Output per texel, at an anchor (all zero elsewhere):
 *   r: (the middle's length - 1) | (the horizontal arm's runs - 1) << 2
 *      | (the vertical arm's runs - 1) << 4 | the quarter << 6
 *   g, b, a: the runs' lengths less one, three bits each - the horizontal
 *      arm's from the middle out, then the vertical's - as one 24-bit
 *      number, low byte first. The first is never 0, which marks an anchor.
 */

#include "fragFns/upscaleArcCommon.glsl"

// whether v is one of the middle's single pixels: the edge both enters and
// leaves it diagonally
bool isSingle(ivec2 origin, int quarter, ivec2 v){
	ivec2 next;
	return towardHorizontalEnd(origin, quarter, v, next) == moveDiagonal
		&& towardVerticalEnd(origin, quarter, v, next) == moveDiagonal;
}

// how many of an arm's runs, from the middle out, can be part of an arc:
// none unless the first is two or longer, then while they never shorten and
// no three in a row are equal
int usableRuns(int runs[maxArmRuns], int count){
	if (count == 0 || runs[0] < 2) return 0;
	int usable = 1;
	for (int j = 1; j < maxArmRuns; j++){
		if (j >= count || runs[j] < runs[j - 1]) break;
		if (j >= 2 && runs[j] == runs[j - 1] && runs[j - 1] == runs[j - 2]) break;
		usable++;
	}
	return usable;
}

// the arc's run lengths less one, three bits each, as one number
int packedLengths(ArcRuns arc){
	int packed = 0;
	for (int j = 0; j < maxArmRuns; j++){
		packed |= (max(arc.hRuns[j], 1) - 1) << (3 * j);
		packed |= (max(arc.vRuns[j], 1) - 1) << (3 * (j + maxArmRuns));
	}
	return packed;
}

void main(){
	ivec2 p = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(0.0);
	if (!isLine(p)) return;
	for (int quarter = 0; quarter < 4; quarter++){
		ivec2 origin = p;
		if (!onEdge(origin, quarter, ivec2(0)) || !isSingle(origin, quarter, ivec2(0))) continue;
		if (uLineClass == lineColour
			&& !(blackIn(origin, quarter, ivec2(1, 0)) && blackIn(origin, quarter, ivec2(0, 1)))) continue;
		// the anchor is the middle's last single toward the vertical end, so
		// the edge goes on from it into a vertical run of two or more
		ivec2 vRunTop;
		towardVerticalEnd(origin, quarter, ivec2(0), vRunTop);
		ivec2 ignored;
		if (towardVerticalEnd(origin, quarter, vRunTop, ignored) != moveVertical) continue;

		int middleLength = 1;
		ivec2 last = ivec2(0);
		ivec2 hRunStart;
		for (int i = 1; i <= maxMiddleLength; i++){
			towardHorizontalEnd(origin, quarter, last, hRunStart);
			if (!isSingle(origin, quarter, hRunStart)) break;
			last = hRunStart;
			middleLength++;
		}
		towardHorizontalEnd(origin, quarter, last, hRunStart);
		if (middleLength > maxMiddleLength || isSingle(origin, quarter, hRunStart)) continue;

		// the arms' runs, measured outward from the middle
		ArcRuns measured;
		measured.middleLength = middleLength;
		measured.hCount = 0;
		measured.vCount = 0;
		for (int j = 0; j < maxArmRuns; j++){
			measured.hRuns[j] = 0;
			measured.vRuns[j] = 0;
		}
		ivec2 cur = hRunStart;
		for (int j = 0; j < maxArmRuns; j++){
			int len = 1;
			ivec2 next;
			for (int i = 1; i < maxRunLength; i++){
				if (towardHorizontalEnd(origin, quarter, cur, next) != moveHorizontal) break;
				cur = next;
				len++;
			}
			measured.hRuns[j] = len;
			measured.hCount++;
			if (towardHorizontalEnd(origin, quarter, cur, next) != moveDiagonal) break;
			cur = next;
		}
		cur = vRunTop;
		for (int j = 0; j < maxArmRuns; j++){
			int len = 1;
			ivec2 next;
			for (int i = 1; i < maxRunLength; i++){
				if (towardVerticalEnd(origin, quarter, cur, next) != moveVertical) break;
				cur = next;
				len++;
			}
			measured.vRuns[j] = len;
			measured.vCount++;
			if (towardVerticalEnd(origin, quarter, cur, next) != moveDiagonal) break;
			cur = next;
		}

		int hUsable = usableRuns(measured.hRuns, measured.hCount);
		int vUsable = usableRuns(measured.vRuns, measured.vCount);
		if (hUsable == 0 || vUsable == 0) continue;

		// the arc with the most runs that fits, the more evenly armed first
		for (int total = 2 * maxArmRuns; total >= 2; total--){
			for (int imbalance = 0; imbalance <= maxArmRuns; imbalance++){
				for (int sideFirst = 0; sideFirst < 2; sideFirst++){
					if (imbalance == 0 && sideFirst == 1) continue;
					int hCount = (total + (sideFirst == 0 ? imbalance : -imbalance)) / 2;
					int vCount = total - hCount;
					if ((total + imbalance) % 2 != 0 || hCount < 1 || vCount < 1) continue;
					if (hCount > hUsable || vCount > vUsable) continue;
					ArcRuns arc = measured;
					arc.hCount = hCount;
					arc.vCount = vCount;
					if (!isSymmetric(arc) && min(hCount, vCount) < 2 && max(hCount, vCount) < 3) continue;
					vec2 centre;
					vec2 axes;
					if (!fitArc(arc, centre, axes)) continue;
					int lengths = packedLengths(arc);
					finalColor = vec4(
						packByte(float((middleLength - 1) | ((hCount - 1) << 2) | ((vCount - 1) << 4) | (quarter << 6))),
						packByte(float(lengths & 255)),
						packByte(float((lengths >> 8) & 255)),
						packByte(float((lengths >> 16) & 255))
					);
					return;
				}
			}
		}
	}
}
