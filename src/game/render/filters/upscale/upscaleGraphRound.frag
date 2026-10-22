#version 300 es
precision highp float;

/*
 * One round of settling layer A's crossings, from upscaleGraph.frag's cells.
 *
 * The linework is drawn in strokes: a black pixel on a stroke joins two
 * others, one on each side, and a stroke steps diagonally only to carry on
 * the way it was going. So at a crossing, where two strokes touch corner to
 * corner:
 *
 * - the step is a join only where it continues a stroke: a horizontal run
 *   steps to a horizontal run, a vertical to a vertical. A free end (a pixel
 *   with at most one neighbour) or a fat corner (a lone 2x2 block) carries
 *   on either way, and a lone pixel joins whatever it touches; but a
 *   region's corner (a solid block) joins nothing but a lone pixel.
 *   Anything else is a touch, and the fill between connects;
 * - a stroke already carrying on past the touching pixel cannot also take
 *   the step, and the fill connects - unless that would strand the other
 *   stroke's end with no other way to carry on, which is left to the votes;
 * - a stroke's end with one way left to carry on takes it, unless another
 *   end with no other way is also after the same pixel: that contest is
 *   left to the votes.
 *
 * Each round settles the cells those rules reach from what is already
 * certain - a diagonal no crossing contests, such as every step of a
 * silhouette, which borders transparency - and the next round reaches
 * further, so a lattice of strokes is read outside-in from its outline
 * rather than cell by cell.
 *
 * The last two rounds settle whatever the rules never reached by Kopf &
 * Lischinski's chain and island votes: first the cells those votes decide,
 * then, with those settled, the ties, which go to the linework, then the
 * fill, then transparency. Crossings between fill and transparency, with no
 * stroke to follow, are settled only there.
 */

#include "fragFns/upscaleGraphCommon.glsl"

// the cells as the previous round left them
uniform sampler2D uGraph;

// 0.0 on an ordinary round; 1.0 on the round the votes settle the cells
// they decide; 2.0 on the last round, when every cell is settled
uniform float uFinalStage;

vec4 graphAt(ivec2 cell){
	return texture(uGraph, (vec2(cell) + 0.5) / uSheetSize);
}

bool isBlack(ivec2 p){
	return classAt(p) == 1;
}

const int notLinked = 0;
const int linked = 1;
const int candidate = 2;

// how p stands to its black diagonal neighbour in direction d: linked where
// no crossing contests it or one was settled its way, a candidate while the
// crossing is unresolved. A diagonal with a black side path is a block's
// bulk, not a link
int diagonalLink(ivec2 p, ivec2 d){
	ivec2 q = p + d;
	if (!isBlack(q)) return notLinked;
	if (isBlack(p + ivec2(d.x, 0)) || isBlack(p + ivec2(0, d.y))) return notLinked;
	float state = graphAt(min(p, q)).r;
	if (state < 0.125) return linked;
	if (state < 0.375) return candidate;
	bool settledTlBr = state < 0.625;
	bool pqIsTlBr = d.x == d.y;
	return settledTlBr == pqIsTlBr ? linked : notLinked;
}

// how far the black run through p reaches along an axis, in pixels
int runLength(ivec2 p, ivec2 along){
	int length = 1;
	for (int i = 1; i <= 4; i++){
		if (!isBlack(p + along * i)) break;
		length++;
	}
	for (int i = 1; i <= 4; i++){
		if (!isBlack(p - along * i)) break;
		length++;
	}
	return length;
}

struct Links {
	int sides;
	int diagonals;
	int candidates;
	// black pixels among the eight around
	int around;
	bool inBlock;
	int horizontalRun;
	int verticalRun;
};

Links linksOf(ivec2 p){
	Links links = Links(0, 0, 0, 0, false, runLength(p, ivec2(1, 0)), runLength(p, ivec2(0, 1)));
	for (int i = 0; i < 4; i++){
		if (isBlack(p + dirs[i])){
			links.sides++;
			links.around++;
		}
	}
	for (int i = 4; i < 8; i++){
		ivec2 d = dirs[i];
		int link = diagonalLink(p, d);
		if (link == linked) links.diagonals++;
		if (link == candidate) links.candidates++;
		if (isBlack(p + d)){
			links.around++;
			if (isBlack(p + ivec2(d.x, 0)) && isBlack(p + ivec2(0, d.y))) links.inBlock = true;
		}
	}
	return links;
}

bool isFull(Links links){
	return (links.sides >= 2 && !links.inBlock)
		|| (links.sides >= 1 && links.diagonals >= 1)
		|| links.diagonals >= 2;
}

// a stroke's end: a pixel still short of its two neighbours. A block's
// pixel is not one, whatever a line passing through the block may do
bool isStrokeEnd(Links links){
	return links.sides + links.diagonals < 2;
}

const int axisNone = 0;
const int axisHorizontal = 1;
const int axisVertical = 2;
const int axisBoth = 3;
const int axisRegion = 4;

// which way the stroke runs through a pixel
int axisOf(Links links){
	// a lone 2x2 block is a fat corner; anything more is a region
	if (links.inBlock) return links.around == 3 ? axisBoth : axisRegion;
	bool horizontal = links.horizontalRun >= 2;
	bool vertical = links.verticalRun >= 2;
	return horizontal && vertical ? axisBoth
		: horizontal ? axisHorizontal
		: vertical ? axisVertical
		: axisNone;
}

// whether a step between p and q carries a stroke on
bool continues(Links pLinks, Links qLinks){
	// a lone pixel joins whatever it touches
	if (pLinks.sides + pLinks.diagonals == 0 || qLinks.sides + qLinks.diagonals == 0) return true;
	int pAxis = axisOf(pLinks);
	int qAxis = axisOf(qLinks);
	if (pAxis == axisRegion || qAxis == axisRegion) return false;
	// a pixel on no run carries on only while it is a free end
	if (pAxis == axisNone) return pLinks.sides + pLinks.diagonals <= 1;
	if (qAxis == axisNone) return qLinks.sides + qLinks.diagonals <= 1;
	if (pAxis == axisBoth || qAxis == axisBoth) return true;
	return pAxis == qAxis;
}

// p's candidates that could still be taken: those whose far pixel is not full
int viableCandidatesOf(ivec2 p){
	int n = 0;
	for (int i = 4; i < 8; i++){
		if (diagonalLink(p, dirs[i]) == candidate && !isFull(linksOf(p + dirs[i]))) n++;
	}
	return n;
}

// whether a stroke's end other than `except` is after p with no other way
// left to carry on
bool contestedBy(ivec2 p, ivec2 except){
	for (int i = 4; i < 8; i++){
		ivec2 q = p + dirs[i];
		if (q == except || diagonalLink(p, dirs[i]) != candidate) continue;
		Links qLinks = linksOf(q);
		if (!isFull(qLinks) && isStrokeEnd(qLinks) && viableCandidatesOf(q) == 1) return true;
	}
	return false;
}

// how much a class is the subject of the art rather than its ground
int subjectRank(int cls){
	return cls == 1 ? 3 : cls == 2 ? 2 : 1;
}

// the votes' settlement of a cell the rules never reached: unresolved while
// they tie, until the last round
float settleByVotes(ivec2 tl){
	vec4 a = srcAt(tl);
	vec4 b = srcAt(tl + ivec2(1, 0));
	int votes = curveLength(tl, tl + ivec2(1, 1), a, false)
		- curveLength(tl + ivec2(1, 0), tl + ivec2(0, 1), b, false);
	votes += islandVotes(tl, a, b, false);
	if (votes > 0) return tlBrConnects;
	if (votes < 0) return trBlConnects;
	if (uFinalStage < 1.5) return unresolved;
	return subjectRank(classOf(a)) > subjectRank(classOf(b)) ? tlBrConnects : trBlConnects;
}

float settle(ivec2 tl, float state){
	if (state != unresolved) return state;

	bool blackIsTlBr = isBlack(tl);
	if (!blackIsTlBr && !isBlack(tl + ivec2(1, 0))){
		// fill against transparency: no stroke to follow
		return uFinalStage > 0.5 ? settleByVotes(tl) : unresolved;
	}
	ivec2 p = blackIsTlBr ? tl : tl + ivec2(1, 0);
	ivec2 q = blackIsTlBr ? tl + ivec2(1, 1) : tl + ivec2(0, 1);
	float black = blackIsTlBr ? tlBrConnects : trBlConnects;
	float fill = blackIsTlBr ? trBlConnects : tlBrConnects;

	Links pLinks = linksOf(p);
	Links qLinks = linksOf(q);
	if (!continues(pLinks, qLinks)) return fill;

	bool pFull = isFull(pLinks);
	bool qFull = isFull(qLinks);
	if (pFull || qFull){
		bool strands = (!pFull && isStrokeEnd(pLinks) && viableCandidatesOf(p) == 0)
			|| (!qFull && isStrokeEnd(qLinks) && viableCandidatesOf(q) == 0);
		if (!strands) return fill;
	} else {
		bool pNeeds = isStrokeEnd(pLinks) && viableCandidatesOf(p) == 1;
		bool qNeeds = isStrokeEnd(qLinks) && viableCandidatesOf(q) == 1;
		if ((pNeeds && !contestedBy(q, p)) || (qNeeds && !contestedBy(p, q))) return black;
	}
	return uFinalStage > 0.5 ? settleByVotes(tl) : unresolved;
}

void main(){
	ivec2 tl = ivec2(floor(vUV * uSheetSize));
	vec4 previous = graphAt(tl);
	// the stored code is quantised to a byte: read it back to its constant
	float state = previous.r < 0.125 ? noCrossing
		: previous.r < 0.375 ? unresolved
		: previous.r < 0.625 ? tlBrConnects
		: trBlConnects;
	finalColor = vec4(settle(tl, state), previous.g, 0.0, 1.0);
}
