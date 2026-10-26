#version 300 es
precision highp float;

/*
 * Finds, for every 2x2 cell of the 1x sheet, whether its two diagonals are in
 * contention - the decision the upscale's slicing then draws.
 *
 * A cell whose two diagonals each join a pair of alike pixels, with the pairs
 * unlike each other, is a crossing: only one diagonal can connect, and which
 * one is not a local question. Two layers are seen in the same samples, as
 * the render pass sees them:
 *
 * - layer A sees three states only - transparent, black linework, or
 *   colourised fill - and settles the linework's geometry. It never reads
 *   the shading: the colourisation may not move the authored outlines. Its
 *   crossings leave here unresolved, for upscaleGraphRound.frag to settle
 *   over its rounds;
 * - layer B sees the fill colours themselves, with black and transparent
 *   abstaining, and settles where one shade meets another beneath the
 *   linework, by the heuristics of Kopf & Lischinski's "Depixelizing Pixel
 *   Art": the longer chain of valence-2 pixels wins by the difference in
 *   length, the sparser colour in the 8x8 window around the cell wins by
 *   the difference in counts, and a pixel whose only connection is the
 *   diagonal votes to keep it. A tie goes to the lighter shade.
 *
 * Output per texel, for the cell whose top-left pixel it is:
 *   r: layer A   g: layer B   b: the pixel's lozenge inset (see lozengeInset)
 *   0.00 no crossing   0.25 crossing, unresolved
 *   0.50 top-left to bottom-right connects   0.75 top-right to bottom-left
 *   1.00 crossing in a chequerboard: neither connects
 */

#include "fragFns/upscaleGraphCommon.glsl"

// the half-width of the window the sparse-pixels vote counts over
const int sparseWindowRadius = 4;

int countInWindow(ivec2 tl, vec4 ref){
	int n = 0;
	for (int dy = -sparseWindowRadius + 1; dy <= sparseWindowRadius; dy++){
		for (int dx = -sparseWindowRadius + 1; dx <= sparseWindowRadius; dx++){
			if (alikeB(ref, srcAt(tl + ivec2(dx, dy)))) n++;
		}
	}
	return n;
}

float resolveB(ivec2 tl){
	vec4 a = srcAt(tl);
	vec4 b = srcAt(tl + ivec2(1, 0));
	vec4 c = srcAt(tl + ivec2(0, 1));
	vec4 d = srcAt(tl + ivec2(1, 1));
	if (!alikeB(a, d) || !alikeB(b, c) || alikeB(a, b)) return noCrossing;

	// votes for the a-d diagonal, negative for b-c
	int votes = curveLength(tl, tl + ivec2(1, 1), a, true)
		- curveLength(tl + ivec2(1, 0), tl + ivec2(0, 1), b, true);
	votes += islandVotes(tl, a, b, true);
	// the sparser colour wins: a-d gains by how much commoner b-c's colour is
	votes += countInWindow(tl, b) - countInWindow(tl, a);

	if (votes > 0) return tlBrConnects;
	if (votes < 0) return trBlConnects;
	float aLight = distance(a.rgb, vec3(1.0));
	float bLight = distance(b.rgb, vec3(1.0));
	return aLight <= bLight ? tlBrConnects : trBlConnects;
}

// how far a run of pixels of class `cls` runs on from p in direction d,
// as its last pixel
const int maxStrokeRun = 8;
ivec2 runEnd(ivec2 p, ivec2 d, int cls){
	for (int i = 0; i < maxStrokeRun; i++){
		if (classAt(p + d) != cls) break;
		p += d;
	}
	return p;
}

// which 2:1 lines the run of black ending at `end` steps on to there, other
// than to `partner`: bit 1 for one going down-left/up-right, bit 2 for one
// going up-left/down-right. `side` is -1 at the run's left end, 1 at its right
int familiesAt(ivec2 end, int side, ivec2 partner){
	ivec2 along = end + ivec2(side, -side);
	ivec2 across = end + ivec2(side, side);
	return (along != partner && classAt(along) == 1 ? 1 : 0) | (across != partner && classAt(across) == 1 ? 2 : 0);
}

// the family of the run of black through q, read at whichever of its ends
// steps on, other than back to `from`: 0 where neither does
int runFamily(ivec2 q, ivec2 from){
	int atLeft = familiesAt(runEnd(q, ivec2(-1, 0), 1), -1, from);
	int atRight = familiesAt(runEnd(q, ivec2(1, 0), 1), 1, from);
	return atLeft != 0 ? atLeft : atRight;
}

// whether the stroke carries on from a run's end, in the given family: by a
// step in that family, or by a step in the other whose run is of the other
// family too - a corner - where a step to a run of our own family is a bridge
// to a parallel line, not the stroke carrying on
bool carriesOn(ivec2 end, int side, int family, ivec2 partner){
	int at = familiesAt(end, side, partner);
	if ((at & family) != 0) return true;
	if (at == 0) return false;
	ivec2 next = end + (at == 1 ? ivec2(side, -side) : ivec2(side, side));
	return runFamily(next, end) != family;
}

// whether the run of black through p is the last of its stroke: a 2:1
// line's run, one pixel thick, whose line, read from whichever end steps on,
// does not carry on at the other. A run stepping on to both families at one
// end is in a lattice, where the rounds read the strokes' directions instead
// whether the run from left to right, of class `cls`, has none of its
// class above or below it: a 2:1 line's run, rather than a thicker
// stroke's or a vertical one's
bool thinRun(ivec2 left, ivec2 right, int cls){
	for (int i = 0; i < maxStrokeRun; i++){
		ivec2 q = left + ivec2(i, 0);
		if (q.x > right.x) break;
		if (classAt(q + ivec2(0, -1)) == cls || classAt(q + ivec2(0, 1)) == cls) return false;
	}
	return true;
}

// whether the stroke through p carries on past a contact with `partner`:
// a vertical or thicker stroke no more than two wide, or a 2:1 line
// stepping on at both ends. A wider run with black above or below is a
// body, whose corner a stroke's end does not join
bool carriesPast(ivec2 p, ivec2 partner){
	ivec2 left = runEnd(p, ivec2(-1, 0), 1);
	ivec2 right = runEnd(p, ivec2(1, 0), 1);
	if (!thinRun(left, right, 1)) return right.x - left.x <= 1;
	int atLeft = familiesAt(left, -1, partner);
	int atRight = familiesAt(right, 1, partner);
	int family = atLeft != 0 ? atLeft : atRight;
	return family != 0 && (atLeft & family) != 0 && (atRight & family) != 0;
}

// whether the run through p ends cleanly where it touches `partner`
// diagonally: a run of two or more is its stroke's own body, so nothing but
// the partner may step on from that end - bar black that also sits
// straight above or below it, which is the stroke's thickness - while a
// lone pixel is an end by nature
bool endsAt(ivec2 p, ivec2 partner){
	ivec2 left = runEnd(p, ivec2(-1, 0), 1);
	ivec2 right = runEnd(p, ivec2(1, 0), 1);
	if (left == right) return true;
	int side = partner.x < left.x ? -1 : 1;
	ivec2 end = side < 0 ? left : right;
	ivec2 along = end + ivec2(side, -side);
	ivec2 across = end + ivec2(side, side);
	bool alongFree = along == partner || classAt(along) != 1 || classAt(end + ivec2(0, -side)) == 1;
	bool acrossFree = across == partner || classAt(across) != 1 || classAt(end + ivec2(0, side)) == 1;
	return alongFree && acrossFree;
}

bool lastRun(ivec2 p, ivec2 partner){
	ivec2 left = runEnd(p, ivec2(-1, 0), 1);
	ivec2 right = runEnd(p, ivec2(1, 0), 1);
	if (!thinRun(left, right, 1)) return false;
	int atLeft = familiesAt(left, -1, partner);
	int atRight = familiesAt(right, 1, partner);
	if (atLeft == 3 || atRight == 3) return false;
	int family = atLeft != 0 ? atLeft : atRight;
	if (family == 0) return true;
	return !(carriesOn(left, -1, family, partner) && carriesOn(right, 1, family, partner));
}

// how far a 2:1 line is followed from a run, in rows, each way
const int maxLineRows = 6;

// the run of class `cls` along its row through p, as its first and last x
ivec2 runSpan(ivec2 p, int cls){
	return ivec2(runEnd(p, ivec2(-1, 0), cls).x, runEnd(p, ivec2(1, 0), cls).x);
}

// whether the run `span` is a 2:1 line's: one or two pixels. Others of its
// class above or below do not disqualify it: a line keeps its run where a
// stroke meets it
bool lineRun(ivec2 span){
	return span.y - span.x <= 1;
}

// the run on row y that carries the 2:1 line on from the run `span` on the
// row before it (dy = 1) or after it (dy = -1), in the given family: one
// starting two further right of a down-right line, or ending two further
// left of a down-left one. x = -1 where there is none
ivec2 nextRun(ivec2 span, int y, int dy, int family, int cls){
	ivec2 at = family == 2 ? ivec2(span.x + 2 * dy, y) : ivec2(span.y - 2 * dy, y);
	if (classAt(at) != cls) return ivec2(-1);
	ivec2 next = runSpan(at, cls);
	bool fits = family == 2 ? next.x == at.x : next.y == at.x;
	return fits && lineRun(next) ? next : ivec2(-1);
}

// whether the run `span` on row y is drawn again on row y + dy
bool repeatsOn(ivec2 span, int y, int dy, int cls){
	ivec2 below = ivec2(span.x, y + dy);
	return classAt(below) == cls && runSpan(below, cls) == span;
}

// how long, from its leftmost pixel to its rightmost, the 2:1 line of class
// `cls` through p's run is in the given family: 0 where that run is not a
// line's. A run with its class above or below is a junction with another
// stroke: it is the line's only between two thin runs of it. A run drawn
// twice, on two rows, is stepped on from past its repeat: a lattice's
// widest row is drawn so
int lineLength(ivec2 p, int family, int cls){
	ivec2 span = runSpan(p, cls);
	if (!lineRun(span)) return 0;
	bool seedThin = thinRun(ivec2(span.x, p.y), ivec2(span.y, p.y), cls);
	int left = span.x;
	int right = span.y;
	int thinBeside = 0;
	for (int dy = -1; dy <= 1; dy += 2){
		ivec2 cur = span;
		int y = p.y;
		bool prevThin = seedThin;
		bool repeated = false;
		// a junction run counts once a thin run follows it
		ivec2 junction = span;
		for (int i = 0; i < maxLineRows; i++){
			ivec2 next = nextRun(cur, y + dy, dy, family, cls);
			if (next.x < 0){
				if (repeated || !repeatsOn(cur, y, dy, cls)) break;
				repeated = true;
				y += dy;
				continue;
			}
			repeated = false;
			y += dy;
			cur = next;
			bool thin = thinRun(ivec2(cur.x, y), ivec2(cur.y, y), cls);
			if (!thin && !prevThin) break;
			if (thin){
				if (i == 0) thinBeside++;
				left = min(left, min(cur.x, junction.x));
				right = max(right, max(cur.y, junction.y));
			}
			junction = cur;
			prevThin = thin;
		}
	}
	if (!seedThin && thinBeside < 2) return 0;
	return right - left + 1;
}

// the length from which a 2:1 line counts as one
const int minLineLength = 4;
// the length from which two lines of both families through a run make a
// lattice of it
const int minLatticeLength = 6;

// which of two lines through a run, by their lengths, it is on: 1 the
// down-left line, 2 the down-right one, 3 (both) where both are long
// enough for a lattice, 0 where neither counts, or both count and neither
// is the longer
const int bothFamilies = 3;
int familiesOf(int downLeft, int downRight){
	if (downLeft >= minLatticeLength && downRight >= minLatticeLength) return bothFamilies;
	if (downLeft >= minLineLength && downRight >= minLineLength){
		return downLeft == downRight ? 0 : downLeft > downRight ? 1 : 2;
	}
	return (downLeft >= minLineLength ? 1 : 0) | (downRight >= minLineLength ? 2 : 0);
}

// which 2:1 lines of class `cls` run through p, as familiesOf
int lineFamily(ivec2 p, int cls){
	return familiesOf(lineLength(p, 1, cls), lineLength(p, 2, cls));
}

// whether the fill run `span` on row y has black immediately above and
// below each of its pixels: a shaded line's run drawn between two black
// lines
bool sandwichedRun(ivec2 span, int y){
	if (!lineRun(span)) return false;
	for (int x = span.x; x <= span.y; x++){
		if (classAt(ivec2(x, y - 1)) != 1 || classAt(ivec2(x, y + 1)) != 1) return false;
	}
	return true;
}

// how long, from its leftmost pixel to its rightmost, the shaded 2:1 line
// through p's run is in the given family, counting only runs drawn between
// black: 0 where p's run is not one
int sandwichedLineLength(ivec2 p, int family){
	ivec2 span = runSpan(p, 2);
	if (!sandwichedRun(span, p.y)) return 0;
	int left = span.x;
	int right = span.y;
	for (int dy = -1; dy <= 1; dy += 2){
		ivec2 cur = span;
		int y = p.y;
		for (int i = 0; i < maxLineRows; i++){
			y += dy;
			cur = nextRun(cur, y, dy, family, 2);
			if (cur.x < 0 || !sandwichedRun(cur, y)) break;
			left = min(left, cur.x);
			right = max(right, cur.y);
		}
	}
	return right - left + 1;
}

// which shaded lines drawn between black run through p: as lineFamily
int sandwichedFamily(ivec2 p){
	return familiesOf(sandwichedLineLength(p, 1), sandwichedLineLength(p, 2));
}

// as sandwichedFamily, for a pixel that may not be fill at all
int sandwichedFamilyOf(ivec2 p){
	return classAt(p) == 2 ? sandwichedFamily(p) : 0;
}

// whether the diagonal from `upper` down to `lower`, both of class `cls`,
// is the own step of the 2:1 line of the given family through them: upper
// ends its run and lower starts the next, two along in the line's direction
bool ownStep(ivec2 upper, ivec2 lower, int family, int cls){
	ivec2 span = runSpan(upper, cls);
	ivec2 lowerSpan = runSpan(lower, cls);
	return family == 1
		? lower.x < upper.x && upper.x == span.x && lower.x == lowerSpan.y && lower.x == span.y - 2
		: lower.x > upper.x && upper.x == span.y && lower.x == lowerSpan.x && lower.x == span.x + 2;
}

// whether the fill lozenge whose upper run starts at `upper` is drawn
// there: two runs of two, the lower offset by `lean`, with black on every
// side
bool lozengeAt(ivec2 upper, int lean){
	ivec2 lower = upper + ivec2(lean, 1);
	if (classAt(upper) != 2 || classAt(upper + ivec2(1, 0)) != 2 || classAt(lower) != 2 || classAt(lower + ivec2(1, 0)) != 2) return false;
	ivec2 ring[8] = ivec2[8](
		upper + ivec2(0, -1), upper + ivec2(1, -1), upper + ivec2(-1, 0), upper + ivec2(2, 0),
		lower + ivec2(-1, 0), lower + ivec2(2, 0), lower + ivec2(0, 1), lower + ivec2(1, 1)
	);
	for (int i = 0; i < 8; i++){
		if (classAt(ring[i]) != 1) return false;
	}
	return true;
}

// the lozenge p is a pixel of, if any, as its upper run's first pixel and
// its lean: the smallest diamond the isometric plane draws
bool lozengeOf(ivec2 p, out ivec2 upper, out int lean){
	for (int l = -1; l <= 1; l += 2){
		ivec2 starts[4] = ivec2[4](p, p - ivec2(1, 0), p - ivec2(l, 1), p - ivec2(l + 1, 1));
		for (int i = 0; i < 4; i++){
			if (lozengeAt(starts[i], l)){
				upper = starts[i];
				lean = l;
				return true;
			}
		}
	}
	return false;
}

bool inLozenge(ivec2 p){
	ivec2 upper;
	int lean;
	return lozengeOf(p, upper, lean);
}

// whether the black pixel at p is a 2:1 line's, in either family, of at
// least the given length
bool onBlackLineOf(ivec2 p, int length){
	return classAt(p) == 1 && (lineLength(p, 1, 1) >= length || lineLength(p, 2, 1) >= length);
}

bool onBlackLine(ivec2 p){
	return onBlackLineOf(p, minLineLength);
}

// the length from which a line outranks a lozenge it passes: a lattice's
// last diamond sits on the lattice's long lines, where a handle in its
// slot meets only short ones
const int longLineLength = 6;

// the family of a long line through the black pixel p: 0 for none
int longLineFamily(ivec2 p){
	if (classAt(p) != 1) return 0;
	if (lineLength(p, 1, 1) >= longLineLength) return 1;
	if (lineLength(p, 2, 1) >= longLineLength) return 2;
	return 0;
}

// whether the long line through p carries on to q: q is the diagonal step
// on from one end of p's run in the line's own direction, where it ends as
// a 1:1 line
bool longLineCarriesOnTo(ivec2 p, ivec2 q){
	int family = longLineFamily(p);
	if (family == 0) return false;
	ivec2 along = family == 1 ? ivec2(1, -1) : ivec2(1, 1);
	return q == runEnd(p, ivec2(1, 0), 1) + along || q == runEnd(p, ivec2(-1, 0), 1) - along;
}

// whether both pixels of the run starting at p are black lines' (onLine),
// or black but no line's (!onLine): a black mass, such as a slot's inside
bool runBordersBlack(ivec2 p, bool onLine){
	ivec2 q = p + ivec2(1, 0);
	return classAt(p) == 1 && classAt(q) == 1 && onBlackLine(p) == onLine && onBlackLine(q) == onLine;
}

// whether the run of black over the run starting at p is wider than it: a
// black mass, such as a slot's inside, rather than a line's run or a
// lattice's
bool blackMassOver(ivec2 p){
	if (classAt(p) != 1 || classAt(p + ivec2(1, 0)) != 1) return false;
	ivec2 span = runSpan(p, 1);
	return span.y - span.x >= 2;
}

// a lozenge resting on a black line under a black mass - a handle in its
// slot, not a fruit between an awning's stripes nor a lattice's last
// diamond - floats clear of the line: 0.5 where its pixel p's bottom edge
// is drawn a texel short
float lozengeInset(ivec2 p){
	if (classAt(p) != 2) return 0.0;
	ivec2 upper;
	int lean;
	if (!lozengeOf(p, upper, lean)) return 0.0;
	ivec2 lower = upper + ivec2(lean, 1);
	if (p.y == lower.y && runBordersBlack(lower + ivec2(0, 1), true) && blackMassOver(upper - ivec2(0, 1))) return 0.5;
	return 0.0;
}

float findA(ivec2 tl){
	int a = classAt(tl);
	int b = classAt(tl + ivec2(1, 0));
	int c = classAt(tl + ivec2(0, 1));
	int d = classAt(tl + ivec2(1, 1));
	if (!(a == d && b == c && a != b)) return noCrossing;
	if (inChequer(tl) || inChequer(tl + ivec2(1, 0)) || inChequer(tl + ivec2(0, 1)) || inChequer(tl + ivec2(1, 1))) return neitherConnects;
	bool fillTlBr = a == 2 && b == 1;
	bool fillTrBl = b == 2 && a == 1;
	if (fillTlBr || fillTrBl){
		ivec2 upperBlack = fillTlBr ? tl + ivec2(1, 0) : tl;
		ivec2 lowerBlack = fillTlBr ? tl + ivec2(0, 1) : tl + ivec2(1, 1);
		ivec2 upperFill = fillTlBr ? tl : tl + ivec2(1, 0);
		ivec2 lowerFill = fillTlBr ? tl + ivec2(1, 1) : tl + ivec2(0, 1);
		float blackDiagonal = fillTlBr ? trBlConnects : tlBrConnects;
		float fillDiagonal = fillTlBr ? tlBrConnects : trBlConnects;
		// a shaded line drawn between two black lines is kept whole, and
		// both of them with it: its own steps connect, and nothing
		// bridges across it between them
		int upperSandwich = sandwichedFamily(upperFill);
		if ((upperSandwich == 1 || upperSandwich == 2) && upperSandwich == sandwichedFamily(lowerFill)){
			return ownStep(upperFill, lowerFill, upperSandwich, 2) ? fillDiagonal : blackDiagonal;
		}
		// two pixels on 2:1 lines of one family never bridge between
		// those lines: only the step from a run to its own line's next
		// run connects, and whatever lies between the lines runs on.
		// The linework is read first: a line's own step is undone only by
		// a longer fill line's own step, and in a lattice of lines the
		// fill has no say
		int upperBlackFamily = lineFamily(upperBlack, 1);
		int lowerBlackFamily = lineFamily(lowerBlack, 1);
		bool blackOwnStep = false;
		if (upperBlackFamily == lowerBlackFamily && (upperBlackFamily == 1 || upperBlackFamily == 2)){
			if (!ownStep(upperBlack, lowerBlack, upperBlackFamily, 1)) return fillDiagonal;
			blackOwnStep = true;
		}
		// a long line's own step connects outright, into a lattice too, so
		// long as one of its pixels is on no other line: within a lattice
		// the rounds read the strokes' directions
		int stepFamily = fillTlBr ? 1 : 2;
		bool longOwnStep = lineLength(upperBlack, stepFamily, 1) >= longLineLength && lineLength(lowerBlack, stepFamily, 1) >= longLineLength
			&& (upperBlackFamily != bothFamilies || lowerBlackFamily != bothFamilies) && ownStep(upperBlack, lowerBlack, stepFamily, 1);
		blackOwnStep = blackOwnStep || longOwnStep;
		// a lozenge keeps its outline whole: nothing joins it diagonally,
		// unless a long line passes it, which is read as itself: nothing
		// but its own step, or its end carrying on, joins it from the
		// lozenge's side
		if (inLozenge(upperFill) || inLozenge(lowerFill)){
			bool longLine = longLineFamily(upperBlack) != 0 || longLineFamily(lowerBlack) != 0;
			bool carriesOn = longLineCarriesOnTo(upperBlack, lowerBlack) || longLineCarriesOnTo(lowerBlack, upperBlack);
			return longLine && !blackOwnStep && !carriesOn ? fillDiagonal : blackDiagonal;
		}
		// the black lines either side of a shaded line drawn between black
		// are kept whole too, once a bridge between two black lines is
		// ruled out: two black pixels bordering it on the same side, over
		// one of its own steps, step with it
		for (int side = -1; side <= 1; side += 2){
			ivec2 upperShaded = upperBlack + ivec2(0, side);
			ivec2 lowerShaded = lowerBlack + ivec2(0, side);
			int border = sandwichedFamilyOf(upperShaded);
			if ((border == 1 || border == 2) && border == sandwichedFamilyOf(lowerShaded) && ownStep(upperShaded, lowerShaded, border, 2)) return blackDiagonal;
		}
		if (upperBlackFamily != bothFamilies && lowerBlackFamily != bothFamilies){
			int fillFamily = lineFamily(upperFill, 2);
			if ((fillFamily == 1 || fillFamily == 2) && fillFamily == lineFamily(lowerFill, 2)){
				bool fillOwnStep = ownStep(upperFill, lowerFill, fillFamily, 2);
				if (!blackOwnStep) return fillOwnStep ? fillDiagonal : blackDiagonal;
				// a line's own step across another line's: the longer line
				// wins, and the fill only outright
				if (fillOwnStep){
					int blackLength = max(lineLength(upperBlack, upperBlackFamily, 1), lineLength(lowerBlack, upperBlackFamily, 1));
					int fillLength = max(lineLength(upperFill, fillFamily, 2), lineLength(lowerFill, fillFamily, 2));
					if (fillLength > blackLength) return fillDiagonal;
				}
			}
		}
		if (longOwnStep) return blackDiagonal;
		// a stroke's last run takes the crossing outright where it ends
		// against a line that carries on past it; a step between two
		// strokes that both carry on, or two that both end, is left to the
		// rounds. The end must be clean, or a long line's own end carrying on
		bool lowerEnds = endsAt(lowerBlack, upperBlack) || longLineCarriesOnTo(lowerBlack, upperBlack);
		bool upperEnds = endsAt(upperBlack, lowerBlack) || longLineCarriesOnTo(upperBlack, lowerBlack);
		bool joins = (lastRun(lowerBlack, upperBlack) && lowerEnds && carriesPast(upperBlack, lowerBlack)) || (lastRun(upperBlack, lowerBlack) && upperEnds && carriesPast(lowerBlack, upperBlack));
		if (joins) return blackDiagonal;
	}
	return unresolved;
}

void main(){
	ivec2 tl = ivec2(floor(vUV * uSheetSize));
	finalColor = vec4(findA(tl), resolveB(tl), lozengeInset(tl), 1.0);
}
