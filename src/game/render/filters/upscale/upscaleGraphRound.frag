#version 300 es
precision highp float;

/*
 * One round of settling layer A's crossings, from upscaleGraph.frag's cells.
 *
 * The linework is drawn in strokes: a black pixel on a stroke joins two
 * others, one on each side, and the stroke runs as straight through it as
 * the pixels allow. So at a crossing, where two strokes touch corner to
 * corner, the step is a join only where it runs straighter through each of
 * its pixels than the links they already have - a pixel already carrying a
 * line as straight as the step could make cannot also take it, and the fill
 * between connects. A region's corner (a pixel in a solid block) carries
 * no line, and joins nothing but a lone pixel; a lone pixel joins whatever
 * it touches.
 *
 * Where the step is open to both its pixels, a stroke's end with that one
 * way left to carry on takes it - unless another end with no other way is
 * after the same pixel, a contest left to the votes.
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
	if (state >= 0.875) return notLinked;
	bool settledTlBr = state < 0.625;
	bool pqIsTlBr = d.x == d.y;
	return settledTlBr == pqIsTlBr ? linked : notLinked;
}

// the links a pixel has: the directions of its black sides and of its
// linked diagonals
struct Links {
	int count;
	vec2 dir[8];
	int candidates;
	bool isRegion;
};

Links linksOf(ivec2 p){
	Links links;
	links.count = 0;
	links.candidates = 0;
	// the black around p that is bulk rather than line: its sides, and the
	// diagonals reached by a side path
	int bulk = 0;
	bool inBlock = false;
	for (int i = 0; i < 4; i++){
		if (isBlack(p + dirs[i])){
			links.dir[links.count++] = normalize(vec2(dirs[i]));
			bulk++;
		}
	}
	for (int i = 4; i < 8; i++){
		ivec2 d = dirs[i];
		int link = diagonalLink(p, d);
		if (link == linked) links.dir[links.count++] = normalize(vec2(d));
		if (link == candidate) links.candidates++;
		if (isBlack(p + d)){
			bool bySides = isBlack(p + ivec2(d.x, 0)) && isBlack(p + ivec2(0, d.y));
			bool bySide = isBlack(p + ivec2(d.x, 0)) || isBlack(p + ivec2(0, d.y));
			if (bySide) bulk++;
			if (bySides) inBlock = true;
		}
	}
	// a lone 2x2 block is a fat corner a line may pass through; more is a region
	links.isRegion = inBlock && bulk > 3;
	return links;
}

// how straight a line through two directions out of a pixel is: 1 for
// opposite directions, 0 for a right angle
float straightness(vec2 dir1, vec2 dir2){
	return -dot(dir1, dir2);
}

// the straightest line a pixel's links already make through it
float straightestLine(Links links){
	float best = -2.0;
	for (int i = 0; i < 8; i++){
		for (int j = i + 1; j < 8; j++){
			if (j < links.count) best = max(best, straightness(links.dir[i], links.dir[j]));
		}
	}
	return best;
}

// the straightest line a step out of the pixel in direction d would make
// with one of its links
float straightestWith(Links links, vec2 d){
	float best = -2.0;
	for (int i = 0; i < 8; i++){
		if (i < links.count) best = max(best, straightness(links.dir[i], d));
	}
	return best;
}

// whether a pixel cannot take a step in direction d: its corner carries no
// line, or the line it carries is already as straight as the step would make
bool refuses(Links links, vec2 d, bool fromLonePixel){
	if (links.isRegion) return !fromLonePixel;
	if (links.count < 2) return false;
	return straightestWith(links, d) <= straightestLine(links) + 0.01;
}

// whether the step between p and q is open to both
bool stepOpen(ivec2 p, Links pLinks, ivec2 q, Links qLinks){
	vec2 d = normalize(vec2(q - p));
	return !refuses(pLinks, d, qLinks.count == 0) && !refuses(qLinks, -d, pLinks.count == 0);
}

// p's candidate steps that are open to both their pixels
int openCandidatesOf(ivec2 p, Links pLinks){
	int n = 0;
	for (int i = 4; i < 8; i++){
		ivec2 q = p + dirs[i];
		if (diagonalLink(p, dirs[i]) == candidate && stepOpen(p, pLinks, q, linksOf(q))) n++;
	}
	return n;
}

// a stroke's end: a pixel still short of its two neighbours
bool isStrokeEnd(Links links){
	return links.count < 2;
}

// whether a stroke's end other than `except` is after p with that one way
// left to carry on
bool contestedBy(ivec2 p, Links pLinks, ivec2 except){
	for (int i = 4; i < 8; i++){
		ivec2 q = p + dirs[i];
		if (q == except || diagonalLink(p, dirs[i]) != candidate) continue;
		Links qLinks = linksOf(q);
		if (isStrokeEnd(qLinks) && stepOpen(p, pLinks, q, qLinks) && openCandidatesOf(q, qLinks) == 1) return true;
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
	if (!stepOpen(p, pLinks, q, qLinks)) return fill;

	bool pNeeds = isStrokeEnd(pLinks) && openCandidatesOf(p, pLinks) == 1;
	bool qNeeds = isStrokeEnd(qLinks) && openCandidatesOf(q, qLinks) == 1;
	if ((pNeeds && !contestedBy(q, qLinks, p)) || (qNeeds && !contestedBy(p, pLinks, q))) return black;

	return uFinalStage > 0.5 ? settleByVotes(tl) : unresolved;
}

void main(){
	ivec2 tl = ivec2(floor(vUV * uSheetSize));
	vec4 previous = graphAt(tl);
	// the stored code is quantised to a byte: read it back to its constant
	float state = previous.r < 0.125 ? noCrossing
		: previous.r < 0.375 ? unresolved
		: previous.r < 0.625 ? tlBrConnects
		: previous.r < 0.875 ? trBlConnects
		: neitherConnects;
	finalColor = vec4(settle(tl, state), previous.g, 0.0, 1.0);
}
